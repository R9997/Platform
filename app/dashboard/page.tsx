"use client"

import { useState, useEffect } from "react"
import {
  Bell,
  MessageSquare,
  CheckSquare,
  Settings,
  Palette,
  Zap,
  Users,
  FileText,
  Briefcase,
  Target,
  Search,
  Plus,
  Edit,
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
  Trash2,
} from "lucide-react"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

import { SalesManager } from "@/components/business-tools/sales-manager"
import { FinanceManager } from "@/components/business-tools/finance-manager"
import { FileManager } from "@/components/file-storage/file-manager"
import { StrategyDashboard } from "@/components/strategy/strategy-dashboard"
import { EDODashboard } from "@/components/edo/edo-dashboard"
import { LegalDashboard } from "@/components/legal/legal-dashboard"
import { HRDashboard } from "@/components/hr-management/hr-dashboard"
import { AIBusinessAgent } from "@/components/ai-agent/ai-business-agent"
import { MarketingDashboard } from "@/components/marketing/marketing-dashboard"
import { GanttChart } from "@/components/project-management/gantt-chart"

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
      description: "Описание проекта",
    },
    {
      id: 2,
      name: "ИИ-чатбот поддержки",
      status: "Планирование",
      progress: 25,
      team: ["Е", "Д"],
      deadline: "2024-03-01",
      description: "Описание проекта",
    },
    {
      id: 3,
      name: "Аналитика клиентов",
      status: "Завершен",
      progress: 100,
      team: ["А", "Д"],
      deadline: "2024-01-30",
      description: "Описание проекта",
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

  const [newRole, setNewRole] = useState({ name: "", description: "", permissions: [] as string[] })
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

  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null)
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Администратор",
      description: "Полный доступ ко всем функциям",
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
    {
      id: 3,
      name: "Сотрудник",
      description: "Базовый доступ к функциям",
      permissions: ["read"],
      users: 12,
    },
  ])

  const [integrationSettings, setIntegrationSettings] = useState({
    availableIntegrations: [
      {
        id: "1",
        name: "Slack",
        description: "Корпоративный мессенджер для команды",
        connected: true,
        category: "Коммуникации",
      },
      {
        id: "2",
        name: "Google Calendar",
        description: "Синхронизация календаря и событий",
        connected: false,
        category: "Календарь",
      },
      {
        id: "3",
        name: "Dropbox",
        description: "Облачное хранилище файлов",
        connected: true,
        category: "Хранилище",
      },
      {
        id: "4",
        name: "Zapier",
        description: "Автоматизация бизнес-процессов",
        connected: false,
        category: "Автоматизация",
      },
    ],
    newIntegration: {
      name: "",
      description: "",
      category: "Коммуникации",
    },
  })

  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [settingsCategory, setSettingsCategory] = useState<string>("")
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "system", // light, dark, system
    fontSize: "medium", // small, medium, large
    density: "comfortable", // compact, comfortable, spacious
    animations: true,
    reducedMotion: false,
    highContrast: false,
    showTooltips: true,
    sidebarCollapsed: false,
    colorScheme: "default", // default, blue, green, purple
  })

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

      // Показать уведомление об успешном создании
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
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                size="sm"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Гид по функциям
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
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-sm font-medium text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
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
                          : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
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
                          : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
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
                          : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
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
                          : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
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
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-sm font-medium text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
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
                          : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
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
                          : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
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
                          : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
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
                          : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
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
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-sm font-medium text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
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
                          : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
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
                          : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
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
                          : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      }`}
                      onClick={() => setActiveTab("roles")}
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Роли и права
                    </Button>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible defaultOpen>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-sm font-medium text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
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
                          : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
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
                          : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
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
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-sm font-medium text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
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
                          : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
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
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-sm font-medium text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors">
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
                          : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
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
                          : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      }`}
                      onClick={() => setActiveTab("settings")}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Настройки
                    </Button>
                  </CollapsibleContent>
                </Collapsible>
              </div>

              {/* Main Content */}
            </div>

            <div className="flex-1">
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Обзор бизнеса</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Общая выручка</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">₽2,450,000</div>
                        <p className="text-xs text-muted-foreground">+12% с прошлого месяца</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Активные проекты</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{projects.length}</div>
                        <p className="text-xs text-muted-foreground">2 завершены в этом месяце</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Команда</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{employees.length}</div>
                        <p className="text-xs text-muted-foreground">Средняя продуктивность 91%</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Лиды</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{leads.length}</div>
                        <p className="text-xs text-muted-foreground">+5 новых за неделю</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === "goals" && <StrategyDashboard />}
              {activeTab === "projects" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Активные проекты</h2>
                    <Button onClick={() => setShowAddProjectModal(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Новый проект
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <Card key={project.id} className="cursor-pointer hover:shadow-md transition-shadow">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{project.name}</CardTitle>
                            <Badge variant={project.status === "Завершен" ? "default" : "secondary"}>
                              {project.status}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Прогресс</span>
                              <span>{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} />
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex -space-x-2">
                              {project.team.map((member, index) => (
                                <Avatar key={index} className="w-6 h-6 border-2 border-background">
                                  <AvatarFallback className="text-xs">{member}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            <span className="text-muted-foreground">{project.deadline}</span>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleViewProjectDetails(project)}>
                              <Eye className="w-4 h-4 mr-1" />
                              Просмотр
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4 mr-1" />
                              Изменить
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Диаграмма Ганта</h3>
                    <GanttChart projects={projects} />
                  </div>
                </div>
              )}

              {activeTab === "tasks" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
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
                                <h4 className="font-medium">{task.title}</h4>
                                <p className="text-sm text-muted-foreground">{task.assignee}</p>
                                <Badge variant="outline" className="mt-2">
                                  {task.priority}
                                </Badge>
                              </div>
                            ))}
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
                              <div key={task.id} className="p-3 border rounded-lg">
                                <h4 className="font-medium">{task.title}</h4>
                                <p className="text-sm text-muted-foreground">{task.assignee}</p>
                                <Badge variant="outline" className="mt-2">
                                  {task.priority}
                                </Badge>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Завершено</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {tasks
                            .filter((task) => task.status === "Завершено")
                            .map((task) => (
                              <div key={task.id} className="p-3 border rounded-lg">
                                <h4 className="font-medium">{task.title}</h4>
                                <p className="text-sm text-muted-foreground">{task.assignee}</p>
                                <Badge variant="outline" className="mt-2">
                                  {task.priority}
                                </Badge>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {activeTab === "sales" && <SalesManager />}
              {activeTab === "finance" && <FinanceManager />}
              {activeTab === "files" && <FileManager />}
              {activeTab === "strategy" && <AIBusinessAgent />}
              {activeTab === "edo" && <EDODashboard />}
              {activeTab === "legal" && <LegalDashboard />}
              {activeTab === "hr" && <HRDashboard />}
              {activeTab === "marketing" && <MarketingDashboard />}

              {activeTab === "team" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Управление командой</h2>
                    <Button onClick={() => setShowAddEmployeeModal(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить сотрудника
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {employees.map((employee) => (
                      <Card key={employee.id}>
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{employee.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{employee.name}</CardTitle>
                              <p className="text-sm text-muted-foreground">{employee.role}</p>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Статус:</span>
                            <Badge variant={employee.status === "Активен" ? "default" : "secondary"}>
                              {employee.status}
                            </Badge>
                          </div>

                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span>Продуктивность</span>
                              <span>{employee.productivity}%</span>
                            </div>
                            <Progress value={employee.productivity} />
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedEmployee(employee)
                                setShowAssignRoleModal(true)
                              }}
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Роль
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleRemoveEmployee(employee.id)}>
                              <Trash2 className="w-4 h-4 mr-1" />
                              Удалить
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "roles" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Роли и права</h2>
                    <Button onClick={() => setShowCreateRoleModal(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Создать роль
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {roles.map((role) => (
                      <Card key={role.id}>
                        <CardHeader>
                          <CardTitle className="text-lg">{role.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{role.description}</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Права доступа:</h4>
                            <div className="flex flex-wrap gap-1">
                              {role.permissions.map((permission, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {permission}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm">Пользователей:</span>
                            <Badge>{role.users}</Badge>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4 mr-1" />
                              Изменить
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-4 h-4 mr-1" />
                              Удалить
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal Windows */}
        <Dialog open={showNotificationsModal} onOpenChange={setShowNotificationsModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Уведомления
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {notificationsList.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">Нет новых уведомлений</p>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      {notificationsList.filter((n) => !n.read).length} непрочитанных
                    </span>
                    <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                      Отметить все как прочитанные
                    </Button>
                  </div>
                  {notificationsList.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        notification.read ? "bg-muted/20" : "bg-background border-primary/20"
                      }`}
                      onClick={() => markNotificationAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleNotificationAction(notification.id, "view")
                          }}
                        >
                          Просмотр
                        </Button>
                        {notification.type === "warning" && (
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleNotificationAction(notification.id, "approve")
                            }}
                          >
                            Одобрить
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showAddProjectModal} onOpenChange={setShowAddProjectModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Создать новый проект</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="project-name">Название проекта</Label>
                <Input
                  id="project-name"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  placeholder="Введите название проекта"
                />
              </div>
              <div>
                <Label htmlFor="project-description">Описание</Label>
                <Textarea
                  id="project-description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Описание проекта"
                />
              </div>
              <div>
                <Label htmlFor="project-deadline">Срок завершения</Label>
                <Input
                  id="project-deadline"
                  type="date"
                  value={newProject.deadline}
                  onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddProjectModal(false)}>
                  Отмена
                </Button>
                <Button onClick={handleAddProject} disabled={!newProject.name || !newProject.deadline}>
                  Создать проект
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showSettingsModal} onOpenChange={setShowSettingsModal}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Настройки системы
              </DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="appearance" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="appearance">Внешний вид</TabsTrigger>
                <TabsTrigger value="integrations">Интеграции</TabsTrigger>
                <TabsTrigger value="system">Система</TabsTrigger>
              </TabsList>

              <TabsContent value="appearance" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      Персонализация интерфейса
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <Label>Тема оформления</Label>
                          <Select
                            value={appearanceSettings.theme}
                            onValueChange={(value) => setAppearanceSettings((prev) => ({ ...prev, theme: value }))}
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
                            onValueChange={(value) => setAppearanceSettings((prev) => ({ ...prev, fontSize: value }))}
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

                        <div>
                          <Label>Плотность интерфейса</Label>
                          <Select
                            value={appearanceSettings.density}
                            onValueChange={(value) => setAppearanceSettings((prev) => ({ ...prev, density: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="comfortable">Комфортная</SelectItem>
                              <SelectItem value="spacious">Просторная</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>Цветовая схема</Label>
                          <Select
                            value={appearanceSettings.colorScheme}
                            onValueChange={(value) =>
                              setAppearanceSettings((prev) => ({ ...prev, colorScheme: value }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="default">По умолчанию</SelectItem>
                              <SelectItem value="blue">Синяя</SelectItem>
                              <SelectItem value="green">Зеленая</SelectItem>
                              <SelectItem value="purple">Фиолетовая</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label>Анимации интерфейса</Label>
                          <Switch
                            checked={appearanceSettings.animations}
                            onCheckedChange={(checked) =>
                              setAppearanceSettings((prev) => ({ ...prev, animations: checked }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label>Уменьшенная анимация</Label>
                          <Switch
                            checked={appearanceSettings.reducedMotion}
                            onCheckedChange={(checked) =>
                              setAppearanceSettings((prev) => ({ ...prev, reducedMotion: checked }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label>Высокий контраст</Label>
                          <Switch
                            checked={appearanceSettings.highContrast}
                            onCheckedChange={(checked) =>
                              setAppearanceSettings((prev) => ({ ...prev, highContrast: checked }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label>Показывать подсказки</Label>
                          <Switch
                            checked={appearanceSettings.showTooltips}
                            onCheckedChange={(checked) =>
                              setAppearanceSettings((prev) => ({ ...prev, showTooltips: checked }))
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <Label>Свернуть боковую панель</Label>
                          <Switch
                            checked={appearanceSettings.sidebarCollapsed}
                            onCheckedChange={(checked) =>
                              setAppearanceSettings((prev) => ({ ...prev, sidebarCollapsed: checked }))
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4 border-t">
                      <Button variant="outline" onClick={() => setShowSettingsModal(false)}>
                        Отмена
                      </Button>
                      <Button onClick={handleSaveAppearanceSettings}>Сохранить настройки</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="integrations" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Управление интеграциями
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/20">
                      <div>
                        <Label>Название интеграции</Label>
                        <Input
                          placeholder="Название сервиса"
                          value={integrationSettings.newIntegration.name}
                          onChange={(e) =>
                            setIntegrationSettings((prev) => ({
                              ...prev,
                              newIntegration: { ...prev.newIntegration, name: e.target.value },
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label>Категория</Label>
                        <Select
                          value={integrationSettings.newIntegration.category}
                          onValueChange={(value) =>
                            setIntegrationSettings((prev) => ({
                              ...prev,
                              newIntegration: { ...prev.newIntegration, category: value },
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Коммуникации">Коммуникации</SelectItem>
                            <SelectItem value="Календарь">Календарь</SelectItem>
                            <SelectItem value="Документы">Документы</SelectItem>
                            <SelectItem value="Хранилище">Хранилище</SelectItem>
                            <SelectItem value="Автоматизация">Автоматизация</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-end">
                        <Button onClick={handleAddIntegration} className="w-full">
                          Добавить интеграцию
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {Object.entries(
                        integrationSettings.availableIntegrations.reduce(
                          (acc, integration) => {
                            if (!acc[integration.category]) acc[integration.category] = []
                            acc[integration.category].push(integration)
                            return acc
                          },
                          {} as Record<string, typeof integrationSettings.availableIntegrations>,
                        ),
                      ).map(([category, integrations]) => (
                        <div key={category}>
                          <h4 className="font-semibold mb-3 text-lg">{category}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {integrations.map((integration) => (
                              <div
                                key={integration.id}
                                className="flex items-center justify-between p-4 border rounded-lg"
                              >
                                <div>
                                  <h5 className="font-medium">{integration.name}</h5>
                                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                                </div>
                                <Switch
                                  checked={integration.connected}
                                  onCheckedChange={() => toggleIntegration(integration.id)}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="system" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Системные настройки</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Автоматические обновления</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Сбор аналитики</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Отладочный режим</Label>
                        <Switch />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}
