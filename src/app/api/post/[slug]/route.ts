import { NextRequest, NextResponse } from "next/server";
import publicApi from "@/app/api/_requestor/publicApi";
import authApi from "@/app/api/_requestor/authApi";
import {apiResponse} from "@/app/api/_requestor/apiResponse";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  let res: Response;
  if (params.slug === "search") {
    const queryParams = req.nextUrl.search;
    res = await publicApi(`/api/board/search/public${queryParams}`);
  } else {
    throw Error("Unknown Api Route");
  }

  return apiResponse(req, res);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  let res: Response;
  if (params.slug === "recruitment-status") {
    const { searchParams } = new URL(req.url);
    const boardId = searchParams.get("boardId");
    res = await authApi(`/api/board/${boardId}/recruitment-status`, {
      method: req.method,
    });
  } else {
    throw Error("Unknown Api Route");
  }

  return apiResponse(req, res);
}
