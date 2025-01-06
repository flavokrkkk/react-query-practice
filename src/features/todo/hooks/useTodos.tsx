import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { getTodoListInfinityQueryOptions } from "../../../entities/todo/libs/todoService";
import { useIntersection } from "./useIntersection";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";
import { authSelectors } from "../../../entities/auth/model/store/authSlice";

export function useTodos() {
  const userId = useAppSelector(authSelectors.userId) || "";

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    //дата подгружается без T | undefined
  } = useSuspenseInfiniteQuery({
    ...getTodoListInfinityQueryOptions(userId),
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  const intersectionElement = !isFetchingNextPage && (
    <div ref={cursorRef}>{!hasNextPage && <div>Нет данных</div>}</div>
  );

  return { error, data, isLoading, intersectionElement };
}
