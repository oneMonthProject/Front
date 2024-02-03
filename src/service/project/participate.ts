import {request} from "@/service/project/request";

/**
 * 프로젝트 참여 요청
 * @param projectId
 */
export async function requestParticipationProject(projectId: bigint, positionId: bigint) {
    return await request('POST', `/api/project/participate?projectId=${projectId}`, { positionId });
}
