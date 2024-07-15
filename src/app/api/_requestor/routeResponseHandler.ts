import 'server-only';
import {NextRequest, NextResponse} from "next/server";
import {CustomResponse} from "@/app/api/_requestor/type";


export async function routeResponseHandler(req: NextRequest, res: CustomResponse) {
    if(res.ok){
        const data = await res.json();
        return NextResponse.json(data);
    }else{
        return res;
    }
}