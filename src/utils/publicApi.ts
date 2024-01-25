import returnFetch from "return-fetch";

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

      return requestArgs;
    },
  },
});

export default publicApi;
