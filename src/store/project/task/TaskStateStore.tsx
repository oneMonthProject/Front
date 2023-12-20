import { atom, selector } from "recoil";
import { ModalState, UserInfo } from "@/utils/type";

// Task
interface TaskState {
    type: "add" | "modify";
    id: string | number | null;
    content: string;
    isComplete: boolean;
    startDate: string | null;
    endDate: string | null;
    assignee: UserInfo | null;
    updateUser: string;
    updateDate: Date | null;
}

export class TaskForm implements TaskState {
    type: "add" | "modify";
    id: string | number | null;
    content: string;
    isComplete: boolean;
    startDate: string | null;
    endDate: string | null;
    assignee: UserInfo | null;
    updateUser: string;
    updateDate: Date | null;

    constructor(type: 'add' | 'modify', id: string | number | null, content: string, isComplete: boolean,
        startDate: string | null, endDate: string | null, assignee: UserInfo | null, updateUser: string, updateDate: Date | null) {
        this.type = type;
        this.id = id;
        this.content = content;
        this.isComplete = isComplete;
        this.startDate = startDate;
        this.endDate = endDate;
        this.assignee = assignee;
        this.updateUser = updateUser;
        this.updateDate = updateDate;
    }
}

export const currentTaskFormState = atom<null | TaskState>({
    key: 'currentTaskFormState',
    default: null
});


export const taskModalStateSelector = selector<ModalState>({
    key: 'taskModalStateSelector',
    get: ({ get }) => {
        const state = get(currentTaskFormState);

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

        return { isOpen: state !== null, title: title };
    }
})