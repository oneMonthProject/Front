import {HTTP_METHOD} from "next/dist/server/web/http";
import {JSONReplaceBigInt} from "@/utils/common";

export const publicURL = process.env.NEXT_PUBLIC_URL;
export const headers = {
    'Content-Type': 'application/json',
    'Origin':'http://3.35.111.141',
    'Access-Control-Request-Method':'POST',
    'Access-Control-Request-Headers':'Content-Type'
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

    let res:Response;
    try{
        res = await fetch(`${process.env.NEXT_PUBLIC_URL}${url}`, requestInit);
        const headers = res.headers;
        console.log("res::: ", headers.get("Access-Control-Allow-Origin"));
        console.log("res::: ", headers.get("Access-Control-Allow-Methods"));
        console.log("res::: ", headers.get("Access-Control-Allow-Headers"));
        console.log("res.status: ", res.status);
        console.log("res.statusText: ", res.statusText);
        console.log("res.type: ", res.type);
        console.log("res.redirected: ", res.redirected);
        return res.json();
    }catch(e:unknown){
        console.log("ERROR::::: ", (e as Error).message);
        console.log("ERROR STACk::::: ", (e as Error).stack);
        console.log("ERROR CAUSE::::: ", (e as Error).cause);
    }

}