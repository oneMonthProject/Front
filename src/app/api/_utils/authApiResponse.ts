import {NextRequest, NextResponse} from "next/server";

export async function authApiResponse(req: NextRequest, res: Response) {
    if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
    } else {
        if(res.status === 401){
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/login`);
        }else{
            return res;
        }
    }
}