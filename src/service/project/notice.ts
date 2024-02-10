import {request} from "@/service/project/request";
import {NoticeCreateForm, NoticeTypeKey} from "@/utils/type";


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
 * @param noticeType
 */
export async function getProjectNoticeByType(projectId: string | bigint, pageIndex: number, itemCount: number, noticeType: NoticeTypeKey | 'ALL') {
    let noticeRequestUrl = '/api/project/notice';
    switch (noticeType) {
        case 'ALL':
            noticeRequestUrl += '/all';
            break;
        case 'WORK':
            noticeRequestUrl += '/works';
            break;
        case 'RECRUIT':
            noticeRequestUrl += '/recruits';
            break;
        case 'CREW':
            noticeRequestUrl += '/crews';
            break;
        default:
            throw Error('Unknown type of notice');
    }

    return await request('GET', `${noticeRequestUrl}?projectId=${projectId}&pageIndex=${pageIndex}&itemCount=${itemCount}`);
}

/**
 * 프로젝트 멤버 탈퇴 신청 알림 생성
 * @param projectMemberId
 */
export async function createProjectCrewOutNotice(projectMemberId: string | bigint) {
    return await request('POST', `/api/project/notice/crewOut`, {projectMemberId});
}


