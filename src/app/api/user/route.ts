import authApi from "@/utils/authApi";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const res = await authApi("/api/user/me", {
    method: "GET",
  });
  const data = await res.json();

  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const updateData = await req.json();
  
  const res = await authApi("/api/user", {
    method: "PUT",
    body: JSON.stringify(updateData)
  });
  const data = await res.json();

  return NextResponse.json(data);
}
