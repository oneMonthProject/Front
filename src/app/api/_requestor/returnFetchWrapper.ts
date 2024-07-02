import "server-only";
import returnFetch, {ReturnFetchDefaultOptions} from "return-fetch";
import {CONSTANT, createErrorResponse, getCookieValue} from "@/app/api/_requestor/common";
import {isRevalidatingUser} from "@/app/api/_requestor/refreshQueue";
import {addToPendingRequest} from "@/app/api/_requestor/pendingRequestQueue";
import {CustomResponse} from "@/app/api/_requestor/type";


export const returnFetchWrapper = (args?: ReturnFetchDefaultOptions) => {

    const fetch = returnFetch(args);

    return async (url: (string | URL), requestInit?: RequestInit): Promise<CustomResponse> => {
        const userId = getCookieValue(CONSTANT.USER_ID);

        if (!isRevalidatingUser(userId)) {
            const requestHeaders = requestInit?.headers;
            if (requestHeaders) {
                const headers = new Headers(requestInit?.headers);
                if (!headers.get("Content-Type")) {
                    headers.set("Content-Type", "application/json");
                }
                requestInit!.headers = headers;
            }

            try {
                return await fetch(url, {...requestInit});
            } catch (e) {
                return createErrorResponse(e);
            }
        } else {
            return new Promise((resolve) => {
                addToPendingRequest(userId, async (error: Error | null) => {
                    let response: Response;

                    if (error) {
                        response = createErrorResponse(error);
                    } else {
                        const requestHeaders = requestInit?.headers;
                        if (requestHeaders) {
                            const headers = new Headers(requestInit?.headers);
                            if (!headers.get("Content-Type")) {
                                headers.set("Content-Type", "application/json");
                            }
                            requestInit!.headers = headers;
                        }

                        try {
                            response = await fetch(url, {...requestInit});
                        } catch (e) {
                            response = createErrorResponse(e);
                        }
                    }
                    resolve(response);
                });
            });
        }

    }
}