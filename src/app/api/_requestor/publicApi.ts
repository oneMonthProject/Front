import Logger from "@/utils/logger";
import {baseURL} from "@/app/api/_requestor/common";
import {returnFetchWrapper} from "@/app/api/_requestor/returnFetchWrapper";

const reqLogger = new Logger('PUBL_BACK_REQ');
const resLogger = new Logger('PUBL_BACK_RES');

const publicApi = returnFetchWrapper({
    baseUrl: baseURL,
    interceptors: {
        request: async (requestArgs) => {
            reqLogger.i(`${requestArgs[1]!.method || 'GET'}: ${requestArgs[0]}`);
            return requestArgs;
        },
        response: async (response, requestArgs) => {
            if (response.status !== 200) {
                resLogger.e(`${requestArgs[1]!.method}: ${response.status} ${requestArgs[0]} - ${response.statusText}`);
            }

            resLogger.i(`${requestArgs[1]!.method || 'GET'}: ${response.status} ${requestArgs[0]}`)
            return response;
        },
    },
});

export default publicApi;
