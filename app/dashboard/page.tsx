"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"

import { SalesManager } from "@/components/business-tools/sales-manager"
import { FinanceManager } from "@/components/business-tools/finance-manager"
import { FileManager } from "@/components/file-storage/file-manager"
import { EDODashboard } from "@/components/edo/edo-dashboard"
import { LegalDashboard } from "@/components/legal/legal-dashboard"
import { HRDashboard } from "@/components/hr-management/hr-dashboard"
import { AIBusinessAgent } from "@/components/ai-agent/ai-business-agent"
import { GanttChart } from "@/components/project-management/gantt-chart"
import { StrategyDashboard } from "@/components/strategy/strategy-dashboard"
import { MarketingDashboard } from "@/components/marketing/marketing-dashboard"
import { AnimatedMetrics } from "@/components/interactive/animated-metrics"

import {
  Building2,
  Users,
  Target,
  CheckSquare,
  DollarSign,
  TrendingUp,
  FileText,
  Scale,
  UserCheck,
  Shield,
  Brain,
  Zap,
  MessageSquare,
  Settings,
  HelpCircle,
  Bell,
  Plus,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Home,
  CheckCircle,
  AlertTriangle,
  Info,
  Moon,
  Sun,
} from "lucide-react"

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [expandedSections, setExpandedSections] = useState({
    business: true,
    finance: true,
    hr: true,
    ai: true,
    marketing: false,
    system: false,
  })

  // Mobile state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Modal states
  const [showGuide, setShowGuide] = useState(false)
  const [showNotificationsModal, setShowNotificationsModal] = useState(false)
  const [showAddProjectModal, setShowAddProjectModal] = useState(false)
  const [showProjectDetailsModal, setShowProjectDetailsModal] = useState(false)
  const [showAddTaskModal, setShowAddTaskModal] = useState(false)
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false)
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false)
  const [showAssignRoleModal, setShowAssignRoleModal] = useState(false)
  const [showAddLeadModal, setShowAddLeadModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)

  // Data states
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Разработка мобильного приложения",
      status: "В процессе",
      progress: 65,
      deadline: "2024-03-15",
      team: ["Иван", "Мария"],
    },
    {
      id: 2,
      name: "Редизайн веб-сайта",
      status: "Планирование",
      progress: 20,
      deadline: "2024-04-01",
      team: ["Петр", "Анна"],
    },
    {
      id: 3,
      name: "Интеграция CRM системы",
      status: "Завершен",
      progress: 100,
      deadline: "2024-02-28",
      team: ["Сергей"],
    },
  ])

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Создать макеты интерфейса",
      assignee: "Мария",
      priority: "Высокий",
      status: "В работе",
      dueDate: "2024-03-10",
    },
    {
      id: 2,
      title: "Настроить базу данных",
      assignee: "Иван",
      priority: "Средний",
      status: "Ожидает",
      dueDate: "2024-03-12",
    },
    {
      id: 3,
      title: "Провести тестирование",
      assignee: "Петр",
      priority: "Низкий",
      status: "Завершено",
      dueDate: "2024-03-08",
    },
  ])

  const [employees, setEmployees] = useState([
    { id: 1, name: "Иван Петров", email: "ivan@company.com", role: "Разработчик", department: "IT" },
    { id: 2, name: "Мария Сидорова", email: "maria@company.com", role: "Дизайнер", department: "Дизайн" },
    { id: 3, name: "Петр Иванов", email: "petr@company.com", role: "Менеджер", department: "Управление" },
  ])

  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Администратор",
      description: "Полный доступ к системе",
      permissions: ["read", "write", "delete", "admin"],
    },
    { id: 2, name: "Менеджер", description: "Управление проектами и командой", permissions: ["read", "write"] },
    { id: 3, name: "Сотрудник", description: "Базовый доступ", permissions: ["read"] },
  ])

  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "ООО Технологии",
      email: "info@tech.com",
      phone: "+7 (495) 123-45-67",
      value: "500000",
      source: "Сайт",
      status: "Новый",
    },
    {
      id: 2,
      name: "ИП Смирнов",
      email: "smirnov@mail.com",
      phone: "+7 (495) 987-65-43",
      value: "150000",
      source: "Реклама",
      status: "В работе",
    },
  ])

  const [notificationsList, setNotificationsList] = useState([
    { id: 1, message: "Новый проект добавлен в систему", type: "info", read: false, timestamp: new Date() },
    { id: 2, message: "Задача 'Создать макеты' просрочена", type: "warning", read: false, timestamp: new Date() },
    { id: 3, message: "Проект успешно завершен", type: "success", read: true, timestamp: new Date() },
  ])

  // Form states
  const [newProject, setNewProject] = useState({ name: "", deadline: "", team: [], description: "" })
  const [newTask, setNewTask] = useState({ title: "", assignee: "", priority: "Средний", dueDate: "", description: "" })
  const [newEmployee, setNewEmployee] = useState({ name: "", email: "", role: "", department: "" })
  const [newRole, setNewRole] = useState({ name: "", description: "", permissions: [] })
  const [newLead, setNewLead] = useState({ name: "", email: "", phone: "", value: "", source: "" })
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  // Settings states
  const [settingsCategory, setSettingsCategory] = useState("general")
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "light",
    fontSize: "medium",
    density: "comfortable",
    colorScheme: "blue",
    animations: true,
    accessibility: true,
  })

  const [integrationSettings, setIntegrationSettings] = useState({
    availableIntegrations: [
      { id: "1", name: "Slack", description: "Интеграция с мессенджером", connected: true, category: "Коммуникации" },
      { id: "2", name: "Google Drive", description: "Облачное хранилище", connected: false, category: "Хранилище" },
      { id: "3", name: "Telegram", description: "Уведомления в Telegram", connected: true, category: "Коммуникации" },
    ],
    newIntegration: { name: "", description: "", category: "" },
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const handleAddProject = () => {
    if (newProject.name && newProject.deadline) {
      const project = {
        id: Date.now(),
        name: newProject.name,
        deadline: newProject.deadline,
        description: newProject.description,
        status: "Планирование",
        progress: 0,
        team: [],
      }
      setProjects((prev) => [...prev, project])
      setNewProject({ name: "", deadline: "", team: [], description: "" })
      setShowAddProjectModal(false)
    }
  }

  const handleAddTask = () => {
    if (newTask.title && newTask.assignee) {
      const task = {
        id: Date.now(),
        title: newTask.title,
        assignee: newTask.assignee,
        priority: newTask.priority,
        dueDate: newTask.dueDate,
        description: newTask.description,
        status: "Ожидает",
      }
      setTasks((prev) => [...prev, task])
      setNewTask({ title: "", assignee: "", priority: "Средний", dueDate: "", description: "" })
      setShowAddTaskModal(false)
    }
  }

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.email) {
      const employee = {
        id: Date.now(),
        name: newEmployee.name,
        email: newEmployee.email,
        role: newEmployee.role,
        department: newEmployee.department,
      }
      setEmployees((prev) => [...prev, employee])
      setNewEmployee({ name: "", email: "", role: "", department: "" })
      setShowAddEmployeeModal(false)
    }
  }

  const handleCreateRole = () => {
    if (newRole.name && newRole.permissions.length > 0) {
      const role = {
        id: Date.now(),
        name: newRole.name,
        description: newRole.description,
        permissions: newRole.permissions,
      }
      setRoles((prev) => [...prev, role])
      setNewRole({ name: "", description: "", permissions: [] })
      setShowCreateRoleModal(false)
    }
  }

  const handleAddLead = () => {
    if (newLead.name && newLead.email) {
      const lead = {
        id: Date.now(),
        name: newLead.name,
        email: newLead.email,
        phone: newLead.phone,
        value: newLead.value,
        source: newLead.source,
        status: "Новый",
      }
      setLeads((prev) => [...prev, lead])
      setNewLead({ name: "", email: "", phone: "", value: "", source: "" })
      setShowAddLeadModal(false)
    }
  }

  const handleAssignRole = (employeeId, role) => {
    setEmployees((prev) => prev.map((emp) => (emp.id === employeeId ? { ...emp, role } : emp)))
    setShowAssignRoleModal(false)
    setSelectedEmployee(null)
  }

  const handleSaveSettings = (category, settings) => {
    console.log(`Saving ${category} settings:`, settings)
  }

  const handleSaveAppearanceSettings = () => {
    localStorage.setItem("appearance-settings", JSON.stringify(appearanceSettings))
  }

  const toggleIntegration = (integrationId) => {
    setIntegrationSettings((prev) => ({
      ...prev,
      availableIntegrations: prev.availableIntegrations.map((integration) =>
        integration.id === integrationId ? { ...integration, connected: !integration.connected } : integration,
      ),
    }))
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
        newIntegration: { name: "", description: "", category: "" },
      }))
    }
  }

  const markNotificationAsRead = (id) => {
    setNotificationsList((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotificationsList((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "info":
        return <Info className="w-4 h-4 text-blue-500" />
      default:
        return <Bell className="w-4 h-4 text-gray-500" />
    }
  }

  const handleNotificationAction = (id, action) => {
    if (action === "view") {
      markNotificationAsRead(id)
    }
  }

  const navigationSections = [
    {
      id: "business",
      title: "УПРАВЛЕНИЕ БИЗНЕСОМ",
      expanded: expandedSections.business,
      items: [
        { id: "overview", label: "Обзор бизнеса", icon: Building2, active: true },
        { id: "strategy", label: "Стратегия и цели", icon: Target, badge: "NEW" },
        { id: "projects", label: "Активные проекты", icon: CheckSquare, count: 3 },
        { id: "tasks", label: "Управление задачами", icon: CheckSquare, count: 8 },
      ],
    },
    {
      id: "finance",
      title: "ФИНАНСЫ И ДОКУМЕНТООБОРОТ",
      expanded: expandedSections.finance,
      items: [
        { id: "finance", label: "Финансы", icon: DollarSign },
        { id: "sales", label: "Продажи", icon: TrendingUp, count: 156 },
        { id: "edo", label: "ЭДО | Документооборот", icon: FileText, badge: "NEW" },
        { id: "legal", label: "Правовой контур", icon: Scale, badge: "NEW" },
      ],
    },
    {
      id: "hr",
      title: "КАДРЫ И КОМАНДА",
      expanded: expandedSections.hr,
      items: [
        { id: "hr", label: "HR и развитие команды", icon: UserCheck, badge: "NEW" },
        { id: "team", label: "Команда", icon: Users },
        { id: "roles", label: "Роли и права", icon: Shield },
      ],
    },
    {
      id: "ai",
      title: "ИИ-ИНСТРУМЕНТЫ",
      expanded: expandedSections.ai,
      items: [
        { id: "ai-agent", label: "ИИ-Агент для бизнеса", icon: Brain, badge: "NEW" },
        { id: "ai-tools", label: "ИИ-инструменты", icon: Zap, count: 5 },
      ],
    },
    {
      id: "marketing",
      title: "МАРКЕТИНГ И КЛИЕНТЫ",
      expanded: expandedSections.marketing,
      items: [{ id: "marketing", label: "Маркетинг и клиенты", icon: MessageSquare }],
    },
    {
      id: "system",
      title: "СИСТЕМА",
      expanded: expandedSections.system,
      items: [
        { id: "files", label: "Файловое хранилище", icon: FileText },
        { id: "settings", label: "Настройки", icon: Settings },
      ],
    },
  ]

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Mobile Header */}
        {isMobile && (
          <div className="bg-card border-b p-4 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold">Управление бизнесом</h1>
              <p className="text-sm text-muted-foreground">Ваша ИИ-платформа роста</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => window.open("/guide", "_blank")}>
                <HelpCircle className="w-4 h-4 mr-1" />
                Гид
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.open("/support", "_blank")}>
                <MessageSquare className="w-4 h-4 mr-1" />
                Поддержка
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const newTheme = appearanceSettings.theme === "light" ? "dark" : "light"
                  setAppearanceSettings({
                    ...appearanceSettings,
                    theme: newTheme,
                  })
                  document.documentElement.classList.toggle("dark", newTheme === "dark")
                }}
                className="shrink-0"
              >
                {appearanceSettings.theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="shrink-0"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        )}

        <div className="flex">
          {/* Mobile Menu Overlay */}
          {isMobile && isMobileMenuOpen && (
            <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
              <div
                className="fixed left-0 top-0 h-full w-80 bg-card shadow-lg overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-lg font-semibold">Управление бизнесом</h2>
                      <p className="text-sm text-muted-foreground">Ваша ИИ-платформа роста</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                      <X className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="space-y-4">
                    {navigationSections.map((section) => (
                      <div key={section.id}>
                        <Button
                          variant="ghost"
                          className="w-full justify-between p-2 h-auto"
                          onClick={() => toggleSection(section.id)}
                        >
                          <span className="text-xs font-semibold text-muted-foreground">{section.title}</span>
                          {section.expanded ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </Button>

                        {section.expanded && (
                          <div className="ml-2 space-y-1">
                            {section.items.map((item) => (
                              <Button
                                key={item.id}
                                variant={activeTab === item.id ? "default" : "ghost"}
                                className="w-full justify-start text-sm h-9"
                                onClick={() => {
                                  setActiveTab(item.id)
                                  setIsMobileMenuOpen(false)
                                }}
                              >
                                <item.icon className="w-4 h-4 mr-2" />
                                {item.label}
                                {item.badge && (
                                  <Badge variant="secondary" className="ml-auto text-xs">
                                    {item.badge}
                                  </Badge>
                                )}
                                {item.count && (
                                  <Badge variant="outline" className="ml-auto text-xs">
                                    {item.count}
                                  </Badge>
                                )}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Desktop Sidebar */}
          <div className="hidden md:block w-80 bg-card border-r">
            <div className="p-6">
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold">Управление бизнесом</h2>
                <p className="text-sm text-muted-foreground">Ваша ИИ-платформа роста</p>
              </div>

              {/* Header Actions */}
              <div className="flex gap-2 mb-6">
                <Button variant="outline" size="sm" onClick={() => window.open("/guide", "_blank")} className="flex-1">
                  <HelpCircle className="w-4 h-4 mr-1" />
                  Гид по функциям
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open("/support", "_blank")}
                  className="flex-1"
                >
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Поддержка
                </Button>
              </div>

              <div className="flex gap-2 mb-6">
                <Button variant="outline" size="sm" onClick={() => window.open("/", "_blank")} className="flex-1">
                  <Home className="w-4 h-4 mr-1" />
                  На главную
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newTheme = appearanceSettings.theme === "light" ? "dark" : "light"
                    setAppearanceSettings({
                      ...appearanceSettings,
                      theme: newTheme,
                    })
                    document.documentElement.classList.toggle("dark", newTheme === "dark")
                  }}
                  className="shrink-0 px-3"
                  title="Переключить тему"
                >
                  {appearanceSettings.theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                </Button>
              </div>

              {/* Navigation */}
              <div className="space-y-2">
                {navigationSections.map((section) => (
                  <div key={section.id}>
                    <Button
                      variant="ghost"
                      className="w-full justify-between p-2 h-auto hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 dark:hover:from-emerald-950 dark:hover:to-teal-950 transition-all duration-200"
                      onClick={() => toggleSection(section.id)}
                    >
                      <span className="text-xs font-semibold text-muted-foreground hover:text-foreground">
                        {section.title}
                      </span>
                      {section.expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </Button>

                    {section.expanded && (
                      <div className="ml-2 space-y-1">
                        {section.items.map((item) => (
                          <Button
                            key={item.id}
                            variant={activeTab === item.id ? "default" : "ghost"}
                            className="w-full justify-start text-sm h-9 hover:bg-gradient-to-r hover:from-emerald-100 hover:to-teal-100 dark:hover:from-emerald-900 dark:hover:to-teal-900 hover:text-foreground transition-all duration-200"
                            onClick={() => setActiveTab(item.id)}
                          >
                            <item.icon className="w-4 h-4 mr-2" />
                            {item.label}
                            {item.badge && (
                              <Badge variant="secondary" className="ml-auto text-xs">
                                {item.badge}
                              </Badge>
                            )}
                            {item.count && (
                              <Badge variant="outline" className="ml-auto text-xs">
                                {item.count}
                              </Badge>
                            )}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-4 md:p-6">
            {/* Overview */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-2xl font-bold">Обзор бизнеса</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowNotificationsModal(true)}>
                      <Bell className="w-4 h-4 mr-2" />
                      Уведомления ({notificationsList.filter((n) => !n.read).length})
                    </Button>
                  </div>
                </div>

                <AnimatedMetrics />

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Быстрые действия</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button onClick={() => setShowAddProjectModal(true)} className="h-20 flex-col">
                        <Plus className="w-6 h-6 mb-2" />
                        Новый проект
                      </Button>
                      <Button onClick={() => setShowAddTaskModal(true)} variant="outline" className="h-20 flex-col">
                        <CheckSquare className="w-6 h-6 mb-2" />
                        Новая задача
                      </Button>
                      <Button onClick={() => setShowAddEmployeeModal(true)} variant="outline" className="h-20 flex-col">
                        <Users className="w-6 h-6 mb-2" />
                        Добавить сотрудника
                      </Button>
                      <Button onClick={() => setShowAddLeadModal(true)} variant="outline" className="h-20 flex-col">
                        <Target className="w-6 h-6 mb-2" />
                        Новый лид
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle>Последние уведомления</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {notificationsList.slice(0, 3).map((notification) => (
                        <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                          {getNotificationIcon(notification.type)}
                          <div className="flex-1">
                            <p className="text-sm">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.timestamp.toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Strategy */}
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

            {/* Projects */}
            {activeTab === "projects" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <Badge variant={project.status === "Завершен" ? "default" : "secondary"}>
                          {project.status}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Прогресс</span>
                              <span>{project.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Дедлайн: {new Date(project.deadline).toLocaleDateString()}
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setSelectedProject(project)
                                setShowProjectDetailsModal(true)
                              }}
                            >
                              Просмотр
                            </Button>
                            <Button size="sm" variant="outline">
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

            {/* Tasks */}
            {activeTab === "tasks" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-2xl font-bold">Управление задачами</h2>
                  <Button onClick={() => setShowAddTaskModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Новая задача
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {["Ожидает", "В работе", "Завершено"].map((status) => (
                    <Card key={status}>
                      <CardHeader>
                        <CardTitle className="text-lg">{status}</CardTitle>
                        <Badge variant="outline">{tasks.filter((task) => task.status === status).length}</Badge>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {tasks
                            .filter((task) => task.status === status)
                            .map((task) => (
                              <div key={task.id} className="p-3 border rounded-lg">
                                <h4 className="font-medium">{task.title}</h4>
                                <p className="text-sm text-muted-foreground">Исполнитель: {task.assignee}</p>
                                <div className="flex justify-between items-center mt-2">
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
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(task.dueDate).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Finance */}
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

            {/* Sales */}
            {activeTab === "sales" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Продажи</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SalesManager />
                  </CardContent>
                </Card>
              </div>
            )}

            {/* EDO */}
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

            {/* Legal */}
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

            {/* HR */}
            {activeTab === "hr" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>HR и развитие команды</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <HRDashboard />
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Team */}
            {activeTab === "team" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-2xl font-bold">Команда</h2>
                  <Button onClick={() => setShowAddEmployeeModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить сотрудника
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {employees.map((employee) => (
                    <Card key={employee.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{employee.name}</CardTitle>
                        <Badge variant="outline">{employee.role}</Badge>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">{employee.email}</p>
                          <p className="text-sm">Отдел: {employee.department}</p>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setSelectedEmployee(employee)
                              setShowAssignRoleModal(true)
                            }}
                          >
                            Назначить роль
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Roles */}
            {activeTab === "roles" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-2xl font-bold">Роли и права</h2>
                  <Button onClick={() => setShowCreateRoleModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Создать роль
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {roles.map((role) => (
                    <Card key={role.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">{role.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <p className="text-sm text-muted-foreground">{role.description}</p>
                          <div>
                            <p className="text-sm font-medium mb-2">Права доступа:</p>
                            <div className="flex flex-wrap gap-1">
                              {role.permissions.map((permission) => (
                                <Badge key={permission} variant="secondary" className="text-xs">
                                  {permission}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* AI Agent */}
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

            {/* AI Tools */}
            {activeTab === "ai-tools" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-2xl font-bold">ИИ-инструменты</h2>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить инструмент
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Brain,
                      title: "Анализ текста",
                      color: "text-purple-600",
                      description: "Автоматический анализ и обработка текстовых данных",
                    },
                    {
                      icon: Zap,
                      title: "Генерация контента",
                      color: "text-blue-600",
                      description: "Создание качественного контента для маркетинга",
                    },
                    {
                      icon: Target,
                      title: "Прогнозирование",
                      color: "text-green-600",
                      description: "Предсказание трендов и анализ метрик",
                    },
                    {
                      icon: MessageSquare,
                      title: "Чат-бот",
                      color: "text-orange-600",
                      description: "Автоматизация клиентского сервиса",
                    },
                    {
                      icon: Settings,
                      title: "Персонализация",
                      color: "text-red-600",
                      description: "Персонализированные рекомендации",
                    },
                  ].map((tool, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <tool.icon className={`w-5 h-5 ${tool.color}`} />
                          {tool.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            Запустить
                          </Button>
                          <Button size="sm" variant="outline">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Marketing */}
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

            {/* Files */}
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

            {/* Settings */}
            {activeTab === "settings" && (
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Настройки</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => setShowSettingsModal(true)}>Открыть настройки</Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Modals */}

        <Dialog open={showNotificationsModal} onOpenChange={setShowNotificationsModal}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Уведомления</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {notificationsList.length > 0 ? (
                notificationsList.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-3 p-3 rounded-lg ${
                      notification.read ? "bg-muted/50" : "bg-muted"
                    }`}
                  >
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.timestamp.toLocaleTimeString()}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleNotificationAction(notification.id, "view")}
                        >
                          Подробнее
                        </Button>
                        {!notification.read && (
                          <Button variant="secondary" size="sm" onClick={() => markNotificationAsRead(notification.id)}>
                            Прочитано
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">Нет новых уведомлений</p>
              )}
            </div>
            <DialogFooter>
              <Button onClick={markAllAsRead}>Отметить все как прочитанные</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Project Modal */}
        <Dialog open={showAddProjectModal} onOpenChange={setShowAddProjectModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Новый проект</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Название
                </Label>
                <Input
                  id="name"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="deadline" className="text-right">
                  Дедлайн
                </Label>
                <Input
                  type="date"
                  id="deadline"
                  value={newProject.deadline}
                  onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Описание
                </Label>
                <Textarea
                  id="description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddProject}>
                Создать
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Task Modal */}
        <Dialog open={showAddTaskModal} onOpenChange={setShowAddTaskModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Новая задача</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Название
                </Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assignee" className="text-right">
                  Исполнитель
                </Label>
                <Select onValueChange={(value) => setNewTask({ ...newTask, assignee: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Выберите исполнителя" />
                  </SelectTrigger>
                  <SelectContent>
                    {employees.map((employee) => (
                      <SelectItem key={employee.id} value={employee.name}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Приоритет
                </Label>
                <Select onValueChange={(value) => setNewTask({ ...newTask, priority: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Выберите приоритет" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Низкий">Низкий</SelectItem>
                    <SelectItem value="Средний">Средний</SelectItem>
                    <SelectItem value="Высокий">Высокий</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="dueDate" className="text-right">
                  Срок
                </Label>
                <Input
                  type="date"
                  id="dueDate"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddTask}>
                Создать
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Add Employee Modal */}
        <Dialog open={showAddEmployeeModal} onOpenChange={setShowAddEmployeeModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Добавить сотрудника</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="empName" className="text-right">
                  Имя
                </Label>
                <Input
                  id="empName"
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="empEmail" className="text-right">
                  Email
                </Label>
                <Input
                  id="empEmail"
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="empRole" className="text-right">
                  Роль
                </Label>
                <Select onValueChange={(value) => setNewEmployee({ ...newEmployee, role: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Выберите роль" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.name}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="empDept" className="text-right">
                  Отдел
                </Label>
                <Input
                  id="empDept"
                  value={newEmployee.department}
                  onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleAddEmployee}>
                Добавить
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Create Role Modal */}
        <Dialog open={showCreateRoleModal} onOpenChange={setShowCreateRoleModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Создать роль</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="roleName" className="text-right">
                  Название
                </Label>
                <Input
                  id="roleName"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="roleDesc" className="text-right">
                  Описание
                </Label>
                <Textarea
                  id="roleDesc"
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label className="text-right mt-2">Права</Label>
                <div className="col-span-3 space-y-2">
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
                      <Label htmlFor={permission}>{permission}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateRole}>
                Создать
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Assign Role Modal */}
        <Dialog open={showAssignRoleModal} onOpenChange={setShowAssignRoleModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Назначить роль</DialogTitle>
            </DialogHeader>
            {selectedEmployee && (
              <div className="grid gap-4 py-4">
                <p>
                  Сотрудник: <strong>{selectedEmployee.name}</strong>
                </p>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Роль</Label>
                  <Select onValueChange={(value) => handleAssignRole(selectedEmployee.id, value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Выберите роль" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role.id} value={role.name}>
                          {role.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Settings Modal */}
        <Dialog open={showSettingsModal} onOpenChange={setShowSettingsModal}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Настройки системы</DialogTitle>
            </DialogHeader>
            <Tabs value={settingsCategory} onValueChange={setSettingsCategory}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">Общие</TabsTrigger>
                <TabsTrigger value="appearance">Внешний вид</TabsTrigger>
                <TabsTrigger value="integrations">Интеграции</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Общие настройки</h3>
                  <div className="space-y-2">
                    <Label>Язык интерфейса</Label>
                    <Select defaultValue="ru">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ru">Русский</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Настройки внешнего вида</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
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
                    <div className="space-y-2">
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
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={appearanceSettings.animations}
                      onCheckedChange={(checked) =>
                        setAppearanceSettings({ ...appearanceSettings, animations: checked })
                      }
                    />
                    <Label>Включить анимации</Label>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="integrations" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Интеграции</h3>
                    <Button size="sm" onClick={handleAddIntegration}>
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {integrationSettings.availableIntegrations.map((integration) => (
                      <div key={integration.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{integration.name}</h4>
                          <p className="text-sm text-muted-foreground">{integration.description}</p>
                        </div>
                        <Switch
                          checked={integration.connected}
                          onCheckedChange={() => toggleIntegration(integration.id)}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-3">Добавить новую интеграцию</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <Input
                        placeholder="Название"
                        value={integrationSettings.newIntegration.name}
                        onChange={(e) =>
                          setIntegrationSettings((prev) => ({
                            ...prev,
                            newIntegration: { ...prev.newIntegration, name: e.target.value },
                          }))
                        }
                      />
                      <Input
                        placeholder="Категория"
                        value={integrationSettings.newIntegration.category}
                        onChange={(e) =>
                          setIntegrationSettings((prev) => ({
                            ...prev,
                            newIntegration: { ...prev.newIntegration, category: e.target.value },
                          }))
                        }
                      />
                    </div>
                    <Input
                      className="mt-2"
                      placeholder="Описание"
                      value={integrationSettings.newIntegration.description}
                      onChange={(e) =>
                        setIntegrationSettings((prev) => ({
                          ...prev,
                          newIntegration: { ...prev.newIntegration, description: e.target.value },
                        }))
                      }
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <DialogFooter>
              <Button onClick={handleSaveAppearanceSettings}>Сохранить настройки</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Project Details Modal */}
        <Dialog open={showProjectDetailsModal} onOpenChange={setShowProjectDetailsModal}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Детали проекта</DialogTitle>
            </DialogHeader>
            {selectedProject && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">{selectedProject.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedProject.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Статус</Label>
                    <p>{selectedProject.status}</p>
                  </div>
                  <div>
                    <Label>Прогресс</Label>
                    <p>{selectedProject.progress}%</p>
                  </div>
                  <div>
                    <Label>Дедлайн</Label>
                    <p>{new Date(selectedProject.deadline).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label>Команда</Label>
                    <p>{selectedProject.team.join(", ") || "Не назначена"}</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowProjectDetailsModal(false)}>
                Закрыть
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}

export default DashboardPage
