import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  baseTodoKey,
  getTodoListInfinityQueryOptions,
  updateTodos,
} from "../../../entities/todo/libs/todoService";
import { ITodos } from "../../../entities/todo/types/types";
import { useCallback } from "react";

export function useToggleTodo() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (todo: Partial<ITodos> & { id: string }) => updateTodos(todo),
    onMutate: async (updateTodo: Partial<ITodos> & { id: string }) => {
      //2-й вариант optimistic update

      //отменяем все запросы по доступному ключу
      await queryClient.cancelQueries({
        queryKey: [baseTodoKey],
      });

      //берем данные из кэша
      const previousTodo = queryClient.getQueryData(
        getTodoListInfinityQueryOptions().queryKey
      );

      //обновляем данные в кэше
      queryClient.setQueryData(
        getTodoListInfinityQueryOptions().queryKey,
        (requestData) => {
          const data = requestData || { pages: [], pageParams: [] };

          return {
            ...data,
            pages: data.pages.map((el) => {
              const searchTodo = el.data.findIndex(
                (i) => i.id === updateTodo.id
              );
              if (searchTodo !== -1) {
                el.data[searchTodo] = { ...el.data[searchTodo], ...updateTodo };
              }
              return el;
            }),
          };
        }
      );

      return { previousTodo };
    },

    onError: (_, __, context) => {
      if (context) {
        queryClient.setQueryData(
          [getTodoListInfinityQueryOptions().queryKey],
          context.previousTodo
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [baseTodoKey],
      });
    },
  });

  const handleUpdateTodo = useCallback((id: string, done: boolean) => {
    mutate({
      id,
      done: !done,
    });
  }, []);

  return {
    isPending,
    handleUpdateTodo,
  };
}
