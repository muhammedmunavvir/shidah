import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // read JWT from cookies
  const { pathname } = req.nextUrl;

  // ✅ Check if route starts with /admin
  const isAdminRoute = pathname.startsWith("/admin");

  // ✅ If visiting admin route without token → redirect to login
  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // ✅ If token exists, verify and decode role
  if (isAdminRoute && token) {
    try {
      const decoded: any = jwtDecode(token);

      if (decoded?.role !== "admin") {
        // ❌ Not an admin → redirect to home
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (error) {
      console.error("❌ Invalid token in middleware:", error);
      // invalid or expired token
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // ✅ All good → continue request
  return NextResponse.next();
}

// ✅ Apply only to admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
