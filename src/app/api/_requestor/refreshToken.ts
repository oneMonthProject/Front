import {cookies} from "next/headers";
import {getRefreshToken} from "@/utils/common";
import {baseURL, reqLogger, resLogger} from "@/app/api/_requestor/common";

export async function refreshToken(): Promise<void> {
    const cookieStore = cookies();
    const userId = cookieStore.get("user_id");
    const refreshToken = cookieStore.get("Refresh");

    if (!userId || !refreshToken) {
        throw new Error("No user ID or refresh token available");
    }

    reqLogger.i(`TOKEN-TRY-REFRESH`);

    const tokenResponse = await fetch(`${baseURL}/api/user/token-reissue`, {
        method: "POST",
        body: JSON.stringify({userId: userId.value}),
        headers: {
            "Content-Type": "application/json",
            Cookie: `Refresh=${refreshToken.value}`,
        },
        credentials: "include",
    });

    if (!tokenResponse.ok) {
        throw new Error(`Token refresh failed with status ${tokenResponse.status}`);
    }

    const {headers} = tokenResponse;
    const accessToken = headers.get("Authorization");
    const setCookieHeader = headers.get("Set-Cookie");

    if (accessToken && setCookieHeader) {
        const {token, options} = getRefreshToken(setCookieHeader);
        cookieStore.set("Access", accessToken, options);
        cookieStore.set("Refresh", token, options);
        resLogger.i(`TOKEN-REFRESH-SUCCESS`);
    } else {
        throw new Error("Token refresh response did not contain necessary headers");
    }
}