import returnFetch, {ReturnFetchDefaultOptions} from "return-fetch";
import {commonHeaders, createErrorResponse} from "@/app/api/_requestor/common";
import {CustomResponse} from "@/app/api/_requestor/type";

export const returnFetchPublicWrapper = (args?: ReturnFetchDefaultOptions) => {

    const fetch = returnFetch(args);

    return async (url: (string | URL), requestInit?: RequestInit): Promise<CustomResponse> => {
        let response: Response;

        if (requestInit) requestInit!.headers = commonHeaders(requestInit);

        try {
            response = await fetch(url, {...requestInit});
        } catch (e:unknown) {
            response = createErrorResponse((e as Error).message);
        }

        return response;
    }
}