import authApi from "@/utils/authApi";
import { NextRequest, NextResponse } from "next/server";
import {authApiResponse} from "@/app/api/_utils/authApiResponse";

export async function GET(req:NextRequest) {
  const res = await authApi("/api/user/me", {
    method: "GET",
  });

  return authApiResponse(req, res);
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
