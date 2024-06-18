import userApis from "@/services/user.service";
import { handleErrorNextServer } from "@/lib/utils";
import { cookies, headers } from "next/headers";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const headersList = headers();
  const accessToken = headersList.get("Authorization")?.split("Bearer ")[1] || "";
  try {
    const res = await userApis.getUserDetailsFromNextServer(accessToken, params.id);
    return Response.json({ message: "Get users successfully!", data: res });
  } catch (error) {
    return handleErrorNextServer(error);
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value || "";
  try {
    const res = await userApis.deleteUserFromNextServer(accessToken, params.id);
    return Response.json({ message: "Delete users successfully!", data: res });
  } catch (error) {
    return handleErrorNextServer(error);
  }
}
