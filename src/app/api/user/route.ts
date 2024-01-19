import authApi from "@/utils/authApi";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const res = await authApi("/api/user/me", {
    method: "GET",
  });

  const data = await res.json();
  return NextResponse.json(data);
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
