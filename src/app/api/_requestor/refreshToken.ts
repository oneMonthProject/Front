import {cookies} from "next/headers";
import {getRefreshToken} from "@/utils/common";
import {
    baseURL,
    CONSTANT,
    deleteCookieValue,
    getCookieValue,
    getHttpStatusCode,
    reqLogger,
    resLogger
} from "@/app/api/_requestor/common";

const userRefToken: Map<string, string> = new Map();
const getUserRefToken = (userId:string) => userRefToken.get(userId);

const setUserRefToken = (userId:string, token:string) => userRefToken.set(userId, token);

const deleteUserRefToken = (userId:string) => userRefToken.delete(userId);

export async function refreshToken(): Promise<void> {

    const userId = getCookieValue(CONSTANT.USER_ID);
    let refreshToken = getUserRefToken(userId);

    if(refreshToken === undefined){
       refreshToken = getCookieValue(CONSTANT.REF_TOKEN);
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
        if (tokenResponse.status === getHttpStatusCode('UNAUTHORIZED')) {
            // 리프레쉬 토큰 만료
            deleteCookieValue(CONSTANT.ACS_TOKEN);
            deleteCookieValue(CONSTANT.USER_ID);
            deleteCookieValue(CONSTANT.REF_TOKEN);
            deleteUserRefToken(userId);
            resLogger.i(`TOKEN-REFRESH-EXPIRED`);
        }else{
            // 기타 서버 에러
            const copied = tokenResponse.clone();
            const data = await copied.json();
            resLogger.i(`POST ${tokenResponse.status}: ${requestURL} - ${data.message}`);
        }

        throw new Error(tokenResponse.status.toString());
    }

    // 토큰 재발급 성공
    const {headers} = tokenResponse;
    const accessToken = headers.get("Authorization");
    const setCookieHeader = headers.get("Set-Cookie");

    if (accessToken && setCookieHeader) { // 액세스 & 리프레쉬 토큰 세팅
        const {token, options} = getRefreshToken(setCookieHeader);
        const cookieStore = cookies();
        cookieStore.set(CONSTANT.ACS_TOKEN, accessToken, options);
        cookieStore.set(CONSTANT.REF_TOKEN, token, options);
        setUserRefToken(userId, cookieStore.get(CONSTANT.REF_TOKEN)!.value);
        resLogger.i(`TOKEN-REFRESH-SUCCESS`);
    } else {
        const message = "Token refresh response did not contain necessary headers"
        console.error(message);
        throw new Error(message);
    }
}