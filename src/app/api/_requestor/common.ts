import Logger from "@/utils/logger";
import {cookies} from "next/headers";

export const reqLogger = new Logger('BACK_REQ');
export const resLogger = new Logger('BACK_RES');
export const baseURL = process.env.NEXT_PUBLIC_BACKEND as string;

// 상수
export const CONSTANT = {
    ACS_TOKEN: 'Access',
    REF_TOKEN:'Refresh',
    USER_ID: 'user_id'
} as const;

export type CookieName = typeof CONSTANT.ACS_TOKEN | typeof CONSTANT.REF_TOKEN | typeof CONSTANT.USER_ID;

// 쿠키 관련 util
export const getCookieValue = (cookieName: CookieName) => {
    const cookieStore = cookies();
    const cookie = cookieStore.get(cookieName);
    return cookie?.value || '';
}

export const deleteCookieValue = (cookieName: CookieName) => {
    const cookieStore = cookies();
    cookieStore.delete(cookieName);
}

const HttpStatus = {
    OK: { code: 200, text: "OK" },
    CREATED: { code: 201, text: "Created" },
    ACCEPTED: { code: 202, text: "Accepted" },
    NO_CONTENT: { code: 204, text: "No Content" },
    BAD_REQUEST: { code: 400, text: "Bad Request" },
    UNAUTHORIZED: { code: 401, text: "Unauthorized" },
    FORBIDDEN: { code: 403, text: "Forbidden" },
    NOT_FOUND: { code: 404, text: "Not Found" },
    INTERNAL_SERVER_ERROR: { code: 500, text: "Internal Server Error" },
    NOT_IMPLEMENTED: { code: 501, text: "Not Implemented" },
    BAD_GATEWAY: { code: 502, text: "Bad Gateway" },
    SERVICE_UNAVAILABLE: { code: 503, text: "Service Unavailable" },
    GATEWAY_TIMEOUT: { code: 504, text: "Gateway Timeout" },
} as const;

export const getHttpStatusCode = (httpStatus: keyof typeof HttpStatus) => {
    return HttpStatus[httpStatus].code;
}

export const getHttpStatusText = (statusCode: number) => {
    return Object.values(HttpStatus).find(({code}) => code === statusCode);
}

