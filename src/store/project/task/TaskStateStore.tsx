import {atom, DefaultValue, selector, selectorFamily} from "recoil";
import {TaskContentDetails, TaskForm, TaskModifyForm} from "@/app/project/@task/_utils/type";
import _ from "lodash";
import {v4} from "uuid";


export type TaskModalState = {
    isOpen: boolean;
    form: TaskForm | null;
}

export const taskModalState = atom<TaskModalState>({
    key: 'taskModalState',
    default: {
        isOpen: false,
        form: null
    }
});


export type TaskFieldKey = Exclude<keyof TaskForm, 'progressStatusCode' | 'progressStatus' | 'contentDetail'>;
// TaskForm 필드에서 progressStatus(+progressStatusCode),contentDetail 제외한 나머지 중 특정 필드 추출
// : 각 필드의 state 타입으로 사용한다
export type TaskField<T> = TaskForm[Extract<TaskFieldKey, T>];

/**
 * 업무 생성/수정 modal 각 필드 상태관리('진행상태', '할일목록' 제외)
 */
export const taskModalFieldSelector = selectorFamily({
    key: 'taskModalFieldSelector',
    get: (param: TaskFieldKey) => ({get}) => {
        const form = get(taskModalState).form!;
        return form[param] as TaskField<typeof param>;
    },
    set: (param: TaskFieldKey) => ({get, set}, newValue) => {
        const modalState = get(taskModalState);
        const form = modalState.form!;
        const updatedForm = {...form, [param]: newValue};
        set(taskModalState, {isOpen: modalState.isOpen, form: updatedForm});
    }
});

/**
 * 업무 생성/수정 modal '할일목록' 필드 상태관리 :
 * (조회) contentDetail 필드(문자열) get
 *        -> 각 문자열을 TaskContentDetails 객체로 변환(data: 할일 문자열, id: 랜덤생성한 할 일별 고유id)
 *        -> 하위 selector에서 id를 파라미터로 특정 할일 data 조회
 * (수정) 하위 selector에서 업데이트한 TaskContentDetails를 문자열로 변환 -> 업무 form set
 */
export const taskContentDetailSelector = selector<TaskContentDetails>({
    key: 'taskContentDetailSelector',
    get: ({get}) => {
        const {form: modalForm} = get(taskModalState);

        const contentDetailMap = new Map();

        if (!modalForm || !modalForm.contentDetail) return contentDetailMap;

        const contentDetailArray = modalForm.contentDetail.split("&");
        for (const item of contentDetailArray) {
            contentDetailMap.set(v4(), item);
        }

        return contentDetailMap;
    },
    set: ({get, set}, newValue) => {
        if (!(newValue instanceof DefaultValue)) {
            const modalState = get(taskModalState);
            const form = get(taskModalState).form!;

            const updatedContentDetailArr = []
            if(!_.isEmpty(newValue)){
                for(const [key, value] of newValue){
                    updatedContentDetailArr.push(value);
                }
            }
            const updatedContentDetailString = updatedContentDetailArr.join('&');


            const updatedForm = {
                ...form,
                contentDetail: updatedContentDetailString
            };

            set(taskModalState, {isOpen: modalState.isOpen, form: updatedForm});
        }
    }
});

/**
 * 업무 생성/수정 modal '할일목록' 각 아이템 상태관리 :
 * (조회) TaskContentDetails get -> id를 파라미터로 특정 할일 data 조회
 * (수정) 특정 할일 data 변경 -> TaskContentDetails에 변경내용 set
 */
export const taskContentDetailFieldSelector = selectorFamily<string, string>({
    key: 'taskContentDetailFieldSelector',
    get: (param: string) => ({get}) => {
        const contentDetailFields = get(taskContentDetailSelector);
        return _.isEmpty(contentDetailFields) ? '' : contentDetailFields.get(param)!;
    },
    set: (param: string) => ({get, set}, newValue) => {
        if (!(newValue instanceof DefaultValue)) {
            const contentDetails = get(taskContentDetailSelector);

            const newContentDetail = new Map([[param, newValue]]);

            const updatedContentDetails = new Map([...contentDetails, ...newContentDetail]);

            set(taskContentDetailSelector, updatedContentDetails);
        }
    }

})


/**
 * 업무 수정 modal '진행 상태' 필드 상태관리
 * : 수정/생성 form 모두 관리하는 selectorFamily로 관리할 수 없어서 분리
 */
export const taskProgressModFieldSelector = selector({
    key: 'taskProgressModFieldSelector',
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


