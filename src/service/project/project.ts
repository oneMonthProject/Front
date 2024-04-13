import {request} from "@/service/project/request";
import {ProjectInfo, ResponseBody} from "@/utils/type";
import {ProjectInfoUpdateReq} from "@/app/project/@setting/_utils/type";


/**
 * 프로젝트 목록 조회
 */
export async function getMyProjectList(pageIndex: number, itemCount: number) {
    return await request('GET', `/api/project/list?pageIndex=${pageIndex}&itemCount=${itemCount}`
    );
}


/**
 * 프로젝트 상세 조회
 * @param projectId
 */
export async function getMyProjectDetail(projectId: string | bigint):Promise<ResponseBody<ProjectInfo>> {
    return await request('GET', `/api/project/detail?projectId=${projectId}`)
}

/**
 * 프로젝트 정보 수정
 * @param projectInfo
 */
export async function updateProjectInfo(projectInfo: ProjectInfoUpdateReq) {
    return await request('PUT', `/api/project`, {projectInfo});
}

/**
 * 프로젝트 종료
 * @param projectId
 */
export async function endProject(projectId: string | bigint) {
    return await request('POST', '/api/project', {projectId});
}