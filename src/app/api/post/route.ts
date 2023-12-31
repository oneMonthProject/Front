import authApi from "@/utils/authApi";

export async function POST(request: Request) {
  const createDate = await request.json();
  
  const res = await authApi("/api/board", {
    method: "POST",
    body: JSON.stringify(createDate)
  });
  const data = await res.json();

  return Response.json(data);
}