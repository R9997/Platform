"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import {
  MessageSquare,
  Settings,
  LogOut,
  Send,
  Bot,
  Home,
  BarChart3,
  Zap,
  TrendingUp,
  Clock,
  Target,
  Activity,
  Users,
  FileText,
  Brain,
} from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Area, AreaChart, Bar, BarChart, Pie, PieChart, Cell, ResponsiveContainer, XAxis, YAxis } from "recharts"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [chatMessage, setChatMessage] = useState("")
  const [chatHistory, setChatHistory] = useState([
    { id: 1, type: "bot", message: "Привет! Я ваш ИИ-ассистент от Рефрейм Бюро. Как дела?" },
    { id: 2, type: "user", message: "Привет! Расскажи о ваших инструментах" },
    {
      id: 3,
      type: "bot",
      message:
        "У нас есть множество ИИ-инструментов для автоматизации бизнес-процессов, анализа данных и создания контента. Что вас интересует больше всего?",
    },
  ])

  const activityData = [
    { month: "Янв", requests: 45, efficiency: 78 },
    { month: "Фев", requests: 52, efficiency: 82 },
    { month: "Мар", requests: 48, efficiency: 85 },
    { month: "Апр", requests: 61, efficiency: 88 },
    { month: "Май", requests: 55, efficiency: 90 },
    { month: "Июн", requests: 67, efficiency: 92 },
  ]

  const toolsUsageData = [
    { name: "Генератор контента", value: 35, color: "hsl(var(--chart-1))" },
    { name: "Анализ данных", value: 25, color: "hsl(var(--chart-2))" },
    { name: "Автоматизация", value: 20, color: "hsl(var(--chart-3))" },
    { name: "Чат-бот", value: 20, color: "hsl(var(--chart-4))" },
  ]

  const performanceData = [
    { day: "Пн", tasks: 12, completed: 10 },
    { day: "Вт", tasks: 15, completed: 14 },
    { day: "Ср", tasks: 18, completed: 16 },
    { day: "Чт", tasks: 14, completed: 13 },
    { day: "Пт", tasks: 20, completed: 19 },
    { day: "Сб", tasks: 8, completed: 8 },
    { day: "Вс", tasks: 5, completed: 5 },
  ]

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return

    const newMessage = {
      id: chatHistory.length + 1,
      type: "user" as const,
      message: chatMessage,
    }

    setChatHistory((prev) => [...prev, newMessage])
    setChatMessage("")

    setTimeout(() => {
      const responses = [
        "Отличный вопрос! Наши ИИ-инструменты помогают автоматизировать рутинные задачи и повышать эффективность работы.",
        "Рефрейм Бюро специализируется на создании персонализированных ИИ-решений для вашего бизнеса.",
        "Мы можем помочь с анализом данных, генерацией контента, автоматизацией процессов и многим другим!",
        "Спасибо за интерес к нашим услугам! Наша команда готова обсудить ваши потребности подробнее.",
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const botResponse = {
        id: chatHistory.length + 2,
        type: "bot" as const,
        message: randomResponse,
      }
      setChatHistory((prev) => [...prev, botResponse])
    }, 1000)
  }

  const handleLogout = () => {
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card/80 backdrop-blur-sm border-b border-border soft-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <Home className="h-5 w-5 text-primary" />
                <h1 className="text-xl font-serif font-bold soft-text">Рефрейм Бюро</h1>
              </Link>
              <span className="text-muted-foreground">Личный кабинет</span>
            </div>

            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <span className="text-foreground font-medium">Добро пожаловать, Пользователь</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="soft-border hover:soft-glow transition-all duration-300 bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <Card className="bg-card/50 backdrop-blur-sm border soft-border">
              <CardHeader>
                <CardTitle className="text-foreground font-serif">Навигация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={activeTab === "overview" ? "default" : "ghost"}
                  className={`w-full justify-start transition-all duration-300 ${
                    activeTab === "overview"
                      ? "bg-primary text-primary-foreground soft-glow"
                      : "text-foreground hover:bg-accent/50"
                  }`}
                  onClick={() => setActiveTab("overview")}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Аналитика
                </Button>

                <Button
                  variant={activeTab === "chat" ? "default" : "ghost"}
                  className={`w-full justify-start transition-all duration-300 ${
                    activeTab === "chat"
                      ? "bg-primary text-primary-foreground soft-glow"
                      : "text-foreground hover:bg-accent/50"
                  }`}
                  onClick={() => setActiveTab("chat")}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  ИИ Чат
                </Button>

                <Button
                  variant={activeTab === "settings" ? "default" : "ghost"}
                  className={`w-full justify-start transition-all duration-300 ${
                    activeTab === "settings"
                      ? "bg-primary text-primary-foreground soft-glow"
                      : "text-foreground hover:bg-accent/50"
                  }`}
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Настройки
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border soft-border hover:soft-glow transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Активные проекты</p>
                          <p className="text-3xl font-bold text-primary">5</p>
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +2 за месяц
                          </p>
                        </div>
                        <Target className="h-8 w-8 text-primary/60" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border soft-border-blue hover:soft-glow-blue transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">ИИ запросы</p>
                          <p className="text-3xl font-bold text-accent">127</p>
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <Activity className="w-3 h-3 mr-1" />
                            +15% за неделю
                          </p>
                        </div>
                        <Brain className="h-8 w-8 text-accent/60" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Эффективность</p>
                          <p className="text-3xl font-bold text-green-600">92%</p>
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            +5% за месяц
                          </p>
                        </div>
                        <Zap className="h-8 w-8 text-green-500/60" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Экономия времени</p>
                          <p className="text-3xl font-bold text-orange-600">24ч</p>
                          <p className="text-xs text-muted-foreground flex items-center mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            за неделю
                          </p>
                        </div>
                        <Clock className="h-8 w-8 text-orange-500/60" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  <Card className="bg-card/50 backdrop-blur-sm border soft-border">
                    <CardHeader>
                      <CardTitle className="text-foreground font-serif flex items-center">
                        <Activity className="w-5 h-5 mr-2" />
                        Активность по месяцам
                      </CardTitle>
                      <CardDescription>Запросы к ИИ и эффективность работы</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          requests: {
                            label: "Запросы",
                            color: "hsl(var(--chart-1))",
                          },
                          efficiency: {
                            label: "Эффективность %",
                            color: "hsl(var(--chart-2))",
                          },
                        }}
                        className="h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={activityData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Area
                              type="monotone"
                              dataKey="requests"
                              stackId="1"
                              stroke="hsl(var(--chart-1))"
                              fill="hsl(var(--chart-1))"
                              fillOpacity={0.6}
                            />
                            <Area
                              type="monotone"
                              dataKey="efficiency"
                              stackId="2"
                              stroke="hsl(var(--chart-2))"
                              fill="hsl(var(--chart-2))"
                              fillOpacity={0.6}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Card className="bg-card/50 backdrop-blur-sm border soft-border">
                    <CardHeader>
                      <CardTitle className="text-foreground font-serif flex items-center">
                        <Zap className="w-5 h-5 mr-2" />
                        Использование инструментов
                      </CardTitle>
                      <CardDescription>Распределение по типам ИИ-решений</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartContainer
                        config={{
                          value: {
                            label: "Использование %",
                          },
                        }}
                        className="h-[300px]"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={toolsUsageData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={100}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {toolsUsageData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend content={<ChartLegendContent />} />
                          </PieChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-card/50 backdrop-blur-sm border soft-border">
                  <CardHeader>
                    <CardTitle className="text-foreground font-serif flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      Производительность за неделю
                    </CardTitle>
                    <CardDescription>Задачи и их выполнение по дням</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        tasks: {
                          label: "Всего задач",
                          color: "hsl(var(--chart-3))",
                        },
                        completed: {
                          label: "Выполнено",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                      className="h-[300px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={performanceData}>
                          <XAxis dataKey="day" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <ChartLegend content={<ChartLegendContent />} />
                          <Bar dataKey="tasks" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="completed" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border soft-border">
                  <CardHeader>
                    <CardTitle className="text-foreground font-serif">Доступные ИИ инструменты</CardTitle>
                    <CardDescription>Ваши активные решения и их использование</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border hover:soft-border hover:soft-glow transition-all duration-300">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-primary font-semibold">Генератор контента</h4>
                            <p className="text-muted-foreground text-sm">Создание текстов и статей</p>
                          </div>
                        </div>
                        <div className="text-right min-w-[120px]">
                          <p className="text-sm font-medium text-foreground">35% использования</p>
                          <Progress value={35} className="w-20 h-2 mt-1" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border hover:soft-border-blue hover:soft-glow-blue transition-all duration-300">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 rounded-lg bg-accent/10">
                            <BarChart3 className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <h4 className="text-accent font-semibold">Анализ данных</h4>
                            <p className="text-muted-foreground text-sm">Обработка и анализ информации</p>
                          </div>
                        </div>
                        <div className="text-right min-w-[120px]">
                          <p className="text-sm font-medium text-foreground">25% использования</p>
                          <Progress value={25} className="w-20 h-2 mt-1" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border hover:soft-border hover:soft-glow transition-all duration-300">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Zap className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="text-primary font-semibold">Автоматизация</h4>
                            <p className="text-muted-foreground text-sm">Автоматизация бизнес-процессов</p>
                          </div>
                        </div>
                        <div className="text-right min-w-[120px]">
                          <p className="text-sm font-medium text-foreground">20% использования</p>
                          <Progress value={20} className="w-20 h-2 mt-1" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border hover:soft-border-blue hover:soft-glow-blue transition-all duration-300">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 rounded-lg bg-accent/10">
                            <Users className="h-5 w-5 text-accent" />
                          </div>
                          <div>
                            <h4 className="text-accent font-semibold">Персонализация</h4>
                            <p className="text-muted-foreground text-sm">Индивидуальные решения</p>
                          </div>
                        </div>
                        <div className="text-right min-w-[120px]">
                          <p className="text-sm font-medium text-foreground">20% использования</p>
                          <Progress value={20} className="w-20 h-2 mt-1" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "chat" && (
              <Card className="bg-card/50 backdrop-blur-sm border soft-border h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="soft-text font-serif flex items-center">
                    <Bot className="w-5 h-5 mr-2" />
                    ИИ Ассистент Рефрейм Бюро
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Задавайте вопросы нашему ИИ-помощнику
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <ScrollArea className="flex-1 mb-4 p-4 bg-background/50 rounded-lg border border-border">
                    <div className="space-y-4">
                      {chatHistory.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[80%] p-3 rounded-lg transition-all duration-300 ${
                              msg.type === "user"
                                ? "bg-primary text-primary-foreground soft-glow"
                                : "bg-card text-foreground border soft-border"
                            }`}
                          >
                            {msg.message}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="flex space-x-2">
                    <Input
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Введите ваш вопрос..."
                      className="bg-background border-border focus:border-primary focus:ring-primary/20"
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground soft-glow"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "settings" && (
              <Card className="bg-card/50 backdrop-blur-sm border soft-border">
                <CardHeader>
                  <CardTitle className="text-foreground font-serif">Настройки аккаунта</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Управление профилем и предпочтениями
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-foreground text-sm font-medium">Имя</label>
                    <Input
                      defaultValue="Пользователь"
                      className="mt-1 bg-background border-border focus:border-primary focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="text-foreground text-sm font-medium">Email</label>
                    <Input
                      defaultValue="user@example.com"
                      className="mt-1 bg-background border-border focus:border-primary focus:ring-primary/20"
                    />
                  </div>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground soft-glow">
                    Сохранить изменения
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
