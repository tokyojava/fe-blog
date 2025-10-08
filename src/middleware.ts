import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib/token";
import { serverError } from "./lib/server_utils";

function needAuth(path: string) {
    return path === "/blogs/create" || path === "/blogs/update";
}

function redirectToLogin(req: NextRequest) {
    const newUrl = new URL("/login", req.url);
    newUrl.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(newUrl);
}

export default async function middleware(req: NextRequest) {
    // Middleware logic can be added here if needed
    const path = req.nextUrl.pathname;
    console.log("Middleware path:", path);
    if (needAuth(path)) {
        const token = req.cookies.get("token")?.value;
        console.log("Token:", token);
        if (!token) {
            return redirectToLogin(req);
        } else {
            try {
                await verifyToken(token);
            } catch (err) {
                serverError(err);
                return redirectToLogin(req);
            }
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/blogs/create", "/blogs/update"],
};