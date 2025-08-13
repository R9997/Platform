"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { User, MessageSquare, Settings, LogOut, Send, Bot } from "lucide-react"

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

    // Имитация ответа бота
    setTimeout(() => {
      const botResponse = {
        id: chatHistory.length + 2,
        type: "bot" as const,
        message: "Спасибо за ваш вопрос! Наша команда работает над ответом...",
      }
      setChatHistory((prev) => [...prev, botResponse])
    }, 1000)
  }

  const handleLogout = () => {
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-[var(--color-dark-bg)]">
      {/* Header */}
      <header className="bg-[var(--color-dark-surface)] border-b border-[var(--color-dark-border)] neon-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold neon-text">Рефрейм Бюро</h1>
              <span className="text-[var(--color-text-secondary)]">Личный кабинет</span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-[var(--color-text-primary)]">Добро пожаловать, Пользователь</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black bg-transparent"
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
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-[var(--color-dark-surface)] border-[var(--color-dark-border)]">
              <CardHeader>
                <CardTitle className="text-[var(--color-text-primary)]">Навигация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={activeTab === "overview" ? "default" : "ghost"}
                  className={`w-full justify-start ${activeTab === "overview" ? "bg-cyan-500 text-black" : "text-[var(--color-text-primary)] hover:bg-[var(--color-dark-bg)]"}`}
                  onClick={() => setActiveTab("overview")}
                >
                  <User className="w-4 h-4 mr-2" />
                  Обзор
                </Button>

                <Button
                  variant={activeTab === "chat" ? "default" : "ghost"}
                  className={`w-full justify-start ${activeTab === "chat" ? "bg-cyan-500 text-black" : "text-[var(--color-text-primary)] hover:bg-[var(--color-dark-bg)]"}`}
                  onClick={() => setActiveTab("chat")}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  ИИ Чат
                </Button>

                <Button
                  variant={activeTab === "settings" ? "default" : "ghost"}
                  className={`w-full justify-start ${activeTab === "settings" ? "bg-cyan-500 text-black" : "text-[var(--color-text-primary)] hover:bg-[var(--color-dark-bg)]"}`}
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Настройки
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <Card className="bg-[var(--color-dark-surface)] border-[var(--color-dark-border)] neon-border">
                  <CardHeader>
                    <CardTitle className="neon-text">Добро пожаловать в ваш личный кабинет</CardTitle>
                    <CardDescription className="text-[var(--color-text-secondary)]">
                      Управляйте своими ИИ-инструментами и проектами
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-[var(--color-dark-bg)] p-4 rounded-lg border border-cyan-500/30">
                        <h3 className="text-cyan-400 font-semibold">Активные проекты</h3>
                        <p className="text-2xl font-bold text-[var(--color-text-primary)] mt-2">5</p>
                      </div>
                      <div className="bg-[var(--color-dark-bg)] p-4 rounded-lg border border-cyan-500/30">
                        <h3 className="text-cyan-400 font-semibold">ИИ запросы</h3>
                        <p className="text-2xl font-bold text-[var(--color-text-primary)] mt-2">127</p>
                      </div>
                      <div className="bg-[var(--color-dark-bg)] p-4 rounded-lg border border-cyan-500/30">
                        <h3 className="text-cyan-400 font-semibold">Экономия времени</h3>
                        <p className="text-2xl font-bold text-[var(--color-text-primary)] mt-2">24ч</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[var(--color-dark-surface)] border-[var(--color-dark-border)]">
                  <CardHeader>
                    <CardTitle className="text-[var(--color-text-primary)]">Доступные ИИ инструменты</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-[var(--color-dark-bg)] rounded-lg border border-[var(--color-dark-border)] hover:border-cyan-500/50 transition-colors">
                        <h4 className="text-cyan-400 font-semibold">Генератор контента</h4>
                        <p className="text-[var(--color-text-secondary)] text-sm mt-1">Создание текстов и статей</p>
                      </div>
                      <div className="p-4 bg-[var(--color-dark-bg)] rounded-lg border border-[var(--color-dark-border)] hover:border-cyan-500/50 transition-colors">
                        <h4 className="text-cyan-400 font-semibold">Анализ данных</h4>
                        <p className="text-[var(--color-text-secondary)] text-sm mt-1">Обработка и анализ информации</p>
                      </div>
                      <div className="p-4 bg-[var(--color-dark-bg)] rounded-lg border border-[var(--color-dark-border)] hover:border-cyan-500/50 transition-colors">
                        <h4 className="text-cyan-400 font-semibold">Автоматизация</h4>
                        <p className="text-[var(--color-text-secondary)] text-sm mt-1">
                          Автоматизация бизнес-процессов
                        </p>
                      </div>
                      <div className="p-4 bg-[var(--color-dark-bg)] rounded-lg border border-[var(--color-dark-border)] hover:border-cyan-500/50 transition-colors">
                        <h4 className="text-cyan-400 font-semibold">Персонализация</h4>
                        <p className="text-[var(--color-text-secondary)] text-sm mt-1">Индивидуальные решения</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "chat" && (
              <Card className="bg-[var(--color-dark-surface)] border-[var(--color-dark-border)] neon-border h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="neon-text flex items-center">
                    <Bot className="w-5 h-5 mr-2" />
                    ИИ Ассистент Рефрейм Бюро
                  </CardTitle>
                  <CardDescription className="text-[var(--color-text-secondary)]">
                    Задавайте вопросы нашему ИИ-помощнику
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <ScrollArea className="flex-1 mb-4 p-4 bg-[var(--color-dark-bg)] rounded-lg border border-[var(--color-dark-border)]">
                    <div className="space-y-4">
                      {chatHistory.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              msg.type === "user"
                                ? "bg-cyan-500 text-black"
                                : "bg-[var(--color-dark-surface)] text-[var(--color-text-primary)] border border-[var(--color-dark-border)]"
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
                      className="bg-[var(--color-dark-bg)] border-[var(--color-dark-border)] text-[var(--color-text-primary)] focus:border-cyan-500"
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage} className="bg-cyan-500 hover:bg-cyan-600 text-black">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "settings" && (
              <Card className="bg-[var(--color-dark-surface)] border-[var(--color-dark-border)]">
                <CardHeader>
                  <CardTitle className="text-[var(--color-text-primary)]">Настройки аккаунта</CardTitle>
                  <CardDescription className="text-[var(--color-text-secondary)]">
                    Управление профилем и предпочтениями
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-[var(--color-text-primary)] text-sm font-medium">Имя</label>
                    <Input
                      defaultValue="Пользователь"
                      className="mt-1 bg-[var(--color-dark-bg)] border-[var(--color-dark-border)] text-[var(--color-text-primary)]"
                    />
                  </div>
                  <div>
                    <label className="text-[var(--color-text-primary)] text-sm font-medium">Email</label>
                    <Input
                      defaultValue="user@example.com"
                      className="mt-1 bg-[var(--color-dark-bg)] border-[var(--color-dark-border)] text-[var(--color-text-primary)]"
                    />
                  </div>
                  <Button className="bg-cyan-500 hover:bg-cyan-600 text-black">Сохранить изменения</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
