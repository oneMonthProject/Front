import {atom, noWait, selector, selectorFamily} from "recoil";
import {getMyProjectDetail} from "@/service/project/project";


export const projectIdState = atom<string>({
    key: 'projectIdState',
});

/**
 * 프로젝트 상세정보 init
 */
export const projectInitSelector = selectorFamily({
    key: 'projectInitSelector',
    get: (param: string = '') => async ({get}) => {
        const projectId = param === '' ? get(projectIdState) : param;

        const res = await getMyProjectDetail(BigInt(projectId));
        if (res.message !== 'success') throw Error();

        return res.data;
    }
});

/**
 * 프로젝트 상세정보 state
 */
export const projectInfoState = atom({
    key: 'projectInfoStateStore',
    default: projectInitSelector
});

/**
 * 프로젝트 상세정보 selector
 */
export const projectInfoSelector = selector({
    key: 'projectInfoSelector',
    get: ({get}) => {
        return get(noWait(get(projectInfoState)(''))).getValue();
    }
})

/**
 * 프로젝트 상세정보 auth init
 */
export const projectTaskAuthInitSelector = selectorFamily({
    key: 'projectTaskAuthInitSelector',
    get: (param:string = '') => async ({get}) => {
        const projectId = param === '' ? get(projectIdState) : param;

        const res = await getMyProjectDetail(BigInt(projectId));
        if (res.message !== 'success') throw Error();

        const {authMap} = res.data;
        return authMap;
    }
});

/**
 * 프로젝트 상세정보 auth state
 */
export const projectTaskAuthState = atom({
    key: 'projectTaskAuthState',
    default: projectTaskAuthInitSelector
});

/**
 * 프로젝트 상세정보 auth selector
 */
export const projectTaskAuthSelector = selector({
    key:'projectTaskAuthSelector',
    get: ({get}) => {
        return get(noWait(get(projectTaskAuthState)(''))).getValue();
    }
})


