import {request} from "@/service/project/request";
import {PointTypeValue} from "@/app/project/@notice/_utils/type";

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
 * 크루 추가 알림 confirm - 알림 확인 업데이트만.
 * @param alertId
 */
export async function confirmCrewAddNotice(alertId: string | bigint) {
    return await request('PATCH', '/api/project/notice', {alertId});
}

/**
 * 크루 탈퇴 신청 알림 confirm
 * @param alertId
 * @param withdrawConfirm
 */
export async function confirmCrewWithdrawNotice(alertId: string | bigint, withdrawConfirm: boolean) {
    const confirmRes = await request('POST', '/api/project/confirm/withdraw', {alertId, withdrawConfirm});
    if (confirmRes.result === 'success') {
        return await request('PATCH', '/api/project/notice', {alertId});
    } else {
        return confirmRes;
    }
}

/**
 * 크루 강제탈퇴 신청 알림 confirm
 * @param projectMemberId
 * @param alertId
 */
export async function confirmCrewForceWithdrawNotice(projectMemberId: string | bigint, alertId: string | bigint){
    const confirmRes = await request('POST', '/api/project/confirm/force-withdrawal', {projectMemberId});
    if (confirmRes.result === 'success') {
        return await request('PATCH', '/api/project/notice', {alertId});
    } else {
        return confirmRes;
    }
}