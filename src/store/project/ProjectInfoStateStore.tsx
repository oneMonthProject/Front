import {atom, atomFamily, selectorFamily} from "recoil";
import {getMyProjectDetail} from "@/service/project/project";
import {ProjectInfo, ProjectTaskAuth, ResponseBody} from "@/utils/type";
import {userStateStore} from "@/store/user/UserStateStore";


export const projectIdState = atom<string | null>({
    key: 'projectIdState',
    default: null
});

export type ProjectInfoParamType = { projectId: string, userId: string };

export const projectInfoQuery = selectorFamily<ResponseBody<ProjectInfo | null>, string | null>({
    key: 'projectInfoQuery',
    get: (param: string | null) => async ({get}) => {
        let projectId;
        let userId;
        if (param === null) {
            projectId = get(projectIdState);
            userId = get(userStateStore);
        } else {
            const paramObj: ProjectInfoParamType = JSON.parse(param);
            projectId = paramObj.projectId;
            userId = paramObj.userId;
        }

        return await getMyProjectDetail(projectId, userId);
    }
});

export const projectInfoState = atomFamily<ResponseBody<ProjectInfo | null>, string | null>({
    key: 'projectInfoState',
    default: selectorFamily<ResponseBody<ProjectInfo | null>, string | null>({
        key: 'projectInfoSelector',
        get: (param: string | null) => ({get}) => {
            const data = get(projectInfoQuery(param));
            console.log("data:::: ",data);
            return data;
        }
    })
});

/**
 * 프로젝트 상세정보 auth selector
 */
export const projectTaskAuthSelector = selectorFamily<ResponseBody<ProjectTaskAuth | null>, string | null>({
    key: 'projectTaskAuthSelector',
    get: (param: string | null) => ({get}) => {
        const res: ResponseBody<ProjectInfo | null> = get(projectInfoState(param));
        return {data: res.data?.authMap || null, result: res.result, message: res.message};
    }
});



