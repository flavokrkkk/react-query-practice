import { useTodos } from "../hooks/useTodos";
import TodoCard from "./todoCard";
import { useCreateTodo } from "../hooks/useCreateTodo";
import { useDeleteTodo } from "../hooks/useDeleteTodos";
import { useToggleTodo } from "../hooks/useToggleTodo";
import { useAuth } from "../../auth/hooks/useAuth";

const TodoList = () => {
  const { error, data, isLoading, intersectionElement } = useTodos();

  const { handleSubmit, isPending } = useCreateTodo();

  const { handleDeleteTodos, isPending: isPendingDelete } = useDeleteTodo();

  const { handleUpdateTodo } = useToggleTodo();

  const { getCurrentUser } = useAuth();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <>
      <h1 className="text-center mb-4">
        Todo list: {getCurrentUser.data?.email}
      </h1>
      <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          className="border border-blue-500 rounded-lg p-1 outline-none"
          placeholder="Название...."
        />
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isPending}
            className="border bg-blue-400 text-white p-2 px-4 rounded-lg"
          >
            Создать
          </button>
        </div>
      </form>
      <div className="flex flex-col space-y-2">
        {data?.map((todo) => (
          <TodoCard
            key={todo.id}
            isPending={isPendingDelete}
            todo={todo}
            onUpdate={handleUpdateTodo}
            onDelete={handleDeleteTodos}
          />
        ))}
      </div>
      {intersectionElement}
    </>
  );
};

export default TodoList;
