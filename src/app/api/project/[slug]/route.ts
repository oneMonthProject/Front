import authApi from "@/utils/authApi";
import {NextRequest, NextResponse} from "next/server";

/**
 * 내 프로젝트 목록/상세 조회
 * @constructor
 */
export async function GET(
    req: NextRequest,
    {params}: { params: { slug: string } }
) {
    const method = req.method;

    let res: Response;
    if (params.slug === 'list') {
        const {searchParams} = new URL(req.url);
        const pageIndex = searchParams.get('pageIndex');
        const itemCount = searchParams.get('itemCount');
        res = await authApi(`/api/project/me/participating?pageIndex=${pageIndex}&itemCount=${itemCount}`, {method});
    } else if (params.slug === 'detail') {
        const {searchParams} = new URL(req.url);
        const projectId = searchParams.get('projectId');
        res = await authApi(`/api/project/${projectId}`, {method});
    } else {
        throw Error('Unknown Api Route');
    }

    const data = await res.json();
    return NextResponse.json(data);
}

