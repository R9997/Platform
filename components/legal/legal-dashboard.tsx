"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Download, Bell, Plus, FileText, AlertTriangle, Scale, Settings, X } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

interface Contract {
  id: string
  title: string
  counterparty: string
  status: "draft" | "review" | "signed" | "executed"
  startDate: string
  endDate: string
  amount: number
  type: string
  files: File[]
  description: string
}

interface LegalTask {
  id: string
  title: string
  description: string
  assignee: string
  priority: "high" | "medium" | "low"
  dueDate: string
  status: "pending" | "in-progress" | "completed"
  category: string
}

interface License {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate: string
  status: "active" | "expiring" | "expired"
  number: string
}

interface LegalCase {
  id: string
  title: string
  type: "lawsuit" | "claim" | "arbitration"
  status: "active" | "pending" | "closed"
  nextHearing: string
  amount: number
  description: string
}

interface Notification {
  id: string
  title: string
  message: string
  type: "warning" | "info" | "urgent"
  timestamp: Date
  read: boolean
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800"
    case "medium":
      return "bg-yellow-100 text-yellow-800"
    case "low":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

const getPriorityLabel = (priority: string) => {
  switch (priority) {
    case "high":
      return "Высокий"
    case "medium":
      return "Средний"
    case "low":
      return "Низкий"
    default:
      return priority
  }
}

export default function LegalDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showNotifications, setShowNotifications] = useState(false)
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [showAddContract, setShowAddContract] = useState(false)
  const [showAddTask, setShowAddTask] = useState(false)
  const [showAddLicense, setShowAddLicense] = useState(false)
  const [showAddCase, setShowAddCase] = useState(false)
  const [showAddTemplate, setShowAddTemplate] = useState(false)
  const [showAddRisk, setShowAddRisk] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const [settings, setSettings] = useState({
    notifications: {
      licenseExpiry: true,
      courtHearings: true,
      urgentTasks: true,
      contractDeadlines: true,
      riskAlerts: true,
    },
    automation: {
      autoReminders: true,
      documentGeneration: false,
      reportScheduling: false,
    },
    integrations: {
      courtSystem: false,
      taxService: false,
      bankingAPI: false,
    },
    security: {
      twoFactorAuth: false,
      documentEncryption: true,
      auditLog: true,
    },
    general: {
      defaultCurrency: "RUB",
      timezone: "Europe/Moscow",
      language: "ru",
      dateFormat: "DD.MM.YYYY",
    },
  })

  const [notification, setNotification] = useState<{
    type: "success" | "error" | "info"
    message: string
  } | null>(null)

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Истекает лицензия",
      message: "Лицензия на осуществление деятельности истекает через 15 дней",
      type: "warning",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
      read: false,
    },
    {
      id: "2",
      title: "Новое судебное дело",
      message: "Поступило уведомление о новом судебном деле №А40-123456/24",
      type: "urgent",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
      read: false,
    },
  ])

  const [newContract, setNewContract] = useState({
    title: "",
    counterparty: "",
    type: "",
    amount: "",
    startDate: "",
    endDate: "",
    description: "",
  })
  const [contractFiles, setContractFiles] = useState<File[]>([])

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignee: "",
    priority: "medium" as "high" | "medium" | "low",
    dueDate: "",
    category: "",
  })

  const [newTemplate, setNewTemplate] = useState({
    name: "",
    type: "",
    description: "",
    category: "",
  })
  const [templateFiles, setTemplateFiles] = useState<File[]>([])

  const [newRisk, setNewRisk] = useState({
    title: "",
    description: "",
    category: "",
    probability: "",
    impact: "",
    mitigation: "",
  })
  const [riskFiles, setRiskFiles] = useState<File[]>([])

  const [reportType, setReportType] = useState("")
  const [reportPeriod, setReportPeriod] = useState("")
  const [reportFormat, setReportFormat] = useState("pdf")

  const [legalTasks, setLegalTasks] = useState<LegalTask[]>([
    {
      id: "1",
      title: "Продлить лицензию на деятельность",
      description: "Подготовить документы для продления лицензии",
      assignee: "Петрова М.В.",
      priority: "high",
      dueDate: "2024-09-01",
      status: "pending",
      category: "contracts",
    },
  ])

  const contracts: Contract[] = [
    {
      id: "1",
      title: "Договор поставки оборудования",
      counterparty: 'ООО "ТехСнаб"',
      status: "signed",
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      amount: 2500000,
      type: "supply",
      files: [],
      description: "",
    },
  ]

  const licenses: License[] = [
    {
      id: "1",
      name: "Лицензия на образовательную деятельность",
      issuer: "Минобрнауки РФ",
      issueDate: "2022-03-15",
      expiryDate: "2025-03-15",
      status: "active",
      number: "",
    },
  ]

  const legalCases: LegalCase[] = [
    {
      id: "1",
      title: 'Взыскание задолженности с ООО "Должник"',
      type: "lawsuit",
      status: "active",
      nextHearing: "2024-09-15",
      amount: 850000,
      description: "",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "review":
        return "bg-yellow-100 text-yellow-800"
      case "signed":
        return "bg-green-100 text-green-800"
      case "executed":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-orange-100 text-orange-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "expiring":
        return "bg-yellow-100 text-yellow-800"
      case "expired":
        return "bg-red-100 text-red-800"
      case "closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "draft":
        return "Черновик"
      case "review":
        return "На рассмотрении"
      case "signed":
        return "Подписан"
      case "executed":
        return "Исполнен"
      case "pending":
        return "Ожидает"
      case "in-progress":
        return "В работе"
      case "completed":
        return "Завершено"
      case "active":
        return "Активный"
      case "expiring":
        return "Истекает"
      case "expired":
        return "Истек"
      case "closed":
        return "Закрыто"
      default:
        return status
    }
  }

  const [newCase, setNewCase] = useState({
    title: "",
    type: "",
    amount: "",
    description: "",
    nextHearing: "",
  })

  const [newLicense, setNewLicense] = useState({
    name: "",
    issuer: "",
    issueDate: "",
    expiryDate: "",
    number: "",
  })

  const handleFileUpload = (files: FileList | null, setFiles: (files: File[]) => void) => {
    if (files) {
      const fileArray = Array.from(files)
      setFiles(fileArray)
    }
  }

  const removeFile = (index: number, files: File[], setFiles: (files: File[]) => void) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
  }

  const generateReport = () => {
    const csvData = `Тип отчета,Период,Дата генерации\n${reportType},${reportPeriod},${new Date().toLocaleDateString()}`
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `legal_report_${Date.now()}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    setShowReportDialog(false)
  }

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleAddTask = () => {
    if (!newTask.title || !newTask.assignee || !newTask.dueDate) {
      setNotification({
        type: "error",
        message: "Пожалуйста, заполните обязательные поля: название, исполнитель и срок выполнения",
      })
      setTimeout(() => setNotification(null), 3000)
      return
    }

    const task: LegalTask = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      assignee: newTask.assignee,
      priority: newTask.priority,
      dueDate: newTask.dueDate,
      status: "pending",
      category: newTask.category,
    }

    setLegalTasks((prev) => [task, ...prev])

    setNotification({
      type: "success",
      message: `Задача "${newTask.title}" успешно создана`,
    })
    setTimeout(() => setNotification(null), 3000)

    setNewTask({
      title: "",
      description: "",
      assignee: "",
      priority: "medium",
      dueDate: "",
      category: "",
    })

    setShowAddTask(false)
  }

  const handleSaveSettings = () => {
    try {
      localStorage.setItem("legalSettings", JSON.stringify(settings))

      setNotification({
        type: "success",
        message: "Настройки успешно сохранены",
      })

      setTimeout(() => setNotification(null), 3000)
      setShowSettings(false)
    } catch (error) {
      setNotification({
        type: "error",
        message: "Ошибка при сохранении настроек",
      })
      setTimeout(() => setNotification(null), 3000)
    }
  }

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      },
    }))
  }

  const handleAddCase = () => {
    if (!newCase.title || !newCase.type) {
      setNotification({
        type: "error",
        message: "Пожалуйста, заполните обязательные поля: название и тип дела",
      })
      setTimeout(() => setNotification(null), 3000)
      return
    }

    const legalCase = {
      id: Date.now().toString(),
      title: newCase.title,
      type: newCase.type as "lawsuit" | "claim" | "arbitration",
      amount: Number.parseFloat(newCase.amount) || 0,
      description: newCase.description,
      nextHearing: newCase.nextHearing,
      status: "active" as const,
    }

    setLegalCases((prev) => [legalCase, ...prev])
    setNotification({
      type: "success",
      message: `Судебное дело "${newCase.title}" успешно создано`,
    })
    setTimeout(() => setNotification(null), 3000)

    setNewCase({
      title: "",
      type: "",
      amount: "",
      description: "",
      nextHearing: "",
    })
    setShowAddCase(false)
  }

  const handleAddLicense = () => {
    if (!newLicense.name || !newLicense.issuer) {
      setNotification({
        type: "error",
        message: "Пожалуйста, заполните обязательные поля: название и орган выдачи",
      })
      setTimeout(() => setNotification(null), 3000)
      return
    }

    const license = {
      id: Date.now().toString(),
      name: newLicense.name,
      issuer: newLicense.issuer,
      issueDate: newLicense.issueDate,
      expiryDate: newLicense.expiryDate,
      number: newLicense.number,
      status: "active" as const,
    }

    setLicenses((prev) => [license, ...prev])
    setNotification({
      type: "success",
      message: `Лицензия "${newLicense.name}" успешно создана`,
    })
    setTimeout(() => setNotification(null), 3000)

    setNewLicense({
      name: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      number: "",
    })
    setShowAddLicense(false)
  }

  const handleAddTemplate = () => {
    if (!newTemplate.name || !newTemplate.type) {
      setNotification({
        type: "error",
        message: "Пожалуйста, заполните обязательные поля: название и тип документа",
      })
      setTimeout(() => setNotification(null), 3000)
      return
    }

    setNotification({
      type: "success",
      message: `Шаблон "${newTemplate.name}" успешно создан`,
    })
    setTimeout(() => setNotification(null), 3000)

    setNewTemplate({
      name: "",
      type: "",
      description: "",
      category: "",
    })
    setTemplateFiles([])
    setShowAddTemplate(false)
  }

  const handleAddRisk = () => {
    if (!newRisk.title || !newRisk.category) {
      setNotification({
        type: "error",
        message: "Пожалуйста, заполните обязательные поля: название и категория риска",
      })
      setTimeout(() => setNotification(null), 3000)
      return
    }

    setNotification({
      type: "success",
      message: `Риск "${newRisk.title}" успешно добавлен`,
    })
    setTimeout(() => setNotification(null), 3000)

    setNewRisk({
      title: "",
      description: "",
      category: "",
      probability: "",
      impact: "",
      mitigation: "",
    })
    setRiskFiles([])
    setShowAddRisk(false)
  }

  return (
    <div className="space-y-6">
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

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">⚖️ Правовой контур</h1>
          <p className="text-muted-foreground">Управление юридическими процессами компании</p>
        </div>

        <div className="flex gap-2">
          <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Уведомления
                {notifications.filter((n) => !n.read).length > 0 && (
                  <Badge className="ml-2 bg-red-500 text-white text-xs">
                    {notifications.filter((n) => !n.read).length}
                  </Badge>
                )}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Правовые уведомления</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 rounded-lg border cursor-pointer ${
                      notif.read ? "bg-muted/30" : "bg-background shadow-sm"
                    }`}
                    onClick={() => markNotificationAsRead(notif.id)}
                  >
                    <h4 className="font-medium">{notif.title}</h4>
                    <p className="text-sm text-muted-foreground">{notif.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{notif.timestamp.toLocaleString("ru-RU")}</p>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Отчет
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Генерация отчета</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label>Тип отчета</Label>
                  <Select value={reportType} onValueChange={setReportType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип отчета" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contracts">Отчет по договорам</SelectItem>
                      <SelectItem value="tasks">Отчет по задачам</SelectItem>
                      <SelectItem value="cases">Отчет по судебным делам</SelectItem>
                      <SelectItem value="licenses">Отчет по лицензиям</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Период</Label>
                  <Select value={reportPeriod} onValueChange={setReportPeriod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите период" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Неделя</SelectItem>
                      <SelectItem value="month">Месяц</SelectItem>
                      <SelectItem value="quarter">Квартал</SelectItem>
                      <SelectItem value="year">Год</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={generateReport} className="w-full">
                  Сгенерировать отчет
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={showSettings} onOpenChange={setShowSettings}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Настройки правового контура</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Уведомления</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="license-expiry">Истечение лицензий</Label>
                      <Switch
                        id="license-expiry"
                        checked={settings.notifications.licenseExpiry}
                        onCheckedChange={(checked) => updateSetting("notifications", "licenseExpiry", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="court-hearings">Судебные заседания</Label>
                      <Switch
                        id="court-hearings"
                        checked={settings.notifications.courtHearings}
                        onCheckedChange={(checked) => updateSetting("notifications", "courtHearings", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="urgent-tasks">Срочные задачи</Label>
                      <Switch
                        id="urgent-tasks"
                        checked={settings.notifications.urgentTasks}
                        onCheckedChange={(checked) => updateSetting("notifications", "urgentTasks", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="contract-deadlines">Сроки договоров</Label>
                      <Switch
                        id="contract-deadlines"
                        checked={settings.notifications.contractDeadlines}
                        onCheckedChange={(checked) => updateSetting("notifications", "contractDeadlines", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="risk-alerts">Предупреждения о рисках</Label>
                      <Switch
                        id="risk-alerts"
                        checked={settings.notifications.riskAlerts}
                        onCheckedChange={(checked) => updateSetting("notifications", "riskAlerts", checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Автоматизация</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-reminders">Автоматические напоминания</Label>
                      <Switch
                        id="auto-reminders"
                        checked={settings.automation.autoReminders}
                        onCheckedChange={(checked) => updateSetting("automation", "autoReminders", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="doc-generation">Генерация документов</Label>
                      <Switch
                        id="doc-generation"
                        checked={settings.automation.documentGeneration}
                        onCheckedChange={(checked) => updateSetting("automation", "documentGeneration", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="report-scheduling">Планирование отчетов</Label>
                      <Switch
                        id="report-scheduling"
                        checked={settings.automation.reportScheduling}
                        onCheckedChange={(checked) => updateSetting("automation", "reportScheduling", checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Интеграции</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="court-system">Судебная система</Label>
                      <Switch
                        id="court-system"
                        checked={settings.integrations.courtSystem}
                        onCheckedChange={(checked) => updateSetting("integrations", "courtSystem", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="tax-service">Налоговая служба</Label>
                      <Switch
                        id="tax-service"
                        checked={settings.integrations.taxService}
                        onCheckedChange={(checked) => updateSetting("integrations", "taxService", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="banking-api">Банковские API</Label>
                      <Switch
                        id="banking-api"
                        checked={settings.integrations.bankingAPI}
                        onCheckedChange={(checked) => updateSetting("integrations", "bankingAPI", checked)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Безопасность</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="two-factor">Двухфакторная аутентификация</Label>
                      <Switch
                        id="two-factor"
                        checked={settings.security.twoFactorAuth}
                        onCheckedChange={(checked) => updateSetting("security", "twoFactorAuth", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="doc-encryption">Шифрование документов</Label>
                      <Switch
                        id="doc-encryption"
                        checked={settings.security.documentEncryption}
                        onCheckedChange={(checked) => updateSetting("security", "documentEncryption", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="audit-log">Журнал аудита</Label>
                      <Switch
                        id="audit-log"
                        checked={settings.security.auditLog}
                        onCheckedChange={(checked) => updateSetting("security", "auditLog", checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-semibold">Общие настройки</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="currency">Валюта по умолчанию</Label>
                    <Select
                      value={settings.general.defaultCurrency}
                      onValueChange={(value) => updateSetting("general", "defaultCurrency", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="RUB">Российский рубль (₽)</SelectItem>
                        <SelectItem value="USD">Доллар США ($)</SelectItem>
                        <SelectItem value="EUR">Евро (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timezone">Часовой пояс</Label>
                    <Select
                      value={settings.general.timezone}
                      onValueChange={(value) => updateSetting("general", "timezone", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Europe/Moscow">Москва (UTC+3)</SelectItem>
                        <SelectItem value="Europe/Samara">Самара (UTC+4)</SelectItem>
                        <SelectItem value="Asia/Yekaterinburg">Екатеринбург (UTC+5)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="language">Язык интерфейса</Label>
                    <Select
                      value={settings.general.language}
                      onValueChange={(value) => updateSetting("general", "language", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ru">Русский</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="date-format">Формат даты</Label>
                    <Select
                      value={settings.general.dateFormat}
                      onValueChange={(value) => updateSetting("general", "dateFormat", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DD.MM.YYYY">ДД.ММ.ГГГГ</SelectItem>
                        <SelectItem value="MM/DD/YYYY">ММ/ДД/ГГГГ</SelectItem>
                        <SelectItem value="YYYY-MM-DD">ГГГГ-ММ-ДД</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setShowSettings(false)}>
                  Отмена
                </Button>
                <Button onClick={handleSaveSettings}>Сохранить настройки</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        {[
          { id: "overview", label: "Обзор", icon: Scale },
          { id: "contracts", label: "Договоры", icon: FileText },
          { id: "tasks", label: "Задачи", icon: AlertTriangle },
          { id: "cases", label: "Судебные дела", icon: Scale },
          { id: "licenses", label: "Лицензии", icon: FileText },
          { id: "templates", label: "Шаблоны", icon: FileText },
          { id: "risks", label: "Риски", icon: AlertTriangle },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Активные договоры</p>
                <p className="text-2xl font-bold">{contracts.length}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Открытые задачи</p>
                <p className="text-2xl font-bold">{legalTasks.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Судебные дела</p>
                <p className="text-2xl font-bold">{legalCases.length}</p>
              </div>
              <Scale className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Лицензии</p>
                <p className="text-2xl font-bold">{licenses.length}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
        </div>
      )}

      {activeTab === "contracts" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Договоры</h2>
            <Dialog open={showAddContract} onOpenChange={setShowAddContract}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить договор
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Новый договор</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Название договора</Label>
                    <Input
                      value={newContract.title}
                      onChange={(e) => setNewContract({ ...newContract, title: e.target.value })}
                      placeholder="Введите название договора"
                    />
                  </div>
                  <div>
                    <Label>Контрагент</Label>
                    <Input
                      value={newContract.counterparty}
                      onChange={(e) => setNewContract({ ...newContract, counterparty: e.target.value })}
                      placeholder="Введите название контрагента"
                    />
                  </div>
                  <div>
                    <Label>Загрузить файлы договора</Label>
                    <Input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.txt"
                      onChange={(e) => handleFileUpload(e.target.files, setContractFiles)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Поддерживаемые форматы: PDF, DOC, DOCX, TXT. Максимальный размер: 10 МБ
                    </p>
                  </div>
                  {contractFiles.length > 0 && (
                    <div className="space-y-2">
                      <Label>Загруженные файлы:</Label>
                      {contractFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm">{file.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index, contractFiles, setContractFiles)}
                          >
                            Удалить
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  <Button onClick={() => setShowAddContract(false)} className="w-full">
                    Создать договор
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid gap-4">
            {contracts.map((contract) => (
              <div key={contract.id} className="bg-card p-4 rounded-lg border">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{contract.title}</h3>
                    <p className="text-sm text-muted-foreground">{contract.counterparty}</p>
                    <p className="text-sm text-muted-foreground">
                      {contract.startDate} - {contract.endDate}
                    </p>
                  </div>
                  <Badge className={getStatusColor(contract.status)}>{getStatusLabel(contract.status)}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "tasks" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Юридические задачи</h2>
            <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить задачу
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Новая юридическая задача</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="task-title">Название задачи *</Label>
                    <Input
                      id="task-title"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      placeholder="Введите название задачи"
                    />
                  </div>
                  <div>
                    <Label htmlFor="task-description">Описание</Label>
                    <Textarea
                      id="task-description"
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      placeholder="Подробное описание задачи"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="task-assignee">Исполнитель *</Label>
                      <Select
                        value={newTask.assignee}
                        onValueChange={(value) => setNewTask({ ...newTask, assignee: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите исполнителя" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Петрова М.В.">Петрова М.В.</SelectItem>
                          <SelectItem value="Иванов А.С.">Иванов А.С.</SelectItem>
                          <SelectItem value="Сидорова Е.П.">Сидорова Е.П.</SelectItem>
                          <SelectItem value="Козлов Д.И.">Козлов Д.И.</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="task-priority">Приоритет</Label>
                      <Select
                        value={newTask.priority}
                        onValueChange={(value: "high" | "medium" | "low") =>
                          setNewTask({ ...newTask, priority: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">Высокий</SelectItem>
                          <SelectItem value="medium">Средний</SelectItem>
                          <SelectItem value="low">Низкий</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="task-due-date">Срок выполнения *</Label>
                      <Input
                        id="task-due-date"
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="task-category">Категория</Label>
                      <Select
                        value={newTask.category}
                        onValueChange={(value) => setNewTask({ ...newTask, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="contracts">Договоры</SelectItem>
                          <SelectItem value="licenses">Лицензии</SelectItem>
                          <SelectItem value="litigation">Судебные дела</SelectItem>
                          <SelectItem value="compliance">Комплаенс</SelectItem>
                          <SelectItem value="corporate">Корпоративное право</SelectItem>
                          <SelectItem value="other">Прочее</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAddTask(false)}>
                    Отмена
                  </Button>
                  <Button onClick={handleAddTask}>Создать задачу</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid gap-4">
            {legalTasks.map((task) => (
              <div key={task.id} className="bg-card p-4 rounded-lg border">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                    <p className="text-sm text-muted-foreground">Исполнитель: {task.assignee}</p>
                    <p className="text-sm text-muted-foreground">Срок: {task.dueDate}</p>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={getPriorityColor(task.priority)}>{getPriorityLabel(task.priority)}</Badge>
                    <Badge className={getStatusColor(task.status)}>{getStatusLabel(task.status)}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "cases" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Судебные дела</h2>
            <Dialog open={showAddCase} onOpenChange={setShowAddCase}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить дело
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Новое судебное дело</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Название дела *</Label>
                    <Input
                      value={newCase.title}
                      onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
                      placeholder="Введите название судебного дела"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Тип дела</Label>
                      <Select value={newCase.type} onValueChange={(value) => setNewCase({ ...newCase, type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lawsuit">Иск</SelectItem>
                          <SelectItem value="claim">Претензия</SelectItem>
                          <SelectItem value="arbitration">Арбитраж</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Сумма иска (₽)</Label>
                      <Input
                        type="number"
                        value={newCase.amount}
                        onChange={(e) => setNewCase({ ...newCase, amount: e.target.value })}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Описание дела</Label>
                    <Textarea
                      value={newCase.description}
                      onChange={(e) => setNewCase({ ...newCase, description: e.target.value })}
                      placeholder="Подробное описание судебного дела"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Дата следующего заседания</Label>
                    <Input
                      type="date"
                      value={newCase.nextHearing}
                      onChange={(e) => setNewCase({ ...newCase, nextHearing: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Загрузить документы</Label>
                    <Input type="file" multiple accept=".pdf,.doc,.docx" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Поддерживаемые форматы: PDF, DOC, DOCX. Максимальный размер: 10 МБ
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAddCase(false)}>
                    Отмена
                  </Button>
                  <Button onClick={handleAddCase}>Создать дело</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid gap-4">
            {legalCases.map((legalCase) => (
              <div key={legalCase.id} className="bg-card p-4 rounded-lg border">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{legalCase.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Тип:{" "}
                      {legalCase.type === "lawsuit" ? "Иск" : legalCase.type === "claim" ? "Претензия" : "Арбитраж"}
                    </p>
                    <p className="text-sm text-muted-foreground">Следующее заседание: {legalCase.nextHearing}</p>
                    <p className="text-sm font-medium">Сумма: {legalCase.amount.toLocaleString()} ₽</p>
                  </div>
                  <Badge className={getStatusColor(legalCase.status)}>{getStatusLabel(legalCase.status)}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "licenses" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Лицензии и разрешения</h2>
            <Dialog open={showAddLicense} onOpenChange={setShowAddLicense}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить лицензию
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Новая лицензия</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Название лицензии *</Label>
                    <Input
                      value={newLicense.name}
                      onChange={(e) => setNewLicense({ ...newLicense, name: e.target.value })}
                      placeholder="Введите название лицензии"
                    />
                  </div>
                  <div>
                    <Label>Орган выдачи</Label>
                    <Input
                      value={newLicense.issuer}
                      onChange={(e) => setNewLicense({ ...newLicense, issuer: e.target.value })}
                      placeholder="Название органа, выдавшего лицензию"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Дата выдачи</Label>
                      <Input
                        type="date"
                        value={newLicense.issueDate}
                        onChange={(e) => setNewLicense({ ...newLicense, issueDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Дата истечения</Label>
                      <Input
                        type="date"
                        value={newLicense.expiryDate}
                        onChange={(e) => setNewLicense({ ...newLicense, expiryDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Номер лицензии</Label>
                    <Input
                      value={newLicense.number}
                      onChange={(e) => setNewLicense({ ...newLicense, number: e.target.value })}
                      placeholder="Номер лицензии"
                    />
                  </div>
                  <div>
                    <Label>Загрузить документы лицензии</Label>
                    <Input type="file" multiple accept=".pdf,.doc,.docx,.jpg,.png" />
                    <p className="text-xs text-muted-foreground mt-1">
                      Поддерживаемые форматы: PDF, DOC, DOCX, JPG, PNG. Максимальный размер: 10 МБ
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAddLicense(false)}>
                    Отмена
                  </Button>
                  <Button onClick={handleAddLicense}>Создать лицензию</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid gap-4">
            {licenses.map((license) => (
              <div key={license.id} className="bg-card p-4 rounded-lg border">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{license.name}</h3>
                    <p className="text-sm text-muted-foreground">Выдан: {license.issuer}</p>
                    <p className="text-sm text-muted-foreground">
                      Период: {license.issueDate} - {license.expiryDate}
                    </p>
                  </div>
                  <Badge className={getStatusColor(license.status)}>{getStatusLabel(license.status)}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "templates" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Шаблоны документов</h2>
            <Dialog open={showAddTemplate} onOpenChange={setShowAddTemplate}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить шаблон
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Новый шаблон документа</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Название шаблона *</Label>
                    <Input
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
                      placeholder="Введите название шаблона"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Тип документа</Label>
                      <Select
                        value={newTemplate.type}
                        onValueChange={(value) => setNewTemplate({ ...newTemplate, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="contract">Договор</SelectItem>
                          <SelectItem value="agreement">Соглашение</SelectItem>
                          <SelectItem value="claim">Претензия</SelectItem>
                          <SelectItem value="notice">Уведомление</SelectItem>
                          <SelectItem value="application">Заявление</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Категория</Label>
                      <Select
                        value={newTemplate.category}
                        onValueChange={(value) => setNewTemplate({ ...newTemplate, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите категорию" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="commercial">Коммерческие</SelectItem>
                          <SelectItem value="labor">Трудовые</SelectItem>
                          <SelectItem value="corporate">Корпоративные</SelectItem>
                          <SelectItem value="litigation">Судебные</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Описание</Label>
                    <Textarea
                      value={newTemplate.description}
                      onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                      placeholder="Описание шаблона и его применения"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Загрузить файл шаблона</Label>
                    <Input
                      type="file"
                      accept=".doc,.docx,.pdf,.txt"
                      onChange={(e) => handleFileUpload(e.target.files, setTemplateFiles)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Поддерживаемые форматы: DOC, DOCX, PDF, TXT. Максимальный размер: 10 МБ
                    </p>
                  </div>
                  {templateFiles.length > 0 && (
                    <div className="space-y-2">
                      <Label>Загруженные файлы:</Label>
                      {templateFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm">{file.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index, templateFiles, setTemplateFiles)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAddTemplate(false)}>
                    Отмена
                  </Button>
                  <Button onClick={handleAddTemplate}>Создать шаблон</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-card p-4 rounded-lg border">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">Договор поставки</h3>
                  <p className="text-sm text-muted-foreground">Коммерческие</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800">Договор</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Стандартный шаблон договора поставки товаров с типовыми условиями
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Скачать
                </Button>
                <Button variant="outline" size="sm">
                  Редактировать
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "risks" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Риски и комплаенс</h2>
            <Dialog open={showAddRisk} onOpenChange={setShowAddRisk}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить риск
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Новый правовой риск</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Название риска *</Label>
                    <Input
                      value={newRisk.title}
                      onChange={(e) => setNewRisk({ ...newRisk, title: e.target.value })}
                      placeholder="Введите название риска"
                    />
                  </div>
                  <div>
                    <Label>Описание риска</Label>
                    <Textarea
                      value={newRisk.description}
                      onChange={(e) => setNewRisk({ ...newRisk, description: e.target.value })}
                      placeholder="Подробное описание риска"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Категория</Label>
                      <Select
                        value={newRisk.category}
                        onChange={(value) => setNewRisk({ ...newRisk, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="regulatory">Регуляторный</SelectItem>
                          <SelectItem value="contractual">Договорной</SelectItem>
                          <SelectItem value="litigation">Судебный</SelectItem>
                          <SelectItem value="compliance">Комплаенс</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Вероятность</Label>
                      <Select
                        value={newRisk.probability}
                        onChange={(value) => setNewRisk({ ...newRisk, probability: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Низкая</SelectItem>
                          <SelectItem value="medium">Средняя</SelectItem>
                          <SelectItem value="high">Высокая</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Воздействие</Label>
                      <Select value={newRisk.impact} onChange={(value) => setNewRisk({ ...newRisk, impact: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Низкое</SelectItem>
                          <SelectItem value="medium">Среднее</SelectItem>
                          <SelectItem value="high">Высокое</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Меры по снижению риска</Label>
                    <Textarea
                      value={newRisk.mitigation}
                      onChange={(e) => setNewRisk({ ...newRisk, mitigation: e.target.value })}
                      placeholder="Описание мер по снижению или устранению риска"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Прикрепить документы</Label>
                    <Input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e.target.files, setRiskFiles)}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Поддерживаемые форматы: PDF, DOC, DOCX. Максимальный размер: 10 МБ
                    </p>
                  </div>
                  {riskFiles.length > 0 && (
                    <div className="space-y-2">
                      <Label>Прикрепленные файлы:</Label>
                      {riskFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm">{file.name}</span>
                          <Button variant="ghost" size="sm" onClick={() => removeFile(index, riskFiles, setRiskFiles)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAddRisk(false)}>
                    Отмена
                  </Button>
                  <Button onClick={handleAddRisk}>Создать риск</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid gap-4">
            <div className="bg-card p-4 rounded-lg border">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">Изменение налогового законодательства</h3>
                  <p className="text-sm text-muted-foreground">
                    Риск изменения налогового законодательства, влияющего на деятельность компании
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge className="bg-orange-100 text-orange-800">Регуляторный</Badge>
                    <Badge className="bg-yellow-100 text-yellow-800">Средняя вероятность</Badge>
                    <Badge className="bg-red-100 text-red-800">Высокое воздействие</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : notification.type === "error"
                ? "bg-red-500 text-white"
                : "bg-blue-500 text-white"
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  )
}

export { LegalDashboard }
