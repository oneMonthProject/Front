import authApi from "@/app/api/_requestor/authApi";
import {NextRequest, NextResponse} from "next/server";
import {apiResponse} from "@/app/api/_requestor/apiResponse";
import {PageResponseBody, ProjectPost} from "@/utils/type";
import {JSONReplaceBigInt, sortByStartDate} from "@/utils/common";

/**
 * 내 프로젝트 목록/상세 조회
 * @constructor
 */
export async function GET(
    req: NextRequest,
    {params}: { params: { slug: string } }
) {
    const method = req.method;

    if (params.slug === 'list') {
        const {searchParams} = new URL(req.url);
        const pageIndex = searchParams.get('pageIndex');
        const itemCount = searchParams.get('itemCount');
        const res = await authApi(`/api/project/me/participating?pageIndex=${pageIndex}&itemCount=${itemCount}`, {method});

        const resBody: PageResponseBody<ProjectPost[]> = await res.json();

        const sortedResBody = {
            ...resBody,
            data: {
                totalPages: resBody.data.totalPages,
                content: resBody.data.content ? sortByStartDate(resBody.data.content, 'desc') : []
            }
        }

        const returnRes = new NextResponse(JSONReplaceBigInt(sortedResBody), {
            status: res.status,
            headers: res.headers,
            statusText: res.statusText
        });

        return apiResponse(req, returnRes);

    } else if (params.slug === 'detail') {
        const {searchParams} = new URL(req.url);
        const projectId = searchParams.get('projectId');
        const userId = searchParams.get("userId");
        const res = await authApi(`/api/project/${projectId}/${userId}`, {method});
        return apiResponse(req, res);
    } else {
        throw Error('Unknown Api Route');
    }


}

