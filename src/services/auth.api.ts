import { getSupabaseServerClient } from "#/db/init"
import { createServerFn } from "@tanstack/react-start"

export const loginWithGoogle = createServerFn({
  method: "POST",
}).handler(async () => {
  const supabase = getSupabaseServerClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
     redirectTo: `${window.location.origin}/auth/callback`
    },
  })

  if (error) {
    throw error
  }

  return {
    url: data.url,
  }
})

export const logOut = createServerFn({
  method: "POST",
}).handler(async () => {
  const supabase =
    getSupabaseServerClient()

  await supabase.auth.signOut()

  return {
    success: true,
  }
})



export const getUser = createServerFn({
  method: "GET",
}).handler(async () => {
  const supabase = getSupabaseServerClient()
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    return {
      isAuthenticated: false,
      isProfileUpdated:false,
      user:null
    }
  }

   const { data:profile } = await supabase
    .from("profiles")
    .select("is_submitted, approval_status")
    .eq("id", data.user.id)
    .single()

  return {
    isAuthenticated: true,
    isProfileUpdated:profile?.is_submitted as boolean,
    isAlumni:profile?.approval_status ==="approved",
    user: {
        id:data.user.id,
        name:data.user.user_metadata.name,
        avatar:data.user.user_metadata.avatar_url,
        email: data.user.email!, 
    },
  }
})
