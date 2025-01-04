import { useInfiniteQuery } from "@tanstack/react-query";
import { getTodoListInfinityQueryOptions } from "../../../entities/todo/libs/todoService";
import { useIntersection } from "./useIntersection";

export function useTodos() {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...getTodoListInfinityQueryOptions(),
  });
  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  const intersectionElement = !isFetchingNextPage && (
    <div ref={cursorRef}>{!hasNextPage && <div>Нет данных</div>}</div>
  );

  return { error, data, isLoading, intersectionElement };
}
