import { NextResponse } from "next/server"
import { removeAuthCookie } from "@/lib/auth/jwt"
import type { ApiResponse } from "@/lib/types"

export async function POST() {
  try {
    await removeAuthCookie()

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Logout successful",
    })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
