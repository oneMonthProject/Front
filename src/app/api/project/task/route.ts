import {NextRequest, NextResponse} from "next/server";
import authApi from "@/utils/authApi";

const baseURL = process.env.NEXT_PUBLIC_BACKEND;

export async function GET(req: NextRequest) {
    const {projectId, milestoneId} = await req.json();
    const res = await authApi(`${baseURL}/api/work/project/${projectId}/milestone/${milestoneId}`, {method: 'GET'})
    const data = res.json();
    return NextResponse.json(data);
}