import {NextRequest, NextResponse} from "next/server";
import authApi from "@/utils/authApi";

const baseURL = process.env.NEXT_PUBLIC_BACKEND;

/**
 * 프로젝트 알림 목록 조회
 * @param req
 * @constructor
 */
export async function GET(req:NextRequest){
    const {searchParams} = new URL(req.url);
    const projectId = searchParams.get('projectId');

    const res = await authApi(`${baseURL}/api/project/${projectId}`, {method:'GET'});
    const data = await res.json();

    return NextResponse.json(data);
}