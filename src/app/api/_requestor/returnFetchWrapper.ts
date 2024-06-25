import "server-only";
import returnFetch, {ReturnFetchDefaultOptions} from "return-fetch";
import {HttpStatusCode} from "axios";


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
        }

        try {
            return await fetch(url, {...requestInit});
        } catch (e) {
            const message = (e as Error).message;
            const status = HttpStatusCode.InternalServerError;
            const resBody = {status, error: "Internal Server Error", message};

            return new CustomResponse(JSON.stringify(resBody), {
                status,
                headers: {'X-Error-Handle': 'retry'}
            });
        }
    }
}