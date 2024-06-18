export async function GET() {
  return Response.json(
    { message: "Logout successfully!" },
    {
      status: 200,
      headers: {
        "Set-cookie": `accessToken=; HttpOnly; Path=/; SameSite=Lax;`,
      },
    }
  );
}
