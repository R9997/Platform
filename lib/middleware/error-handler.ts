import { NextResponse } from "next/server"
import type { ApiResponse } from "@/lib/types"

export class AppError extends Error {
  public statusCode: number
  public isOperational: boolean

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational

    Error.captureStackTrace(this, this.constructor)
  }
}

export function handleError(error: unknown): NextResponse<ApiResponse> {
  console.error("API Error:", error)

  if (error instanceof AppError) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: error.message,
      },
      { status: error.statusCode },
    )
  }

  if (error instanceof Error) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: process.env.NODE_ENV === "production" ? "Internal server error" : error.message,
      },
      { status: 500 },
    )
  }

  return NextResponse.json<ApiResponse>(
    {
      success: false,
      error: "Unknown error occurred",
    },
    { status: 500 },
  )
}

export function createValidationError(message: string): AppError {
  return new AppError(message, 400)
}

export function createNotFoundError(resource: string): AppError {
  return new AppError(`${resource} not found`, 404)
}

export function createUnauthorizedError(): AppError {
  return new AppError("Unauthorized access", 401)
}

export function createForbiddenError(): AppError {
  return new AppError("Forbidden access", 403)
}
