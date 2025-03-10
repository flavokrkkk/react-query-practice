import { asyncThunkCreator, buildCreateSlice } from "@reduxjs/toolkit";
import { rootReducer } from "../../../../app/store/store";
import { MutationObserver } from "@tanstack/react-query";
import { queryClient } from "../../../../shared/api/queryClient";
import {
  baseTodoKey,
  createTodos,
  getTodoListInfinityQueryOptions,
} from "../../libs/todoService";
import { ITodos } from "../../types/types";
import { nanoid } from "nanoid";
import { authActions } from "../../../auth/model/store/authSlice";
import { getUserById } from "../../../auth/libs/authService";

export type TodoState = {
  todos: Array<ITodos>;
};

const initialState: TodoState = {
  todos: [],
};

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const todoSlice = createSliceWithThunks({
  name: "todo-slice",
  initialState,
  selectors: {},
  reducers: (create) => ({
    createTodo: create.asyncThunk<
      Array<ITodos> | undefined,
      string,
      { rejectValue: string }
    >(
      async (title: string, { rejectWithValue, getState, dispatch }) => {
        const userId = (getState() as any).auth.userId;
        if (!userId) {
          dispatch(authActions.logout());
          return rejectWithValue("User not authenticated");
        }
        //получаем данные из кэша
        const user = await queryClient.fetchQuery(getUserById(userId));

        const newTodo = {
          id: nanoid(),
          done: false,
          title: `${title} - Owner: ${user.email.split("@")[0]}`,
          userId: userId,
        };

        const prevTodos = queryClient.getQueryData(
          getTodoListInfinityQueryOptions(userId).queryKey
        );
        queryClient.cancelQueries({
          queryKey: [baseTodoKey],
        });

        const updateTodosList = queryClient.setQueryData(
          getTodoListInfinityQueryOptions(userId).queryKey,
          (requestData) => {
            const data = requestData || { pages: [], pageParams: [] };
            return {
              ...data,
              pages: [
                ...data.pages.map((el) => ({
                  ...el,
                  data: [...el.data, newTodo],
                })),
              ],
            };
          }
        );
        try {
          await new MutationObserver(queryClient, {
            mutationFn: createTodos,
          }).mutate(newTodo);

          return updateTodosList?.pages[0].data;
        } catch (err) {
          queryClient.setQueryData(
            getTodoListInfinityQueryOptions(userId).queryKey,
            prevTodos
          );
          return rejectWithValue(String(err));
        } finally {
          queryClient.invalidateQueries({
            queryKey: [baseTodoKey],
          });
        }
      },
      {
        fulfilled: (state, { payload }) => {
          state.todos = payload ?? [];
        },
      }
    ),
  }),
}).injectInto(rootReducer);

export const todoActions = todoSlice.actions;
export const todoSelectors = todoSlice.selectors;
