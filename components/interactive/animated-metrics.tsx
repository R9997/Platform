"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, DollarSign, Rocket, Brain, Activity, Sparkles } from "lucide-react"

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
}: AnimatedMetricProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

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

  return (
    <Card
      className={`bg-gradient-to-br ${gradient} border border-${color}/20 hover:shadow-xl hover:shadow-${color}/10 transition-all duration-500 hover:scale-105 group cursor-pointer ${isVisible ? "animate-in slide-in-from-bottom-4 fade-in" : "opacity-0"}`}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
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

        {/* Animated progress bar */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Прогресс к цели</span>
            <span className="text-xs font-medium text-foreground">
              {Math.min(100, Math.floor((displayValue / value) * 120))}%
            </span>
          </div>
          <Progress
            value={Math.min(100, Math.floor((displayValue / value) * 120))}
            className="h-2 transition-all duration-1000"
          />
        </div>
      </CardContent>
    </Card>
  )
}

export function AnimatedMetrics() {
  const metrics = [
    {
      title: "Месячная выручка",
      value: 450000,
      suffix: " ₽",
      trend: 23,
      trendLabel: "к прошлому месяцу",
      icon: DollarSign,
      color: "emerald-500",
      gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
      delay: 0,
    },
    {
      title: "Автоматизированные процессы",
      value: 12,
      trend: 150,
      trendLabel: "Экономия 156ч/месяц",
      icon: Rocket,
      color: "blue-500",
      gradient: "from-blue-500/10 via-blue-500/5 to-transparent",
      delay: 200,
    },
    {
      title: "ИИ эффективность",
      value: 94,
      suffix: "%",
      trendLabel: "Отличный результат",
      icon: Brain,
      color: "purple-500",
      gradient: "from-purple-500/10 via-purple-500/5 to-transparent",
      delay: 400,
    },
    {
      title: "Выполнено задач",
      value: 1247,
      trend: 35,
      trendLabel: "Удовлетворенность 98%",
      icon: Activity,
      color: "orange-500",
      gradient: "from-orange-500/10 via-orange-500/5 to-transparent",
      delay: 600,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <AnimatedMetric key={index} {...metric} />
      ))}
    </div>
  )
}
