"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  TrendingUp,
  FileText,
  Settings,
  Bell,
  Plus,
  Search,
  Target,
  DollarSign,
  Briefcase,
  MessageSquare,
  Home,
  Shield,
  LogOut,
  Menu,
  Sparkles,
  Bot,
  Send,
  UserPlus,
  Rocket,
  CheckSquare,
  Brain,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import { ContentGenerator } from "@/components/ai-tools/content-generator"
import { SalesManager } from "@/components/business-tools/sales-manager"
import { FinanceManager } from "@/components/business-tools/finance-manager"
import { FeatureGuide } from "@/components/help/feature-guide"
import { ThemeToggle } from "@/components/theme-toggle"
import { TooltipProvider } from "@/components/ui/tooltip"
import { TaskManager } from "@/components/task-tracker/task-manager"
import { FileManager } from "@/components/file-storage/file-manager"
import { AnimatedMetrics } from "@/components/interactive/animated-metrics"
import { AIToolsShowcase } from "@/components/interactive/ai-tools-showcase"
import { InteractiveTour } from "@/components/guide/interactive-tour"
import { AIBusinessStrategist } from "@/components/business-strategy/ai-business-strategist"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState(3)
  const [showNotificationsModal, setShowNotificationsModal] = useState(false)
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false)
  const [showAssignRoleModal, setShowAssignRoleModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [showAddProjectModal, setShowAddProjectModal] = useState(false)
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false)
  const [showAddLeadModal, setShowAddLeadModal] = useState(false)
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Автоматизация продаж",
      status: "В работе",
      progress: 75,
      team: ["А", "М"],
      deadline: "2024-02-15",
    },
    {
      id: 2,
      name: "ИИ-чатбот поддержки",
      status: "Планирование",
      progress: 25,
      team: ["Е", "Д"],
      deadline: "2024-03-01",
    },
    {
      id: 3,
      name: "Аналитика клиентов",
      status: "Завершен",
      progress: 100,
      team: ["А", "Д"],
      deadline: "2024-01-30",
    },
  ])
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "ООО Технологии",
      email: "contact@tech.com",
      phone: "+7 (999) 123-45-67",
      status: "Новый",
      value: 150000,
      source: "Сайт",
    },
    {
      id: 2,
      name: "ИП Иванов",
      email: "ivanov@mail.com",
      phone: "+7 (999) 765-43-21",
      status: "В работе",
      value: 75000,
      source: "Реклама",
    },
  ])
  const [newProject, setNewProject] = useState({ name: "", deadline: "", team: [] })
  const [newRole, setNewRole] = useState({ name: "", permissions: [] })
  const [newLead, setNewLead] = useState({ name: "", email: "", phone: "", value: "", source: "Сайт" })
  const [userSettings, setUserSettings] = useState({
    name: "Пользователь",
    email: "user@example.com",
    company: "Моя компания",
  })

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Анна Петрова",
      email: "anna@company.com",
      role: "Менеджер",
      status: "Активен",
      avatar: "А",
      productivity: 95,
    },
    {
      id: 2,
      name: "Михаил Сидоров",
      email: "mikhail@company.com",
      role: "Разработчик",
      status: "Активен",
      avatar: "М",
      productivity: 88,
    },
    {
      id: 3,
      name: "Елена Козлова",
      email: "elena@company.com",
      role: "Дизайнер",
      status: "Отпуск",
      avatar: "Е",
      productivity: 92,
    },
    {
      id: 4,
      name: "Дмитрий Волков",
      email: "dmitry@company.com",
      role: "Аналитик",
      status: "Активен",
      avatar: "Д",
      productivity: 90,
    },
  ])
  const [newEmployee, setNewEmployee] = useState({ name: "", email: "", role: "Сотрудник" })
  const [availableRoles] = useState(["Администратор", "Менеджер", "Разработчик", "Дизайнер", "Аналитик", "Сотрудник"])

  const [notificationsList, setNotificationsList] = useState([
    {
      id: 1,
      title: "Новый проект создан",
      message: "Проект 'Автоматизация продаж' был успешно создан",
      time: "5 минут назад",
      type: "success",
      read: false,
    },
    {
      id: 2,
      title: "Задача просрочена",
      message: "Задача 'Настройка CRM' просрочена на 2 дня",
      time: "1 час назад",
      type: "warning",
      read: false,
    },
    {
      id: 3,
      title: "Новое сообщение",
      message: "Получено сообщение от клиента ООО Технологии",
      time: "3 часа назад",
      type: "info",
      read: false,
    },
  ])

  const [isDemoMode, setIsDemoMode] = useState(true)

  const handleAddProject = () => {
    if (newProject.name && newProject.deadline) {
      const project = {
        id: projects.length + 1,
        name: newProject.name,
        status: "Планирование",
        progress: 0,
        team: newProject.team,
        deadline: newProject.deadline,
      }
      setProjects([...projects, project])
      setNewProject({ name: "", deadline: "", team: [] })
      setShowAddProjectModal(false)
    }
  }

  const handleCreateRole = () => {
    if (newRole.name) {
      console.log("Создана новая роль:", newRole)
      setNewRole({ name: "", permissions: [] })
      setShowCreateRoleModal(false)
    }
  }

  const handleAddLead = () => {
    if (newLead.name && newLead.email) {
      const lead = {
        id: leads.length + 1,
        name: newLead.name,
        email: newLead.email,
        phone: newLead.phone,
        status: "Новый",
        value: Number.parseInt(newLead.value) || 0,
        source: newLead.source,
      }
      setLeads([...leads, lead])
      setNewLead({ name: "", email: "", phone: "", value: "", source: "Сайт" })
      setShowAddLeadModal(false)
    }
  }

  const handleSaveSettings = () => {
    console.log("Настройки сохранены:", userSettings)
    alert("Настройки успешно сохранены!")
  }

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.email) {
      const employee = {
        id: employees.length + 1,
        name: newEmployee.name,
        email: newEmployee.email,
        role: newEmployee.role,
        status: "Активен",
        avatar: newEmployee.name.charAt(0).toUpperCase(),
        productivity: Math.floor(Math.random() * 20) + 80,
      }
      setEmployees([...employees, employee])
      setNewEmployee({ name: "", email: "", role: "Сотрудник" })
      setShowAddEmployeeModal(false)
    }
  }

  const handleAssignRole = (employeeId, newRole) => {
    setEmployees(employees.map((emp) => (emp.id === employeeId ? { ...emp, role: newRole } : emp)))
    setShowAssignRoleModal(false)
    setSelectedEmployee(null)
  }

  const handleRemoveEmployee = (employeeId) => {
    setEmployees(employees.filter((emp) => emp.id !== employeeId))
  }

  const markNotificationAsRead = (id: number) => {
    setNotificationsList((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
    const unreadCount = notificationsList.filter((n) => !n.read && n.id !== id).length
    setNotifications(unreadCount)
  }

  const markAllAsRead = () => {
    setNotificationsList((prev) => prev.map((notif) => ({ ...notif, read: true })))
    setNotifications(0)
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckSquare className="w-4 h-4 text-green-500" />
      case "warning":
        return <Bell className="w-4 h-4 text-yellow-500" />
      case "info":
        return <MessageSquare className="w-4 h-4 text-blue-500" />
      default:
        return <Bell className="w-4 h-4 text-gray-500" />
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Загрузка данных платформы...</p>
        </div>
      </div>
    )
  }

  const NavigationMenu = ({ onItemClick }: { onItemClick?: () => void }) => (
    <div className="space-y-2">
      {[
        { key: "overview", icon: Briefcase, label: "Обзор бизнеса", badge: null },
        { key: "strategy", icon: Brain, label: "ИИ-стратег", badge: "NEW" },
        { key: "tools", icon: Rocket, label: "ИИ-инструменты", badge: 5 },
        { key: "sales", icon: TrendingUp, label: "Продажи", badge: 156 },
        { key: "finance", icon: DollarSign, label: "Финансы", badge: null },
        { key: "projects", icon: Target, label: "Активные проекты", badge: 3 },
        { key: "tasks", icon: CheckSquare, label: "Управление задачами", badge: 8 },
        { key: "files", icon: FileText, label: "Файловое хранилище", badge: 24 },
        { key: "team", icon: Users, label: "Команда", badge: null },
        { key: "roles", icon: Shield, label: "Роли и права", badge: null },
        { key: "chat", icon: MessageSquare, label: "ИИ-консультант", badge: null },
        { key: "settings", icon: Settings, label: "Настройки", badge: null },
      ].map((item) => (
        <Button
          key={item.key}
          variant={activeTab === item.key ? "default" : "ghost"}
          className={`w-full justify-start transition-all duration-300 text-sm py-3 px-4 h-auto ${
            activeTab === item.key
              ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25"
              : "text-foreground hover:bg-accent/50"
          }`}
          onClick={() => {
            setActiveTab(item.key)
            onItemClick?.()
          }}
        >
          <item.icon className="w-4 h-4 mr-3 flex-shrink-0" />
          <span className="flex-1 text-left truncate">{item.label}</span>
          {item.badge && (
            <Badge
              variant={item.badge === "NEW" ? "default" : "secondary"}
              className={`ml-2 text-xs flex-shrink-0 min-w-[20px] justify-center ${
                item.badge === "NEW" ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white animate-pulse" : ""
              }`}
            >
              {item.badge}
            </Badge>
          )}
        </Button>
      ))}
    </div>
  )

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <header className="bg-card/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50 shadow-lg shadow-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
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

                <Link
                  href="/"
                  className="flex items-center space-x-2 hover:opacity-80 transition-all duration-300 group"
                >
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
                  {isDemoMode ? "Демо-режим" : "Бизнес-платформа"}
                </Badge>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Поиск..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-48 lg:w-64 bg-background/50 border-border/50 focus:border-primary/50"
                  />
                </div>

                <div className="flex items-center space-x-1">
                  <InteractiveTour />
                  <FeatureGuide />
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-muted/80 dark:hover:bg-muted/40 transition-colors duration-200"
                  onClick={() => {
                    setShowNotificationsModal(true)
                    console.log("[v0] Notifications button clicked")
                  }}
                >
                  <Bell className="h-5 w-5 text-foreground" />
                  {notifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500 text-white border-2 border-background animate-pulse">
                      {notifications}
                    </Badge>
                  )}
                </Button>

                <ThemeToggle />

                <div className="hidden md:flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">Д</span>
                  </div>
                  <span className="text-foreground font-medium max-w-24 truncate">Демо-пользователь</span>
                </div>

                <Button
                  onClick={() => (window.location.href = "/login")}
                  variant="outline"
                  size="sm"
                  className="border-border/50 hover:border-primary/50 hover:bg-muted/50 dark:hover:bg-muted/30 dark:hover:border-primary/70 transition-all duration-200"
                >
                  <LogOut className="w-4 h-4 sm:mr-2 text-foreground" />
                  <span className="hidden sm:inline text-foreground">Войти</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Главная</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Бизнес-платформа</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="hidden lg:block lg:col-span-1 xl:col-span-1">
              <Card className="enhanced-sidebar enhanced-card backdrop-blur-xl border border-border/50 shadow-xl shadow-primary/5 sticky top-24 min-w-[280px] w-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-foreground font-bold text-lg flex items-center">
                    <div className="p-2 bg-primary/10 rounded-lg mr-3 flex-shrink-0">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <span className="truncate">Управление бизнесом</span>
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm">Ваша ИИ-платформа роста</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <NavigationMenu />
                </CardContent>
              </Card>
            </div>

            <div className="col-span-1 lg:col-span-3 xl:col-span-3">
              {activeTab === "overview" && (
                <div className="space-y-6 sm:space-y-8">
                  <AnimatedMetrics />
                  <AIToolsShowcase />
                </div>
              )}

              {activeTab === "strategy" && <AIBusinessStrategist />}

              {activeTab === "tools" && (
                <div className="space-y-6 sm:space-y-8">
                  <AIToolsShowcase />
                  <Card className="enhanced-card backdrop-blur-xl border border-border/50">
                    <CardHeader>
                      <CardTitle>Активные ИИ-инструменты</CardTitle>
                      <CardDescription>Управление и мониторинг ИИ-инструментов</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ContentGenerator />
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "tasks" && <TaskManager />}
              {activeTab === "files" && <FileManager />}
              {activeTab === "sales" && <SalesManager />}
              {activeTab === "finance" && <FinanceManager />}

              {activeTab === "chat" && (
                <Card className="enhanced-card backdrop-blur-sm border border-border/50 h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center text-foreground">
                      <Bot className="w-5 h-5 mr-2 text-primary" />
                      ИИ-консультант по бизнесу
                    </CardTitle>
                    <CardDescription>Персональный помощник для роста вашего бизнеса</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ScrollArea className="flex-1 mb-4 p-4 enhanced-input rounded-lg bg-background/50">
                      <div className="space-y-4">
                        <div className="flex justify-start">
                          <div className="enhanced-card text-foreground p-3 rounded-lg max-w-[80%]">
                            Добро пожаловать в вашу ИИ-платформу! Я помогу оптимизировать ваш бизнес. С чего начнем?
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                    <div className="flex space-x-2">
                      <Input placeholder="Спросите о развитии бизнеса..." className="enhanced-input" />
                      <Button size="icon">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "team" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground truncate">Управление командой</h2>
                      <p className="text-sm sm:text-base text-muted-foreground">Сотрудники, роли и права доступа</p>
                    </div>
                    <Button
                      className="bg-primary hover:bg-primary/90 w-full sm:w-auto shrink-0"
                      onClick={() => setShowAddEmployeeModal(true)}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      <span className="hidden sm:inline">Добавить сотрудника</span>
                      <span className="sm:hidden">Добавить</span>
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    <div className="xl:col-span-2">
                      <Card className="enhanced-card backdrop-blur-sm border border-border/50">
                        <CardHeader>
                          <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <span className="text-lg sm:text-xl">Команда ({employees.length})</span>
                            <Badge variant="secondary" className="self-start sm:self-center">
                              {employees.filter((e) => e.status === "Активен").length} активных
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            {employees.map((employee) => (
                              <div
                                key={employee.id}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-background/50 rounded-lg border border-border/30"
                              >
                                <div className="flex items-center space-x-4 flex-1 min-w-0">
                                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shrink-0">
                                    <span className="text-sm font-bold text-white">{employee.avatar}</span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-foreground truncate text-sm sm:text-base">
                                      {employee.name}
                                    </h4>
                                    <p className="text-xs sm:text-sm text-muted-foreground truncate">
                                      {employee.email}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-2 mt-1">
                                      <Badge variant="outline" className="text-xs">
                                        {employee.role}
                                      </Badge>
                                      <Badge
                                        variant={employee.status === "Активен" ? "default" : "secondary"}
                                        className="text-xs"
                                      >
                                        {employee.status}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end space-x-2 shrink-0">
                                  <div className="text-left sm:text-right">
                                    <p className="text-sm font-medium">{employee.productivity}%</p>
                                    <p className="text-xs text-muted-foreground">Продуктивность</p>
                                  </div>
                                  <div className="flex space-x-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => {
                                        setSelectedEmployee(employee)
                                        setShowAssignRoleModal(true)
                                      }}
                                      className="text-xs px-2"
                                    >
                                      Роль
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleRemoveEmployee(employee.id)}
                                      className="text-red-600 hover:text-red-700 text-xs px-2"
                                    >
                                      <span className="hidden sm:inline">Удалить</span>
                                      <span className="sm:hidden">×</span>
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div className="space-y-6">
                      <Card className="enhanced-card backdrop-blur-sm border border-border/50">
                        <CardHeader>
                          <CardTitle className="text-base sm:text-lg">Статистика команды</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-xs sm:text-sm text-muted-foreground">Всего сотрудников</span>
                              <span className="font-bold text-sm sm:text-base">{employees.length}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs sm:text-sm text-muted-foreground">Активных</span>
                              <span className="font-bold text-green-600 text-sm sm:text-base">
                                {employees.filter((e) => e.status === "Активен").length}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs sm:text-sm text-muted-foreground">Средняя продуктивность</span>
                              <span className="font-bold text-sm sm:text-base">
                                {Math.round(
                                  employees.reduce((acc, emp) => acc + emp.productivity, 0) / employees.length,
                                )}
                                %
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="enhanced-card backdrop-blur-sm border border-border/50">
                        <CardHeader>
                          <CardTitle className="text-base sm:text-lg">Роли в команде</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {availableRoles.map((role) => {
                              const count = employees.filter((emp) => emp.role === role).length
                              return (
                                <div key={role} className="flex justify-between items-center">
                                  <span className="text-xs sm:text-sm truncate flex-1 mr-2">{role}</span>
                                  <Badge variant="secondary" className="shrink-0">
                                    {count}
                                  </Badge>
                                </div>
                              )
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "projects" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground">Активные проекты</h2>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        Отслеживайте прогресс ваших ИИ-проектов
                      </p>
                    </div>
                    <Button
                      className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
                      onClick={() => setShowAddProjectModal(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Новый проект
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <Card key={project.id} className="enhanced-card backdrop-blur-xl border border-border/50">
                        <CardHeader>
                          <CardTitle className="text-lg truncate">{project.name}</CardTitle>
                          <div className="flex items-center justify-between">
                            <Badge
                              variant={
                                project.status === "Завершен"
                                  ? "default"
                                  : project.status === "В работе"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {project.status}
                            </Badge>
                            <span className="text-sm text-muted-foreground">до {project.deadline}</span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-1">
                                <span>Прогресс</span>
                                <span>{project.progress}%</span>
                              </div>
                              <div className="w-full bg-secondary rounded-full h-2">
                                <div
                                  className="bg-primary h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex -space-x-2">
                                {project.team.map((member, index) => (
                                  <div
                                    key={index}
                                    className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center border-2 border-background"
                                  >
                                    <span className="text-xs font-bold text-white">{member}</span>
                                  </div>
                                ))}
                              </div>
                              <Button variant="outline" size="sm">
                                Подробнее
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "roles" && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl sm:text-2xl font-bold text-foreground">Роли и права доступа</h2>
                      <p className="text-sm sm:text-base text-muted-foreground">
                        Управление правами пользователей и безопасностью
                      </p>
                    </div>
                    <Button
                      className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
                      onClick={() => setShowCreateRoleModal(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Создать роль
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {availableRoles.map((role) => {
                      const userCount = employees.filter((emp) => emp.role === role).length
                      return (
                        <Card key={role} className="enhanced-card backdrop-blur-sm border border-border/50">
                          <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                              <span className="text-lg">{role}</span>
                              <Badge variant="secondary">{userCount} польз.</Badge>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              <div className="text-sm text-muted-foreground">Права доступа для роли "{role}"</div>
                              <div className="flex flex-wrap gap-2">
                                {role === "Администратор" && (
                                  <>
                                    <Badge variant="outline">Полный доступ</Badge>
                                    <Badge variant="outline">Управление пользователями</Badge>
                                    <Badge variant="outline">Настройки системы</Badge>
                                  </>
                                )}
                                {role === "Менеджер" && (
                                  <>
                                    <Badge variant="outline">Управление проектами</Badge>
                                    <Badge variant="outline">Просмотр отчетов</Badge>
                                    <Badge variant="outline">Управление командой</Badge>
                                  </>
                                )}
                                {role === "Сотрудник" && (
                                  <>
                                    <Badge variant="outline">Базовый доступ</Badge>
                                    <Badge variant="outline">Просмотр задач</Badge>
                                  </>
                                )}
                              </div>
                              <Button variant="outline" size="sm" className="w-full bg-transparent">
                                Редактировать права
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-6">
                  <Card className="enhanced-card backdrop-blur-sm border border-border/50">
                    <CardHeader>
                      <CardTitle>Настройки аккаунта</CardTitle>
                      <CardDescription>Управление профилем и предпочтениями</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Имя</label>
                          <Input
                            value={userSettings.name}
                            onChange={(e) => setUserSettings({ ...userSettings, name: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Email</label>
                          <Input
                            value={userSettings.email}
                            onChange={(e) => setUserSettings({ ...userSettings, email: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Компания</label>
                        <Input
                          value={userSettings.company}
                          onChange={(e) => setUserSettings({ ...userSettings, company: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <Button className="bg-primary hover:bg-primary/90" onClick={handleSaveSettings}>
                        Сохранить изменения
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="enhanced-card backdrop-blur-sm border border-border/50">
                    <CardHeader>
                      <CardTitle>Уведомления</CardTitle>
                      <CardDescription>Настройка уведомлений и оповещений</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email уведомления</p>
                          <p className="text-sm text-muted-foreground">Получать уведомления на почту</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Включено
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Push уведомления</p>
                          <p className="text-sm text-muted-foreground">Уведомления в браузере</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Отключено
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>

        <Dialog open={showNotificationsModal} onOpenChange={setShowNotificationsModal}>
          <DialogContent className="max-w-md mx-4 max-h-[80vh] overflow-y-auto enhanced-modal">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <DialogTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Уведомления
                </DialogTitle>
                {notifications > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs hover:bg-primary/10">
                    Отметить все как прочитанные
                  </Button>
                )}
              </div>
            </DialogHeader>

            <ScrollArea className="max-h-96">
              <div className="space-y-3">
                {notificationsList.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">Нет новых уведомлений</p>
                  </div>
                ) : (
                  notificationsList.map((notification) => (
                    <Card
                      key={notification.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md enhanced-card ${
                        notification.read ? "bg-card/30 border-border/30" : "bg-card/80 border-primary/20 shadow-sm"
                      }`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4
                                className={`text-sm font-medium truncate ${
                                  notification.read ? "text-muted-foreground" : "text-foreground"
                                }`}
                              >
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 ml-2" />
                              )}
                            </div>
                            <p
                              className={`text-xs mb-2 break-words ${
                                notification.read ? "text-muted-foreground/70" : "text-muted-foreground"
                              }`}
                            >
                              {notification.message}
                            </p>
                            <p className="text-xs text-muted-foreground/60">{notification.time}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </ScrollArea>

            {notificationsList.length > 0 && (
              <div className="flex justify-center pt-4 border-t border-border/50">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs hover:bg-primary/10 bg-transparent"
                  onClick={() => {
                    console.log("[v0] View all notifications clicked")
                    setShowNotificationsModal(false)
                  }}
                >
                  Посмотреть все уведомления
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {showAddEmployeeModal && (
          <Dialog open={showAddEmployeeModal} onOpenChange={setShowAddEmployeeModal}>
            <DialogContent className="max-w-md mx-4">
              <DialogHeader>
                <DialogTitle>Добавить сотрудника</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Имя</label>
                  <Input
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                    placeholder="Введите имя"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                    placeholder="Введите email"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Роль</label>
                  <select
                    value={newEmployee.role}
                    onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                    className="w-full mt-1 p-2 border border-border rounded-md bg-background"
                  >
                    {availableRoles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddEmployeeModal(false)
                    setNewEmployee({ name: "", email: "", role: "Сотрудник" })
                  }}
                >
                  Отмена
                </Button>
                <Button onClick={handleAddEmployee}>Добавить</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {showAssignRoleModal && selectedEmployee && (
          <Dialog open={showAssignRoleModal} onOpenChange={setShowAssignRoleModal}>
            <DialogContent className="max-w-md mx-4">
              <DialogHeader>
                <DialogTitle>Назначить роль</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Назначить роль для {selectedEmployee.name}</p>
                <div>
                  <label className="text-sm font-medium">Выберите роль</label>
                  <select
                    defaultValue={selectedEmployee.role}
                    onChange={(e) => handleAssignRole(selectedEmployee.id, e.target.value)}
                    className="w-full mt-1 p-2 border border-border rounded-md bg-background"
                  >
                    {availableRoles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAssignRoleModal(false)
                    setSelectedEmployee(null)
                  }}
                >
                  Отмена
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </TooltipProvider>
  )
}
