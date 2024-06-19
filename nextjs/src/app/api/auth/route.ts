import { cookies } from "next/headers";
import { handleErrorNextServer } from "@/lib/utils";

export async function POST(request: Request) {
  const body = await request.json();
  const accessToken = body.accessToken;

  if (!accessToken) {
    return Response.json({ message: "Invalid token" });
  }
  try {
    const cookieStore = cookies();
    cookieStore.set("accessToken", accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });
    return Response.json(body);
  } catch (error) {
    return handleErrorNextServer(error);
  }
}
