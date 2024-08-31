import {MilestoneInfo, ProjectAuthMap} from "@/utils/type";
import {requestWithAuth} from "@/service/project/request";
import {sortByStartDate, throwErrorIfInvalid} from "@/utils/common";

/**
 * 프로젝트 마일스톤 목록 조회
 * @param projectId
 */
export async function getProjectMilestones(projectId: string) {
    const resBody = await requestWithAuth('GET', `/api/project/milestone?projectId=${projectId}`);

    return {
        ...resBody,
        data: resBody.data ? sortByStartDate(resBody.data!, 'asc')
            .map((v, index) => ({...v, index})) : []
    };
}

/**
 * 마일스톤 정보 조회
 * @param milestoneId
 */
export async function getMilestone(milestoneId: string) {
    return await requestWithAuth('GET', `/api/project/milestone/${milestoneId}`);
}

/**
 * 프로젝트 마일스톤 생성
 * @param milestoneInfo
 * @param projectId
 */
export async function createMilestone<T extends MilestoneInfo>(
    {
        milestoneInfo,
    }: {
        milestoneInfo: T
    }) {
    const {content, startDate, endDate, projectId, authMap} = milestoneInfo;

    throwErrorIfInvalid(!content, "마일스톤 내용을 입력해 주세요");
    throwErrorIfInvalid(!startDate, "시작날짜를 선택해 주세요");
    throwErrorIfInvalid(!endDate, "종료날짜를 선택해 주세요");
    const reqData = {projectId, content, startDate, endDate, authMap};

    return await requestWithAuth('POST', `/api/project/milestone`, reqData);
}

/**
 * 마일스톤 수정
 * @param milestoneInfo
 */
export async function updateMilestone<T extends MilestoneInfo>({milestoneInfo}: { milestoneInfo: T }) {
    const {content, startDate, endDate, progressStatusCode, mileStoneId} = milestoneInfo;

    throwErrorIfInvalid(!content, "마일스톤 내용을 입력해 주세요");
    throwErrorIfInvalid(!startDate, "시작날짜를 선택해 주세요");
    throwErrorIfInvalid(!endDate, "종료날짜를 선택해 주세요");
    throwErrorIfInvalid(!progressStatusCode, "마일스톤 진행상태를 선택해 주세요");

    const reqData = {content, startDate, endDate, progressStatusCode, mileStoneId};

    return await requestWithAuth('PATCH', `/api/project/milestone`, reqData);
}

export type DeleteMilestoneReqData = {
    milestoneId: bigint;
    projectId: bigint;
    authMap: ProjectAuthMap;
}

/**
 * 마일스톤 삭제
 * @param milestoneId
 */
export async function deleteMilestone(reqData: DeleteMilestoneReqData) {
    return await requestWithAuth('DELETE', `/api/project/milestone`, reqData);
}