import {HTTP_METHOD} from "next/dist/server/web/http";
import {createResBody, JSONReplaceBigInt} from "@/utils/common";
import {PROCESS_ERR} from "@/utils/constant";
import {permanentRedirect, redirect} from "next/navigation";
import {getCookie, hasCookie} from "cookies-next";

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

    // try {
    //     const res = await fetch(`${publicURL}${url}`, requestInit);
    //     if(res.status !== 200){
    //         console.log("not 200 user_id::: ", getCookie("user_id"));
    //         if(!hasCookie("user_id")) redirect("/login");
    //     }
    //     return res.json();
    // } catch (e: unknown) {
    //     console.log("error:::: ", (e as Error).message);
    //     console.log("ERROR user_id::: ", getCookie("user_id"));
    //     if(!hasCookie("user_id")) redirect("/login");
    // }
}


