import { useTodos } from "../hooks/useTodos";
import TodoCard from "./todoCard";
import { useCreateTodo } from "../hooks/useCreateTodo";

const TodoList = () => {
  const { error, data, isLoading, intersectionElement } = useTodos();

  const { handleSubmit, isPending } = useCreateTodo();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div className="w-[1200px] mx-auto space-y-2">
      <h1 className="text-center mb-4">Todo list</h1>
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
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </div>
      {intersectionElement}
    </div>
  );
};

export default TodoList;
