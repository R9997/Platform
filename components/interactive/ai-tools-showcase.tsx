"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  FileText,
  BarChart3,
  Zap,
  Brain,
  Play,
  Pause,
  Eye,
  Download,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Lightbulb,
} from "lucide-react"

interface AITool {
  id: number
  name: string
  description: string
  icon: React.ElementType
  color: string
  gradient: string
  borderColor: string
  textColor: string
  isRunning: boolean
  usage: number
  monthlyTasks: number
  roi: string
  category: string
  realTimeData: {
    tasksToday: number
    efficiency: number
    status: string
  }
}

export function AIToolsShowcase() {
  const [tools, setTools] = useState<AITool[]>([
    {
      id: 1,
      name: "Генератор контента",
      description: "Создание маркетинговых текстов, статей и постов с помощью ИИ",
      icon: FileText,
      color: "blue-500",
      gradient: "from-blue-500/20 to-blue-600/10",
      borderColor: "border-blue-500/30",
      textColor: "text-blue-600",
      isRunning: true,
      usage: 85,
      monthlyTasks: 234,
      roi: "+340%",
      category: "Маркетинг",
      realTimeData: {
        tasksToday: 15,
        efficiency: 94,
        status: "Генерирует статью...",
      },
    },
    {
      id: 2,
      name: "Анализатор данных",
      description: "Обработка продаж, клиентской базы и выявление трендов",
      icon: BarChart3,
      color: "green-500",
      gradient: "from-green-500/20 to-green-600/10",
      borderColor: "border-green-500/30",
      textColor: "text-green-600",
      isRunning: false,
      usage: 72,
      monthlyTasks: 156,
      roi: "+280%",
      category: "Аналитика",
      realTimeData: {
        tasksToday: 8,
        efficiency: 87,
        status: "Ожидает данных",
      },
    },
    {
      id: 3,
      name: "Автоматизация процессов",
      description: "Автоматизация рутинных задач и workflow оптимизация",
      icon: Zap,
      color: "purple-500",
      gradient: "from-purple-500/20 to-purple-600/10",
      borderColor: "border-purple-500/30",
      textColor: "text-purple-600",
      isRunning: true,
      usage: 91,
      monthlyTasks: 445,
      roi: "+520%",
      category: "Операции",
      realTimeData: {
        tasksToday: 32,
        efficiency: 96,
        status: "Обрабатывает заявки...",
      },
    },
    {
      id: 4,
      name: "Персональный ассистент",
      description: "Планирование, напоминания и управление задачами",
      icon: Brain,
      color: "orange-500",
      gradient: "from-orange-500/20 to-orange-600/10",
      borderColor: "border-orange-500/30",
      textColor: "text-orange-600",
      isRunning: false,
      usage: 67,
      monthlyTasks: 89,
      roi: "+180%",
      category: "Продуктивность",
      realTimeData: {
        tasksToday: 5,
        efficiency: 78,
        status: "Планирует встречи",
      },
    },
  ])

  const [selectedTool, setSelectedTool] = useState<AITool | null>(null)

  // Симуляция реального времени обновления данных
  useEffect(() => {
    const interval = setInterval(() => {
      setTools((prevTools) =>
        prevTools.map((tool) => ({
          ...tool,
          realTimeData: {
            ...tool.realTimeData,
            tasksToday: tool.isRunning
              ? tool.realTimeData.tasksToday + Math.floor(Math.random() * 2)
              : tool.realTimeData.tasksToday,
            efficiency: Math.min(100, tool.realTimeData.efficiency + (Math.random() - 0.5) * 2),
          },
        })),
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const toggleTool = (toolId: number) => {
    setTools((prevTools) =>
      prevTools.map((tool) => (tool.id === toolId ? { ...tool, isRunning: !tool.isRunning } : tool)),
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">ИИ-инструменты в реальном времени</h3>
          <p className="text-muted-foreground">Отслеживайте работу ваших ИИ-помощников</p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className="bg-primary/10 text-primary animate-pulse">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            {tools.filter((t) => t.isRunning).length} активных
          </Badge>
          <Badge variant="outline" className="bg-background/50">
            <Sparkles className="w-3 h-3 mr-1" />
            Live данные
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool, index) => (
          <Card
            key={tool.id}
            className={`bg-gradient-to-br ${tool.gradient} border ${tool.borderColor} hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 hover:scale-[1.02] group cursor-pointer animate-in slide-in-from-bottom-4 fade-in`}
            style={{ animationDelay: `${index * 150}ms` }}
            onClick={() => setSelectedTool(selectedTool?.id === tool.id ? null : tool)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`p-3 bg-background/50 rounded-xl group-hover:bg-background/70 transition-all duration-300 ${tool.isRunning ? "animate-pulse" : ""}`}
                  >
                    <tool.icon
                      className={`h-6 w-6 ${tool.textColor} group-hover:scale-110 transition-transform duration-300`}
                    />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {tool.name}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs mt-1">
                      {tool.category}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {tool.isRunning ? (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600 font-medium">Активен</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <span className="text-xs text-gray-500 font-medium">Остановлен</span>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{tool.description}</p>

              {/* Real-time status */}
              <div className="p-3 bg-background/30 rounded-lg border border-border/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">Статус</span>
                  <div className="flex items-center space-x-1">
                    {tool.isRunning ? (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    ) : (
                      <AlertCircle className="w-3 h-3 text-gray-400" />
                    )}
                    <span className="text-xs font-medium text-foreground">{tool.realTimeData.status}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-foreground">{tool.realTimeData.tasksToday}</p>
                    <p className="text-xs text-muted-foreground">Задач сегодня</p>
                  </div>
                  <div>
                    <p className={`text-lg font-bold ${tool.textColor}`}>{Math.floor(tool.realTimeData.efficiency)}%</p>
                    <p className="text-xs text-muted-foreground">Эффективность</p>
                  </div>
                </div>
              </div>

              {/* Usage progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Использование</span>
                  <span className="text-sm font-medium text-foreground">{tool.usage}%</span>
                </div>
                <Progress value={tool.usage} className="h-2 transition-all duration-1000" />
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center">
                  <p className="text-lg font-bold text-foreground">{tool.monthlyTasks}</p>
                  <p className="text-xs text-muted-foreground">Задач/месяц</p>
                </div>
                <div className="text-center">
                  <p className={`text-lg font-bold ${tool.textColor}`}>{tool.roi}</p>
                  <p className="text-xs text-muted-foreground">ROI</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-border/30">
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="h-8 hover:bg-primary/10 bg-transparent">
                    <Eye className="w-3 h-3 mr-1" />
                    Просмотр
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 hover:bg-primary/10 bg-transparent">
                    <Download className="w-3 h-3 mr-1" />
                    Отчет
                  </Button>
                </div>
                <Button
                  size="sm"
                  className={`${tool.isRunning ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"} text-white transition-all duration-300`}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleTool(tool.id)
                  }}
                >
                  {tool.isRunning ? <Pause className="w-3 h-3 mr-1" /> : <Play className="w-3 h-3 mr-1" />}
                  {tool.isRunning ? "Остановить" : "Запустить"}
                </Button>
              </div>

              {/* Expanded details */}
              {selectedTool?.id === tool.id && (
                <div className="mt-4 p-4 bg-background/50 rounded-lg border border-border/30 animate-in slide-in-from-top-2 fade-in">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2 text-primary" />
                    Детальная информация
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Время работы сегодня:</span>
                      <span className="text-foreground font-medium">
                        {tool.isRunning
                          ? `${Math.floor(Math.random() * 8) + 1}ч ${Math.floor(Math.random() * 60)}м`
                          : "0ч 0м"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Последняя активность:</span>
                      <span className="text-foreground font-medium">
                        {tool.isRunning ? "Сейчас" : `${Math.floor(Math.random() * 60) + 1} мин назад`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Экономия времени:</span>
                      <span className={`font-medium ${tool.textColor}`}>
                        {Math.floor(Math.random() * 20) + 10}ч/неделя
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
