import authApi from "@/utils/authApi";
import {NextRequest, NextResponse} from "next/server";

export async function DELETE(request:NextRequest){
    const {milestoneId} = await request.json();

    const res = await authApi(`/api/milestone/${milestoneId}`, {method:'DELETE'});

    const data = res.json();

    return NextResponse.json(data);
}