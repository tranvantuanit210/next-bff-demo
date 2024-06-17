import userApis from "@/apis/user.api";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const res = await userApis.getUserDetailsFromNextServer(params.id);

  return Response.json({ message: "Get users successfully!", data: res });
}
