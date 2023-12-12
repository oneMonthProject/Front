import {CookieValueTypes} from "cookies-next";

export function createHeader(accessToken?:  CookieValueTypes): RequestInit['headers'] {
    let authHeader = {};
    if (accessToken !== undefined) {
        authHeader = {'Authentication': accessToken};
    }
    return {
        'Content-Type': 'application/json',
        ...authHeader
    }
}