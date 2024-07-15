import authApi from "@/app/api/_requestor/authApi";
import {NextRequest} from "next/server";
import {JSONReplaceBigInt} from "@/utils/common";
import {routeResponseHandler} from "@/app/api/_requestor/routeResponseHandler";

const baseURL = process.env.NEXT_PUBLIC_BACKEND;

/**
 * 마일스톤 목록 조회
 * @param req
 * @constructor
 */
export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const projectId = searchParams.get('projectId');

    const res = await authApi(`/api/milestone/project/${projectId}`, {method: 'GET'});

    return routeResponseHandler(req, res);
}

/**
 * 마일스톤 생성
 * @param req
 * @constructor
 */
export async function POST(req: NextRequest) {
    const {projectId, content, startDate, endDate} = await req.json();

    const res = await authApi(
        `/api/milestone/project/${projectId}`,
        {
            method: 'POST',
            body: JSONReplaceBigInt({content, startDate, endDate})
        });

    return routeResponseHandler(req, res);
}

/**
 * 마일스톤 수정
 * @param req
 * @constructor
 */
export async function PATCH(req: NextRequest) {
    const {content, startDate, endDate, mileStoneId, progressStatusCode} = await req.json();

    const res = await authApi(
        `/api/milestone/${mileStoneId}`,
        {
            method: 'PATCH',
            body: JSONReplaceBigInt({
                content, startDate, endDate, progressStatusCode
            })
        }
    );

    return routeResponseHandler(req, res);
}

/**
 * 프로젝트 마일스톤 삭제
 * @param request
 * @constructor
 */
export async function DELETE(request: NextRequest) {
    const {milestoneId} = await request.json();

    const res = await authApi(
        `${baseURL}/api/milestone/${milestoneId}`,
        {method: 'DELETE'}
    );

    return routeResponseHandler(request, res);
}