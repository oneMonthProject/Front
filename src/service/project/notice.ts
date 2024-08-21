import {requestWithAuth} from "@/service/project/request";
import {NoticeCreateForm} from "@/utils/type";


/**
 * 업무 알림 생성
 * @param status
 * @param userNickname
 * @param noticeCreateForm
 */
export async function createProjectTaskNotice(noticeCreateForm: NoticeCreateForm) {
    return await requestWithAuth('POST', '/api/project/notice/task', {...noticeCreateForm});
}

/**
 * 프로젝트 멤버 탈퇴 신청 알림 생성
 * @param projectMemberId
 */
export async function createProjectCrewOutNotice(projectMemberId: string | bigint) {
    return await requestWithAuth('POST', `/api/project/notice/crewOut`, {projectMemberId});
}



