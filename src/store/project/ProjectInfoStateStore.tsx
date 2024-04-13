import {atom, selector} from "recoil";
import {getMyProjectDetail} from "@/service/project/project";
import {ProjectInfo, ProjectTaskAuth} from "@/utils/type";


export const projectIdState = atom<string>({
    key: 'projectIdState',
    default: ''
});

export const projectInfoSelector = selector<ProjectInfo | null>({
    key: 'projectInfoSelector',
    get: async ({get}) => {
        const projectId = get(projectIdState);
        if(projectId == '') return null;

        const res = await getMyProjectDetail(BigInt(projectId));
        if (res.message !== 'success') throw Error();

        return res.data;
    }
})

export const projectInfoState = atom({
    key: 'projectInfoStateStore',
    default: projectInfoSelector
});

export const projectTaskAuthSelector = selector<ProjectTaskAuth | null>({
    key:'projectTaskAuthSelector',
    get:({get}) => {
        const projectInfo = get(projectInfoState);
        if(!projectInfo) return null;

        const {authMap} = projectInfo;
        return authMap;
    }
})