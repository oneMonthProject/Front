import {request} from "@/service/project/request";

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

// api/work/{workId} parameter: workId
export async function editTask(workId: bigint) {
    const res = await request('PATCH', '/api/project/work', {workId});
    return res.json();
}