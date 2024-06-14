import { SuccessResponse } from "@/types/common.type";
import { User } from "@/types/user.type";
import http from "@/utils/http";
import { omit } from "lodash";

const userApis = {
  getUsers: () =>
    http.get<SuccessResponse<User[]>>("/api/users", {
      baseUrl: "",
      cache: "no-store",
    }),
  getUsersFromNextServer: () => http.get<User[]>("/users", { cache: "no-store" }),

  createUser: (user: Omit<User, "id">) =>
    http.post<SuccessResponse<User>>("/api/users", user, {
      baseUrl: "",
    }),
  createUserFromNextServer: (user: Omit<User, "id">) => http.post<User>("/users", omit(user, ["id"])),

  updateUser: (user: User) =>
    http.put<SuccessResponse<User>>("/api/users", user, {
      baseUrl: "",
    }),
  updateUserFromNextServer: (user: User) => http.put<User>(`/users/${user.id}`, omit(user, ["id"])),

  deleteUser: (id: string) => http.delete<SuccessResponse<User>>("/api/users", { id }, { baseUrl: "" }),
  deleteUserFromNextServer: (id: string) => http.delete<User>(`/users/${id}`),
};

export default userApis;
