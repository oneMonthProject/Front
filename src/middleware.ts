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

    try{
        // Logging
        const time = Date.now();
        const timeStr = new Date(time).toISOString();

        console.log("requestMoted: ", request.method);

        if(request.method === 'OPTIONS'){
            console.log("methods;:: ", request.headers.get("Access-Control-Request-Method"));
            console.log("headers;:: ", request.headers.get("Access-Control-Request-Headers"));
            console.log("origin;:: ", request.headers.get("Origin"));
        }

        const reqLogData = `[REQUEST] ${timeStr}  ${request.method}: ${request.url}`;
        console.log(reqLogData);

        // Response
        const response = NextResponse.next();

        // CORS setting
        const origin = request.headers.get('origin') ?? '';
        if (corsOptions.allowedOrigins.includes('*') || corsOptions.allowedOrigins.includes(origin)) {
            response.headers.set('Access-Control-Allow-Origin', origin);
        }

        response.headers.set("Access-Control-Allow-Credentials", corsOptions.credentials.toString());
        response.headers.set("Access-Control-Allow-Methods", corsOptions.allowedMethods.join(","));
        response.headers.set("Access-Control-Allow-Headers", "*");
        response.headers.set("Access-Control-Expose-Headers", corsOptions.exposedHeaders.join(","));
        response.headers.set("Access-Control-Max-Age", corsOptions.maxAge?.toString() ?? "");

        // Return
        return response;
    }catch(e){
        const time = Date.now();
        const timeStr = new Date(time).toISOString();
        const errLogData = `[REQUEST-ERROR] ${timeStr} ${request.method}: ${request.url}, error: ${(e as Error).message}`;
        console.log(errLogData);
        throw e;
    }


}

export const config = {
    matcher: "/api/:path*",
};