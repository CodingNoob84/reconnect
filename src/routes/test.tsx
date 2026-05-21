import { Button } from '#/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <Button className="bg-primary bg-red-400 text-green-500 p-10">Hello</Button>
  </div>
}
