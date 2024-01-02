import {request} from "@/service/project/request";


/**
 * 프로젝트 목록 조회
 */
export async function getMyProjectList(pageIndex:number, itemCount:number) {
    return await request('GET', `/api/project/list?pageIndex=${pageIndex}&itemCount=${itemCount}`
    );
}


/**
 * 프로젝트 상세 조회
 * @param projectId
 */
export async function getMyProjectDetail(projectId: string) {
    return await request('GET', `/api/project/detail?projectId=${projectId}`)
}


/**
 * 프로젝트 크루 목록 조회
 * @param accessToken
 * @param projectId
 */
export async function getProjectCrewList({projectId}: { projectId: string }) {
    return await request('GET', `/api/project/crews/list?projectId=${projectId}`);
}

