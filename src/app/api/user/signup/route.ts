import index from "@/app/api/_interceptor/publicApi";
import { NextRequest, NextResponse } from "next/server";
import {routeResponse} from "@/app/api/_interceptor/routeResponse";

export async function POST(req: NextRequest) {
  const signUpRequest = await req.json();
  const res = await index("/api/user/public", {
    method: "POST",
    body: JSON.stringify(signUpRequest),
  });

  return routeResponse(req, res);
}
