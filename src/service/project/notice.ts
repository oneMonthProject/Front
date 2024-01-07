import {request} from "@/service/project/request";

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

