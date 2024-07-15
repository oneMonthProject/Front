import Logger from "@/utils/logger";
import {returnFetchPublicWrapper} from "@/app/api/_requestor/returnFetchPublicWrapper";
import {baseURL} from "@/app/api/_requestor/httpStatus";
import {createErrorResponse, getResErrorMessage} from "@/app/api/_requestor/responseUtils";

const reqLogger = new Logger('PUBL_BACK_REQ');
const resLogger = new Logger('PUBL_BACK_RES');

const publicApi = returnFetchPublicWrapper({
    baseUrl: baseURL,
    interceptors: {
        request: async (requestArgs) => {
            reqLogger.i(`${requestArgs[1]!.method || 'GET'}: ${requestArgs[0]}`);
            return requestArgs;
        },
        response: async (response, requestArgs) => {
            if (!response.ok) {
                const errorMessage = await getResErrorMessage(response);
                resLogger.i(`${requestArgs[1]!.method}: ${response.status} ${requestArgs[0]} - ${errorMessage}`);
                return await createErrorResponse(response);
            } else {
                resLogger.i(`${requestArgs[1]!.method || 'GET'}: ${response.status} ${requestArgs[0]}`)
            }

            return response;
        },
    },
});

export default publicApi;
