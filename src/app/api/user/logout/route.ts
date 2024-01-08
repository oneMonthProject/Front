import authApi from "@/utils/authApi";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const res = await authApi("/api/user/logout", { method: "POST" });

  if (res.ok) {
    const cookieStore = cookies();
    cookieStore.delete("user_id");
    cookieStore.delete("Access");
    cookieStore.delete("Refresh");
  }

  const data = await res.json();
  return NextResponse.json(data);
}
