"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  AlertTriangle,
  Calendar,
  Search,
  Plus,
  Eye,
  Download,
  Clock,
  CheckCircle,
  AlertCircle,
  Shield,
  Gavel,
  FileCheck,
  Bell,
} from "lucide-react"

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
  date: string
  read: boolean
}

export default function LegalDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddContract, setShowAddContract] = useState(false)
  const [showAddTask, setShowAddTask] = useState(false)
  const [showAddLicense, setShowAddLicense] = useState(false)
  const [showAddCase, setShowAddCase] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showReportDialog, setShowReportDialog] = useState(false)
  const [reportType, setReportType] = useState("")
  const [reportPeriod, setReportPeriod] = useState("")
  const [contractFiles, setContractFiles] = useState<File[]>([])
  const [newContract, setNewContract] = useState({
    title: "",
    counterparty: "",
    type: "",
    amount: "",
    startDate: "",
    endDate: "",
    description: "",
  })

  // Mock data
  const [contracts] = useState<Contract[]>([
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
    {
      id: "2",
      title: "Соглашение о неразглашении",
      counterparty: "ИП Иванов А.А.",
      status: "review",
      startDate: "2024-08-01",
      endDate: "2025-08-01",
      amount: 0,
      type: "nda",
      files: [],
      description: "",
    },
  ])

  const [legalTasks] = useState<LegalTask[]>([
    {
      id: "1",
      title: "Продлить лицензию на деятельность",
      description: "Подготовить документы для продления лицензии",
      assignee: "Петрова М.В.",
      priority: "high",
      dueDate: "2024-09-01",
      status: "pending",
    },
    {
      id: "2",
      title: "Ответить на претензию",
      description: 'Подготовить ответ на претензию от ООО "Партнер"',
      assignee: "Сидоров И.П.",
      priority: "medium",
      dueDate: "2024-08-25",
      status: "in-progress",
    },
  ])

  const [licenses] = useState<License[]>([
    {
      id: "1",
      name: "Лицензия на образовательную деятельность",
      issuer: "Минобрнауки РФ",
      issueDate: "2022-03-15",
      expiryDate: "2025-03-15",
      status: "active",
    },
    {
      id: "2",
      name: "Лицензия на медицинскую деятельность",
      issuer: "Росздравнадзор",
      issueDate: "2023-06-01",
      expiryDate: "2024-12-01",
      status: "expiring",
    },
  ])

  const [legalCases] = useState<LegalCase[]>([
    {
      id: "1",
      title: 'Взыскание задолженности с ООО "Должник"',
      type: "lawsuit",
      status: "active",
      nextHearing: "2024-09-15",
      amount: 850000,
    },
  ])

  const [notifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Истекает лицензия",
      message: "Лицензия на медицинскую деятельность истекает через 30 дней",
      type: "warning",
      date: "2024-08-19",
      read: false,
    },
    {
      id: "2",
      title: "Новое судебное заседание",
      message: "Назначено заседание по делу о взыскании задолженности на 15.09.2024",
      type: "info",
      date: "2024-08-18",
      read: false,
    },
    {
      id: "3",
      title: "Срочная задача",
      message: "Необходимо подготовить ответ на претензию до 25.08.2024",
      type: "urgent",
      date: "2024-08-17",
      read: true,
    },
  ])

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

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "bg-red-100 text-red-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "info":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleGenerateReport = () => {
    console.log("Генерация отчета:", { type: reportType, period: reportPeriod })
    // Здесь будет логика генерации отчета
    setShowReportDialog(false)
    setReportType("")
    setReportPeriod("")
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFiles = Array.from(files).filter((file) => {
        const allowedTypes = [".pdf", ".doc", ".docx", ".txt"]
        const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()
        return allowedTypes.includes(fileExtension) && file.size <= 10 * 1024 * 1024 // 10MB limit
      })
      setContractFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setContractFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleCreateContract = () => {
    console.log("Создание договора:", {
      contract: newContract,
      files: contractFiles.map((f) => ({ name: f.name, size: f.size, type: f.type })),
    })

    // Здесь будет логика сохранения договора и файлов
    setShowAddContract(false)
    setNewContract({
      title: "",
      counterparty: "",
      type: "",
      amount: "",
      startDate: "",
      endDate: "",
      description: "",
    })
    setContractFiles([])
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
                <DialogTitle>Уведомления правового контура</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg ${!notification.read ? "bg-blue-50" : ""}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{notification.title}</h4>
                          <Badge className={getNotificationColor(notification.type)}>
                            {notification.type === "urgent"
                              ? "Срочно"
                              : notification.type === "warning"
                                ? "Предупреждение"
                                : "Информация"}
                          </Badge>
                          {!notification.read && <Badge className="bg-blue-500 text-white text-xs">Новое</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setShowNotifications(false)}>
                  Закрыть
                </Button>
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
                      <SelectItem value="risks">Отчет по рискам</SelectItem>
                      <SelectItem value="full">Полный отчет</SelectItem>
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
                      <SelectItem value="week">За неделю</SelectItem>
                      <SelectItem value="month">За месяц</SelectItem>
                      <SelectItem value="quarter">За квартал</SelectItem>
                      <SelectItem value="year">За год</SelectItem>
                      <SelectItem value="custom">Произвольный период</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {reportPeriod === "custom" && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Дата начала</Label>
                      <Input type="date" />
                    </div>
                    <div>
                      <Label>Дата окончания</Label>
                      <Input type="date" />
                    </div>
                  </div>
                )}
                <div>
                  <Label>Формат отчета</Label>
                  <Select defaultValue="pdf">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="word">Word</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowReportDialog(false)}>
                  Отмена
                </Button>
                <Button onClick={handleGenerateReport} disabled={!reportType || !reportPeriod}>
                  Сгенерировать отчет
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Активные договоры</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Судебные дела</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Gavel className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Истекающие лицензии</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Задачи в работе</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="contracts">Договоры</TabsTrigger>
          <TabsTrigger value="tasks">Задачи</TabsTrigger>
          <TabsTrigger value="cases">Дела</TabsTrigger>
          <TabsTrigger value="licenses">Лицензии</TabsTrigger>
          <TabsTrigger value="templates">Шаблоны</TabsTrigger>
          <TabsTrigger value="risks">Риски</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Contracts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Последние договоры
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {contracts.slice(0, 3).map((contract) => (
                    <div key={contract.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{contract.title}</p>
                        <p className="text-sm text-muted-foreground">{contract.counterparty}</p>
                      </div>
                      <Badge className={getStatusColor(contract.status)}>
                        {contract.status === "signed"
                          ? "Подписан"
                          : contract.status === "review"
                            ? "На согласовании"
                            : contract.status === "draft"
                              ? "Проект"
                              : "Исполнен"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Urgent Tasks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Срочные задачи
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {legalTasks
                    .filter((task) => task.priority === "high")
                    .map((task) => (
                      <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-muted-foreground">До: {task.dueDate}</p>
                        </div>
                        <Badge className={getPriorityColor(task.priority)}>Высокий</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Поиск по договорам..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
            </div>
            <Dialog open={showAddContract} onOpenChange={setShowAddContract}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить договор
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Новый договор</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Название договора *</Label>
                      <Input
                        placeholder="Введите название"
                        value={newContract.title}
                        onChange={(e) => setNewContract({ ...newContract, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Контрагент *</Label>
                      <Input
                        placeholder="Название организации"
                        value={newContract.counterparty}
                        onChange={(e) => setNewContract({ ...newContract, counterparty: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Тип договора *</Label>
                      <Select
                        value={newContract.type}
                        onValueChange={(value) => setNewContract({ ...newContract, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="supply">Поставка</SelectItem>
                          <SelectItem value="service">Услуги</SelectItem>
                          <SelectItem value="nda">NDA</SelectItem>
                          <SelectItem value="employment">Трудовой</SelectItem>
                          <SelectItem value="lease">Аренда</SelectItem>
                          <SelectItem value="partnership">Партнерство</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Сумма договора</Label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={newContract.amount}
                        onChange={(e) => setNewContract({ ...newContract, amount: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Дата начала *</Label>
                      <Input
                        type="date"
                        value={newContract.startDate}
                        onChange={(e) => setNewContract({ ...newContract, startDate: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label>Дата окончания *</Label>
                      <Input
                        type="date"
                        value={newContract.endDate}
                        onChange={(e) => setNewContract({ ...newContract, endDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Описание договора</Label>
                    <Textarea
                      placeholder="Краткое описание предмета договора, основных условий и особенностей"
                      value={newContract.description}
                      onChange={(e) => setNewContract({ ...newContract, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  {/* File Upload Section */}
                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium">Файлы договора</h4>
                        <p className="text-sm text-muted-foreground">
                          Загрузите текст договора, приложения и дополнительные документы
                        </p>
                      </div>
                      <div className="relative">
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.doc,.docx,.txt"
                          onChange={handleFileUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          id="contract-files"
                        />
                        <Button variant="outline" size="sm" asChild>
                          <label htmlFor="contract-files" className="cursor-pointer">
                            <Plus className="h-4 w-4 mr-2" />
                            Выбрать файлы
                          </label>
                        </Button>
                      </div>
                    </div>

                    {contractFiles.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Загруженные файлы ({contractFiles.length}):</p>
                        <div className="space-y-2 max-h-32 overflow-y-auto">
                          {contractFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 border rounded-lg bg-muted/50"
                            >
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-blue-600" />
                                <div>
                                  <p className="text-sm font-medium truncate max-w-xs">{file.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {(file.size / 1024 / 1024).toFixed(2)} MB
                                  </p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                ×
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-medium text-blue-900">Требования к файлам:</p>
                          <ul className="text-blue-700 mt-1 space-y-1">
                            <li>• Поддерживаемые форматы: PDF, DOC, DOCX, TXT</li>
                            <li>• Максимальный размер файла: 10 МБ</li>
                            <li>• Рекомендуется загружать основной текст договора и все приложения</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
                  <Button variant="outline" onClick={() => setShowAddContract(false)}>
                    Отмена
                  </Button>
                  <Button
                    onClick={handleCreateContract}
                    disabled={
                      !newContract.title ||
                      !newContract.counterparty ||
                      !newContract.type ||
                      !newContract.startDate ||
                      !newContract.endDate
                    }
                  >
                    Создать договор
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4">Договор</th>
                      <th className="text-left p-4">Контрагент</th>
                      <th className="text-left p-4">Статус</th>
                      <th className="text-left p-4">Сумма</th>
                      <th className="text-left p-4">Срок действия</th>
                      <th className="text-left p-4">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contracts.map((contract) => (
                      <tr key={contract.id} className="border-b">
                        <td className="p-4">
                          <div>
                            <p className="font-medium">{contract.title}</p>
                            <p className="text-sm text-muted-foreground">{contract.type}</p>
                          </div>
                        </td>
                        <td className="p-4">{contract.counterparty}</td>
                        <td className="p-4">
                          <Badge className={getStatusColor(contract.status)}>
                            {contract.status === "signed"
                              ? "Подписан"
                              : contract.status === "review"
                                ? "На согласовании"
                                : contract.status === "draft"
                                  ? "Проект"
                                  : "Исполнен"}
                          </Badge>
                        </td>
                        <td className="p-4">{contract.amount.toLocaleString()} ₽</td>
                        <td className="p-4">
                          {contract.startDate} - {contract.endDate}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Юридические задачи</h2>
            <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Новая задача
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Новая юридическая задача</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Название задачи</Label>
                    <Input placeholder="Введите название задачи" />
                  </div>
                  <div>
                    <Label>Описание</Label>
                    <Textarea placeholder="Подробное описание задачи" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Исполнитель</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите исполнителя" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="petrov">Петрова М.В.</SelectItem>
                          <SelectItem value="sidorov">Сидоров И.П.</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Приоритет</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите приоритет" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">Высокий</SelectItem>
                          <SelectItem value="medium">Средний</SelectItem>
                          <SelectItem value="low">Низкий</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Срок выполнения</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setShowAddTask(false)}>
                    Отмена
                  </Button>
                  <Button onClick={() => setShowAddTask(false)}>Создать задачу</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {legalTasks.map((task) => (
              <Card key={task.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{task.title}</h3>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority === "high" ? "Высокий" : task.priority === "medium" ? "Средний" : "Низкий"}
                        </Badge>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status === "pending"
                            ? "Ожидает"
                            : task.status === "in-progress"
                              ? "В работе"
                              : "Выполнено"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Исполнитель: {task.assignee}</span>
                        <span>Срок: {task.dueDate}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cases" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Судебные дела и претензии</h2>
            <Dialog open={showAddCase} onOpenChange={setShowAddCase}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Новое дело
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Новое судебное дело</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Название дела</Label>
                    <Input placeholder="Введите название дела" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Тип дела</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lawsuit">Судебный иск</SelectItem>
                          <SelectItem value="claim">Претензия</SelectItem>
                          <SelectItem value="arbitration">Арбитраж</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Сумма спора</Label>
                      <Input type="number" placeholder="0" />
                    </div>
                  </div>
                  <div>
                    <Label>Дата следующего заседания</Label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setShowAddCase(false)}>
                    Отмена
                  </Button>
                  <Button onClick={() => setShowAddCase(false)}>Создать дело</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {legalCases.map((legalCase) => (
              <Card key={legalCase.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{legalCase.title}</h3>
                        <Badge className={getStatusColor(legalCase.status)}>
                          {legalCase.status === "active"
                            ? "Активное"
                            : legalCase.status === "pending"
                              ? "Ожидает"
                              : "Закрыто"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>
                          Тип:{" "}
                          {legalCase.type === "lawsuit"
                            ? "Судебный иск"
                            : legalCase.type === "claim"
                              ? "Претензия"
                              : "Арбитраж"}
                        </span>
                        <span>Сумма: {legalCase.amount.toLocaleString()} ₽</span>
                        <span>Следующее заседание: {legalCase.nextHearing}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="licenses" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Лицензии и разрешения</h2>
            <Dialog open={showAddLicense} onOpenChange={setShowAddLicense}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить лицензию
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Новая лицензия</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Название лицензии</Label>
                    <Input placeholder="Введите название лицензии" />
                  </div>
                  <div>
                    <Label>Орган выдачи</Label>
                    <Input placeholder="Название органа" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Дата выдачи</Label>
                      <Input type="date" />
                    </div>
                    <div>
                      <Label>Дата окончания</Label>
                      <Input type="date" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="outline" onClick={() => setShowAddLicense(false)}>
                    Отмена
                  </Button>
                  <Button onClick={() => setShowAddLicense(false)}>Добавить лицензию</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {licenses.map((license) => (
              <Card key={license.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{license.name}</h3>
                        <Badge className={getStatusColor(license.status)}>
                          {license.status === "active"
                            ? "Активна"
                            : license.status === "expiring"
                              ? "Истекает"
                              : "Просрочена"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Орган: {license.issuer}</span>
                        <span>Выдана: {license.issueDate}</span>
                        <span>Действует до: {license.expiryDate}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Шаблоны документов</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Добавить шаблон
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Договор поставки", type: "supply", downloads: 45 },
              { name: "Соглашение о неразглашении (NDA)", type: "nda", downloads: 32 },
              { name: "Договор оказания услуг", type: "service", downloads: 28 },
              { name: "Трудовой договор", type: "employment", downloads: 67 },
              { name: "Договор подряда", type: "contract", downloads: 19 },
              { name: "Лицензионное соглашение", type: "license", downloads: 12 },
            ].map((template, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <FileCheck className="h-8 w-8 text-blue-600" />
                    <Badge variant="outline">{template.downloads} загрузок</Badge>
                  </div>
                  <h3 className="font-medium mb-2">{template.name}</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Eye className="h-4 w-4 mr-1" />
                      Просмотр
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-1" />
                      Скачать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Риски и комплаенс</h2>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Добавить риск
            </Button>
          </div>

          <div className="grid gap-4">
            {[
              {
                title: "Истечение лицензии на медицинскую деятельность",
                level: "high",
                category: "Лицензирование",
                deadline: "2024-12-01",
                description: "Необходимо подготовить документы для продления лицензии",
              },
              {
                title: "Проверка налоговой службы",
                level: "medium",
                category: "Налоговое право",
                deadline: "2024-09-15",
                description: "Плановая проверка соблюдения налогового законодательства",
              },
              {
                title: "Изменения в трудовом законодательстве",
                level: "low",
                category: "Трудовое право",
                deadline: "2024-10-01",
                description: "Необходимо актуализировать трудовые договоры",
              },
            ].map((risk, index) => (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{risk.title}</h3>
                        <Badge className={getPriorityColor(risk.level)}>
                          {risk.level === "high" ? "Высокий" : risk.level === "medium" ? "Средний" : "Низкий"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{risk.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Категория: {risk.category}</span>
                        <span>Срок: {risk.deadline}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Shield className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <AlertTriangle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
