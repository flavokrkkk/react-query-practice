import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteTodos,
  getTodoListInfinityQueryOptions,
} from "../../../entities/todo/libs/todoService";
import { useCallback } from "react";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: (id: string) => deleteTodos(id),
    // onSettled вызывает действие, даже если произошла ошибка
    onSettled: async () => {
      //для мгновенного отображения данных, даже если они в кэше
      await queryClient.invalidateQueries(getTodoListInfinityQueryOptions());
    },
    onSuccess: async (_, deletedId) => {
      //1-й вариант optimistic update
      //получаем из кэша todos
      const todos = queryClient.getQueryData(
        getTodoListInfinityQueryOptions().queryKey
      );
      if (todos) {
        //обновляем кэш
        queryClient.setQueryData(getTodoListInfinityQueryOptions().queryKey, {
          ...todos,
          pages: todos.pages.map((el) => ({
            ...el,
            data: el.data.filter((todos) => todos.id !== deletedId),
          })),
        });
      }
    },
  });

  const handleDeleteTodos = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      mutate(event.currentTarget.value);
    },
    []
  );

  return {
    isPending: (id: string) => isPending && variables === id,
    handleDeleteTodos,
  };
}
