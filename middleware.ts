import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Protected routes that require authentication
const protectedRoutes = ["/api/users", "/api/projects", "/api/tasks", "/api/files", "/api/teams"]

// Public API routes that don't require authentication
const publicApiRoutes = ["/api/auth", "/api/chat"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isPublicApiRoute = publicApiRoutes.some((route) => pathname.startsWith(route))

  // Allow access to dashboard without authorization (demo mode)
  if (pathname === "/dashboard") {
    return NextResponse.next()
  }

  if (isProtectedRoute && !isPublicApiRoute) {
    const token =
      request.cookies.get("auth-token")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
      return NextResponse.redirect(new URL("/login", request.url))
    }

    try {
      // Простая демо-версия без jose
      const payload = JSON.parse(atob(token))

      // Add user info to headers for API routes
      const requestHeaders = new Headers(request.headers)
      requestHeaders.set("x-user-id", payload.userId as string)
      requestHeaders.set("x-user-role", payload.role as string)

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    } catch (error) {
      if (pathname.startsWith("/api/")) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 })
      }
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
}
