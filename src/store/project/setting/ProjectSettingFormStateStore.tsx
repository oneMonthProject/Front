import {ProjectSettingForm, ProjectSettingFormKey} from "@/app/project/@setting/_utils/type";
import {atom, DefaultValue, selector, selectorFamily} from "recoil";
import {TRUST_GRADE as TG} from "@/app/project/@setting/_utils/constant";
import {projectInfoState} from "@/store/project/ProjectInfoStateStore";
import {ResponseBody} from "@/utils/type";


export const projectSettingFormState = atom<ResponseBody<ProjectSettingForm | null>>({
    key: 'projectSettingFormState',
    default: selector<ResponseBody<ProjectSettingForm | null>>({
        key: 'projectSettingFormSelector',
        get: ({get}) => {
            const res = get(projectInfoState(null));
            if (res.result !== "success" || res.data === null) return res as ResponseBody<null>;

            const {
                projectId,
                name: projectName,
                subject,
                startDate,
                endDate
            } = res.data;

            const projectSettingForm: ProjectSettingForm = {
                projectId,
                projectName,
                subject,
                startDate,
                endDate
            }

            return {data: projectSettingForm, result: res.result, message: res.message};
        }
    })
});


export type ProjectSettingField<T> = ProjectSettingForm[Extract<ProjectSettingFormKey, T>];
export const projectInfoFieldSelector = selectorFamily({
    key: 'projectInfoField',
    get: (param: ProjectSettingFormKey) => ({get}) => {
        const res = get(projectSettingFormState);
        if (res.result !== "success" || res.data === null) return null;

        const projectSettingForm = res.data;
        return projectSettingForm[param] as ProjectSettingField<typeof param>;
    },
    set: (param: ProjectSettingFormKey) => ({get, set}, newValue) => {
        if (newValue instanceof DefaultValue) return;

        const projectSettingForm = get(projectSettingFormState)!;
        const data = projectSettingForm.data!;
        const updatedData = {...data, [param]: newValue};
        const result = {...projectSettingForm, data:updatedData};
        set(projectSettingFormState, result);
    }
})





