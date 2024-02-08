import {PointTypeValue} from "@/utils/type";
import {request} from "@/service/project/request";

/**
 * 업무 알림 confirm
 * @param alertId
 * @param scoreTypeId
 */
export async function confirmTaskNotice(alertId: string | bigint, scoreTypeId: PointTypeValue) {
    const confirmRes = await request('POST', '/api/project/confirm/work', {alertId, scoreTypeId});
    if (confirmRes.result === 'success') {
        return await request('PATCH', '/api/project/notice', {alertId});
    } else {
        return confirmRes;
    }
}

/**
 * 모집 알림 confirm (참가 수락/거절)
 * @param projectId
 * @param alertId
 * @param confirmResult
 */
export async function confirmRecruitNotice(projectId: string | bigint, alertId: string | bigint, confirmResult: boolean) {
    const confirmRes = await request('POST', '/api/project/confirm/recruit', {projectId, alertId, confirmResult});
    if (confirmRes.result === 'success') {
        return await request('PATCH', '/api/project/notice', {alertId});
    } else {
        return confirmRes;
    }
}

/**
 * 크루 추가 알림 confirm
 * @param alertId
 */
export async function confirmCrewAddNotice(alertId: string | bigint) {
    return await request('PATCH', '/api/project/notice', {alertId});
}