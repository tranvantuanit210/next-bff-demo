import { handleErrorNextServer } from "@/lib/utils";
import { getAccessTokenFromHeader } from "@/app/utils/utils";
import userBeServices from "@/app/api/users/services/user.be.service";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const accessToken = getAccessTokenFromHeader();
  try {
    const res = await userBeServices.getUserDetails(accessToken, params.id);
    return Response.json({ message: "Get users successfully!", data: res });
  } catch (error) {
    return handleErrorNextServer(error);
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const res = await userBeServices.deleteUser(params.id);
    return Response.json({ message: "Delete users successfully!", data: res });
  } catch (error) {
    return handleErrorNextServer(error);
  }
}
