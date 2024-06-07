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
  },
});

export default publicApi;
