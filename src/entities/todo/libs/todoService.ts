import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { IApiResponse, ITodos } from "../types/types";

class TodoService {
  public async getTodoList(
    {
      signal,
    }: {
      signal: AbortSignal;
    },
    { page }: { page: number }
  ): Promise<IApiResponse<Array<ITodos>>> {
    return await fetch(
      `http://localhost:3000/tasks?_page=${page}&per_page=10`,
      {
        signal,
        method: "GET",
      }
    ).then((response) => response.json());
  }

  public getTodoListQueryOptions(page: number) {
    return queryOptions({
      queryKey: ["todos", "list", { page }],
      queryFn: (meta) => this.getTodoList(meta, { page: page }),
    });
  }

  public getTodoListInfinityQueryOptions() {
    return infiniteQueryOptions({
      queryKey: ["todos", "list"],
      queryFn: (meta) => this.getTodoList(meta, { page: meta.pageParam }),
      initialPageParam: 1,
      getNextPageParam: (result) => result.next,
      select: (result) => result.pages.flatMap((page) => page.data),
    });
  }
}

export const { getTodoList, getTodoListInfinityQueryOptions } =
  new TodoService();
