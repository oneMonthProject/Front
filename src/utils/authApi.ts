"use server";
import returnFetch from "return-fetch";
import { getCookie, setCookie } from "cookies-next";
import { cookies } from "next/headers";
import { camelCase } from "lodash";

const baseURL = process.env.NEXT_PUBLIC_BACKEND;

const setRefreshCookie = (cookieStr: string) => {
  let refreshTokenValue = "";
  let cookieOptions = {};
  cookieStr.split(";").map((item) => {
    const cookieItem = item.trim().split("=");
    if (cookieItem.includes("Refresh")) {
      refreshTokenValue = cookieItem[1];
    } else {
      const optionName = camelCase(cookieItem[0]);
      const optionValue = cookieItem[1] ?? true;
      cookieOptions = {
        ...cookieOptions,
        [optionName]: optionValue,
      };
    }
  });

  console.log("refreshTokenValue", refreshTokenValue);
  console.log("cookieOptions", cookieOptions);

  if (refreshTokenValue) {
    cookies().set("Refresh", refreshTokenValue, cookieOptions);
  }
};

const authApi = returnFetch({
  baseUrl: baseURL,
  interceptors: {
    request: async (requestArgs) => {
      const accessToken = getCookie("Access", { cookies });
      if (requestArgs[1] && accessToken) {
        requestArgs[1].headers = {
          "Content-Type": "application/json",
          ...requestArgs[1]?.headers,
          Authorization: `Bearer ${accessToken}`,
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

      const userId = getCookie("user_id", { cookies });
      const refreshToken = getCookie("Refresh", { cookies });
      if (userId && refreshToken) {
        const tokenResponse = await fetch(`${baseURL}/api/user/token-reissue`, {
          method: "POST",
          body: JSON.stringify({ userId }),
          headers: {
            "Content-Type": "application/json",
            Cookie: `Refresh=${refreshToken}`,
          },
          credentials: "include",
        });

        if (tokenResponse.ok) {
          const { headers } = tokenResponse;
          const accessToken = headers.get("Authorization");
          setCookie("Access", accessToken, { cookies });

          const refreshToken = headers.get("Set-Cookie");
          if (refreshToken) {
            setRefreshCookie(refreshToken);
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
