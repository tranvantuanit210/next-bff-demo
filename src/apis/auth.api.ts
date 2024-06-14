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
};

export default authApis;
