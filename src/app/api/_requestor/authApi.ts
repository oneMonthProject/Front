import "server-only";
import {cookies} from "next/headers";
import {refreshToken} from "@/app/api/_requestor/refreshToken";
import {baseURL, CONSTANT, getCookieValue, reqLogger, resLogger} from "@/app/api/_requestor/common";
import {
    addToRetryRequests,
    addToRevalidatingUsers,
    deleteFromRevalidatingUsers,
    isRevalidatingUser,
    processRetryRequests
} from "@/app/api/_requestor/refreshQueue";
import {CustomResponse, returnFetchWrapper} from "@/app/api/_requestor/returnFetchWrapper";
import {HttpStatusCode} from "axios";

const authApi = returnFetchWrapper({
    baseUrl: baseURL,
    interceptors: {
        request: async (requestArgs) => {
            const accessToken = getCookieValue(CONSTANT.ACS_TOKEN);
            if (!accessToken) {
                throw new Error('Interceptor Error: No Access Token, Please Retry');
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
            if (response.status !== 401) {

                if (!response.ok) {
                    response.headers.set('X-Error-Handle', 'retry')

                    const copied = response.clone();
                    const data = await copied.json();
                    resLogger.i(`${requestInit.method} ${response.status}: ${requestArgs[0]} - ${data.error}`);
                }

                resLogger.i(`${requestInit.method} ${response.status}:  ${requestArgs[0]}`);


                return response;
            }

            const userId = getCookieValue(CONSTANT.USER_ID);

            const retryOriginalRequest = new Promise<Response>((resolve, reject) => {
                addToRetryRequests(userId, async (error: Error | null) => {
                        if (error) {
                            let response:CustomResponse;

                            // 리프레쉬 토큰 만료된 경우
                            if(error.message === HttpStatusCode.Unauthorized.toString()){
                                const status = HttpStatusCode.Unauthorized
                                const resBody = {
                                    status,
                                    error: 'Not Authorized',
                                    message: '로그인 시간이 만료되었습니다. 다시 로그인 해주세요.'
                                }

                                response = new CustomResponse(JSON.stringify(resBody), {
                                    status,
                                    headers: {'X-Error-Handle': 'errorPage'}
                                });
                            }else{ // 기타 서버 에러
                                const status = HttpStatusCode.InternalServerError
                                const resBody = {
                                    status,
                                    error: 'Internal Server Error',
                                    message: '프로세스 수행중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.'
                                }

                                response = new CustomResponse(JSON.stringify(resBody), {
                                    status,
                                    headers: {'X-Error-Handle': 'errorPage'}
                                });
                            }

                            resolve(response);
                        } else {
                            try {
                                const newAccessToken = cookies().get("Access");
                                const headers = new Headers(requestInit.headers);
                                headers.set("Authorization", `Bearer ${newAccessToken?.value}`);
                                requestInit.headers = headers;
                                const retryResponse = await authApi(...requestArgs);
                                resolve(retryResponse);
                            } catch (retryError) {
                                const status = HttpStatusCode.InternalServerError
                                const resBody = {
                                    status,
                                    error: 'Internal Server Error',
                                    message: '프로세스 수행중 에러가 발생했습니다. 잠시 후 다시 시도해주세요.'
                                }

                                response = new CustomResponse(JSON.stringify(resBody), {
                                    status,
                                    headers: {'X-Error-Handle': 'errorPage'}
                                });

                                resolve(response);
                            }
                        }
                    }
                )
            });

            if (!isRevalidatingUser(userId)) {
                addToRevalidatingUsers(userId);
                try {
                    await refreshToken();
                    processRetryRequests(userId, null);
                } catch (refreshError: unknown) {
                    processRetryRequests(userId, refreshError as Error);
                } finally {
                    deleteFromRevalidatingUsers(userId)
                }
            }

            return retryOriginalRequest;
        }
    }
});


export default authApi;
