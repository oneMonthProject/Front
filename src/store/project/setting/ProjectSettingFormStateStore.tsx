import {ProjectSettingForm, ProjectSettingFormKey} from "@/app/project/@setting/_utils/type";
import {atom, DefaultValue, selector, selectorFamily} from "recoil";
import {TRUST_GRADE as TG} from "@/app/project/@setting/_utils/constant";
import {projectIdState, projectInfoState} from "@/store/project/ProjectInfoStateStore";


export const projectSettingFormState = atom<ProjectSettingForm | null>({
    key: 'projectSettingFormState',
    default: selector<ProjectSettingForm | null>({
        key: 'projectSettingFormSelector',
        get: ({get}) => {
            const projectIdString = get(projectIdState);
            console.log("projectIdString: ", projectIdString);
            if (projectIdString === null) return null;

            const projectInfo = get(projectInfoState(projectIdString));
            if (projectInfo === null) return null;

            const {
                projectId,
                name: projectName,
                subject,
                trustGrade: {name: trustGradeName},
                startDate,
                endDate
            } = projectInfo;

            const data: ProjectSettingForm = {
                projectId,
                projectName,
                subject,
                trustGradeId: Object.values(TG).find(({name}) => trustGradeName === name)?.value || null,
                startDate,
                endDate
            }

            return data;
        }
    })
});


export type ProjectSettingField<T> = ProjectSettingForm[Extract<ProjectSettingFormKey, T>];
export const projectInfoFieldSelector = selectorFamily({
    key: 'projectInfoField',
    get: (param: ProjectSettingFormKey) => ({get}) => {
        const projectSettingForm = get(projectSettingFormState);
        if (projectSettingForm === null) return null;
        return projectSettingForm[param] as ProjectSettingField<typeof param>;
    },
    set: (param: ProjectSettingFormKey) => ({get, set}, newValue) => {
        if (newValue instanceof DefaultValue) return;

        const projectSettingForm = get(projectSettingFormState)!;
        set(projectSettingFormState, {...projectSettingForm, [param]: newValue});
    }
})





