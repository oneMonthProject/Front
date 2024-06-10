import {atom, atomFamily, noWait, selector, selectorFamily} from "recoil";
import {getMyProjectDetail} from "@/service/project/project";
import {ProjectInfo} from "@/utils/type";
import {userStateStore} from "@/store/user/UserStateStore";


export const projectIdState = atom<string | null>({
    key: 'projectIdState',
    default: null
});

export type ProjectInfoParamType = { projectId: string, userId: string };

export const projectInfoQuery = selectorFamily<ProjectInfo | null, string | null>({
    key: 'projectInfoQuery',
    get: (param: string | null) => async ({get}) => {
        let projectId;
        let userId;
        if (param === null) {
            projectId = get(projectIdState);
            userId = get(userStateStore);
        } else {
            const paramObj:ProjectInfoParamType = JSON.parse(param);
            projectId = paramObj.projectId;
            userId = paramObj.userId;
        }

        if(projectId === null || userId === null) return null;

        const res = await getMyProjectDetail(BigInt(projectId!), BigInt(userId!));
        if (res.message !== 'success') throw Error();

        return res.data;
    }
});

export const projectInfoState = atomFamily<ProjectInfo | null, string | null>({
    key: 'projectInfoState',
    default: selectorFamily<ProjectInfo | null, string | null>({
        key: 'projectInfoSelector',
        get: (param: string | null) => ({get}) => {
            return get(projectInfoQuery(param));
        }
    })
});

/**
 * 프로젝트 상세정보 auth selector
 */
export const projectTaskAuthSelector = selectorFamily({
    key: 'projectTaskAuthSelector',
    get: (param: string | null) => ({get}) => {
        const projectInfo = get(projectInfoState(param));
        if (!projectInfo) return;
        const {authMap} = projectInfo;
        return authMap;
    }
});



