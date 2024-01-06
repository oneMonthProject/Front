import returnFetch from "return-fetch";

const baseURL = process.env.NEXT_PUBLIC_BACKEND;

const publicApi = returnFetch({
  baseUrl: baseURL,
  interceptors: {
    request: async (requestArgs) => {
      if (requestArgs[1]) {
        requestArgs[1].headers = {
          "Content-Type": "application/json",
          ...requestArgs[1]?.headers,
        };
      }

      return requestArgs;
    },
  },
});

export default publicApi;
