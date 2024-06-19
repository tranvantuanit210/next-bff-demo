import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = cookies();
  cookieStore.delete("accessToken");
  return Response.json({ message: "Logout successfully!" });
}
