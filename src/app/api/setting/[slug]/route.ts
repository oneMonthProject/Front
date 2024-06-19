import {NextRequest, NextResponse} from "next/server";
import publicApi from "@/utils/publicApi";
import {authApiResponse} from "@/app/api/_utils/authApiResponse";

export async function GET(
    req: NextRequest,
    {params}: { params: { slug: string } }
) {
    let res: Response;
    if (params.slug === "position") {
        res = await publicApi("/api/position-list/public");
    } else if (params.slug === "tech-stack") {
        res = await publicApi("/api/technology-stack-list/public");
    } else if (params.slug === "tech-stack-category") {
        res = await publicApi("/api/technology-stack-category-list/public");
    } else if (params.slug === "tech-stack-with-category") {
        res = await publicApi("/api/technology-stack-category-mapping-list/public");
    } else {
        throw Error("Unknown Api Route");
    }

    const data = await res.json();
    return NextResponse.json(data);

}
