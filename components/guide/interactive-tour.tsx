"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  X,
  ArrowRight,
  ArrowLeft,
  Play,
  BookOpen,
  Users,
  FileText,
  Settings,
  BarChart3,
  CheckCircle,
} from "lucide-react"

interface TourStep {
  id: string
  title: string
  description: string
  target: string
  position: "top" | "bottom" | "left" | "right"
  icon: React.ReactNode
}

const tourSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Добро пожаловать в платформу!",
    description:
      "Давайте познакомимся с основными возможностями вашего рабочего пространства. Этот гайд поможет вам быстро освоиться.",
    target: "dashboard-header",
    position: "bottom",
    icon: <Play className="w-4 h-4" />,
  },
  {
    id: "metrics",
    title: "Ключевые метрики",
    description:
      "Здесь отображаются основные показатели вашего бизнеса: активные проекты, выполненные задачи, экономия времени и ROI от ИИ.",
    target: "metrics-section",
    position: "bottom",
    icon: <BarChart3 className="w-4 h-4" />,
  },
  {
    id: "tasks",
    title: "Управление задачами",
    description:
      "Kanban-доска для управления задачами. Создавайте задачи, назначайте исполнителей, отслеживайте прогресс и сроки выполнения.",
    target: "tasks-section",
    position: "top",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  {
    id: "files",
    title: "Файловое хранилище",
    description:
      "Загружайте, организуйте и делитесь файлами. Поддерживается drag & drop, папки, поиск и контроль доступа.",
    target: "files-section",
    position: "top",
    icon: <FileText className="w-4 h-4" />,
  },
  {
    id: "team",
    title: "Управление командой",
    description:
      "Добавляйте участников команды, назначайте роли и права доступа. Отслеживайте активность и продуктивность сотрудников.",
    target: "team-section",
    position: "top",
    icon: <Users className="w-4 h-4" />,
  },
  {
    id: "settings",
    title: "Настройки и роли",
    description: "Настройте права доступа, создайте кастомные роли и управляйте безопасностью платформы.",
    target: "settings-section",
    position: "left",
    icon: <Settings className="w-4 h-4" />,
  },
]

interface InteractiveTourProps {
  isOpen: boolean
  onClose: () => void
}

export function InteractiveTour({ isOpen, onClose }: InteractiveTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      setCurrentStep(0)
      highlightElement(tourSteps[0].target)
    } else {
      setIsVisible(false)
      removeHighlight()
    }
  }, [isOpen])

  const highlightElement = (targetId: string) => {
    removeHighlight()

    const element = document.getElementById(targetId)
    if (element) {
      element.classList.add("tour-highlight")
      element.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }

  const removeHighlight = () => {
    const highlighted = document.querySelectorAll(".tour-highlight")
    highlighted.forEach((el) => el.classList.remove("tour-highlight"))
  }

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      const newStep = currentStep + 1
      setCurrentStep(newStep)
      highlightElement(tourSteps[newStep].target)
    } else {
      completeTour()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1
      setCurrentStep(newStep)
      highlightElement(tourSteps[newStep].target)
    }
  }

  const completeTour = () => {
    removeHighlight()
    onClose()
    localStorage.setItem("dashboard-tour-completed", "true")
  }

  if (!isVisible) return null

  const currentTourStep = tourSteps[currentStep]

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" />

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md">
        <Card className="border-primary/20 shadow-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {currentTourStep.icon}
                <CardTitle className="text-lg">{currentTourStep.title}</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={completeTour} className="h-8 w-8 p-0">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                Шаг {currentStep + 1} из {tourSteps.length}
              </Badge>
              <div className="flex-1 bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">{currentTourStep.description}</p>

            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2 bg-transparent"
              >
                <ArrowLeft className="w-4 h-4" />
                Назад
              </Button>

              <Button onClick={nextStep} className="flex items-center gap-2">
                {currentStep === tourSteps.length - 1 ? "Завершить" : "Далее"}
                {currentStep < tourSteps.length - 1 && <ArrowRight className="w-4 h-4" />}
              </Button>
            </div>

            <div className="text-center">
              <Button variant="ghost" size="sm" onClick={completeTour} className="text-muted-foreground">
                Пропустить гайд
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx global>{`
        .tour-highlight {
          position: relative;
          z-index: 45;
          border-radius: 8px;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 0 8px rgba(59, 130, 246, 0.2);
          transition: all 0.3s ease;
        }
        
        .tour-highlight::before {
          content: '';
          position: absolute;
          inset: -4px;
          border-radius: 12px;
          background: linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.1), transparent);
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  )
}

export function TourLauncher() {
  const [showTour, setShowTour] = useState(false)
  const [hasCompletedTour, setHasCompletedTour] = useState(false)

  useEffect(() => {
    const completed = localStorage.getItem("dashboard-tour-completed")
    setHasCompletedTour(!!completed)
  }, [])

  const startTour = () => {
    setShowTour(true)
  }

  return (
    <>
      <Button
        onClick={startTour}
        variant={hasCompletedTour ? "outline" : "default"}
        size="sm"
        className="flex items-center gap-2"
      >
        <BookOpen className="w-4 h-4" />
        {hasCompletedTour ? "Повторить гайд" : "Начать гайд"}
      </Button>

      <InteractiveTour isOpen={showTour} onClose={() => setShowTour(false)} />
    </>
  )
}
