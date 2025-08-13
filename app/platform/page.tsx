"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User, Home } from "lucide-react"
import Link from "next/link"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function PlatformPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Добро пожаловать на платформу Рефрейм Бюро! Я ваш ИИ-ассистент. Чем могу помочь?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const sendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Симуляция ответа бота
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: "Спасибо за ваш вопрос! Это демо-версия чата. Здесь будет интегрирован наш ИИ-бот для ответов на вопросы о наших услугах и решениях.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)

    setInputMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button
                variant="outline"
                className="border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
              >
                <Home className="w-4 h-4 mr-2" />
                На главную
              </Button>
            </Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 neon-text mb-4">ИИ Платформа</h1>
            <p className="text-xl text-muted-foreground">Интерактивное общение с нашим ИИ-ассистентом</p>
          </div>

          <Card className="bg-card/80 backdrop-blur-sm border-cyan-500/20 h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center">
                <Bot className="w-5 h-5 mr-2" />
                Чат с ИИ-ассистентом
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 pr-4 mb-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === "user"
                            ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                            : "bg-muted border border-cyan-500/20"
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.sender === "bot" && <Bot className="w-4 h-4 mt-0.5 text-cyan-400" />}
                          {message.sender === "user" && <User className="w-4 h-4 mt-0.5" />}
                          <div>
                            <p className="text-sm">{message.text}</p>
                            <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="flex space-x-2">
                <Input
                  placeholder="Введите ваш вопрос..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-background/50 border-cyan-500/20"
                />
                <Button
                  onClick={sendMessage}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Это демо-версия платформы. Здесь будет интегрирован полнофункциональный ИИ-бот для консультаций.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
