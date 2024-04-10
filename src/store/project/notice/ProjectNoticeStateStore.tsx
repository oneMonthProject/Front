import {atom, selector} from "recoil";
import {
    ProjectNoticeCrew,
    ProjectNoticeCrewFWDL,
    ProjectNoticeRecruit,
    ProjectNoticeTask
} from "@/app/project/@notice/_utils/type";
import {PROJECT_NOTICE_TYPE as PNT} from "@/app/project/@notice/_utils/constant";


/**
 * 프로젝트 알림 Form > 크루 추가 & 크루 컨펌
 */
export type ProjectNoticeCrewForm = {
    name: typeof PNT.CREW_CONFIRM.value | typeof PNT.ADD.value;
    form: ProjectNoticeCrew;
}

/**
 * 프로젝트 알림 Form > 업무 알림
 */
export type ProjectNoticeTaskForm = {
    name: typeof PNT.WORK.value;
    form: ProjectNoticeTask;
}

/**
 * 프로젝트 알림 Form > 모집 알림
 */
export type ProjectNoticeRecruitForm = {
    name: typeof PNT.RECRUIT.value;
    form: ProjectNoticeRecruit;
}

/**
 * 프로젝트 알림 Form > 강제 탈퇴 알림
 */
export type ProjectNoticeCrewFWDLForm = {
    name: typeof PNT.FORCEWITHDRAWL.value;
    form: ProjectNoticeCrewFWDL;
}

type ProjectNoticeCurrentForm = | null
    | ProjectNoticeCrewForm
    | ProjectNoticeTaskForm
    | ProjectNoticeRecruitForm
    | ProjectNoticeCrewFWDLForm;
/**
 * 현재 알림 form 상태 관리
 */
export const projectNoticeCurrentFormState = atom<ProjectNoticeCurrentForm>({
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
        let title = '';

        if (currentFormState !== null) {
            switch (currentFormState?.name) {
                case PNT.WORK.value :
                    title = '업무 알림';
                    break;
                case PNT.RECRUIT.value:
                    title = '모집 알림';
                    break;
                case PNT.CREW_CONFIRM.value:
                case PNT.ADD.value:
                    title = '크루 알림';
                    break;
                default:
                    throw Error('Unknown Project Notice Form Type');
            }
        }

        return {isOpen: currentFormState !== null, title: title};
    }
})





