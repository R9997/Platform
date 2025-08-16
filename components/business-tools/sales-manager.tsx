"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { TrendingUp, Target, BarChart3, Plus, Settings, Edit, Eye, Trash2, RussianRubleIcon as Ruble, Phone, Mail, Calendar, Search, X, Save, Filter } from 'lucide-react'

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
  const [showEditPipeline, setShowEditPipeline] = useState(false)
  const [showEditMetrics, setShowEditMetrics] = useState(false)
  const [editingStage, setEditingStage] = useState<any>(null)

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

  const [pipelineStages, setPipelineStages] = useState([
    {
      stage: "Лиды",
      count: 156,
      value: 2450000,
      color: "blue",
      width: 100,
      bgClass: "bg-blue-500",
      textClass: "text-blue-600",
    },
    {
      stage: "Квалифицированные",
      count: 89,
      value: 1850000,
      color: "green",
      width: 75,
      bgClass: "bg-green-500",
      textClass: "text-green-600",
    },
    {
      stage: "Предложения",
      count: 45,
      value: 1200000,
      color: "purple",
      width: 60,
      bgClass: "bg-purple-500",
      textClass: "text-purple-600",
    },
    {
      stage: "Переговоры",
      count: 28,
      value: 950000,
      color: "orange",
      width: 45,
      bgClass: "bg-orange-500",
      textClass: "text-orange-600",
    },
    {
      stage: "Закрытые",
      count: 18,
      value: 680000,
      color: "emerald",
      width: 30,
      bgClass: "bg-emerald-500",
      textClass: "text-emerald-600",
    },
  ])

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
      notes: "Требует интеграции с 1С",
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

  const [deals] = useState<Deal[]>([
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

  const handleEditStage = (stage: any) => {
    setEditingStage({ ...stage })
    setShowEditPipeline(true)
  }

  const handleSaveStage = () => {
    if (editingStage) {
      setPipelineStages(pipelineStages.map((stage) => (stage.stage === editingStage.stage ? editingStage : stage)))
      setEditingStage(null)
      setShowEditPipeline(false)
    }
  }

  const handleAddStage = () => {
    const newStage = {
      stage: "Новый этап",
      count: 0,
      value: 0,
      color: "gray",
      width: 10,
      bgClass: "bg-gray-500",
      textClass: "text-gray-600",
    }
    setPipelineStages([...pipelineStages, newStage])
  }

  const handleDeleteStage = (stageToDelete: string) => {
    setPipelineStages(pipelineStages.filter((stage) => stage.stage !== stageToDelete))
  }

  const handleUpdateMetrics = (field: string, value: number) => {
    setSalesMetrics({ ...salesMetrics, [field]: value })
  }

  return (
    <div className="space-y-6 p-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pipeline" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Воронка продаж
          </TabsTrigger>
          <TabsTrigger value="leads" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Лиды
          </TabsTrigger>
          <TabsTrigger value="deals" className="flex items-center gap-2">
            <Ruble className="w-4 h-4" />
            Сделки
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Ключевые метрики</h3>
            <Button variant="outline" size="sm" onClick={() => setShowEditMetrics(true)}>
              <Settings className="w-4 h-4 mr-2" />
              Редактировать
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Общая выручка</p>
                    <div className="flex items-baseline space-x-1">
                      <p className="text-2xl font-bold text-green-600">
                        {(salesMetrics.totalRevenue / 1_000_000).toFixed(1)}М
                      </p>
                      <span className="text-sm text-green-600">₽</span>
                    </div>
                  </div>
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Ruble className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Активные сделки</p>
                    <p className="text-2xl font-bold text-blue-600">47</p>
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
                    <p className="text-sm text-muted-foreground">Конверсия</p>
                    <p className="text-2xl font-bold text-purple-600">{salesMetrics.conversionRate.toFixed(1)}%</p>
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
                    <p className="text-sm text-muted-foreground">Средний чек</p>
                    <div className="flex items-baseline space-x-1">
                      <p className="text-2xl font-bold text-orange-600">
                        {(salesMetrics.avgDealSize / 1000).toFixed(0)}К
                      </p>
                      <span className="text-sm text-orange-600">₽</span>
                    </div>
                  </div>
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/60 backdrop-blur-xl border border-border/50">
            <CardTitle className="flex items-center p-6 pt-6">
              <TrendingUp className="w-5 h-5 mr-2 text-primary" />
              Воронка продаж
            </CardTitle>
            <CardContent>
              <div className="space-y-4">
                {pipelineStages.map((stage, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-foreground">{stage.stage}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditStage(stage)}
                          className="h-6 w-6 p-0"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteStage(stage.stage)}
                          className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">{stage.count} шт.</span>
                        <span className="text-sm font-medium text-foreground">
                          {stage.value.toLocaleString("ru-RU")} ₽
                        </span>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-muted/30 rounded-full h-3">
                        <div
                          className={`${stage.bgClass} h-3 rounded-full transition-all duration-500`}
                          style={{ width: `${stage.width}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm" className="mt-4 bg-transparent" onClick={handleAddStage}>
                <Plus className="w-4 h-4 mr-2" />
                Добавить этап
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Лиды */}
        <TabsContent value="leads" className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex flex-col sm:flex-row gap-2 flex-1 max-w-lg">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Поиск по имени или компании..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Фильтр по статусу" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="new">Новые</SelectItem>
                  <SelectItem value="contacted">Контакт</SelectItem>
                  <SelectItem value="qualified">Квалифицированные</SelectItem>
                  <SelectItem value="proposal">Предложения</SelectItem>
                  <SelectItem value="negotiation">Переговоры</SelectItem>
                  <SelectItem value="closed-won">Закрытые успешно</SelectItem>
                  <SelectItem value="closed-lost">Закрытые неуспешно</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => setShowAddLead(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Добавить лид
            </Button>
          </div>

          <div className="space-y-4">
            {filteredLeads.map((lead) => (
              <Card key={lead.id} className="hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  {editingLead?.id === lead.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label>Имя</Label>
                          <Input
                            value={editingLead.name}
                            onChange={(e) => setEditingLead({ ...editingLead, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Компания</Label>
                          <Input
                            value={editingLead.company}
                            onChange={(e) => setEditingLead({ ...editingLead, company: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Email</Label>
                          <Input
                            value={editingLead.email}
                            onChange={(e) => setEditingLead({ ...editingLead, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Телефон</Label>
                          <Input
                            value={editingLead.phone}
                            onChange={(e) => setEditingLead({ ...editingLead, phone: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label>Потенциал (₽)</Label>
                          <Input
                            type="number"
                            value={editingLead.value}
                            onChange={(e) => setEditingLead({ ...editingLead, value: Number(e.target.value) })}
                          />
                        </div>
                        <div>
                          <Label>Статус</Label>
                          <Select
                            value={editingLead.status}
                            onValueChange={(v) => setEditingLead({ ...editingLead, status: v as any })}
                          >
                            <SelectTrigger>
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
                        <Label>Следующее действие</Label>
                        <Input
                          value={editingLead.nextAction}
                          onChange={(e) => setEditingLead({ ...editingLead, nextAction: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>Заметки</Label>
                        <Input
                          value={editingLead.notes}
                          onChange={(e) => setEditingLead({ ...editingLead, notes: e.target.value })}
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSaveLead}>
                          <Save className="w-4 h-4 mr-1" />
                          Сохранить
                        </Button>
                        <Button variant="outline" onClick={() => setEditingLead(null)}>
                          <X className="w-4 h-4 mr-1" />
                          Отмена
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-semibold">{lead.name}</h3>
                            <Select value={lead.status} onValueChange={(v) => handleStatusChange(lead.id, v as any)}>
                              <SelectTrigger>
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
                            <Badge variant="outline">{lead.probability}%</Badge>
                          </div>
                          <p className="text-muted-foreground">{lead.company}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
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
                              {lead.lastContact}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">{lead.value.toLocaleString("ru-RU")} ₽</p>
                          <p className="text-sm text-muted-foreground">Потенциал</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm">
                            <strong>Действие:</strong> {lead.nextAction}
                          </p>
                          <p className="text-xs text-muted-foreground">Ответственный: {lead.assignedTo}</p>
                          {lead.notes && <p className="text-xs text-muted-foreground mt-1">Заметки: {lead.notes}</p>}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleEditLead(lead)}>
                            <Edit className="w-4 h-4 mr-1" />
                            Ред.
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteLead(lead.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Уд.
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

        {/* Сделки */}
        <TabsContent value="deals" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Активные сделки</h3>
            <Button onClick={() => setShowAddLead(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Добавить сделку
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {deals.map((deal) => (
              <Card key={deal.id}>
                <CardContent className="p-4">
                  <h4 className="font-medium">{deal.title}</h4>
                  <p className="text-sm text-muted-foreground">{deal.client}</p>
                  <p className="text-sm mt-2">
                    Сумма: <strong>{deal.value.toLocaleString()} ₽</strong>
                  </p>
                  <p className="text-sm">
                    Этап: <Badge variant="secondary">{deal.stage}</Badge>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Вероятность: {deal.probability}%</p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" onClick={() => alert(`Редактировать сделку: ${deal.title}`)}>
                      <Edit className="w-4 h-4 mr-1" />
                      Ред.
                    </Button>
                    <Button size="sm" onClick={() => alert(`Открыть сделку: ${deal.title}`)}>
                      <Eye className="w-4 h-4 mr-1" />
                      Открыть
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Диалоги */}
      {showEditPipeline && editingStage && (
        <Dialog open={showEditPipeline} onOpenChange={setShowEditPipeline}>
          <DialogContent className="enhanced-modal">
            <DialogHeader>
              <DialogTitle>Редактировать этап</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Название</Label>
                <Input
                  className="enhanced-input"
                  value={editingStage.stage}
                  onChange={(e) => setEditingStage({ ...editingStage, stage: e.target.value })}
                />
              </div>
              <div>
                <Label>Количество</Label>
                <Input
                  className="enhanced-input"
                  type="number"
                  value={editingStage.count}
                  onChange={(e) => setEditingStage({ ...editingStage, count: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label>Сумма (₽)</Label>
                <Input
                  className="enhanced-input"
                  type="number"
                  value={editingStage.value}
                  onChange={(e) => setEditingStage({ ...editingStage, value: Number(e.target.value) })}
                />
              </div>
              <div>
                <Label>Цвет</Label>
                <Select
                  value={editingStage.color}
                  onValueChange={(v) => {
                    const colorMap = {
                      blue: { bgClass: "bg-blue-500", textClass: "text-blue-600" },
                      green: { bgClass: "bg-green-500", textClass: "text-green-600" },
                      purple: { bgClass: "bg-purple-500", textClass: "text-purple-600" },
                      orange: { bgClass: "bg-orange-500", textClass: "text-orange-600" },
                      emerald: { bgClass: "bg-emerald-500", textClass: "text-emerald-600" },
                      red: { bgClass: "bg-red-500", textClass: "text-red-600" },
                      yellow: { bgClass: "bg-yellow-500", textClass: "text-yellow-600" },
                    }
                    const colorClasses = colorMap[v as keyof typeof colorMap] || colorMap.blue
                    setEditingStage({ ...editingStage, color: v, ...colorClasses })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Синий</SelectItem>
                    <SelectItem value="green">Зеленый</SelectItem>
                    <SelectItem value="purple">Фиолетовый</SelectItem>
                    <SelectItem value="orange">Оранжевый</SelectItem>
                    <SelectItem value="emerald">Изумрудный</SelectItem>
                    <SelectItem value="red">Красный</SelectItem>
                    <SelectItem value="yellow">Желтый</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Ширина (%)</Label>
                <Input
                  className="enhanced-input"
                  type="number"
                  min="0"
                  max="100"
                  value={editingStage.width}
                  onChange={(e) => setEditingStage({ ...editingStage, width: Number(e.target.value) })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSaveStage}>Сохранить</Button>
                <Button variant="outline" onClick={() => setShowEditPipeline(false)}>
                  Отмена
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {showEditMetrics && (
        <Dialog open={showEditMetrics} onOpenChange={setShowEditMetrics}>
          <DialogContent className="enhanced-modal">
            <DialogHeader>
              <DialogTitle>Редактировать метрики</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Общая выручка (₽)</Label>
                <Input
                  className="enhanced-input"
                  type="number"
                  value={salesMetrics.totalRevenue}
                  onChange={(e) => handleUpdateMetrics("totalRevenue", Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Конверсия (%)</Label>
                <Input
                  className="enhanced-input"
                  type="number"
                  step="0.1"
                  value={salesMetrics.conversionRate}
                  onChange={(e) => handleUpdateMetrics("conversionRate", Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Средний чек (₽)</Label>
                <Input
                  className="enhanced-input"
                  type="number"
                  value={salesMetrics.avgDealSize}
                  onChange={(e) => handleUpdateMetrics("avgDealSize", Number(e.target.value))}
                />
              </div>
              <div>
                <Label>В работе (₽)</Label>
                <Input
                  className="enhanced-input"
                  type="number"
                  value={salesMetrics.activePipeline}
                  onChange={(e) => handleUpdateMetrics("activePipeline", Number(e.target.value))}
                />
              </div>
              <div>
                <Label>Всего лидов</Label>
                <Input
                  className="enhanced-input"
                  type="number"
                  value={salesMetrics.totalLeads}
                  onChange={(e) => handleUpdateMetrics("totalLeads", Number(e.target.value))}
                />
              </div>
              <Button onClick={() => setShowEditMetrics(false)} className="w-full">
                Сохранить
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {showAddLead && (
        <Dialog open={showAddLead} onOpenChange={setShowAddLead}>
          <DialogContent className="enhanced-modal max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Добавить лида</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Имя *</Label>
                  <Input
                    className="enhanced-input"
                    value={newLead.name}
                    onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                    placeholder="Иван Иванов"
                  />
                </div>
                <div>
                  <Label>Компания *</Label>
                  <Input
                    className="enhanced-input"
                    value={newLead.company}
                    onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                    placeholder="ООО Компания"
                  />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input
                    className="enhanced-input"
                    type="email"
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    placeholder="email@company.com"
                  />
                </div>
                <div>
                  <Label>Телефон</Label>
                  <Input
                    className="enhanced-input"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                <div>
                  <Label>Потенциал (₽)</Label>
                  <Input
                    className="enhanced-input"
                    type="number"
                    value={newLead.value}
                    onChange={(e) => setNewLead({ ...newLead, value: e.target.value })}
                    placeholder="100000"
                  />
                </div>
                <div>
                  <Label>Источник</Label>
                  <Select value={newLead.source} onValueChange={(v) => setNewLead({ ...newLead, source: v })}>
                    <SelectTrigger>
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
                  <Label>Ответственный</Label>
                  <Select value={newLead.assignedTo} onValueChange={(v) => setNewLead({ ...newLead, assignedTo: v })}>
                    <SelectTrigger>
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
                  <Label>Следующее действие</Label>
                  <Input
                    className="enhanced-input"
                    value={newLead.nextAction}
                    onChange={(e) => setNewLead({ ...newLead, nextAction: e.target.value })}
                    placeholder="Первичный контакт"
                  />
                </div>
              </div>
              <div>
                <Label>Заметки</Label>
                <Input
                  className="enhanced-input"
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  placeholder="Дополнительно..."
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowAddLead(false)}>
                  Отмена
                </Button>
                <Button onClick={handleAddLead}>Добавить</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default SalesManager
