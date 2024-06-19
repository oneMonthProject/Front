import {requestWithAuth} from "@/service/project/request";

/**
 * 프로젝트 크루 목록 조회
 * @param projectId
 */
export async function getProjectCrewList({projectId}: { projectId: string | bigint }) {
    return await requestWithAuth('GET', `/api/project/crews/list?projectId=${projectId}`);
}

/**
 * 프로젝트 크루 상세 조회
 * @param projectMemberId
 */
export async function getCrewDetail(projectMemberId: string | bigint) {
    return await requestWithAuth('GET', `/api/project/crews/detail?projectMemberId=${projectMemberId}`);
}

/**
 * 프로젝트 크루 업무 이력 조회
 * @param projectMemberId
 */
export async function getCrewTaskHistory(projectMemberId: string | bigint, pageIndex: number, itemCount: number) {
    return await requestWithAuth(
        'GET',
        `/api/project/crewTaskHistory?projectMemberId=${projectMemberId}&pageIndex=${pageIndex}&itemCount=${itemCount}`
    );
}
