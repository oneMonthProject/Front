import "server-only";
import returnFetch from "return-fetch";
import {cookies} from "next/headers";
import {getRefreshToken} from "./common";
import Logger from "@/utils/logger";

const baseURL = process.env.NEXT_PUBLIC_BACKEND;

const reqLogger = new Logger('BACK_REQ');
const resLogger = new Logger('BACK_RES');

const authApi = returnFetch({
    baseUrl: baseURL,
    interceptors: {
        request: async (requestArgs) => {
            const cookieStore = cookies();
            const accessToken = cookieStore.get("Access");

            // access token 만료검사 요청
            if (requestArgs[1] && accessToken) {
                const headers = new Headers(requestArgs[1].headers);
                const contentType = headers.get("Content-Type");
                const args = contentType
                    ? {...headers}
                    : {"Content-Type": "application/json"};

                requestArgs[1].headers = {
                    ...args,
                    Authorization: `Bearer ${accessToken.value}`,
                };
            }

            reqLogger.i(`${requestArgs[1]!.method}: ${requestArgs[0]}`);
            return requestArgs;
        },
        response: async (response, requestArgs) => {
            if (response.status !== 401) {
                // 만료 안된경우 요청에 대한 원래 응답 반환
                resLogger.i(`${requestArgs[1]!.method} ${response.status}:  ${requestArgs[0]}`);
                return response;
            }

            // 만료된 경우 토큰 refresh 요청
            const cookieStore = cookies();
            const userId = cookieStore.get("user_id");
            const refreshToken = cookieStore.get("Refresh");
            if (userId && refreshToken) {
                reqLogger.i(`TOKEN-TRY-REFRESH ${requestArgs[0]}`);
                const tokenResponse = await fetch(`${baseURL}/api/user/token-reissue`, {
                    method: "POST",
                    body: JSON.stringify({userId: userId.value}),
                    headers: {
                        "Content-Type": "application/json",
                        Cookie: `Refresh=${refreshToken.value}`,
                    },
                    credentials: "include",
                });

                if (tokenResponse.ok) {
                    resLogger.i(`TOKEN-REFRESHED: ${requestArgs[0]}`);
                    const {headers} = tokenResponse;
                    const accessToken = headers.get("Authorization");
                    const setCookieHeader = headers.get("Set-Cookie");

                    if (accessToken && setCookieHeader) {
                        const {token, options} = getRefreshToken(setCookieHeader);

                        cookieStore.set("Access", accessToken, options);
                        cookieStore.set("Refresh", token, options);

                        console.log("complete the reissue of cookies..!");
                    }
                } else {
                    resLogger.e(`TOKEN-REFRESH-FAIL: Server Error(${tokenResponse.status}) - ${tokenResponse.statusText}`);
                    throw Error(`TOKEN-REFRESH-FAIL: Server Error(${tokenResponse.status}) - ${tokenResponse.statusText}`);
                }
            } else {
                const target = !userId && !refreshToken
                    ? 'user_id And RefreshToken' : (!userId ? 'user_id' : 'RefreshToken');

                resLogger.e(`TOKEN-REFRESH-FAIL: Failed To Get ${target} From Cookies`);
                throw Error(`TOKEN-REFRESH-FAIL: Failed To Get ${target} From Cookies`);
            }

            return await authApi(...requestArgs);
        },
    },
});

export default authApi;
