import {request, requestWithAuth} from "@/service/project/request";

/**
 * 프로젝트 참여 요청
 * @param projectId
 * @param positionId
 */
export async function requestParticipationProject(projectId: bigint, positionId: bigint) {
    return await requestWithAuth('POST', `/api/project/participate?projectId=${projectId}`, { positionId });
}
