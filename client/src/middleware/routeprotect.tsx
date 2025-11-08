import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;

  // ✅ Check if it's an admin route
  const isAdminRoute = pathname.startsWith("/admin");

  // ✅ If trying to access /admin without login
  if (isAdminRoute && !token) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // ✅ If token exists, verify admin role
  if (isAdminRoute && token) {
    try {
      const decoded: any = jwtDecode(token);

      // If not an admin
      if (decoded.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (err) {
      console.error("Invalid token in middleware", err);
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
  }

  // ✅ Allow other routes to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // apply middleware only for admin routes
};
