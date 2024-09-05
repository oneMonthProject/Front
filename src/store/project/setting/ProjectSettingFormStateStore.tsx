import {atom, DefaultValue, selectorFamily} from "recoil";
import {ProjectSettingInfoUpdReqData} from "@/service/project/setting/info";
import {ProjectSettingBoardUpdReqData} from "@/service/project/setting/board";

/**
 * 프로젝트 설정 - 프로젝트 정보 상태 store/selector
 */
export const projectSettingInfoStateStore = atom<ProjectSettingInfoUpdReqData>({
    key: 'projectSettingInfoStateStore',
    default: {
        projectId: 0n,
        authMap: {
            milestoneAuth: false,
            workAuth: false,
            voteAuth: false
        },
        projectName: '',
        projectSubject: '',
        startDate: '',
        endDate: '',
        technologyIds: []
    }
});

export type ProjectSettingInfoUpdKey = keyof ProjectSettingInfoUpdReqData;
export type ProjectSettingInfoUpdField<T> = ProjectSettingInfoUpdReqData[Extract<ProjectSettingInfoUpdKey, T>];
export const projectSettingInfoSelector = selectorFamily({
    key: 'projectSettingInfoSelector',
    get: (param: ProjectSettingInfoUpdKey) => ({get}) => {
        const res = get(projectSettingInfoStateStore);
        return res[param] as ProjectSettingInfoUpdField<typeof param>;
    },
    set: (param: ProjectSettingInfoUpdKey) => ({get, set}, newValue) => {
        if (newValue instanceof DefaultValue) return;

        const projectSettingInfoUpdReq = get(projectSettingInfoStateStore);
        const updated = {...projectSettingInfoUpdReq, [param]: newValue};
        set(projectSettingInfoStateStore, updated);
    }
});





