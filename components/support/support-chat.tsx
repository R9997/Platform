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
                className="h-9 w-9 p-0 hover:bg-white/20 rounded-lg"
                title={isFullscreen ? "Выйти из полноэкранного режима" : "Открыть на весь экран"}
              >
                <Expand className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-9 w-9 p-0 hover:bg-white/20 rounded-lg"
                title={isMinimized ? "Развернуть чат" : "Свернуть чат"}
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsOpen(false)
                  setIsFullscreen(false)
                  setIsMinimized(false)
                }}
                className="h-9 w-9 p-0 hover:bg-white/20 rounded-lg"
                title="Закрыть чат"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>

        {!isMinimized && (
          <CardContent className={`p-0 flex flex-col ${isFullscreen ? "h-[calc(100vh-80px)]" : "h-[520px]"}`}>
            <ScrollArea
              className="flex-1 p-4 overflow-y-auto"
              style={{ maxHeight: isFullscreen ? "calc(100vh - 200px)" : "440px" }}
            >
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "bot" && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`${isFullscreen ? "max-w-[70%]" : "max-w-[75%]"} p-3 rounded-lg text-sm leading-relaxed ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground ml-auto rounded-br-sm"
                          : "bg-muted text-muted-foreground rounded-bl-sm"
                      }`}
                    >
                      {message.text}
                    </div>
                    {message.sender === "user" && (
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="h-4 w-4 text-accent" />
                      </div>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="bg-muted text-muted-foreground p-3 rounded-lg rounded-bl-sm text-sm">
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

            <div
              className={`border-t border-border bg-background/95 backdrop-blur-sm flex-shrink-0 ${
                isFullscreen ? "p-6" : "p-3"
              }`}
            >
              <div className="flex gap-3 items-center max-w-4xl mx-auto">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Напишите ваш вопрос..."
                  className={`flex-1 border-2 focus:border-primary/50 ${
                    isFullscreen ? "text-base h-12 rounded-xl" : "text-sm h-10 rounded-lg"
                  }`}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className={`bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 flex-shrink-0 ${
                    isFullscreen ? "h-12 px-6 rounded-xl" : "h-10 px-4 rounded-lg"
                  }`}
                  title="Отправить сообщение"
                >
                  <Send className={isFullscreen ? "h-5 w-5" : "h-4 w-4"} />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
