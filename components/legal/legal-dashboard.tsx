"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Bell, Plus, FileText, AlertTriangle, Scale, Settings } from "lucide-react"

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
}

interface License {
  id: string
  name: string
  issuer: string
  issueDate: string
  expiryDate: string
  status: "active" | "expiring" | "expired"
}

interface LegalCase {
  id: string
  title: string
  type: "lawsuit" | "claim" | "arbitration"
  status: "active" | "pending" | "closed"
  nextHearing: string
  amount: number
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

  // Mock data
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

  const legalTasks: LegalTask[] = [
    {
      id: "1",
      title: "Продлить лицензию на деятельность",
      description: "Подготовить документы для продления лицензии",
      assignee: "Петрова М.В.",
      priority: "high",
      dueDate: "2024-09-01",
      status: "pending",
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

  const handleFileUpload = (files: FileList | null, setFiles: (files: File[]) => void) => {
    if (files) {
      const newFiles = Array.from(files).filter((file) => {
        const validTypes = [".pdf", ".doc", ".docx", ".txt"]
        const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()
        return validTypes.includes(fileExtension) && file.size <= 10 * 1024 * 1024
      })
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number, files: File[], setFiles: (files: File[]) => void) => {
    setFiles(files.filter((_, i) => i !== index))
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

  return (
    <div className="space-y-6">
      {/* Header */}
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
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Настройки правового контура</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Уведомления</Label>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Истечение лицензий</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Судебные заседания</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Срочные задачи</span>
                    </label>
                  </div>
                </div>
                <Button className="w-full">Сохранить настройки</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Navigation Tabs */}
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

      {/* Content */}
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
            <Button onClick={() => setShowAddTask(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Добавить задачу
            </Button>
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
    </div>
  )
}

export { LegalDashboard }
