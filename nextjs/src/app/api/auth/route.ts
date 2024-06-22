import { cookies } from "next/headers";
import { handleErrorNextServer } from "@/lib/utils";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const body = await request.json();
  const accessToken = body.accessToken;

  if (!accessToken) {
    return Response.json(
      { message: "Invalid token" },
      {
        status: 401,
      }
    );
  }
  try {
    const cookieStore = cookies();
    const decodedAccessToken = jwt.decode(accessToken) as { exp: number };
    cookieStore.set("accessToken", accessToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: decodedAccessToken.exp * 1000,
    });
    return Response.json(body);
  } catch (error) {
    return handleErrorNextServer(error);
  }
}
