"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  Mail,
  MessageSquare,
  TrendingUp,
  Target,
  Send,
  UserPlus,
  Filter,
  Zap,
  Brain,
  Share2,
  Phone,
} from "lucide-react"

function MarketingDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showCampaignModal, setShowCampaignModal] = useState(false)
  const [showSegmentModal, setShowSegmentModal] = useState(false)
  const [showAutofunnelModal, setShowAutofunnelModal] = useState(false)
  const [showFilterModal, setShowFilterModal] = useState(false)
  const [campaignFilter, setCampaignFilter] = useState({ status: "all", type: "all" })
  const [newSegment, setNewSegment] = useState({ name: "", criteria: "", description: "" })
  const [isCreatingSegment, setIsCreatingSegment] = useState(false)
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [segments, setSegments] = useState([
    { id: 1, name: "VIP клиенты", count: 234, criteria: "Покупки > 100k", growth: "+12%" },
    { id: 2, name: "Новички", count: 1456, criteria: "Регистрация < 30 дней", growth: "+8%" },
    { id: 3, name: "Неактивные", count: 567, criteria: "Без покупок > 90 дней", growth: "-5%" },
  ])

  const [newFunnel, setNewFunnel] = useState({
    name: "",
    trigger: "",
    steps: [{ message: "", channel: "", delay: "0" }],
  })
  const [isCreatingFunnel, setIsCreatingFunnel] = useState(false)
  const [funnels, setFunnels] = useState([
    {
      id: 1,
      name: "Приветствие новичков",
      trigger: "registration",
      status: "Активна",
      conversion: 23,
      steps: [
        { message: "Приветственное письмо", channel: "email", delay: "0" },
        { message: "Гайд по продукту", channel: "email", delay: "1" },
        { message: "Спецпредложение", channel: "whatsapp", delay: "3" },
      ],
    },
    {
      id: 2,
      name: "Возврат неактивных",
      trigger: "inactive",
      status: "Пауза",
      conversion: 8,
      steps: [
        { message: "Мы скучаем по вам", channel: "email", delay: "0" },
        { message: "Персональная скидка", channel: "sms", delay: "2" },
        { message: "Последний шанс", channel: "whatsapp", delay: "5" },
      ],
    },
  ])

  const funnelData = [
    { stage: "Лиды", count: 1250, percentage: 100, color: "bg-blue-500" },
    { stage: "Квалифицированные", count: 875, percentage: 70, color: "bg-green-500" },
    { stage: "Заинтересованные", count: 525, percentage: 42, color: "bg-yellow-500" },
    { stage: "Покупатели", count: 187, percentage: 15, color: "bg-purple-500" },
  ]

  const campaigns = [
    {
      id: 1,
      name: "Летняя распродажа",
      type: "Email",
      status: "Активна",
      sent: 5420,
      opened: 2156,
      clicked: 324,
      converted: 47,
    },
    {
      id: 2,
      name: "Новый продукт",
      type: "WhatsApp",
      status: "Завершена",
      sent: 1200,
      opened: 980,
      clicked: 156,
      converted: 23,
    },
    { id: 3, name: "Реактивация", type: "SMS", status: "Черновик", sent: 0, opened: 0, clicked: 0, converted: 0 },
  ]

  const filteredCampaigns = campaigns.filter((campaign) => {
    const statusMatch = campaignFilter.status === "all" || campaign.status === campaignFilter.status
    const typeMatch = campaignFilter.type === "all" || campaign.type === campaignFilter.type
    return statusMatch && typeMatch
  })

  const handleCreateSegment = async () => {
    if (!newSegment.name.trim()) {
      setNotification({ type: "error", message: "Пожалуйста, введите название сегмента" })
      return
    }

    if (!newSegment.criteria.trim()) {
      setNotification({ type: "error", message: "Пожалуйста, выберите критерии сегментации" })
      return
    }

    if (segments.some((segment) => segment.name.toLowerCase() === newSegment.name.toLowerCase())) {
      setNotification({ type: "error", message: "Сегмент с таким названием уже существует" })
      return
    }

    setIsCreatingSegment(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newSegmentData = {
        id: segments.length + 1,
        name: newSegment.name.trim(),
        count: Math.floor(Math.random() * 1000) + 100,
        criteria: newSegment.criteria,
        growth: `+${Math.floor(Math.random() * 20)}%`,
      }

      setSegments((prevSegments) => [...prevSegments, newSegmentData])
      setNewSegment({ name: "", criteria: "", description: "" })
      setShowSegmentModal(false)
      setNotification({ type: "success", message: `Сегмент "${newSegmentData.name}" успешно создан!` })

      setTimeout(() => setNotification(null), 3000)
    } catch (error) {
      setNotification({ type: "error", message: "Ошибка при создании сегмента. Попробуйте еще раз." })
    } finally {
      setIsCreatingSegment(false)
    }
  }

  const handleAddFunnelStep = () => {
    setNewFunnel({
      ...newFunnel,
      steps: [...newFunnel.steps, { message: "", channel: "", delay: "0" }],
    })
  }

  const handleRemoveFunnelStep = (index: number) => {
    if (newFunnel.steps.length > 1) {
      setNewFunnel({
        ...newFunnel,
        steps: newFunnel.steps.filter((_, i) => i !== index),
      })
    }
  }

  const handleFunnelStepChange = (index: number, field: string, value: string) => {
    const updatedSteps = newFunnel.steps.map((step, i) => (i === index ? { ...step, [field]: value } : step))
    setNewFunnel({ ...newFunnel, steps: updatedSteps })
  }

  const handleCreateFunnel = async () => {
    if (!newFunnel.name.trim()) {
      setNotification({ type: "error", message: "Пожалуйста, введите название воронки" })
      return
    }

    if (!newFunnel.trigger) {
      setNotification({ type: "error", message: "Пожалуйста, выберите триггер запуска" })
      return
    }

    const hasEmptySteps = newFunnel.steps.some((step) => !step.message.trim() || !step.channel)
    if (hasEmptySteps) {
      setNotification({ type: "error", message: "Пожалуйста, заполните все шаги воронки" })
      return
    }

    if (funnels.some((funnel) => funnel.name.toLowerCase() === newFunnel.name.toLowerCase())) {
      setNotification({ type: "error", message: "Воронка с таким названием уже существует" })
      return
    }

    setIsCreatingFunnel(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newFunnelData = {
        id: funnels.length + 1,
        name: newFunnel.name.trim(),
        trigger: newFunnel.trigger,
        status: "Активна",
        conversion: Math.floor(Math.random() * 30) + 10,
        steps: newFunnel.steps,
      }

      setFunnels((prevFunnels) => [...prevFunnels, newFunnelData])
      setNewFunnel({ name: "", trigger: "", steps: [{ message: "", channel: "", delay: "0" }] })
      setShowAutofunnelModal(false)
      setNotification({ type: "success", message: `Воронка "${newFunnelData.name}" успешно создана!` })

      setTimeout(() => setNotification(null), 3000)
    } catch (error) {
      setNotification({ type: "error", message: "Ошибка при создании воронки. Попробуйте еще раз." })
    } finally {
      setIsCreatingFunnel(false)
    }
  }

  return (
    <div className="space-y-6">
      {notification && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            notification.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">📣 Маркетинг и клиенты</h1>
          <p className="text-muted-foreground">Управление маркетинговыми кампаниями и клиентской базой</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showCampaignModal} onOpenChange={setShowCampaignModal}>
            <DialogTrigger asChild>
              <Button>
                <Send className="w-4 h-4 mr-2" />
                Новая кампания
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Создать маркетинговую кампанию</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Название кампании</Label>
                    <Input placeholder="Введите название" />
                  </div>
                  <div>
                    <Label>Тип кампании</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email рассылка</SelectItem>
                        <SelectItem value="sms">SMS рассылка</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="telegram">Telegram</SelectItem>
                        <SelectItem value="social">Соцсети</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Сегмент аудитории</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите сегмент" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все клиенты</SelectItem>
                      <SelectItem value="vip">VIP клиенты</SelectItem>
                      <SelectItem value="new">Новички</SelectItem>
                      <SelectItem value="inactive">Неактивные</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Сообщение</Label>
                  <Textarea placeholder="Введите текст сообщения" rows={4} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowCampaignModal(false)}>
                    Отмена
                  </Button>
                  <Button onClick={() => setShowCampaignModal(false)}>Создать кампанию</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Brain className="w-4 h-4 mr-2" />
            AI-помощник
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Всего лидов</p>
                <p className="text-2xl font-bold">1,250</p>
                <p className="text-xs text-green-600">+12% за месяц</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Активные кампании</p>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-blue-600">2 запланированы</p>
              </div>
              <Send className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Конверсия</p>
                <p className="text-2xl font-bold">15.2%</p>
                <p className="text-xs text-green-600">+2.1% за неделю</p>
              </div>
              <Target className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">ROI кампаний</p>
                <p className="text-2xl font-bold">340%</p>
                <p className="text-xs text-green-600">+45% за месяц</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Воронка клиентов
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {funnelData.map((stage, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-32 text-sm font-medium">{stage.stage}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{stage.count.toLocaleString()}</span>
                    <span className="text-sm text-muted-foreground">{stage.percentage}%</span>
                  </div>
                  <Progress value={stage.percentage} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="campaigns">Кампании</TabsTrigger>
          <TabsTrigger value="segments">Сегменты</TabsTrigger>
          <TabsTrigger value="automation">Автоматизация</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Последние кампании</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.slice(0, 3).map((campaign) => (
                    <div key={campaign.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{campaign.name}</p>
                        <p className="text-sm text-muted-foreground">{campaign.type}</p>
                      </div>
                      <Badge
                        variant={
                          campaign.status === "Активна"
                            ? "default"
                            : campaign.status === "Завершена"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {campaign.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Сегменты аудитории</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {segments.map((segment) => (
                    <div key={segment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{segment.name}</p>
                        <p className="text-sm text-muted-foreground">{segment.criteria}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{segment.count.toLocaleString()}</p>
                        <p className={`text-sm ${segment.growth.startsWith("+") ? "text-green-600" : "text-red-600"}`}>
                          {segment.growth}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Маркетинговые кампании</CardTitle>
                <div className="flex gap-2">
                  <Dialog open={showFilterModal} onOpenChange={setShowFilterModal}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Фильтр
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Фильтр кампаний</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Статус кампании</Label>
                          <Select
                            value={campaignFilter.status}
                            onValueChange={(value) => setCampaignFilter({ ...campaignFilter, status: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Все статусы</SelectItem>
                              <SelectItem value="Активна">Активные</SelectItem>
                              <SelectItem value="Завершена">Завершенные</SelectItem>
                              <SelectItem value="Черновик">Черновики</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Тип кампании</Label>
                          <Select
                            value={campaignFilter.type}
                            onValueChange={(value) => setCampaignFilter({ ...campaignFilter, type: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Все типы</SelectItem>
                              <SelectItem value="Email">Email</SelectItem>
                              <SelectItem value="SMS">SMS</SelectItem>
                              <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                              <SelectItem value="Telegram">Telegram</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setCampaignFilter({ status: "all", type: "all" })
                            }}
                          >
                            Сбросить
                          </Button>
                          <Button onClick={() => setShowFilterModal(false)}>Применить</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button size="sm" onClick={() => setShowCampaignModal(true)}>
                    <Send className="w-4 h-4 mr-2" />
                    Новая кампания
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Кампания</th>
                      <th className="text-left p-2">Тип</th>
                      <th className="text-left p-2">Статус</th>
                      <th className="text-right p-2">Отправлено</th>
                      <th className="text-right p-2">Открыто</th>
                      <th className="text-right p-2">Клики</th>
                      <th className="text-right p-2">Конверсии</th>
                      <th className="text-right p-2">CTR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCampaigns.map((campaign) => (
                      <tr key={campaign.id} className="border-b hover:bg-muted/50">
                        <td className="p-2 font-medium">{campaign.name}</td>
                        <td className="p-2">
                          <Badge variant="outline">{campaign.type}</Badge>
                        </td>
                        <td className="p-2">
                          <Badge
                            variant={
                              campaign.status === "Активна"
                                ? "default"
                                : campaign.status === "Завершена"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {campaign.status}
                          </Badge>
                        </td>
                        <td className="p-2 text-right">{campaign.sent.toLocaleString()}</td>
                        <td className="p-2 text-right">{campaign.opened.toLocaleString()}</td>
                        <td className="p-2 text-right">{campaign.clicked.toLocaleString()}</td>
                        <td className="p-2 text-right">{campaign.converted.toLocaleString()}</td>
                        <td className="p-2 text-right">
                          {campaign.sent > 0 ? ((campaign.clicked / campaign.sent) * 100).toFixed(1) + "%" : "0%"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Сегментация аудитории</CardTitle>
                <Dialog open={showSegmentModal} onOpenChange={setShowSegmentModal}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Новый сегмент
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Создать сегмент аудитории</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Название сегмента *</Label>
                        <Input
                          placeholder="Введите название"
                          value={newSegment.name}
                          onChange={(e) => setNewSegment({ ...newSegment, name: e.target.value })}
                          disabled={isCreatingSegment}
                        />
                      </div>
                      <div>
                        <Label>Критерии сегментации *</Label>
                        <Select
                          value={newSegment.criteria}
                          onValueChange={(value) => setNewSegment({ ...newSegment, criteria: value })}
                          disabled={isCreatingSegment}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите критерий" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="По покупкам">По покупкам</SelectItem>
                            <SelectItem value="По активности">По активности</SelectItem>
                            <SelectItem value="По дате регистрации">По дате регистрации</SelectItem>
                            <SelectItem value="По геолокации">По геолокации</SelectItem>
                            <SelectItem value="По источнику">По источнику</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Описание</Label>
                        <Textarea
                          placeholder="Опишите критерии сегмента"
                          value={newSegment.description}
                          onChange={(e) => setNewSegment({ ...newSegment, description: e.target.value })}
                          disabled={isCreatingSegment}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowSegmentModal(false)
                            setNewSegment({ name: "", criteria: "", description: "" })
                            setNotification(null)
                          }}
                          disabled={isCreatingSegment}
                        >
                          Отмена
                        </Button>
                        <Button
                          onClick={handleCreateSegment}
                          disabled={isCreatingSegment || !newSegment.name.trim() || !newSegment.criteria.trim()}
                        >
                          {isCreatingSegment ? "Создание..." : "Создать сегмент"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {segments.map((segment) => (
                  <Card key={segment.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{segment.name}</h3>
                        <Badge variant="secondary">{segment.count.toLocaleString()}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{segment.criteria}</p>
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-sm font-medium ${segment.growth.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                        >
                          {segment.growth}
                        </span>
                        <Button size="sm" variant="outline">
                          Настроить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Автоматические воронки</CardTitle>
                <Dialog open={showAutofunnelModal} onOpenChange={setShowAutofunnelModal}>
                  <DialogTrigger asChild>
                    <Button>
                      <Zap className="w-4 h-4 mr-2" />
                      Создать воронку
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Создать автоматическую воронку</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label>Название воронки *</Label>
                        <Input
                          placeholder="Введите название"
                          value={newFunnel.name}
                          onChange={(e) => setNewFunnel({ ...newFunnel, name: e.target.value })}
                          disabled={isCreatingFunnel}
                        />
                      </div>
                      <div>
                        <Label>Триггер запуска *</Label>
                        <Select
                          value={newFunnel.trigger}
                          onValueChange={(value) => setNewFunnel({ ...newFunnel, trigger: value })}
                          disabled={isCreatingFunnel}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите триггер" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="registration">Регистрация</SelectItem>
                            <SelectItem value="purchase">Покупка</SelectItem>
                            <SelectItem value="abandon">Брошенная корзина</SelectItem>
                            <SelectItem value="birthday">День рождения</SelectItem>
                            <SelectItem value="inactive">Неактивность</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Последовательность сообщений *</Label>
                        <div className="space-y-2">
                          {newFunnel.steps.map((step, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 border rounded">
                              <span className="text-sm font-medium">{index + 1}.</span>
                              <Input
                                placeholder="Текст сообщения"
                                value={step.message}
                                onChange={(e) => handleFunnelStepChange(index, "message", e.target.value)}
                                disabled={isCreatingFunnel}
                              />
                              <Select
                                value={step.channel}
                                onValueChange={(value) => handleFunnelStepChange(index, "channel", value)}
                                disabled={isCreatingFunnel}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue placeholder="Канал" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="email">Email</SelectItem>
                                  <SelectItem value="sms">SMS</SelectItem>
                                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                                  <SelectItem value="telegram">Telegram</SelectItem>
                                </SelectContent>
                              </Select>
                              <Select
                                value={step.delay}
                                onValueChange={(value) => handleFunnelStepChange(index, "delay", value)}
                                disabled={isCreatingFunnel}
                              >
                                <SelectTrigger className="w-24">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="0">Сразу</SelectItem>
                                  <SelectItem value="1">+1 день</SelectItem>
                                  <SelectItem value="2">+2 дня</SelectItem>
                                  <SelectItem value="3">+3 дня</SelectItem>
                                  <SelectItem value="7">+7 дней</SelectItem>
                                </SelectContent>
                              </Select>
                              {newFunnel.steps.length > 1 && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleRemoveFunnelStep(index)}
                                  disabled={isCreatingFunnel}
                                >
                                  ✕
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button variant="outline" size="sm" onClick={handleAddFunnelStep} disabled={isCreatingFunnel}>
                            + Добавить шаг
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => {
                            setShowAutofunnelModal(false)
                            setNewFunnel({ name: "", trigger: "", steps: [{ message: "", channel: "", delay: "0" }] })
                            setNotification(null)
                          }}
                          disabled={isCreatingFunnel}
                        >
                          Отмена
                        </Button>
                        <Button
                          onClick={handleCreateFunnel}
                          disabled={isCreatingFunnel || !newFunnel.name.trim() || !newFunnel.trigger}
                        >
                          {isCreatingFunnel ? "Создание..." : "Создать воронку"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {funnels.map((funnel) => (
                  <Card key={funnel.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Zap className="w-5 h-5 text-blue-500" />
                        <h3 className="font-medium">{funnel.name}</h3>
                        <Badge variant={funnel.status === "Активна" ? "default" : "secondary"}>{funnel.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Триггер:{" "}
                        {funnel.trigger === "registration"
                          ? "Регистрация"
                          : funnel.trigger === "inactive"
                            ? "Неактивность"
                            : funnel.trigger === "purchase"
                              ? "Покупка"
                              : funnel.trigger}
                      </p>
                      <div className="space-y-2 text-sm">
                        {funnel.steps.map((step, index) => (
                          <div key={index} className="flex items-center gap-2">
                            {step.channel === "email" && <Mail className="w-4 h-4" />}
                            {step.channel === "sms" && <Phone className="w-4 h-4" />}
                            {step.channel === "whatsapp" && <MessageSquare className="w-4 h-4" />}
                            {step.channel === "telegram" && <MessageSquare className="w-4 h-4" />}
                            <span>
                              {step.message} ({step.delay === "0" ? "сразу" : `+${step.delay} дн.`})
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm text-muted-foreground">Конверсия: {funnel.conversion}%</span>
                        <Button size="sm" variant="outline">
                          Настроить
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Эффективность каналов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>Email</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">24.5%</p>
                      <p className="text-sm text-muted-foreground">открываемость</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">78.2%</p>
                      <p className="text-sm text-muted-foreground">открываемость</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>SMS</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">95.1%</p>
                      <p className="text-sm text-muted-foreground">открываемость</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      <span>Соцсети</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">12.8%</p>
                      <p className="text-sm text-muted-foreground">вовлеченность</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>A/B тесты</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Тема письма</h4>
                      <Badge variant="default">Активный</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Вариант A</p>
                        <p>Скидка 20% только сегодня!</p>
                        <p className="text-green-600">CTR: 3.2%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Вариант B</p>
                        <p>Персональное предложение</p>
                        <p className="text-blue-600">CTR: 4.1%</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Время отправки</h4>
                      <Badge variant="secondary">Завершен</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">9:00</p>
                        <p className="text-green-600">Открытий: 18.5%</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">18:00</p>
                        <p className="text-blue-600">Открытий: 24.1% ✓</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Лид-скоринг (горячие клиенты)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Клиент</th>
                      <th className="text-left p-2">Источник</th>
                      <th className="text-center p-2">Активность</th>
                      <th className="text-center p-2">Взаимодействия</th>
                      <th className="text-center p-2">Скор</th>
                      <th className="text-left p-2">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="p-2">
                        <div>
                          <p className="font-medium">Анна Петрова</p>
                          <p className="text-sm text-muted-foreground">anna@example.com</p>
                        </div>
                      </td>
                      <td className="p-2">Google Ads</td>
                      <td className="p-2 text-center">
                        <Badge variant="default">Высокая</Badge>
                      </td>
                      <td className="p-2 text-center">12</td>
                      <td className="p-2 text-center">
                        <Badge variant="default" className="bg-red-500">
                          95
                        </Badge>
                      </td>
                      <td className="p-2">🔥 Горячий лид</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="p-2">
                        <div>
                          <p className="font-medium">Михаил Иванов</p>
                          <p className="text-sm text-muted-foreground">mikhail@example.com</p>
                        </div>
                      </td>
                      <td className="p-2">Соцсети</td>
                      <td className="p-2 text-center">
                        <Badge variant="secondary">Средняя</Badge>
                      </td>
                      <td className="p-2 text-center">7</td>
                      <td className="p-2 text-center">
                        <Badge variant="secondary" className="bg-yellow-500">
                          72
                        </Badge>
                      </td>
                      <td className="p-2">⚡ Теплый лид</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="p-2">
                        <div>
                          <p className="font-medium">Елена Сидорова</p>
                          <p className="text-sm text-muted-foreground">elena@example.com</p>
                        </div>
                      </td>
                      <td className="p-2">Email</td>
                      <td className="p-2 text-center">
                        <Badge variant="outline">Низкая</Badge>
                      </td>
                      <td className="p-2 text-center">3</td>
                      <td className="p-2 text-center">
                        <Badge variant="outline" className="bg-blue-500">
                          45
                        </Badge>
                      </td>
                      <td className="p-2">❄️ Холодный лид</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export { MarketingDashboard }
export default MarketingDashboard
