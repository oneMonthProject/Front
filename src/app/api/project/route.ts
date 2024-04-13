import {NextRequest, NextResponse} from "next/server";
import authApi from "@/utils/authApi";
import {JSONReplaceBigInt} from "@/utils/common";

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

    const data = await res.json();
    return NextResponse.json(data);
}

/**
 * 프로젝트 종료
 * @param req
 * @constructor
 */
export async function POST(req:NextRequest){
    const {projectId} = await req.json();

    const res = await authApi(`${baseURL}/api/project/${projectId}/end`,{method:'POST'});

    const data = await res.json();
    return NextResponse.json(data);
}