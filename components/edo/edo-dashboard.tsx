"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
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
  Download,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Edit,
  Plus,
  Bell,
  Settings,
  FilePenLineIcon as Signature,
  XCircle,
  Upload,
  X,
} from "lucide-react"

interface Document {
  id: string
  title: string
  type: "invoice" | "contract" | "act" | "offer" | "receipt"
  direction: "incoming" | "outgoing"
  counterparty: string
  amount?: number
  date: string
  status: "draft" | "pending" | "signed" | "rejected" | "archived"
  signers: string[]
  description: string
  fileName?: string
  files?: File[]
}

interface Counterparty {
  id: string
  name: string
  inn: string
  status: "active" | "blocked" | "debt"
  lastActivity: string
}

interface ApprovalStep {
  id: string
  approver: string
  role: string
  status: "pending" | "approved" | "rejected"
  comment?: string
  date?: string
  order: number
}

interface ApprovalDocument {
  id: string
  title: string
  type: string
  initiator: string
  created: string
  deadline: string
  status: "in-progress" | "approved" | "rejected" | "completed"
  currentStep: number
  steps: ApprovalStep[]
  description: string
  amount?: number
}

export { EDODashboard }
export default function EDODashboard() {
  const [activeTab, setActiveTab] = useState("documents")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showAddDocument, setShowAddDocument] = useState(false)
  const [showEDOSettings, setShowEDOSettings] = useState(false)
  const [showSignDialog, setShowSignDialog] = useState(false)
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [selectedApprovalDoc, setSelectedApprovalDoc] = useState<ApprovalDocument | null>(null)
  const [showApprovalHistory, setShowApprovalHistory] = useState(false)
  const [showSendForApproval, setShowSendForApproval] = useState(false)
  const [showAddCounterparty, setShowAddCounterparty] = useState(false)

  const [newDocument, setNewDocument] = useState({
    title: "",
    type: "invoice" as const,
    direction: "incoming" as const,
    counterparty: "",
    amount: "",
    description: "",
    files: [] as File[],
  })
  const [dragActive, setDragActive] = useState(false)

  const [newCounterparty, setNewCounterparty] = useState({
    name: "",
    inn: "",
    kpp: "",
    address: "",
    phone: "",
    email: "",
    contactPerson: "",
    bankAccount: "",
    bankName: "",
    bik: "",
  })
  const [newApprovalDoc, setNewApprovalDoc] = useState({
    title: "",
    type: "",
    description: "",
    amount: "",
    deadline: "",
    approvers: [""],
  })
  const [approvalAction, setApprovalAction] = useState({
    comment: "",
    action: "approve" as "approve" | "reject",
  })
  const [notification, setNotification] = useState<{
    type: "success" | "info" | "warning" | "error"
    message: string
  } | null>(null)

  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Новый документ на согласовании",
      message: "Договор поставки №123 ожидает вашего согласования",
      type: "warning" as const,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
    },
    {
      id: "2",
      title: "Документ подписан",
      message: "Акт выполненных работ №456 успешно подписан КЭП",
      type: "success" as const,
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: false,
    },
    {
      id: "3",
      title: "Истекает срок согласования",
      message: "У вас есть 2 дня для согласования договора №789",
      type: "error" as const,
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
      read: true,
    },
  ])

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const [approvalDocuments, setApprovalDocuments] = useState<ApprovalDocument[]>([
    {
      id: "1",
      title: "Договор поставки №DS-2024-002",
      type: "Договор",
      initiator: "Менеджер по закупкам",
      created: "2024-01-15",
      deadline: "2024-01-18",
      status: "in-progress",
      currentStep: 2,
      amount: 500000,
      description: "Договор на поставку офисного оборудования",
      steps: [
        {
          id: "1",
          approver: "Финансовый директор",
          role: "Финансы",
          status: "approved",
          comment: "Бюджет согласован, сумма в пределах лимита",
          date: "2024-01-15",
          order: 1,
        },
        {
          id: "2",
          approver: "Юрист",
          role: "Юридический отдел",
          status: "pending",
          order: 2,
        },
        {
          id: "3",
          approver: "Генеральный директор",
          role: "Руководство",
          status: "pending",
          order: 3,
        },
      ],
    },
    {
      id: "2",
      title: "Соглашение о конфиденциальности",
      type: "Соглашение",
      initiator: "HR-менеджер",
      created: "2024-01-14",
      deadline: "2024-01-16",
      status: "approved",
      currentStep: 3,
      description: "NDA с новым партнером",
      steps: [
        {
          id: "1",
          approver: "Юрист",
          role: "Юридический отдел",
          status: "approved",
          comment: "Стандартные условия, замечаний нет",
          date: "2024-01-14",
          order: 1,
        },
        {
          id: "2",
          approver: "Коммерческий директор",
          role: "Коммерция",
          status: "approved",
          comment: "Согласовано",
          date: "2024-01-15",
          order: 2,
        },
        {
          id: "3",
          approver: "Генеральный директор",
          role: "Руководство",
          status: "approved",
          comment: "Утверждено к подписанию",
          date: "2024-01-15",
          order: 3,
        },
      ],
    },
    {
      id: "3",
      title: "Договор аренды помещения",
      type: "Договор",
      initiator: "Административный менеджер",
      created: "2024-01-13",
      deadline: "2024-01-17",
      status: "rejected",
      currentStep: 1,
      amount: 150000,
      description: "Аренда дополнительного офисного помещения",
      steps: [
        {
          id: "1",
          approver: "Финансовый директор",
          role: "Финансы",
          status: "rejected",
          comment: "Превышен бюджет на аренду. Необходимо пересмотреть условия или найти более дешевый вариант",
          date: "2024-01-14",
          order: 1,
        },
        {
          id: "2",
          approver: "Генеральный директор",
          role: "Руководство",
          status: "pending",
          order: 2,
        },
      ],
    },
  ])

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      title: 'Счет №001 от ООО "Партнер"',
      type: "invoice",
      direction: "incoming",
      counterparty: 'ООО "Партнер"',
      amount: 150000,
      date: "2024-01-15",
      status: "pending",
      signers: ["Иванов И.И.", "Петров П.П."],
      description: "Счет за оказанные услуги",
      fileName: "invoice_001.pdf",
    },
    {
      id: "2",
      title: "Договор поставки №DS-2024-001",
      type: "contract",
      direction: "outgoing",
      counterparty: "ИП Сидоров",
      amount: 250000,
      date: "2024-01-14",
      status: "signed",
      signers: ["Директор"],
      description: "Договор на поставку оборудования",
      fileName: "contract_ds_2024_001.docx",
    },
    {
      id: "3",
      title: "Акт выполненных работ №001",
      type: "act",
      direction: "incoming",
      counterparty: 'ООО "Строй"',
      amount: 75000,
      date: "2024-01-13",
      status: "draft",
      signers: [],
      description: "Акт по строительным работам",
      fileName: "act_001.pdf",
    },
  ])

  const [counterparties, setCounterparties] = useState<Counterparty[]>([
    { id: "1", name: 'ООО "Партнер"', inn: "7701234567", status: "active", lastActivity: "2024-01-15" },
    { id: "2", name: "ИП Сидоров", inn: "123456789012", status: "active", lastActivity: "2024-01-14" },
    { id: "3", name: 'ООО "Строй"', inn: "7709876543", status: "debt", lastActivity: "2024-01-10" },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "signed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "archived":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getApprovalStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "signed":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "rejected":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <FileText className="w-4 h-4" />
    }
  }

  const getApprovalStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "invoice":
        return "Счет"
      case "contract":
        return "Договор"
      case "act":
        return "Акт"
      case "offer":
        return "Оферта"
      case "receipt":
        return "Накладная"
      default:
        return "Документ"
    }
  }

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.counterparty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || doc.status === filterStatus
    return matchesSearch && matchesFilter
  })

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files)
      setNewDocument((prev) => ({
        ...prev,
        files: [...prev.files, ...fileArray],
      }))
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const removeFile = (index: number) => {
    setNewDocument((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const handleAddDocument = () => {
    if (!newDocument.title || !newDocument.counterparty) {
      setNotification({
        type: "error",
        message: "Пожалуйста, заполните обязательные поля: название и контрагент",
      })
      return
    }

    const document: Document = {
      id: Date.now().toString(),
      title: newDocument.title,
      type: newDocument.type,
      direction: newDocument.direction,
      counterparty: newDocument.counterparty,
      amount: newDocument.amount ? Number.parseInt(newDocument.amount) : undefined,
      date: new Date().toISOString().split("T")[0],
      status: "draft",
      signers: [],
      description: newDocument.description,
      fileName: newDocument.files[0]?.name,
      files: newDocument.files,
    }

    setDocuments([document, ...documents])

    setNotification({
      type: "success",
      message: `Документ "${newDocument.title}" успешно создан`,
    })

    // Сброс формы
    setNewDocument({
      title: "",
      type: "invoice",
      direction: "incoming",
      counterparty: "",
      amount: "",
      description: "",
      files: [],
    })

    setShowAddDocument(false)
  }

  const handleSendForApproval = () => {
    const newDoc: ApprovalDocument = {
      id: Date.now().toString(),
      title: newApprovalDoc.title,
      type: newApprovalDoc.type,
      initiator: "Текущий пользователь",
      created: new Date().toISOString().split("T")[0],
      deadline: newApprovalDoc.deadline,
      status: "in-progress",
      currentStep: 1,
      description: newApprovalDoc.description,
      amount: newApprovalDoc.amount ? Number.parseInt(newApprovalDoc.amount) : undefined,
      steps: newApprovalDoc.approvers
        .filter((a) => a.trim())
        .map((approver, index) => ({
          id: (index + 1).toString(),
          approver: approver.trim(),
          role: "Согласующий",
          status: index === 0 ? "pending" : "pending",
          order: index + 1,
        })),
    }

    setApprovalDocuments([newDoc, ...approvalDocuments])
    setShowSendForApproval(false)
    setNewApprovalDoc({
      title: "",
      type: "",
      description: "",
      amount: "",
      deadline: "",
      approvers: [""],
    })
  }

  const handleApprovalAction = (docId: string) => {
    setApprovalDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id === docId) {
          const updatedSteps = doc.steps.map((step) => {
            if (step.status === "pending" && step.order === doc.currentStep) {
              return {
                ...step,
                status: approvalAction.action === "approve" ? "approved" : "rejected",
                comment: approvalAction.comment,
                date: new Date().toISOString().split("T")[0],
              }
            }
            return step
          })

          const nextStep = approvalAction.action === "approve" ? doc.currentStep + 1 : doc.currentStep
          const newStatus =
            approvalAction.action === "reject" ? "rejected" : nextStep > doc.steps.length ? "approved" : "in-progress"

          return {
            ...doc,
            steps: updatedSteps,
            currentStep: nextStep,
            status: newStatus,
          }
        }
        return doc
      }),
    )

    setShowApprovalDialog(false)
    setApprovalAction({ comment: "", action: "approve" })
  }

  const handleAddCounterparty = () => {
    const newCounterpartyData: Counterparty = {
      id: Date.now().toString(),
      name: newCounterparty.name,
      inn: newCounterparty.inn,
      status: "active",
      lastActivity: new Date().toISOString().split("T")[0],
    }

    setCounterparties([newCounterpartyData, ...counterparties])
    setShowAddCounterparty(false)
    setNewCounterparty({
      name: "",
      inn: "",
      kpp: "",
      address: "",
      phone: "",
      email: "",
      contactPerson: "",
      bankAccount: "",
      bankName: "",
      bik: "",
    })
  }

  const handleCheckCounterparty = async (inn: string) => {
    // Имитация проверки через API
    console.log("Проверка контрагента по ИНН:", inn)
    // Здесь будет интеграция с внешними сервисами проверки
  }

  const handleViewDocument = (doc: any) => {
    // Создаем URL для просмотра файла в браузере
    const fileUrl = `/api/documents/${doc.id}/view`

    // Определяем тип файла для правильного отображения
    const fileExtension = doc.fileName?.split(".").pop()?.toLowerCase()

    if (fileExtension === "pdf") {
      // Для PDF открываем в новой вкладке
      window.open(fileUrl, "_blank")
    } else if (["doc", "docx"].includes(fileExtension || "")) {
      // Для Word документов используем Google Docs Viewer или Office Online
      const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(window.location.origin + fileUrl)}&embedded=true`
      window.open(viewerUrl, "_blank")
    } else {
      // Для других типов файлов пытаемся открыть напрямую
      window.open(fileUrl, "_blank")
    }

    setNotification({
      type: "info",
      message: "Документ открыт для просмотра",
    })
  }

  const handleDownloadDocument = (doc: any) => {
    // Создаем ссылку для скачивания
    const downloadUrl = `/api/documents/${doc.id}/download`

    // Создаем временную ссылку для скачивания
    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = doc.fileName || `${doc.title}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    setNotification({
      type: "success",
      message: `Документ "${doc.title}" скачан`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Notification */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
            notification.type === "success"
              ? "bg-green-100 border border-green-300 text-green-800"
              : notification.type === "error"
                ? "bg-red-100 border border-red-300 text-red-800"
                : notification.type === "warning"
                  ? "bg-yellow-100 border border-yellow-300 text-yellow-800"
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

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">ЭДО | Электронный документооборот</h2>
          <p className="text-muted-foreground">Управление электронными документами и подписями</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setShowEDOSettings(true)}>
            <Settings className="w-4 h-4 mr-2" />
            Настройки
          </Button>
          <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="relative bg-transparent">
                <Bell className="w-4 h-4 mr-2" />
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
                <DialogTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Уведомления ЭДО
                  </span>
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Отметить все как прочитанные
                  </Button>
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Нет уведомлений</p>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        notif.read ? "bg-muted/30 border-border/50" : "bg-background border-border shadow-sm"
                      }`}
                      onClick={() => markAsRead(notif.id)}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                notif.type === "success"
                                  ? "bg-green-500"
                                  : notif.type === "warning"
                                    ? "bg-yellow-500"
                                    : notif.type === "error"
                                      ? "bg-red-500"
                                      : "bg-blue-500"
                              }`}
                            />
                            <h4
                              className={`font-medium text-sm ${!notif.read ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {notif.title}
                            </h4>
                          </div>
                          <p className={`text-sm ${!notif.read ? "text-foreground" : "text-muted-foreground"}`}>
                            {notif.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notif.timestamp.toLocaleString("ru-RU")}
                          </p>
                        </div>
                        {!notif.read && <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-1" />}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Всего документов</p>
                <p className="text-2xl font-bold">{documents.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">На подписании</p>
                <p className="text-2xl font-bold">{documents.filter((d) => d.status === "pending").length}</p>
              </div>
              <Signature className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Подписано сегодня</p>
                <p className="text-2xl font-bold">{documents.filter((d) => d.status === "signed").length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Просрочено</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="documents">Документы</TabsTrigger>
          <TabsTrigger value="incoming">Входящие</TabsTrigger>
          <TabsTrigger value="outgoing">Исходящие</TabsTrigger>
          <TabsTrigger value="approval">Согласование</TabsTrigger>
          <TabsTrigger value="archive">Архив</TabsTrigger>
          <TabsTrigger value="counterparties">Контрагенты</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по названию или контрагенту..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="draft">Черновик</SelectItem>
                <SelectItem value="pending">На подписании</SelectItem>
                <SelectItem value="signed">Подписано</SelectItem>
                <SelectItem value="rejected">Отклонено</SelectItem>
                <SelectItem value="archived">В архиве</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={showAddDocument} onOpenChange={setShowAddDocument}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить документ
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Новый документ</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="doc-type">Тип документа *</Label>
                      <Select
                        value={newDocument.type}
                        onValueChange={(value: any) => setNewDocument({ ...newDocument, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="invoice">Счет</SelectItem>
                          <SelectItem value="contract">Договор</SelectItem>
                          <SelectItem value="act">Акт</SelectItem>
                          <SelectItem value="offer">Оферта</SelectItem>
                          <SelectItem value="receipt">Накладная</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="direction">Направление *</Label>
                      <Select
                        value={newDocument.direction}
                        onValueChange={(value: any) => setNewDocument({ ...newDocument, direction: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите направление" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="incoming">Входящий</SelectItem>
                          <SelectItem value="outgoing">Исходящий</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="title">Название документа *</Label>
                    <Input
                      id="title"
                      placeholder="Введите название документа"
                      value={newDocument.title}
                      onChange={(e) => setNewDocument({ ...newDocument, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="counterparty">Контрагент *</Label>
                    <Input
                      id="counterparty"
                      placeholder="Название организации"
                      value={newDocument.counterparty}
                      onChange={(e) => setNewDocument({ ...newDocument, counterparty: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">Сумма (₽)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0"
                      value={newDocument.amount}
                      onChange={(e) => setNewDocument({ ...newDocument, amount: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      placeholder="Краткое описание документа"
                      value={newDocument.description}
                      onChange={(e) => setNewDocument({ ...newDocument, description: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label>Файлы документа</Label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        dragActive ? "border-primary bg-primary/5" : "border-border"
                      }`}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                    >
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">Перетащите файлы сюда или нажмите для выбора</p>
                      <p className="text-xs text-muted-foreground mb-3">
                        Поддерживаются форматы: PDF, DOC, DOCX, XLS, XLSX
                      </p>
                      <input
                        type="file"
                        multiple
                        onChange={(e) => handleFileUpload(e.target.files)}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => document.getElementById("file-upload")?.click()}
                      >
                        Выбрать файлы
                      </Button>
                    </div>

                    {newDocument.files.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <Label className="text-sm font-medium">Прикрепленные файлы:</Label>
                        {newDocument.files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                            <div className="flex items-center space-x-2">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                              <span className="text-xs text-muted-foreground">({formatFileSize(file.size)})</span>
                            </div>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="h-6 w-6 p-0"
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAddDocument(false)}>
                    Отмена
                  </Button>
                  <Button onClick={handleAddDocument}>Создать документ</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Documents List */}
          <div className="space-y-2">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(doc.status)}
                        <div>
                          <h4 className="font-medium">{doc.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {getTypeLabel(doc.type)} • {doc.counterparty} • {doc.date}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {doc.amount && (
                        <div className="text-right">
                          <p className="font-medium">{doc.amount.toLocaleString()} ₽</p>
                        </div>
                      )}
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status === "signed" && "Подписано"}
                        {doc.status === "pending" && "На подписании"}
                        {doc.status === "draft" && "Черновик"}
                        {doc.status === "rejected" && "Отклонено"}
                        {doc.status === "archived" && "В архиве"}
                      </Badge>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDocument(doc)}
                          title="Просмотреть документ"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadDocument(doc)}
                          title="Скачать документ"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
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
