"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  Users,
  Target,
  DollarSign,
  Phone,
  Mail,
  Calendar,
  Plus,
  Filter,
  Search,
  Clock,
  ArrowUp,
  Eye,
  Edit,
  X,
  Save,
  Trash2,
} from "lucide-react"

interface Lead {
  id: number
  name: string
  company: string
  email: string
  phone: string
  status: "new" | "contacted" | "qualified" | "proposal" | "negotiation" | "closed-won" | "closed-lost"
  value: number
  probability: number
  source: string
  assignedTo: string
  lastContact: string
  nextAction: string
  notes: string
  createdAt: string
}

interface Deal {
  id: number
  title: string
  client: string
  value: number
  stage: string
  probability: number
  closeDate: string
  assignedTo: string
  activities: number
}

export function SalesManager() {
  const [activeTab, setActiveTab] = useState("pipeline")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [showAddLead, setShowAddLead] = useState(false)
  const [editingLead, setEditingLead] = useState<Lead | null>(null)
  const [newLead, setNewLead] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    value: "",
    source: "Сайт",
    assignedTo: "Михаил Сидоров",
    nextAction: "",
    notes: "",
  })

  const [salesMetrics, setSalesMetrics] = useState({
    totalRevenue: 2450000,
    monthlyGrowth: 18.5,
    conversionRate: 24.8,
    avgDealSize: 85000,
    activePipeline: 1850000,
    closedDeals: 28,
    totalLeads: 156,
    qualifiedLeads: 89,
  })

  const [leads, setLeads] = useState<Lead[]>([
    {
      id: 1,
      name: "Анна Петрова",
      company: "ТехноСтрой ООО",
      email: "anna@technostroy.ru",
      phone: "+7 (495) 123-45-67",
      status: "qualified",
      value: 150000,
      probability: 75,
      source: "Сайт",
      assignedTo: "Михаил Сидоров",
      lastContact: "2024-01-15",
      nextAction: "Презентация решения",
      notes: "Заинтересована в автоматизации склада",
      createdAt: "2024-01-10",
    },
    {
      id: 2,
      name: "Дмитрий Волков",
      company: "Альфа Логистика",
      email: "d.volkov@alpha-log.ru",
      phone: "+7 (812) 987-65-43",
      status: "proposal",
      value: 320000,
      probability: 60,
      source: "Реклама",
      assignedTo: "Елена Козлова",
      lastContact: "2024-01-14",
      nextAction: "Обсуждение бюджета",
      notes: "Требует интеграцию с 1С",
      createdAt: "2024-01-08",
    },
    {
      id: 3,
      name: "Ольга Смирнова",
      company: "МедТех Центр",
      email: "o.smirnova@medtech.ru",
      phone: "+7 (495) 555-12-34",
      status: "negotiation",
      value: 480000,
      probability: 85,
      source: "Рекомендация",
      assignedTo: "Михаил Сидоров",
      lastContact: "2024-01-16",
      nextAction: "Подписание договора",
      notes: "Готова к подписанию, уточняет сроки",
      createdAt: "2024-01-05",
    },
  ])

  const [deals, setDeals] = useState<Deal[]>([
    {
      id: 1,
      title: "Автоматизация склада ТехноСтрой",
      client: "ТехноСтрой ООО",
      value: 150000,
      stage: "Квалификация",
      probability: 75,
      closeDate: "2024-02-15",
      assignedTo: "Михаил Сидоров",
      activities: 8,
    },
    {
      id: 2,
      title: "CRM система для Альфа Логистика",
      client: "Альфа Логистика",
      value: 320000,
      stage: "Предложение",
      probability: 60,
      closeDate: "2024-02-28",
      assignedTo: "Елена Козлова",
      activities: 12,
    },
    {
      id: 3,
      title: "ИИ-диагностика МедТех",
      client: "МедТех Центр",
      value: 480000,
      stage: "Переговоры",
      probability: 85,
      closeDate: "2024-02-10",
      assignedTo: "Михаил Сидоров",
      activities: 15,
    },
  ])

  const handleAddLead = () => {
    if (newLead.name && newLead.email && newLead.company) {
      const lead: Lead = {
        id: leads.length + 1,
        name: newLead.name,
        company: newLead.company,
        email: newLead.email,
        phone: newLead.phone,
        status: "new",
        value: Number.parseInt(newLead.value) || 0,
        probability: 25,
        source: newLead.source,
        assignedTo: newLead.assignedTo,
        lastContact: new Date().toISOString().split("T")[0],
        nextAction: newLead.nextAction || "Первичный контакт",
        notes: newLead.notes,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setLeads([...leads, lead])
      setSalesMetrics({ ...salesMetrics, totalLeads: salesMetrics.totalLeads + 1 })
      setNewLead({
        name: "",
        company: "",
        email: "",
        phone: "",
        value: "",
        source: "Сайт",
        assignedTo: "Михаил Сидоров",
        nextAction: "",
        notes: "",
      })
      setShowAddLead(false)
    }
  }

  const handleEditLead = (lead: Lead) => {
    setEditingLead(lead)
  }

  const handleSaveLead = () => {
    if (editingLead) {
      setLeads(leads.map((lead) => (lead.id === editingLead.id ? editingLead : lead)))
      setEditingLead(null)
    }
  }

  const handleDeleteLead = (leadId: number) => {
    setLeads(leads.filter((lead) => lead.id !== leadId))
    setSalesMetrics({ ...salesMetrics, totalLeads: salesMetrics.totalLeads - 1 })
  }

  const handleStatusChange = (leadId: number, newStatus: Lead["status"]) => {
    setLeads(
      leads.map((lead) => {
        if (lead.id === leadId) {
          let newProbability = lead.probability
          switch (newStatus) {
            case "new":
              newProbability = 25
              break
            case "contacted":
              newProbability = 40
              break
            case "qualified":
              newProbability = 60
              break
            case "proposal":
              newProbability = 75
              break
            case "negotiation":
              newProbability = 85
              break
            case "closed-won":
              newProbability = 100
              break
            case "closed-lost":
              newProbability = 0
              break
          }
          return { ...lead, status: newStatus, probability: newProbability }
        }
        return lead
      }),
    )
  }

  const getStatusColor = (status: string) => {
    const colors = {
      new: "bg-blue-500/10 text-blue-600 border-blue-500/30",
      contacted: "bg-yellow-500/10 text-yellow-600 border-yellow-500/30",
      qualified: "bg-green-500/10 text-green-600 border-green-500/30",
      proposal: "bg-purple-500/10 text-purple-600 border-purple-500/30",
      negotiation: "bg-orange-500/10 text-orange-600 border-orange-500/30",
      "closed-won": "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
      "closed-lost": "bg-red-500/10 text-red-600 border-red-500/30",
    }
    return colors[status as keyof typeof colors] || "bg-gray-500/10 text-gray-600 border-gray-500/30"
  }

  const getStatusLabel = (status: string) => {
    const labels = {
      new: "Новый",
      contacted: "Контакт",
      qualified: "Квалифицирован",
      proposal: "Предложение",
      negotiation: "Переговоры",
      "closed-won": "Закрыт успешно",
      "closed-lost": "Закрыт неуспешно",
    }
    return labels[status as keyof typeof labels] || status
  }

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50">
          <TabsTrigger value="pipeline" className="flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Воронка
          </TabsTrigger>
          <TabsTrigger value="leads" className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Лиды
          </TabsTrigger>
          <TabsTrigger value="deals" className="flex items-center">
            <Target className="w-4 h-4 mr-2" />
            Сделки
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center">
            <DollarSign className="w-4 h-4 mr-2" />
            Аналитика
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Общая выручка</p>
                    <p className="text-2xl font-bold text-foreground">
                      {salesMetrics.totalRevenue.toLocaleString("ru-RU")}₽
                    </p>
                    <div className="flex items-center mt-1">
                      <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
                      <span className="text-xs text-green-600">+{salesMetrics.monthlyGrowth}%</span>
                    </div>
                  </div>
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <DollarSign className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Конверсия</p>
                    <p className="text-2xl font-bold text-foreground">{salesMetrics.conversionRate}%</p>
                    <div className="flex items-center mt-1">
                      <ArrowUp className="w-3 h-3 text-blue-600 mr-1" />
                      <span className="text-xs text-blue-600">+2.3%</span>
                    </div>
                  </div>
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Средний чек</p>
                    <p className="text-2xl font-bold text-foreground">
                      {salesMetrics.avgDealSize.toLocaleString("ru-RU")}₽
                    </p>
                    <div className="flex items-center mt-1">
                      <ArrowUp className="w-3 h-3 text-purple-600 mr-1" />
                      <span className="text-xs text-purple-600">+12%</span>
                    </div>
                  </div>
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">В работе</p>
                    <p className="text-2xl font-bold text-foreground">
                      {salesMetrics.activePipeline.toLocaleString("ru-RU")}₽
                    </p>
                    <div className="flex items-center mt-1">
                      <Clock className="w-3 h-3 text-orange-600 mr-1" />
                      <span className="text-xs text-orange-600">{salesMetrics.totalLeads} лидов</span>
                    </div>
                  </div>
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <Users className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/60 backdrop-blur-xl border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Воронка продаж
              </CardTitle>
              <CardDescription>Визуализация этапов продаж и конверсии</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { stage: "Лиды", count: 156, value: 2450000, color: "blue", width: 100 },
                  { stage: "Квалифицированные", count: 89, value: 1850000, color: "green", width: 75 },
                  { stage: "Предложения", count: 45, value: 1200000, color: "purple", width: 60 },
                  { stage: "Переговоры", count: 28, value: 950000, color: "orange", width: 45 },
                  { stage: "Закрытые", count: 18, value: 680000, color: "emerald", width: 30 },
                ].map((stage, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-foreground">{stage.stage}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">{stage.count} шт.</span>
                        <span className="text-sm font-medium text-foreground">
                          {stage.value.toLocaleString("ru-RU")}₽
                        </span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-muted/30 rounded-full h-3">
                        <div
                          className={`bg-${stage.color}-500 h-3 rounded-full transition-all duration-500`}
                          style={{ width: `${stage.width}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-2 flex-1">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Поиск лидов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-border/50"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-background border-border/50">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="new">Новые</SelectItem>
                  <SelectItem value="contacted">Контакт</SelectItem>
                  <SelectItem value="qualified">Квалифицированные</SelectItem>
                  <SelectItem value="proposal">Предложение</SelectItem>
                  <SelectItem value="negotiation">Переговоры</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => setShowAddLead(true)} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Добавить лид
            </Button>
          </div>

          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <Card
                key={lead.id}
                className="bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors"
              >
                <CardContent className="p-6">
                  {editingLead?.id === lead.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Имя</label>
                          <Input
                            value={editingLead.name}
                            onChange={(e) => setEditingLead({ ...editingLead, name: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Компания</label>
                          <Input
                            value={editingLead.company}
                            onChange={(e) => setEditingLead({ ...editingLead, company: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Email</label>
                          <Input
                            value={editingLead.email}
                            onChange={(e) => setEditingLead({ ...editingLead, email: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Телефон</label>
                          <Input
                            value={editingLead.phone}
                            onChange={(e) => setEditingLead({ ...editingLead, phone: e.target.value })}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Потенциал</label>
                          <Input
                            type="number"
                            value={editingLead.value}
                            onChange={(e) => setEditingLead({ ...editingLead, value: Number.parseInt(e.target.value) })}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Статус</label>
                          <Select
                            value={editingLead.status}
                            onValueChange={(value: Lead["status"]) => setEditingLead({ ...editingLead, status: value })}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">Новый</SelectItem>
                              <SelectItem value="contacted">Контакт</SelectItem>
                              <SelectItem value="qualified">Квалифицирован</SelectItem>
                              <SelectItem value="proposal">Предложение</SelectItem>
                              <SelectItem value="negotiation">Переговоры</SelectItem>
                              <SelectItem value="closed-won">Закрыт успешно</SelectItem>
                              <SelectItem value="closed-lost">Закрыт неуспешно</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Следующее действие</label>
                        <Input
                          value={editingLead.nextAction}
                          onChange={(e) => setEditingLead({ ...editingLead, nextAction: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Заметки</label>
                        <Input
                          value={editingLead.notes}
                          onChange={(e) => setEditingLead({ ...editingLead, notes: e.target.value })}
                          className="mt-1"
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleSaveLead} size="sm">
                          <Save className="w-4 h-4 mr-1" />
                          Сохранить
                        </Button>
                        <Button onClick={() => setEditingLead(null)} variant="outline" size="sm">
                          <X className="w-4 h-4 mr-1" />
                          Отмена
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">{lead.name}</h3>
                            <Select
                              value={lead.status}
                              onValueChange={(value: Lead["status"]) => handleStatusChange(lead.id, value)}
                            >
                              <SelectTrigger className="w-auto">
                                <Badge className={getStatusColor(lead.status)}>{getStatusLabel(lead.status)}</Badge>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">Новый</SelectItem>
                                <SelectItem value="contacted">Контакт</SelectItem>
                                <SelectItem value="qualified">Квалифицирован</SelectItem>
                                <SelectItem value="proposal">Предложение</SelectItem>
                                <SelectItem value="negotiation">Переговоры</SelectItem>
                                <SelectItem value="closed-won">Закрыт успешно</SelectItem>
                                <SelectItem value="closed-lost">Закрыт неуспешно</SelectItem>
                              </SelectContent>
                            </Select>
                            <Badge variant="outline" className="text-xs">
                              {lead.probability}% вероятность
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-2">{lead.company}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 mr-1" />
                              {lead.email}
                            </div>
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-1" />
                              {lead.phone}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Последний контакт: {lead.lastContact}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-foreground">{lead.value.toLocaleString("ru-RU")}₽</p>
                          <p className="text-sm text-muted-foreground">Потенциал</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-foreground mb-1">Следующее действие: {lead.nextAction}</p>
                          <p className="text-xs text-muted-foreground">Ответственный: {lead.assignedTo}</p>
                          {lead.notes && <p className="text-xs text-muted-foreground mt-1">Заметки: {lead.notes}</p>}
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditLead(lead)}>
                            <Edit className="w-4 h-4 mr-1" />
                            Редактировать
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteLead(lead.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Удалить
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="deals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deals.map((deal) => (
              <Card
                key={deal.id}
                className="bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">{deal.title}</h3>
                      <p className="text-muted-foreground mb-3">{deal.client}</p>
                      <Badge variant="outline" className="mb-3">
                        {deal.stage}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Сумма сделки</span>
                      <span className="text-lg font-bold text-foreground">{deal.value.toLocaleString("ru-RU")}₽</span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Вероятность</span>
                        <span className="text-sm font-medium text-foreground">{deal.probability}%</span>
                      </div>
                      <Progress value={deal.probability} className="h-2" />
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Закрытие</span>
                      <span className="text-foreground">{deal.closeDate}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Ответственный</span>
                      <span className="text-foreground">{deal.assignedTo}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Активности</span>
                      <Badge variant="secondary">{deal.activities}</Badge>
                    </div>
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <Edit className="w-4 h-4 mr-1" />
                      Редактировать
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      Открыть
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card/60 backdrop-blur-xl border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                  Динамика продаж
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: "Октябрь", revenue: 1850000, deals: 15, growth: 12 },
                    { month: "Ноябрь", revenue: 2100000, deals: 18, growth: 18 },
                    { month: "Декабрь", revenue: 2450000, deals: 22, growth: 24 },
                    { month: "Январь", revenue: 2890000, deals: 28, growth: 32 },
                  ].map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{data.month}</p>
                        <p className="text-sm text-muted-foreground">{data.deals} сделок</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">{data.revenue.toLocaleString("ru-RU")}₽</p>
                        <div className="flex items-center">
                          <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
                          <span className="text-xs text-green-600">+{data.growth}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-xl border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Users className="w-5 h-5 mr-2 text-primary" />
                  Эффективность команды
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Михаил Сидоров", deals: 12, revenue: 1450000, conversion: 28 },
                    { name: "Елена Козлова", deals: 8, revenue: 980000, conversion: 22 },
                    { name: "Анна Петрова", deals: 6, revenue: 720000, conversion: 18 },
                    { name: "Дмитрий Волков", deals: 4, revenue: 540000, conversion: 15 },
                  ].map((member, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">{member.name}</span>
                        <div className="text-right">
                          <span className="text-sm font-medium text-foreground">
                            {member.revenue.toLocaleString("ru-RU")}₽
                          </span>
                          <p className="text-xs text-muted-foreground">{member.deals} сделок</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Конверсия</span>
                          <span className="text-foreground">{member.conversion}%</span>
                        </div>
                        <Progress value={member.conversion} className="h-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {showAddLead && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Добавить нового лида</CardTitle>
              <CardDescription className="text-sm">Введите информацию о потенциальном клиенте</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Имя контакта *</label>
                  <Input
                    value={newLead.name}
                    onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                    placeholder="Иван Иванов"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Компания *</label>
                  <Input
                    value={newLead.company}
                    onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                    placeholder="ООО Компания"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email *</label>
                  <Input
                    type="email"
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    placeholder="contact@company.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Телефон</label>
                  <Input
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    placeholder="+7 (999) 123-45-67"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Потенциальная сумма</label>
                  <Input
                    type="number"
                    value={newLead.value}
                    onChange={(e) => setNewLead({ ...newLead, value: e.target.value })}
                    placeholder="100000"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Источник</label>
                  <Select value={newLead.source} onValueChange={(value) => setNewLead({ ...newLead, source: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Сайт">Сайт</SelectItem>
                      <SelectItem value="Реклама">Реклама</SelectItem>
                      <SelectItem value="Рекомендация">Рекомендация</SelectItem>
                      <SelectItem value="Холодный звонок">Холодный звонок</SelectItem>
                      <SelectItem value="Социальные сети">Социальные сети</SelectItem>
                      <SelectItem value="Выставка">Выставка</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Ответственный</label>
                  <Select
                    value={newLead.assignedTo}
                    onValueChange={(value) => setNewLead({ ...newLead, assignedTo: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Михаил Сидоров">Михаил Сидоров</SelectItem>
                      <SelectItem value="Елена Козлова">Елена Козлова</SelectItem>
                      <SelectItem value="Анна Петрова">Анна Петрова</SelectItem>
                      <SelectItem value="Дмитрий Волков">Дмитрий Волков</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Следующее действие</label>
                  <Input
                    value={newLead.nextAction}
                    onChange={(e) => setNewLead({ ...newLead, nextAction: e.target.value })}
                    placeholder="Первичный звонок"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Заметки</label>
                <Input
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  placeholder="Дополнительная информация о лиде"
                  className="mt-1"
                />
              </div>
            </CardContent>
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:space-x-2 p-6 pt-0">
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddLead(false)
                  setNewLead({
                    name: "",
                    company: "",
                    email: "",
                    phone: "",
                    value: "",
                    source: "Сайт",
                    assignedTo: "Михаил Сидоров",
                    nextAction: "",
                    notes: "",
                  })
                }}
                className="w-full sm:w-auto"
              >
                Отмена
              </Button>
              <Button onClick={handleAddLead} className="w-full sm:w-auto">
                Добавить лида
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
