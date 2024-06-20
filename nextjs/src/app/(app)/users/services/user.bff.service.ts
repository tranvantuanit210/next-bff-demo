import { Pagination, SuccessResponse, SuccessResponseFromBE } from "@/types/common.type";
import { User } from "@/app/(app)/users/types/user.type";
import http from "@/utils/http";

const userServices = {
  getUsers: (accessToken: string, { page, pageSize }: Pagination) =>
    http.get<SuccessResponse<SuccessResponseFromBE<User[]>>>(`/api/users?page=${page}&pageSize=${pageSize}`, {
      baseUrl: "",
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

  createUser: (user: User) =>
    http.post<SuccessResponse<{ userId: string }>>("/api/users", user, {
      baseUrl: "",
    }),

  updateUser: (user: User) =>
    http.put<SuccessResponse<User>>("/api/users", user, {
      baseUrl: "",
    }),

  deleteUser: (id: string) => http.delete<SuccessResponse<{ userId: string }>>(`/api/users/${id}`, {}, { baseUrl: "" }),
};

export default userServices;
