import {request} from "@/service/project/request";
import {NoticeCreateForm, TaskStatusCode} from "@/utils/type";

/**
 * 프로젝트 알림 목록 조회
 * @param projectId
 */
export async function getProjectNoticeList(projectId: string | bigint, pageIndex: number, itemCount: number) {
    return await request(
        'GET',
        `/api/project/notice?projectId=${projectId}&pageIndex=${pageIndex}&itemCount=${itemCount}`
    );
}

/**
 * 업무 알림 생성
 * @param status
 * @param userNickname
 * @param noticeCreateForm
 */
export async function createProjectTaskNotice(noticeCreateForm:NoticeCreateForm){
    return await request('POST', '/api/project/notice',{...noticeCreateForm});
}




