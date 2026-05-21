
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
})

function RouteComponent() {
  return  <main className="min-h-screen bg-[#fcfaf8] text-zinc-800 antialiased">
     
      <Outlet />
     
    </main>
}
