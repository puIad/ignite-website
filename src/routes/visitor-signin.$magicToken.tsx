import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router'
import { api } from '../../convex/_generated/api'
import { useMutation } from 'convex/react'
import { useEffect } from 'react'

export const Route = createFileRoute('/visitor-signin/$magicToken')({
  component: RouteComponent,
})

function RouteComponent() {
  const { magicToken } = Route.useParams()
  const signIn = useMutation(api.visitors.visitorSignin)
  const navigate = useNavigate()
  useEffect(() => {
    async function foo() {
      const { token } = await signIn({ magicToken })
      localStorage.setItem('token', token)
      navigate({ to: "/vote" })
    }
    foo()
  }, [])
  return <div></div>
}
