import {request} from "@/service/project/request";

/**
 * 프로젝트 크루 목록 조회
 * @param projectId
 */
export async function getProjectCrewList({projectId}: { projectId: string }) {
    return await request('GET', `/api/project/crews/list?projectId=${projectId}`);
}

/**
 * 프로젝트 크루 상세 조회
 * @param projectMemberId
 */
export async function getCrewDetail(projectMemberId:string){
    return await request('GET', `/api/project/crews/detail?projectMemberId=${projectMemberId}`);
}