import {cookies} from "next/headers";
import {getRefreshToken} from "@/utils/common";
import {baseURL} from "@/app/api/_requestor/httpStatus";
import {COOKIE, deleteCookieValue, getCookieValue} from "@/app/api/_requestor/cookieUtils";
import {reqLogger, resLogger} from "@/app/api/_requestor/apiLogger";
import {getResErrorMessage} from "@/app/api/_requestor/responseUtils";

const userRefToken: Map<string, string> = new Map();
const getUserRefToken = (userId:string) => userRefToken.get(userId);

const setUserRefToken = (userId:string, token:string) => userRefToken.set(userId, token);

const deleteUserRefToken = (userId:string) => userRefToken.delete(userId);

export async function refreshToken(): Promise<void> {

    const userId = getCookieValue(COOKIE.USER_ID);
    let refreshToken = getUserRefToken(userId);

    if(refreshToken === undefined){
       refreshToken = getCookieValue(COOKIE.REF_TOKEN);
       setUserRefToken(userId, refreshToken);
    }

    if (!userId || !refreshToken) {
        throw new Error("No user ID or refresh token available");
    }

    reqLogger.i(`TOKEN-TRY-REFRESH`);

    const requestURL = `${baseURL}/api/user/token-reissue`;

    const tokenResponse = await fetch(requestURL, {
        method: "POST",
        body: JSON.stringify({userId}),
        headers: {
            "Content-Type": "application/json",
            Cookie: `Refresh=${refreshToken}`,
        },
        credentials: "include",
    });

    // 토큰 재발급 실패
    if (!tokenResponse.ok) {
        deleteCookieValue(COOKIE.ACS_TOKEN);
        deleteCookieValue(COOKIE.USER_ID);
        deleteCookieValue(COOKIE.REF_TOKEN);
        deleteUserRefToken(userId);

        const errorMessage = await getResErrorMessage(tokenResponse);
        console.log("errorMessage::::: ", errorMessage);
        resLogger.i(`POST ${tokenResponse.status}: ${requestURL} - ${errorMessage}`);
        throw new Error(errorMessage);
    }

    // 토큰 재발급 성공
    const {headers} = tokenResponse;
    const accessToken = headers.get("Authorization");
    const setCookieHeader = headers.get("Set-Cookie");

    if (accessToken && setCookieHeader) { // 액세스 & 리프레쉬 토큰 세팅
        const {token, options} = getRefreshToken(setCookieHeader);
        const cookieStore = cookies();
        cookieStore.set(COOKIE.ACS_TOKEN, accessToken, options);
        cookieStore.set(COOKIE.REF_TOKEN, token, options);
        setUserRefToken(userId, cookieStore.get(COOKIE.REF_TOKEN)!.value);
        resLogger.i(`TOKEN-REFRESH-SUCCESS`);
    } else {
        const message = "Token refresh response did not contain necessary headers"
        console.error(message);
        throw new Error(message);
    }
}