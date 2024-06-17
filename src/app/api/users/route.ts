import userApis from "@/apis/user.api";
import { User } from "@/types/user.type";
import http from "@/utils/http";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get("page");
  const pageSize = searchParams.get("pageSize");
  const res = await userApis.getUsersFromNextServer({ page: Number(page), pageSize: Number(pageSize) });

  return Response.json({ message: "Get users successfully!", data: res });
}

export async function POST(request: Request) {
  const body = await request.json();
  const res = await http.post<User>("/users", body);
  return Response.json({
    message: "User created!",
    data: res,
  });
}

export async function PUT(request: Request) {
  const body = await request.json();
  try {
    const res = await userApis.updateUserFromNextServer(body);
    return Response.json({
      message: "User updated!",
      data: res,
    });
  } catch (error) {
    console.log(error);
    return Response.json({
      error,
    });
  }
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const id = body.id;
  await userApis.deleteUserFromNextServer(id);
  return Response.json({ message: "User Deleted!" });
}
