import {NextRequest, NextResponse} from "next/server";
import authApi from "@/utils/authApi";

/**
 * 프로젝트 크루 업무 이력 조회
 * @param req
 * @constructor
 */
export async function GET(req:NextRequest){
    const {searchParams} = new URL(req.url);
    const projectMemberId = searchParams.get('projectMemberId');
    const pageIndex = searchParams.get('pageIndex');
    const itemCount = searchParams.get('itemCount');

    const res = await authApi(`api/projectmember/${projectMemberId}/works?pageIndex=${pageIndex}&itemCount=${itemCount}`);

    const data = await res.json();
    return NextResponse.json(data);
}