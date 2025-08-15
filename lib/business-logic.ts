export interface User {
  id: string
  name: string
  email: string
  role: string
  avatar?: string
  status: "active" | "inactive" | "pending"
  permissions: string[]
  joinedAt: Date
  lastActive: Date
  productivity: number
}

export interface Project {
  id: string
  name: string
  description: string
  status: "planning" | "active" | "completed" | "on-hold"
  progress: number
  assignees: string[]
  deadline: Date
  createdAt: Date
  budget: number
  spent: number
  priority: "low" | "medium" | "high" | "urgent"
  tags: string[]
}

export interface Task {
  id: string
  title: string
  description: string
  status: "todo" | "in-progress" | "review" | "done"
  priority: "low" | "medium" | "high" | "urgent"
  assignee: string
  projectId: string
  dueDate: Date
  createdAt: Date
  tags: string[]
  attachments: string[]
  comments: Comment[]
  estimatedHours: number
  actualHours: number
}

export interface Comment {
  id: string
  author: string
  content: string
  createdAt: Date
  attachments?: string[]
}

export interface FileItem {
  id: string
  name: string
  type: "file" | "folder"
  size: number
  createdAt: Date
  modifiedAt: Date
  owner: string
  permissions: "private" | "team" | "public"
  path: string
  parentId?: string
  tags: string[]
  projectId?: string
}

export interface BusinessMetrics {
  revenue: number
  revenueGrowth: number
  activeProjects: number
  completedTasks: number
  teamProductivity: number
  customerSatisfaction: number
  aiToolsUsage: number
  costSavings: number
  timesSaved: number
  roi: number
}

// Бизнес-логика для управления данными
export class BusinessLogic {
  private static instance: BusinessLogic
  private users: User[] = []
  private projects: Project[] = []
  private tasks: Task[] = []
  private files: FileItem[] = []
  private metrics: BusinessMetrics = {
    revenue: 0,
    revenueGrowth: 0,
    activeProjects: 0,
    completedTasks: 0,
    teamProductivity: 0,
    customerSatisfaction: 0,
    aiToolsUsage: 0,
    costSavings: 0,
    timesSaved: 0,
    roi: 0,
  }

  static getInstance(): BusinessLogic {
    if (!BusinessLogic.instance) {
      BusinessLogic.instance = new BusinessLogic()
    }
    return BusinessLogic.instance
  }

  // Управление пользователями
  addUser(user: Omit<User, "id" | "joinedAt" | "lastActive">): User {
    const newUser: User = {
      ...user,
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      joinedAt: new Date(),
      lastActive: new Date(),
    }
    this.users.push(newUser)
    this.updateMetrics()
    return newUser
  }

  updateUser(id: string, updates: Partial<User>): User | null {
    const userIndex = this.users.findIndex((u) => u.id === id)
    if (userIndex === -1) return null

    this.users[userIndex] = { ...this.users[userIndex], ...updates }
    this.updateMetrics()
    return this.users[userIndex]
  }

  getUsers(): User[] {
    return this.users
  }

  // Управление проектами
  addProject(project: Omit<Project, "id" | "createdAt">): Project {
    const newProject: Project = {
      ...project,
      id: `project_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    }
    this.projects.push(newProject)
    this.updateMetrics()
    return newProject
  }

  updateProject(id: string, updates: Partial<Project>): Project | null {
    const projectIndex = this.projects.findIndex((p) => p.id === id)
    if (projectIndex === -1) return null

    this.projects[projectIndex] = { ...this.projects[projectIndex], ...updates }
    this.updateMetrics()
    return this.projects[projectIndex]
  }

  getProjects(): Project[] {
    return this.projects
  }

  // Управление задачами
  addTask(task: Omit<Task, "id" | "createdAt" | "comments">): Task {
    const newTask: Task = {
      ...task,
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      comments: [],
    }
    this.tasks.push(newTask)
    this.updateMetrics()
    return newTask
  }

  updateTask(id: string, updates: Partial<Task>): Task | null {
    const taskIndex = this.tasks.findIndex((t) => t.id === id)
    if (taskIndex === -1) return null

    this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updates }
    this.updateMetrics()
    return this.tasks[taskIndex]
  }

  getTasks(): Task[] {
    return this.tasks
  }

  getTasksByProject(projectId: string): Task[] {
    return this.tasks.filter((task) => task.projectId === projectId)
  }

  // Управление файлами
  addFile(file: Omit<FileItem, "id" | "createdAt" | "modifiedAt">): FileItem {
    const newFile: FileItem = {
      ...file,
      id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      modifiedAt: new Date(),
    }
    this.files.push(newFile)
    return newFile
  }

  getFiles(): FileItem[] {
    return this.files
  }

  getFilesByProject(projectId: string): FileItem[] {
    return this.files.filter((file) => file.projectId === projectId)
  }

  // Обновление метрик
  private updateMetrics(): void {
    const activeProjects = this.projects.filter((p) => p.status === "active").length
    const completedTasks = this.tasks.filter((t) => t.status === "done").length
    const totalTasks = this.tasks.length
    const avgProductivity = this.users.reduce((sum, user) => sum + user.productivity, 0) / this.users.length || 0

    // Расчет ROI на основе завершенных проектов
    const completedProjects = this.projects.filter((p) => p.status === "completed")
    const totalBudget = completedProjects.reduce((sum, p) => sum + p.budget, 0)
    const totalSpent = completedProjects.reduce((sum, p) => sum + p.spent, 0)
    const roi = totalBudget > 0 ? ((totalBudget - totalSpent) / totalSpent) * 100 : 0

    this.metrics = {
      revenue: totalBudget,
      revenueGrowth: Math.random() * 20 + 5, // Симуляция роста
      activeProjects,
      completedTasks,
      teamProductivity: avgProductivity,
      customerSatisfaction: 85 + Math.random() * 10, // Симуляция удовлетворенности
      aiToolsUsage: Math.min(100, (completedTasks / totalTasks) * 100 || 0),
      costSavings: totalBudget - totalSpent,
      timesSaved: completedTasks * 2.5, // Среднее время экономии на задачу
      roi,
    }
  }

  getMetrics(): BusinessMetrics {
    return this.metrics
  }

  // Инициализация демо-данных
  initializeDemoData(): void {
    // Добавление демо-пользователей
    this.addUser({
      name: "Анна Петрова",
      email: "anna@reframeburo.ru",
      role: "Администратор",
      status: "active",
      permissions: ["all"],
      productivity: 95,
    })

    this.addUser({
      name: "Михаил Сидоров",
      email: "mikhail@reframeburo.ru",
      role: "Менеджер проектов",
      status: "active",
      permissions: ["projects", "tasks", "team"],
      productivity: 88,
    })

    // Добавление демо-проектов
    const project1 = this.addProject({
      name: "Автоматизация продаж",
      description: "Внедрение ИИ-системы для автоматизации процесса продаж",
      status: "active",
      progress: 65,
      assignees: [this.users[0].id, this.users[1].id],
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      budget: 500000,
      spent: 325000,
      priority: "high",
      tags: ["ИИ", "Продажи", "Автоматизация"],
    })

    // Добавление демо-задач
    this.addTask({
      title: "Настройка CRM интеграции",
      description: "Интеграция с существующей CRM системой",
      status: "in-progress",
      priority: "high",
      assignee: this.users[0].id,
      projectId: project1.id,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      tags: ["CRM", "Интеграция"],
      attachments: [],
      estimatedHours: 16,
      actualHours: 10,
    })
  }
}

// Экспорт singleton instance
export const businessLogic = BusinessLogic.getInstance()
