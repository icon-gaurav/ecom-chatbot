// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname, search } = req.nextUrl;

    // ✅ Allow root path (avoid infinite loop)
    if (pathname === "/") return;

    // ✅ Allow API routes
    if (pathname.startsWith("/api")) return;

    // ✅ Allow NextAuth (if you’re using auth)
    if (pathname.startsWith("/auth")) return;

    // ✅ Allow Next.js internals and static assets
    if (
        pathname.startsWith("/_next") ||
        pathname.startsWith("/favicon.ico") ||
        pathname.startsWith("/static") ||
        pathname.match(/\.(.*)$/) // allow .png, .jpg, .css, .js
    ) {
        return;
    }

    // ✅ Redirect everything else → /
    const url = req.nextUrl.clone();
    url.pathname = "/";
    url.search = search; // preserve query params
    return NextResponse.redirect(url);
}

export const config = {
    matcher: "/:path*",
};
