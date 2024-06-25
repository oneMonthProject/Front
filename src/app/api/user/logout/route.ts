import authApi from "@/app/api/_requestor/authApi";
import {NextRequest, NextResponse} from "next/server";
import { cookies } from "next/headers";
import {apiResponse} from "@/app/api/_requestor/apiResponse";

export async function POST(req:NextRequest) {
  const res = await authApi("/api/user/logout", { method: "POST" });

  if (res.ok) {
    const cookieStore = cookies();
    cookieStore.delete("user_id");
    cookieStore.delete("Access");
    cookieStore.delete("Refresh");
  }

  return apiResponse(req, res);
}
