export class ApiClient {
  private baseUrl: string

  constructor(baseUrl = "/api") {
    this.baseUrl = baseUrl
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: "Network error" }))
      throw new Error(error.message || `HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  // Auth methods
  async login(email: string, password: string) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  }

  async logout() {
    return this.request("/auth/logout", {
      method: "POST",
    })
  }

  // Users methods
  async getUsers(params?: { page?: number; limit?: number; search?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set("page", params.page.toString())
    if (params?.limit) searchParams.set("limit", params.limit.toString())
    if (params?.search) searchParams.set("search", params.search)

    return this.request(`/users?${searchParams}`)
  }

  async createUser(userData: any) {
    return this.request("/users", {
      method: "POST",
      body: JSON.stringify(userData),
    })
  }

  // Projects methods
  async getProjects(params?: { page?: number; limit?: number; status?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set("page", params.page.toString())
    if (params?.limit) searchParams.set("limit", params.limit.toString())
    if (params?.status) searchParams.set("status", params.status)

    return this.request(`/projects?${searchParams}`)
  }

  async createProject(projectData: any) {
    return this.request("/projects", {
      method: "POST",
      body: JSON.stringify(projectData),
    })
  }

  // Tasks methods
  async getTasks(params?: { page?: number; limit?: number; projectId?: string; status?: string; assigneeId?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set("page", params.page.toString())
    if (params?.limit) searchParams.set("limit", params.limit.toString())
    if (params?.projectId) searchParams.set("projectId", params.projectId)
    if (params?.status) searchParams.set("status", params.status)
    if (params?.assigneeId) searchParams.set("assigneeId", params.assigneeId)

    return this.request(`/tasks?${searchParams}`)
  }

  async createTask(taskData: any) {
    return this.request("/tasks", {
      method: "POST",
      body: JSON.stringify(taskData),
    })
  }

  // Teams methods
  async getTeams(params?: { page?: number; limit?: number }) {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set("page", params.page.toString())
    if (params?.limit) searchParams.set("limit", params.limit.toString())

    return this.request(`/teams?${searchParams}`)
  }

  async createTeam(teamData: any) {
    return this.request("/teams", {
      method: "POST",
      body: JSON.stringify(teamData),
    })
  }

  // Leads methods
  async getLeads(params?: { page?: number; limit?: number; status?: string; assigneeId?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set("page", params.page.toString())
    if (params?.limit) searchParams.set("limit", params.limit.toString())
    if (params?.status) searchParams.set("status", params.status)
    if (params?.assigneeId) searchParams.set("assigneeId", params.assigneeId)

    return this.request(`/leads?${searchParams}`)
  }

  async createLead(leadData: any) {
    return this.request("/leads", {
      method: "POST",
      body: JSON.stringify(leadData),
    })
  }

  // Files methods
  async getFiles(params?: { page?: number; limit?: number; projectId?: string; taskId?: string }) {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set("page", params.page.toString())
    if (params?.limit) searchParams.set("limit", params.limit.toString())
    if (params?.projectId) searchParams.set("projectId", params.projectId)
    if (params?.taskId) searchParams.set("taskId", params.taskId)

    return this.request(`/files?${searchParams}`)
  }

  async uploadFile(file: File, projectId?: string, taskId?: string) {
    const formData = new FormData()
    formData.append("file", file)
    if (projectId) formData.append("projectId", projectId)
    if (taskId) formData.append("taskId", taskId)

    return fetch(`${this.baseUrl}/files`, {
      method: "POST",
      body: formData,
    }).then((res) => res.json())
  }

  // Chat method
  async sendMessage(message: string, provider = "openai") {
    return this.request("/chat", {
      method: "POST",
      body: JSON.stringify({ message, provider }),
    })
  }
}

export const apiClient = new ApiClient()
