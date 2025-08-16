export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "manager" | "employee"
  avatar?: string
  createdAt: Date
  updatedAt: Date
  teamId?: string
  permissions: string[]
}

export interface Team {
  id: string
  name: string
  description?: string
  ownerId: string
  members: User[]
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  id: string
  name: string
  description?: string
  status: "planning" | "active" | "completed" | "paused"
  priority: "low" | "medium" | "high"
  startDate?: Date
  endDate?: Date
  budget?: number
  teamId: string
  ownerId: string
  createdAt: Date
  updatedAt: Date
}

export interface Task {
  id: string
  title: string
  description?: string
  status: "todo" | "in-progress" | "review" | "done"
  priority: "low" | "medium" | "high"
  assigneeId?: string
  projectId: string
  dueDate?: Date
  tags: string[]
  attachments: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  status: "new" | "contacted" | "qualified" | "proposal" | "negotiation" | "closed-won" | "closed-lost"
  source: string
  value?: number
  notes?: string
  assigneeId?: string
  createdAt: Date
  updatedAt: Date
}

export interface FileUpload {
  id: string
  filename: string
  originalName: string
  mimeType: string
  size: number
  url: string
  uploadedBy: string
  projectId?: string
  taskId?: string
  createdAt: Date
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
