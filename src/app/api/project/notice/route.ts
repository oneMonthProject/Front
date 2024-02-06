import {NextRequest, NextResponse} from "next/server";
import authApi from "@/utils/authApi";

const baseURL = process.env.NEXT_PUBLIC_BACKEND;

/**
 * 프로젝트 알림 생성
 * @param req
 * @constructor
 */
export async function POST(req: NextRequest) {
    const noticeCreateForm = await req.json();
    const res = await authApi(
        `${baseURL}/api/alert`,
        {
            method: 'POST',
            body: JSON.stringify(noticeCreateForm)
        }
    );

    const data = await res.json();

    return NextResponse.json(data);
}