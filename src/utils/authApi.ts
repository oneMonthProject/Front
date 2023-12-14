import returnFetch from "return-fetch";
import { getCookie, setCookie } from "cookies-next";

const authApi = returnFetch({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND,
  headers: {
    "Content-Type": "application/json",
  },
  interceptors: {
    request: async (requestArgs) => {
      const accessToken = getCookie("Access");
      // 실제 서버와 연결했을 때 Set-Cookie 로 넘긴 cookie 가 자동으로 넘겨지는지 확인하기
      if (requestArgs[1] && accessToken) {
        requestArgs[1].headers = {
          ...requestArgs[1]?.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }

      return requestArgs;
    },
    response: async (response, requestArgs, fetch) => {
      if (response.status !== 401) {
        return response;
      }

      const tokenResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/user/token-reissue`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: getCookie("user_id") }),
        }
      );

      const { status, headers } = tokenResponse;

      if (status === 200) {
        setCookie("Access", headers.get("Authorization"));
      } else {
        throw Error("failed to refresh cookie");
      }

      return fetch(...requestArgs);
    },
  },
});

export default authApi;
