import {NextRequest, NextResponse} from "next/server";
import authApi from "@/utils/authApi";


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
    const requestNoticeUrl = `/api/alert/project/${projectId}`;
    if (params.slug === 'all') {
        res = await authApi(`${requestNoticeUrl}?pageIndex=${pageIndex}&itemCount=${itemCount}`, {method});
    } else {
        res = await authApi(`${requestNoticeUrl}/${params.slug}?pageIndex=${pageIndex}&itemCount=${itemCount}`, {method})
    }

    const data = await res.json();
    return NextResponse.json(data);
}

/**
 * 프로젝트 알림 생성
 * @param req
 * @param params
 * @constructor
 */
export async function POST(
    req: NextRequest,
    {params}: { params: { slug: string } }
) {

    let res: Response;

    const method = req.method;
    if (params.slug === 'task') { // 업무 알림 생성
        const noticeCreateForm = await req.json();
        res = await authApi(
            `/api/alert`,
            {
                method,
                body: JSON.stringify(noticeCreateForm)
            }
        );
    } else if (params.slug === 'crewOut') { // 프로젝트 멤버 탈퇴(신청) 알림 생성
        const {projectMemberId} = await req.json();
        res = await authApi(`/api/projectmember/${projectMemberId}/withdraw`, {method});
    }else{
        throw new Error(`Unknown Notice API: /api/project/notice/${params.slug}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
}

