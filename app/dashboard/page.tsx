"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
  User,
  Zap,
  Palette,
  Database,
  Download,
  Mail,
  Calendar,
} from "lucide-react"
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
import { GanttChart } from "@/components/project-management/gantt-chart"
import StrategyDashboard from "@/components/strategy/strategy-dashboard"
import { ChevronDown } from "lucide-react"
import { EDODashboard } from "@/components/edo/edo-dashboard"
import { LegalDashboard } from "@/components/legal/legal-dashboard"
import { MarketingDashboard } from "@/components/marketing/marketing-dashboard"

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

  const [newTask, setNewTask] = useState({
    title: "",
    assignee: "",
    priority: "Средний",
    dueDate: "",
    description: "",
  })
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [tasks, setTasks] = useState([])

  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [settingsCategory, setSettingsCategory] = useState<string>("")

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

  const handleSaveSettings = (category: string, settings: any) => {
    console.log(`Настройки ${category} сохранены:`, settings)

    // Обновляем состояние настроек
    setUserSettings((prev) => ({
      ...prev,
      [category]: { ...prev[category], ...settings },
    }))

    // Показываем уведомление об успешном сохранении
    setNotifications((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: "Настройки сохранены",
        message: `Настройки ${category} успешно обновлены`,
        type: "success",
        timestamp: new Date(),
        read: false,
      },
    ])

    setShowSettingsModal(false)
  }

  const handleModuleSettings = (moduleName: string, action: string) => {
    console.log(`Настройки модуля ${moduleName}: ${action}`)

    switch (action) {
      case "configure":
        setSettingsCategory(moduleName)
        setShowSettingsModal(true)
        break
      case "reset":
        if (confirm(`Сбросить настройки модуля ${moduleName}?`)) {
          setUserSettings((prev) => ({
            ...prev,
            [moduleName]: {},
          }))
          setNotifications((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              title: "Настройки сброшены",
              message: `Настройки модуля ${moduleName} сброшены к значениям по умолчанию`,
              type: "info",
              timestamp: new Date(),
              read: false,
            },
          ])
        }
        break
      case "export":
        const settingsData = JSON.stringify(userSettings[moduleName] || {}, null, 2)
        const blob = new Blob([settingsData], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `${moduleName}-settings.json`
        a.click()
        URL.revokeObjectURL(url)
        break
    }
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

  const handleAddTask = () => {
    if (newTask.title && newTask.assignee) {
      const task = {
        id: tasks.length + 1,
        title: newTask.title,
        assignee: newTask.assignee,
        priority: newTask.priority,
        status: "В работе",
        dueDate: newTask.dueDate,
        description: newTask.description || "",
        progress: 0,
      }
      setTasks([...tasks, task])
      setNewTask({ title: "", assignee: "", priority: "Средний", dueDate: "", description: "" })
      setShowAddTaskModal(false)
    }
  }

  const handleUpdateTaskStatus = (taskId: number, newStatus: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task)))
  }

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const handleUpdateProjectProgress = (projectId: number, progress: number) => {
    setProjects(projects.map((project) => (project.id === projectId ? { ...project, progress } : project)))
  }

  const handleDeleteProject = (projectId: number) => {
    setProjects(projects.filter((project) => project.id !== projectId))
  }

  const handleAddTransaction = (transaction: any) => {
    const newTransaction = {
      id: Date.now(),
      ...transaction,
      date: new Date().toISOString().split("T")[0],
    }
    // Здесь будет интеграция с backend
    console.log("[v0] Adding transaction:", newTransaction)
  }

  const handleGenerateReport = (reportType: string) => {
    // Генерация отчета в зависимости от типа
    const reportData = {
      type: reportType,
      generatedAt: new Date().toISOString(),
      data: reportType === "financial" ? { revenue: 150000, expenses: 80000 } : {},
    }

    // Создание и скачивание CSV файла
    const csvContent = `data:text/csv;charset=utf-8,${Object.keys(reportData).join(",")}\n${Object.values(reportData).join(",")}`
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `${reportType}_report_${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleNotificationAction = (notificationId: number, action: string) => {
    const notification = notificationsList.find((n) => n.id === notificationId)
    if (notification) {
      switch (action) {
        case "approve":
          console.log("[v0] Approving notification:", notification)
          // Здесь будет логика одобрения
          break
        case "reject":
          console.log("[v0] Rejecting notification:", notification)
          // Здесь будет логика отклонения
          break
        case "view":
          console.log("[v0] Viewing notification details:", notification)
          // Открытие детального просмотра
          break
      }
      markNotificationAsRead(notificationId)
    }
  }

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

  const NavigationMenu = ({ onItemClick }: { onItemClick?: () => void }) => {
    const [expandedGroups, setExpandedGroups] = useState<string[]>(["business", "finance", "hr", "ai"])

    const toggleGroup = (groupKey: string) => {
      setExpandedGroups((prev) =>
        prev.includes(groupKey) ? prev.filter((key) => key !== groupKey) : [...prev, groupKey],
      )
    }

    const navigationGroups = [
      {
        key: "business",
        label: "Управление бизнесом",
        icon: Briefcase,
        items: [
          { key: "overview", icon: Briefcase, label: "Обзор бизнеса", badge: null },
          { key: "goals", icon: Target, label: "Стратегия и цели", badge: "NEW" },
          { key: "projects", icon: Target, label: "Активные проекты", badge: 3 },
          { key: "tasks", icon: CheckSquare, label: "Управление задачами", badge: 8 },
        ],
      },
      {
        key: "finance",
        label: "Финансы и документооборот",
        icon: DollarSign,
        items: [
          { key: "finance", icon: DollarSign, label: "Финансы", badge: null },
          { key: "sales", icon: TrendingUp, label: "Продажи", badge: 156 },
          { key: "edo", icon: FileText, label: "ЭДО | Документооборот", badge: "NEW" },
          { key: "legal", icon: Shield, label: "Правовой контур", badge: "NEW" },
        ],
      },
      {
        key: "hr",
        label: "Кадры и команда",
        icon: Users,
        items: [
          { key: "hr", icon: Users, label: "HR и развитие команды", badge: "NEW" },
          { key: "team", icon: Users, label: "Команда", badge: null },
          { key: "roles", icon: Shield, label: "Роли и права", badge: null },
        ],
      },
      {
        key: "ai",
        label: "ИИ-инструменты",
        icon: Brain,
        items: [
          { key: "strategy", icon: Brain, label: "ИИ-Агент для бизнеса", badge: "NEW" },
          { key: "tools", icon: Rocket, label: "ИИ-инструменты", badge: 5 },
        ],
      },
      {
        key: "marketing",
        label: "Маркетинг и клиенты",
        icon: MessageSquare,
        items: [{ key: "marketing", icon: MessageSquare, label: "Маркетинг и клиенты", badge: "NEW" }],
      },
      {
        key: "system",
        label: "Система",
        icon: Settings,
        items: [
          { key: "files", icon: FileText, label: "Файловое хранилище", badge: 24 },
          { key: "settings", icon: Settings, label: "Настройки", badge: null },
        ],
      },
    ]

    return (
      <div className="space-y-1">
        {navigationGroups.map((group) => (
          <div key={group.key} className="space-y-1">
            <Button
              variant="ghost"
              className="w-full justify-start text-xs font-semibold text-muted-foreground hover:text-foreground py-2 px-3 h-auto uppercase tracking-wide"
              onClick={() => toggleGroup(group.key)}
            >
              <group.icon className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="flex-1 text-left">{group.label}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  expandedGroups.includes(group.key) ? "rotate-180" : ""
                }`}
              />
            </Button>

            {expandedGroups.includes(group.key) && (
              <div className="space-y-1 ml-2 border-l border-border/50 pl-2">
                {group.items.map((item) => (
                  <Button
                    key={item.key}
                    variant={activeTab === item.key ? "default" : "ghost"}
                    className={`w-full justify-start transition-colors duration-300 ease-out text-sm py-3 px-4 h-auto cursor-pointer ${
                      activeTab === item.key
                        ? "bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-primary-foreground shadow-lg"
                        : "text-foreground hover:bg-muted/30 hover:text-foreground"
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
                          activeTab === item.key
                            ? "bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
                            : ""
                        }`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }

  const handleViewProjectDetails = (project) => {
    setSelectedProject(project)
    setShowProjectDetailsModal(true)
  }

  const handleOpenSettings = (category: string) => {
    setSettingsCategory(category)
    setShowSettingsModal(true)
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

        <main className="max-w-7xl mx-auto mobile-padding py-2 sm:py-4 lg:py-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-8">
            {/* Левая панель навигации */}
            <div className="w-full lg:w-80 xl:w-96 lg:flex-shrink-0">
              <Card className="enhanced-sidebar enhanced-card backdrop-blur-xl border border-border/50 shadow-2xl shadow-primary/10 lg:sticky lg:top-24 w-full overflow-hidden transition-shadow duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-0 transition-opacity duration-500"></div>

                <CardHeader className="pb-3 sm:pb-4 relative z-10">
                  <CardTitle className="text-foreground font-bold text-base sm:text-lg flex items-center">
                    <div className="p-1.5 sm:p-2 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg sm:rounded-xl mr-2 sm:mr-3 flex-shrink-0 transition-colors duration-300">
                      <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <span className="truncate bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent text-sm sm:text-base">
                      Управление бизнесом
                    </span>
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-xs sm:text-sm">
                    Ваша ИИ-платформа роста
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0 relative z-10">
                  <NavigationMenu />
                </CardContent>
              </Card>
            </div>

            <div className="flex-1 min-w-0 w-full overflow-hidden">
              {activeTab === "overview" && (
                <div className="space-y-4 sm:space-y-6 lg:space-y-8 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
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
                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-foreground overflow-fix">
                        Управление командой
                      </h2>
                      <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-1 overflow-fix">
                        Сотрудники, роли и права доступа
                      </p>
                    </div>
                    <Button
                      className="bg-primary hover:bg-primary/90 w-full sm:w-auto text-xs sm:text-sm lg:text-base button-responsive px-3 py-2 h-auto"
                      onClick={() => setShowAddEmployeeModal(true)}
                    >
                      <UserPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      <span>Добавить сотрудника</span>
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 grid-responsive">
                    <div className="xl:col-span-2 2xl:col-span-2">
                      <Card className="enhanced-card backdrop-blur-sm border border-border/50 card-responsive">
                        <CardHeader className="pb-2 sm:pb-3 lg:pb-4">
                          <CardTitle className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                            <span className="text-sm sm:text-base lg:text-lg xl:text-xl overflow-fix">
                              Команда ({employees.length})
                            </span>
                            <Badge variant="secondary" className="self-start sm:self-center text-xs px-1.5 py-0.5">
                              {employees.filter((e) => e.status === "Активен").length} активных
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                            {employees.map((employee) => (
                              <div
                                key={employee.id}
                                className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 lg:gap-4 p-2 sm:p-3 lg:p-4 bg-background/50 rounded-lg border border-border/30 overflow-fix"
                              >
                                <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4 flex-1 min-w-0">
                                  <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shrink-0">
                                    <span className="text-xs sm:text-sm font-bold text-white">{employee.avatar}</span>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-foreground truncate text-xs sm:text-sm lg:text-base">
                                      {employee.name}
                                    </h4>
                                    <p className="text-xs text-muted-foreground truncate">{employee.email}</p>
                                    <div className="flex flex-wrap items-center gap-1 mt-1">
                                      <Badge variant="outline" className="text-xs px-1 py-0.5">
                                        {employee.role}
                                      </Badge>
                                      <Badge
                                        variant={employee.status === "Активен" ? "default" : "secondary"}
                                        className="text-xs px-1 py-0.5"
                                      >
                                        {employee.status}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
                                  <div className="text-left sm:text-right">
                                    <p className="text-xs sm:text-sm font-medium">{employee.productivity}%</p>
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
                                      className="text-xs px-1.5 py-1 h-auto"
                                    >
                                      Роль
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleRemoveEmployee(employee.id)}
                                      className="text-red-600 hover:text-red-700 text-xs px-1.5 py-1 h-auto"
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

                    <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                      <Card className="enhanced-card backdrop-blur-sm border border-border/50 card-responsive">
                        <CardHeader className="pb-2 sm:pb-3 lg:pb-4">
                          <CardTitle className="text-xs sm:text-sm lg:text-base xl:text-lg overflow-fix">
                            Статистика команды
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-xs sm:text-sm text-muted-foreground overflow-fix">
                                Всего сотрудников
                              </span>
                              <span className="font-bold text-xs sm:text-sm lg:text-base">{employees.length}</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs sm:text-sm text-muted-foreground overflow-fix">Активных</span>
                              <span className="font-bold text-green-600 text-xs sm:text-sm lg:text-base">
                                {employees.filter((e) => e.status === "Активен").length}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs sm:text-sm text-muted-foreground overflow-fix">
                                Средняя продуктивность
                              </span>
                              <span className="font-bold text-xs sm:text-sm lg:text-base">
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
                        <CardHeader className="pb-2 sm:pb-3 lg:pb-4">
                          <CardTitle className="text-xs sm:text-sm lg:text-base xl:text-lg overflow-fix">
                            Роли в команде
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-1.5 sm:space-y-2">
                            {availableRoles.map((role) => {
                              const count = employees.filter((emp) => emp.role === role).length
                              return (
                                <div key={role} className="flex justify-between items-center">
                                  <span className="text-xs sm:text-sm truncate flex-1 mr-2 overflow-fix">{role}</span>
                                  <Badge variant="secondary" className="shrink-0 text-xs px-1 py-0.5">
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
                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-foreground">
                        Активные проекты
                      </h2>
                      <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-1">
                        Отслеживайте прогресс ваших ИИ-проектов
                      </p>
                    </div>
                    <Button
                      className="bg-primary hover:bg-primary/90 w-full sm:w-auto text-xs sm:text-sm lg:text-base px-3 py-2 h-auto"
                      onClick={() => setShowAddProjectModal(true)}
                    >
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Новый проект
                    </Button>
                  </div>

                  <GanttChart projects={projects} />

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                    {projects.map((project) => (
                      <Card key={project.id} className="enhanced-card backdrop-blur-xl border border-border/50">
                        <CardHeader className="pb-2 sm:pb-3 lg:pb-4">
                          <CardTitle className="text-sm sm:text-base lg:text-lg truncate">{project.name}</CardTitle>
                          <div className="flex items-center justify-between gap-1 sm:gap-2">
                            <Badge
                              variant={
                                project.status === "Завершен"
                                  ? "default"
                                  : project.status === "В работе"
                                    ? "secondary"
                                    : "outline"
                              }
                              className="text-xs px-1 py-0.5"
                            >
                              {project.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">до {project.deadline}</span>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-2 sm:space-y-3 lg:space-y-4">
                            <div>
                              <div className="flex justify-between text-xs sm:text-sm mb-1">
                                <span>Прогресс</span>
                                <span>{project.progress}%</span>
                              </div>
                              <div className="w-full bg-secondary rounded-full h-1.5 sm:h-2">
                                <div
                                  className="bg-primary h-1.5 sm:h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex -space-x-1">
                                {project.team.map((member, index) => (
                                  <div
                                    key={index}
                                    className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center border-2 border-background"
                                  >
                                    <span className="text-xs font-bold text-white">{member}</span>
                                  </div>
                                ))}
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewProjectDetails(project)}
                                className="text-xs px-1.5 py-1 h-auto"
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
                <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                  <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-foreground">
                        Роли и права доступа
                      </h2>
                      <p className="text-xs sm:text-sm lg:text-base text-muted-foreground mt-1">
                        Управление правами пользователей и безопасностью
                      </p>
                    </div>
                    <Button
                      className="bg-primary hover:bg-primary/90 w-full sm:w-auto text-xs sm:text-sm lg:text-base px-3 py-2 h-auto"
                      onClick={() => setShowCreateRoleModal(true)}
                    >
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Создать роль
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                    {availableRoles.map((role) => {
                      const userCount = employees.filter((emp) => emp.role === role).length
                      return (
                        <Card key={role} className="enhanced-card backdrop-blur-sm border border-border/50">
                          <CardHeader className="pb-2 sm:pb-3 lg:pb-4">
                            <CardTitle className="flex items-center justify-between">
                              <span className="text-sm sm:text-base lg:text-lg truncate mr-2">{role}</span>
                              <Badge variant="secondary" className="text-xs px-1 py-0.5">
                                {userCount} польз.
                              </Badge>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="space-y-2 sm:space-y-3">
                              <div className="text-xs sm:text-sm text-muted-foreground">
                                Права доступа для роли "{role}"
                              </div>
                              <div className="flex flex-wrap gap-1">
                                {role === "Администратор" && (
                                  <>
                                    <Badge variant="outline" className="text-xs px-1 py-0.5">
                                      Полный доступ
                                    </Badge>
                                    <Badge variant="outline" className="text-xs px-1 py-0.5">
                                      Управление пользователями
                                    </Badge>
                                    <Badge variant="outline" className="text-xs px-1 py-0.5">
                                      Настройки системы
                                    </Badge>
                                  </>
                                )}
                                {role === "Менеджер" && (
                                  <>
                                    <Badge variant="outline" className="text-xs px-1 py-0.5">
                                      Управление проектами
                                    </Badge>
                                    <Badge variant="outline" className="text-xs px-1 py-0.5">
                                      Просмотр отчетов
                                    </Badge>
                                    <Badge variant="outline" className="text-xs px-1 py-0.5">
                                      Управление командой
                                    </Badge>
                                  </>
                                )}
                                {role === "Сотрудник" && (
                                  <>
                                    <Badge variant="outline" className="text-xs px-1 py-0.5">
                                      Базовый доступ
                                    </Badge>
                                    <Badge variant="outline" className="text-xs px-1 py-0.5">
                                      Просмотр задач
                                    </Badge>
                                  </>
                                )}
                              </div>
                              <Button variant="outline" size="sm" className="w-full bg-transparent text-xs h-7">
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
                <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
                  <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                    <CardHeader>
                      <CardTitle className="flex items-center text-foreground">
                        <Settings className="w-5 h-5 mr-2 text-primary" />
                        Настройки системы
                      </CardTitle>
                      <CardDescription>Управление параметрами платформы и персонализация</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Card
                          className="bg-background/50 border border-border/30 hover:border-primary/30 transition-colors cursor-pointer"
                          onClick={() => handleOpenSettings("profile")}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-blue-500/10 rounded-lg">
                                <User className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-medium text-foreground">Профиль</h3>
                                <p className="text-sm text-muted-foreground">Личные данные и аватар</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card
                          className="bg-background/50 border border-border/30 hover:border-primary/30 transition-colors cursor-pointer"
                          onClick={() => handleOpenSettings("notifications")}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-green-500/10 rounded-lg">
                                <Bell className="w-5 h-5 text-green-600" />
                              </div>
                              <div>
                                <h3 className="font-medium text-foreground">Уведомления</h3>
                                <p className="text-sm text-muted-foreground">Email и push-уведомления</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card
                          className="bg-background/50 border border-border/30 hover:border-primary/30 transition-colors cursor-pointer"
                          onClick={() => handleOpenSettings("security")}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-red-500/10 rounded-lg">
                                <Shield className="w-5 h-5 text-red-600" />
                              </div>
                              <div>
                                <h3 className="font-medium text-foreground">Безопасность</h3>
                                <p className="text-sm text-muted-foreground">Пароль и двухфакторная аутентификация</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card
                          className="bg-background/50 border border-border/30 hover:border-primary/30 transition-colors cursor-pointer"
                          onClick={() => handleOpenSettings("integrations")}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-purple-500/10 rounded-lg">
                                <Zap className="w-5 h-5 text-purple-600" />
                              </div>
                              <div>
                                <h3 className="font-medium text-foreground">Интеграции</h3>
                                <p className="text-sm text-muted-foreground">API и внешние сервисы</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card
                          className="bg-background/50 border border-border/30 hover:border-primary/30 transition-colors cursor-pointer"
                          onClick={() => handleOpenSettings("appearance")}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-orange-500/10 rounded-lg">
                                <Palette className="w-5 h-5 text-orange-600" />
                              </div>
                              <div>
                                <h3 className="font-medium text-foreground">Внешний вид</h3>
                                <p className="text-sm text-muted-foreground">Тема и персонализация</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card
                          className="bg-background/50 border border-border/30 hover:border-primary/30 transition-colors cursor-pointer"
                          onClick={() => handleOpenSettings("data")}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-teal-500/10 rounded-lg">
                                <Database className="w-5 h-5 text-teal-600" />
                              </div>
                              <div>
                                <h3 className="font-medium text-foreground">Данные</h3>
                                <p className="text-sm text-muted-foreground">Экспорт и резервное копирование</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {showSettingsModal && (
                <Dialog open={showSettingsModal} onOpenChange={setShowSettingsModal}>
                  <DialogContent className="max-w-2xl mx-4">
                    <DialogHeader>
                      <DialogTitle className="flex items-center space-x-2">
                        <Settings className="w-5 h-5 text-primary" />
                        <span>
                          {settingsCategory === "profile" && "Настройки профиля"}
                          {settingsCategory === "notifications" && "Настройки уведомлений"}
                          {settingsCategory === "security" && "Настройки безопасности"}
                          {settingsCategory === "integrations" && "Настройки интеграций"}
                          {settingsCategory === "appearance" && "Настройки внешнего вида"}
                          {settingsCategory === "data" && "Управление данными"}
                        </span>
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      {settingsCategory === "profile" && (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Имя</Label>
                              <Input defaultValue="Иван Петров" className="mt-1" />
                            </div>
                            <div>
                              <Label>Email</Label>
                              <Input defaultValue="ivan@company.com" className="mt-1" />
                            </div>
                          </div>
                          <div>
                            <Label>Должность</Label>
                            <Input defaultValue="Генеральный директор" className="mt-1" />
                          </div>
                          <div>
                            <Label>Компания</Label>
                            <Input defaultValue="ООО 'Инновации'" className="mt-1" />
                          </div>
                        </div>
                      )}

                      {settingsCategory === "notifications" && (
                        <div className="space-y-4">
                          <div className="space-y-3">
                            <Label>Уведомления по email</Label>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div>
                                  <Label className="text-sm">Новые задачи</Label>
                                  <p className="text-xs text-muted-foreground">Уведомления о назначенных задачах</p>
                                </div>
                                <Switch
                                  checked={userSettings.notifications?.newTasks ?? true}
                                  onCheckedChange={(checked) =>
                                    setUserSettings((prev) => ({
                                      ...prev,
                                      notifications: { ...prev.notifications, newTasks: checked },
                                    }))
                                  }
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <Label className="text-sm">Просроченные задачи</Label>
                                  <p className="text-xs text-muted-foreground">Напоминания о просроченных задачах</p>
                                </div>
                                <Switch
                                  checked={userSettings.notifications?.overdueTasks ?? true}
                                  onCheckedChange={(checked) =>
                                    setUserSettings((prev) => ({
                                      ...prev,
                                      notifications: { ...prev.notifications, overdueTasks: checked },
                                    }))
                                  }
                                />
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <Label className="text-sm">Системные уведомления</Label>
                                  <p className="text-xs text-muted-foreground">Важные системные сообщения</p>
                                </div>
                                <Switch
                                  checked={userSettings.notifications?.system ?? true}
                                  onCheckedChange={(checked) =>
                                    setUserSettings((prev) => ({
                                      ...prev,
                                      notifications: { ...prev.notifications, system: checked },
                                    }))
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {settingsCategory === "security" && (
                        <div className="space-y-4">
                          <div>
                            <Label>Изменить пароль</Label>
                            <div className="space-y-2 mt-2">
                              <Input type="password" placeholder="Текущий пароль" />
                              <Input type="password" placeholder="Новый пароль" />
                              <Input type="password" placeholder="Подтвердите новый пароль" />
                            </div>
                          </div>
                          <div className="space-y-3">
                            <Label>Настройки безопасности</Label>
                            <div className="flex items-center justify-between">
                              <div>
                                <Label className="text-sm">Двухфакторная аутентификация</Label>
                                <p className="text-xs text-muted-foreground">Дополнительная защита аккаунта</p>
                              </div>
                              <Switch
                                checked={userSettings.security?.twoFactor ?? false}
                                onCheckedChange={(checked) =>
                                  setUserSettings((prev) => ({
                                    ...prev,
                                    security: { ...prev.security, twoFactor: checked },
                                  }))
                                }
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <Label className="text-sm">Автоматический выход</Label>
                                <p className="text-xs text-muted-foreground">Выход после 30 минут неактивности</p>
                              </div>
                              <Switch
                                checked={userSettings.security?.autoLogout ?? true}
                                onCheckedChange={(checked) =>
                                  setUserSettings((prev) => ({
                                    ...prev,
                                    security: { ...prev.security, autoLogout: checked },
                                  }))
                                }
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {settingsCategory === "integrations" && (
                        <div className="space-y-4">
                          <div className="space-y-3">
                            <Label>Подключенные интеграции</Label>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                                    <Mail className="w-4 h-4 text-blue-600" />
                                  </div>
                                  <div>
                                    <Label className="text-sm">Email интеграция</Label>
                                    <p className="text-xs text-muted-foreground">Подключено к Gmail</p>
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleModuleSettings("email", "configure")}
                                >
                                  Настроить
                                </Button>
                              </div>
                              <div className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                                    <Calendar className="w-4 h-4 text-green-600" />
                                  </div>
                                  <div>
                                    <Label className="text-sm">Календарь</Label>
                                    <p className="text-xs text-muted-foreground">Подключено к Google Calendar</p>
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleModuleSettings("calendar", "configure")}
                                >
                                  Настроить
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {settingsCategory === "appearance" && (
                        <div className="space-y-4">
                          <div className="space-y-3">
                            <Label>Внешний вид</Label>
                            <div className="flex items-center justify-between">
                              <div>
                                <Label className="text-sm">Темная тема</Label>
                                <p className="text-xs text-muted-foreground">
                                  Переключение между светлой и темной темой
                                </p>
                              </div>
                              <Switch
                                checked={userSettings.appearance?.darkMode ?? false}
                                onCheckedChange={(checked) =>
                                  setUserSettings((prev) => ({
                                    ...prev,
                                    appearance: { ...prev.appearance, darkMode: checked },
                                  }))
                                }
                              />
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <Label className="text-sm">Компактный режим</Label>
                                <p className="text-xs text-muted-foreground">Уменьшенные отступы и размеры элементов</p>
                              </div>
                              <Switch
                                checked={userSettings.appearance?.compact ?? false}
                                onCheckedChange={(checked) =>
                                  setUserSettings((prev) => ({
                                    ...prev,
                                    appearance: { ...prev.appearance, compact: checked },
                                  }))
                                }
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {settingsCategory === "data" && (
                        <div className="space-y-4">
                          <div className="space-y-3">
                            <Label>Управление данными</Label>
                            <div className="grid grid-cols-2 gap-4">
                              <Button variant="outline" onClick={() => handleModuleSettings("data", "export")}>
                                <Download className="w-4 h-4 mr-2" />
                                Экспорт данных
                              </Button>
                              <Button variant="outline" onClick={() => handleModuleSettings("data", "backup")}>
                                <Shield className="w-4 h-4 mr-2" />
                                Создать резервную копию
                              </Button>
                            </div>
                            <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                              <Label className="text-sm text-red-600">Опасная зона</Label>
                              <p className="text-xs text-muted-foreground mt-1">Необратимые действия с данными</p>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="mt-2"
                                onClick={() => {
                                  if (confirm("Вы уверены, что хотите удалить все данные? Это действие необратимо!")) {
                                    alert("Функция удаления данных будет реализована в следующих версиях")
                                  }
                                }}
                              >
                                Удалить все данные
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end space-x-2 pt-4 border-t">
                        <Button variant="outline" onClick={() => setShowSettingsModal(false)}>
                          Отмена
                        </Button>
                        <Button onClick={() => handleSaveSettings(settingsCategory, userSettings[settingsCategory])}>
                          Сохранить изменения
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}

              {showNotificationsModal && (
                <Dialog open={showNotificationsModal} onOpenChange={setShowNotificationsModal}>
                  <DialogContent className="max-w-md mx-4">
                    <DialogHeader>
                      <DialogTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Bell className="w-5 h-5 text-primary" />
                          <span>Уведомления</span>
                        </div>
                        {notifications > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={markAllAsRead}
                            className="text-xs text-muted-foreground hover:text-foreground"
                          >
                            Отметить все как прочитанные
                          </Button>
                        )}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {notificationsList.length > 0 ? (
                        notificationsList.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 rounded-lg border transition-colors ${
                              notification.read
                                ? "bg-muted/30 border-border/50"
                                : "bg-card border-border hover:bg-muted/50"
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <div className="flex-shrink-0 mt-0.5">{getNotificationIcon(notification.type)}</div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h4
                                      className={`text-sm font-medium ${notification.read ? "text-muted-foreground" : "text-foreground"}`}
                                    >
                                      {notification.title}
                                    </h4>
                                    <p
                                      className={`text-xs mt-1 ${notification.read ? "text-muted-foreground/70" : "text-muted-foreground"}`}
                                    >
                                      {notification.message}
                                    </p>
                                    <p className="text-xs text-muted-foreground/60 mt-2">{notification.time}</p>
                                  </div>
                                  {!notification.read && (
                                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1"></div>
                                  )}
                                </div>
                                <div className="flex space-x-2 mt-3">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-xs h-7 bg-transparent"
                                    onClick={() => handleNotificationAction(notification.id, "view")}
                                  >
                                    Просмотреть
                                  </Button>
                                  {!notification.read && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-xs h-7"
                                      onClick={() => markNotificationAsRead(notification.id)}
                                    >
                                      Отметить как прочитанное
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <Bell className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                          <p className="text-sm text-muted-foreground">Нет новых уведомлений</p>
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            Все уведомления будут отображаться здесь
                          </p>
                        </div>
                      )}
                    </div>
                    <div className="flex justify-end pt-3 border-t">
                      <Button variant="outline" onClick={() => setShowNotificationsModal(false)}>
                        Закрыть
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              )}

              {activeTab === "edo" && <EDODashboard />}
              {activeTab === "legal" && <LegalDashboard />}
              {activeTab === "marketing" && <MarketingDashboard />}
            </div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  )
}
