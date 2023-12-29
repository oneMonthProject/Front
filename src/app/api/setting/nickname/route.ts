const baseURL = process.env.NEXT_PUBLIC_BACKEND;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const nickname = searchParams.get('nickname');
  
  const res = await fetch(`${baseURL}/api/user/check-nickname/${nickname}/public`, {
    method: "GET",
  });
  const data = await res.json();

  return Response.json(data);
}
