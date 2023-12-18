import {CookieValueTypes} from "cookies-next";

const isTest = process.env.NEXT_PUBLIC_API_MOCKING === 'true';
export function createHeader(accessToken?:  CookieValueTypes): RequestInit['headers'] {
    let authHeader = {};
    if (accessToken !== undefined) {
        authHeader = {'Authorization': `Bearer ${accessToken}`};
    }else if(isTest){
        authHeader = {'Authorization': 'Bearer abc-123'};
    }
    return {
        'Content-Type': 'application/json',
        ...authHeader
    }
}