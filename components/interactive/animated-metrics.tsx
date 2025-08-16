"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  TrendingUp,
  DollarSign,
  Users,
  Target,
  BarChart3,
  Activity,
  Sparkles,
  Settings,
  Plus,
  Minus,
  Briefcase,
} from "lucide-react"

interface AnimatedMetricProps {
  title: string
  value: number
  suffix?: string
  prefix?: string
  trend?: number
  trendLabel?: string
  icon: React.ElementType
  colorClass: string
  bgClass: string
  textClass: string
  iconBgClass: string
  trendBgClass: string
  delay?: number
  onUpdate?: (newValue: number) => void
  goal?: number
  isEditable?: boolean
}

function AnimatedMetric({
  title,
  value,
  suffix = "",
  prefix = "",
  trend,
  trendLabel,
  icon: Icon,
  colorClass,
  bgClass,
  textClass,
  iconBgClass,
  trendBgClass,
  delay = 0,
  onUpdate,
  goal = value * 1.2,
  isEditable = true,
}: AnimatedMetricProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const [editGoal, setEditGoal] = useState(goal)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
      const duration = 2000
      const steps = 60
      const increment = value / steps
      let current = 0

      const interval = setInterval(() => {
        current += increment
        if (current >= value) {
          setDisplayValue(value)
          clearInterval(interval)
        } else {
          setDisplayValue(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  useEffect(() => {
    setDisplayValue(value)
    setEditValue(value)
  }, [value])

  const handleQuickUpdate = (increment: number) => {
    const newValue = Math.max(0, value + increment)
    onUpdate?.(newValue)
  }

  const handleSaveEdit = () => {
    onUpdate?.(editValue)
    setShowEditDialog(false)
  }

  const progressPercentage = Math.min(100, Math.floor((displayValue / goal) * 100))

  return (
    <Card
      className={`${bgClass} border ${colorClass}/20 hover:shadow-xl transition-all duration-500 hover:scale-105 group cursor-pointer min-h-[200px] enhanced-card ${isVisible ? "animate-in slide-in-from-bottom-4 fade-in" : "opacity-0"}`}
    >
      <CardContent className="p-4 sm:p-6 h-full flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate pr-2">{title}</p>
              {isEditable && (
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={() => handleQuickUpdate(-Math.floor(value * 0.1))}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Settings className="w-3 h-3" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md mx-4 enhanced-modal">
                      <DialogHeader>
                        <DialogTitle className="text-base sm:text-lg">Редактировать {title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="current-value" className="text-sm">
                            Текущее значение
                          </Label>
                          <Input
                            id="current-value"
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(Number(e.target.value))}
                            className="mt-1 enhanced-input"
                          />
                        </div>
                        <div>
                          <Label htmlFor="goal-value" className="text-sm">
                            Цель
                          </Label>
                          <Input
                            id="goal-value"
                            type="number"
                            value={editGoal}
                            onChange={(e) => setEditGoal(Number(e.target.value))}
                            className="mt-1 enhanced-input"
                          />
                        </div>
                        <Button onClick={handleSaveEdit} className="w-full">
                          Сохранить
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={() => handleQuickUpdate(Math.floor(value * 0.1))}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
            <div className="flex items-baseline space-x-1 flex-wrap">
              <p
                className={`text-xl sm:text-2xl lg:text-3xl font-bold ${textClass} transition-all duration-300 break-all`}
              >
                {prefix}
                {displayValue.toLocaleString()}
                {suffix}
              </p>
              {trend && (
                <div
                  className={`flex items-center text-xs ${textClass} ${trendBgClass} px-2 py-1 rounded-full shrink-0`}
                >
                  <TrendingUp className="w-3 h-3 mr-1" />+{trend}%
                </div>
              )}
            </div>
            {trendLabel && (
              <p className={`text-xs ${textClass} flex items-center flex-wrap`}>
                <Sparkles className="w-3 h-3 mr-1 shrink-0" />
                <span className="break-words">{trendLabel}</span>
              </p>
            )}
          </div>
          <div
            className={`p-2 sm:p-3 ${iconBgClass} rounded-xl group-hover:scale-110 group-hover:rotate-12 shrink-0 ml-2 transition-all duration-300`}
          >
            <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${textClass} transition-transform duration-300`} />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground truncate">Прогресс к цели</span>
            <span className="text-xs font-medium text-foreground shrink-0 ml-2">{progressPercentage}%</span>
          </div>
          <div className="text-xs text-muted-foreground mb-1">
            {displayValue.toLocaleString()}/{goal.toLocaleString()}
          </div>
          <Progress value={progressPercentage} className="h-2 transition-all duration-1000" />
          {progressPercentage >= 100 && (
            <p className="text-xs text-green-600 flex items-center flex-wrap">
              <Sparkles className="w-3 h-3 mr-1 shrink-0" />
              <span>Цель достигнута! 🎉</span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export function AnimatedMetrics() {
  const [metrics, setMetrics] = useState([
    {
      id: "revenue",
      title: "Месячная выручка",
      value: 2450000,
      suffix: " ₽",
      trend: 18,
      trendLabel: "рост к прошлому месяцу",
      icon: DollarSign,
      colorClass: "border-emerald-500",
      bgClass: "bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent",
      textClass: "text-emerald-500",
      iconBgClass: "bg-emerald-500/10 hover:bg-emerald-500/20",
      trendBgClass: "bg-emerald-500/10",
      delay: 0,
      goal: 3000000,
    },
    {
      id: "deals",
      title: "Активные сделки",
      value: 47,
      trend: 25,
      trendLabel: "новых сделок за неделю",
      icon: Briefcase,
      colorClass: "border-blue-500",
      bgClass: "bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent",
      textClass: "text-blue-500",
      iconBgClass: "bg-blue-500/10 hover:bg-blue-500/20",
      trendBgClass: "bg-blue-500/10",
      delay: 200,
      goal: 60,
    },
    {
      id: "conversion",
      title: "Конверсия продаж",
      value: 34,
      suffix: "%",
      trend: 12,
      trendLabel: "улучшение за месяц",
      icon: Target,
      colorClass: "border-purple-500",
      bgClass: "bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent",
      textClass: "text-purple-500",
      iconBgClass: "bg-purple-500/10 hover:bg-purple-500/20",
      trendBgClass: "bg-purple-500/10",
      delay: 400,
      goal: 45,
    },
    {
      id: "team",
      title: "Продуктивность команды",
      value: 87,
      suffix: "%",
      trend: 8,
      trendLabel: "эффективность работы",
      icon: Users,
      colorClass: "border-orange-500",
      bgClass: "bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent",
      textClass: "text-orange-500",
      iconBgClass: "bg-orange-500/10 hover:bg-orange-500/20",
      trendBgClass: "bg-orange-500/10",
      delay: 600,
      goal: 95,
    },
    {
      id: "profit",
      title: "Чистая прибыль",
      value: 890000,
      suffix: " ₽",
      trend: 22,
      trendLabel: "рентабельность 36%",
      icon: BarChart3,
      colorClass: "border-green-500",
      bgClass: "bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent",
      textClass: "text-green-500",
      iconBgClass: "bg-green-500/10 hover:bg-green-500/20",
      trendBgClass: "bg-green-500/10",
      delay: 800,
      goal: 1200000,
    },
    {
      id: "automation",
      title: "Автоматизация ИИ",
      value: 73,
      suffix: "%",
      trend: 15,
      trendLabel: "экономия 240ч/месяц",
      icon: Activity,
      colorClass: "border-indigo-500",
      bgClass: "bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-transparent",
      textClass: "text-indigo-500",
      iconBgClass: "bg-indigo-500/10 hover:bg-indigo-500/20",
      trendBgClass: "bg-indigo-500/10",
      delay: 1000,
      goal: 90,
    },
  ])

  const handleMetricUpdate = (id: string, newValue: number) => {
    setMetrics((prev) =>
      prev.map((metric) =>
        metric.id === id
          ? {
              ...metric,
              value: newValue,
              trend: metric.value > 0 ? Math.floor(((newValue - metric.value) / metric.value) * 100) : 0,
            }
          : metric,
      ),
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">Дашборд бизнес-метрик</h3>
          <p className="text-sm text-muted-foreground">
            Ключевые показатели состояния вашего бизнеса • Наведите курсор для редактирования
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
        {metrics.map((metric) => (
          <AnimatedMetric
            key={metric.id}
            {...metric}
            onUpdate={(newValue) => handleMetricUpdate(metric.id, newValue)}
          />
        ))}
      </div>
    </div>
  )
}
