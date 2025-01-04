import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { IApiResponse, ITodos } from "../types/types";
import { jsonApiInstance } from "../../../shared/api/apiInstance";

class TodoService {
  public getTodoListQueryOptions(page: number) {
    return queryOptions({
      queryKey: ["todos", "list", { page }],
      queryFn: (meta) =>
        jsonApiInstance<IApiResponse<Array<ITodos>>>(
          `/tasks?_page=${page}&per_page=10`,
          {
            signal: meta.signal,
          }
        ),
    });
  }

  public getTodoListInfinityQueryOptions() {
    return infiniteQueryOptions({
      queryKey: ["todos", "list"],
      queryFn: (meta) =>
        jsonApiInstance<IApiResponse<Array<ITodos>>>(
          `/tasks?_page=${meta.pageParam}&per_page=10`,
          {
            signal: meta.signal,
          }
        ),
      initialPageParam: 1,
      getNextPageParam: (result) => result.next,
      select: (result) => result.pages.flatMap((page) => page.data),
    });
  }
}

export const { getTodoListQueryOptions, getTodoListInfinityQueryOptions } =
  new TodoService();
