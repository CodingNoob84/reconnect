import { getSupabaseServerClient } from "#/db/init"
import { createServerFn } from "@tanstack/react-start"

export const getUpcomingBirthdays =
  createServerFn({
    method: "GET",
  }).handler(async () => {
    const supabase =
      getSupabaseServerClient()

    const { data, error } = await supabase
      .from("profiles")
      .select(`
        id,
        name,
        department,
        avatar,
        dob,
        phoneno
      `)

    if (error) {
      throw error
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0)

    const upcomingBirthdays = (data || [])
      .filter((profile) => profile.dob)
      .map((profile) => {
        const dob = new Date(profile.dob)

        let nextBirthday = new Date(
          today.getFullYear(),
          dob.getMonth(),
          dob.getDate()
        )

        // If birthday already passed this year
        if (nextBirthday < today) {
          nextBirthday.setFullYear(
            today.getFullYear() + 1
          )
        }

        const daysUntil = Math.ceil(
          (nextBirthday.getTime() -
            today.getTime()) /
            (1000 * 60 * 60 * 24)
        )

        return {
          ...profile,
          nextBirthday,
          daysUntil,
        }
      })
      .sort(
        (a, b) => a.daysUntil - b.daysUntil
      )
      .slice(0, 10)

    return upcomingBirthdays
    
  })