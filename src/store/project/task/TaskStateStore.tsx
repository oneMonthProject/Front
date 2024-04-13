import {atom, DefaultValue, selector} from "recoil";
import {uuidv4} from "@mswjs/interceptors/lib/utils/uuid";
import {TaskAddForm, TaskContentDetail, TaskItem, TaskModifyForm} from "@/app/project/@task/_utils/type";


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
            const updatedModalState: typeof modalState = {...modalState, form: updatedForm};

            set(taskModalState, updatedModalState);
        }
    }
});

