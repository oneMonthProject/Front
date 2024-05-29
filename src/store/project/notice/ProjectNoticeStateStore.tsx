import {atom, selector, selectorFamily} from "recoil";
import {Notice, ProjectNoticeTypesKey, RecruitPermit, TaskScore} from "@/app/project/@notice/_utils/type";
import {CrewForceWDLConfirm} from "@/app/project/@notice/_utils/constant";


/**
 * 알림 form
 */
export const projectNoticeCurrentFormState = atom<Notice | null>({
    key: 'projectNoticeCurrentFormState',
    default: null
});



export const projectNoticeRecruitPermitState = atom<RecruitPermit>({
    key: 'projectNoticeRecruitFieldSelector',
    default: {
        isPermit: null
    }
});

// 크루 알림 > 강제탈퇴
export const projectNoticeForceWDLState = atom<CrewForceWDLConfirm>({
    key: 'projectNoticeForceWDLState',
    default: {
        withdrawConfirm: null
    }
});


// 업무 알림 > 신뢰점수
export const projectNoticeTaskScoreState = atom<TaskScore>({
    key: 'projectNoticeTaskPointState',
    default: {
        scoreTypeId: null
    }
});


// 알림 confirm시 필요한 데이터 select
export const projectConfirmDataSelector = selectorFamily({
    key: 'projectConfirmDataSelector',
    get: (param: ProjectNoticeTypesKey) => ({get}) => {
        if (param === 'WORK') {
            return get(projectNoticeTaskScoreState);
        }

        if (param === 'RECRUIT') {
            return get(projectNoticeRecruitPermitState);
        }

        if (param === 'FORCEWITHDRAWAL' || param === 'WITHDRAWAL') {
            return get(projectNoticeForceWDLState);
        }
    }
})

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
            switch (currentFormState?.type) {
                case 'WORK' :
                    title = '업무 알림';
                    break;
                case 'RECRUIT':
                    title = '모집 알림';
                    break;
                case 'CREW_CONFIRM':
                case 'ADD':
                    title = '크루 알림';
                    break;
                case 'FORCEWITHDRAWAL':
                    title = '크루 강제탈퇴 신청';
                    break;
                case 'WITHDRAWAL':
                    title = '크루 탈퇴 신청'
                    break;
                default:
                    throw Error('Unknown Project Notice Form Type');
            }
        }

        return {isOpen: currentFormState !== null, title: title};
    }
})





