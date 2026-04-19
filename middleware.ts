import withAuth from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ req, token }) {
        const { pathname } = req.nextUrl;

        // PUBLIC ROUTES
        if (
          pathname.startsWith("/api/auth") ||
          pathname.startsWith("/api/public") ||  
          pathname.startsWith("/s") ||      
          pathname === "/login" ||
          pathname === "/register" ||
          pathname === "/upload-test" ||
          pathname === "/" ||
          pathname.startsWith("/api/videos")
        ) {
          return true;
        }

        // PROTECTED ROUTES
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
