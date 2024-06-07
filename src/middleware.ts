// Imports
// ========================================================
import {NextResponse, type NextRequest} from "next/server";

// Config
// ========================================================
const corsOptions: {
    allowedMethods: string[];
    allowedOrigins: string[];
    allowedHeaders: string[];
    exposedHeaders: string[];
    maxAge?: number;
    credentials: boolean;
} = {
    allowedMethods: (process.env?.ALLOWED_METHODS || "").split(","),
    allowedOrigins: (process.env?.ALLOWED_ORIGIN || "").split(","),
    allowedHeaders: (process.env?.ALLOWED_HEADERS || "").split(","),
    exposedHeaders: (process.env?.EXPOSED_HEADERS || "").split(","),
    maxAge: process.env?.MAX_AGE && parseInt(process.env?.MAX_AGE) || undefined, // 60 * 60 * 24 * 30, // 30 days
    credentials: process.env?.CREDENTIALS == "true",
};


export async function middleware(request: NextRequest) {
    const origin = request.headers.get('origin') ?? '';
    const isAllowedOrigin = corsOptions.allowedOrigins.includes('*') || corsOptions.allowedOrigins.includes(origin);

    // Handle preflighted requests
    if (request.method === 'OPTIONS') {
        const preflightHeaders = {
            ...(isAllowedOrigin && {'Access-Control-Allow-Origin': origin}),
            "Access-Control-Allow-Credentials": corsOptions.credentials.toString(),
            "Access-Control-Allow-Methods": corsOptions.allowedMethods.join(","),
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Expose-Headers": corsOptions.exposedHeaders.join(","),
            "Access-Control-Max-Age": corsOptions.maxAge?.toString() ?? ""
        }

        return NextResponse.json({}, {headers: preflightHeaders});
    }

    // Handle simple requests
    const response = NextResponse.next();

    if (isAllowedOrigin) {
        response.headers.set('Access-Control-Allow-Origin', origin);
    }

    response.headers.set("Access-Control-Allow-Credentials", corsOptions.credentials.toString());
    response.headers.set("Access-Control-Allow-Methods", corsOptions.allowedMethods.join(","));
    response.headers.set("Access-Control-Allow-Headers", "*");
    response.headers.set("Access-Control-Expose-Headers", corsOptions.exposedHeaders.join(","));
    response.headers.set("Access-Control-Max-Age", corsOptions.maxAge?.toString() ?? "");

    // Return
    return response;
}

export const config = {
    matcher: "/api/:path*",
};