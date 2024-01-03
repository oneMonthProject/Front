import {atom, selector} from "recoil";
import {AssignedUser, ModalState, SelectItem, TaskItem, TaskStatusCode, TaskStatusName} from "@/utils/type";

// Task
export interface TaskStatusItem {
    name: TaskStatusName;
    value:TaskStatusCode;
}

export const taskStatusItems: TaskStatusItem[] = [
    {
        name: '시작전',
        value: 'PS001'
    },
    {
        name: '진행중',
        value: 'PS002'
    },
    {
        name: '완료',
        value: 'PS003'
    },
    {
        name: '만료',
        value: 'PS004'
    },
];

export function getTaskStatusCode(name: TaskStatusName | '') {
    if(name === '') return '';
    const taskStatusItem = taskStatusItems.find(v => v.name === name);
    if (!taskStatusItem) throw new Error('Unknown Milestone Status');
    return taskStatusItem.value;
}

interface TaskModalFormState extends TaskItem {
    type: "add" | "modify";
    progressStatusCode: TaskStatusCode | '';
}

export class TaskModalForm implements TaskModalFormState {
    type: "add" | "modify";
    content: string;
    endDate: string;
    assignedUser: AssignedUser | null;
    lastModifiedMemberNickname: string;
    milestoneId: bigint;
    progressStatus: TaskStatusName | "";
    progressStatusCode: TaskStatusCode | '';
    projectId: bigint;
    startDate: string;
    workId: bigint;

    constructor(type: 'add' | 'modify', taskItem: TaskItem) {
        const {
            assignedUser,
            lastModifiedMemberNickname,
            content,
            endDate,
            milestoneId,
            progressStatus,
            projectId,
            startDate,
            workId
        } = taskItem

        this.type = type;
        this.assignedUser = assignedUser;
        this.lastModifiedMemberNickname = lastModifiedMemberNickname;
        this.content = content;
        this.startDate = startDate;
        this.endDate = endDate;
        this.milestoneId = milestoneId;
        this.progressStatus = progressStatus;
        this.progressStatusCode = getTaskStatusCode(progressStatus);
        this.projectId = projectId;
        this.workId = workId;

    }



}

export const taskModalFormState = atom<null | TaskModalFormState>({
    key: 'taskModalFormState',
    default: null
});

export const taskModalStateSelector = selector<ModalState>({
    key: 'taskModalStateSelector',
    get: ({get}) => {
        const state = get(taskModalFormState);

        let title = '';
        if (state !== null) {
            switch (state?.type) {
                case 'add':
                    title = '업무 추가';
                    break;
                case 'modify':
                    title = '업무 수정';
                    break;
                default:
                    throw Error('Unknown Project Notice Form Type');
            }
        }

        return {isOpen: state !== null, title: title};
    }
})
