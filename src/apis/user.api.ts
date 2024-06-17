import { Pagination, SuccessResponse, SuccessResponseFromBE } from "@/types/common.type";
import { User } from "@/types/user.type";
import http from "@/utils/http";
import { omit } from "lodash";

const userApis = {
  getUsers: ({ page, pageSize }: Pagination) =>
    http.get<SuccessResponse<SuccessResponseFromBE<User[]>>>(`/api/users?page=${page}&pageSize=${pageSize}`, {
      baseUrl: "",
      cache: "no-store",
    }),
  getUsersFromNextServer: ({ page, pageSize }: Pagination) =>
    http.get<SuccessResponseFromBE<User[]>>(`/users?page=${page}&pageSize=${pageSize}`, { cache: "no-store" }),

  getUserDetails: (id: string) => http.get<SuccessResponse<User>>(`/api/users/${id}`, { baseUrl: "", cache: "no-store" }),
  getUserDetailsFromNextServer: (id: string) => http.get<User>(`/users/${id}`, { cache: "no-store" }),

  createUser: (user: User) =>
    http.post<SuccessResponse<{ userId: string }>>("/api/users", user, {
      baseUrl: "",
    }),
  createUserFromNextServer: (user: User) => http.post<{ userId: string }>("/users", omit(user, ["id", "isActive"])),

  updateUser: (user: User) =>
    http.put<SuccessResponse<User>>("/api/users", user, {
      baseUrl: "",
    }),
  updateUserFromNextServer: (user: User) => http.put<User>(`/users/${user.id}`, { ...omit(user, ["id"]), userId: user.id }),

  deleteUser: (id: string) => http.delete<SuccessResponse<User>>("/api/users", { id }, { baseUrl: "" }),
  deleteUserFromNextServer: (id: string) => http.delete<User>(`/users/${id}`),
};

export default userApis;
