import { NextRequest, NextResponse } from "next/server";
import publicApi from "@/utils/publicApi";

export async function GET(
  _: NextRequest,
  { params }: { params: { slug: string } }
) {
  let res: Response;
  if (params.slug === "position") {
    res = await publicApi("/api/position-list/public");
  } else if (params.slug === "tech-stack") {
    res = await publicApi("/api/technology-stack-list/public");
  } else if (params.slug === "tech-stack-category") {
    res = await publicApi("/api/technology-stack-category-list/public");
  } else if (params.slug === "tech-stack-with-category") {
    res = await publicApi("/api/technology-stack-category-mapping-list/public");
  } else {
    throw Error("Unknown Api Route");
  }

  if (res.ok) {
    const data = await res.json();
    return NextResponse.json(data);
  } else {
    if (res.status === 401) {
      _.cookies.delete("user_id");
      _.cookies.delete("Access");
      _.cookies.delete("Refresh");

      return new NextResponse(null, {status: 401});
    }

    return res;
  }
}
