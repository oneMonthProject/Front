"use server";
import returnFetch from "return-fetch";
import { cookies } from "next/headers";
import { getRefreshToken } from "./common";

const baseURL = process.env.NEXT_PUBLIC_BACKEND;
const authApi = returnFetch({
  baseUrl: baseURL,
  interceptors: {
    request: async (requestArgs) => {
      const cookieStore = cookies();
      const accessToken = cookieStore.get("Access");

      if (requestArgs[1] && accessToken) {
        requestArgs[1].headers = {
          "Content-Type": "application/json",
          ...requestArgs[1]?.headers,
          Authorization: `Bearer ${accessToken.value}`,
        };
      }

      return requestArgs;
    },
    response: async (response, requestArgs) => {
      console.log("response.status", response.status);
      if (response.status !== 401) {
        return response;
      }

      console.log("not authorized, trying to get refresh cookie..");

      const cookieStore = cookies();
      const userId = cookieStore.get("user_id");
      const refreshToken = cookieStore.get("Refresh");
      if (userId && refreshToken) {
        const tokenResponse = await fetch(`${baseURL}/api/user/token-reissue`, {
          method: "POST",
          body: JSON.stringify({ userId: userId.value }),
          headers: {
            "Content-Type": "application/json",
            Cookie: `Refresh=${refreshToken.value}`,
          },
          credentials: "include",
        });

        if (tokenResponse.ok) {
          const { headers } = tokenResponse;
          const accessToken = headers.get("Authorization");
          const setCookieHeader = headers.get("Set-Cookie");

          if (accessToken && setCookieHeader) {
            const { token, options } = getRefreshToken(setCookieHeader);

            cookieStore.set("Access", accessToken);
            cookieStore.set("Refresh", token, options);
          }
        } else {
          throw Error("failed to refresh cookie");
        }
      } else {
        throw Error("failed to get cookies");
      }

      console.log("complete the reissue of cookies..!");

      return await authApi(...requestArgs);
    },
  },
});

export default authApi;
