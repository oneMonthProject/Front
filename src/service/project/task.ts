import {request} from "@/service/project/request";
import {TaskItem} from "@/utils/type";
import {TaskModalForm} from "@/store/project/task/TaskStateStore";
import {HTTP_METHOD} from "next/dist/server/web/http";

/**
 * 업무 목록 조회
 * @param milestoneId
 * @param projectId
 * @param pageIndex
 * @param itemCount
 */
export async function getTaskList(
    {
        milestoneId,
        projectId,
        pageIndex,
        itemCount
    }: {
        milestoneId: bigint | string,
        projectId: bigint | string,
        pageIndex: number,
        itemCount: number
    }) {
    return await request(
        'GET',
        `/api/project/task?milestoneId=${milestoneId}&projectId=${projectId}&pageIndex=${pageIndex}&itemCount=${itemCount}`
    );
}

/**
 * 업무 생성/수정
 * @param task
 */
export async function upsertTask(task: TaskModalForm) {
    let method: HTTP_METHOD;

    if(!task.assignedUser?.projectMemberId) throw Error('업무 담당자를 선택해 주세요');
    if(!task.content) throw Error('업무 내용을 입력해주세요');
    if(!task.startDate) throw Error('시작 날짜를 입력해주세요');
    if(!task.endDate) throw Error('시작 날짜를 입력해주세요');

    if (task.type === 'add') {
        method = 'POST';
    } else if (task.type === 'modify') {
        method = 'PATCH';
        if(!task.progressStatus) throw Error('업무 진행상태를 입력해주세요');
    } else {
        throw Error('Unknown TaskModalForm Type');
    }

    return await request(method, '/api/project/task', {task});
}


/**
 * 업무 삭제
 * @param workId
 */
export async function deleteTask(workId: bigint) {
    return await request('DELETE', '/api/project/task', {workId});
}