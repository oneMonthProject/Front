import {ProjectInfoForm, ProjectInfoFormKey} from "@/app/project/@setting/_utils/type";
import {atom, selector, selectorFamily} from "recoil";
import {TRUST_GRADE as TG} from "@/app/project/@setting/_utils/constant";
import {projectInfoSelector} from "@/store/project/ProjectInfoStateStore";


export const projectSettingFormInit = selector({
    key: 'projectSettingFormInit',
    get: ({get}) => {
        const projectInfo = get(projectInfoSelector);

        const {
            projectId,
            name: projectName,
            subject,
            trustGrade: {name: trustGradeName},
            startDate,
            endDate
        } = projectInfo;

        const data: ProjectInfoForm = {
            projectId,
            projectName,
            subject,
            trustGradeId: Object.values(TG).find(({name}) => trustGradeName === name)?.id || null,
            startDate,
            endDate
        }

        return data;
    }
});

export const projectSettingFormState = atom({
    key: 'projectSettingFormState',
    default: projectSettingFormInit
});

export const projectSettingFormSelector = selector({
    key:'projectSettingFormSelector',
    get:({get}) => {
        return get(projectSettingFormState);
    }
});

export const projectSettingFormFields = atom({
    key:'projectSettingFormFields',
    default:projectSettingFormSelector
})


export const projectInfoFieldSelector = selectorFamily<Partial<ProjectInfoForm>, ProjectInfoFormKey>({
    key: 'projectInfoField',
    get: (param: ProjectInfoFormKey) => ({get}) => {
        const state = get(projectSettingFormFields);
        return {[param]: state[param]};
    },
    set: (param: ProjectInfoFormKey) => ({get, set}, newValue) => {
        const state = get(projectSettingFormFields);
        set(projectSettingFormFields, {...state, ...newValue});
    }
})





