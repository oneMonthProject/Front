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
    const res = await request(
        'GET',
        `/api/project/task?milestoneId=${milestoneId}&projectId=${projectId}&pageIndex=${pageIndex}&itemCount=${itemCount}`
    );
    return res.json();
}

/**
 * 업무 생성/수정
 * @param task
 */
export async function upsertTask(task: TaskModalForm) {
    let method: HTTP_METHOD;

    if (task.type === 'add') {
        method = 'POST';
    } else if (task.type === 'modify') {
        method = 'PATCH';
    } else {
        throw Error('Unknown TaskModalForm Type');
    }

    const res = await request(method, '/api/project/task', {task});
    return res.json();
}


/**
 * 업무 삭제
 * @param workId
 */
export async function deleteTask(workId: bigint) {
    const res = await request('DELETE', '/api/project/task', {workId});
    return res.json();
}