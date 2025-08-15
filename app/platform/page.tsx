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
import {
  Home,
  Bot,
  BarChart3,
  Users,
  FileText,
  Zap,
  TrendingUp,
  Target,
  Clock,
  CheckCircle,
  Plus,
  Filter,
} from "lucide-react"
import Link from "next/link"

interface Project {
  id: number
  name: string
  status: "active" | "completed" | "pending"
  progress: number
  deadline: string
  team: string[]
}

interface Task {
  id: number
  title: string
  priority: "high" | "medium" | "low"
  status: "todo" | "in-progress" | "completed"
  assignee: string
  dueDate: string
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

  const projects: Project[] = [
    {
      id: 1,
      name: "Автоматизация продаж",
      status: "active",
      progress: 75,
      deadline: "2024-02-15",
      team: ["Анна К.", "Михаил П.", "Елена С."],
    },
    {
      id: 2,
      name: "ИИ-чатбот поддержки",
      status: "active",
      progress: 45,
      deadline: "2024-03-01",
      team: ["Дмитрий В.", "Ольга Н."],
    },
    {
      id: 3,
      name: "Анализ клиентских данных",
      status: "completed",
      progress: 100,
      deadline: "2024-01-20",
      team: ["Сергей Л.", "Мария К."],
    },
  ]

  const tasks: Task[] = [
    {
      id: 1,
      title: "Настроить интеграцию с CRM",
      priority: "high",
      status: "in-progress",
      assignee: "Анна К.",
      dueDate: "2024-01-25",
    },
    {
      id: 2,
      title: "Протестировать чатбот",
      priority: "medium",
      status: "todo",
      assignee: "Дмитрий В.",
      dueDate: "2024-01-28",
    },
    {
      id: 3,
      title: "Подготовить отчет по аналитике",
      priority: "low",
      status: "completed",
      assignee: "Сергей Л.",
      dueDate: "2024-01-20",
    },
  ]

  const metrics: Metric[] = [
    {
      label: "Активные проекты",
      value: "12",
      change: 8.5,
      icon: <Target className="w-4 h-4" />,
    },
    {
      label: "Завершенные задачи",
      value: "247",
      change: 12.3,
      icon: <CheckCircle className="w-4 h-4" />,
    },
    {
      label: "Экономия времени",
      value: "340ч",
      change: 23.1,
      icon: <Clock className="w-4 h-4" />,
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
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Plus className="w-4 h-4 mr-2" />
                      Создать новый проект
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Сгенерировать отчет
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
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
                <Button className="bg-primary hover:bg-primary/90">
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
                          <p className="text-sm text-muted-foreground">Команда: {project.team.join(", ")}</p>
                        </div>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status === "active"
                            ? "Активный"
                            : project.status === "completed"
                              ? "Завершен"
                              : "Ожидает"}
                        </Badge>
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
                  <Button className="bg-primary hover:bg-primary/90" size="sm">
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
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Пригласить участника
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {["Анна К.", "Михаил П.", "Елена С.", "Дмитрий В.", "Ольга Н.", "Сергей Л."].map((member, index) => (
                  <Card key={index} className="bg-card/80 backdrop-blur-sm border-primary/20">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-medium">{member}</h4>
                      <p className="text-sm text-muted-foreground">Разработчик</p>
                      <div className="flex justify-center gap-2 mt-3">
                        <Badge variant="outline" className="text-xs">
                          Активен
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          2 проекта
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
      <Footer />
    </div>
  )
}
