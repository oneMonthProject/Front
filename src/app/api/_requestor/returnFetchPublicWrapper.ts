import returnFetch, {ReturnFetchDefaultOptions} from "return-fetch";
import {CustomResponse} from "@/app/api/_requestor/type";
import {createErrorResponse} from "@/app/api/_requestor/responseUtils";
import {commonRequestHeaders} from "@/app/api/_requestor/requestUtils";

export const returnFetchPublicWrapper = (args?: ReturnFetchDefaultOptions) => {

    const fetch = returnFetch(args);

    return async (url: (string | URL), requestInit?: RequestInit): Promise<CustomResponse> => {
        let response: Response;

        if (requestInit) requestInit!.headers = commonRequestHeaders(requestInit);

        try {
            response = await fetch(url, {...requestInit});
        } catch (e:unknown) {
            response = await createErrorResponse((e as Error));
        }

        return response;
    }
}