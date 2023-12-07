import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import JSONbigNative from "json-bigint-native";
import JSONbig from "json-bigint";

const transformResponse = [
  (data: string) => {
    try {
      return JSONbigNative.parse(data);
    } catch (e) {
      try {
        return JSONbig.parse(data);
      } catch (el) {
        /* Ignore */
        // Added this Ignore as it's the same in the Axios
      }
    }
    return data;
  },
];

const authAxios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND,
  timeout: 100000000,
  headers: { "Content-Type": "application/json" },
  transformResponse: transformResponse,
});

const onRequest = (
  internalAxiosRequestConfig: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  // 토근 가져오는 로직 추가 해야함
  const access_token = "";
  internalAxiosRequestConfig.headers.set(
    "Authorization",
    access_token ? `Bearer ${access_token}` : ""
  );
  return internalAxiosRequestConfig;
};

const onErrorRequest = (err: AxiosError | Error): Promise<AxiosError> => {
  return Promise.reject(err);
};

const onResponse = (res: AxiosResponse): AxiosResponse => {
  return res;
};

const onErrorResponse = async (
  err: AxiosError | Error
): Promise<AxiosError> => {
  const _err = err as unknown as AxiosError;
  const { response } = _err;
  const originalConfig = _err?.config as AxiosRequestConfig; // 기존의 요청 정보

  // Access Token이 만료 시
  if (response && response.status === 401) {
    // 토근 가져오는 로직 추가 해야함
    const access_token = "";
    const refresh_token = "";
    if (!!refresh_token === false) {
      // refresh token이 삭제 또는 만료 되었을 경우
      console.log("리프레시 토큰 삭제 또는 만료됨");
      // 만료 처리
    } else {
      try {
        // 만료된 access token과 refresh token을 이용해 갱신 요청
        // 추가적으로 user id 도 보내달라고 요청하심
        const data = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND}/api/user/token-reissue`,
          {
            headers: {
              Refresh: `Bearer ${refresh_token}`,
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        if (data) {
          // 응답값이 있을 경우 새로 발급 받은 토큰을 저장 로직 추가
          return await authAxios.request(originalConfig);
        }
      } catch (err) {
        // 리프레시 토큰 만료. 로그아웃 처리
        const _err = err as unknown as AxiosError;
        console.log(_err?.config?.data);
      }
    }
  }
  return Promise.reject(err);
};

authAxios.interceptors.request.use(onRequest, onErrorRequest);
authAxios.interceptors.response.use(onResponse, onErrorResponse);

export default authAxios;
