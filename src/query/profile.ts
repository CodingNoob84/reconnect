import { queryOptions } from "@tanstack/react-query"

import {
  getAllPendingProfiles,
  getAllProfiles,
  getMyProfile,
  getProfileById,
  getRecentActivityProfiles,
} from "#/services/profile.api"

export const profileQueries = {
  base: ["profile"],

  myprofile: () =>
    queryOptions({
      queryKey: [
        ...profileQueries.base,
        "mine",
      ],
      queryFn: () => getMyProfile(),
    }),

     profilebyid: ({id}:{id:string}) =>
    queryOptions({
      queryKey: [
        ...profileQueries.base,
        id,
      ],
      queryFn: () => getProfileById({data:{id}}),
    }),

  allprofiles: ({
    page = 1,
    limit = 12,
    department = "",
     search="",
  }: {
    page?: number
    limit?: number
    department?: string
     search?:string
  }) =>
    queryOptions({
      queryKey: [
        ...profileQueries.base,
        "all",
        page,
        limit,
        department,
        search
      ],

      queryFn: () =>
        getAllProfiles({
          data: {
            page,
            limit,
            department,
            search
          },
        }),
    }),

     pendingprofiles: ({
    page = 1,
    limit = 12,
    department = "",
    search="",
  }: {
    page?: number
    limit?: number
    department?: string
    search?:string
  }) =>
    queryOptions({
      queryKey: [
        ...profileQueries.base,
        "pending",
        page,
        limit,
        department,
        search
      ],

      queryFn: () =>
        getAllPendingProfiles({
          data: {
            page,
            limit,
            department,
            search
          },
        }),
    }),

     recentactivity: ({
    page = 1,
    limit = 12,
  }: {
    page?: number
    limit?: number
  }) =>
    queryOptions({
      queryKey: [
        ...profileQueries.base,
        "recent",
        page,
        limit,
      ],

      queryFn: () =>
        getRecentActivityProfiles({
          data: {
            page,
            limit,
          },
        }),
    }),
}