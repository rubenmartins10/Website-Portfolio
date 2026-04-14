// middleware.ts na raiz do projeto
import { auth } from "@/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnAdmin = req.nextUrl.pathname.startsWith("/admin")

  if (isOnAdmin && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl))
  }
})

export const config = {
  // Define que rotas o middleware deve observar
  matcher: ["/admin/:path*", "/login"],
}