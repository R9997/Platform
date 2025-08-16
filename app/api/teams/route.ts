import { type NextRequest, NextResponse } from "next/server"
import type { ApiResponse, PaginatedResponse, Team } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    // TODO: Replace with actual database query
    const mockTeams: Team[] = [
      {
        id: "1",
        name: "Команда разработки",
        description: "Основная команда разработчиков",
        ownerId: "1",
        members: [
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
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedTeams = mockTeams.slice(startIndex, endIndex)

    return NextResponse.json<PaginatedResponse<Team>>({
      success: true,
      data: paginatedTeams,
      pagination: {
        page,
        limit,
        total: mockTeams.length,
        totalPages: Math.ceil(mockTeams.length / limit),
      },
    })
  } catch (error) {
    console.error("Get teams error:", error)
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
    const teamData = await request.json()
    const userId = request.headers.get("x-user-id")

    if (!userId) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "User not authenticated",
        },
        { status: 401 },
      )
    }

    if (!teamData.name) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Team name is required",
        },
        { status: 400 },
      )
    }

    const newTeam: Team = {
      id: Date.now().toString(),
      name: teamData.name,
      description: teamData.description || "",
      ownerId: userId,
      members: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return NextResponse.json<ApiResponse<Team>>(
      {
        success: true,
        data: newTeam,
        message: "Team created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create team error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
