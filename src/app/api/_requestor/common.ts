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


export enum HttpStatusCodes {
    'Continue'= 100,
    'Switching Protocols'= 101,
    'Processing'= 102,
    'OK'= 200,
    'Created'= 201,
    'Accepted'= 202,
    'Non-Authoritative Information'= 203,
    'No Content'= 204,
    'Reset Content'= 205,
    'Partial Content'= 206,
    'Multi-Status'= 207,
    'Already Reported'= 208,
    'IM Used'= 226,
    'Multiple Choices'= 300,
    'Moved Permanently'= 301,
    'Found'= 302,
    'See Other'= 303,
    'Not Modified'= 304,
    'Use Proxy'= 305,
    'Temporary Redirect'= 307,
    'Permanent Redirect'= 308,
    'Bad Request'= 400,
    'Unauthorized'= 401,
    'Payment Required'= 402,
    'Forbidden'= 403,
    'Not Found'= 404,
    'Method Not Allowed'= 405,
    'Not Acceptable'= 406,
    'Proxy Authentication Required'= 407,
    'Request Timeout'= 408,
    'Conflict'= 409,
    'Gone'= 410,
    'Length Required'= 411,
    'Precondition Failed'= 412,
    'Payload Too Large'= 413,
    'URI Too Long'= 414,
    'Unsupported Media Type'= 415,
    'Range Not Satisfiable'= 416,
    'Expectation Failed'= 417,
    'I\'m a teapot'= 418,
    'Misdirected Request'= 421,
    'Unprocessable Entity'= 422,
    'Locked'= 423,
    'Failed Dependency'= 424,
    'Too Early'= 425,
    'Upgrade Required'= 426,
    'Precondition Required'= 428,
    'Too Many Requests'= 429,
    'Request Header Fields Too Large'= 431,
    'Unavailable For Legal Reasons'= 451,
    'Internal Server Error'= 500,
    'Not Implemented'= 501,
    'Bad Gateway'= 502,
    'Service Unavailable'= 503,
    'Gateway Timeout'= 504,
    'HTTP Version Not Supported'= 505,
    'Variant Also Negotiates'= 506,
    'Insufficient Storage'= 507,
    'Loop Detected'= 508,
    'Not Extended'= 510,
    'Network Authentication Required'= 511
}


