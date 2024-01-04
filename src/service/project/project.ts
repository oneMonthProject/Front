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
export async function getMyProjectDetail(projectId: string | bigint) {
    return await request('GET', `/api/project/detail?projectId=${projectId}`)
}


