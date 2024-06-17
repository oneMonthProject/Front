import {MilestoneInfo, ResponseBody} from "@/utils/type";
import {request} from "@/service/project/request";
import {convertStringToDate, sortByStartDate, throwErrorIfInvalid} from "@/utils/common";

/**
 * 프로젝트 마일스톤 목록 조회
 * @param projectId
 */
export async function getProjectMilestones(projectId: string) {
    const res = await request('GET', `/api/project/milestone?projectId=${projectId}`);

    res.data = sortByStartDate(res.data, 'asc').map((v, index) => {
        return {
            ...v,
            createDate: convertStringToDate(v.createDate as string, 'yyyy-MM-dd'),
            startDate: convertStringToDate(v.startDate as string, 'yyyy-MM-dd'),
            endDate: convertStringToDate(v.endDate as string, 'yyyy-MM-dd'),
            updateDate: convertStringToDate(v.updateDate as string, 'yyyy-MM-dd'),
            index: index
        }
    });

    return res;
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
    const {content, startDate, endDate, projectId} = milestoneInfo;

    throwErrorIfInvalid(!content, "마일스톤 내용을 입력해 주세요");
    throwErrorIfInvalid(!startDate, "시작날짜를 선택해 주세요");
    throwErrorIfInvalid(!endDate, "종료날짜를 선택해 주세요");
    const reqData = {projectId, content, startDate, endDate};

    return await request('POST', `/api/project/milestone`, reqData);
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

    return await request('PATCH', `/api/project/milestone`, reqData);
}

/**
 * 마일스톤 삭제
 * @param milestoneId
 */
export async function deleteMilestone(milestoneId: bigint) {
    return await request('DELETE', `/api/project/milestone`, {milestoneId});
}