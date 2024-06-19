import {NextRequest, NextResponse} from "next/server";
import authApi from "@/utils/authApi";
import {JSONReplaceBigInt} from "@/utils/common";
import {authApiResponse} from "@/app/api/_utils/authApiResponse";

const baseURL = process.env.NEXT_PUBLIC_BACKEND;

/**
 * 프로젝트 정보 수정
 * @param req
 * @constructor
 */
export async function PUT(req: NextRequest) {
    const {projectInfo} = await req.json();

    const res = await authApi(`${baseURL}/api/project`, {
        method: 'PUT',
        body: JSONReplaceBigInt(projectInfo)
    })

    return authApiResponse(req, res);
}

/**
 * 프로젝트 종료
 * @param req
 * @constructor
 */
export async function POST(req:NextRequest){
    const {projectId} = await req.json();

    const res = await authApi(`${baseURL}/api/project/${projectId}/end`,{method:'POST'});

    return authApiResponse(req, res);
}