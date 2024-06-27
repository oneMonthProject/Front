import authApi from "@/app/api/_requestor/authApi";
import publicApi from "@/app/api/_requestor/publicApi";
import { NextRequest, NextResponse } from "next/server";
import {apiResponse} from "@/app/api/_requestor/apiResponse";
import {JSONReplaceBigInt} from "@/utils/common";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId");

  const res = await publicApi(`/api/board/${postId}/public`);

  return apiResponse(req, res);
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

  return apiResponse(req, res);
}
