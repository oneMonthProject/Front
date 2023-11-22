import {atom, selector} from "recoil";


interface ProjectNoticeFormState {
    formType: '업무' | '모집' | '크루'
    createUserId: string;
    alertId: string;
    content: string;
    onConfirmHandler?: () => void;
}

export class ProjectNoticeForm implements ProjectNoticeFormState {
    formType: "업무" | "모집" | "크루";
    alertId: string;
    content: string;
    createUserId: string;

    onConfirmHandler(): void {
    }

    constructor(formType: "업무" | "모집" | "크루", alertId: string, createUserId: string, content: string) {
        this.alertId = alertId;
        this.content = content;
        this.createUserId = createUserId;
        this.formType = formType;
    }

}

/**
 * 크루 알림 form 객체
 */
export class ProjectNoticeCrewForm implements ProjectNoticeFormState {
    formType: '업무' | '모집' | '크루';
    alertId: string;
    createUserId: string;
    onConfirmHandler: () => void;

    constructor(formType: '업무' | '모집' | '크루', alertId: string, createUserId: string, content: string) {
        this.formType = formType;
        this.alertId = alertId;
        this.createUserId = createUserId;
        this.content = content;
        this.onConfirmHandler = () => {
            console.log("크루 this.formtype: ", this.formType);
            console.log("크루 this.alertID: ", this.alertId);
        }
    }

    content: string;
}

/**
 * 업무 알림 form 객체
 */
interface ProjectNoticeTaskFormState extends ProjectNoticeFormState {
    isTaskSuccess?: string;
    taskId?: string;
}

export class ProjectNoticeTaskForm extends ProjectNoticeForm {
    isTaskSuccess: string;
    taskId: string;
    onConfirmHandler: () => void;

    constructor(formType: '업무' | '모집' | '크루', alertId: string, createUserId: string, content: string) {
        super(formType, alertId, createUserId, content);
        this.isTaskSuccess = 'true';
        this.taskId = '';
        this.onConfirmHandler = () => {
            console.log("업무 this.formtype: ", this.formType);
            console.log("업무 this.alertID: ", this.alertId);
        }
    }


}

/**
 * 모집 알림 form 객체
 */
interface ProjectNoticeRecruitFormState extends ProjectNoticeFormState {
    position: string;
    projectId: string;
    isPermit: string;
}

export class ProjectNoticeRecruitForm extends ProjectNoticeForm {
    isPermit: string;
    position: string;
    projectId: string;
    onConfirmHandler: () => void;

    constructor(formType: '업무' | '모집' | '크루', alertId: string, createUserId: string, position: string, content: string) {
        super(formType, alertId, createUserId, content);
        this.isPermit = 'true';
        this.position = position;
        this.projectId = '';
        this.onConfirmHandler = () => {
            console.log("모집 this.formtype: ", this.formType);
            console.log("모집 this.alertID: ", this.alertId);
        }
    }


}

/**
 * 현재 알림 form 상태 관리
 */
export const projectNoticeCurrentFormState = atom<null | ProjectNoticeFormState | ProjectNoticeTaskFormState | ProjectNoticeRecruitFormState>({
    key: 'projectNoticeCurrentFormState',
    default: null
});


/**
 * 현재 알림 modal selector
 */
interface ProjectNoticeModalState {
    isOpen: boolean;
    title: string;
}

export const projectNoticeModalStateSelector = selector<ProjectNoticeModalState>({
    key: 'projectNoticeModalStateSelector',
    get: ({get}) => {
        const currentFormState = get(projectNoticeCurrentFormState);
        let title;
        switch (currentFormState?.formType) {
            case '업무' :
                title = '업무 알림';
                break;
            case '모집':
                title = '모집 알림';
                break;
            case '크루':
                title = '크루 알림';
                break;
            default:
                throw Error('Unknown Project Notice Form Type');
        }
        return {isOpen: currentFormState !== null, title: title};
    }
})





