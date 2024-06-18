import { Pagination, SuccessResponse, SuccessResponseFromBE } from "@/types/common.type";
import { User } from "@/types/user.type";
import http from "@/utils/http";
import { omit } from "lodash";

const userApis = {
  getUsers: (accessToken: string, { page, pageSize }: Pagination) =>
    http.get<SuccessResponse<SuccessResponseFromBE<User[]>>>(`/api/users?page=${page}&pageSize=${pageSize}`, {
      baseUrl: "",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  getUsersFromNextServer: (accessToken: string, { page, pageSize }: Pagination) =>
    http.get<SuccessResponseFromBE<User[]>>(`/users?page=${page}&pageSize=${pageSize}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),

  getUserDetails: (accessToken: string, id: string) =>
    http.get<SuccessResponse<User>>(`/api/users/${id}`, {
      baseUrl: "",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  getUserDetailsFromNextServer: (accessToken: string, id: string) =>
    http.get<User>(`/users/${id}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),

  createUser: (user: User) =>
    http.post<SuccessResponse<{ userId: string }>>("/api/users", user, {
      baseUrl: "",
    }),
  createUserFromNextServer: (accessToken: string, user: User) =>
    http.post<{ userId: string }>("/users", omit(user, ["id", "isActive"]), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),

  updateUser: (user: User) =>
    http.put<SuccessResponse<User>>("/api/users", user, {
      baseUrl: "",
    }),
  updateUserFromNextServer: (accessToken: string, user: User) =>
    http.put<User>(
      `/users/${user.id}`,
      { ...omit(user, ["id"]), userId: user.id },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ),

  deleteUser: (id: string) => http.delete<SuccessResponse<{ userId: string }>>(`/api/users/${id}`, {}, { baseUrl: "" }),
  deleteUserFromNextServer: (accessToken: string, id: string) =>
    http.delete<{ userId: string }>(
      `/users/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ),
};

export default userApis;
