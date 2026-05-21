// src/routes/auth/callback.ts
import { createFileRoute } from "@tanstack/react-router"
import { getSupabaseServerClient } from "#/db/init"

export const Route = createFileRoute("/auth/callback")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const code = url.searchParams.get("code")
        const next = url.searchParams.get("next") || "/"
        if (!code) {
          return new Response(null, {
            status: 302,
            headers: {
              Location: `${url.origin}/login`,
            },
          })
        }
        const supabase = getSupabaseServerClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (error) {
          console.error(error)

          return new Response(null, {
            status: 302,
            headers: {
              Location: `${url.origin}/login`,
            },
          })
        }
        return new Response(null, {
          status: 302,
          headers: {
            Location: `${url.origin}${next}`,
          },
        })
      },
    },
  },
})