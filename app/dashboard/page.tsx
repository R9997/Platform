"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, MessageSquare, Settings, LogOut, Send, Bot, Home, BarChart3, Zap, Shield } from "lucide-react"
import Link from "next/link"

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
                  <User className="w-4 h-4 mr-2" />
                  Обзор
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
                <Card className="bg-card/50 backdrop-blur-sm border soft-border">
                  <CardHeader>
                    <CardTitle className="soft-text font-serif text-2xl">
                      Добро пожаловать в ваш личный кабинет
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Управляйте своими ИИ-инструментами и проектами
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-background/50 p-6 rounded-lg border soft-border hover:soft-glow transition-all duration-300">
                        <div className="flex items-center space-x-3">
                          <BarChart3 className="h-8 w-8 soft-text" />
                          <div>
                            <h3 className="text-primary font-semibold">Активные проекты</h3>
                            <p className="text-3xl font-bold text-foreground mt-1">5</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-background/50 p-6 rounded-lg border soft-border-blue hover:soft-glow-blue transition-all duration-300">
                        <div className="flex items-center space-x-3">
                          <Zap className="h-8 w-8 soft-text-blue" />
                          <div>
                            <h3 className="text-accent font-semibold">ИИ запросы</h3>
                            <p className="text-3xl font-bold text-foreground mt-1">127</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-background/50 p-6 rounded-lg border soft-border hover:soft-glow transition-all duration-300">
                        <div className="flex items-center space-x-3">
                          <Shield className="h-8 w-8 soft-text" />
                          <div>
                            <h3 className="text-primary font-semibold">Экономия времени</h3>
                            <p className="text-3xl font-bold text-foreground mt-1">24ч</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border soft-border">
                  <CardHeader>
                    <CardTitle className="text-foreground font-serif">Доступные ИИ инструменты</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-background/50 rounded-lg border border-border hover:soft-border hover:soft-glow transition-all duration-300">
                        <h4 className="text-primary font-semibold">Генератор контента</h4>
                        <p className="text-muted-foreground text-sm mt-1">Создание текстов и статей</p>
                      </div>
                      <div className="p-4 bg-background/50 rounded-lg border border-border hover:soft-border-blue hover:soft-glow-blue transition-all duration-300">
                        <h4 className="text-accent font-semibold">Анализ данных</h4>
                        <p className="text-muted-foreground text-sm mt-1">Обработка и анализ информации</p>
                      </div>
                      <div className="p-4 bg-background/50 rounded-lg border border-border hover:soft-border hover:soft-glow transition-all duration-300">
                        <h4 className="text-primary font-semibold">Автоматизация</h4>
                        <p className="text-muted-foreground text-sm mt-1">Автоматизация бизнес-процессов</p>
                      </div>
                      <div className="p-4 bg-background/50 rounded-lg border border-border hover:soft-border-blue hover:soft-glow-blue transition-all duration-300">
                        <h4 className="text-accent font-semibold">Персонализация</h4>
                        <p className="text-muted-foreground text-sm mt-1">Индивидуальные решения</p>
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
