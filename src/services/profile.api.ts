import { profileSchema } from "#/components/edit/edit-form";
import { getSupabaseServerClient } from "#/db/init";
import type { ActivityProfile, UserProfile } from "#/types/profile";
import { createServerFn } from "@tanstack/react-start";

export const getMyProfile = createServerFn({
  method: "GET",
}).handler(async () => {
  const supabase = getSupabaseServerClient()
   const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error("Unauthorized")
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (error) {
    throw error
  }

  return data as UserProfile
})

export const getProfileById = createServerFn({
  method: "GET",
})
  .inputValidator(
    (data: { id: string }) => data
  )
  .handler(async ({ data }) => {
    const supabase =
      getSupabaseServerClient()

    const { data: profile, error } =
      await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.id)
        .single()

    if (error) {
      throw error
    }

    return profile as UserProfile
  })

export const submitMyProfile =
  createServerFn({
    method: "POST",
  })
    .inputValidator(profileSchema)
    .handler(async ({ data }) => {
      const supabase =
        getSupabaseServerClient();

      const payload = {
        nickname:
          data.nickname ?? "",

        name: data.name,

        email: data.email,

        avatar:
          data.avatar ?? "",

        dob: data.dob ?? null,

        department:
          data.department,

        regno:
          data.regno ?? "",

        batch: data.batch,

        phoneno:
          data.phoneno,

        address:
          data.address,

        current_position:
          data.current_position ??
          "",

        industry:
          data.industry ?? "",

        description:
          data.description ??
          "",

        linkedin_link:
          data.linkedin_link ??
          "",

        x_link:
          data.x_link ?? "",

        facebook_link:
          data.facebook_link ??
          "",

        instagram_link:
          data.instagram_link ??
          "",

        interests:
          data.interests,

        is_submitted: true,

        approval_status:
          data.approval_status ===
          "initial"
            ? "pending"
            : data.approval_status,

        updated_at:
          new Date().toISOString(),
      };

      const {
        data: profile,
        error,
      } = await supabase
        .from("profiles")
        .update(payload)
        .eq("id", data.id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return {
        success: true,
        profileId: profile.id,
      };
    });

export const getAllProfiles = createServerFn({
  method: "GET",
})
  .inputValidator(
    (data: {
      page?: number
      limit?: number
      department?: string
      search?: string
    }) => ({
      page: data.page ?? 1,
      limit: data.limit ?? 12,
      department: data.department ?? "all",
      search: data.search ?? "",
    })
  )
  .handler(async ({ data }) => {
    //console.log("hi")
    const supabase = getSupabaseServerClient()

    const from = (data.page - 1) * data.limit
    const to = from + data.limit - 1

    let query = supabase
      .from("profiles")
      .select(
        `
        id,
        name,
        department,
        avatar
      `,
        {
          count: "exact",
        }
      )
      .eq("approval_status", "approved")

    // department filter
    if (data.department !== "all") {
      query = query.eq(
        "department",
        data.department
      )
    }

    // search filter
    if (data.search.trim()) {
      query = query.ilike(
        "name",
        `%${data.search.trim()}%`
      )
    }

    const {
      data: profiles,
      error,
      count,
    } = await query
      .range(from, to)
      .order("created_at", {
        ascending: false,
      })
console.log("p",profiles)
    if (error) {
      throw error
    }

    return {
      data: profiles,
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


export const getAllPendingProfiles =
  createServerFn({
    method: "GET",
  })
    .inputValidator(
      (data: {
        page?: number
        limit?: number
        department?: string
         search?: string
      }) => ({
        page: data.page ?? 1,
        limit: data.limit ?? 12,
        department:
          data.department ?? "all",
           search: data.search ?? "",
      }),
    )
    .handler(async ({ data }) => {
      const supabase =
        getSupabaseServerClient()

      const from =
        (data.page - 1) * data.limit

      const to = from + data.limit - 1

      let query = supabase
        .from("profiles")
        .select(
          `
          id,
          name,
          department,
          avatar,
          updated_at
        `,
          {
            count: "exact",
          },
        )
        .eq(
          "approval_status",
          "pending",
        )

      // department filter
      if (
        data.department &&
        data.department !== "all"
      ) {
        query = query.eq(
          "department",
          data.department,
        )
      }

      // search filter
    if (data.search.trim()) {
      query = query.ilike(
        "name",
        `%${data.search.trim()}%`
      )
    }

      const {
        data: profiles,
        error,
        count,
      } = await query
        .range(from, to)
        .order("updated_at", {
          ascending: false,
        })

      if (error) {
        throw error
      }

      return {
        data: profiles,
        pagination: {
          page: data.page,
          limit: data.limit,
          total: count ?? 0,
          totalPages: Math.ceil(
            (count ?? 0) / data.limit,
          ),
        },
      }
    })

export const getRecentActivityProfiles = createServerFn({
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
    const supabase = getSupabaseServerClient()

    const from = (data.page - 1) * data.limit
    const to = from + data.limit - 1

    const {
      data: profiles,
      error,
      count,
    } = await supabase
      .from("profiles")
      .select(
        `
        id,
        name,
        department,
        avatar,
        approval_status,
        action_at,

        action_by_profile:action_by (
          id,
          name
        )
      `,
        {
          count: "exact",
        }
      )
      .in("approval_status", [
        "approved",
        "rejected",
      ])
      .range(from, to)
      .order("created_at", {
        ascending: false,
      })

      

    if (error) {
      throw error
    }

    return {
      data: profiles as unknown as ActivityProfile[],
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


export const approvalAction = createServerFn({
  method: "POST",
})
  .inputValidator(
    (data: {
      profileid: string
      action: "approved" | "rejected"
      action_by: string
    }) => ({
      profileid: data.profileid,
      action: data.action,
      action_by: data.action_by,
    })
  )
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient()

    const { data: profile, error } = await supabase
      .from("profiles")
      .update({
        approval_status: data.action,
        action_by: data.action_by,
        action_at: new Date().toISOString(),
      })
      .eq("id", data.profileid)
      .select()
      .single()

    if (error) {
      throw error
    }

    return profile
  })
