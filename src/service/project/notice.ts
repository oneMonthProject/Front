import {request} from "@/service/project/request";
import {DataId, NoticeCreateForm, PageResponseBody} from "@/utils/type";
import {Notice, ProjectNoticeMenuKey} from "@/app/project/@notice/_utils/type";
import {PROJECT_NOTICE_MENU} from "@/app/project/@notice/_utils/constant";


/**
 * 업무 알림 생성
 * @param status
 * @param userNickname
 * @param noticeCreateForm
 */
export async function createProjectTaskNotice(noticeCreateForm: NoticeCreateForm) {
    return await request('POST', '/api/project/notice/task', {...noticeCreateForm});
}

/**
 * 프로젝트 알림 전체/타입별 목록 조회
 * @param projectId
 * @param pageIndex
 * @param itemCount
 * @param noticeMenu
 */
export async function getProjectNoticeByMenu(
    projectId: DataId,
    pageIndex: number,
    itemCount: number,
    noticeMenu: ProjectNoticeMenuKey
): Promise<PageResponseBody<Notice[]>> {
    const noticeRequestUrl = `/api/project/notice${PROJECT_NOTICE_MENU[noticeMenu].path}`;
    return await request('GET',
        `${noticeRequestUrl}?projectId=${projectId}&pageIndex=${pageIndex}&itemCount=${itemCount}`);
}

/**
 * 프로젝트 멤버 탈퇴 신청 알림 생성
 * @param projectMemberId
 */
export async function createProjectCrewOutNotice(projectMemberId: string | bigint) {
    return await request('POST', `/api/project/notice/crewOut`, {projectMemberId});
}


