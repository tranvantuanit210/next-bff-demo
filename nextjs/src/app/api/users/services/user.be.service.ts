import { Pagination, SuccessResponseFromBE } from "@/types/common.type";
import { User } from "@/app/(app)/users/types/user.type";
import http from "@/utils/http";
import { omit } from "lodash";

const userBffServices = {
  getUsers: (accessToken: string, { page, pageSize }: Pagination) =>
    http.get<SuccessResponseFromBE<User[]>>(`/users?page=${page}&pageSize=${pageSize}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),

  getUserDetails: (accessToken: string, id: string) =>
    http.get<User>(`/users/${id}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),

  createUser: (accessToken: string, user: User) =>
    http.post<{ userId: string }>("/users", omit(user, ["id", "isActive"]), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),

  updateUser: (accessToken: string, user: User) =>
    http.put<User>(
      `/users/${user.id}`,
      { ...omit(user, ["id"]), userId: user.id },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ),

  deleteUser: (accessToken: string, id: string) =>
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

export default userBffServices;
