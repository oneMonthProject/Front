import authApi from "@/app/api/_requestor/authApi";
import publicApi from "@/utils/publicApi";
import { NextRequest, NextResponse } from "next/server";
import {authApiResponse} from "@/app/api/authApiResponse";
import {JSONReplaceBigInt} from "@/utils/common";

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
  const {board, project} = await req.json();

  const res = await authApi("/api/board", {
    method: "POST",
    body: JSONReplaceBigInt({board, project}),
  });

  return authApiResponse(req, res);
}
