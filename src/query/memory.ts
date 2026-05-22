import { getMemories } from "#/services/memorylane.api";
import { queryOptions } from "@tanstack/react-query";

export const memoryQueries = {
  base: ["memory"],
  memories: ({
    page = 1,
    limit = 5,
  }: {
    page?: number
    limit?: number

  }) =>
    queryOptions({
      queryKey: [...memoryQueries.base, "all",page],
      queryFn: () => getMemories({data:{page,limit}}),
    }),
}