"use client"

import { useState, useEffect } from "react"
import {
  Bell,
  MessageSquare,
  CheckSquare,
  Settings,
  Zap,
  Users,
  FileText,
  Target,
  Search,
  Eye,
  Shield,
  TrendingUp,
  DollarSign,
  FolderOpen,
  Megaphone,
  Building2,
  HelpCircle,
  ChevronUp,
  ChevronDown,
  ArrowLeft,
  BarChart3,
  Brain,
  Scale,
  MessageCircle,
  Plus,
  Edit,
  Trash2,
} from "lucide-react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

import { SupportChat } from "@/components/support/support-chat"
import { AnimatedMetrics } from "@/components/interactive/animated-metrics"

import SalesManager from "@/components/business-tools/sales-manager"
import { FinanceManager } from "@/components/business-tools/finance-manager"
import EDODashboard from "@/components/edo/edo-dashboard"
import LegalDashboard from "@/components/legal/legal-dashboard"
import HRDashboard from "@/components/hr-management/hr-dashboard"
import { GanttChart } from "@/components/project-management/gantt-chart"
import StrategyDashboard from "@/components/strategy/strategy-dashboard"
import MarketingDashboard from "@/components/marketing/marketing-dashboard"
import { AIBusinessAgent } from "@/components/ai-agent/ai-business-agent"
import { FileManager } from "@/components/file-storage/file-manager"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const [showSupportChat, setShowSupportChat] = useState(false)
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null)
  const [notifications, setNotifications] = useState(3)
  const [notificationsList, setNotificationsList] = useState([
    { id: 1, message: "Новый проект требует утверждения", type: "info", read: false },
    { id: 2, message: "Отчет по продажам готов", type: "success", read: false },
    { id: 3, message: "Требуется обновление системы", type: "warning", read: false },
  ])

  // Project management states
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Разработка мобильного приложения",
      status: "В работе",
      progress: 65,
      team: ["Анна", "Михаил"],
      deadline: "2024-03-15",
      description: "Создание iOS и Android приложения",
    },
    {
      id: 2,
      name: "Редизайн веб-сайта",
      status: "Планирование",
      progress: 20,
      team: ["Елена", "Дмитрий"],
      deadline: "2024-04-01",
      description: "Обновление дизайна корпоративного сайта",
    },
    {
      id: 3,
      name: "Интеграция CRM системы",
      status: "Завершен",
      progress: 100,
      team: ["Сергей"],
      deadline: "2024-02-28",
      description: "Подключение новой CRM системы",
    },
  ])
  const [newProject, setNewProject] = useState({ name: "", deadline: "", team: [], description: "" })
  const [showAddProjectModal, setShowAddProjectModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [showProjectDetailsModal, setShowProjectDetailsModal] = useState(false)

  // Task management states
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Подготовить презентацию",
      status: "todo",
      priority: "high",
      assignee: "Анна Иванова",
      dueDate: "2024-03-20",
    },
    {
      id: 2,
      title: "Провести интервью с кандидатами",
      status: "in-progress",
      priority: "medium",
      assignee: "Михаил Петров",
      dueDate: "2024-03-18",
    },
    {
      id: 3,
      title: "Обновить документацию",
      status: "done",
      priority: "low",
      assignee: "Елена Сидорова",
      dueDate: "2024-03-15",
    },
  ])
  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "medium", assignee: "", dueDate: "" })
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)

  // Employee management states
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Анна Иванова",
      email: "anna@company.com",
      role: "Менеджер проектов",
      status: "Активен",
      avatar: "А",
      productivity: 95,
    },
    {
      id: 2,
      name: "Михаил Петров",
      email: "mikhail@company.com",
      role: "Разработчик",
      status: "Активен",
      avatar: "М",
      productivity: 88,
    },
    {
      id: 3,
      name: "Елена Сидорова",
      email: "elena@company.com",
      role: "Дизайнер",
      status: "Активен",
      avatar: "Е",
      productivity: 92,
    },
  ])
  const [newEmployee, setNewEmployee] = useState({ name: "", email: "", role: "Сотрудник" })
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [showAssignRoleModal, setShowAssignRoleModal] = useState(false)

  // Role management states
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Администратор",
      description: "Полный доступ к системе",
      permissions: ["read", "write", "delete", "admin"],
      users: 2,
    },
    {
      id: 2,
      name: "Менеджер",
      description: "Управление проектами и командой",
      permissions: ["read", "write"],
      users: 5,
    },
    { id: 3, name: "Сотрудник", description: "Базовый доступ к системе", permissions: ["read"], users: 15 },
  ])
  const [newRole, setNewRole] = useState({ name: "", description: "", permissions: [] })
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false)

  // Lead management states
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "ООО Технологии",
      email: "info@tech.com",
      phone: "+7 (495) 123-45-67",
      status: "Новый",
      value: 150000,
      source: "Сайт",
    },
    {
      id: 2,
      name: "ИП Смирнов",
      email: "smirnov@mail.ru",
      phone: "+7 (495) 987-65-43",
      status: "В работе",
      value: 75000,
      source: "Реклама",
    },
  ])
  const [newLead, setNewLead] = useState({ name: "", email: "", phone: "", value: "", source: "Сайт" })
  const [showAddLeadModal, setShowAddLeadModal] = useState(false)

  // Settings states
  const [userSettings, setUserSettings] = useState({})
  const [settingsCategory, setSettingsCategory] = useState("")
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "system",
    fontSize: "medium",
    density: "comfortable",
    colorScheme: "blue",
    animations: true,
    accessibility: false,
  })
  const [integrationSettings, setIntegrationSettings] = useState({
    availableIntegrations: [
      { id: "1", name: "Slack", description: "Командное общение", connected: true, category: "Коммуникации" },
      { id: "2", name: "Google Drive", description: "Облачное хранилище", connected: false, category: "Хранилище" },
      { id: "3", name: "Zoom", description: "Видеоконференции", connected: true, category: "Коммуникации" },
    ],
    newIntegration: { name: "", description: "", category: "Коммуникации" },
  })

  const [searchQuery, setSearchQuery] = useState("")
  const [showNotificationsModal, setShowNotificationsModal] = useState(false)

  const [availableRoles, setAvailableRoles] = useState([
    "Администратор",
    "Менеджер",
    "Разработчик",
    "Дизайнер",
    "Аналитик",
    "Сотрудник",
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
        description: newProject.description,
      }
      setProjects([...projects, project])
      setNewProject({ name: "", deadline: "", team: [], description: "" })
      setShowAddProjectModal(false)

      setNotification({
        type: "success",
        message: `Проект "${newProject.name}" успешно создан`,
      })
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const handleCreateRole = () => {
    if (newRole.name && newRole.permissions.length > 0) {
      const role = {
        id: roles.length + 1,
        name: newRole.name,
        description: newRole.description,
        permissions: newRole.permissions,
        users: 0,
      }
      setRoles([...roles, role])
      setNewRole({ name: "", description: "", permissions: [] })
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

  const handleAddTask = () => {
    if (newTask.title && newTask.assignee) {
      const task = {
        id: tasks.length + 1,
        title: newTask.title,
        assignee: newTask.assignee,
        priority: newTask.priority,
        status: "К выполнению",
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

  const handleViewProjectDetails = (project) => {
    setSelectedProject(project)
    setShowProjectDetailsModal(true)
  }

  const handleOpenSettings = (category: string) => {
    setSettingsCategory(category)
    setShowSettingsModal(true)
  }

  const handleSaveAppearanceSettings = () => {
    localStorage.setItem("appearance-settings", JSON.stringify(appearanceSettings))

    // Применяем настройки темы
    if (appearanceSettings.theme === "dark") {
      document.documentElement.classList.add("dark")
    } else if (appearanceSettings.theme === "light") {
      document.documentElement.classList.remove("dark")
    } else {
      // system theme
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      document.documentElement.classList.toggle("dark", systemDark)
    }

    // Применяем размер шрифта
    document.documentElement.style.fontSize =
      appearanceSettings.fontSize === "small" ? "14px" : appearanceSettings.fontSize === "large" ? "18px" : "16px"

    setNotification({
      type: "success",
      message: "Настройки внешнего вида сохранены",
    })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleAddIntegration = () => {
    if (integrationSettings.newIntegration.name.trim()) {
      const newIntegration = {
        id: Date.now().toString(),
        name: integrationSettings.newIntegration.name,
        description: integrationSettings.newIntegration.description || "Пользовательская интеграция",
        connected: false,
        category: integrationSettings.newIntegration.category,
      }

      setIntegrationSettings((prev) => ({
        ...prev,
        availableIntegrations: [...prev.availableIntegrations, newIntegration],
        newIntegration: { name: "", description: "", category: "Коммуникации" },
      }))

      setNotification({
        type: "success",
        message: `Интеграция "${newIntegration.name}" добавлена`,
      })
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const toggleIntegration = (integrationId: string) => {
    setIntegrationSettings((prev) => ({
      ...prev,
      availableIntegrations: prev.availableIntegrations.map((integration) =>
        integration.id === integrationId ? { ...integration, connected: !integration.connected } : integration,
      ),
    }))
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)

    // Загружаем сохраненные настройки внешнего вида
    const savedSettings = localStorage.getItem("appearance-settings")
    if (savedSettings) {
      setAppearanceSettings(JSON.parse(savedSettings))
    }

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <TooltipProvider>
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground">Загрузка данных платформы...</p>
          </div>
        </div>
      </TooltipProvider>
    )
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {notification && (
          <div
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
              notification.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {notification.message}
          </div>
        )}

        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold">Личный кабинет</h1>
            </div>

            <div className="flex items-center gap-4">
              <Button onClick={() => (window.location.href = "/")} variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                На главную
              </Button>

              <Button
                onClick={() => window.open("/guide", "_blank")}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Гид по функциям
              </Button>

              <Button
                onClick={() => setShowSupportChat(true)}
                variant="outline"
                className="border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/20"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Поддержка
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Поиск..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>

              <Button variant="ghost" size="icon" onClick={() => setShowNotificationsModal(true)} className="relative">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {notifications}
                  </Badge>
                )}
              </Button>

              <Button variant="ghost" size="icon" onClick={() => handleOpenSettings("general")}>
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto p-6">
          <div className="flex gap-6">
            {/* Sidebar Navigation */}
            <div className="w-80 bg-card rounded-lg border p-6">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  <h1 className="text-lg font-semibold">Управление бизнесом</h1>
                </div>
                <p className="text-sm text-muted-foreground">Ваша ИИ-платформа роста</p>
              </div>

              <div className="space-y-4">
                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-sm font-medium text-left hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 rounded-md transition-all duration-300">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4" />
                      УПРАВЛЕНИЕ БИЗНЕСОМ
                    </div>
                    <ChevronUp className="w-4 h-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 mt-2 ml-6">
                    <Button
                      variant={activeTab === "overview" ? "secondary" : "ghost"}
                      className={`w-full justify-start text-sm ${
                        activeTab === "overview"
                          ? "bg-teal-600 text-white hover:bg-teal-700"
                          : "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300"
                      }`}
                      onClick={() => setActiveTab("overview")}
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Обзор бизнеса
                    </Button>
                    <Button
                      variant={activeTab === "strategy" ? "secondary" : "ghost"}
                      className={`w-full justify-start text-sm ${
                        activeTab === "strategy"
                          ? "bg-teal-600 text-white hover:bg-teal-700"
                          : "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300"
                      }`}
                      onClick={() => setActiveTab("strategy")}
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Стратегия и цели
                      <Badge variant="secondary" className="ml-auto bg-teal-100 text-teal-800">
                        NEW
                      </Badge>
                    </Button>
                    <Button
                      variant={activeTab === "projects" ? "secondary" : "ghost"}
                      className={`w-full justify-start text-sm ${
                        activeTab === "projects"
                          ? "bg-teal-600 text-white hover:bg-teal-700"
                          : "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300"
                      }`}
                      onClick={() => setActiveTab("projects")}
                    >
                      <FolderOpen className="w-4 h-4 mr-2" />
                      Активные проекты
                      <Badge variant="outline" className="ml-auto">
                        3
                      </Badge>
                    </Button>
                    <Button
                      variant={activeTab === "tasks" ? "secondary" : "ghost"}
                      className={`w-full justify-start text-sm ${
                        activeTab === "tasks"
                          ? "bg-teal-600 text-white hover:bg-teal-700"
                          : "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300"
                      }`}
                      onClick={() => setActiveTab("tasks")}
                    >
                      <CheckSquare className="w-4 h-4 mr-2" />
                      Управление задачами
                      <Badge variant="outline" className="ml-auto">
                        8
                      </Badge>
                    </Button>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-sm font-medium text-left hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 rounded-md transition-all duration-300">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      ФИНАНСЫ И ДОКУМЕНТООБОРОТ
                    </div>
                    <ChevronUp className="w-4 h-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 mt-2 ml-6">
                    <Button
                      variant={activeTab === "finance" ? "secondary" : "ghost"}
                      className={`w-full justify-start text-sm ${
                        activeTab === "finance"
                          ? "bg-teal-600 text-white hover:bg-teal-700"
                          : "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300"
                      }`}
                      onClick={() => setActiveTab("finance")}
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      Финансы
                    </Button>
                    <Button
                      variant={activeTab === "sales" ? "secondary" : "ghost"}
                      className={`w-full justify-start text-sm ${
                        activeTab === "sales"
                          ? "bg-teal-600 text-white hover:bg-teal-700"
                          : "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300"
                      }`}
                      onClick={() => setActiveTab("sales")}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Продажи
                      <Badge variant="outline" className="ml-auto">
                        156
                      </Badge>
                    </Button>
                    <Button
                      variant={activeTab === "edo" ? "secondary" : "ghost"}
                      className={`w-full justify-start text-sm ${
                        activeTab === "edo"
                          ? "bg-teal-600 text-white hover:bg-teal-700"
                          : "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300"
                      }`}
                      onClick={() => setActiveTab("edo")}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      ЭДО | Документооборот
                      <Badge variant="secondary" className="ml-auto bg-teal-100 text-teal-800">
                        NEW
                      </Badge>
                    </Button>
                    <Button
                      variant={activeTab === "legal" ? "secondary" : "ghost"}
                      className={`w-full justify-start text-sm ${
                        activeTab === "legal"
                          ? "bg-teal-600 text-white hover:bg-teal-700"
                          : "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300"
                      }`}
                      onClick={() => setActiveTab("legal")}
                    >
                      <Scale className="w-4 h-4 mr-2" />
                      Правовой контур
                      <Badge variant="secondary" className="ml-auto bg-teal-100 text-teal-800">
                        NEW
                      </Badge>
                    </Button>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-sm font-medium text-left hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 rounded-md transition-all duration-300">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      КАДРЫ И КОМАНДА
                    </div>
                    <ChevronUp className="w-4 h-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 mt-2 ml-6">
                    <Button
                      variant={activeTab === "hr" ? "secondary" : "ghost"}
                      className={`w-full justify-start text-sm ${
                        activeTab === "hr"
                          ? "bg-teal-600 text-white hover:bg-teal-700"
                          : "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300"
                      }`}
                      onClick={() => setActiveTab("hr")}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      HR и развитие команды
                      <Badge variant="secondary" className="ml-auto bg-teal-100 text-teal-800">
                        NEW
                      </Badge>
                    </Button>
                    <Button
                      variant={activeTab === "team" ? "secondary" : "ghost"}
                      className={`w-full justify-start text-sm ${
                        activeTab === "team"
                          ? "bg-teal-600 text-white hover:bg-teal-700"
                          : "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300"
                      }`}
                      onClick={() => setActiveTab("team")}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Команда
                    </Button>
                    <Button
                      variant={activeTab === "roles" ? "secondary" : "ghost"}
                      className={`w-full justify-start text-sm ${
                        activeTab === "roles"
                          ? "bg-teal-600 text-white hover:bg-teal-700"
                          : "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300"
                      }`}
                      onClick={() => setActiveTab("roles")}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Роли и права
                    </Button>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-sm font-medium text-left hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 rounded-md transition-all duration-300">
                    <div className="flex items-center gap-2">
                      <Brain className="w-4 h-4" />
                      ИИ-ИНСТРУМЕНТЫ
                    </div>
                    <ChevronUp className="w-4 h-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 mt-2 ml-6">
                    <Button
                      variant={activeTab === "ai-agent" ? "secondary" : "ghost"}
                      className={`w-full justify-start text-sm ${
                        activeTab === "ai-agent"
                          ? "bg-teal-600 text-white hover:bg-teal-700"
                          : "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300"
                      }`}
                      onClick={() => setActiveTab("ai-agent")}
                    >
                      <Brain className="w-4 h-4 mr-2" />
                      ИИ-Агент для бизнеса
                      <Badge variant="secondary" className="ml-auto bg-teal-100 text-teal-800">
                        NEW
                      </Badge>
                    </Button>
                    <Button
                      variant={activeTab === "ai-tools" ? "secondary" : "ghost"}
                      className={`w-full justify-start text-sm ${
                        activeTab === "ai-tools"
                          ? "bg-teal-600 text-white hover:bg-teal-700"
                          : "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300"
                      }`}
                      onClick={() => setActiveTab("ai-tools")}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      ИИ-инструменты
                      <Badge variant="outline" className="ml-auto">
                        5
                      </Badge>
                    </Button>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-sm font-medium text-left hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 rounded-md transition-all duration-300">
                    <div className="flex items-center gap-2">
                      <Megaphone className="w-4 h-4" />
                      МАРКЕТИНГ И КЛИЕНТЫ
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 mt-2 ml-6">
                    <Button
                      variant={activeTab === "marketing" ? "secondary" : "ghost"}
                      className={`w-full justify-start text-sm ${
                        activeTab === "marketing"
                          ? "bg-teal-600 text-white hover:bg-teal-700"
                          : "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300"
                      }`}
                      onClick={() => setActiveTab("marketing")}
                    >
                      <Megaphone className="w-4 h-4 mr-2" />
                      Маркетинг и клиенты
                      <Badge variant="secondary" className="ml-auto bg-teal-100 text-teal-800">
                        NEW
                      </Badge>
                    </Button>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-sm font-medium text-left hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 rounded-md transition-all duration-300">
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      СИСТЕМА
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1 mt-2 ml-6">
                    <Button
                      variant={activeTab === "files" ? "secondary" : "ghost"}
                      className={`w-full justify-start text-sm ${
                        activeTab === "files"
                          ? "bg-teal-600 text-white hover:bg-teal-700"
                          : "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300"
                      }`}
                      onClick={() => setActiveTab("files")}
                    >
                      <FolderOpen className="w-4 h-4 mr-2" />
                      Файловое хранилище
                      <Badge variant="outline" className="ml-auto">
                        24
                      </Badge>
                    </Button>
                    <Button
                      variant={activeTab === "settings" ? "secondary" : "ghost"}
                      className={`w-full justify-start text-sm ${
                        activeTab === "settings"
                          ? "bg-teal-600 text-white hover:bg-teal-700"
                          : "hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-900/20 dark:hover:to-teal-900/20 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all duration-300"
                      }`}
                      onClick={() => setActiveTab("settings")}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Настройки
                    </Button>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Обзор бизнеса</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <AnimatedMetrics />
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Bell className="w-5 h-5" />
                          Последние уведомления
                        </CardTitle>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-3">
                          {notificationsList.slice(0, 3).map((notification) => (
                            <div
                              key={notification.id}
                              className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                            >
                              <div
                                className={`w-2 h-2 rounded-full mt-2 ${
                                  notification.type === "success"
                                    ? "bg-green-500"
                                    : notification.type === "warning"
                                      ? "bg-yellow-500"
                                      : "bg-blue-500"
                                }`}
                              />
                              <div className="flex-1">
                                <p className="font-medium text-sm">{notification.title}</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Быстрые действия</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            variant="outline"
                            className="h-20 flex flex-col gap-2 bg-transparent"
                            onClick={() => setShowAddProjectModal(true)}
                          >
                            <Plus className="w-5 h-5" />
                            <span className="text-xs">Новый проект</span>
                          </Button>
                          <Button
                            variant="outline"
                            className="h-20 flex flex-col gap-2 bg-transparent"
                            onClick={() => setShowAddTaskModal(true)}
                          >
                            <CheckSquare className="w-5 h-5" />
                            <span className="text-xs">Новая задача</span>
                          </Button>
                          <Button
                            variant="outline"
                            className="h-20 flex flex-col gap-2 bg-transparent"
                            onClick={() => setActiveTab("sales")}
                          >
                            <TrendingUp className="w-5 h-5" />
                            <span className="text-xs">Продажи</span>
                          </Button>
                          <Button
                            variant="outline"
                            className="h-20 flex flex-col gap-2 bg-transparent"
                            onClick={() => setActiveTab("analytics")}
                          >
                            <BarChart3 className="w-5 h-5" />
                            <span className="text-xs">Аналитика</span>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === "projects" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Активные проекты</h2>
                    <Button onClick={() => setShowAddProjectModal(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Новый проект
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <Card key={project.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <CardTitle className="text-lg">{project.name}</CardTitle>
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
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between text-sm mb-2">
                                <span>Прогресс</span>
                                <span>{project.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${project.progress}%` }}
                                />
                              </div>
                            </div>

                            <div className="flex justify-between text-sm">
                              <span>Команда:</span>
                              <div className="flex gap-1">
                                {project.team.map((member, index) => (
                                  <div
                                    key={index}
                                    className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs"
                                  >
                                    {member}
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="flex justify-between text-sm">
                              <span>Дедлайн:</span>
                              <span>{project.deadline}</span>
                            </div>

                            <div className="flex gap-2 pt-2">
                              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                                <Eye className="w-4 h-4 mr-1" />
                                Просмотр
                              </Button>
                              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                                <Edit className="w-4 h-4 mr-1" />
                                Изменить
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Диаграмма Ганта</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <GanttChart projects={projects} />
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "tasks" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Управление задачами</h2>
                    <Button onClick={() => setShowAddTaskModal(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Новая задача
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">К выполнению</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {tasks
                            .filter((task) => task.status === "К выполнению")
                            .map((task) => (
                              <div key={task.id} className="p-3 border rounded-lg">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-medium">{task.title}</h4>
                                  <Badge
                                    variant={
                                      task.priority === "Высокий"
                                        ? "destructive"
                                        : task.priority === "Средний"
                                          ? "default"
                                          : "secondary"
                                    }
                                  >
                                    {task.priority}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                                <div className="flex justify-between items-center text-xs">
                                  <span>Исполнитель: {task.assignee}</span>
                                  <span>{task.dueDate}</span>
                                </div>
                                <div className="flex gap-2 mt-3">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleUpdateTaskStatus(task.id, "В работе")}
                                  >
                                    Начать
                                  </Button>
                                  <Button size="sm" variant="destructive" onClick={() => handleDeleteTask(task.id)}>
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          {tasks.filter((task) => task.status === "К выполнению").length === 0 && (
                            <p className="text-gray-500 text-center py-4">Нет задач к выполнению</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">В работе</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {tasks
                            .filter((task) => task.status === "В работе")
                            .map((task) => (
                              <div key={task.id} className="p-3 border rounded-lg bg-blue-50 dark:bg-blue-900/20">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-medium">{task.title}</h4>
                                  <Badge
                                    variant={
                                      task.priority === "Высокий"
                                        ? "destructive"
                                        : task.priority === "Средний"
                                          ? "default"
                                          : "secondary"
                                    }
                                  >
                                    {task.priority}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                                <div className="flex justify-between items-center text-xs">
                                  <span>Исполнитель: {task.assignee}</span>
                                  <span>{task.dueDate}</span>
                                </div>
                                <div className="flex gap-2 mt-3">
                                  <Button
                                    size="sm"
                                    variant="default"
                                    onClick={() => handleUpdateTaskStatus(task.id, "Завершена")}
                                  >
                                    Завершить
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleUpdateTaskStatus(task.id, "К выполнению")}
                                  >
                                    Вернуть
                                  </Button>
                                  <Button size="sm" variant="destructive" onClick={() => handleDeleteTask(task.id)}>
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          {tasks.filter((task) => task.status === "В работе").length === 0 && (
                            <p className="text-gray-500 text-center py-4">Нет задач в работе</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Завершены</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {tasks
                            .filter((task) => task.status === "Завершена")
                            .map((task) => (
                              <div key={task.id} className="p-3 border rounded-lg bg-green-50 dark:bg-green-900/20">
                                <div className="flex justify-between items-start mb-2">
                                  <h4 className="font-medium">{task.title}</h4>
                                  <Badge variant="default">{task.priority}</Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                                <div className="flex justify-between items-center text-xs">
                                  <span>Исполнитель: {task.assignee}</span>
                                  <span>{task.dueDate}</span>
                                </div>
                                <div className="flex gap-2 mt-3">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleUpdateTaskStatus(task.id, "В работе")}
                                  >
                                    Переоткрыть
                                  </Button>
                                  <Button size="sm" variant="destructive" onClick={() => handleDeleteTask(task.id)}>
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          {tasks.filter((task) => task.status === "Завершена").length === 0 && (
                            <p className="text-gray-500 text-center py-4">Нет завершенных задач</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === "finance" && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Финансы</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FinanceManager />
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "sales" && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Продажи</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <SalesManager leads={leads} />
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "edo" && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>ЭДО | Документооборот</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <EDODashboard />
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "legal" && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Правовой контур</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <LegalDashboard />
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "hr" && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>HR и развитие команды</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <HRDashboard employees={employees} />
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "team" && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Команда
                        <Button onClick={() => setShowAddEmployeeModal(true)}>
                          <Plus className="w-4 h-4 mr-2" />
                          Добавить сотрудника
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {employees.map((employee) => (
                          <Card key={employee.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                  <span className="font-semibold text-primary">{employee.avatar}</span>
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-medium">{employee.name}</h4>
                                  <p className="text-sm text-muted-foreground">{employee.role}</p>
                                </div>
                                <Badge variant={employee.status === "Активен" ? "default" : "secondary"}>
                                  {employee.status}
                                </Badge>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                  <span>Email:</span>
                                  <span className="text-muted-foreground">{employee.email}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Продуктивность:</span>
                                  <span className="font-medium">{employee.productivity}%</span>
                                </div>
                                <div className="flex gap-2 pt-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      setSelectedEmployee(employee)
                                      setShowAssignRoleModal(true)
                                    }}
                                  >
                                    <Edit className="w-3 h-3 mr-1" />
                                    Роль
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => handleRemoveEmployee(employee.id)}
                                  >
                                    <Trash2 className="w-3 h-3 mr-1" />
                                    Удалить
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "roles" && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        Роли и права
                        <Button onClick={() => setShowCreateRoleModal(true)}>
                          <Plus className="w-4 h-4 mr-2" />
                          Создать роль
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {roles.map((role) => (
                          <Card key={role.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <h4 className="font-medium">{role.name}</h4>
                                  <p className="text-sm text-muted-foreground">{role.description}</p>
                                </div>
                                <div className="text-right">
                                  <Badge variant="outline">{role.users} пользователей</Badge>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2 mb-3">
                                {role.permissions.map((permission) => (
                                  <Badge key={permission} variant="secondary" className="text-xs">
                                    {permission === "read" && "Чтение"}
                                    {permission === "write" && "Запись"}
                                    {permission === "delete" && "Удаление"}
                                    {permission === "admin" && "Администратор"}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm">
                                  <Edit className="w-3 h-3 mr-1" />
                                  Редактировать
                                </Button>
                                <Button variant="destructive" size="sm">
                                  <Trash2 className="w-3 h-3 mr-1" />
                                  Удалить
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "ai-agent" && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>ИИ-Агент для бизнеса</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <AIBusinessAgent />
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "files" && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Файловое хранилище</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FileManager />
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "strategy" && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Стратегия и цели</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <StrategyDashboard />
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "marketing" && (
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Маркетинг и клиенты</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <MarketingDashboard />
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Notifications Modal */}
        {showNotificationsModal && (
          <Dialog open={showNotificationsModal} onOpenChange={setShowNotificationsModal}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Уведомления</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {notificationsList.map((notification) => (
                  <div key={notification.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getNotificationIcon(notification.type)}
                      <div>
                        <p className="font-semibold">{notification.title}</p>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => markNotificationAsRead(notification.id)}
                      className="relative"
                    >
                      {notification.read ? (
                        <Eye className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Bell className="w-4 h-4 text-primary" />
                      )}
                    </Button>
                  </div>
                ))}
                <Button onClick={markAllAsRead} variant="outline" className="w-full bg-transparent">
                  Пометить все как прочитанные
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* Add Task Modal */}
        <Dialog open={showAddTaskModal} onOpenChange={setShowAddTaskModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Создать новую задачу</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="taskTitle">Название задачи</Label>
                <Input
                  id="taskTitle"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Введите название задачи"
                />
              </div>
              <div>
                <Label htmlFor="taskAssignee">Исполнитель</Label>
                <Input
                  id="taskAssignee"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                  placeholder="Введите имя исполнителя"
                />
              </div>
              <div>
                <Label htmlFor="taskPriority">Приоритет</Label>
                <Select value={newTask.priority} onValueChange={(value) => setNewTask({ ...newTask, priority: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Низкий">Низкий</SelectItem>
                    <SelectItem value="Средний">Средний</SelectItem>
                    <SelectItem value="Высокий">Высокий</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="taskDueDate">Срок выполнения</Label>
                <Input
                  id="taskDueDate"
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="taskDescription">Описание</Label>
                <textarea
                  id="taskDescription"
                  className="w-full p-2 border rounded-md"
                  rows={3}
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Введите описание задачи"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddTaskModal(false)}>
                Отмена
              </Button>
              <Button onClick={handleAddTask}>Создать задачу</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Support Chat */}
        {showSupportChat && <SupportChat onClose={() => setShowSupportChat(false)} />}

        {/* Add Project Modal */}
        <Dialog open={showAddProjectModal} onOpenChange={setShowAddProjectModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Создать новый проект</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectName">Название проекта</Label>
                <Input
                  id="projectName"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  placeholder="Введите название проекта"
                />
              </div>
              <div>
                <Label htmlFor="projectDescription">Описание</Label>
                <Input
                  id="projectDescription"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Введите описание проекта"
                />
              </div>
              <div>
                <Label htmlFor="projectDeadline">Срок завершения</Label>
                <Input
                  id="projectDeadline"
                  type="date"
                  value={newProject.deadline}
                  onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddProjectModal(false)}>
                Отмена
              </Button>
              <Button onClick={handleAddProject}>Создать проект</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Employee Modal */}
        <Dialog open={showAddEmployeeModal} onOpenChange={setShowAddEmployeeModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Добавить сотрудника</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="employeeName">Имя сотрудника</Label>
                <Input
                  id="employeeName"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                  placeholder="Введите имя сотрудника"
                />
              </div>
              <div>
                <Label htmlFor="employeeEmail">Email</Label>
                <Input
                  id="employeeEmail"
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                  placeholder="Введите email сотрудника"
                />
              </div>
              <div>
                <Label htmlFor="employeeRole">Роль</Label>
                <Select
                  value={newEmployee.role}
                  onValueChange={(value) => setNewEmployee({ ...newEmployee, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {availableRoles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddEmployeeModal(false)}>
                Отмена
              </Button>
              <Button onClick={handleAddEmployee}>Добавить сотрудника</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create Role Modal */}
        <Dialog open={showCreateRoleModal} onOpenChange={setShowCreateRoleModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Создать новую роль</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="roleName">Название роли</Label>
                <Input
                  id="roleName"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  placeholder="Введите название роли"
                />
              </div>
              <div>
                <Label htmlFor="roleDescription">Описание</Label>
                <Input
                  id="roleDescription"
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  placeholder="Введите описание роли"
                />
              </div>
              <div>
                <Label>Права доступа</Label>
                <div className="space-y-2">
                  {["read", "write", "delete", "admin"].map((permission) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={permission}
                        checked={newRole.permissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewRole({ ...newRole, permissions: [...newRole.permissions, permission] })
                          } else {
                            setNewRole({ ...newRole, permissions: newRole.permissions.filter((p) => p !== permission) })
                          }
                        }}
                      />
                      <Label htmlFor={permission}>
                        {permission === "read" && "Чтение"}
                        {permission === "write" && "Запись"}
                        {permission === "delete" && "Удаление"}
                        {permission === "admin" && "Администратор"}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateRoleModal(false)}>
                Отмена
              </Button>
              <Button onClick={handleCreateRole}>Создать роль</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Assign Role Modal */}
        <Dialog open={showAssignRoleModal} onOpenChange={setShowAssignRoleModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Назначить роль</DialogTitle>
            </DialogHeader>
            {selectedEmployee && (
              <div className="space-y-4">
                <p>
                  Назначить роль для: <strong>{selectedEmployee.name}</strong>
                </p>
                <div>
                  <Label>Выберите роль</Label>
                  <Select onValueChange={(value) => handleAssignRole(selectedEmployee.id, value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите роль" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableRoles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAssignRoleModal(false)}>
                Отмена
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Settings Modal */}
        <Dialog open={showSettingsModal} onOpenChange={setShowSettingsModal}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Настройки системы</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Внешний вид</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Тема</Label>
                      <Select
                        value={appearanceSettings.theme}
                        onValueChange={(value) => setAppearanceSettings({ ...appearanceSettings, theme: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Светлая</SelectItem>
                          <SelectItem value="dark">Темная</SelectItem>
                          <SelectItem value="system">Системная</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Размер шрифта</Label>
                      <Select
                        value={appearanceSettings.fontSize}
                        onValueChange={(value) => setAppearanceSettings({ ...appearanceSettings, fontSize: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Маленький</SelectItem>
                          <SelectItem value="medium">Средний</SelectItem>
                          <SelectItem value="large">Большой</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={handleSaveAppearanceSettings} className="w-full">
                      Сохранить настройки внешнего вида
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Интеграции</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {integrationSettings.availableIntegrations.map((integration) => (
                        <div key={integration.id} className="flex items-center justify-between p-2 border rounded">
                          <div>
                            <p className="font-medium">{integration.name}</p>
                            <p className="text-xs text-muted-foreground">{integration.description}</p>
                          </div>
                          <Button
                            variant={integration.connected ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleIntegration(integration.id)}
                          >
                            {integration.connected ? "Отключить" : "Подключить"}
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2 pt-4 border-t">
                      <Input
                        placeholder="Название интеграции"
                        value={integrationSettings.newIntegration.name}
                        onChange={(e) =>
                          setIntegrationSettings({
                            ...integrationSettings,
                            newIntegration: { ...integrationSettings.newIntegration, name: e.target.value },
                          })
                        }
                      />
                      <Input
                        placeholder="Описание"
                        value={integrationSettings.newIntegration.description}
                        onChange={(e) =>
                          setIntegrationSettings({
                            ...integrationSettings,
                            newIntegration: { ...integrationSettings.newIntegration, description: e.target.value },
                          })
                        }
                      />
                      <Button onClick={handleAddIntegration} className="w-full">
                        Добавить интеграцию
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Общие настройки</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Анимации</Label>
                      <input
                        type="checkbox"
                        checked={appearanceSettings.animations}
                        onChange={(e) => setAppearanceSettings({ ...appearanceSettings, animations: e.target.checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Режим доступности</Label>
                      <input
                        type="checkbox"
                        checked={appearanceSettings.accessibility}
                        onChange={(e) =>
                          setAppearanceSettings({ ...appearanceSettings, accessibility: e.target.checked })
                        }
                      />
                    </div>
                    <Button onClick={() => handleSaveSettings("general", appearanceSettings)} className="w-full">
                      Сохранить общие настройки
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowSettingsModal(false)}>
                Закрыть
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}
