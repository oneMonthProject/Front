import {CookieValueTypes} from "cookies-next";
import {createHeader} from "@/test-utils/mocking-server-utils";
import {AuthRequestParam, ProjectInfo, ReqProjectDetailParam, ResponseBody} from "@/utils/type";
import authApi from "@/utils/authApi";

const baseURL = process.env.NEXT_PUBLIC_BACKEND;
const isTest = process.env.NEXT_PUBLIC_API_MOCKING === 'true';

export async function request(
    method: 'GET' | 'POST' | 'PATCH',
    url: string,
    accessToken?:  CookieValueTypes,
    data?: Record<string, unknown>
) {

    try{
        if(isTest){
            const response = await fetch(url, {
                method: method,
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,
                }
            });
            return await response.json();
        }else{
            const response = await authApi(url, {
                method: method,
            });
            return await response.json();
        }

    }catch(error){
        console.log("error: ",error);
    }


    // if(!response.ok){
    //     throw new Error(`Request failed with status ${response.status}`);
    // }


}



/**
 * 프로젝트 목록 조회
 * @param accessToken
 */
export async function getMyProjectList({accessToken}: AuthRequestParam) {
    return await request('GET',`${baseURL}/api/project/me`, accessToken);
}



/**
 * 프로젝트 상세 조회
 * @param accessToken
 * @param projectId
 */
export async function getMyProjectDetail({accessToken, projectId}: ReqProjectDetailParam) {
    try {
        const res = await fetch(`${baseURL}/api/project/${projectId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        // if (!res.ok) {
        //     throw new Error(`Request failed with status ${res.status}`);
        // }

        return await res.json();
    } catch (error) {
        console.error('Error in getMyProjectDetail:', error);
        throw error; // Re-throw the error to be handled by the calling code
    }
}

export async function initTestCookie(){
     await request('POST', `/api/testCookie`);
}