import returnFetch from "return-fetch";

const baseURL = process.env.NEXT_PUBLIC_BACKEND;

const publicApi = returnFetch({
  baseUrl: baseURL,
  interceptors: {
    request: async (requestArgs) => {
      if (requestArgs[1]) {
        const headers = new Headers(requestArgs[1].headers);
        const contentType = headers.get("Content-Type");
        if (!contentType) {
          headers.set("Content-Type", "application/json");
        }

        requestArgs[1].headers = {
          ...headers,
        };
      }

      return requestArgs;
    },
  },
});

export default publicApi;
