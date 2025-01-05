import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../../entities/auth/libs/authService";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";
import { authSelectors } from "../../../entities/auth/model/store/authSlice";

export const useAuth = () => {
  const userId = useAppSelector(authSelectors.userId);

  const getCurrentUser = useQuery({
    ...getUserById(userId!),
    enabled: Boolean(userId),
  });

  return {
    getCurrentUser,
  };
};
