import {request} from "@/service/project/request";
import {ProjectInfo, ResponseBody} from "@/utils/type";
import {ProjectInfoUpdateReq} from "@/app/project/@setting/_utils/type";
import {createFalsyResBody, throwErrorIfInvalid} from "@/utils/common";
import _ from "lodash";


/**
 * 프로젝트 목록 조회
 */
export async function getMyProjectList(pageIndex: number, itemCount: number) {
    return await request('GET', `/api/project/list?pageIndex=${pageIndex}&itemCount=${itemCount}`);
}


/**
 * 프로젝트 상세 조회
 * @param projectId
 * @param userId
 */
export async function getMyProjectDetail(projectId: string | bigint, userId: string | bigint): Promise<ResponseBody<ProjectInfo>> {
    return await request('GET', `/api/project/detail?projectId=${projectId}&userId=${userId}`)
}

/**
 * 프로젝트 정보 수정
 * @param projectInfo
 */
export async function updateProjectInfo(projectInfo: ProjectInfoUpdateReq) {

    const {
        authMap: {milestoneAuth},
        projectName,
        subject,
        trustGradeId,
        startDate,
        endDate
    } = projectInfo;

    let erroredResult: ResponseBody<null> | null;
    erroredResult = createFalsyResBody(!milestoneAuth, '프로젝트 수정 권한이 없습니다.');
    if (!erroredResult) erroredResult = createFalsyResBody(_.isEmpty(projectName), '프로젝트 이름을 입력해주세요');
    if (!erroredResult) erroredResult = createFalsyResBody(_.isEmpty(subject), '프로젝트 주제를 입력해주세요');
    if (!erroredResult) erroredResult = createFalsyResBody(_.isNull(trustGradeId), '프로젝트 신뢰등급을 선택해주세요');
    if (!erroredResult) erroredResult = createFalsyResBody(_.isEmpty(startDate), '시작날짜를 선택해주세요');
    if (!erroredResult) erroredResult = createFalsyResBody(_.isEmpty(endDate), '종료날짜를 선택해주세요');

    if (erroredResult) return erroredResult;

    return await request('PUT', `/api/project`, {projectInfo: {...projectInfo, trustGradeId: BigInt(trustGradeId!)}});
}

/**
 * 프로젝트 종료
 * @param projectId
 */
export async function endProject(projectId: string | bigint) {
    return await request('POST', '/api/project', {projectId});
}