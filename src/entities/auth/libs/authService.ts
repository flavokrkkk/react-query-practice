import { queryOptions } from "@tanstack/react-query";
import { IUser } from "../types/types";
import { jsonApiInstance } from "../../../shared/api/apiInstance";

export const baseUserKey: string = "users";

class UserService {
  public getUserById(id: string) {
    return queryOptions({
      queryKey: [baseUserKey, "id", id],
      queryFn: (meta) =>
        jsonApiInstance<IUser>(`/users/${id}`, {
          signal: meta.signal,
        }),
    });
  }

  public async login(
    user: Partial<IUser> & { email: string; password: string }
  ) {
    return jsonApiInstance<Array<IUser>>(
      `/users?login=${user.email}&password=${user.password}`
    ).then((data) => data[0]);
  }
}

export const { getUserById, login } = new UserService();
