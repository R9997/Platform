"use client"

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
  Download,
  Search,
  Filter,
  CheckCircle,
  Clock,
  AlertCircle,
  Building,
  Eye,
  Edit,
  Plus,
  Archive,
  Bell,
  Settings,
  FilePenLineIcon as Signature,
  User,
  MessageSquare,
  Calendar,
  XCircle,
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

export default function EDODashboard() {
  const [activeTab, setActiveTab] = useState("documents")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showAddDocument, setShowAddDocument] = useState(false)
  const [showSignDialog, setShowSignDialog] = useState(false)
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [selectedApprovalDoc, setSelectedApprovalDoc] = useState<ApprovalDocument | null>(null)
  const [showApprovalHistory, setShowApprovalHistory] = useState(false)

  const [approvalDocuments] = useState<ApprovalDocument[]>([
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

  const [documents] = useState<Document[]>([
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
    },
  ])

  const [counterparties] = useState<Counterparty[]>([
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">ЭДО | Электронный документооборот</h2>
          <p className="text-muted-foreground">Управление электронными документами и подписями</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Интеграции
          </Button>
          <Button variant="outline" size="sm">
            <Bell className="w-4 h-4 mr-2" />
            Уведомления
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Всего документов</p>
                <p className="text-2xl font-bold">127</p>
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
                <p className="text-2xl font-bold">8</p>
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
                <p className="text-2xl font-bold">12</p>
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
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Новый документ</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="doc-type">Тип документа</Label>
                      <Select>
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
                      <Label htmlFor="direction">Направление</Label>
                      <Select>
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
                    <Label htmlFor="title">Название документа</Label>
                    <Input id="title" placeholder="Введите название документа" />
                  </div>
                  <div>
                    <Label htmlFor="counterparty">Контрагент</Label>
                    <Input id="counterparty" placeholder="Название организации" />
                  </div>
                  <div>
                    <Label htmlFor="amount">Сумма</Label>
                    <Input id="amount" type="number" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="description">Описание</Label>
                    <Textarea id="description" placeholder="Краткое описание документа" />
                  </div>
                  <div>
                    <Label htmlFor="file">Файл документа</Label>
                    <Input id="file" type="file" accept=".pdf,.doc,.docx" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowAddDocument(false)}>
                    Отмена
                  </Button>
                  <Button onClick={() => setShowAddDocument(false)}>Создать документ</Button>
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
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                        {doc.status === "pending" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedDocument(doc)
                              setShowSignDialog(true)
                            }}
                          >
                            <Signature className="w-4 h-4" />
                          </Button>
                        )}
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

        <TabsContent value="incoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Входящие документы</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Документы от контрагентов: акты, накладные, счета, договоры</p>
              <div className="mt-4 space-y-2">
                {documents
                  .filter((doc) => doc.direction === "incoming")
                  .map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{doc.title}</p>
                        <p className="text-sm text-muted-foreground">{doc.counterparty}</p>
                      </div>
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status === "signed" && "Подписано"}
                        {doc.status === "pending" && "На подписании"}
                        {doc.status === "draft" && "Черновик"}
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="outgoing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Исходящие документы</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Документы для отправки: счета, акты, оферты, договоры, счета-фактуры
              </p>
              <div className="mt-4 space-y-2">
                {documents
                  .filter((doc) => doc.direction === "outgoing")
                  .map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{doc.title}</p>
                        <p className="text-sm text-muted-foreground">{doc.counterparty}</p>
                      </div>
                      <Badge className={getStatusColor(doc.status)}>
                        {doc.status === "signed" && "Подписано"}
                        {doc.status === "pending" && "На подписании"}
                        {doc.status === "draft" && "Черновик"}
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approval" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Согласование документов</span>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Отправить на согласование
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">Внутренний процесс визирования документов</p>

              <div className="space-y-4">
                {approvalDocuments.map((doc) => (
                  <Card key={doc.id} className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                            <h4 className="font-semibold text-lg truncate">{doc.title}</h4>
                            <Badge className={getApprovalStatusColor(doc.status)}>
                              {doc.status === "in-progress" && "На согласовании"}
                              {doc.status === "approved" && "Согласовано"}
                              {doc.status === "rejected" && "Отклонено"}
                              {doc.status === "completed" && "Завершено"}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{doc.initiator}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>Создан: {doc.created}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>Срок: {doc.deadline}</span>
                            </div>
                            {doc.amount && (
                              <div className="font-medium text-foreground">{doc.amount.toLocaleString()} ₽</div>
                            )}
                          </div>

                          {/* Прогресс согласования */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Прогресс согласования</span>
                              <span>
                                {doc.steps.filter((s) => s.status === "approved").length} из {doc.steps.length}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{
                                  width: `${(doc.steps.filter((s) => s.status === "approved").length / doc.steps.length) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>

                          {/* Текущие согласующие */}
                          <div className="mt-4">
                            <p className="text-sm font-medium mb-2">Этапы согласования:</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                              {doc.steps.map((step) => (
                                <div key={step.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                                  {getApprovalStatusIcon(step.status)}
                                  <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium truncate">{step.approver}</p>
                                    <p className="text-xs text-muted-foreground">{step.role}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row lg:flex-col gap-2 lg:w-auto w-full">
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full sm:w-auto bg-transparent"
                            onClick={() => {
                              setSelectedApprovalDoc(doc)
                              setShowApprovalHistory(true)
                            }}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            История
                          </Button>
                          <Button size="sm" className="w-full sm:w-auto">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Согласовать
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Архив документов</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Все документы с поиском по реквизитам и тегам</p>
              <div className="mt-4">
                <div className="flex gap-4 mb-4">
                  <Input placeholder="Поиск по реквизитам..." className="flex-1" />
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Фильтры
                  </Button>
                </div>
                <div className="text-center py-8 text-muted-foreground">
                  <Archive className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Архивные документы будут отображаться здесь</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="counterparties" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Контрагенты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {counterparties.map((counterparty) => (
                  <div key={counterparty.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Building className="w-8 h-8 text-blue-500" />
                      <div>
                        <h4 className="font-medium">{counterparty.name}</h4>
                        <p className="text-sm text-muted-foreground">ИНН: {counterparty.inn}</p>
                        <p className="text-sm text-muted-foreground">
                          Последняя активность: {counterparty.lastActivity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge
                        className={
                          counterparty.status === "active"
                            ? "bg-green-100 text-green-800"
                            : counterparty.status === "debt"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                        }
                      >
                        {counterparty.status === "active" && "Активный"}
                        {counterparty.status === "debt" && "Задолженность"}
                        {counterparty.status === "blocked" && "Заблокирован"}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Проверить статус
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={showApprovalHistory} onOpenChange={setShowApprovalHistory}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>История согласования</DialogTitle>
          </DialogHeader>
          {selectedApprovalDoc && (
            <div className="space-y-6">
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold">{selectedApprovalDoc.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 text-sm text-muted-foreground">
                  <div>Инициатор: {selectedApprovalDoc.initiator}</div>
                  <div>Создан: {selectedApprovalDoc.created}</div>
                  <div>Срок: {selectedApprovalDoc.deadline}</div>
                  {selectedApprovalDoc.amount && <div>Сумма: {selectedApprovalDoc.amount.toLocaleString()} ₽</div>}
                </div>
                <p className="mt-2 text-sm">{selectedApprovalDoc.description}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Этапы согласования</h4>
                <div className="space-y-4">
                  {selectedApprovalDoc.steps.map((step, index) => (
                    <div key={step.id} className="flex gap-4 p-4 border rounded-lg">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.status === "approved"
                              ? "bg-green-100"
                              : step.status === "rejected"
                                ? "bg-red-100"
                                : step.status === "pending"
                                  ? "bg-yellow-100"
                                  : "bg-gray-100"
                          }`}
                        >
                          {getApprovalStatusIcon(step.status)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <div>
                            <p className="font-medium">{step.approver}</p>
                            <p className="text-sm text-muted-foreground">{step.role}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getApprovalStatusColor(step.status)}>
                              {step.status === "approved" && "Одобрено"}
                              {step.status === "rejected" && "Отклонено"}
                              {step.status === "pending" && "Ожидает"}
                            </Badge>
                            {step.date && <span className="text-sm text-muted-foreground">{step.date}</span>}
                          </div>
                        </div>
                        {step.comment && (
                          <div className="mt-2 p-3 bg-muted/50 rounded-lg">
                            <p className="text-sm">{step.comment}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setShowApprovalHistory(false)}>
                  Закрыть
                </Button>
                <Button>Скачать документ</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Sign Dialog */}
      <Dialog open={showSignDialog} onOpenChange={setShowSignDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Подписание документа</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="font-medium">{selectedDocument?.title}</p>
              <p className="text-sm text-muted-foreground">{selectedDocument?.counterparty}</p>
            </div>
            <div>
              <Label>Квалифицированная электронная подпись</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите сертификат" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cert1">Иванов И.И. (действует до 15.12.2024)</SelectItem>
                  <SelectItem value="cert2">Петров П.П. (действует до 20.11.2024)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Комментарий</Label>
              <Textarea placeholder="Дополнительный комментарий к подписи" />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowSignDialog(false)}>
              Отмена
            </Button>
            <Button onClick={() => setShowSignDialog(false)}>Подписать документ</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
