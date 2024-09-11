import {requestWithAuth} from "@/service/project/request";
import {ResponseBody} from "@/utils/type";
import {sortByStartDate} from "@/utils/common";


/**
 * 프로젝트 목록 조회
 */
export async function getMyProjectList(pageIndex: number, itemCount: number) {
    const resBody = await requestWithAuth('GET', `/api/project/list?pageIndex=${pageIndex}&itemCount=${itemCount}`);

    return {
        ...resBody,
        data: resBody.data ? {
            totalPages: resBody.data.totalPages,
            content: resBody.data.content ? sortByStartDate(resBody.data.content, 'desc') : []
        } : null
    }
}


/**
 * 프로젝트 상세 조회
 * @param projectId
 * @param userId
 */
export async function getMyProjectDetail(projectId: string | bigint | null, userId: string | bigint | null) {
    if(!projectId || !userId){
        const resBody:ResponseBody<null> = {
            result:'fail',
            message: 'Invalid Parameter Error',
            data: null,
            errorHandle:'retry'
        }
        return resBody;
    }

    const _projectId = typeof projectId === 'string' ? BigInt(projectId) : projectId;
    const _userId = typeof userId === 'string' ? BigInt(userId) : userId;

    return await requestWithAuth('GET', `/api/project/detail?projectId=${_projectId}&userId=${_userId}`)
}


/**
 * 프로젝트 종료
 * @param projectId
 */
export async function endProject(projectId: string | bigint) {
    return await requestWithAuth('POST', '/api/project', {projectId});
}

/**
 * 현재 사용자의 프로젝트 멤버 권한 조회
 * @param projectId
 */
export async function getCurrentUserProjectMemberAuth(projectId: string | bigint) {
    const _projectId = typeof projectId === 'string' ? BigInt(projectId) : projectId;

    return await requestWithAuth("GET", `/api/project/currentUserAuth?projectId=${_projectId}`);
}