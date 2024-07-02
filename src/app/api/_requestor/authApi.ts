import "server-only";
import {refreshToken} from "@/app/api/_requestor/refreshToken";
import {baseURL, CONSTANT, getCookieValue, getHttpStatusCode, reqLogger, resLogger} from "@/app/api/_requestor/common";
import {
    addToRetryRequests,
    addToRevalidatingUsers,
    deleteFromRevalidatingUsers,
    isRevalidatingUser,
    processRetryRequests
} from "@/app/api/_requestor/refreshQueue";
import {returnFetchWrapper} from "@/app/api/_requestor/returnFetchWrapper";
import {processPendingRequest} from "@/app/api/_requestor/pendingRequestQueue";



const authApi = returnFetchWrapper({
    baseUrl: baseURL,
    interceptors: {
        request: async (requestArgs) => {
            const accessToken = getCookieValue(CONSTANT.ACS_TOKEN);
            if (!accessToken) {
                const message = 'Interceptor Error: No Access Token, Please Retry'
                console.error(message)
                throw new Error(message);
            }

            if (requestArgs[1] && accessToken) {
                const headers = new Headers(requestArgs[1].headers);
                headers.set("Authorization", `Bearer ${accessToken}`);
                requestArgs[1].headers = headers;
            }

            reqLogger.i(`${requestArgs[1]!.method}: ${requestArgs[0]}`);
            return requestArgs;
        },
        response: async (response, requestArgs) => {

            const requestInit = requestArgs[1]!;

            // 토큰 만료 x
            if (response.status !== getHttpStatusCode('UNAUTHORIZED')) {
                if (!response.ok) {
                    // 기타 서버 에러
                    const copied = response.clone();
                    const data = await copied.json();
                    resLogger.i(`${requestInit.method} ${response.status}: ${requestArgs[0]} - ${data.message}`);
                    throw new Error(response.status.toString());
                }

                // 성공 응답
                resLogger.i(`${requestInit.method} ${response.status}:  ${requestArgs[0]}`);
                return response;
            }

            // 토큰 재발급 callback
            const userId = getCookieValue(CONSTANT.USER_ID);
            const retryOriginalRequest = new Promise<Response>((resolve, reject) => {
                addToRetryRequests(userId, async (error: Error | null) => {
                        if (error) {
                            // 토큰 재발급 실패한 경우 reject
                            reject(error);
                        } else {
                            // 토큰 재발급 성공하면 원래 요청 재시도
                            const newAccessToken = getCookieValue(CONSTANT.ACS_TOKEN);
                            const headers = new Headers(requestInit.headers);
                            headers.set("Authorization", `Bearer ${newAccessToken}`);
                            requestInit.headers = headers;
                            const retryResponse = await authApi(...requestArgs);
                            resolve(retryResponse);
                        }
                    }
                )
            });

            // 계정당 최초 토큰 재발급 요청 1개만 수행
            if (!isRevalidatingUser(userId)) {
                addToRevalidatingUsers(userId);
                try {
                    await refreshToken();
                    // 재발급 요청 완료되면 계정의 대기중인 모든 요청 수행
                    processRetryRequests(userId, null);
                    processPendingRequest(userId, null);
                } catch (refreshError: unknown) {
                    processRetryRequests(userId, refreshError as Error);
                    processPendingRequest(userId, refreshError as Error);
                } finally {
                    deleteFromRevalidatingUsers(userId)
                }
            }

            return retryOriginalRequest;
        }
    }
});


export default authApi;
