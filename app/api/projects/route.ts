import { type NextRequest, NextResponse } from "next/server"
import type { ApiResponse, PaginatedResponse, Project } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")

    // TODO: Replace with actual database query
    const mockProjects: Project[] = [
      {
        id: "1",
        name: "Разработка ИИ-платформы",
        description: "Создание платформы для автоматизации бизнес-процессов",
        status: "active",
        priority: "high",
        startDate: new Date("2024-01-01"),
        endDate: new Date("2024-06-01"),
        budget: 500000,
        teamId: "1",
        ownerId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    let filteredProjects = mockProjects
    if (status) {
      filteredProjects = mockProjects.filter((project) => project.status === status)
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex)

    return NextResponse.json<PaginatedResponse<Project>>({
      success: true,
      data: paginatedProjects,
      pagination: {
        page,
        limit,
        total: filteredProjects.length,
        totalPages: Math.ceil(filteredProjects.length / limit),
      },
    })
  } catch (error) {
    console.error("Get projects error:", error)
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
    const projectData = await request.json()
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

    const newProject: Project = {
      id: Date.now().toString(),
      ...projectData,
      ownerId: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return NextResponse.json<ApiResponse<Project>>(
      {
        success: true,
        data: newProject,
        message: "Project created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create project error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
