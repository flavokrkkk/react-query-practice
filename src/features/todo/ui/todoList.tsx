import { getTodoListInfinityQueryOptions } from "../../../entities/todo/libs/todoService";
import { useState } from "react";
import clsx from "clsx";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useIntersection } from "../hooks/useIntersection";

const TodoList = () => {
  const [isEnabled, setIsEnabled] = useState(true);

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...getTodoListInfinityQueryOptions(),
    enabled: isEnabled,
  });

  const toggleEnabled = () => setIsEnabled((prev) => !prev);

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div className="w-[1200px] mx-auto space-y-2">
      <h1 className="text-center mb-4">Todo list</h1>
      <button
        className={clsx("bg-red-800", isEnabled && "bg-green-700")}
        onClick={toggleEnabled}
      >
        toggle enabled
      </button>
      <div className="flex flex-col space-y-2">
        {data?.map((todo) => (
          <div key={todo.id} className="border p-2 rounded-lg">
            {todo.title}
          </div>
        ))}
      </div>
      {!isFetchingNextPage && (
        <div ref={cursorRef}>{!hasNextPage && <div>Нет данных</div>}</div>
      )}
    </div>
  );
};

export default TodoList;
