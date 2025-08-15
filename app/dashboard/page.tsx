"use client"

import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
  Rocket,
  CheckCircle,
  Plus,
  ArrowRight,
  Lightbulb,
  Briefcase,
  Calendar,
  Sparkles,
  ChevronRight,
  Menu,
  Bell,
  Search,
  DollarSign,
  UserPlus,
  Mail,
  Edit,
  Eye,
  Trash2,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { ContentGenerator } from "@/components/ai-tools/content-generator"
import { DataAnalyzer } from "@/components/ai-tools/data-analyzer"
import { ProcessAutomation } from "@/components/ai-tools/process-automation"
import { SalesManager } from "@/components/business-tools/sales-manager"
import { FinanceManager } from "@/components/business-tools/finance-manager"
import { AnimatedMetrics } from "@/components/interactive/animated-metrics"
import { AIToolsShowcase } from "@/components/interactive/ai-tools-showcase"
import { FloatingActionMenu } from "@/components/interactive/floating-action-menu"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [activeToolTab, setActiveToolTab] = useState("content-generator")
  const [chatMessage, setChatMessage] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState(3)
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [newUserData, setNewUserData] = useState({
    name: "",
    email: "",
    role: "member",
    department: "",
  })
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: "bot",
      message: "Добро пожаловать в вашу ИИ-платформу! Я помогу оптимизировать ваш бизнес. С чего начнем?",
    },
  ])

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const businessMetrics = {
    monthlyRevenue: 2450000,
    revenueGrowth: 23,
    automatedProcesses: 12,
    timeSaved: 156,
    aiEfficiency: 94,
    activeProjects: 8,
    completedTasks: 1247,
    clientSatisfaction: 98,
    totalExpenses: 1680000,
    netProfit: 770000,
    activePipeline: 1850000,
    totalLeads: 156,
    conversionRate: 24.8,
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
      color: "from-blue-500/20 to-blue-600/10",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-600",
      isRunning: true,
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
      color: "from-green-500/20 to-green-600/10",
      borderColor: "border-green-500/30",
      textColor: "text-green-600",
      isRunning: false,
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
      color: "from-purple-500/20 to-purple-600/10",
      borderColor: "border-purple-500/30",
      textColor: "text-purple-600",
      isRunning: true,
    },
    {
      id: 4,
      name: "Менеджер продаж",
      description: "CRM система и управление воронкой продаж",
      status: "active",
      usage: 78,
      monthlyTasks: 189,
      roi: "+450%",
      category: "Продажи",
      icon: TrendingUp,
      component: "sales-manager",
      color: "from-emerald-500/20 to-emerald-600/10",
      borderColor: "border-emerald-500/30",
      textColor: "text-emerald-600",
      isRunning: true,
    },
    {
      id: 5,
      name: "Финансовый менеджер",
      description: "Управление бюджетом, доходами и расходами",
      status: "active",
      usage: 82,
      monthlyTasks: 167,
      roi: "+380%",
      category: "Финансы",
      icon: DollarSign,
      component: "finance-manager",
      color: "from-amber-500/20 to-amber-600/10",
      borderColor: "border-amber-500/30",
      textColor: "text-amber-600",
      isRunning: false,
    },
  ]

  const teamMembers = [
    {
      id: 1,
      name: "Анна Петрова",
      email: "anna@company.com",
      role: "admin",
      department: "Маркетинг",
      avatar: "АП",
      status: "online",
      joinDate: "2024-01-15",
      aiToolsUsage: 85,
      tasksCompleted: 234,
      permissions: ["all"],
      lastActive: "Сейчас онлайн",
      productivity: 94,
    },
    {
      id: 2,
      name: "Михаил Сидоров",
      email: "mikhail@company.com",
      role: "manager",
      department: "Продажи",
      avatar: "МС",
      status: "online",
      joinDate: "2024-02-01",
      aiToolsUsage: 72,
      tasksCompleted: 156,
      permissions: ["sales-manager", "content-generator", "data-analyzer"],
      lastActive: "5 минут назад",
      productivity: 88,
    },
    {
      id: 3,
      name: "Елена Козлова",
      email: "elena@company.com",
      role: "manager",
      department: "Финансы",
      avatar: "ЕК",
      status: "online",
      joinDate: "2024-02-20",
      aiToolsUsage: 82,
      tasksCompleted: 167,
      permissions: ["finance-manager", "data-analyzer"],
      lastActive: "15 минут назад",
      productivity: 91,
    },
    {
      id: 4,
      name: "Дмитрий Волков",
      email: "dmitry@company.com",
      role: "member",
      department: "Аналитика",
      avatar: "ДВ",
      status: "offline",
      joinDate: "2024-03-01",
      aiToolsUsage: 91,
      tasksCompleted: 198,
      permissions: ["data-analyzer", "content-generator"],
      lastActive: "2 часа назад",
      productivity: 87,
    },
  ]

  const departments = [
    { name: "Маркетинг", members: 1, color: "blue", budget: 120000, spent: 95000 },
    { name: "Продажи", members: 1, color: "green", budget: 180000, spent: 145000 },
    { name: "Финансы", members: 1, color: "amber", budget: 90000, spent: 72000 },
    { name: "Аналитика", members: 1, color: "purple", budget: 110000, spent: 88000 },
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

  const handleAddUser = () => {
    if (!newUserData.name || !newUserData.email) return

    const newUser = {
      id: teamMembers.length + 1,
      name: newUserData.name,
      email: newUserData.email,
      role: newUserData.role,
      department: newUserData.department,
      avatar: newUserData.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase(),
      status: "offline",
      joinDate: new Date().toISOString().split("T")[0],
      aiToolsUsage: 0,
      tasksCompleted: 0,
      permissions: newUserData.role === "admin" ? ["all"] : ["content-generator"],
      lastActive: "Только что",
      productivity: 0,
    }

    console.log("Добавление нового пользователя:", newUser)
    // Здесь будет API вызов для добавления пользователя

    setNewUserData({ name: "", email: "", role: "member", department: "" })
    setShowAddUserModal(false)
  }

  const removeUser = (userId: number) => {
    console.log("Удаление пользователя:", userId)
    // Здесь будет API вызов для удаления пользователя
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-500/10 text-red-600 border-red-500/30"
      case "manager":
        return "bg-blue-500/10 text-blue-600 border-blue-500/30"
      case "member":
        return "bg-green-500/10 text-green-600 border-green-500/30"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/30"
    }
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return "Администратор"
      case "manager":
        return "Менеджер"
      case "member":
        return "Сотрудник"
      default:
        return "Пользователь"
    }
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
      case "sales":
        breadcrumbs.push({ label: "Продажи", href: "/dashboard?tab=sales" })
        break
      case "finance":
        breadcrumbs.push({ label: "Финансы", href: "/dashboard?tab=finance" })
        break
      case "projects":
        breadcrumbs.push({ label: "Активные проекты", href: "/dashboard?tab=projects" })
        break
      case "team":
        breadcrumbs.push({ label: "Команда", href: "/dashboard?tab=team" })
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
      case "sales-manager":
        return <SalesManager />
      case "finance-manager":
        return <FinanceManager />
      default:
        return <ContentGenerator />
    }
  }

  const NavigationMenu = ({ onItemClick }: { onItemClick?: () => void }) => (
    <div className="space-y-2">
      {[
        { key: "overview", icon: Briefcase, label: "Обзор бизнеса", badge: null },
        {
          key: "tools",
          icon: Rocket,
          label: "ИИ-инструменты",
          badge: aiTools.filter((t) => t.status === "active").length,
        },
        { key: "sales", icon: TrendingUp, label: "Продажи", badge: businessMetrics.totalLeads },
        { key: "finance", icon: DollarSign, label: "Финансы", badge: null },
        { key: "projects", icon: Target, label: "Активные проекты", badge: activeProjects.length },
        { key: "team", icon: Users, label: "Команда", badge: teamMembers.length },
        { key: "chat", icon: MessageSquare, label: "ИИ-консультант", badge: null },
        { key: "settings", icon: Settings, label: "Настройки", badge: null },
      ].map((item) => (
        <Button
          key={item.key}
          variant={activeTab === item.key ? "default" : "ghost"}
          className={`w-full justify-start transition-all duration-300 group ${
            activeTab === item.key
              ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25 scale-[1.02]"
              : "text-foreground hover:bg-accent/50 hover:text-accent-foreground hover:scale-[1.01]"
          }`}
          onClick={() => {
            setActiveTab(item.key)
            onItemClick?.()
          }}
        >
          <item.icon className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform" />
          <span className="flex-1 text-left">{item.label}</span>
          {item.badge && (
            <Badge variant="secondary" className="ml-2 text-xs bg-background/50">
              {item.badge}
            </Badge>
          )}
          <ChevronRight
            className={`w-4 h-4 ml-2 transition-transform ${activeTab === item.key ? "rotate-90" : "group-hover:translate-x-1"}`}
          />
        </Button>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <header className="bg-card/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50 shadow-lg shadow-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px:8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              {/* Mobile menu trigger */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80 p-0">
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-6">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Home className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className="text-xl font-bold text-foreground">Рефрейм Бюро</h2>
                    </div>
                    <NavigationMenu onItemClick={() => setIsMobileMenuOpen(false)} />
                  </div>
                </SheetContent>
              </Sheet>

              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-all duration-300 group">
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Home className="h-5 w-5 text-primary" />
                </div>
                <h1 className="text-xl font-bold text-foreground hidden sm:block">Рефрейм Бюро</h1>
              </Link>
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30 shadow-sm hidden sm:flex"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Бизнес-платформа
              </Badge>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search - hidden on mobile */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Поиск..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64 bg-background/50 border-border/50 focus:border-primary/50"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                    {notifications}
                  </Badge>
                )}
              </Button>

              <ThemeToggle />

              <div className="hidden md:flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">П</span>
                </div>
                <span className="text-foreground font-medium">Пользователь</span>
              </div>

              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 bg-transparent hover:shadow-md"
              >
                <LogOut className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Выйти</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <Breadcrumb>
            <BreadcrumbList className="flex-wrap">
              {getBreadcrumbs().map((crumb, index) => (
                <div key={index} className="flex items-center">
                  {index > 0 && <BreadcrumbSeparator className="text-muted-foreground/50 mx-1" />}
                  <BreadcrumbItem>
                    {index === getBreadcrumbs().length - 1 ? (
                      <BreadcrumbPage className="text-foreground font-medium text-sm sm:text-base">
                        {crumb.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={crumb.href}
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm sm:text-base"
                      >
                        {crumb.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Desktop sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <Card className="bg-card/60 backdrop-blur-xl border border-border/50 shadow-xl shadow-primary/5 sticky top-24">
              <CardHeader className="pb-4">
                <CardTitle className="text-foreground font-bold text-lg flex items-center">
                  <div className="p-2 bg-primary/10 rounded-lg mr-3">
                    <Briefcase className="w-5 h-5 text-primary" />
                  </div>
                  Управление бизнесом
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm">Ваша ИИ-платформа роста</CardDescription>
              </CardHeader>
              <CardContent>
                <NavigationMenu />
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="col-span-1 lg:col-span-3">
            {activeTab === "overview" && (
              <div className="space-y-6 sm:space-y-8">
                <AnimatedMetrics />

                <Card className="bg-card/60 backdrop-blur-xl border border-border/50 shadow-xl shadow-primary/5">
                  <CardHeader>
                    <CardTitle className="text-foreground font-bold flex items-center text-lg sm:text-xl">
                      <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mr-3">
                        <Lightbulb className="w-5 h-5 text-primary" />
                      </div>
                      Рекомендации для роста
                      <Badge variant="secondary" className="ml-3 bg-primary/10 text-primary">
                        <Sparkles className="w-3 h-3 mr-1" />
                        ИИ-анализ
                      </Badge>
                    </CardTitle>
                    <CardDescription>Персональные предложения на основе анализа вашего бизнеса</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      <div className="p-4 sm:p-6 bg-gradient-to-br from-primary/5 via-primary/3 to-transparent border border-primary/20 rounded-xl hover:bg-primary/10 transition-all duration-300 group cursor-pointer">
                        <div className="flex items-start space-x-3 sm:space-x-4">
                          <div className="p-2 sm:p-3 bg-primary/10 rounded-xl group-hover:bg-primary/20 transition-colors">
                            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-primary group-hover:scale-110 transition-transform" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">
                              Запустить прогнозирование продаж
                            </h4>
                            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                              Увеличьте выручку на 40% с помощью ИИ-прогнозов и аналитики трендов
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                              <Button
                                size="sm"
                                className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25 w-full sm:w-auto"
                                onClick={() => activateAITool(5)}
                              >
                                Активировать
                                <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                              </Button>
                              <Badge variant="outline" className="text-xs self-start sm:self-auto">
                                ROI +40%
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-500/5 via-blue-500/3 to-transparent border border-blue-500/20 rounded-xl hover:bg-blue-500/10 transition-all duration-300 group cursor-pointer">
                        <div className="flex items-start space-x-3 sm:space-x-4">
                          <div className="p-2 sm:p-3 bg-blue-500/10 rounded-xl group-hover:bg-blue-500/20 transition-colors">
                            <Users className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">
                              Добавить клиентский сервис-бот
                            </h4>
                            <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
                              Автоматизируйте поддержку 24/7 и увеличьте удовлетворенность клиентов
                            </p>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                              <Button
                                size="sm"
                                variant="outline"
                                className="bg-transparent hover:bg-blue-500/10 border-blue-500/30 w-full sm:w-auto"
                                onClick={() => activateAITool(6)}
                              >
                                Подключить
                                <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                              </Button>
                              <Badge variant="outline" className="text-xs self-start sm:self-auto">
                                ROI +25%
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Последняя активность */}
                <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                  <CardHeader>
                    <CardTitle className="text-foreground font-bold flex items-center text-lg sm:text-xl">
                      <Activity className="w-5 h-5 mr-2 text-primary" />
                      Последняя активность
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 sm:space-y-4">
                      {[
                        {
                          icon: CheckCircle,
                          color: "green",
                          title: "Генератор контента создал 15 постов для соцсетей",
                          time: "2 часа назад",
                        },
                        {
                          icon: BarChart3,
                          color: "blue",
                          title: "Анализатор данных обработал отчет по продажам",
                          time: "4 часа назад",
                        },
                        {
                          icon: Zap,
                          color: "purple",
                          title: "Автоматизация обработала 45 заявок клиентов",
                          time: "6 часов назад",
                        },
                      ].map((activity, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 bg-background/50 rounded-lg border border-border/30 hover:bg-background/70 transition-colors"
                        >
                          <div className={`p-2 bg-${activity.color}-500/10 rounded-lg flex-shrink-0`}>
                            <activity.icon className={`h-4 w-4 text-${activity.color}-600`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate sm:whitespace-normal">
                              {activity.title}
                            </p>
                            <p className="text-xs text-muted-foreground">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "tools" && (
              <div className="space-y-6 sm:space-y-8">
                <AIToolsShowcase />

                <Card className="bg-card/60 backdrop-blur-xl border border-border/50 shadow-xl shadow-primary/5">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <CardTitle className="text-foreground font-bold text-lg sm:text-xl">
                        Активный инструмент
                      </CardTitle>
                      <div className="flex flex-wrap gap-2">
                        {aiTools
                          .filter((tool) => tool.status === "active")
                          .map((tool) => (
                            <Button
                              key={tool.component}
                              variant={activeToolTab === tool.component ? "default" : "outline"}
                              size="sm"
                              className={`transition-all duration-300 ${
                                activeToolTab === tool.component
                                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25"
                                  : "bg-transparent hover:bg-accent/50"
                              }`}
                              onClick={() => setActiveToolTab(tool.component)}
                            >
                              <tool.icon className="w-4 h-4 mr-2" />
                              <span className="hidden sm:inline">{tool.name}</span>
                              <span className="sm:hidden">{tool.name.split(" ")[0]}</span>
                            </Button>
                          ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-background/50 rounded-xl p-4 sm:p-6 border border-border/30">
                      {renderActiveAITool()}
                    </div>
                  </CardContent>
                </Card>
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
              <Card className="bg-card/50 backdrop-blur-sm border border-border/50 h-[500px] sm:h-[600px] flex flex-col">
                <CardHeader className="pb-4">
                  <CardTitle className="text-foreground font-bold flex items-center text-lg sm:text-xl">
                    <Bot className="w-5 h-5 mr-2 text-primary" />
                    ИИ-консультант по бизнесу
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm">
                    Персональный помощник для роста вашего бизнеса
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col p-4 sm:p-6">
                  <ScrollArea className="flex-1 mb-4 p-3 sm:p-4 bg-background/50 rounded-lg border border-border/30">
                    <div className="space-y-3 sm:space-y-4">
                      {chatHistory.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[85%] sm:max-w-[80%] p-3 rounded-lg transition-all duration-300 text-sm sm:text-base ${
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
                      placeholder="Спросите о развитии бизнеса..."
                      className="bg-background border-border/50 focus:border-primary focus:ring-primary/20 text-sm sm:text-base"
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 flex-shrink-0"
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

            {activeTab === "sales" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Управление продажами</h2>
                    <p className="text-muted-foreground">CRM система и воронка продаж</p>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    ROI +450%
                  </Badge>
                </div>
                <SalesManager />
              </div>
            )}

            {activeTab === "finance" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Финансовое управление</h2>
                    <p className="text-muted-foreground">Бюджет, доходы и расходы</p>
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    <DollarSign className="w-3 h-3 mr-1" />
                    Прибыль: {businessMetrics.netProfit.toLocaleString("ru-RU")}₽
                  </Badge>
                </div>
                <FinanceManager />
              </div>
            )}

            {activeTab === "team" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Управление командой</h2>
                    <p className="text-muted-foreground">Сотрудники, роли и права доступа</p>
                  </div>
                  <Button onClick={() => setShowAddUserModal(true)} className="bg-primary hover:bg-primary/90">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Добавить сотрудника
                  </Button>
                </div>

                {/* Department overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {departments.map((dept, index) => (
                    <Card key={index} className="bg-card/50 backdrop-blur-sm border border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-foreground">{dept.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {dept.members} чел.
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Бюджет</span>
                            <span className="text-foreground">{dept.budget.toLocaleString("ru-RU")}₽</span>
                          </div>
                          <div className="space-y-1">
                            <Progress value={(dept.spent / dept.budget) * 100} className="h-1" />
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">
                                Потрачено: {dept.spent.toLocaleString("ru-RU")}₽
                              </span>
                              <span className="text-green-600">
                                {Math.round(((dept.budget - dept.spent) / dept.budget) * 100)}% остаток
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Team members list */}
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <Card key={member.id} className="bg-card/50 backdrop-blur-sm border border-border/50">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-white">{member.avatar}</span>
                            </div>
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                                <Badge className={getRoleColor(member.role)}>{getRoleLabel(member.role)}</Badge>
                                <Badge variant={member.status === "online" ? "default" : "secondary"}>
                                  {member.status === "online" ? "Онлайн" : "Офлайн"}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                <div className="flex items-center">
                                  <Mail className="w-4 h-4 mr-1" />
                                  {member.email}
                                </div>
                                <div className="flex items-center">
                                  <Briefcase className="w-4 h-4 mr-1" />
                                  {member.department}
                                </div>
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 mr-1" />С {member.joinDate}
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                Последняя активность: {member.lastActive}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-4 mb-2">
                              <div className="text-center">
                                <p className="text-sm font-medium text-foreground">{member.productivity}%</p>
                                <p className="text-xs text-muted-foreground">Продуктивность</p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm font-medium text-foreground">{member.tasksCompleted}</p>
                                <p className="text-xs text-muted-foreground">Задач</p>
                              </div>
                              <div className="text-center">
                                <p className="text-sm font-medium text-foreground">{member.aiToolsUsage}%</p>
                                <p className="text-xs text-muted-foreground">ИИ-инструменты</p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4 mr-1" />
                                Редактировать
                              </Button>
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                Профиль
                              </Button>
                              {member.role !== "admin" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => removeUser(member.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-border/30">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">Доступные инструменты:</span>
                            <div className="flex flex-wrap gap-1">
                              {member.permissions.includes("all") ? (
                                <Badge variant="secondary" className="text-xs">
                                  Все инструменты
                                </Badge>
                              ) : (
                                member.permissions.map((permission, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {aiTools.find((tool) => tool.component === permission)?.name || permission}
                                  </Badge>
                                ))
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Add user modal */}
                {showAddUserModal && (
                  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Card className="w-full max-w-md mx-4">
                      <CardHeader>
                        <CardTitle>Добавить сотрудника</CardTitle>
                        <CardDescription>Заполните информацию о новом сотруднике</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-foreground">Имя</label>
                          <Input
                            value={newUserData.name}
                            onChange={(e) => setNewUserData({ ...newUserData, name: e.target.value })}
                            placeholder="Введите имя"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground">Email</label>
                          <Input
                            value={newUserData.email}
                            onChange={(e) => setNewUserData({ ...newUserData, email: e.target.value })}
                            placeholder="email@company.com"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground">Роль</label>
                          <Select
                            value={newUserData.role}
                            onValueChange={(value) => setNewUserData({ ...newUserData, role: value })}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Выберите роль" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="member">Сотрудник</SelectItem>
                              <SelectItem value="manager">Менеджер</SelectItem>
                              <SelectItem value="admin">Администратор</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground">Отдел</label>
                          <Select
                            value={newUserData.department}
                            onValueChange={(value) => setNewUserData({ ...newUserData, department: value })}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Выберите отдел" />
                            </SelectTrigger>
                            <SelectContent>
                              {departments.map((dept) => (
                                <SelectItem key={dept.name} value={dept.name}>
                                  {dept.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex space-x-2 pt-4">
                          <Button onClick={handleAddUser} className="flex-1">
                            Добавить
                          </Button>
                          <Button variant="outline" onClick={() => setShowAddUserModal(false)} className="flex-1">
                            Отмена
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <FloatingActionMenu />
    </div>
  )
}
