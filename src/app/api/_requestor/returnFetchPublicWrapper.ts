import returnFetch, {ReturnFetchDefaultOptions} from "return-fetch";
import {createErrorResponse} from "@/app/api/_requestor/common";
import {CustomResponse} from "@/app/api/_requestor/type";

export const returnFetchPublicWrapper = (args?: ReturnFetchDefaultOptions) => {

    const fetch = returnFetch(args);

    return async (url: (string | URL), requestInit?: RequestInit): Promise<CustomResponse> => {
        let response: Response;

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
        } catch (e:unknown) {
            response = createErrorResponse(e as Error);
        }

        return response;
    }
}