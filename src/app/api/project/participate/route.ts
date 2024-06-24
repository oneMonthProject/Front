import {NextRequest, NextResponse} from "next/server";
import authApi from "@/app/api/_requestor/authApi";
import {authApiResponse} from "@/app/api/authApiResponse";

export async function POST(
    req: NextRequest) {
    const method = req.method;

    const {searchParams} = new URL(req.url);
    const projectId = searchParams.get("projectId");
    const requestData = await req.json();

    const res = await authApi(`/api/project/${projectId}/participate`, {
        method,
        body: JSON.stringify(requestData)
    });

    return authApiResponse(req, res);
}