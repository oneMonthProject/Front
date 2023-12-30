import {request} from "@/service/project/request";

export async function getTaskList(
    {
        milestoneId,
        projectId
    }: {
        milestoneId: bigint | string,
        projectId: bigint | string
    }) {
    const res = await request('GET', '/api/project/task', {milestoneId, projectId});
    return res.json();
}

// api/work/{workId} parameter: workId
export async function editTask(workId: bigint) {
    const res = await request('PATCH', '/api/project/work', {workId});
    return res.json();
}