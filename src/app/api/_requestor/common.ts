import Logger from "@/utils/logger";
import {cookies} from "next/headers";
import {HttpStatusCode} from "axios";
import {STATUS_CODES} from "http";

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

const HttpStatusTypes = {
    100: 'Continue',
    101: 'Switching Protocols',
    102: 'Processing',
    200: 'OK',
    201: 'Created',
    202: 'Accepted',
    203: 'Non-Authoritative Information',
    204: 'No Content',
    205: 'Reset Content',
    206: 'Partial Content',
    207: 'Multi-Status',
    208: 'Already Reported',
    226: 'IM Used',
    300: 'Multiple Choices',
    301: 'Moved Permanently',
    302: 'Found',
    303: 'See Other',
    304: 'Not Modified',
    305: 'Use Proxy',
    307: 'Temporary Redirect',
    308: 'Permanent Redirect',
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Payload Too Large',
    414: 'URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Range Not Satisfiable',
    417: 'Expectation Failed',
    418: 'I\'m a teapot',
    421: 'Misdirected Request',
    422: 'Unprocessable Entity',
    423: 'Locked',
    424: 'Failed Dependency',
    425: 'Too Early',
    426: 'Upgrade Required',
    428: 'Precondition Required',
    429: 'Too Many Requests',
    431: 'Request Header Fields Too Large',
    451: 'Unavailable For Legal Reasons',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
    506: 'Variant Also Negotiates',
    507: 'Insufficient Storage',
    508: 'Loop Detected',
    510: 'Not Extended',
    511: 'Network Authentication Required'
} as const;

export type HttpStatusCodeType = keyof typeof HttpStatusTypes;
export type HttpStatusTextType = typeof HttpStatusTypes[HttpStatusCodeType];
export const httpStatusText = (statusCode: HttpStatusCodeType) => {
    return HttpStatusTypes[statusCode] || 'Unknown Status Code'
}