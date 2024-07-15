import publicApi from "@/app/api/_requestor/publicApi";
import { NextRequest, NextResponse } from "next/server";
import {routeResponseHandler} from "@/app/api/_requestor/routeResponseHandler";

export async function POST(req: NextRequest) {
  const signUpRequest = await req.json();
  const res = await publicApi("/api/user/public", {
    method: "POST",
    body: JSON.stringify(signUpRequest),
  });

  return routeResponseHandler(req, res);
}
