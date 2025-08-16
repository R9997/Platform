import { type NextRequest, NextResponse } from "next/server"
import type { ApiResponse, PaginatedResponse, Lead } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")
    const assigneeId = searchParams.get("assigneeId")

    // TODO: Replace with actual database query
    const mockLeads: Lead[] = [
      {
        id: "1",
        name: "ООО Технологии",
        email: "contact@tech.ru",
        phone: "+7 (495) 123-45-67",
        company: "ООО Технологии",
        status: "qualified",
        source: "Сайт",
        value: 150000,
        notes: "Заинтересованы в автоматизации процессов",
        assigneeId: "2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        name: "ИП Иванов",
        email: "ivanov@example.ru",
        phone: "+7 (495) 987-65-43",
        company: "ИП Иванов",
        status: "new",
        source: "Реклама",
        value: 75000,
        notes: "Первичный контакт",
        assigneeId: "1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    let filteredLeads = mockLeads
    if (status) {
      filteredLeads = filteredLeads.filter((lead) => lead.status === status)
    }
    if (assigneeId) {
      filteredLeads = filteredLeads.filter((lead) => lead.assigneeId === assigneeId)
    }

    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedLeads = filteredLeads.slice(startIndex, endIndex)

    return NextResponse.json<PaginatedResponse<Lead>>({
      success: true,
      data: paginatedLeads,
      pagination: {
        page,
        limit,
        total: filteredLeads.length,
        totalPages: Math.ceil(filteredLeads.length / limit),
      },
    })
  } catch (error) {
    console.error("Get leads error:", error)
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
    const leadData = await request.json()
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

    if (!leadData.name || !leadData.email) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: "Name and email are required",
        },
        { status: 400 },
      )
    }

    const newLead: Lead = {
      id: Date.now().toString(),
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone,
      company: leadData.company,
      status: leadData.status || "new",
      source: leadData.source || "Неизвестно",
      value: leadData.value,
      notes: leadData.notes,
      assigneeId: leadData.assigneeId || userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    return NextResponse.json<ApiResponse<Lead>>(
      {
        success: true,
        data: newLead,
        message: "Lead created successfully",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Create lead error:", error)
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: "Internal server error",
      },
      { status: 500 },
    )
  }
}
