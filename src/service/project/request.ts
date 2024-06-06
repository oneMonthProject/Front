import {HTTP_METHOD} from "next/dist/server/web/http";
import {JSONReplaceBigInt} from "@/utils/common";

export const publicURL = process.env.NEXT_PUBLIC_URL;
export const headers = {
    'Content-Type': 'application/json',
    'Origin': 'http://3.35.111.141',
    'Access-Control-Request-Method': 'POST',
    'Access-Control-Request-Headers': 'Content-Type'
};


export async function request(method: HTTP_METHOD, url: string, data?: Record<string, unknown>) {
    const requestInit: RequestInit = {
        headers, method
    }
    if (method !== 'GET' && data) requestInit.body = JSONReplaceBigInt(data);

    const res = await fetch(`${publicURL}${url}`, requestInit);
    return res.json();
}


export async function authRequest(method: HTTP_METHOD, url: string, data?: Record<string, unknown>) {
    const requestInit: RequestInit = {
        headers, method, credentials: 'include'
    };
    if (method !== 'GET' && data) requestInit.body = JSONReplaceBigInt(data);

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}${url}`, requestInit);
    return res.json();
}