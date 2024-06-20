import { handleErrorNextServer } from "@/lib/utils";
import { type NextRequest } from "next/server";
import { getAccessTokenFromCookie, getAccessTokenFromHeader } from "@/app/utils/utils";
import userBeServices from "@/app/api/users/services/user.be.service";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
  const accessToken = getAccessTokenFromHeader();
  try {
    const res = await userBeServices.getUsers(accessToken, { page: Number(page), pageSize: Number(pageSize) });
    return Response.json({ message: "Get users successfully!", data: res });
  } catch (error: any) {
    return handleErrorNextServer(error);
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const accessToken = getAccessTokenFromCookie();
  try {
    const res = await userBeServices.createUser(accessToken, body);
    return Response.json({
      message: "User created!",
      data: res,
    });
  } catch (error: any) {
    return handleErrorNextServer(error);
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  const accessToken = getAccessTokenFromCookie();
  try {
    const res = await userBeServices.updateUser(accessToken, body);
    return Response.json({
      message: "User updated!",
      data: res,
    });
  } catch (error: any) {
    return handleErrorNextServer(error);
  }
}
