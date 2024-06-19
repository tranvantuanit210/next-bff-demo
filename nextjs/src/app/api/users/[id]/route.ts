import { handleErrorNextServer } from "@/lib/utils";
import { getAccessTokenFromCookie, getAccessTokenFromHeader } from "@/app/utils/utils";
import userBffServices from "@/app/(app)/users/services/user.bff.service";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const accessToken = getAccessTokenFromHeader();
  try {
    const res = await userBffServices.getUserDetails(accessToken, params.id);
    return Response.json({ message: "Get users successfully!", data: res });
  } catch (error) {
    return handleErrorNextServer(error);
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const accessToken = getAccessTokenFromCookie();
  try {
    const res = await userBffServices.deleteUser(accessToken, params.id);
    return Response.json({ message: "Delete users successfully!", data: res });
  } catch (error) {
    return handleErrorNextServer(error);
  }
}
