import {atom, atomFamily, noWait, selector, selectorFamily} from "recoil";
import {getMyProjectDetail} from "@/service/project/project";
import {ProjectInfo} from "@/utils/type";


export const projectIdState = atom<string | null>({
    key: 'projectIdState',
    default: null
});

export const projectInfoQuery = selectorFamily<ProjectInfo, string>({
        key: 'projectInfoQuery',
        get: (projectId:string) => async ({get}) => {
            const res = await getMyProjectDetail(BigInt(projectId));
            if (res.message !== 'success') throw Error();

            return res.data;
        }
    });

export const projectInfoState = atomFamily<ProjectInfo | null, string>({
    key: 'projectInfoState',
    default: selectorFamily<ProjectInfo | null, string>({
        key: 'projectInfoSelector',
        get: (projectId:string) => ({get}) => {
            return get(projectInfoQuery(projectId!));
        }
    })
});

/**
 * 프로젝트 상세정보 auth selector
 */
export const projectTaskAuthSelector = selectorFamily({
    key: 'projectTaskAuthSelector',
    get: (param:string | null) => ({get}) => {
        const projectId = param ? param : get(projectIdState)!;

        const projectInfo = get(projectInfoState(projectId));
        if (!projectInfo) return;
        const {authMap} = projectInfo;
        return authMap;
    }
});



