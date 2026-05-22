import { getSupabaseServerClient } from "#/db/init"
import { createServerFn } from "@tanstack/react-start"

export interface Memory {
  id: string
  title: string
  description: string
  memory_date: string
  uploaded_at: string

  uploaded_by_profile: {
    id: string
    name: string
  } | null

  images: {
    id: string
    image_url: string
    sort_order: number
  }[]
}

export const getMemories = createServerFn({
  method: "GET",
})
  .inputValidator(
    (data: {
      page?: number
      limit?: number
    }) => ({
      page: data.page ?? 1,
      limit: data.limit ?? 12,
    })
  )
  .handler(async ({ data }) => {
    const supabase =
      getSupabaseServerClient()

    const from =
      (data.page - 1) * data.limit

    const to =
      from + data.limit - 1

    const {
      data: memories,
      error,
      count,
    } = await supabase
      .from("memory_lane")
      .select(
        `
        id,
        title,
        description,
        memory_date,
        uploaded_at,

        uploaded_by_profile:uploaded_by (
          id,
          name
        ),

        images:memory_lane_images (
          id,
          image_url,
          sort_order
        )
      `,
        {
          count: "exact",
        }
      )
      .range(from, to)
      .order("memory_date", {
        ascending: false,
      })

    if (error) {
      throw error
    }

    return {
      data: memories as unknown as Memory[],
      pagination: {
        page: data.page,
        limit: data.limit,
        total: count ?? 0,
        totalPages: Math.ceil(
          (count ?? 0) / data.limit
        ),
      },
    }
  })