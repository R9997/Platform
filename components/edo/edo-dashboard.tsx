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

export default function EDODashboard() {
  const [activeTab, setActiveTab] = useState("documents")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showAddDocument, setShowAddDocument] = useState(false)
  const [showSignDialog, setShowSignDialog] = useState(false)
  const [showApprovalDialog, setShowApprovalDialog] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)

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
              <CardTitle>Согласование документов</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Внутренний процесс визирования документов</p>
              <div className="mt-4 space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Договор поставки №DS-2024-002</h4>
                    <Badge className="bg-yellow-100 text-yellow-800">На согласовании</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Финансовый директор - Одобрено</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">Юрист - Ожидает проверки</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-muted-foreground">Генеральный директор - Ожидает</span>
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline">
                      Просмотреть
                    </Button>
                    <Button size="sm">Согласовать</Button>
                  </div>
                </div>
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
