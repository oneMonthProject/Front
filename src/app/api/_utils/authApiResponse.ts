import {NextRequest, NextResponse} from "next/server";

export async function authApiResponse(req: NextRequest, res: Response) {
    if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data);
    } else {
        if (res.status === 401) {
            // req.cookies.delete("user_id");
            // req.cookies.delete("Access");
            // req.cookies.delete("Refresh");

            return new NextResponse(null, {status: 401});
        }

        return res;
    }
}