"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, MessageSquare, FileText, BarChart3, Zap, Settings, Sparkles, X } from "lucide-react"

export function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const actions = [
    {
      icon: FileText,
      label: "Создать контент",
      color: "bg-blue-500 hover:bg-blue-600",
      action: () => console.log("Create content"),
    },
    {
      icon: BarChart3,
      label: "Анализ данных",
      color: "bg-green-500 hover:bg-green-600",
      action: () => console.log("Analyze data"),
    },
    {
      icon: Zap,
      label: "Автоматизация",
      color: "bg-purple-500 hover:bg-purple-600",
      action: () => console.log("Automation"),
    },
    {
      icon: MessageSquare,
      label: "ИИ-чат",
      color: "bg-orange-500 hover:bg-orange-600",
      action: () => console.log("AI chat"),
    },
    {
      icon: Settings,
      label: "Настройки",
      color: "bg-gray-500 hover:bg-gray-600",
      action: () => console.log("Settings"),
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Action buttons */}
      <div
        className={`flex flex-col-reverse space-y-reverse space-y-3 mb-4 transition-all duration-300 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      >
        {actions.map((action, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 animate-in slide-in-from-right fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="bg-background/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-border/50 shadow-lg">
              <span className="text-sm font-medium text-foreground whitespace-nowrap">{action.label}</span>
            </div>
            <Button
              size="icon"
              className={`${action.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 w-12 h-12`}
              onClick={() => {
                action.action()
                setIsOpen(false)
              }}
            >
              <action.icon className="w-5 h-5" />
            </Button>
          </div>
        ))}
      </div>

      {/* Main FAB */}
      <Button
        size="icon"
        className={`w-14 h-14 rounded-full shadow-xl transition-all duration-300 ${
          isOpen
            ? "bg-red-500 hover:bg-red-600 rotate-45 scale-110"
            : "bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 hover:scale-110"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            <Plus className="w-6 h-6 text-white" />
            <Sparkles className="w-3 h-3 text-white absolute -top-1 -right-1 animate-pulse" />
          </div>
        )}
      </Button>
    </div>
  )
}
