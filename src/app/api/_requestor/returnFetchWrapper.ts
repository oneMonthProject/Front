import "server-only";
import returnFetch, {ReturnFetchDefaultOptions} from "return-fetch";
import {isRevalidatingUser} from "@/app/api/_requestor/refreshQueue";
import {addToPendingRequest} from "@/app/api/_requestor/pendingRequestQueue";
import {CustomResponse} from "@/app/api/_requestor/type";
import {COOKIE, getCookieValue} from "@/app/api/_requestor/cookieUtils";
import {createErrorResponse} from "@/app/api/_requestor/responseUtils";
import {commonRequestHeaders} from "@/app/api/_requestor/requestUtils";


export const returnFetchWrapper = (args?: ReturnFetchDefaultOptions) => {

    const fetch = returnFetch(args);

    return async (url: (string | URL), requestInit?: RequestInit): Promise<CustomResponse> => {
        const userId = getCookieValue(COOKIE.USER_ID);

        if (!isRevalidatingUser(userId)) {
            if (requestInit) requestInit!.headers = commonRequestHeaders(requestInit);
            try {
                return await fetch(url, {...requestInit});
            } catch (e: unknown) {
                return await createErrorResponse((e as Error));
            }
        } else {
            return new Promise((resolve) => {
                addToPendingRequest(userId, async (error: Error | null) => {
                    let response: Response;

                    if (error) {
                        response = await createErrorResponse((error as Error));
                    } else {
                        if (requestInit) requestInit!.headers = commonRequestHeaders(requestInit);

                        try {
                            response = await fetch(url, {...requestInit});
                        } catch (fetchError:unknown) {
                            response = await createErrorResponse((fetchError as Error));
                        }
                    }
                    resolve(response);
                });
            });
        }

    }
}