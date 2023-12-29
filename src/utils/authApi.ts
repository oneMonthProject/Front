"use server";
import returnFetch from "return-fetch";
import { getCookie, setCookie } from "cookies-next";
import { cookies } from "next/headers";

const baseURL = process.env.NEXT_PUBLIC_BACKEND;

const authApi = returnFetch({
  baseUrl: baseURL,
  interceptors: {
    request: async (requestArgs) => {
      const accessToken = getCookie("Access", { cookies });
      // console.log("accessToken", accessToken);

      // 실제 서버와 연결했을 때 Set-Cookie 로 넘긴 cookie 가 자동으로 넘겨지는지 확인하기
      if (requestArgs[1] && accessToken) {
        requestArgs[1].headers = {
          "Content-Type": "application/json",
          ...requestArgs[1]?.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }
      
      return requestArgs;
    },
    response: async (response, requestArgs, fetch) => {
      console.log("response.status", response.status);
      if (response.status !== 401) {
        return response;
      }

      console.log("not authorized, trying to get refresh cookie..");

      const userId = getCookie("user_id", { cookies });
      // console.log("userId", userId);
      if (userId) {
        const tokenResponse = await fetch(`${baseURL}/api/user/token-reissue`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ userId }),
        });

        const { status, headers } = tokenResponse;

        if (status === 200) {
          setCookie("Access", headers.get("Authorization"), { cookies });
        } else {
          throw Error("failed to refresh cookie");
        }
      } else {
        throw Error("failed to get cookies");
      }

      return fetch(...requestArgs);
    },
  },
});

export default authApi;
