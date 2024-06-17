import publicApi from "@/utils/publicApi";
import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {getRefreshToken} from "@/utils/common";

export async function POST(req: NextRequest) {
    const loginRequest = await req.json();

    const res = await publicApi("/api/user/login/public", {
        method: "POST",
        body: JSON.stringify(loginRequest),
        credentials: "include",
    });

    let resData = {
        data: null,
        result: "error",
        message: "error"
    };

    if (res.ok) {
        const {headers} = res;
        const accessToken = headers.get("Authorization");
        const setCookieHeader = headers.get("Set-Cookie");

      const cookieStore = cookies();
        if (accessToken && setCookieHeader) {
            const {token, options} = getRefreshToken(setCookieHeader);
            cookieStore.set("Access", accessToken, options);
            cookieStore.set("Refresh", token, options);
        }
        resData = await res.json();
        cookieStore.set("user_id", resData.data!);
    }
    return NextResponse.json(resData);
}