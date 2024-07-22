import {NextRequest, NextResponse} from "next/server";
import index from "@/app/api/_interceptor/publicApi";
import {routeResponse} from "@/app/api/_interceptor/routeResponse";

export async function GET(
    req: NextRequest,
    {params}: { params: { slug: string } }
) {
    let res: Response;
    if (params.slug === "position") {
        res = await index("/api/position-list/public");
    } else if (params.slug === "tech-stack") {
        res = await index("/api/technology-stack-list/public");
    } else if (params.slug === "tech-stack-category") {
        res = await index("/api/technology-stack-category-list/public");
    } else if (params.slug === "tech-stack-with-category") {
        res = await index("/api/technology-stack-category-mapping-list/public");
    } else {
        throw Error("Unknown Api Route");
    }

   return routeResponse(req, res);

}
