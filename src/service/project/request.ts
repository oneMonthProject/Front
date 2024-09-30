import {HTTP_METHOD} from "next/dist/server/web/http";
import {JSONReplaceBigInt} from "@/utils/common";
import {ResponseBody} from "@/utils/type";
import {ErrorHandlePage, extractErrorCode, getStatusByErrorCode} from "@/app/api/_interceptor/error/utils";
import {CustomInterceptorErrorCode} from "@/app/api/_interceptor/error/constants";


export const publicURL = process.env.NEXT_PUBLIC_URL;
export const headers: HeadersInit = {
    'Content-Type': 'application/json'
};

const handleError = (error: Error) => {
    let errorCode: CustomInterceptorErrorCode = "EDEFAULT"
    try {
        errorCode = extractErrorCode(error);
    } catch (e) {
        console.error((e as Error).cause);
    }
    const status = getStatusByErrorCode(errorCode);
    const errorRoute: ErrorHandlePage = `/error/${status}?error=${errorCode}`;
    window.location.assign(errorRoute);
}

const handleResponse = async (res: Response) => {
    if (res.ok) {
        return res.json();
    } else {
        const data: ResponseBody<null> = await res.json();
        const errorHandle = data.errorHandle!;

        if (errorHandle === 'errorPage') {
            const errorRoute = res.headers.get('X-Error-Handle-Page') as string;
            window.location.assign(errorRoute);
        } else {
            return data;
        }

    }
}


export async function request(method: HTTP_METHOD, url: string, data?: Record<string, unknown>) {
    const requestInit: RequestInit = {
        headers, method
    }
    if (method !== 'GET' && data) requestInit.body = JSONReplaceBigInt(data);

    try {
        const res = await fetch(`${publicURL}${url}`, requestInit);
        return await handleResponse(res);
    } catch (e: unknown) {
        console.error((e as Error));
        handleError(e as Error);
    }

}

export async function requestWithAuth(method: HTTP_METHOD, url: string, data?: Record<string, unknown>) {
    const requestInit: RequestInit = {
        headers, method, credentials: "include"
    }
    if (method !== 'GET' && data) requestInit.body = JSONReplaceBigInt(data);

    try {
        const res = await fetch(`${publicURL}${url}`, requestInit);
        return await handleResponse(res);
    } catch (e: unknown) {
        handleError(e as Error);
    }
}


