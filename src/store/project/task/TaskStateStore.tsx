import {atom, DefaultValue, selector} from "recoil";
import {
    AssignedUser,
    DataId,
    ModalState,
    TaskContentDetailItem,
    TaskItem,
    TaskStatusCode,
    TaskStatusName
} from "@/utils/type";
import {uuidv4} from "@mswjs/interceptors/lib/utils/uuid";

// Task
export interface TaskStatusItem {
    name: TaskStatusName;
    value: TaskStatusCode;
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
    if (name === '') return '';
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
    milestoneId: DataId;
    progressStatus: TaskStatusName | "";
    progressStatusCode: TaskStatusCode | '';
    projectId: DataId;
    startDate: string;
    workId: bigint;
    contentDetail: string | '';

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
            workId,
            contentDetail
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
        this.contentDetail = contentDetail;

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
                    title = state.content;
                    break;
                default:
                    throw Error('Unknown Project Notice Form Type');
            }
        }

        return {isOpen: state !== null, title: title};
    }
})


export interface TaskContentDetailFormState {
    contentDetail: TaskContentDetailItem[] | [];
}

export const taskContentDetailSelector = selector<TaskContentDetailFormState>({
    key: 'taskContentDetailSelector',
    get: ({get}) => {
        const state = get(taskModalFormState);

        let contentDetail: TaskContentDetailItem[] | [] = [];

        if (state && state.contentDetail) {
            contentDetail = state.contentDetail
                .split("&")
                .map((v: string) => {
                    return {data: v, id: uuidv4()}
                });
        }

        return {contentDetail};
    },
    set: ({set, get}, newValue: TaskContentDetailFormState | DefaultValue) => {
        if (!(newValue instanceof DefaultValue)) {
            const contentDetailItems = newValue.contentDetail;
            const contentDetailStr = contentDetailItems.length > 0
                ? newValue.contentDetail?.map(v => v.data).join("&")
                : newValue.contentDetail[0].data || '';

            const updated = {...get(taskModalFormState), contentDetail: contentDetailStr} as TaskModalFormState;
            console.log("updated: ", updated);
            set(taskModalFormState, updated);
        }
    }
});

