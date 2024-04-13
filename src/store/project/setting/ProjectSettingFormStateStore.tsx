import {ProjectInfoForm, ProjectInfoFormKey} from "@/app/project/@setting/_utils/type";
import {atom, selector, selectorFamily} from "recoil";
import {TRUST_GRADE as TG} from "@/app/project/@setting/_utils/constant";
import {projectInfoState} from "@/store/project/ProjectInfoStateStore";


export const projectSettingSelector = selector<ProjectInfoForm | null>({
    key: 'projectSettingSelector',
    get: ({get}) => {
        const projectInfo = get(projectInfoState);
        if (!projectInfo) return null;

        const {
            name: projectName,
            subject,
            trustGrade: {name: resTrustGrade},
            startDate,
            endDate
        } = projectInfo;

        const data: ProjectInfoForm = {
            name: projectName,
            subject,
            resTrustGrade,
            trustGradeId: Object.values(TG).find(({name}) => resTrustGrade === name)?.id || null,
            startDate,
            endDate
        }

        return data;
    }
});

export const projectSettingFormState = atom({
    key: 'projectSettingFormState',
    default: projectSettingSelector
})


export const projectInfoFieldSelector = selectorFamily<Partial<ProjectInfoForm>, ProjectInfoFormKey>({
    key: 'projectInfoField',
    get: (param: ProjectInfoFormKey) => ({get}) => {
        const state = get(projectSettingFormState)!;
        return {[param]: state[param]};
    },
    set: (param: ProjectInfoFormKey) => ({get, set}, newValue) => {
        const state = get(projectSettingFormState);
        if (!state) return;
        set(projectSettingFormState, {...state, [param]: newValue});
    }
})





