import 'server-only';
import {NextRequest, NextResponse} from "next/server";
import {ResponseBody} from "@/utils/type";
import {CustomResponse, ErrorHandle} from "@/app/api/_requestor/type";


export async function apiResponse(req: NextRequest, res: CustomResponse) {
    if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
    } else {
        const data = await res.json();

        const resBody: ResponseBody<null> = {
            data: null,
            result: 'error',
            message: data.message,
            errorHandle: res.headers.get('X-Error-Handle') as ErrorHandle
        }

        return new Response(JSON.stringify(resBody), {
            status: res.status,
            headers: res.headers,
            statusText: res.statusText
        });
    }
}