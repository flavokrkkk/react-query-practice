import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  baseTodoKey,
  createTodos,
} from "../../../entities/todo/libs/todoService";
import { FormEvent } from "react";
import { nanoid } from "nanoid";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createTodos,
    // onSettled вызывает действие, даже если произошла ошибка
    onSettled: async () => {
      //для мгновенного отображения данных, даже если они в кэше
      await queryClient.invalidateQueries({ queryKey: [baseTodoKey] });
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const title = formData.get("title")?.toString() ?? "";
    mutate({
      id: nanoid(),
      done: false,
      title: title,
      userId: "1",
    });
    event.currentTarget.reset();
  };

  return {
    isPending,
    handleSubmit,
  };
}
