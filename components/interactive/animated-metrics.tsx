"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { TrendingUp, DollarSign, Rocket, Brain, Activity, Sparkles, Settings, Plus, Minus } from "lucide-react"

interface AnimatedMetricProps {
  title: string
  value: number
  suffix?: string
  prefix?: string
  trend?: number
  trendLabel?: string
  icon: React.ElementType
  color: string
  gradient: string
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
  color,
  gradient,
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
      className={`bg-gradient-to-br ${gradient} border border-${color}/20 hover:shadow-xl hover:shadow-${color}/10 transition-all duration-500 hover:scale-105 group cursor-pointer ${isVisible ? "animate-in slide-in-from-bottom-4 fade-in" : "opacity-0"}`}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              {isEditable && (
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
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
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Редактировать {title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="current-value">Текущее значение</Label>
                          <Input
                            id="current-value"
                            type="number"
                            value={editValue}
                            onChange={(e) => setEditValue(Number(e.target.value))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="goal-value">Цель</Label>
                          <Input
                            id="goal-value"
                            type="number"
                            value={editGoal}
                            onChange={(e) => setEditGoal(Number(e.target.value))}
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
            <div className="flex items-baseline space-x-1">
              <p className={`text-3xl font-bold text-${color} transition-all duration-300`}>
                {prefix}
                {displayValue.toLocaleString()}
                {suffix}
              </p>
              {trend && (
                <div className={`flex items-center text-xs text-${color} bg-${color}/10 px-2 py-1 rounded-full`}>
                  <TrendingUp className="w-3 h-3 mr-1" />+{trend}%
                </div>
              )}
            </div>
            {trendLabel && (
              <p className={`text-xs text-${color} flex items-center`}>
                <Sparkles className="w-3 h-3 mr-1" />
                {trendLabel}
              </p>
            )}
          </div>
          <div
            className={`p-3 bg-${color}/10 rounded-xl group-hover:bg-${color}/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}
          >
            <Icon className={`h-8 w-8 text-${color} transition-transform duration-300`} />
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Прогресс к цели</span>
            <span className="text-xs font-medium text-foreground">
              {progressPercentage}% ({displayValue.toLocaleString()}/{goal.toLocaleString()})
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2 transition-all duration-1000" />
          {progressPercentage >= 100 && (
            <p className="text-xs text-green-600 flex items-center">
              <Sparkles className="w-3 h-3 mr-1" />
              Цель достигнута! 🎉
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
      value: 450000,
      suffix: " ₽",
      trend: 23,
      trendLabel: "к прошлому месяцу",
      icon: DollarSign,
      color: "emerald-500",
      gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
      delay: 0,
      goal: 600000,
    },
    {
      id: "processes",
      title: "Автоматизированные процессы",
      value: 12,
      trend: 150,
      trendLabel: "Экономия 156ч/месяц",
      icon: Rocket,
      color: "blue-500",
      gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
      delay: 200,
      goal: 20,
    },
    {
      id: "efficiency",
      title: "ИИ эффективность",
      value: 94,
      suffix: "%",
      trendLabel: "Отличный результат",
      icon: Brain,
      color: "purple-500",
      gradient: "from-purple-500/10 via-purple-500/5 to-transparent",
      delay: 400,
      goal: 98,
    },
    {
      id: "tasks",
      title: "Выполнено задач",
      value: 1247,
      trend: 35,
      trendLabel: "Удовлетворенность 98%",
      icon: Activity,
      color: "orange-500",
      gradient: "from-orange-500/10 via-orange-500/5 to-transparent",
      delay: 600,
      goal: 1500,
    },
  ])

  const handleMetricUpdate = (id: string, newValue: number) => {
    setMetrics((prev) =>
      prev.map((metric) =>
        metric.id === id
          ? {
              ...metric,
              value: newValue,
              trend: Math.floor(((newValue - metric.value) / metric.value) * 100),
            }
          : metric,
      ),
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Ключевые метрики</h3>
          <p className="text-sm text-muted-foreground">Наведите курсор на карточку для редактирования</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
