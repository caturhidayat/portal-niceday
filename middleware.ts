import { NextRequest, NextResponse } from "next/server";
import { authenticated } from "./lib/auth/sessions";

const protectedRoutes = "/dashboard";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionCookie = request.cookies.get("Authentication");
    const isProtectedRoute = pathname.startsWith(protectedRoutes);

    if (!sessionCookie && isProtectedRoute) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (sessionCookie && pathname === "/sign-in") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
