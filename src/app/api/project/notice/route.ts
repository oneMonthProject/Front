import {NextRequest, NextResponse} from "next/server";
import authApi from "@/app/api/_requestor/authApi";
import {routeResponseHandler} from "@/app/api/_requestor/routeResponseHandler";



/**
 * 알림 상태 미확인 -> 확인으로 변경
 * @param req
 * @constructor
 */
export async function PATCH(req:NextRequest){
    const {alertId} = await req.json();

    const res = await authApi(`/api/alert/${alertId}/status`, {method:'PATCH'});

    return routeResponseHandler(req, res);
}