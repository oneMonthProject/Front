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
    const method = req.method;

    switch (params.slug) {
        case 'work':
            res = await authApi('/api/work/confirm',
                {method, body: JSONReplaceBigInt(reqData)});
            break;
        case 'recruit':
            res = await authApi(`/api/project/participate/confirm`,
                {
                    method,
                    body: JSONReplaceBigInt({alertId: reqData.alertId, confirmResult: reqData.confirmResult})
                });
            break;
        case 'withdraw':
            res = await authApi(`/api/projectmember/withdraw/confirm`, {method, body: JSONReplaceBigInt(reqData)});
            break;
        default:
            throw new Error(`Unknown Notice Confirm Api: /api/project/confirm/${params.slug}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
}