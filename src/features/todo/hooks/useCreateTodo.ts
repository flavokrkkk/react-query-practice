import { FormEvent } from "react";
import { useActions } from "../../../shared/hooks/useActions";

export function useCreateTodo() {
  const { createTodo } = useActions();
  // const { mutate, isPending } = useMutation({
  //   mutationFn: createTodos,
  //   // onSettled вызывает действие, даже если произошла ошибка
  //   onSettled: async () => {
  //     //для мгновенного отображения данных, даже если они в кэше
  //     await queryClient.invalidateQueries({ queryKey: [baseTodoKey] });
  //   },
  // });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const title = formData.get("title")?.toString() ?? "";
    createTodo(title);
    event.currentTarget.reset();
  };

  return {
    isPending: false,
    handleSubmit,
  };
}
