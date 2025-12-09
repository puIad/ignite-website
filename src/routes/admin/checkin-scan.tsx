import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode'
import { cn } from '@/lib/utils'
import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { QRCodeSVG } from 'qrcode.react'

export const Route = createFileRoute('/admin/checkin-scan')({
  component: CheckinScanComponent,
})

function CheckinScanComponent() {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [logs, setLogs] = useState<string[]>([])
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const scannerRegionId = 'checkin-scan-region'
  const [magicLink, setMagicLink] = useState<string | null>(null)
  const [showQRCode, setShowQRCode] = useState(false)

  // Query visitor by barcode
  const visitor = useQuery(
    api.visitors.getVisitorByBarcode,
    scanResult ? { barcode: scanResult } : 'skip'
  )

  // Mutation to get or create visitor and check in
  const getOrCreateVisitorAndCheckin = useMutation(api.visitors.getOrCreateVisitorAndCheckin)

  const addLog = (msg: string) => {
    console.log(msg)
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`])
  }

  useEffect(() => {
    // Auto-start scanning on mount
    // const timer = setTimeout(() => {
    //   startScanning()
    // }, 500) // Small delay to ensure DOM is ready

    // return () => {
    //   clearTimeout(timer)
    //   cleanupScanner()
    // }
  }, [])

  const cleanupScanner = async () => {
    if (scannerRef.current) {
      try {
        if (scannerRef.current.isScanning) {
          await scannerRef.current.stop()
        }
        scannerRef.current.clear()
      } catch (e) {
        console.error("Cleanup error:", e)
      }
    }
  }

  const startScanning = async () => {
    setError(null)
    setScanResult(null)
    setMagicLink(null)
    setShowQRCode(false)
    setIsScanning(true)
    addLog("Starting scanner initialization...")

    try {
      // Check cameras
      try {
        const devices = await Html5Qrcode.getCameras()
        addLog(`Found ${devices?.length || 0} cameras`)
        if (!devices || devices.length === 0) {
          throw new Error("No camera devices found.")
        }
        devices.forEach(d => addLog(`Camera: ${d.label} (${d.id})`))
      } catch (e: any) {
        addLog(`Camera check failed: ${e.message}`)
        throw new Error("Camera access denied or not supported.")
      }

      // Initialize if not already done
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode(scannerRegionId)
      }

      const config = {
        fps: 10,
        qrbox: { width: 300, height: 150 },
        aspectRatio: 1.0,
        formatsToSupport: [Html5QrcodeSupportedFormats.CODE_39]
      }

      addLog("Attempting to start camera (environment)...")
      try {
        await scannerRef.current.start(
          { facingMode: "environment" },
          config,
          (decodedText) => handleScanSuccess(decodedText),
          (errorMessage) => {
            // Only log if it's not a standard scanning error (too verbose)
            // console.log(errorMessage)
          }
        )
        addLog("Camera started successfully (environment)")
      } catch (envError: any) {
        addLog(`Environment camera failed: ${envError?.message || envError}`)
        addLog("Attempting to start camera (user)...")

        await scannerRef.current.start(
          { facingMode: "user" },
          config,
          (decodedText) => handleScanSuccess(decodedText),
          () => { }
        )
        addLog("Camera started successfully (user)")
      }
    } catch (err: any) {
      console.error("Error starting scanner:", err)
      const msg = err?.message || "Failed to start camera"
      setError(msg)
      addLog(`Fatal error: ${msg}`)
      setIsScanning(false)
    }
  }

  const handleScanSuccess = async (decodedText: string) => {
    setScanResult(decodedText)
    setIsScanning(false)
    addLog(`Scanned: ${decodedText}`)

    if (scannerRef.current) {
      try {
        await scannerRef.current.stop()
        scannerRef.current.clear()
      } catch (e) {
        console.error("Stop error:", e)
      }
    }
  }

  const handleReset = () => {
    setMagicLink(null)
    setShowQRCode(false)
    startScanning()
  }

  const handleGetQRCode = async () => {
    if (!scanResult) return

    try {
      const result = await getOrCreateVisitorAndCheckin({
        barcode: scanResult,
        email: visitor?.email,
      })

      const websiteUrl = import.meta.env.VITE_WEBSITE_URL || ''
      const qrUrl = `${websiteUrl}/visitor-signin/${result.magicToken}`
      setMagicLink(qrUrl)
      setShowQRCode(true)
    } catch (e: any) {
      console.error("Error getting QR code:", e)
      setError(e.message || "Failed to generate QR code")
    }
  }

  // Determine visitor display info
  const renderVisitorInfo = () => {
    if (visitor === undefined) {
      // Loading
      return <p className="text-gray-500">Loading visitor data...</p>
    }

    if (visitor === null) {
      // Not found
      return (
        <div className="w-full p-6 bg-yellow-50 border border-yellow-200 rounded-xl flex flex-col items-center gap-3">
          <span className="text-sm text-yellow-600 font-medium uppercase tracking-wider">Status</span>
          <span className="text-xl font-bold text-yellow-700">Visitor not registered</span>
          <span className="text-sm text-gray-500">A new visitor record will be created when you generate the QR code.</span>
        </div>
      )
    }

    // Visitor found
    return (
      <div className="w-full p-6 bg-green-50 border border-green-200 rounded-xl flex flex-col items-center gap-3">
        <span className="text-sm text-green-600 font-medium uppercase tracking-wider">Visitor Found</span>
        {visitor.guestMode ? (
          <span className="text-xl font-bold text-gray-900">Guest Mode</span>
        ) : (
          <span className="text-xl font-bold text-gray-900">{visitor.email}</span>
        )}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Checked In:</span>
          <span className={cn(
            "px-2 py-1 rounded text-xs font-bold",
            visitor.checkedIn ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          )}>
            {visitor.checkedIn ? "Yes" : "No"}
          </span>
        </div>
      </div>
    )
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 flex flex-col items-center gap-6">
        <h1 className="text-2xl font-bold text-gray-800">Check-in Scanner</h1>

        {error && (
          <div className="w-full p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
            {error}
            <button
              onClick={() => startScanning()}
              className="block w-full mt-2 text-xs font-bold underline"
            >
              Retry
            </button>
          </div>
        )}

        <div
          id={scannerRegionId}
          className={cn(
            "w-full overflow-hidden rounded-lg bg-gray-100",
            isScanning ? "block" : "hidden"
          )}
          style={{ minHeight: isScanning ? '300px' : '0' }}
        />

        {scanResult && (
          <div className="w-full p-6 bg-blue-50 border border-blue-200 rounded-xl flex flex-col items-center gap-3">
            <span className="text-sm text-blue-600 font-medium uppercase tracking-wider">Barcode</span>
            <span className="text-3xl font-mono font-bold text-gray-900 break-all text-center tracking-widest">
              {scanResult}
            </span>
          </div>
        )}

        {scanResult && renderVisitorInfo()}

        {/* QR Code Display */}
        {showQRCode && magicLink && (
          <div className="w-full p-6 bg-white border-2 border-primary rounded-xl flex flex-col items-center gap-4">
            <span className="text-sm text-primary font-medium uppercase tracking-wider">Scan to Sign In</span>
            <QRCodeSVG 
              value={magicLink} 
              size={200} 
              level="H"
              className="rounded-lg"
            />
            <span className="text-xs text-gray-500 text-center break-all">{magicLink}</span>
          </div>
        )}

        {/* GET QR CODE Button */}
        {scanResult && !showQRCode && (
          <button
            onClick={handleGetQRCode}
            className="w-full px-6 py-4 bg-primary text-white font-bold text-lg rounded-xl shadow-lg hover:bg-primary/90 transition-all transform active:scale-95"
          >
            GET QR CODE
          </button>
        )}

        {!isScanning && (
          <div className="w-full flex flex-col items-center gap-6">
            <button
              onClick={handleReset}
              className="w-full px-6 py-4 bg-gray-200 text-gray-700 font-bold text-lg rounded-xl shadow-lg hover:bg-gray-300 transition-all transform active:scale-95"
            >
              {scanResult ? 'SCAN ANOTHER' : 'SCAN BARCODE'}
            </button>
          </div>
        )}

        {isScanning && (
          <button
            onClick={() => {
              setIsScanning(false)
              cleanupScanner()
            }}
            className="px-6 py-2 text-gray-500 hover:text-gray-700 font-medium transition-colors"
          >
            Cancel
          </button>
        )}

      </div>
    </div>
  )
}
