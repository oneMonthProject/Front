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
