import { NextRequest, NextResponse } from "next/server";
import authApi from "@/utils/authApi";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(req.url);

  let res: Response;
  if (params.slug === "simple") {
    res = await authApi("/api/user/simple-me");
  } else if (params.slug === "history") {
    const pageNumber = searchParams.get("pageNumber");
    res = await authApi(
      `/api/user/me/project-history?pageNumber=${pageNumber}`
    );
  } else if (params.slug === "trust-grade") {
    res = await authApi("/api/trust-grade/me");
  } else {
    throw Error("Unknown Api Route");
  }

  const data = await res.json();
  return NextResponse.json(data);
}
