import authApi from "@/utils/authApi";

export async function GET() {
  const res = await authApi("/api/user/simple-me", {
    method: "GET",
  });
  const data = await res.json();

  return Response.json(data);
}
