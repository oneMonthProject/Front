import publicApi from "@/utils/publicApi";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const signUpRequest = await req.json();
  const res = await publicApi("/api/user/public", {
    method: "POST",
    body: JSON.stringify(signUpRequest),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
