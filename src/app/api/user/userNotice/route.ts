import {NextRequest, NextResponse} from "next/server";
import authApi from "@/app/api/_requestor/authApi";
import {apiResponse} from "@/app/api/_requestor/apiResponse";

export async function GET(req:NextRequest){
    const {searchParams} = new URL(req.url);
    const pageIndex = searchParams.get('pageIndex');
    const itemCount = searchParams.get('itemCount');

    const res = await authApi(`/api/alert/supported-projects?pageIndex=${pageIndex}&itemCount=${itemCount}`, {method: 'GET'});

    return apiResponse(req, res)
}