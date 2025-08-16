import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { createToken, setAuthCookie } from "@/lib/auth/jwt"
import type { ApiResponse } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Email and password are required",
        },
        { status: 400 },
      )
    }

    // TODO: Replace with actual database query
    // This is a mock implementation
    const mockUser = {
      id: "1",
      email: "admin@reframeburo.ru",
      name: "Admin User",
      role: "admin" as const,
      passwordHash: await bcrypt.hash("password123", 10),
    }

    if (email !== mockUser.email) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Invalid credentials",
        },
        { status: 401 },
      )
    }

    const isValidPassword = await bcrypt.compare(password, mockUser.passwordHash)
    if (!isValidPassword) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Invalid credentials",
        },
        { status: 401 },
      )
    }

    const token = await createToken({
      userId: mockUser.id,
      email: mockUser.email,
      role: mockUser.role,
    })

    await setAuthCookie(token)

    return NextResponse.json<ApiResponse>({
      success: true,
      data: {
        user: {
          id: mockUser.id,
          email: mockUser.email,
          name: mockUser.name,
          role: mockUser.role,
        },
        token,
      },
      message: "Login successful",
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
