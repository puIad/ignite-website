import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/transaction-success')({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): { tr: string } => ({ tr: String(search?.tr) ?? "" }),
})

function RouteComponent() {
  const { tr } = Route.useSearch()
  useEffect(() => {
    const handlePostPayment = async () => {
      console.log('calling post payment')
      await fetch(import.meta.env.VITE_API_URL + "/post-payment", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({ transactionId: tr })
      })
    }
    handlePostPayment()
  }, [])

  return <div>Hello "/success"!</div>
}
