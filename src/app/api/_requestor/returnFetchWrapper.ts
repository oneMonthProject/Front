import "server-only";
import returnFetch, {ReturnFetchDefaultOptions} from "return-fetch";
import {HttpStatusCodes} from "@/app/api/_requestor/common";


export type ErrorHandle = 'retry' | 'snackbar' | 'errorPage';

export type CustomResponseHeaderType = HeadersInit & {
    'X-Error-Handle'?: ErrorHandle
};

export type CustomResponseInit = ResponseInit & {
    headers: CustomResponseHeaderType;
}

export class CustomResponse extends Response {
    constructor(body?: (BodyInit | null | undefined), init?: (CustomResponseInit | undefined)) {
        super(body, init);
    }
}

export const returnFetchWrapper = (args?: ReturnFetchDefaultOptions) => {

    const fetch = returnFetch(args);

    return async (url: (string | URL), requestInit?: RequestInit): Promise<CustomResponse> => {
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
            const message = (e as Error).message;
            const status = HttpStatusCodes["Internal Server Error"];
            const resBody = {status, error: HttpStatusCodes[status], message};

            console.error(e);
            return new CustomResponse(JSON.stringify(resBody), {
                status,
                headers: {'X-Error-Handle': 'retry'}
            });
        }
    }
}