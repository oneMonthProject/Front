import authApi from "@/app/api/_requestor/authApi";
import {NextRequest} from "next/server";
import {routeResponseHandler} from "@/app/api/_requestor/routeResponseHandler";

export async function GET(req: NextRequest) {
    const res = await authApi("/api/user/me", {
        method: "GET",
    });

    return routeResponseHandler(req, res);
}

export async function PUT(req: NextRequest) {
    const formData = await req.formData();

    const res = await authApi(`/api/user`, {
        method: "PUT",
        body: formData
    });

    return routeResponseHandler(req, res);
}
