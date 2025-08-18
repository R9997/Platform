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

export default function MarketingDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showCampaignModal, setShowCampaignModal] = useState(false)
  const [showSegmentModal, setShowSegmentModal] = useState(false)
  const [showAutofunnelModal, setShowAutofunnelModal] = useState(false)

  // Данные воронки
  const funnelData = [
    { stage: "Лиды", count: 1250, percentage: 100, color: "bg-blue-500" },
    { stage: "Квалифицированные", count: 875, percentage: 70, color: "bg-green-500" },
    { stage: "Заинтересованные", count: 525, percentage: 42, color: "bg-yellow-500" },
    { stage: "Покупатели", count: 187, percentage: 15, color: "bg-purple-500" },
  ]

  // Данные кампаний
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

  // Сегменты аудитории
  const segments = [
    { id: 1, name: "VIP клиенты", count: 234, criteria: "Покупки > 100k", growth: "+12%" },
    { id: 2, name: "Новички", count: 1456, criteria: "Регистрация < 30 дней", growth: "+8%" },
    { id: 3, name: "Неактивные", count: 567, criteria: "Без покупок > 90 дней", growth: "-5%" },
  ]

  return (
    <div className="space-y-6">
      {/* Заголовок */}
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

      {/* Основная статистика */}
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

      {/* Воронка клиентов */}
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

      {/* Табы с детальной информацией */}
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
            {/* Последние кампании */}
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

            {/* Топ сегменты */}
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
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Фильтр
                  </Button>
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
                    {campaigns.map((campaign) => (
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
                        <Label>Название сегмента</Label>
                        <Input placeholder="Введите название" />
                      </div>
                      <div>
                        <Label>Критерии сегментации</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите критерий" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="purchase">По покупкам</SelectItem>
                            <SelectItem value="activity">По активности</SelectItem>
                            <SelectItem value="registration">По дате регистрации</SelectItem>
                            <SelectItem value="location">По геолокации</SelectItem>
                            <SelectItem value="source">По источнику</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Описание</Label>
                        <Textarea placeholder="Опишите критерии сегмента" />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowSegmentModal(false)}>
                          Отмена
                        </Button>
                        <Button onClick={() => setShowSegmentModal(false)}>Создать сегмент</Button>
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
                        <Label>Название воронки</Label>
                        <Input placeholder="Введите название" />
                      </div>
                      <div>
                        <Label>Триггер запуска</Label>
                        <Select>
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
                        <Label>Последовательность сообщений</Label>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 p-2 border rounded">
                            <span className="text-sm">1.</span>
                            <Input placeholder="Приветственное сообщение" />
                            <Select>
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="Канал" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="sms">SMS</SelectItem>
                                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex items-center gap-2 p-2 border rounded">
                            <span className="text-sm">2.</span>
                            <Input placeholder="Спецпредложение" />
                            <Select>
                              <SelectTrigger className="w-32">
                                <SelectValue placeholder="Канал" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="email">Email</SelectItem>
                                <SelectItem value="sms">SMS</SelectItem>
                                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button variant="outline" size="sm">
                            + Добавить шаг
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setShowAutofunnelModal(false)}>
                          Отмена
                        </Button>
                        <Button onClick={() => setShowAutofunnelModal(false)}>Создать воронку</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-5 h-5 text-blue-500" />
                      <h3 className="font-medium">Приветствие новичков</h3>
                      <Badge variant="default">Активна</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Автоматическая последовательность для новых пользователей
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>Приветственное письмо (сразу)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>Гайд по продукту (+1 день)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>Спецпредложение (+3 дня)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-muted-foreground">Конверсия: 23%</span>
                      <Button size="sm" variant="outline">
                        Настроить
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Target className="w-5 h-5 text-orange-500" />
                      <h3 className="font-medium">Возврат неактивных</h3>
                      <Badge variant="secondary">Пауза</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Реактивация клиентов без активности 30+ дней</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>Мы скучаем по вам</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        <span>Персональная скидка (+2 дня)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>Последний шанс (+5 дней)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-muted-foreground">Конверсия: 8%</span>
                      <Button size="sm" variant="outline">
                        Настроить
                      </Button>
                    </div>
                  </CardContent>
                </Card>
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

          {/* Лид-скоринг */}
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
