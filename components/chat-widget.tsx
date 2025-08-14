"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Bot, User, X, Settings } from "lucide-react"

interface ChatMessage {
  id: number
  type: "user" | "bot"
  message: string
  timestamp: Date
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [aiProvider, setAiProvider] = useState<"openai" | "gigachat">("openai")
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: "bot",
      message: "Привет! Я ИИ-ассистент Рефрейм Бюро. Как могу помочь вам с внедрением ИИ-инструментов в ваш бизнес?",
      timestamp: new Date(),
    },
  ])

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      type: "user",
      message: message.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentMessage = message.trim()
    setMessage("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentMessage,
          provider: aiProvider,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      const botResponse: ChatMessage = {
        id: messages.length + 2,
        type: "bot",
        message: data.response || "Извините, произошла ошибка. Попробуйте еще раз.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      console.error("Chat API Error:", error)

      const fallbackResponses = [
        "Отличный вопрос! Рефрейм Бюро специализируется на внедрении ИИ-решений для оптимизации бизнес-процессов. Расскажите больше о вашей компании?",
        "Мы поможем вам структурировать процессы и внедрить ИИ-инструменты. Какие задачи в вашем бизнесе занимают больше всего времени?",
        "Наши решения включают разработку ИИ-ботов, диагностику процессов и HR-оценку. Что вас интересует больше всего?",
        "Рефрейм Бюро работает по принципу MVP - сначала создаем минимально жизнеспособное решение, тестируем, а затем масштабируем. Хотите узнать подробнее?",
        "Мы можем помочь автоматизировать рутинные задачи и освободить время вашей команды для более важных дел. Какие процессы хотели бы оптимизировать?",
      ]

      const randomResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]

      const botResponse: ChatMessage = {
        id: messages.length + 2,
        type: "bot",
        message: randomResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg soft-glow transition-all duration-300 hover:scale-110"
        size="icon"
        aria-label={isOpen ? "Закрыть чат" : "Открыть чат"}
      >
        {isOpen ? <X className="h-6 w-6 sm:h-7 sm:w-7" /> : <MessageSquare className="h-6 w-6 sm:h-7 sm:w-7" />}
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-background/98 backdrop-blur-md md:hidden">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b soft-border bg-card/50 backdrop-blur-sm">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent soft-glow flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg soft-text">ИИ Ассистент</h3>
                    <p className="text-xs text-muted-foreground">
                      Провайдер: {aiProvider === "openai" ? "OpenAI" : "GigaChat"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    onClick={() => setAiProvider(aiProvider === "openai" ? "gigachat" : "openai")}
                    variant="ghost"
                    size="icon"
                    className="hover:bg-primary/10 soft-border"
                    aria-label="Сменить ИИ провайдер"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => setIsOpen(false)}
                    variant="ghost"
                    size="icon"
                    className="hover:bg-primary/10"
                    aria-label="Закрыть чат"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`flex items-start space-x-2 max-w-[85%]`}>
                        {msg.type === "bot" && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent soft-glow flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div
                          className={`p-3 rounded-lg ${
                            msg.type === "user"
                              ? "bg-gradient-to-r from-primary to-accent text-primary-foreground soft-glow"
                              : "bg-card/80 text-foreground border soft-border backdrop-blur-sm"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{msg.message}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                        {msg.type === "user" && (
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2 max-w-[85%]">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent soft-glow flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-card/80 text-foreground border soft-border backdrop-blur-sm p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-primary rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-primary rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-4 border-t soft-border bg-card/50 backdrop-blur-sm">
                <div className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Спросите про ИИ-решения..."
                    className="flex-1 bg-background/80 soft-border focus:soft-glow backdrop-blur-sm"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!message.trim() || isLoading}
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground soft-glow"
                    size="icon"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Card className="hidden md:flex fixed bottom-20 sm:bottom-24 right-4 sm:right-6 z-40 w-80 lg:w-96 h-[500px] bg-card/95 backdrop-blur-md border soft-border shadow-2xl flex-col">
            <CardHeader className="pb-3 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <CardTitle className="soft-text flex items-center text-lg">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent soft-glow flex items-center justify-center mr-2">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                  ИИ Ассистент
                </CardTitle>
                <Button
                  onClick={() => setAiProvider(aiProvider === "openai" ? "gigachat" : "openai")}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-primary/10 soft-border"
                  aria-label="Сменить ИИ провайдер"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Провайдер: {aiProvider === "openai" ? "OpenAI GPT" : "GigaChat"}
              </p>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-4 pt-0">
              <ScrollArea className="flex-1 mb-4 pr-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`flex items-start space-x-2 max-w-[85%]`}>
                        {msg.type === "bot" && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent soft-glow flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div
                          className={`p-3 rounded-lg ${
                            msg.type === "user"
                              ? "bg-gradient-to-r from-primary to-accent text-primary-foreground soft-glow"
                              : "bg-card/80 text-foreground border soft-border backdrop-blur-sm"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{msg.message}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                        {msg.type === "user" && (
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2 max-w-[85%]">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent soft-glow flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-card/80 text-foreground border soft-border backdrop-blur-sm p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-primary rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-primary rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="flex space-x-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Спросите про ИИ-решения..."
                  className="flex-1 bg-background/80 soft-border focus:soft-glow backdrop-blur-sm"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isLoading}
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground soft-glow"
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </>
  )
}
