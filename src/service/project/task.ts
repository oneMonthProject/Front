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
export async function getTaskList(tasksReqParam: TasksReqParam) {
    const {
        milestoneId,
        projectId,
        pageNumber: pageIndex,
        itemsPerPage: itemCount
    } = tasksReqParam;

    const res: PageResponseBody<TaskItem[]> = await requestWithAuth(
        'GET',
        `/api/project/work?milestoneId=${milestoneId}&projectId=${projectId}&pageIndex=${pageIndex}&itemCount=${itemCount}`
    );

    const today = new Date();
    today.setHours(0,0,0,0);
    const updated = res.data.content.map((v) => {
        if(v.progressStatus === "완료"){
            return v;
        }else{
            const startDate = v.startDate;
            const y = parseInt(startDate.substring(0,4), 10);
            const m = parseInt(startDate.substring(4,6), 10) - 1;
            const d = parseInt(startDate.substring(6,8), 10);
            const date = new Date(y,m,d);

            if(date.getTime > today.getTime) {
                return {...v, progressStatus: "시작전"}
            }else{
                return {...v, progressStatus: "진행중"}
            }
        }
    });

    return {
        ...res,
        content: updated
    }
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

    return await requestWithAuth('POST', '/api/project/work', {task});

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

    return await requestWithAuth('PATCH', '/api/project/work', {task});
}


/**
 * 업무 삭제
 * @param workId
 */
export async function deleteTask(workId: bigint) {
    return await requestWithAuth('DELETE', '/api/project/work', {workId});
}