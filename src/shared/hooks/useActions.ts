import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "./useAppDispatch";
import { authActions } from "../../entities/auth/model/store/authSlice";
import { todoActions } from "../../entities/todo/model/store/todoSlice";

export const useActions = () => {
  const dispatch = useAppDispatch();

  return bindActionCreators({ ...authActions, ...todoActions }, dispatch);
};
