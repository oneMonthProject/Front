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


export async function authRequest(method: HTTP_METHOD, url: string, data?: Record<string, unknown>) {
    const requestInit: RequestInit = {
        headers, method, credentials: 'include'
    };
    if (method !== 'GET' && data) requestInit.body = JSONReplaceBigInt(data);
    console.log("env:: ", process.env.NODE_ENV);
    console.log("publicURL:: ", process.env.NEXT_PUBLIC_URL);
    console.log("publicURL2:: ", publicURL);

    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}${url}`, requestInit);
        return res.json();
    }catch(e:unknown){
        console.log("ERROR::::: ", (e as Error).message);
        console.log("ERROR STACk::::: ", (e as Error).stack);
        console.log("ERROR CAUSE::::: ", (e as Error).cause);
    }

}