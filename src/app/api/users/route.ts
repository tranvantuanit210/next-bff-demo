import userApis from "@/apis/user.api";
import { User } from "@/types/user.type";
import http from "@/utils/http";

export async function GET() {
  const res = await userApis.getUsersFromNextServer();

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
  const res = await userApis.updateUserFromNextServer(body);
  return Response.json({
    message: "User updated!",
    data: res,
  });
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const id = body.id;
  await userApis.deleteUserFromNextServer(id);
  return Response.json({ message: "User Deleted!" });
}
