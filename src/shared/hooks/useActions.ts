import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "./useAppDispatch";
import { authActions } from "../../entities/auth/model/store/authSlice";

export const useActions = () => {
  const dispatch = useAppDispatch();

  return bindActionCreators({ ...authActions }, dispatch);
};
