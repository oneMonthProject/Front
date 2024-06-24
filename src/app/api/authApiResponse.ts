import {NextRequest, NextResponse} from "next/server";
import {redirect} from "next/navigation";

export async function authApiResponse(req: NextRequest, res: Response) {
    if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
    } else {
        return res;
    }
}