import { NextRequest, NextResponse } from "next/server";
import publicApi from "@/utils/publicApi";

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

  const data = await res.json();
  return NextResponse.json(data);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  let res: Response;
  if (params.slug === "recruitment-status") {
    const { searchParams } = new URL(req.url);
    const boardId = searchParams.get("boardId");
    res = await publicApi(`/api/board/${boardId}/recruitment-status`, {
      method: req.method,
    });
  } else {
    throw Error("Unknown Api Route");
  }

  const data = await res.json();
  return NextResponse.json(data);
}
