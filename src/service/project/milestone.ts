import {MilestoneInfo} from "@/utils/type";
import authApi from "@/utils/authApi";
import {setupMocks} from "@/mocks";
import {JSONReplaceBigInt} from "@/utils/common";

const baseURL = process.env.NEXT_PUBLIC_BACKEND;
const IS_BROWSER = typeof window !== 'undefined';
const isTest = process.env.NEXT_PUBLIC_API_MOCKING === 'true';


export async function request(
    method: 'GET' | 'POST' | 'PATCH',
    url: string,
    data?: BodyInit
) {

    try {
        const requestObj: RequestInit =
            isTest ? {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                }
            } : {method: method};

        if (method !== 'GET') requestObj.body = data;

        if (isTest) {
            await setupMocks();
            const response = await fetch(`${baseURL}${url}`, {
                ...requestObj
            });
            return await response.json();

        } else {
            const response = await authApi(url, requestObj);
            return await response.json();
        }

    } catch (error) {
        console.log("error: ", error);
    }

}

/**
 * 프로젝트 마일스톤 목록 조회
 * @param projectId
 */
export async function getProjectMilestones(projectId: string) {
    return await request('GET', `/api/milestone/project/${projectId}`);
}

/**
 * 프로젝트 마일스톤 생성
 * @param milestoneInfo
 * @param projectId
 */
export async function createMilestone<T extends MilestoneInfo>(
    {
        milestoneInfo,
        projectId
    }: {
        milestoneInfo: T, projectId: string
    }) {

    const {content, startDate, endDate} = milestoneInfo;
    const reqData = {content, startDate, endDate};

    return await request('POST', `/api/milestone/project/${projectId}`, JSONReplaceBigInt(reqData));
}

/**
 * 마일스톤 수정
 * @param milestoneInfo
 */
export async function updateMilestone<T extends MilestoneInfo>({milestoneInfo}: { milestoneInfo: T }) {
    const {content, startDate, endDate, progressStatus: progressStatusCode, mileStoneId} = milestoneInfo;
    const reqData = {content, startDate, endDate, progressStatusCode};

    return await request('PATCH', `/api/milestone/${mileStoneId}`, JSON.stringify(reqData));
}