import http from "@/utils/http";

const authApis = {
  auth: (accessToken: string) =>
    http.post(
      "/api/auth",
      { accessToken },
      {
        baseUrl: "",
      }
    ),

  logout: () => http.get<{ message: string }>("/api/auth/logout", { baseUrl: "" }),
};

export default authApis;
