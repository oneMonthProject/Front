import publicApi from "@/app/api/_requestor/publicApi";
import { NextRequest, NextResponse } from "next/server";
import {apiResponse} from "@/app/api/_requestor/apiResponse";

export async function POST(req: NextRequest) {
  const signUpRequest = await req.json();
  const res = await publicApi("/api/user/public", {
    method: "POST",
    body: JSON.stringify(signUpRequest),
  });

  return apiResponse(req, res);
}
