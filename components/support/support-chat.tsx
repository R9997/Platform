"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, X, Send, Bot, User, Minimize2, Maximize2, Expand } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export function SupportChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Привет! Я ваш персональный помощник поддержки. Как дела с вашим бизнесом? Чем могу помочь?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Понял вас! Давайте разберем этот вопрос подробнее. Какие конкретно трудности возникли?",
        "Отличный вопрос! Я помогу вам найти решение. Расскажите больше деталей.",
        "Я здесь, чтобы помочь! Это довольно частая ситуация, и у нас есть проверенные способы решения.",
        "Спасибо за обращение! Давайте пошагово разберем вашу задачу и найдем оптимальное решение.",
        "Я вижу, что это важно для вашего бизнеса. Позвольте мне предложить несколько вариантов решения.",
      ]

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponses[Math.floor(Math.random() * botResponses.length)],
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 animate-pulse"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
        <div className="absolute -top-2 -right-2">
          <Badge className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">Онлайн</Badge>
        </div>
      </div>
    )
  }

  return (
    <div className={`fixed z-50 ${isFullscreen ? "inset-0 bg-background/95 backdrop-blur-sm" : "bottom-6 right-6"}`}>
      <Card
        className={`transition-all duration-300 shadow-2xl border-2 border-primary/20 ${
          isFullscreen
            ? "w-full h-full max-w-none rounded-none"
            : isMinimized
              ? "h-16 w-80 sm:w-96"
              : "h-[600px] w-[400px] sm:w-[500px] md:w-[600px] lg:w-[700px]"
        }`}
      >
        <CardHeader className="pb-3 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <CardTitle className="flex items-center justify-between text-base">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot className="h-6 w-6" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <div className="font-semibold text-lg">Поддержка Рефрейм</div>
                <div className="text-sm opacity-90">Всегда рядом с вами</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="h-9 w-9 p-0 hover:bg-white/20"
                title={isFullscreen ? "Выйти из полноэкранного режима" : "Открыть на весь экран"}
              >
                <Expand className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-9 w-9 p-0 hover:bg-white/20"
                title={isMinimized ? "Развернуть" : "Свернуть"}
              >
                {isMinimized ? <Maximize2 className="h-5 w-5" /> : <Minimize2 className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsOpen(false)
                  setIsFullscreen(false)
                }}
                className="h-9 w-9 p-0 hover:bg-white/20"
                title="Закрыть чат"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>

        {!isMinimized && (
          <CardContent className={`p-0 flex flex-col ${isFullscreen ? "h-[calc(100vh-80px)]" : "h-[520px]"}`}>
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "bot" && (
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-5 w-5 text-primary" />
                      </div>
                    )}
                    <div
                      className={`${isFullscreen ? "max-w-[60%]" : "max-w-[80%]"} p-4 rounded-xl text-base leading-relaxed ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground ml-auto rounded-br-md"
                          : "bg-muted text-muted-foreground rounded-bl-md"
                      }`}
                    >
                      {message.text}
                    </div>
                    {message.sender === "user" && (
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <User className="h-5 w-5 text-accent" />
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                    <div className="bg-muted text-muted-foreground p-4 rounded-xl rounded-bl-md text-base">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-current rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-6 border-t border-border bg-background/50">
              <div className="flex gap-3">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Напишите ваш вопрос..."
                  className={`flex-1 text-base ${isFullscreen ? "min-h-[50px]" : "min-h-[44px]"} rounded-xl border-2 focus:border-primary/50`}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className={`${isFullscreen ? "px-6 py-3 h-[50px]" : "px-5 py-2 h-[44px]"} rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70`}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
