export async function POST(request: Request) {
  const body = await request.json();
  const accessToken = body.accessToken;

  if (!accessToken) {
    return Response.json({ message: "Invalid token" });
  }
  try {
    return Response.json(body, {
      status: 200,
      headers: {
        "Set-cookie": `accessToken=${accessToken}; HttpOnly; Path=/; SameSite=Lax;`,
      },
    });
  } catch (error) {
    return Response.json(error, {
      status: 500,
    });
  }
}
