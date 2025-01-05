import {
  asyncThunkCreator,
  buildCreateSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { rootReducer } from "../../../../app/store/store";
import { IUser } from "../../types/types";
import { queryClient } from "../../../../shared/api/queryClient";
import { login } from "../../libs/authService";
import { MutationObserver } from "@tanstack/react-query";

export type AuthState = {
  userId: string | null;
  loginError?: string | null;
};

const initialState: AuthState = {
  userId: localStorage.getItem("userId") || null,
  loginError: null,
};

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const authSlice = createSliceWithThunks({
  name: "auth-slice",
  initialState,
  selectors: {
    userId: (state) => state.userId,
    loginError: (state) => state.loginError,
  },
  reducers: (create) => ({
    setUser: create.reducer(
      (state, { payload: { userId } }: PayloadAction<{ userId: string }>) => {
        state.userId = userId;
      }
    ),
    removeUser: create.reducer((state) => {
      state.userId = null;
    }),
    login: create.asyncThunk<
      IUser,
      Partial<IUser> & { email: string; password: string },
      { rejectValue: string }
    >(
      async (
        user: Partial<IUser> & { email: string; password: string },
        { rejectWithValue }
      ) => {
        try {
          const mutationResult = await new MutationObserver(queryClient, {
            mutationFn: login,
            mutationKey: ["login"],
          }).mutate(user);

          return mutationResult;
        } catch (err) {
          return rejectWithValue(String(err));
        }
      },
      {
        fulfilled: (state, { payload }) => {
          localStorage.setItem("userId", payload.id);
          state.userId = payload.id;
        },
        rejected: (state) => {
          state.loginError = "Неверный логин или пароль!";
        },
      }
    ),
  }),
}).injectInto(rootReducer);

export const authActions = authSlice.actions;
export const authSelectors = authSlice.selectors;
