import {HTTP_METHOD} from "next/dist/server/web/http";
import {JSONReplaceBigInt} from "@/utils/common";

export const publicURL = process.env.NEXT_PUBLIC_URL;
export const headers = {
    'Content-Type': 'application/json'
};

export async function request(method: HTTP_METHOD, url: string, data?: Record<string, unknown>) {
    const requestInit: RequestInit = {
        headers, method
    }
    if (method !== 'GET' && data) requestInit.body = JSONReplaceBigInt(data);
    const res = await fetch(`${publicURL}${url}`, requestInit);
    return res.json();
}

export async function requestWithAuth(method: HTTP_METHOD, url: string, data?: Record<string, unknown>) {
    const requestInit: RequestInit = {
        headers, method, cache: 'no-store'
    }
    if (method !== 'GET' && data) requestInit.body = JSONReplaceBigInt(data);

    const res = await fetch(`${publicURL}${url}`, requestInit);

    if (res.status === 401) {
        if (confirm("로그인이 만료되었습니다.")) {
            window.location.replace(`${process.env.NEXT_PUBLIC_URL}/login`);
            return;
        }
    } else {
        return res.json();
    }

}


