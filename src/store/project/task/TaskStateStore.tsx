import {atom, DefaultValue, selector, selectorFamily} from "recoil";
import {uuidv4} from "@mswjs/interceptors/lib/utils/uuid";
import {TaskAddForm, TaskContentDetail, TaskFormKey, TaskItem, TaskModifyForm} from "@/app/project/@task/_utils/type";


export type TaskModalState<T extends TaskItem> = {
    isOpen: boolean;
    form: T | null;
}

export const taskModalState = atom<TaskModalState<TaskAddForm | TaskModifyForm>>({
    key: 'taskModalState',
    default: {
        isOpen: false,
        form: null
    }
});

export const taskModalFieldSelector = selectorFamily<Partial<Omit<TaskModifyForm, 'progressStatusCode' | 'progressStatus' | 'contentDetail'>>,TaskFormKey>
({
    key: 'taskModalFieldSelector',
    get: (param: TaskFormKey) => ({get}) => {
        const form = get(taskModalState).form!;
        const value = form[param];
        return {[param]: value};
    },
    set: (param: TaskFormKey) => ({get, set}, newValue) => {
        const modalState = get(taskModalState);
        const form = modalState.form!;
        const updatedForm = {...form, [param]: newValue};
        set(taskModalState, {isOpen: modalState.isOpen, form: updatedForm});
    }
});

export const taskProgressFieldSelector = selector({
    key: 'taskProgressFieldSelector',
    get: ({get}) => {
        const form = get(taskModalState).form! as TaskModifyForm;
        const progressStatusCode = form.progressStatusCode;
        const progressStatus = form.progressStatus;
        return {progressStatusCode, progressStatus};
    },
    set: ({get, set}, newValue) => {
        if (newValue instanceof DefaultValue) return;

        const modalState = get(taskModalState);
        const form = get(taskModalState).form! as TaskModifyForm;

        const updatedForm = {
            ...form,
            progressStatusCode: newValue.progressStatusCode,
            progressStatus: newValue.progressStatus
        };

        set(taskModalState, {isOpen: modalState.isOpen, form: updatedForm});
    }
});


export type TaskContentDetailsState = {
    contents: TaskContentDetail[];
}


export const taskContentDetailSelector = selector<TaskContentDetailsState>({
    key: 'taskContentDetailSelector',
    get: ({get}) => {
        const {form: modalForm} = get(taskModalState);

        let contents: TaskContentDetail[] = [];

        if (modalForm && modalForm.contentDetail) {
            contents = modalForm.contentDetail
                .split("&")
                .map((v: string) => {
                    return {data: v, id: uuidv4()}
                });
        }

        return {contents};
    },
    set: ({set, get}, newValue: TaskContentDetailsState | DefaultValue) => {
        if (!(newValue instanceof DefaultValue)) {
            const contentDetailItems = newValue.contents;
            const contentDetailStr = contentDetailItems.length > 0
                ? newValue.contents?.map(v => v.data).join("&")
                : newValue.contents[0].data || '';

            const modalState = get(taskModalState);
            const modalStateForm = modalState.form!;

            const updatedForm: typeof modalStateForm = {...modalStateForm, contentDetail: contentDetailStr};
            const updatedModalState: typeof modalState = {isOpen:modalState.isOpen, form: updatedForm};

            set(taskModalState, updatedModalState);
        }
    }
});

