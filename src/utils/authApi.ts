import returnFetch from "return-fetch";
import { getCookie, setCookie } from "./cookies";

const accessToken = getCookie("access_token");
const refreshToken = getCookie("refresh_token");
const authApi = returnFetch({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND,
  headers: {
    "Content-Type": "application/json",
  },
  interceptors: {
    request: async (args) => {
      if (args[1]) {
        args[1].headers = {
          ...args[1]?.headers,
          Authorization: accessToken ? `Bearer ${accessToken}` : "",
        };
      }

      return args;
    },
    response: async (response, requestArgs, fetch) => {
      if (response.status !== 401) {
        return response;
      }

      // userId 도 추가해서 보내기
      const data = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND}/api/user/token-reissue`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken ? `Bearer ${accessToken}` : "",
            Refresh: refreshToken ? `Bearer ${refreshToken}` : "",
          },
        }
      );

      if (data.status !== 200) {
        throw Error("failed to refresh cookie");
      }

      // 데이터 형식 어떻게 오는 지 확인한 후 설정
      setCookie("access_token", "");

      return fetch(...requestArgs);
    },
  },
});

export default authApi;
