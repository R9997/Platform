import { type NextRequest, NextResponse } from "next/server"
import type { ApiResponse, PaginatedResponse, Task } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const projectId = searchParams.get("projectId")
    const status = searchParams.get("status")
    const assigneeId = searchParams.get("assigneeId")

    // TODO: Replace with actual database query
    const mockTasks: Task[] = [
      {
        id: "1",
        title: "Настройка базы данных",
        description: "Создание схемы БД для проекта",
        status: "in-progress",
        priority: "high",
        assigneeId: "2",
        projectId: "1",
        dueDate: new Date("2024-02-15"),
        tags: ["backend", "database"],
        attachments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        title: "Дизайн интерфейса",
        description: "Создание макетов для основных страниц",
        status: "todo",
        priority: "medium",
        assigneeId: "1",
        projectId: "1",
        dueDate: new Date("2024-02-20"),
        tags: ["frontend", "design"],
        attachments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    let filteredTasks = mockTasks
    if (projectId) {
      filteredTasks = filteredTasks.filter((task) => task.projectId === projectId)
    }
    if (status) {
      filteredTasks = filteredTasks.filter((task) => task.status === status)
    }
    if (assigneeId) {
      filteredTasks = filteredTasks.filter((task) => task.assigneeId === assigneeId)
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex)

    return NextResponse.json<PaginatedResponse<Task>>({
      success: true,
      data: paginatedTasks,
      pagination: {
        page,
        limit,
        total: filteredTasks.length,
        totalPages: Math.ceil(filteredTasks.length / limit),
      },
    })
  } catch (error) {
    console.error("Get tasks error:", error)
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
    const taskData = await request.json()
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

    // Validate required fields
    if (!taskData.title || !taskData.projectId) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Title and project ID are required",
        },
        { status: 400 },
      )
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description || "",
      status: taskData.status || "todo",
      priority: taskData.priority || "medium",
      assigneeId: taskData.assigneeId,
      projectId: taskData.projectId,
      dueDate: taskData.dueDate ? new Date(taskData.dueDate) : undefined,
      tags: taskData.tags || [],
      attachments: taskData.attachments || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return NextResponse.json<ApiResponse<Task>>(
      {
        success: true,
        data: newTask,
        message: "Task created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create task error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
