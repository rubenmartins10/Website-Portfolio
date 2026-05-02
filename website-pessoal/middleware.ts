import { auth } from "@/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const { pathname } = req.nextUrl
  const isProtected = pathname.startsWith("/admin") || pathname.startsWith("/keystatic")

  if (isProtected && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl))
  }
})

export const config = {
  matcher: ["/admin/:path*", "/keystatic/:path*", "/login"],
}