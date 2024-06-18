import userApis from "@/services/user.service";
import { handleErrorNextServer } from "@/lib/utils";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const res = await userApis.getUserDetailsFromNextServer(params.id);
    return Response.json({ message: "Get users successfully!", data: res });
  } catch (error) {
    return handleErrorNextServer(error);
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const res = await userApis.deleteUserFromNextServer(params.id);
    return Response.json({ message: "Delete users successfully!", data: res });
  } catch (error) {
    return handleErrorNextServer(error);
  }
}
