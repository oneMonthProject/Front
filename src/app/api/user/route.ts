import authApi from "@/app/api/_requestor/authApi";
import {NextRequest} from "next/server";
import {apiResponse} from "@/app/api/_requestor/apiResponse";

export async function GET(req: NextRequest) {
    const res = await authApi("/api/user/me", {
        method: "GET",
    });

    return apiResponse(req, res);
}

export async function PUT(req: NextRequest) {
    const formData = await req.formData();

    const res = await authApi(`/api/user`, {
        method: "PUT",
        body: formData
    });

    return apiResponse(req, res);
}
