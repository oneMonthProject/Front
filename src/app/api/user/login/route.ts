import publicApi from "@/utils/publicApi";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getRefreshToken } from "@/utils/common";

export async function POST(req: NextRequest) {
  const loginRequest = await req.json();

  const res = await publicApi("/api/user/login/public", {
    method: "POST",
    body: JSON.stringify(loginRequest),
    credentials: "include",
  });

  if (res.ok) {
    const { headers } = res;
    const accessToken = headers.get("Authorization");
    const setCookieHeader = headers.get("Set-Cookie");

    if (accessToken && setCookieHeader) {
      const { token, options } = getRefreshToken(setCookieHeader);

      const cookieStore = cookies();
      cookieStore.set("Access", accessToken, options);
      cookieStore.set("Refresh", token, options);
    }
  }
  const data = await res.json();
  return NextResponse.json(data);
}

export async function OPTIONS(request: Request) {
  const allowedOrigins = (process.env?.ALLOWED_ORIGIN || "").split(",");
  const origin = request.headers.get('origin')
  console.log("OPTIONS req Origin:::: ", origin);

  const exposedHeaders = (process.env?.EXPOSED_HEADERS || "").split(",");
  const maxAge = process.env?.MAX_AGE && parseInt(process.env?.MAX_AGE) || undefined;

  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin || "*",
      'Access-Control-Allow-Methods': 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
      'Access-Control-Allow-Headers': '*',
      "Access-Control-Expose-Headers": exposedHeaders.join(","),
      "Access-Control-Max-Age": maxAge?.toString() ?? ""
    }
  })
}
