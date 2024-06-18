import userApis from "@/services/user.service";
import { handleErrorNextServer } from "@/lib/utils";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
  try {
    const res = await userApis.getUsersFromNextServer({ page: Number(page), pageSize: Number(pageSize) });
    return Response.json({ message: "Get users successfully!", data: res });
  } catch (error: any) {
    return handleErrorNextServer(error);
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const res = await userApis.createUserFromNextServer(body);
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
  try {
    const res = await userApis.updateUserFromNextServer(body);
    return Response.json({
      message: "User updated!",
      data: res,
    });
  } catch (error: any) {
    return handleErrorNextServer(error);
  }
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const id = body.id;
  try {
    await userApis.deleteUserFromNextServer(id);
    return Response.json({ message: "User Deleted!" });
  } catch (error: any) {
    return handleErrorNextServer(error);
  }
}
