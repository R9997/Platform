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
  UserPlus,
  Rocket,
  CheckSquare,
  Brain,
  X,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
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
import { AIBusinessAgent } from "@/components/ai-agent/ai-business-agent"
import { SupportChat } from "@/components/support/support-chat"
import { GanttChart } from "@/components/project-management/gantt-chart"
import { HRDashboard } from "@/components/hr-management/hr-dashboard"
import EDODashboard from "@/components/edo/edo-dashboard"
import LegalDashboard from "@/components/legal/legal-dashboard"
import StrategyDashboard from "@/components/strategy/strategy-dashboard"
import MarketingDashboard from "@/components/marketing/marketing-dashboard"

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

  const [newProject, setNewProject] = useState({
    name: "",
    deadline: "",
    team: [],
    description: "",
  })
  const [showProjectDetailsModal, setShowProjectDetailsModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)

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
  const [availableRoles, setAvailableRoles] = useState([
    "Администратор",
    "Менеджер",
    "Разработчик",
    "Дизайнер",
    "Аналитик",
    "Сотрудник",
  ])

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
      setAvailableRoles([...availableRoles, newRole.name])
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
        { key: "goals", icon: Target, label: "🎯 Стратегия и цели", badge: "NEW" },
        { key: "strategy", icon: Brain, label: "ИИ-Агент для бизнеса", badge: "NEW" },
        { key: "tools", icon: Rocket, label: "ИИ-инструменты", badge: 5 },
        { key: "sales", icon: TrendingUp, label: "Продажи", badge: 156 },
        { key: "finance", icon: DollarSign, label: "Финансы", badge: null },
        { key: "marketing", icon: MessageSquare, label: "📣 Маркетинг и клиенты", badge: "NEW" },
        { key: "projects", icon: Target, label: "Активные проекты", badge: 3 },
        { key: "tasks", icon: CheckSquare, label: "Управление задачами", badge: 8 },
        { key: "files", icon: FileText, label: "Файловое хранилище", badge: 24 },
        { key: "edo", icon: FileText, label: "ЭДО | Документооборот", badge: "NEW" },
        { key: "legal", icon: Shield, label: "⚖️ Правовой контур", badge: "NEW" },
        { key: "team", icon: Users, label: "Команда", badge: null },
        { key: "hr", icon: Users, label: "HR и развитие команды", badge: "NEW" },
        { key: "roles", icon: Shield, label: "Роли и права", badge: null },
        { key: "settings", icon: Settings, label: "Настройки", badge: null },
      ].map((item, index) => (
        <Button
          key={item.key}
          variant={activeTab === item.key ? "default" : "ghost"}
          className={`w-full justify-start transition-colors duration-300 ease-out text-sm py-3 px-4 h-auto ${
            activeTab === item.key
              ? "bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground shadow-lg"
              : "text-foreground"
          }`}
          onClick={() => {
            setActiveTab(item.key)
            onItemClick?.()
          }}
        >
          <item.icon
            className={`w-4 h-4 mr-3 flex-shrink-0 transition-colors duration-300 ${activeTab === item.key ? "" : ""}`}
          />
          <span className="flex-1 text-left truncate font-medium">{item.label}</span>
          {item.badge && (
            <Badge
              variant={item.badge === "NEW" ? "default" : "secondary"}
              className={`ml-2 text-xs flex-shrink-0 min-w-[20px] justify-center transition-colors duration-300 ${
                item.badge === "NEW"
                  ? "bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white shadow-lg shadow-purple-500/30"
                  : "bg-gradient-to-r from-accent to-accent/80"
              }`}
            >
              {item.badge}
            </Badge>
          )}
        </Button>
      ))}
    </div>
  )

  const handleViewProjectDetails = (project) => {
    setSelectedProject(project)
    setShowProjectDetailsModal(true)
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/95 relative overflow-hidden container-fix">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/3 to-accent/3 rounded-full blur-3xl animate-spin"
            style={{ animationDuration: "20s" }}
          ></div>
        </div>

        <header className="bg-card/90 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50 shadow-xl shadow-primary/10 relative">
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <Menu className="h-5 w-5" />
                </Button>

                <Link href="/" className="flex items-center space-x-2 transition-opacity duration-300">
                  <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl transition-colors duration-300">
                    <Home className="h-5 w-5 text-primary" />
                  </div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent hidden sm:block">
                    Рефрейм Бюро
                  </h1>
                </Link>
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 text-primary border-primary/30 shadow-lg shadow-primary/10 hidden sm:flex"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  {isDemoMode ? "Демо-режим" : "Бизнес-платформа"}
                </Badge>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 transition-colors duration-300" />
                  <Input
                    placeholder="Поиск..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-48 lg:w-64 bg-background/60 border-border/50 focus:border-primary/50 focus:bg-background/80 transition-all duration-300 focus:shadow-lg focus:shadow-primary/10"
                  />
                </div>

                <div className="flex items-center space-x-1">
                  <InteractiveTour />
                  <FeatureGuide />
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="relative transition-colors duration-300"
                  onClick={() => {
                    setShowNotificationsModal(true)
                    console.log("[v0] Notifications button clicked")
                  }}
                >
                  <Bell className="h-5 w-5 text-foreground" />
                  {notifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-red-500 to-red-600 text-white border-2 border-background shadow-lg shadow-red-500/30">
                      {notifications}
                    </Badge>
                  )}
                </Button>

                <div className="transition-opacity duration-300">
                  <ThemeToggle />
                </div>

                <div className="hidden md:flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary via-accent to-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20 transition-all duration-300">
                    <span className="text-xs font-bold text-white">Д</span>
                  </div>
                  <span className="text-foreground font-medium max-w-24 truncate transition-colors duration-300">
                    Демо-пользователь
                  </span>
                </div>

                <Button
                  onClick={() => (window.location.href = "/login")}
                  variant="outline"
                  size="sm"
                  className="border-border/50 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4 sm:mr-2 text-foreground" />
                  <span className="hidden sm:inline text-foreground">Войти</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-background/95 backdrop-blur-xl animate-in fade-in-0 duration-300">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b border-border/50">
                <h2 className="text-lg font-semibold text-foreground">Меню</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="transition-all duration-300 hover:rotate-90"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <NavigationMenu onItemClick={() => setIsMobileMenuOpen(false)} />
              </div>
            </div>
          </div>
        )}

        <main className="max-w-7xl mx-auto mobile-padding py-4 sm:py-6 lg:py-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            <div className="hidden lg:block lg:col-span-1 xl:col-span-1">
              <Card className="enhanced-sidebar enhanced-card backdrop-blur-xl border border-border/50 shadow-2xl shadow-primary/10 sticky top-24 min-w-[280px] w-full overflow-hidden transition-shadow duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-0 transition-opacity duration-500"></div>

                <CardHeader className="pb-4 relative z-10">
                  <CardTitle className="text-foreground font-bold text-lg flex items-center">
                    <div className="p-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl mr-3 flex-shrink-0 transition-colors duration-300">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    <span className="truncate bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                      Управление бизнесом
                    </span>
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm">Ваша ИИ-платформа роста</CardDescription>
                </CardHeader>
                <CardContent className="pt-0 relative z-10">
                  <NavigationMenu />
                </CardContent>
              </Card>
            </div>

            <div className="col-span-1 lg:col-span-3 xl:col-span-3">
              <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
                {activeTab === "overview" && (
                  <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                    <div className="animate-in fade-in-0 slide-in-from-left-4 duration-500">
                      <AnimatedMetrics />
                    </div>
                    <div
                      className="animate-in fade-in-0 slide-in-from-right-4 duration-500"
                      style={{ animationDelay: "200ms" }}
                    >
                      <AIToolsShowcase />
                    </div>
                  </div>
                )}

                {activeTab === "strategy" && (
                  <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                    <AIBusinessAgent />
                  </div>
                )}

                {activeTab === "goals" && (
                  <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                    <StrategyDashboard />
                  </div>
                )}

                {activeTab === "tools" && (
                  <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                    <AIToolsShowcase />
                    <Card className="enhanced-card backdrop-blur-xl border border-border/50">
                      <CardHeader className="pb-3 sm:pb-4">
                        <CardTitle className="text-base sm:text-lg lg:text-xl overflow-fix">
                          Активные ИИ-инструменты
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm overflow-fix">
                          Управление и мониторинг ИИ-инструментов
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ContentGenerator />
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "tasks" && <TaskManager />}
                {activeTab === "files" && <FileManager />}
                {activeTab === "sales" && <SalesManager />}
                {activeTab === "finance" && <FinanceManager />}

                {activeTab === "team" && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex flex-col gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground overflow-fix">
                          Управление командой
                        </h2>
                        <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-1 overflow-fix">
                          Сотрудники, роли и права доступа
                        </p>
                      </div>
                      <Button
                        className="bg-primary hover:bg-primary/90 w-full sm:w-auto text-sm sm:text-base button-responsive"
                        onClick={() => setShowAddEmployeeModal(true)}
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        <span>Добавить сотрудника</span>
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 grid-responsive">
                      <div className="xl:col-span-2">
                        <Card className="enhanced-card backdrop-blur-sm border border-border/50 card-responsive">
                          <CardHeader className="pb-3 sm:pb-4">
                            <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <span className="text-base sm:text-lg lg:text-xl overflow-fix">
                                Команда ({employees.length})
                              </span>
                              <Badge variant="secondary" className="self-start sm:self-center text-xs">
                                {employees.filter((e) => e.status === "Активен").length} активных
                              </Badge>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="space-y-3 sm:space-y-4">
                              {employees.map((employee) => (
                                <div
                                  key={employee.id}
                                  className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 p-3 sm:p-4 bg-background/50 rounded-lg border border-border/30 overflow-fix"
                                >
                                  <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shrink-0">
                                      <span className="text-xs sm:text-sm font-bold text-white">{employee.avatar}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-medium text-foreground truncate text-sm sm:text-base">
                                        {employee.name}
                                      </h4>
                                      <p className="text-xs text-muted-foreground truncate">{employee.email}</p>
                                      <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                                        <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                          {employee.role}
                                        </Badge>
                                        <Badge
                                          variant={employee.status === "Активен" ? "default" : "secondary"}
                                          className="text-xs px-1.5 py-0.5"
                                        >
                                          {employee.status}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
                                    <div className="text-left sm:text-right">
                                      <p className="text-sm font-medium">{employee.productivity}%</p>
                                      <p className="text-xs text-muted-foreground">Продуктивность</p>
                                    </div>
                                    <div className="flex gap-1 sm:gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                          setSelectedEmployee(employee)
                                          setShowAssignRoleModal(true)
                                        }}
                                        className="text-xs px-2 py-1 h-auto"
                                      >
                                        Роль
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleRemoveEmployee(employee.id)}
                                        className="text-red-600 hover:text-red-700 text-xs px-2 py-1 h-auto"
                                      >
                                        ×
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="space-y-4 sm:space-y-6">
                        <Card className="enhanced-card backdrop-blur-sm border border-border/50 card-responsive">
                          <CardHeader className="pb-3 sm:pb-4">
                            <CardTitle className="text-sm sm:text-base lg:text-lg overflow-fix">
                              Статистика команды
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="space-y-3 sm:space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-xs sm:text-sm text-muted-foreground overflow-fix">
                                  Всего сотрудников
                                </span>
                                <span className="font-bold text-sm sm:text-base">{employees.length}</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs sm:text-sm text-muted-foreground overflow-fix">Активных</span>
                                <span className="font-bold text-green-600 text-sm sm:text-base">
                                  {employees.filter((e) => e.status === "Активен").length}
                                </span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-xs sm:text-sm text-muted-foreground overflow-fix">
                                  Средняя продуктивность
                                </span>
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

                        <Card className="enhanced-card backdrop-blur-sm border border-border/50 card-responsive">
                          <CardHeader className="pb-3 sm:pb-4">
                            <CardTitle className="text-sm sm:text-base lg:text-lg overflow-fix">
                              Роли в команде
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="space-y-2">
                              {availableRoles.map((role) => {
                                const count = employees.filter((emp) => emp.role === role).length
                                return (
                                  <div key={role} className="flex justify-between items-center">
                                    <span className="text-xs sm:text-sm truncate flex-1 mr-2 overflow-fix">{role}</span>
                                    <Badge variant="secondary" className="shrink-0 text-xs px-1.5 py-0.5">
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
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex flex-col gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">Активные проекты</h2>
                        <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-1">
                          Отслеживайте прогресс ваших ИИ-проектов
                        </p>
                      </div>
                      <Button
                        className="bg-primary hover:bg-primary/90 w-full sm:w-auto text-sm sm:text-base"
                        onClick={() => setShowAddProjectModal(true)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Новый проект
                      </Button>
                    </div>

                    <GanttChart projects={projects} />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                      {projects.map((project) => (
                        <Card key={project.id} className="enhanced-card backdrop-blur-xl border border-border/50">
                          <CardHeader className="pb-3 sm:pb-4">
                            <CardTitle className="text-base sm:text-lg truncate">{project.name}</CardTitle>
                            <div className="flex items-center justify-between gap-2">
                              <Badge
                                variant={
                                  project.status === "Завершен"
                                    ? "default"
                                    : project.status === "В работе"
                                      ? "secondary"
                                      : "outline"
                                }
                                className="text-xs px-1.5 py-0.5"
                              >
                                {project.status}
                              </Badge>
                              <span className="text-xs sm:text-sm text-muted-foreground">до {project.deadline}</span>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="space-y-3 sm:space-y-4">
                              <div>
                                <div className="flex justify-between text-xs sm:text-sm mb-1">
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
                                <div className="flex -space-x-1 sm:-space-x-2">
                                  {project.team.map((member, index) => (
                                    <div
                                      key={index}
                                      className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center border-2 border-background"
                                    >
                                      <span className="text-xs font-bold text-white">{member}</span>
                                    </div>
                                  ))}
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewProjectDetails(project)}
                                  className="text-xs px-2 py-1 h-auto"
                                >
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
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex flex-col gap-3 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground">
                          Роли и права доступа
                        </h2>
                        <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-1">
                          Управление правами пользователей и безопасностью
                        </p>
                      </div>
                      <Button
                        className="bg-primary hover:bg-primary/90 w-full sm:w-auto text-sm sm:text-base"
                        onClick={() => setShowCreateRoleModal(true)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Создать роль
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                      {availableRoles.map((role) => {
                        const userCount = employees.filter((emp) => emp.role === role).length
                        return (
                          <Card key={role} className="enhanced-card backdrop-blur-sm border border-border/50">
                            <CardHeader className="pb-3 sm:pb-4">
                              <CardTitle className="flex items-center justify-between">
                                <span className="text-base sm:text-lg truncate mr-2">{role}</span>
                                <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                                  {userCount} польз.
                                </Badge>
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0">
                              <div className="space-y-3">
                                <div className="text-xs sm:text-sm text-muted-foreground">
                                  Права доступа для роли "{role}"
                                </div>
                                <div className="flex flex-wrap gap-1 sm:gap-2">
                                  {role === "Администратор" && (
                                    <>
                                      <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                        Полный доступ
                                      </Badge>
                                      <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                        Управление пользователями
                                      </Badge>
                                      <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                        Настройки системы
                                      </Badge>
                                    </>
                                  )}
                                  {role === "Менеджер" && (
                                    <>
                                      <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                        Управление проектами
                                      </Badge>
                                      <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                        Просмотр отчетов
                                      </Badge>
                                      <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                        Управление командой
                                      </Badge>
                                    </>
                                  )}
                                  {role === "Сотрудник" && (
                                    <>
                                      <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                        Базовый доступ
                                      </Badge>
                                      <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                        Просмотр задач
                                      </Badge>
                                    </>
                                  )}
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full bg-transparent text-xs sm:text-sm h-8"
                                >
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
                  <div className="space-y-4 sm:space-y-6">
                    <Card className="enhanced-card backdrop-blur-sm border border-border/50">
                      <CardHeader className="pb-3 sm:pb-4">
                        <CardTitle className="text-base sm:text-lg lg:text-xl">Настройки аккаунта</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          Управление профилем и предпочтениями
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-3 sm:space-y-4">
                        <div className="grid grid-cols-1 gap-3 sm:gap-4">
                          <div>
                            <label className="text-xs sm:text-sm font-medium">Имя</label>
                            <Input
                              value={userSettings.name}
                              onChange={(e) => setUserSettings({ ...userSettings, name: e.target.value })}
                              className="mt-1 text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs sm:text-sm font-medium">Email</label>
                            <Input
                              value={userSettings.email}
                              onChange={(e) => setUserSettings({ ...userSettings, email: e.target.value })}
                              className="mt-1 text-sm"
                            />
                          </div>
                          <div>
                            <label className="text-xs sm:text-sm font-medium">Компания</label>
                            <Input
                              value={userSettings.company}
                              onChange={(e) => setUserSettings({ ...userSettings, company: e.target.value })}
                              className="mt-1 text-sm"
                            />
                          </div>
                        </div>
                        <Button
                          className="bg-primary hover:bg-primary/90 w-full sm:w-auto text-sm"
                          onClick={handleSaveSettings}
                        >
                          Сохранить изменения
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="enhanced-card backdrop-blur-sm border border-border/50">
                      <CardHeader className="pb-3 sm:pb-4">
                        <CardTitle className="text-base sm:text-lg lg:text-xl">Уведомления</CardTitle>
                        <CardDescription className="text-xs sm:text-sm">
                          Настройка уведомлений и оповещений
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0 space-y-3 sm:space-y-4">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                          <div className="flex-1">
                            <p className="font-medium text-sm sm:text-base">Email уведомления</p>
                            <p className="text-xs sm:text-sm text-muted-foreground">Получать уведомления на почту</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs sm:text-sm w-full sm:w-auto bg-transparent"
                          >
                            Включено
                          </Button>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                          <div className="flex-1">
                            <p className="font-medium text-sm sm:text-base">Push уведомления</p>
                            <p className="text-xs sm:text-sm text-muted-foreground">Уведомления в браузере</p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs sm:text-sm w-full sm:w-auto bg-transparent"
                          >
                            Отключено
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {activeTab === "hr" && (
                  <div className="animate-in fade-in-0 slide-in-from-right-4 duration-500">
                    <HRDashboard />
                  </div>
                )}

                {activeTab === "edo" && (
                  <div className="animate-in fade-in-0 slide-in-from-right-4 duration-500">
                    <EDODashboard />
                  </div>
                )}

                {activeTab === "legal" && (
                  <div className="animate-in fade-in-0 slide-in-from-right-4 duration-500">
                    <LegalDashboard />
                  </div>
                )}

                {activeTab === "marketing" && (
                  <div className="animate-in fade-in-0 slide-in-from-right-4 duration-500">
                    <MarketingDashboard />
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>

        <Dialog open={showNotificationsModal} onOpenChange={setShowNotificationsModal}>
          <DialogContent className="max-w-[95vw] sm:max-w-md mx-2 sm:mx-4 max-h-[85vh] sm:max-h-[80vh] overflow-y-auto enhanced-modal">
            <DialogHeader className="pb-2 sm:pb-4">
              <div className="flex items-center justify-between gap-2">
                <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  Уведомления
                </DialogTitle>
                {notifications > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={markAllAsRead}
                    className="text-xs hover:bg-primary/10 px-2 py-1 h-auto"
                  >
                    Отметить все
                  </Button>
                )}
              </div>
            </DialogHeader>

            <ScrollArea className="max-h-[60vh] sm:max-h-96">
              <div className="space-y-2 sm:space-y-3">
                {notificationsList.length === 0 ? (
                  <div className="text-center py-6 sm:py-8">
                    <Bell className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-3 sm:mb-4 opacity-50" />
                    <p className="text-muted-foreground text-sm">Нет новых уведомлений</p>
                  </div>
                ) : (
                  notificationsList.map((notification) => (
                    <Card
                      key={notification.id}
                      className={`cursor-pointer transition-all duration-200 enhanced-card ${
                        notification.read ? "bg-card/30 border-border/30" : "bg-card/80 border-primary/20 shadow-sm"
                      }`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-start space-x-2 sm:space-x-3">
                          <div className="flex-shrink-0 mt-0.5 sm:mt-1">{getNotificationIcon(notification.type)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-1 gap-2">
                              <h4
                                className={`text-xs sm:text-sm font-medium break-words ${
                                  notification.read ? "text-muted-foreground" : "text-foreground"
                                }`}
                              >
                                {notification.title}
                              </h4>
                              {!notification.read && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />}
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
              <div className="flex justify-center pt-3 sm:pt-4 border-t border-border/50">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs hover:bg-primary/10 bg-transparent w-full sm:w-auto"
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

        {showAddProjectModal && (
          <Dialog open={showAddProjectModal} onOpenChange={setShowAddProjectModal}>
            <DialogContent className="max-w-[95vw] sm:max-w-md mx-2 sm:mx-4 enhanced-modal">
              <DialogHeader className="pb-3 sm:pb-4">
                <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  Создать новый проект
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="text-xs sm:text-sm font-medium">Название проекта</label>
                  <Input
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    placeholder="Введите название проекта"
                    className="mt-1 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium">Описание</label>
                  <textarea
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Краткое описание проекта"
                    className="w-full mt-1 p-2 border border-border rounded-md bg-background min-h-[60px] sm:min-h-[80px] resize-none text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium">Срок выполнения</label>
                  <Input
                    type="date"
                    value={newProject.deadline}
                    onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
                    className="mt-1 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs sm:text-sm font-medium">Приоритет</label>
                  <select
                    value={newProject.priority || "Средний"}
                    onChange={(e) => setNewProject({ ...newProject, priority: e.target.value })}
                    className="w-full mt-1 p-2 border border-border rounded-md bg-background text-sm"
                  >
                    <option value="Низкий">Низкий</option>
                    <option value="Средний">Средний</option>
                    <option value="Высокий">Высокий</option>
                    <option value="Критический">Критический</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-2 pt-3 sm:pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddProjectModal(false)
                    setNewProject({ name: "", deadline: "", team: [], description: "" })
                  }}
                  className="text-sm w-full sm:w-auto"
                >
                  Отмена
                </Button>
                <Button
                  onClick={handleAddProject}
                  disabled={!newProject.name || !newProject.deadline}
                  className="text-sm w-full sm:w-auto"
                >
                  Создать проект
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {showProjectDetailsModal && selectedProject && (
          <Dialog open={showProjectDetailsModal} onOpenChange={setShowProjectDetailsModal}>
            <DialogContent className="max-w-[95vw] sm:max-w-2xl mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto enhanced-modal">
              <DialogHeader className="pb-3 sm:pb-4">
                <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  <span className="truncate">{selectedProject.name}</span>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-2 sm:space-y-3">
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-muted-foreground">Статус</label>
                      <div className="mt-1">
                        <Badge
                          variant={
                            selectedProject.status === "Завершен"
                              ? "default"
                              : selectedProject.status === "В работе"
                                ? "secondary"
                                : "outline"
                          }
                          className="text-xs px-1.5 py-0.5"
                        >
                          {selectedProject.status}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-muted-foreground">Прогресс</label>
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs sm:text-sm font-medium">{selectedProject.progress}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${selectedProject.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-muted-foreground">Срок выполнения</label>
                      <p className="mt-1 text-xs sm:text-sm">{selectedProject.deadline}</p>
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-muted-foreground">Команда</label>
                      <div className="flex items-center gap-1 sm:gap-2 mt-1">
                        {selectedProject.team.map((member, index) => (
                          <div
                            key={index}
                            className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center border-2 border-background"
                          >
                            <span className="text-xs font-bold text-white">{member}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border/50 pt-3 sm:pt-4">
                  <h4 className="text-xs sm:text-sm font-medium mb-2 sm:mb-3">Последние активности</h4>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 sm:gap-3 p-2 rounded-lg bg-card/50">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs sm:text-sm block">Обновлен статус задачи "Интеграция API"</span>
                        <span className="text-xs text-muted-foreground">2 часа назад</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3 p-2 rounded-lg bg-card/50">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs sm:text-sm block">Добавлен новый участник команды</span>
                        <span className="text-xs text-muted-foreground">1 день назад</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 sm:gap-3 p-2 rounded-lg bg-card/50">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-1 flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs sm:text-sm block">Создан отчет по прогрессу</span>
                        <span className="text-xs text-muted-foreground">3 дня назад</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-2 pt-3 sm:pt-4 border-t border-border/50">
                <Button
                  variant="outline"
                  onClick={() => setShowProjectDetailsModal(false)}
                  className="text-sm w-full sm:w-auto"
                >
                  Закрыть
                </Button>
                <Button className="text-sm w-full sm:w-auto">Редактировать проект</Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

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

        {showCreateRoleModal && (
          <Dialog open={showCreateRoleModal} onOpenChange={setShowCreateRoleModal}>
            <DialogContent className="max-w-md mx-4 enhanced-modal">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-primary" />
                  Создать новую роль
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Название роли</label>
                  <Input
                    value={newRole.name}
                    onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                    placeholder="Введите название роли"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Описание роли</label>
                  <textarea
                    value={newRole.description || ""}
                    onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                    placeholder="Краткое описание роли и обязанностей"
                    className="w-full mt-1 p-2 border border-border rounded-md bg-background min-h-[80px] resize-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Права доступа</label>
                  <div className="mt-2 space-y-2">
                    {[
                      { id: "read", label: "Просмотр данных" },
                      { id: "write", label: "Редактирование" },
                      { id: "delete", label: "Удаление" },
                      { id: "admin", label: "Администрирование" },
                      { id: "reports", label: "Отчеты" },
                      { id: "settings", label: "Настройки" },
                    ].map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={permission.id}
                          checked={newRole.permissions?.includes(permission.id) || false}
                          onChange={(e) => {
                            const permissions = newRole.permissions || []
                            if (e.target.checked) {
                              setNewRole({ ...newRole, permissions: [...permissions, permission.id] })
                            } else {
                              setNewRole({ ...newRole, permissions: permissions.filter((p) => p !== permission.id) })
                            }
                          }}
                          className="rounded border-border"
                        />
                        <label htmlFor={permission.id} className="text-sm text-foreground">
                          {permission.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCreateRoleModal(false)
                    setNewRole({ name: "", permissions: [] })
                  }}
                >
                  Отмена
                </Button>
                <Button onClick={handleCreateRole} disabled={!newRole.name}>
                  Создать роль
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
        <SupportChat />
      </div>

      <style jsx global>{`
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        .container-fix {
          padding-left: max(16px, calc((100% - 1280px)/2));
          padding-right: max(16px, calc((100% - 1280px)/2));
        }
        .mobile-padding {
          padding-left: 16px;
          padding-right: 16px;
        }
        .overflow-fix {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .button-responsive {
          width: auto;
        }
        .grid-responsive {
          grid-template-columns: 1fr;
        }
        .card-responsive {
          width: 100%;
        }
        @media (min-width: 640px) {
          .mobile-padding {
            padding-left: 24px;
            padding-right: 24px;
          }
        }
        @media (min-width: 1024px) {
          .button-responsive {
            width: auto;
          }
          .grid-responsive {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          }
          .card-responsive {
            width: auto;
          }
        }
      `}</style>
    </TooltipProvider>
  )
}
