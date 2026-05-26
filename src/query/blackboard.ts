
import { getUpcomingBirthdays } from "#/services/blackboard.api";
import { queryOptions } from "@tanstack/react-query";

export const blackboardQueries = {
  base: ["blackboard"],
  getupcomingbirthdays: () =>
    queryOptions({
      queryKey: [...blackboardQueries.base, "birthdays"],
      queryFn: () => getUpcomingBirthdays(),
    }),
}