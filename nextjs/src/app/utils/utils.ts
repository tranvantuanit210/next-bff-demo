import { cookies, headers } from "next/headers";

export const getAccessTokenFromCookie = () => {
  const cookieStore = cookies();
  return cookieStore.get("accessToken")?.value || "";
};

export const getAccessTokenFromHeader = () => {
  const headersList = headers();
  return headersList.get("Authorization")?.split("Bearer ")[1] || "";
};
