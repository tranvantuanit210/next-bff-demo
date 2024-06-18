import userApis from "@/services/user.service";
import { handleErrorNextServer } from "@/lib/utils";
import { type NextRequest } from "next/server";
import { cookies, headers } from "next/headers";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
  const headersList = headers();
  const accessToken = headersList.get("Authorization")?.split("Bearer ")[1] || "";
  try {
    const res = await userApis.getUsersFromNextServer(accessToken, { page: Number(page), pageSize: Number(pageSize) });
    return Response.json({ message: "Get users successfully!", data: res });
  } catch (error: any) {
    return handleErrorNextServer(error);
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  try {
    const res = await userApis.createUserFromNextServer(accessToken, body);
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
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  try {
    const res = await userApis.updateUserFromNextServer(accessToken, body);
    return Response.json({
      message: "User updated!",
      data: res,
    });
  } catch (error: any) {
    return handleErrorNextServer(error);
  }
}
