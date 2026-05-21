import { Loader2, LogOut } from "lucide-react"
import { Button } from "../ui/button"
import { logOut } from "#/services/auth.api"
import { useRouter } from "@tanstack/react-router"
import { useState } from "react"
import { useQueryClient } from "@tanstack/react-query"

export const LogOutButton = ({
  isFullButton = false,
}: {
  isFullButton?: boolean
}) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    if (loading) return
    setLoading(true)
    try {
      const data = await logOut()
      if (data.success) {
        queryClient.invalidateQueries({queryKey:["auth","user"]})
        await router.invalidate()
      }
    } finally {
      setLoading(false)
    }
  }

  if (isFullButton) {
    return (
      <Button
        variant="ghost"
        disabled={loading}
        className="w-full bg-red-500/80 justify-center gap-2 rounded-xl font-medium shadow-sm"
        onClick={handleLogout}
      >
        {loading ? (            
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
            <><LogOut className="h-4 w-4" /> Log out</> 
        )}
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={loading}
      className="hidden h-9 w-9 rounded-full text-muted-foreground hover:bg-destructive/50 hover:text-destructive md:flex transition-colors"
      onClick={handleLogout}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <LogOut className="h-4 w-4" />
      )}
    </Button>
  )
}