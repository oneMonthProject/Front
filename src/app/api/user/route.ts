import authApi from "@/utils/authApi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  const res = await authApi("/api/user/me", {
    method: "GET",
  });

  if (res.ok) {
    const data = await res.json();
    return NextResponse.json(data);
  } else {
    if (res.status === 401) {
      req.cookies.delete("user_id");
      req.cookies.delete("Access");
      req.cookies.delete("Refresh");

      return new NextResponse(null, {status: 401});
    }

    return res;
  }
}

export async function PUT(req: NextRequest) {
  const formData = await req.formData();
  const requestHeaders = new Headers(req.headers);

  const res = await authApi(`/api/user`, {
    method: "PUT",
    headers: requestHeaders,
    body: formData,
  });

  const data = await res.json();
  return NextResponse.json(data);
}
