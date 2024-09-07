import {requestWithAuth} from "@/service/project/request";
import {ProjectAuthMap} from "@/utils/type";
import {isEqual} from "lodash";
import {throwErrorIfInvalid} from "@/utils/common";

export type ProjectSettingCrewAuthUpdData = {
    authMap: ProjectAuthMap;
    projectId: bigint;
    projectMemberId: bigint;
    projectMemberAuthId: bigint;
};

/**
 * 프로젝트 설정 - 크루권한 수정
 * @param reqData
 */
export const updateProjectSettingCrewAuth = async (reqData: ProjectSettingCrewAuthUpdData) => {
    throwErrorIfInvalid(isEqual(reqData.projectMemberAuthId, 0n), "크루 권한을 선택해 주세요.");

    return requestWithAuth("PUT", "/api/project/setting/crewAuth", reqData);
}