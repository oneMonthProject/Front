import {NextRequest, NextResponse} from "next/server";
import authApi from "@/utils/authApi";

const baseURL = process.env.NEXT_PUBLIC_BACKEND;

export async function GET(req: NextRequest) {
    const {searchParams} = new URL(req.url);
    const projectId = searchParams.get('projectId');
    const milestoneId = searchParams.get('milestoneId');
    const pageIndex = searchParams.get('pageIndex');
    const itemCount = searchParams.get('itemCount');

    const res = await authApi(
        `${baseURL}/api/work/project/${projectId}/milestone/${milestoneId}?pageIndex=${pageIndex}&itemCount=${itemCount}`,
        {method: 'GET'})
    const data = res.json();
    return NextResponse.json(data);
}