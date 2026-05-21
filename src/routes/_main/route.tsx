import { Footer } from '#/components/layout/footer'
import { Navbar } from '#/components/layout/nav-bar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_main')({
  component: RouteComponent,
})

function RouteComponent() {
  return  <main className="min-h-screen bg-[#fcfaf8] text-zinc-800 antialiased">
      <Navbar /> 
      <Outlet />
      <Footer />
    </main>
}
