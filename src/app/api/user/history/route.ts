import authApi from "@/utils/authApi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageNumber = searchParams.get('pageNumber');
  
  const res = await authApi(`/api/user/me/project-history?pageNumber=${pageNumber}`, {
    method: "GET",
  });
  const data = await res.json();

  return Response.json(data);
}
