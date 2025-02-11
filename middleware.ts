import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Periksa apakah pengguna memiliki peran admin atau superadmin
    if (pathname.startsWith("/admin") && !["admin", "superadmin"].includes(token?.role as string)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }

    // Periksa apakah pengguna telah mengganti password default
    if (pathname.startsWith("/admin") && token?.isPasswordChanged === false) {
      return NextResponse.redirect(new URL("/change-password", req.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
)

export const config = {
  matcher: ["/admin/:path*"],
}

