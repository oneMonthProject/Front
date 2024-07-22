import "server-only";
import {refreshToken} from "@/app/api/_interceptor/authApi/refreshToken";
import {
    addToRetryRequests,
    addToRevalidatingUsers,
    deleteFromRevalidatingUsers,
    isRevalidatingUser,
    processRetryRequests
} from "@/app/api/_interceptor/authApi/refreshQueue";
import {processPendingRequest} from "@/app/api/_interceptor/authApi/pendingRequestQueue";
import {COOKIE, getCookieValue} from "@/app/api/_interceptor/utils/cookieUtils";
import {reqLogger, resLogger} from "@/app/api/_interceptor/utils/logger";
import {returnFetchWrapper} from "@/app/api/_interceptor/authApi/returnFetchWrapper";
import {GatewayError, ResponseError} from "@/app/api/_interceptor/error/classes";
import {getErrorCodeFromResponse} from "@/app/api/_interceptor/error/utils";
import {baseURL} from "@/app/api/_interceptor/utils/baseURL";


const authApi = returnFetchWrapper({
    baseUrl: baseURL,
    interceptors: {
        request: async (requestArgs) => {
            try {
                const requestInit = requestArgs[1]! as RequestInit;
                const accessToken = getCookieValue(COOKIE.ACS_TOKEN)!;

                // 액세스 토큰 세팅
                const headers = new Headers(requestInit.headers);
                headers.set("Authorization", `Bearer ${accessToken}`);
                requestInit.headers = headers;

                // body가 FormData일 경우 fetch시 자동으로 Content-Type 설정하도록
                if (requestInit.body instanceof FormData) {
                    const headers = new Headers(requestArgs[1]!.headers);
                    headers.delete('Content-Type');
                    requestInit.headers = headers;
                }

                reqLogger.i(`${requestInit.method}: ${requestArgs[0]}`);
            } catch (error: unknown) {
                throw new GatewayError('ESENDREQ', (error as Error).message);
            }

            return requestArgs;
        },
        response: async (response, requestArgs) => {
            const requestInit = requestArgs[1]!;

            if (response.ok) { // 성공 응답
                resLogger.i(`${requestInit.method} ${response.status}:  ${requestArgs[0]}`);
                return response;
            }

            const errorCode = await getErrorCodeFromResponse(response);

            // 실패 응답
            if (errorCode !== 'EXPIRED_TOKEN' && errorCode !== 'REFRESH_TOKEN_NOT_FOUND') {
                resLogger.i(`${requestInit.method} ${response.status}:  ${requestArgs[0]} - ${errorCode}`);
                throw new ResponseError(errorCode);
            }

            // 토큰 재발급 응답
            const userId = getCookieValue(COOKIE.USER_ID);
            const retryOriginalRequest = new Promise<Response>((resolve, reject) => {
                addToRetryRequests(userId, async (error: Error | null) => {
                        if (error) {  // 토큰 재발급 실패
                            reject(error);
                        } else { // 토큰 재발급 성공 - retry
                            try {
                                const newAccessToken = getCookieValue(COOKIE.ACS_TOKEN);
                                const headers = new Headers(requestInit.headers);
                                headers.set("Authorization", `Bearer ${newAccessToken}`);

                                // body가 FormData일 경우 fetch시 자동으로 Content-Type 설정하도록
                                if (requestInit.body instanceof FormData) {
                                    headers.delete('Content-Type');
                                }
                                requestInit.headers = headers;
                            } catch (error: unknown) {
                                new GatewayError('ESENDREQ', (error as Error).message);
                            }

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
                } catch (error: unknown) {
                    processRetryRequests(userId, error as Error);
                    processPendingRequest(userId, error as Error);
                } finally {
                    deleteFromRevalidatingUsers(userId)
                }
            }
            return retryOriginalRequest;
        }
    }
});


export default authApi;
