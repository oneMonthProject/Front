import {NextRequest, NextResponse} from "next/server";
import authApi from "@/utils/authApi";
import {JSONReplaceBigInt} from "@/utils/common";

/**
 * 프로젝트 알림 컨펌
 * @param req
 * @param params
 * @constructor
 */
export async function POST(req: NextRequest, {params}: { params: { slug: string } }) {
    const reqData = await req.json();

    let res: Response;

    if (params.slug === 'work') {
        res = await authApi('/api/work/confirm',
            {
                method: 'POST',
                body: JSONReplaceBigInt(reqData)
            });
    } else if (params.slug === 'recruit') {
        res = await authApi(`/api/project/${reqData.projectId}/participate/confirm`, {
            method: 'POST',
            body: JSONReplaceBigInt({alertId:reqData.alertId, confirmResult: reqData.confirmResult})
        })
    }else{
        throw new Error('Unknown notice confirm api');
    }

    const data = await res.json();
    return NextResponse.json(data);
}