import authApi from "@/utils/authApi";

export async function GET() {
  const res = await authApi("/api/user/me", {
    method: "GET",
  });
  const data = await res.json();

  return Response.json(data);
}

export async function PUT(request: Request) {
  const updateData = await request.json();
  
  const res = await authApi("/api/user", {
    method: "PUT",
    body: JSON.stringify(updateData)
  });
  const data = await res.json();

  return Response.json(data);
}
