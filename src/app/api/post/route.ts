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

/**
 * 게시글 생성
 * @param req
 * @constructor
 */
export async function POST(req: NextRequest) {
  const {createData} = await req.json();

  const res = await authApi("/api/board", {
    method: "POST",
    body: JSON.stringify(createData),
  });
  const data = await res.json();

  return NextResponse.json(data);
}
