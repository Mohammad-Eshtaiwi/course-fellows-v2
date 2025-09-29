import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  try {
    const token = await getToken({ req: request });
    const isHomePage = request.nextUrl.pathname === "/";
    const isApiRoute = request.nextUrl.pathname.startsWith("/api");
    const isPrivacyPage = request.nextUrl.pathname === "/privacy";
    // Allow API routes to handle their own authentication
    if (isApiRoute) {
      return NextResponse.next();
    }

    // If user is authenticated and tries to access home page or auth pages, redirect to courses
    if (token && isHomePage) {
      return NextResponse.redirect(new URL("/courses", request.url));
    }

    // If user is not authenticated and tries to access protected routes, redirect to home
    if (!token && !isHomePage && !isPrivacyPage) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // If there's an error in token verification, redirect to home page
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
