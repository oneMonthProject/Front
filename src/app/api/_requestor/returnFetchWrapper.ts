import "server-only";
import returnFetch, {ReturnFetchDefaultOptions} from "return-fetch";
import {
    commonHeaders,
    CONSTANT,
    createErrorResponse,
    getCookieValue,
    getHttpStatusCode, isHttpStatusCode, resLogger
} from "@/app/api/_requestor/common";
import {isRevalidatingUser} from "@/app/api/_requestor/refreshQueue";
import {addToPendingRequest} from "@/app/api/_requestor/pendingRequestQueue";
import {CustomResponse} from "@/app/api/_requestor/type";


export const returnFetchWrapper = (args?: ReturnFetchDefaultOptions) => {

    const fetch = returnFetch(args);

    return async (url: (string | URL), requestInit?: RequestInit): Promise<CustomResponse> => {
        const userId = getCookieValue(CONSTANT.USER_ID);

        if (!isRevalidatingUser(userId)) {
            if (requestInit) requestInit!.headers = commonHeaders(requestInit);
            try {
                return await fetch(url, {...requestInit});
            } catch (e: unknown) {
                const message = (e as Error).message;
                if(!isHttpStatusCode(message)) console.error(e);
                return createErrorResponse((e as Error).message);
            }
        } else {
            return new Promise((resolve) => {
                addToPendingRequest(userId, async (e: Error | null) => {
                    let response: Response;

                    if (e) {
                        response = createErrorResponse((e as Error).message);
                    } else {
                        if (requestInit) requestInit!.headers = commonHeaders(requestInit);

                        try {
                            response = await fetch(url, {...requestInit});
                        } catch (e:unknown) {
                            response = createErrorResponse((e as Error).message);
                        }
                    }
                    resolve(response);
                });
            });
        }

    }
}