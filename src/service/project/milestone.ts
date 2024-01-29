import {MilestoneInfo} from "@/utils/type";
import {request} from "@/service/project/request";
import {convertStringToDate, sortByStartDate} from "@/utils/common";

/**
 * 프로젝트 마일스톤 목록 조회
 * @param projectId
 */
export async function getProjectMilestones(projectId: string) {
    const res = await request('GET', `/api/project/milestone?projectId=${projectId}`);

    res.data = sortByStartDate(res.data, 'asc').map(v => {
        return {
            ...v,
            createDate: convertStringToDate(v.createDate, 'yyyy-MM-dd'),
            startDate: convertStringToDate(v.startDate, 'yyyy-MM-dd'),
            endDate: convertStringToDate(v.endDate, 'yyyy-MM-dd'),
            updateDate: convertStringToDate(v.updateDate, 'yyyy-MM-dd')
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
        projectId
    }: {
        milestoneInfo: T, projectId: string
    }) {

    const {content, startDate, endDate} = milestoneInfo;
    const reqData = {projectId, content, startDate, endDate};

    return await request('POST', `/api/project/milestone`, reqData);
}

/**
 * 마일스톤 수정
 * @param milestoneInfo
 */
export async function updateMilestone<T extends MilestoneInfo>({milestoneInfo}: { milestoneInfo: T }) {
    const {content, startDate, endDate, progressStatusCode, mileStoneId} = milestoneInfo;
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