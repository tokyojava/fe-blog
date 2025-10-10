import { NextRequest, NextResponse } from "next/server";
import { serverError, serverLog } from "./lib/server_utils";
import { verifyToken } from "./lib/token";

function needAuth(path: string) {
    return path === "/blogs/create" || path === "/blogs/update";
}

function isLoginOrSignup(path: string) {
    return path === "/login" || path === "/signup";
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
        serverLog("Token:", token);
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
    } else if (isLoginOrSignup(path)) {
        const token = req.cookies.get("token")?.value;
        serverLog("Token in login or signUp:", token);
        if (token) {
            try {
                await verifyToken(token);
            } catch (err) {
                serverError(err);
                // do nothing, let them login/signup
                const resp = NextResponse.next();
                resp.cookies.delete("token");
                return resp;
            }
            return NextResponse.redirect(new URL("/blogs", req.url));
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/blogs", "/blogs/create", "/blogs/update", "/signup", "/login"],
};