import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { IApiResponse, ITodos } from "../types/types";
import { jsonApiInstance } from "../../../shared/api/apiInstance";

export const baseTodoKey: string = "tasks";

class TodoService {
  //базовый ключ, всех запросов
  public getTodoListQueryOptions(page: number) {
    return queryOptions({
      queryKey: [baseTodoKey, "list", { page }],
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
      queryKey: [baseTodoKey, "list"],
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

  public createTodos(requestData: ITodos) {
    return jsonApiInstance<ITodos>("/tasks", {
      method: "POST",
      json: requestData,
    });
  }

  public deleteTodos(id: string) {
    return jsonApiInstance<void>(`/tasks/${id}`, {
      method: "DELETE",
    });
  }

  public updateTodos(requestData: Partial<ITodos> & { id: string }) {
    return jsonApiInstance<void>(`/tasks/${requestData.id}`, {
      method: "PATCH",
      json: requestData,
    });
  }
}

export const {
  createTodos,
  deleteTodos,
  updateTodos,
  getTodoListQueryOptions,
  getTodoListInfinityQueryOptions,
} = new TodoService();
