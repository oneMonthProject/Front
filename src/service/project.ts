import {CookieValueTypes} from "cookies-next";
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

}



/**
 * 프로젝트 목록 조회
 */
export async function getMyProjectList() {
    return await request('GET',`${baseURL}/api/project/me`);
}



/**
 * 프로젝트 상세 조회
 * @param projectId
 */
export async function getMyProjectDetail(projectId:string) {
    return await request('GET', `${baseURL}/api/project/${projectId}`)
}

/**
 * 프로젝트 마일스톤 목록 조회
 * @param projectId
 */
export async function getProjectMilestones(projectId:string){
    return await request('GET',`${baseURL}/api/milestone/project/${projectId}`);
}

/**
 * 프로젝트 크루 목록 조회
 * @param accessToken
 * @param projectId
 */
export async function getProjectCrewList({projectId}:{projectId:string}){
    return await request('GET', `${baseURL}/api/projectmember/project/${projectId}`);
}