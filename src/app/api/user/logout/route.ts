import authApi from "@/utils/authApi";

export async function POST() {
  const res = await authApi("/api/user/logout", { method: "POST" });
  const data = await res.json();

  return Response.json(data);
}
