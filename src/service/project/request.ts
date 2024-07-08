import {HTTP_METHOD} from "next/dist/server/web/http";
import {JSONReplaceBigInt} from "@/utils/common";
import {ResponseBody} from "@/utils/type";

export const publicURL = process.env.NEXT_PUBLIC_URL;
export const headers: HeadersInit = {
    'Content-Type': 'application/json'
};

export async function request(method: HTTP_METHOD, url: string, data?: Record<string, unknown>) {
    const requestInit: RequestInit = {
        headers, method
    }
    if (method !== 'GET' && data) requestInit.body = JSONReplaceBigInt(data);
    const res = await fetch(`${publicURL}${url}`, requestInit);

    if (res.ok) {
        return res.json();
    } else {
        const data: ResponseBody<null> = await res.json();
        const errorHandle = data.errorHandle!;

        if (errorHandle === 'errorPage') {
            const path = res.headers.get('X-Error-Handle-Page') as string;
            window.location.replace(path);
        }

        // retry, toast 인 경우는 useQuery단에서 처리
        return data;
    }
}

export async function requestWithAuth(method: HTTP_METHOD, url: string, data?: Record<string, unknown>) {
    const requestInit: RequestInit = {
        headers, method, cache: 'no-cache'
    }
    if (method !== 'GET' && data) requestInit.body = JSONReplaceBigInt(data);

    const res = await fetch(`${publicURL}${url}`, requestInit);

    if (res.ok) {
        return res.json();
    } else {
        const data: ResponseBody<null> = await res.json();
        const errorHandle = data.errorHandle!;

        if (errorHandle === 'errorPage') {
            const path = res.headers.get('X-Error-Handle-Page') as string;
            window.location.replace(path);
        }

        // retry, toast 인 경우는 useQuery단에서 처리
        return data;
    }

}


