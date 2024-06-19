import {NextRequest, NextResponse} from "next/server";
import authApi from "@/utils/authApi";
import {authApiResponse} from "@/app/api/_utils/authApiResponse";

export async function GET(req:NextRequest){
    const {searchParams} = new URL(req.url);
    const pageIndex = searchParams.get('pageIndex');
    const itemCount = searchParams.get('itemCount');

    const res = await authApi(`/api/alert/supported-projects?pageIndex=${pageIndex}&itemCount=${itemCount}`, {method: 'GET'});

    return authApiResponse(req, res)
}