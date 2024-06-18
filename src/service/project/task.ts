import {request, requestWithAuth} from "@/service/project/request";
import {PageResponseBody} from "@/utils/type";
import {TasksReqParam} from "@/hooks/useTasks";
import {TaskAddForm, TaskItem, TaskModifyForm} from "@/app/project/@task/_utils/type";

/**
 * 업무 목록 조회
 * @param milestoneId
 * @param projectId
 * @param pageIndex
 * @param itemCount
 */
export async function getTaskList(tasksReqParam: TasksReqParam): Promise<PageResponseBody<TaskItem[]>> {
    const {
        milestoneId,
        projectId,
        pageNumber: pageIndex,
        itemsPerPage: itemCount
    } = tasksReqParam;

    return await requestWithAuth(
        'GET',
        `/api/project/task?milestoneId=${milestoneId}&projectId=${projectId}&pageIndex=${pageIndex}&itemCount=${itemCount}`
    );
}

/**
 * 업무 생성
 * @param task
 */
export async function createTask(task: TaskAddForm) {
    if (!task.assignedUser?.projectMemberId) throw Error('업무 담당자를 선택해 주세요');
    if (!task.content) throw Error('업무 제목을 입력해주세요');
    if (!task.startDate) throw Error('시작 날짜를 입력해주세요');
    if (!task.endDate) throw Error('시작 날짜를 입력해주세요');
    if (!task.contentDetail) throw Error('할 일을 입력해주세요.');

    return await request('POST', '/api/project/task', {task});

}

/**
 * 업무 수정
 * @param task
 */
export async function updateTask(task: TaskModifyForm) {
    if (!task.assignedUser?.projectMemberId) throw Error('업무 담당자를 선택해 주세요');
    if (!task.content) throw Error('업무 제목을 입력해주세요');
    if (!task.startDate) throw Error('시작 날짜를 입력해주세요');
    if (!task.endDate) throw Error('시작 날짜를 입력해주세요');
    if (!task.contentDetail) throw Error('할 일을 입력해주세요.');
    if (!task.progressStatus) throw Error('업무 진행상태를 입력해주세요');

    return await request('PATCH', '/api/project/task', {task});
}


/**
 * 업무 삭제
 * @param workId
 */
export async function deleteTask(workId: bigint) {
    return await request('DELETE', '/api/project/task', {workId});
}