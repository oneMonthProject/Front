import {requestWithAuth} from "@/service/project/request";
import {ConstantDto, PageResponseBody} from "@/utils/type";


/**
 * 프로젝트 지원
 * @param projectId
 * @param positionId
 */
export async function applyProject(projectId: bigint, positionId: bigint) {
    return await requestWithAuth('POST', `/api/project/apply?projectId=${projectId}`,
        {positionId, projectId, apply_message: "기본 메세지"});
}

export type ProjectApplyStatusCode = "PAS1001" | "PAS1002" | "PAS1003";

export type ProjectApplyDto = {
    project_apply_id: bigint;
    project_id: bigint;
    project_name: string;
    position_name: string;
    status: ConstantDto<ProjectApplyStatusCode>;
    apply_message: string;
    createDate: string;
}



/**
 * 프로젝트 지원 목록 조회
 * @param pageIndex
 * @param itemCount
 */
export async function getMyProjectApplies(pageIndex: number, itemCount: number): Promise<PageResponseBody<ProjectApplyDto[]>> {
    return await requestWithAuth('GET', `/api/project/apply?pageIndex=${pageIndex}&itemCount=${itemCount}`);
}