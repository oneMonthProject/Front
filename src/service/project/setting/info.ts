import {requestWithAuth} from "@/service/project/request";
import {ProjectAuthMap, TechStackItem} from "@/utils/type";

export type ProjectSettingInfoData = {
    projectId: bigint;
    projectName: string;
    projectSubject: string;
    startDate: string;
    endDate: string;
    technologyStacks: TechStackItem[];
}
/**
 * 프로젝트 세팅 - 프로젝트 정보 조회
 * @param projectId
 */
export const getProjectSettingInfo = async (projectId: bigint) => {
    return requestWithAuth("GET", `/api/project/setting/info?projectId=${projectId}`);
}

export type ProjectSettingInfoUpdReqData = {
    projectId: bigint;
    authMap: ProjectAuthMap;
    projectName: string;
    projectSubject: string;
    startDate: string;
    endDate: string;
    technologyIds: bigint[];
}

/**
 * 프로젝트 세팅 - 프로젝트 정보 수정
 * @param reqData
 */
export const updateProjectSettingInfo = async (reqData: ProjectSettingInfoUpdReqData) => {
    return await requestWithAuth("PUT", "/api/project/setting/info", reqData);
}