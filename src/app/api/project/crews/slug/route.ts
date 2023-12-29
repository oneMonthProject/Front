import {NextRequest, NextResponse} from "next/server";
import authApi from "@/utils/authApi";

/**
 * 프로젝트 멤버 목록/상세 조회
 * @param req
 * @param params
 * @constructor
 */
export async function GET(
    req: NextRequest,
    {params}: { params: { slug: string } }
) {
    const method = req.method;
    const {searchParams} = new URL(req.url);

    let res: Response;
    if (params.slug === 'list') {
        const projectId = searchParams.get('projectId');
        res = await authApi(`/api/projectmember/project/${projectId}`, {method});
    } else if (params.slug === 'detail') {
        const projectMemberId = searchParams.get('projectMemberId');
        res = await authApi(`/api/projectmember/${projectMemberId}`, {method});
    } else {
        throw Error('Unknown Api Route');
    }

    const data = await res.json();
    return NextResponse.json(data);
}