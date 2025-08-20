"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
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

export { EDODashboard }
export default function EDODashboard() {
  const [activeTab, setActiveTab] = useState("documents")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showAddDocument, setShowAddDocument] = useState(false)
  const [notification, setNotification] = useState<{
    type: "success" | "info" | "warning" | "error"
    message: string
  } | null>(null)

  const [newDocument, setNewDocument] = useState({
    title: "",
    type: "invoice" as const,
    direction: "incoming" as const,
    counterparty: "",
    amount: "",
    description: "",
    files: [] as File[],
  })

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
      fileName: "invoice_001.pdf",
      files: [],
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
      files: [],
    },
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
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Настройки
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
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Входящие документы</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Добавить входящий документ
            </Button>
          </div>
          <div className="space-y-2">
            {documents
              .filter((doc) => doc.direction === "incoming")
              .map((doc) => (
                <Card key={doc.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{doc.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {doc.counterparty} • {doc.date}
                        </p>
                        {doc.amount && (
                          <p className="text-sm font-medium text-green-600">{doc.amount.toLocaleString()} ₽</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={doc.status === "signed" ? "default" : "secondary"}>
                          {doc.status === "signed" ? "Подписан" : "Черновик"}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-1" />
                          Открыть
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="outgoing" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Исходящие документы</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Добавить исходящий документ
            </Button>
          </div>
          <div className="space-y-2">
            {documents
              .filter((doc) => doc.direction === "outgoing")
              .map((doc) => (
                <Card key={doc.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium">{doc.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {doc.counterparty} • {doc.date}
                        </p>
                        {doc.amount && (
                          <p className="text-sm font-medium text-green-600">{doc.amount.toLocaleString()} ₽</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={doc.status === "signed" ? "default" : "secondary"}>
                          {doc.status === "signed" ? "Подписан" : "Черновик"}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-1" />
                          Открыть
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="approval" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Согласование документов</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Отправить на согласование
            </Button>
          </div>
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Нет документов на согласовании</p>
          </div>
        </TabsContent>

        <TabsContent value="archive" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Архив документов</h3>
            <div className="flex gap-2">
              <Input placeholder="Поиск в архиве..." className="w-64" />
              <Button variant="outline">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Архив пуст</p>
          </div>
        </TabsContent>

        <TabsContent value="counterparties" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Контрагенты</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Добавить контрагента
            </Button>
          </div>
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Нет контрагентов</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
