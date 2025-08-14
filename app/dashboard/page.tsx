"use client"

import { Textarea } from "@/components/ui/textarea"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  MessageSquare,
  Settings,
  LogOut,
  Send,
  Bot,
  Home,
  BarChart3,
  Zap,
  TrendingUp,
  Target,
  Activity,
  Users,
  FileText,
  Brain,
  Rocket,
  DollarSign,
  CheckCircle,
  Plus,
  ArrowRight,
  Lightbulb,
  Briefcase,
  Calendar,
  Star,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { ContentGenerator } from "@/components/ai-tools/content-generator"
import { DataAnalyzer } from "@/components/ai-tools/data-analyzer"
import { ProcessAutomation } from "@/components/ai-tools/process-automation"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [activeToolTab, setActiveToolTab] = useState("content-generator")
  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: "bot",
      message: "Добро пожаловать в вашу ИИ-платформу! Я помогу оптимизировать ваш бизнес. С чего начнем?",
    },
  ])

  const businessMetrics = {
    monthlyRevenue: 450000,
    revenueGrowth: 23,
    automatedProcesses: 12,
    timeSaved: 156,
    aiEfficiency: 94,
    activeProjects: 8,
  }

  const aiTools = [
    {
      id: 1,
      name: "Генератор контента",
      description: "Создание маркетинговых текстов, статей и постов",
      status: "active",
      usage: 85,
      monthlyTasks: 234,
      roi: "+340%",
      category: "Маркетинг",
      icon: FileText,
      component: "content-generator",
    },
    {
      id: 2,
      name: "Анализатор данных",
      description: "Обработка продаж, клиентской базы и трендов",
      status: "active",
      usage: 72,
      monthlyTasks: 156,
      roi: "+280%",
      category: "Аналитика",
      icon: BarChart3,
      component: "data-analyzer",
    },
    {
      id: 3,
      name: "Автоматизация процессов",
      description: "Автоматизация рутинных задач и workflow",
      status: "active",
      usage: 91,
      monthlyTasks: 445,
      roi: "+520%",
      category: "Операции",
      icon: Zap,
      component: "process-automation",
    },
    {
      id: 4,
      name: "Персональный ассистент",
      description: "Планирование, напоминания и управление задачами",
      status: "active",
      usage: 67,
      monthlyTasks: 89,
      roi: "+180%",
      category: "Продуктивность",
      icon: Brain,
      component: "personal-assistant",
    },
  ]

  const activeProjects = [
    {
      id: 1,
      name: "Автоматизация отдела продаж",
      progress: 78,
      deadline: "15 дней",
      status: "В процессе",
      team: 4,
      roi: "+450%",
      description: "Внедрение ИИ-бота для обработки лидов и автоматизации CRM",
    },
    {
      id: 2,
      name: "ИИ-чатбот для сайта",
      progress: 92,
      deadline: "3 дня",
      status: "Финализация",
      team: 2,
      roi: "+280%",
      description: "Разработка умного чатбота для поддержки клиентов 24/7",
    },
    {
      id: 3,
      name: "Анализ клиентской базы",
      progress: 45,
      deadline: "22 дня",
      status: "Разработка",
      team: 3,
      roi: "+320%",
      description: "Сегментация клиентов и персонализация предложений",
    },
  ]

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return

    const newMessage = {
      id: chatHistory.length + 1,
      type: "user" as const,
      message: chatMessage,
    }

    setChatHistory((prev) => [...prev, newMessage])
    setChatMessage("")

    setTimeout(() => {
      const responses = [
        "Отлично! Я вижу, что ваша автоматизация продаж показывает рост на 23%. Хотите оптимизировать процесс еще больше?",
        "Ваши ИИ-инструменты сэкономили уже 156 часов в этом месяце. Предлагаю добавить прогнозирование продаж для увеличения ROI.",
        "Анализирую ваши данные... Рекомендую запустить клиентский сервис-бот - это может увеличить конверсию на 25%.",
        "Вижу потенциал для роста! Ваша эффективность 94%, но мы можем достичь 98% с новыми инструментами.",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const botResponse = {
        id: chatHistory.length + 2,
        type: "bot" as const,
        message: randomResponse,
      }
      setChatHistory((prev) => [...prev, botResponse])
    }, 1000)
  }

  const handleLogout = () => {
    window.location.href = "/"
  }

  const activateAITool = (toolId: number) => {
    console.log(`Активация ИИ-инструмента ${toolId}`)
    // Здесь будет API вызов для активации инструмента
  }

  const getBreadcrumbs = () => {
    const breadcrumbs = [
      { label: "Главная", href: "/" },
      { label: "Бизнес-платформа", href: "/dashboard" },
    ]

    switch (activeTab) {
      case "overview":
        breadcrumbs.push({ label: "Обзор бизнеса", href: "/dashboard" })
        break
      case "tools":
        breadcrumbs.push({ label: "ИИ-инструменты", href: "/dashboard?tab=tools" })
        break
      case "projects":
        breadcrumbs.push({ label: "Активные проекты", href: "/dashboard?tab=projects" })
        break
      case "chat":
        breadcrumbs.push({ label: "ИИ-консультант", href: "/dashboard?tab=chat" })
        break
      case "settings":
        breadcrumbs.push({ label: "Настройки", href: "/dashboard?tab=settings" })
        break
    }

    return breadcrumbs
  }

  const renderActiveAITool = () => {
    switch (activeToolTab) {
      case "content-generator":
        return <ContentGenerator />
      case "data-analyzer":
        return <DataAnalyzer />
      case "process-automation":
        return <ProcessAutomation />
      default:
        return <ContentGenerator />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card/90 backdrop-blur-md border-b border-border/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <Home className="h-5 w-5 text-primary" />
                <h1 className="text-xl font-bold text-foreground">Рефрейм Бюро</h1>
              </Link>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                Бизнес-платформа
              </Badge>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <span className="text-foreground font-medium hidden md:inline">Добро пожаловать, Пользователь</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              {getBreadcrumbs().map((crumb, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <BreadcrumbSeparator />}
                  <BreadcrumbItem>
                    {index === getBreadcrumbs().length - 1 ? (
                      <BreadcrumbPage className="text-foreground">{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={crumb.href} className="text-muted-foreground hover:text-foreground">
                        {crumb.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-foreground font-bold text-lg">Управление бизнесом</CardTitle>
                <CardDescription className="text-muted-foreground text-sm">Ваша ИИ-платформа роста</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={activeTab === "overview" ? "default" : "ghost"}
                  className={`w-full justify-start transition-all duration-300 ${
                    activeTab === "overview"
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  Обзор бизнеса
                </Button>

                <Button
                  variant={activeTab === "tools" ? "default" : "ghost"}
                  className={`w-full justify-start transition-all duration-300 ${
                    activeTab === "tools"
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  }`}
                  onClick={() => setActiveTab("tools")}
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  ИИ-инструменты
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {aiTools.filter((t) => t.status === "active").length}
                  </Badge>
                </Button>

                <Button
                  variant={activeTab === "projects" ? "default" : "ghost"}
                  className={`w-full justify-start transition-all duration-300 ${
                    activeTab === "projects"
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  }`}
                  onClick={() => setActiveTab("projects")}
                >
                  <Target className="w-4 h-4 mr-2" />
                  Активные проекты
                  <Badge variant="secondary" className="ml-auto text-xs">
                    {activeProjects.length}
                  </Badge>
                </Button>

                <Button
                  variant={activeTab === "chat" ? "default" : "ghost"}
                  className={`w-full justify-start transition-all duration-300 ${
                    activeTab === "chat"
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  }`}
                  onClick={() => setActiveTab("chat")}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  ИИ-консультант
                </Button>

                <Button
                  variant={activeTab === "settings" ? "default" : "ghost"}
                  className={`w-full justify-start transition-all duration-300 ${
                    activeTab === "settings"
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                      : "text-foreground hover:bg-accent/50 hover:text-accent-foreground"
                  }`}
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Настройки
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Месячная выручка</p>
                          <p className="text-2xl font-bold text-green-600">
                            {businessMetrics.monthlyRevenue.toLocaleString()} ₽
                          </p>
                          <p className="text-xs text-green-600 flex items-center mt-1">
                            <TrendingUp className="w-3 h-3 mr-1" />+{businessMetrics.revenueGrowth}% к прошлому месяцу
                          </p>
                        </div>
                        <DollarSign className="h-8 w-8 text-green-500/60" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Автоматизированные процессы</p>
                          <p className="text-2xl font-bold text-blue-600">{businessMetrics.automatedProcesses}</p>
                          <p className="text-xs text-blue-600 flex items-center mt-1">
                            <Zap className="w-3 h-3 mr-1" />
                            Экономия {businessMetrics.timeSaved}ч/месяц
                          </p>
                        </div>
                        <Rocket className="h-8 w-8 text-blue-500/60" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">ИИ эффективность</p>
                          <p className="text-2xl font-bold text-purple-600">{businessMetrics.aiEfficiency}%</p>
                          <p className="text-xs text-purple-600 flex items-center mt-1">
                            <Star className="w-3 h-3 mr-1" />
                            Отличный результат
                          </p>
                        </div>
                        <Brain className="h-8 w-8 text-purple-500/60" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Быстрые действия */}
                <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                  <CardHeader>
                    <CardTitle className="text-foreground font-bold flex items-center">
                      <Lightbulb className="w-5 h-5 mr-2 text-primary" />
                      Рекомендации для роста
                    </CardTitle>
                    <CardDescription>Персональные предложения на основе анализа вашего бизнеса</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-all duration-300">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <TrendingUp className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">Запустить прогнозирование продаж</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Увеличьте выручку на 40% с помощью ИИ-прогнозов
                            </p>
                            <Button size="sm" className="mt-2" onClick={() => activateAITool(5)}>
                              Активировать
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg hover:bg-blue-500/10 transition-all duration-300">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-blue-500/10 rounded-lg">
                            <Users className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">Добавить клиентский сервис-бот</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Автоматизируйте поддержку и увеличьте удовлетворенность
                            </p>
                            <Button
                              size="sm"
                              variant="outline"
                              className="mt-2 bg-transparent"
                              onClick={() => activateAITool(6)}
                            >
                              Подключить
                              <ArrowRight className="w-3 h-3 ml-1" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Последняя активность */}
                <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                  <CardHeader>
                    <CardTitle className="text-foreground font-bold flex items-center">
                      <Activity className="w-5 h-5 mr-2 text-primary" />
                      Последняя активность
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg border border-border/30">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            Генератор контента создал 15 постов для соцсетей
                          </p>
                          <p className="text-xs text-muted-foreground">2 часа назад</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg border border-border/30">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                          <BarChart3 className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            Анализатор данных обработал отчет по продажам
                          </p>
                          <p className="text-xs text-muted-foreground">4 часа назад</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg border border-border/30">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                          <Zap className="h-4 w-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            Автоматизация обработала 45 заявок клиентов
                          </p>
                          <p className="text-xs text-muted-foreground">6 часов назад</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "tools" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">ИИ-инструменты</h2>
                    <p className="text-muted-foreground">Управляйте своими ИИ-решениями для бизнеса</p>
                  </div>
                </div>

                <div className="flex space-x-2 mb-6 overflow-x-auto">
                  {aiTools
                    .filter((tool) => tool.status === "active")
                    .map((tool) => (
                      <Button
                        key={tool.component}
                        variant={activeToolTab === tool.component ? "default" : "outline"}
                        className={`flex-shrink-0 ${
                          activeToolTab === tool.component ? "bg-primary text-primary-foreground" : "bg-transparent"
                        }`}
                        onClick={() => setActiveToolTab(tool.component)}
                      >
                        <tool.icon className="w-4 h-4 mr-2" />
                        {tool.name}
                      </Button>
                    ))}
                </div>

                {renderActiveAITool()}
              </div>
            )}

            {activeTab === "projects" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Активные проекты</h2>
                    <p className="text-muted-foreground">Отслеживайте прогресс ваших ИИ-проектов</p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Новый проект
                  </Button>
                </div>

                <div className="space-y-4">
                  {activeProjects.map((project) => (
                    <Card
                      key={project.id}
                      className="bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-foreground mb-2">{project.name}</h3>
                            <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {project.deadline}
                              </div>
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {project.team} участников
                              </div>
                              <Badge
                                variant={
                                  project.status === "В процессе"
                                    ? "default"
                                    : project.status === "Финализация"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {project.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Ожидаемый ROI</p>
                            <p className="text-lg font-bold text-green-600">{project.roi}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Прогресс</span>
                            <span className="text-sm font-medium text-foreground">{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} className="h-2" />
                        </div>

                        <div className="flex justify-end space-x-2 mt-4">
                          <Button size="sm" variant="outline">
                            Подробнее
                          </Button>
                          <Button size="sm">
                            Открыть проект
                            <ArrowRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "chat" && (
              <Card className="bg-card/50 backdrop-blur-sm border border-border/50 h-[600px] flex flex-col">
                <CardHeader className="pb-4">
                  <CardTitle className="text-foreground font-bold flex items-center">
                    <Bot className="w-5 h-5 mr-2 text-primary" />
                    ИИ-консультант по бизнесу
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Персональный помощник для роста вашего бизнеса
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col p-6">
                  <ScrollArea className="flex-1 mb-4 p-4 bg-background/50 rounded-lg border border-border/30">
                    <div className="space-y-4">
                      {chatHistory.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[80%] p-3 rounded-lg transition-all duration-300 ${
                              msg.type === "user"
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                                : "bg-card text-foreground border border-border/50"
                            }`}
                          >
                            {msg.message}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="flex space-x-2">
                    <Input
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Спросите о развитии бизнеса, ИИ-инструментах или аналитике..."
                      className="bg-background border-border/50 focus:border-primary focus:ring-primary/20"
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
                      size="icon"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                  <CardHeader>
                    <CardTitle className="text-foreground font-bold">Настройки аккаунта</CardTitle>
                    <CardDescription>Управление профилем и предпочтениями</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-foreground text-sm font-medium">Имя</label>
                        <Input
                          defaultValue="Пользователь"
                          className="mt-1 bg-background border-border/50 focus:border-primary focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label className="text-foreground text-sm font-medium">Email</label>
                        <Input
                          defaultValue="user@example.com"
                          className="mt-1 bg-background border-border/50 focus:border-primary focus:ring-primary/20"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-foreground text-sm font-medium">Компания</label>
                      <Input
                        defaultValue="Моя компания"
                        className="mt-1 bg-background border-border/50 focus:border-primary focus:ring-primary/20"
                      />
                    </div>
                    <div>
                      <label className="text-foreground text-sm font-medium">Цели бизнеса</label>
                      <Textarea
                        defaultValue="Автоматизация процессов, увеличение продаж, оптимизация затрат"
                        className="mt-1 bg-background border-border/50 focus:border-primary focus:ring-primary/20"
                        rows={3}
                      />
                    </div>
                    <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25">
                      Сохранить изменения
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                  <CardHeader>
                    <CardTitle className="text-foreground font-bold">Уведомления</CardTitle>
                    <CardDescription>Настройте уведомления о работе ИИ-инструментов</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-foreground font-medium">Email уведомления</p>
                        <p className="text-sm text-muted-foreground">Получать отчеты о работе ИИ</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Включено
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-foreground font-medium">Push уведомления</p>
                        <p className="text-sm text-muted-foreground">Уведомления в браузере</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Выключено
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
