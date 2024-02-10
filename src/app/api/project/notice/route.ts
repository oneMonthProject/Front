import {NextRequest, NextResponse} from "next/server";
import authApi from "@/utils/authApi";

const baseURL = process.env.NEXT_PUBLIC_BACKEND;



/**
 * 알림 상태 미확인 -> 확인으로 변경
 * @param req
 * @constructor
 */
export async function PATCH(req:NextRequest){
    const {alertId} = await req.json();

    const res = await authApi(`/api/alert/${alertId}/status`, {method:'PATCH'});

    const data = await res.json();
    return NextResponse.json(data);
}