import {NextRequest, NextResponse} from "next/server";
import authApi from "@/utils/authApi";
import {JSONReplaceBigInt} from "@/utils/common";

const baseURL = process.env.NEXT_PUBLIC_BACKEND;

/**
 * 프로젝트 알림 목록 조회
 * @param req
 * @constructor
 */
export async function GET(
    req: NextRequest,
    {params}: { params: { slug: string } }
) {
    const {searchParams} = new URL(req.url);

    const method = req.method;

    const projectId = searchParams.get('projectId');
    const pageIndex = searchParams.get('pageIndex');
    const itemCount = searchParams.get('itemCount');

    let res: Response;
    const requestNoticeUrl = `${baseURL}/api/alert/project/${projectId}`;
    if (params.slug === 'all') {
        res = await authApi(`${requestNoticeUrl}?pageIndex=${pageIndex}&itemCount=${itemCount}`, {method});
    } else {
        res = await authApi(`${requestNoticeUrl}/${params.slug}?pageIndex=${pageIndex}&itemCount=${itemCount}`, {method})
    }

    const data = await res.json();
    return NextResponse.json(data);
}

