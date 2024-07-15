import "server-only";
import {refreshToken} from "@/app/api/_requestor/refreshToken";
import {
    addToRetryRequests,
    addToRevalidatingUsers,
    deleteFromRevalidatingUsers,
    isRevalidatingUser,
    processRetryRequests
} from "@/app/api/_requestor/refreshQueue";
import {returnFetchWrapper} from "@/app/api/_requestor/returnFetchWrapper";
import {processPendingRequest} from "@/app/api/_requestor/pendingRequestQueue";
import {baseURL, HttpStatus} from "@/app/api/_requestor/httpStatus";
import {COOKIE, getCookieValue} from "@/app/api/_requestor/cookieUtils";
import {reqLogger, resLogger} from "@/app/api/_requestor/apiLogger";
import {createErrorResponse, ErrorResponseMessage, getResErrorMessage} from "@/app/api/_requestor/responseUtils";


const authApi = returnFetchWrapper({
    baseUrl: baseURL,
    interceptors: {
        request: async (requestArgs) => {
            const accessToken = getCookieValue(COOKIE.ACS_TOKEN);
            if (!accessToken) {
                const message = 'Interceptor Error: No Access Token, Please Retry'
                console.error(message)
                throw new Error(message);
            }

            // 액세스 토큰 세팅
            if (requestArgs[1] && accessToken) {
                const headers = new Headers(requestArgs[1].headers);
                headers.set("Authorization", `Bearer ${accessToken}`);
                requestArgs[1].headers = headers;
            }

            // body가 FormData일 경우 fetch시 자동으로 Content-Type 설정하도록
            if (requestArgs[1]!.body instanceof FormData) {
                const headers = new Headers(requestArgs[1]!.headers);
                headers.delete('Content-Type');
                requestArgs[1]!.headers = headers;
            }

            reqLogger.i(`${requestArgs[1]!.method}: ${requestArgs[0]}`);

            return requestArgs;
        },
        response: async (response, requestArgs) => {
            const requestInit = requestArgs[1]!;

            if (response.ok) { // 성공 응답
                resLogger.i(`${requestInit.method} ${response.status}:  ${requestArgs[0]}`);
                return response;
            }

            const resMessage = await getResErrorMessage(response);
            const userId = getCookieValue(COOKIE.USER_ID);
            if (resMessage === 'EXPIRED_TOKEN') { // 토큰 재발급 필요한 경우
                const retryOriginalRequest = new Promise<Response>((resolve, reject) => {
                    addToRetryRequests(userId, async (error: Error | null) => {
                            if (error) {
                                // 토큰 재발급 실패한 경우 reject
                                reject(error);
                            } else {
                                // 토큰 재발급 성공하면 원래 요청 재시도
                                const newAccessToken = getCookieValue(COOKIE.ACS_TOKEN);
                                const headers = new Headers(requestInit.headers);
                                headers.set("Authorization", `Bearer ${newAccessToken}`);

                                // body가 FormData일 경우 fetch시 자동으로 Content-Type 설정하도록
                                if (requestArgs[1]!.body instanceof FormData) {
                                    headers.delete('Content-Type');
                                }

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

            }else{
                resLogger.i(`${requestInit.method} ${response.status}:  ${requestArgs[0]} - ${resMessage}`);
                return await createErrorResponse(response);
            }


        }
    }
});


export default authApi;
