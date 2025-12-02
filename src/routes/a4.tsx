import { createFileRoute } from '@tanstack/react-router'
import { useState, type FormEvent } from 'react'

export const Route = createFileRoute('/a4')({
  component: A4Component,
})

function A4Component() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [numTickets, setNumTickets] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (password === 'vive ignite') {
      setIsAuthenticated(true)
      setAuthError('')
    } else {
      setAuthError('Incorrect password')
    }
  }

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError('')

    try {
      const response = await fetch('https://fn-test-iryuu1msd-einstein-projects.vercel.app/api/download-tickets-a4', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ num: numTickets }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Get filename from Content-Disposition header if present
      const contentDisposition = response.headers.get('Content-Disposition')
      let filename = 'tickets.zip'
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="?([^"]+)"?/)
        if (filenameMatch && filenameMatch[1]) {
          filename = filenameMatch[1]
        }
      } else {
        // Fallback based on content type
        const contentType = response.headers.get('Content-Type')
        if (contentType?.includes('image/png')) {
          filename = `tickets-a4-${Date.now()}.png`
        } else if (contentType?.includes('application/zip')) {
          filename = `tickets-a4-${Date.now()}.zip`
        }
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      setSubmitSuccess(true)
    } catch (error: any) {
      setSubmitError(error.message || 'Failed to submit request')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Authentication Required</h1>

          <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Enter Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                placeholder="Enter password"
                required
              />
            </div>

            {authError && (
              <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white font-bold rounded-lg shadow hover:bg-primary/90 transition-colors"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Print Tickets</h1>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="numTickets" className="block text-sm font-medium text-gray-700 mb-2">
              Number of Tickets
            </label>
            <input
              type="number"
              id="numTickets"
              value={numTickets}
              onChange={(e) => setNumTickets(Number(e.target.value))}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
              required
            />
          </div>

          {submitSuccess && (
            <div className="p-3 bg-green-100 text-green-700 rounded-lg text-sm">
              Request submitted successfully!
            </div>
          )}

          {submitError && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              Error: {submitError}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-primary text-white font-bold rounded-lg shadow hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  )
}
