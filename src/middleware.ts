import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/learn",
  "/review",
  "/profile",
  "/settings",
];

// Routes only accessible when NOT authenticated
const authRoutes = ["/login", "/register", "/forgot-password", "/reset-password"];

// Admin routes
const adminRoutes = ["/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get access token from Authorization header or cookie
  const authHeader = request.headers.get("authorization");
  const accessToken = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : request.cookies.get("netlearn_access_token")?.value;

  let isAuthenticated = false;
  let userRole = "LEARNER";

  if (accessToken) {
    try {
      const secret = new TextEncoder().encode(
        process.env.JWT_ACCESS_SECRET || "dev-secret"
      );
      const { payload } = await jwtVerify(accessToken, secret);
      isAuthenticated = true;
      userRole = (payload.role as string) || "LEARNER";
    } catch {
      // Token invalid or expired — treat as unauthenticated
      isAuthenticated = false;
    }
  }

  // Redirect authenticated users away from auth pages
  if (isAuthenticated && authRoutes.some((r) => pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users to login for protected routes
  if (
    !isAuthenticated &&
    protectedRoutes.some((r) => pathname.startsWith(r))
  ) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Admin routes: require CONTENT_ADMIN or MODERATOR role
  if (adminRoutes.some((r) => pathname.startsWith(r))) {
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (userRole !== "CONTENT_ADMIN" && userRole !== "MODERATOR") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes (handled by route handlers)
     * - _next (Next.js internals)
     * - static files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|icons|badges|manifest.json).*)",
  ],
};
