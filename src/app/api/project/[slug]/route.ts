import authApi from "@/app/api/_requestor/authApi";
import {NextRequest} from "next/server";
import {routeResponseHandler} from "@/app/api/_requestor/routeResponseHandler";

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
        return routeResponseHandler(req, res);
    } else if (params.slug === 'detail') {
        const {searchParams} = new URL(req.url);
        const projectId = searchParams.get('projectId');
        const userId = searchParams.get("userId");
        const res = await authApi(`/api/project/${projectId}/${userId}`, {method});
        return routeResponseHandler(req, res);
    } else {
        throw Error('Unknown Api Route');
    }


}

