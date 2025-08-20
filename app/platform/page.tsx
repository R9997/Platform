"use client"

import type React from "react"
import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Home,
  Bot,
  BarChart3,
  Users,
  FileText,
  Zap,
  TrendingUp,
  Target,
  CheckCircle,
  Plus,
  Filter,
  X,
} from "lucide-react"
import Link from "next/link"

interface Project {
  id: number
  name: string
  status: "active" | "completed" | "pending"
  progress: number
  deadline: string
  team: string[]
  description?: string
  priority?: "low" | "medium" | "high"
}

interface Task {
  id: number
  title: string
  priority: "high" | "medium" | "low"
  status: "todo" | "in-progress" | "completed"
  assignee: string
  dueDate: string
  description?: string
  projectId?: number
}

interface TeamMember {
  id: number
  name: string
  role: string
  status: "active" | "inactive"
  projects: number
  email?: string
}

interface Metric {
  label: string
  value: string
  change: number
  icon: React.ReactNode
}

export default function PlatformPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchQuery, setSearchQuery] = useState("")

  const [showAddProject, setShowAddProject] = useState(false)
  const [showAddTask, setShowAddTask] = useState(false)
  const [showAddMember, setShowAddMember] = useState(false)

  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info"
    message: string
  } | null>(null)

  const [newProject, setNewProject] = useState({
    name: "",
    description: "",
    deadline: "",
    priority: "medium",
    team: [] as string[],
  })

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "medium",
    assignee: "",
    dueDate: "",
    projectId: "",
  })

  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "employee",
  })

  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Автоматизация продаж",
      status: "active",
      progress: 75,
      deadline: "2024-02-15",
      team: ["Анна К.", "Михаил П.", "Елена С."],
      description: "Внедрение ИИ-системы для автоматизации процесса продаж",
      priority: "high",
    },
    {
      id: 2,
      name: "ИИ-чатбот поддержки",
      status: "active",
      progress: 45,
      deadline: "2024-03-01",
      team: ["Дмитрий В.", "Ольга Н."],
      description: "Разработка интеллектуального чатбота для службы поддержки",
      priority: "medium",
    },
    {
      id: 3,
      name: "Анализ клиентских данных",
      status: "completed",
      progress: 100,
      deadline: "2024-01-20",
      team: ["Сергей Л.", "Мария К."],
      description: "Создание системы анализа поведения клиентов",
      priority: "low",
    },
  ])

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Настроить интеграцию с CRM",
      priority: "high",
      status: "in-progress",
      assignee: "Анна К.",
      dueDate: "2024-01-25",
      description: "Интеграция с существующей CRM системой",
      projectId: 1,
    },
    {
      id: 2,
      title: "Протестировать чатбот",
      priority: "medium",
      status: "todo",
      assignee: "Дмитрий В.",
      dueDate: "2024-01-28",
      description: "Провести полное тестирование функциональности чатбота",
      projectId: 2,
    },
    {
      id: 3,
      title: "Подготовить отчет по аналитике",
      priority: "low",
      status: "completed",
      assignee: "Сергей Л.",
      dueDate: "2024-01-20",
      description: "Создать детальный отчет по результатам анализа",
      projectId: 3,
    },
  ])

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: 1, name: "Анна К.", role: "Менеджер проектов", status: "active", projects: 2, email: "anna@company.com" },
    { id: 2, name: "Михаил П.", role: "Разработчик", status: "active", projects: 1, email: "mikhail@company.com" },
    { id: 3, name: "Елена С.", role: "Дизайнер", status: "active", projects: 1, email: "elena@company.com" },
    { id: 4, name: "Дмитрий В.", role: "Разработчик", status: "active", projects: 2, email: "dmitry@company.com" },
    { id: 5, name: "Ольга Н.", role: "Аналитик", status: "active", projects: 1, email: "olga@company.com" },
    { id: 6, name: "Сергей Л.", role: "Аналитик", status: "active", projects: 1, email: "sergey@company.com" },
  ])

  const handleAddProject = () => {
    // Валидация обязательных полей
    if (!newProject.name.trim()) {
      setNotification({
        type: "error",
        message: "Пожалуйста, введите название проекта",
      })
      setTimeout(() => setNotification(null), 3000)
      return
    }

    if (!newProject.deadline) {
      setNotification({
        type: "error",
        message: "Пожалуйста, укажите дедлайн проекта",
      })
      setTimeout(() => setNotification(null), 3000)
      return
    }

    // Проверка, что дедлайн не в прошлом
    const selectedDate = new Date(newProject.deadline)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate < today) {
      setNotification({
        type: "error",
        message: "Дедлайн не может быть в прошлом",
      })
      setTimeout(() => setNotification(null), 3000)
      return
    }

    try {
      const project: Project = {
        id: Math.max(...projects.map((p) => p.id), 0) + 1,
        name: newProject.name.trim(),
        description: newProject.description.trim(),
        status: "active",
        progress: 0,
        deadline: newProject.deadline,
        team: newProject.team,
        priority: newProject.priority as "low" | "medium" | "high",
      }

      setProjects([...projects, project])

      // Успешное уведомление
      setNotification({
        type: "success",
        message: `Проект "${newProject.name}" успешно создан`,
      })
      setTimeout(() => setNotification(null), 3000)

      // Сброс формы
      setNewProject({
        name: "",
        description: "",
        deadline: "",
        priority: "medium",
        team: [],
      })

      setShowAddProject(false)
    } catch (error) {
      setNotification({
        type: "error",
        message: "Произошла ошибка при создании проекта",
      })
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const handleAddTask = () => {
    if (newTask.title && newTask.assignee && newTask.dueDate) {
      const task: Task = {
        id: tasks.length + 1,
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority as "high" | "medium" | "low",
        status: "todo",
        assignee: newTask.assignee,
        dueDate: newTask.dueDate,
        projectId: newTask.projectId ? Number(newTask.projectId) : undefined,
      }
      setTasks([...tasks, task])
      setNewTask({
        title: "",
        description: "",
        priority: "medium",
        assignee: "",
        dueDate: "",
        projectId: "",
      })
      setShowAddTask(false)
    }
  }

  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      const member: TeamMember = {
        id: teamMembers.length + 1,
        name: newMember.name,
        email: newMember.email,
        role: newMember.role,
        status: "active",
        projects: 0,
      }
      setTeamMembers([...teamMembers, member])
      setNewMember({
        name: "",
        email: "",
        role: "employee",
      })
      setShowAddMember(false)
    }
  }

  const metrics: Metric[] = [
    {
      label: "Активные проекты",
      value: projects.filter((p) => p.status === "active").length.toString(),
      change: 8.5,
      icon: <Target className="w-4 h-4" />,
    },
    {
      label: "Завершенные задачи",
      value: tasks.filter((t) => t.status === "completed").length.toString(),
      change: 12.3,
      icon: <CheckCircle className="w-4 h-4" />,
    },
    {
      label: "Участников команды",
      value: teamMembers.filter((m) => m.status === "active").length.toString(),
      change: 23.1,
      icon: <Users className="w-4 h-4" />,
    },
    {
      label: "ROI",
      value: "285%",
      change: 15.7,
      icon: <TrendingUp className="w-4 h-4" />,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-500"
      case "completed":
        return "bg-green-500"
      case "pending":
        return "bg-yellow-500"
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      case "in-progress":
        return "bg-blue-500"
      case "todo":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
            notification.type === "success"
              ? "bg-green-100 border border-green-300 text-green-800"
              : notification.type === "error"
                ? "bg-red-100 border border-red-300 text-red-800"
                : "bg-blue-100 border border-blue-300 text-blue-800"
          }`}
        >
          <div className="flex items-center justify-between">
            <span>{notification.message}</span>
            <Button variant="ghost" size="sm" onClick={() => setNotification(null)} className="ml-2 h-6 w-6 p-0">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Рабочая платформа</h1>
              <p className="text-muted-foreground">Управляйте проектами и командой с помощью ИИ</p>
            </div>
            <Link href="/">
              <Button variant="outline" className="border-primary/20 bg-transparent">
                <Home className="w-4 h-4 mr-2" />
                На главную
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metrics.map((metric, index) => (
              <Card key={index} className="bg-card/80 backdrop-blur-sm border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                      <div className="flex items-center mt-1">
                        <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                        <span className="text-xs text-green-500">+{metric.change}%</span>
                      </div>
                    </div>
                    <div className="text-primary">{metric.icon}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Дашборд
              </TabsTrigger>
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <Target className="w-4 h-4" />
                Проекты
              </TabsTrigger>
              <TabsTrigger value="tasks" className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Задачи
              </TabsTrigger>
              <TabsTrigger value="team" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Команда
              </TabsTrigger>
              <TabsTrigger value="ai-tools" className="flex items-center gap-2">
                <Bot className="w-4 h-4" />
                ИИ-Инструменты
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-primary" />
                      Прогресс проектов
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {projects.map((project) => (
                      <div key={project.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{project.name}</span>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status === "active"
                              ? "Активный"
                              : project.status === "completed"
                                ? "Завершен"
                                : "Ожидает"}
                          </Badge>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{project.progress}% завершено</span>
                          <span>До {project.deadline}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-card/80 backdrop-blur-sm border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-primary" />
                      Быстрые действия
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      className="w-full justify-start bg-transparent"
                      variant="outline"
                      onClick={() => setShowAddProject(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Создать новый проект
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Сгенерировать отчет
                    </Button>
                    <Button
                      className="w-full justify-start bg-transparent"
                      variant="outline"
                      onClick={() => setShowAddMember(true)}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Пригласить участника
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Bot className="w-4 h-4 mr-2" />
                      Запустить ИИ-анализ
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Управление проектами</h2>
                <Button className="bg-primary hover:bg-primary/90" onClick={() => setShowAddProject(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Новый проект
                </Button>
              </div>
              <div className="grid gap-4">
                {projects.map((project) => (
                  <Card key={project.id} className="bg-card/80 backdrop-blur-sm border-primary/20">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">{project.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                          <p className="text-sm text-muted-foreground">Команда: {project.team.join(", ")}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getStatusColor(project.priority || "medium")}>
                            {project.priority === "high"
                              ? "Высокий"
                              : project.priority === "low"
                                ? "Низкий"
                                : "Средний"}
                          </Badge>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status === "active"
                              ? "Активный"
                              : project.status === "completed"
                                ? "Завершен"
                                : "Ожидает"}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={project.progress} className="mb-2" />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{project.progress}% завершено</span>
                        <span>Дедлайн: {project.deadline}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Задачи команды</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Фильтр
                  </Button>
                  <Button className="bg-primary hover:bg-primary/90" size="sm" onClick={() => setShowAddTask(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Новая задача
                  </Button>
                </div>
              </div>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <Card key={task.id} className="bg-card/80 backdrop-blur-sm border-primary/20">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`} />
                          <div>
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-sm text-muted-foreground mb-1">{task.description}</p>
                            <p className="text-sm text-muted-foreground">
                              Исполнитель: {task.assignee} • До {task.dueDate}
                            </p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(task.priority)} variant="outline">
                          {task.priority === "high" ? "Высокий" : task.priority === "medium" ? "Средний" : "Низкий"}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="team" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Управление командой</h2>
                <Button className="bg-primary hover:bg-primary/90" onClick={() => setShowAddMember(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Пригласить участника
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamMembers.map((member) => (
                  <Card key={member.id} className="bg-card/80 backdrop-blur-sm border-primary/20">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                      <p className="text-xs text-muted-foreground mb-3">{member.email}</p>
                      <div className="flex justify-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {member.status === "active" ? "Активен" : "Неактивен"}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {member.projects} проектов
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ai-tools" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-primary mb-2">ИИ-Инструменты</h2>
                <p className="text-muted-foreground">
                  Автоматизируйте рутинные задачи с помощью искусственного интеллекта
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
                  <CardContent className="p-6 text-center">
                    <Bot className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">ИИ-Ассистент</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Получите ответы на вопросы и помощь в решении задач
                    </p>
                    <Button className="w-full">Открыть чат</Button>
                  </CardContent>
                </Card>
                <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
                  <CardContent className="p-6 text-center">
                    <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Генератор контента</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Создавайте тексты, отчеты и презентации автоматически
                    </p>
                    <Button className="w-full">Создать контент</Button>
                  </CardContent>
                </Card>
                <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
                  <CardContent className="p-6 text-center">
                    <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Анализ данных</h3>
                    <p className="text-sm text-muted-foreground mb-4">Получите инсайты из ваших бизнес-данных</p>
                    <Button className="w-full">Запустить анализ</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Dialog open={showAddProject} onOpenChange={setShowAddProject}>
        <DialogContent className="max-w-2xl mx-4">
          <DialogHeader>
            <DialogTitle>Создать новый проект</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="project-name">Название проекта *</Label>
              <Input
                id="project-name"
                value={newProject.name}
                onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                placeholder="Введите название проекта"
                className={!newProject.name.trim() ? "border-red-300" : ""}
              />
            </div>
            <div>
              <Label htmlFor="project-description">Описание</Label>
              <Textarea
                id="project-description"
                value={newProject.description}
                onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                placeholder="Описание проекта"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="project-priority">Приоритет</Label>
                <Select
                  value={newProject.priority}
                  onValueChange={(v) => setNewProject({ ...newProject, priority: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Низкий</SelectItem>
                    <SelectItem value="medium">Средний</SelectItem>
                    <SelectItem value="high">Высокий</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="project-deadline">Дедлайн *</Label>
                <Input
                  id="project-deadline"
                  type="date"
                  value={newProject.deadline}
                  onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
                  className={!newProject.deadline ? "border-red-300" : ""}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowAddProject(false)}>
                Отмена
              </Button>
              <Button onClick={handleAddProject}>Создать проект</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
        <DialogContent className="max-w-2xl mx-4">
          <DialogHeader>
            <DialogTitle>Создать новую задачу</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Название задачи *</Label>
              <Input
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Введите название задачи"
              />
            </div>
            <div>
              <Label>Описание</Label>
              <Textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Описание задачи"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Приоритет</Label>
                <Select value={newTask.priority} onValueChange={(v) => setNewTask({ ...newTask, priority: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Низкий</SelectItem>
                    <SelectItem value="medium">Средний</SelectItem>
                    <SelectItem value="high">Высокий</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Исполнитель *</Label>
                <Select value={newTask.assignee} onValueChange={(v) => setNewTask({ ...newTask, assignee: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите исполнителя" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.name}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Проект</Label>
                <Select value={newTask.projectId} onValueChange={(v) => setNewTask({ ...newTask, projectId: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите проект" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id.toString()}>
                        {project.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Срок выполнения *</Label>
                <Input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowAddTask(false)}>
                Отмена
              </Button>
              <Button onClick={handleAddTask}>Создать задачу</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddMember} onOpenChange={setShowAddMember}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Пригласить участника</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Имя *</Label>
              <Input
                value={newMember.name}
                onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                placeholder="Введите имя участника"
              />
            </div>
            <div>
              <Label>Email *</Label>
              <Input
                type="email"
                value={newMember.email}
                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                placeholder="email@company.com"
              />
            </div>
            <div>
              <Label>Роль</Label>
              <Select value={newMember.role} onValueChange={(v) => setNewMember({ ...newMember, role: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employee">Сотрудник</SelectItem>
                  <SelectItem value="manager">Менеджер</SelectItem>
                  <SelectItem value="admin">Администратор</SelectItem>
                  <SelectItem value="developer">Разработчик</SelectItem>
                  <SelectItem value="designer">Дизайнер</SelectItem>
                  <SelectItem value="analyst">Аналитик</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowAddMember(false)}>
                Отмена
              </Button>
              <Button onClick={handleAddMember}>Пригласить</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
