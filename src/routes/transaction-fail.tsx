import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/transaction-fail')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/fail"!</div>
}
