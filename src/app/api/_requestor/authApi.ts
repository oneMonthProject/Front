import "server-only";
import returnFetch from "return-fetch";
import {cookies} from "next/headers";
import {refreshToken} from "@/app/api/_requestor/refreshToken";
import {baseURL, reqLogger, resLogger} from "@/app/api/_requestor/common";
import {
    addToRetryRequests,
    addToRevalidatingUsers,
    deleteFromRevalidatingUsers,
    isRevalidatingUser,
    processRetryRequests
} from "@/app/api/_requestor/refreshQueue";


const authApi = returnFetch({
    baseUrl: baseURL,
    interceptors: {
        request: async (requestArgs) => {
            const cookieStore = cookies();
            const accessToken = cookieStore.get("Access");

            if (requestArgs[1] && accessToken) {
                const headers = new Headers(requestArgs[1].headers);

                if (!headers.get("Content-Type")) {
                    headers.set("Content-Type", "application/json");
                }

                headers.set("Authorization", `Bearer ${accessToken.value}`);
                requestArgs[1].headers = headers;
            }

            reqLogger.i(`${requestArgs[1]!.method}: ${requestArgs[0]}`);
            return requestArgs;
        },
        response: async (response, requestArgs) => {
            const requestInit = requestArgs[1]!;
            if (response.status !== 401) {
                if (response.status !== 200 && response.status !== 204) {
                    const copied = response.clone();
                    const data = await copied.json();
                    resLogger.i(`${requestInit.method} ${response.status}: ${requestArgs[0]} - ${data.error}`);
                }
                resLogger.i(`${requestInit.method} ${response.status}:  ${requestArgs[0]}`);
                return response;
            }


            const cookieStore = cookies();
            const userId = cookieStore.get("user_id")!.value;

            const retryOriginalRequest = new Promise<Response>((resolve, reject) => {
                addToRetryRequests(userId, async (error: Error | null) => {
                        if (error) {
                            reject(error);
                        } else {
                            try {
                                const newAccessToken = cookies().get("Access");
                                const headers = new Headers(requestInit.headers);
                                headers.set("Authorization", `Bearer ${newAccessToken?.value}`);
                                requestInit.headers = headers;
                                const retryResponse = await authApi(...requestArgs);
                                resolve(retryResponse);
                            } catch (retryError) {
                                reject(retryError);
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
