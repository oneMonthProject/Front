import authApi from "@/utils/authApi";
import publicApi from "@/utils/publicApi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  const res = await publicApi(`/api/board/${postId}/public`);
  const data = await res.json();

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const createDate = await req.json();

  const res = await authApi("/api/board", {
    method: "POST",
    body: JSON.stringify(createDate),
  });
  const data = await res.json();

  return NextResponse.json(data);
}
