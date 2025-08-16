import { type NextRequest, NextResponse } from "next/server"
import type { ApiResponse, PaginatedResponse, User } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""

    // TODO: Replace with actual database query
    const mockUsers: User[] = [
      {
        id: "1",
        email: "admin@reframeburo.ru",
        name: "Администратор",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
        permissions: ["all"],
      },
      {
        id: "2",
        email: "manager@reframeburo.ru",
        name: "Менеджер проектов",
        role: "manager",
        createdAt: new Date(),
        updatedAt: new Date(),
        permissions: ["projects", "tasks", "team"],
      },
    ]

    const filteredUsers = mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()),
    )

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    return NextResponse.json<PaginatedResponse<User>>({
      success: true,
      data: paginatedUsers,
      pagination: {
        page,
        limit,
        total: filteredUsers.length,
        totalPages: Math.ceil(filteredUsers.length / limit),
      },
    })
  } catch (error) {
    console.error("Get users error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const userData = await request.json()

    // TODO: Validate input data
    // TODO: Hash password
    // TODO: Save to database

    const newUser: User = {
      id: Date.now().toString(),
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date(),
      permissions: userData.permissions || [],
    }

    return NextResponse.json<ApiResponse<User>>(
      {
        success: true,
        data: newUser,
        message: "User created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create user error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
