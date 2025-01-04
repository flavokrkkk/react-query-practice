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
}

export const { getTodoList } = new TodoService();
