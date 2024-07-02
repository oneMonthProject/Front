import Logger from "@/utils/logger";
import {baseURL} from "@/app/api/_requestor/common";
import {returnFetchPublicWrapper} from "@/app/api/_requestor/returnFetchPublicWrapper";

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
            if (response.status !== 200) {
                const copied = response.clone();
                const data = await copied.json();
                resLogger.e(`${requestArgs[1]!.method}: ${response.status} ${requestArgs[0]} - ${data.message}`);
            } else {
                resLogger.i(`${requestArgs[1]!.method || 'GET'}: ${response.status} ${requestArgs[0]}`)
            }

            return response;
        },
    },
});

export default publicApi;
