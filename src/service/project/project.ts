import {requestWithAuth} from "@/service/project/request";
import {ResponseBody} from "@/utils/type";
import {ProjectInfoUpdateReq} from "@/app/project/@setting/_utils/type";
import {sortByStartDate} from "@/utils/common";
import _ from "lodash";


/**
 * 프로젝트 목록 조회
 */
export async function getMyProjectList(pageIndex: number, itemCount: number) {
    const resBody = await requestWithAuth('GET', `/api/project/list?pageIndex=${pageIndex}&itemCount=${itemCount}`);

    return {
        ...resBody,
        data: resBody.data ? {
            totalPages: resBody.data.totalPages,
            content: resBody.data.content ? sortByStartDate(resBody.data.content, 'desc') : []
        } : null
    }
}


/**
 * 프로젝트 상세 조회
 * @param projectId
 * @param userId
 */
export async function getMyProjectDetail(projectId: string | bigint | null, userId: string | bigint | null) {
    if(!projectId || !userId){
        const resBody:ResponseBody<null> = {
            result:'fail',
            message: 'Invalid Parameter Error',
            data: null,
            errorHandle:'retry'
        }
        return resBody;
    }

    const _projectId = typeof projectId === 'string' ? BigInt(projectId) : projectId;
    const _userId = typeof userId === 'string' ? BigInt(userId) : userId;

    return await requestWithAuth('GET', `/api/project/detail?projectId=${_projectId}&userId=${_userId}`)
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

    let errorMessage = '';
    if(!milestoneAuth) errorMessage = '프로젝트 수정 권한이 없습니다.';
    if(_.isEmpty(projectName)) errorMessage = '프로젝트 이름을 입력해주세요';
    if(_.isEmpty(subject)) errorMessage = '프로젝트 주제를 입력해주세요';
    if(_.isNull(trustGradeId)) errorMessage = '프로젝트 신뢰등급을 선택해주세요';
    if(_.isEmpty(startDate)) errorMessage = '시작날짜를 선택해주세요';
    if(_.isEmpty(endDate)) errorMessage = '종료날짜를 선택해주세요';

    if (errorMessage){
        const resBody:ResponseBody<null> = {
            result: 'fail',
            message: errorMessage,
            data: null,
            errorHandle: 'snackbar'
        };
        return resBody;
    }

    return await requestWithAuth('PUT', `/api/project`, {
        projectInfo: {
            ...projectInfo,
            trustGradeId: BigInt(trustGradeId!)
        }
    });
}

/**
 * 프로젝트 종료
 * @param projectId
 */
export async function endProject(projectId: string | bigint) {
    return await requestWithAuth('POST', '/api/project', {projectId});
}