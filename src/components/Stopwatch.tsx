import { useEffect, useState } from 'react'

interface StopwatchProps {
  isRunning: boolean
}

export function Stopwatch({ isRunning }: StopwatchProps) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (!isRunning) {
      setSeconds(0)
      return
    }

    const interval = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning])

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`

  return (
    <div className="text-sm font-mono font-semibold tabular-nums">
      {formattedTime}
    </div>
  )
}

interface CountDownProps {
  timeoutValue: number // seconds
  startTime: string // String(Date.now())
}

export function countDown({ timeoutValue, startTime }: CountDownProps) {
  const [remainingSeconds, setRemainingSeconds] = useState(0)

  useEffect(() => {
    const calculateRemaining = () => {
      const now = Date.now()
      const start = parseInt(startTime, 10)
      const endTime = start + (timeoutValue * 1000) // Convert seconds to milliseconds
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000))
      setRemainingSeconds(remaining)
    }

    // Calculate immediately
    calculateRemaining()

    // Update every second
    const interval = setInterval(calculateRemaining, 1000)

    return () => clearInterval(interval)
  }, [timeoutValue, startTime])

  const minutes = Math.floor(remainingSeconds / 60)
  const seconds = remainingSeconds % 60

  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

  return formattedTime

}
