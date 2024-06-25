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