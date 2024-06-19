import {NextRequest, NextResponse} from "next/server";
import authApi from "@/utils/authApi";
import {JSONReplaceBigInt} from "@/utils/common";
import {authApiResponse} from "@/app/api/_utils/authApiResponse";

const baseURL = process.env.NEXT_PUBLIC_BACKEND;

/**
 * 프로젝트 (특정 마일스톤 내) 업무 조회
 * @param req
 * @constructor
 */
export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const projectId = searchParams.get('projectId');
    const milestoneId = searchParams.get('milestoneId');
    const pageIndex = searchParams.get('pageIndex');
    const itemCount = searchParams.get('itemCount');

    const res = await authApi(
        `/api/work/project/${projectId}/milestone/${milestoneId}?pageIndex=${pageIndex}&itemCount=${itemCount}`,
        {method: 'GET'})

    return authApiResponse(req, res);
}

/**
 * 프로젝트 (특정 마일스톤 내) 업무 생성
 * @param req
 * @constructor
 */
export async function POST(req: NextRequest) {
    const {task: {projectId, milestoneId, content, startDate, endDate, assignedUser, contentDetail}} = await req.json();
    const res = await authApi(
        `${baseURL}/api/work/project/${projectId}/milestone/${milestoneId}`,
        {
            method: 'POST',
            body: JSONReplaceBigInt({
                content,
                startDate,
                endDate,
                contentDetail,
                assignedUserId: assignedUser.projectMemberId
            })
        });

    return authApiResponse(req, res);
}

/**
 * 업무 수정
 * @param req
 * @constructor
 */
export async function PATCH(req: NextRequest) {
    const {
        task: {
            workId,
            content,
            startDate,
            endDate,
            progressStatusCode,
            assignedUser,
            contentDetail
        }
    } = await req.json();

    const res = await authApi(
        `${baseURL}/api/work/${workId}`,
        {
            method: 'PATCH',
            body: JSONReplaceBigInt({
                content,
                startDate,
                endDate,
                progressStatusCode,
                contentDetail,
                assignedUserId: assignedUser.projectMemberId
            })
        }
    );

    return authApiResponse(req, res);
}

/**
 * 업무 삭제
 * @param req
 * @constructor
 */
export async function DELETE(req: NextRequest) {
    const {workId} = await req.json();

    const res = await authApi(
        `${baseURL}/api/work/${workId}`,
        {
            method: 'DELETE'
        }
    )

    return authApiResponse(req, res);
}