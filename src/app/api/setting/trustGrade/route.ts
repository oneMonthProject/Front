import authApi from "@/utils/authApi";

export async function GET() {
  const res = await authApi("/api/trust-grade");
  const data = await res.json();

  return Response.json(data);
}
