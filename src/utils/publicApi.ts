import returnFetch from "return-fetch";
import Logger from "@/utils/logger";

const reqLogger = new Logger('PUBL_BACK_REQ');
const resLogger = new Logger('PUBL_BACK_RES');

const baseURL = process.env.NEXT_PUBLIC_BACKEND;
const publicApi = returnFetch({
  baseUrl: baseURL,
  interceptors: {
    request: async (requestArgs) => {
      if (requestArgs[1]) {
        const headers = new Headers(requestArgs[1].headers);
        const contentType = headers.get("Content-Type");
        const args = contentType
          ? { ...headers }
          : { "Content-Type": "application/json" };

        requestArgs[1].headers = {
          ...args,
        };
      }

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
