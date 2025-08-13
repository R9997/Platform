"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageSquare, Send, Bot, User, X } from "lucide-react"

interface ChatMessage {
  id: number
  type: "user" | "bot"
  message: string
  timestamp: Date
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: "bot",
      message: "Привет! Я ИИ-ассистент Рефрейм Бюро. Как могу помочь вам с внедрением ИИ-инструментов в ваш бизнес?",
      timestamp: new Date(),
    },
  ])

  const handleSendMessage = async () => {
    if (!message.trim()) return

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      type: "user",
      message: message.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setMessage("")

    setTimeout(() => {
      const responses = [
        "Отличный вопрос! Рефрейм Бюро специализируется на внедрении ИИ-решений для оптимизации бизнес-процессов. Расскажите больше о вашей компании?",
        "Мы поможем вам структурировать процессы и внедрить ИИ-инструменты. Какие задачи в вашем бизнесе занимают больше всего времени?",
        "Наши решения включают разработку ИИ-ботов, диагностику процессов и HR-оценку. Что вас интересует больше всего?",
        "Рефрейм Бюро работает по принципу MVP - сначала создаем минимально жизнеспособное решение, тестируем, а затем масштабируем. Хотите узнать подробнее?",
      ]

      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const botResponse: ChatMessage = {
        id: messages.length + 2,
        type: "bot",
        message: randomResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-lg neon-glow"
        size="icon"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 z-40 w-96 h-[500px] bg-card/95 backdrop-blur-sm border-cyan-500/20 shadow-xl flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="text-cyan-400 flex items-center text-lg">
              <Bot className="w-5 h-5 mr-2" />
              ИИ Ассистент Рефрейм Бюро
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-4 pt-0">
            <ScrollArea className="flex-1 mb-4 pr-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex items-start space-x-2 max-w-[85%]`}>
                      {msg.type === "bot" && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      )}
                      <div
                        className={`p-3 rounded-lg ${
                          msg.type === "user"
                            ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                            : "bg-muted text-foreground border border-border"
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      {msg.type === "user" && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center flex-shrink-0">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="flex space-x-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Спросите про ИИ-решения для бизнеса..."
                className="flex-1 bg-background/50 border-cyan-500/30 focus:border-cyan-400"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white"
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
