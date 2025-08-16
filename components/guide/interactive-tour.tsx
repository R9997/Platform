"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  X,
  ArrowRight,
  ArrowLeft,
  Play,
  BookOpen,
  BarChart3,
  CheckCircle,
  Brain,
  Lightbulb,
  Star,
  Award,
  ChevronDown,
  ChevronUp,
} from "lucide-react"

interface TourStep {
  id: string
  title: string
  description: string
  detailedInfo: string
  target: string
  icon: React.ReactNode
  tips?: string[]
  category: "basics" | "advanced" | "expert"
}

const tourSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Добро пожаловать в ИИ-платформу",
    description: "Ваше рабочее пространство для управления бизнесом с помощью искусственного интеллекта.",
    detailedInfo:
      "Платформа Рефрейм Бюро объединяет все инструменты для роста бизнеса: автоматизацию, аналитику и управление командой.",
    target: "dashboard-header",
    icon: <Play className="w-5 h-5" />,
    tips: ["Используйте поиск для быстрого доступа", "Настройте уведомления в правом углу"],
    category: "basics",
  },
  {
    id: "metrics",
    title: "Интерактивные метрики бизнеса",
    description: "Ключевые показатели вашего бизнеса с возможностью редактирования и отслеживания целей.",
    detailedInfo:
      "Метрики обновляются в реальном времени: выручка, автоматизация, эффективность ИИ. Кликайте на карточки для редактирования.",
    target: "metrics-section",
    icon: <BarChart3 className="w-5 h-5" />,
    tips: ["Используйте кнопки +/- для быстрого изменения", "Зеленая полоса показывает прогресс к цели"],
    category: "basics",
  },
  {
    id: "ai-tools",
    title: "ИИ-инструменты для автоматизации",
    description: "Мощные инструменты искусственного интеллекта для автоматизации бизнес-процессов.",
    detailedInfo:
      "5 основных ИИ-инструментов: генератор контента, анализатор данных, автоматизация, продажи и финансы.",
    target: "ai-tools-section",
    icon: <Brain className="w-5 h-5" />,
    tips: ["Начните с генератора контента", "ROI отображается в реальном времени"],
    category: "advanced",
  },
  {
    id: "tasks",
    title: "Управление задачами",
    description: "Kanban-доска для управления задачами с назначением исполнителей и отслеживанием прогресса.",
    detailedInfo:
      "Создавайте задачи, назначайте исполнителей, устанавливайте приоритеты. Автоматическое перемещение между статусами.",
    target: "tasks-section",
    icon: <CheckCircle className="w-5 h-5" />,
    tips: ["Используйте теги для категоризации", "Отслеживайте время выполнения"],
    category: "advanced",
  },
  {
    id: "completion",
    title: "Готово! Начинайте работу",
    description: "Теперь вы знаете основные возможности платформы. Создайте первую задачу или загрузите файлы.",
    detailedInfo: "Рекомендуем начать с настройки команды, создания проекта и активации ИИ-инструментов.",
    target: "dashboard-header",
    icon: <Award className="w-5 h-5" />,
    tips: ["Используйте ИИ-консультанта за помощью", "Изучайте аналитику для принятия решений"],
    category: "basics",
  },
]

interface InteractiveTourProps {
  isOpen: boolean
  onClose: () => void
}

export function InteractiveTour({ isOpen, onClose }: InteractiveTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

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
      setShowDetails(false)
    } else {
      completeTour()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1
      setCurrentStep(newStep)
      highlightElement(tourSteps[newStep].target)
      setShowDetails(false)
    }
  }

  const completeTour = () => {
    removeHighlight()
    onClose()
    localStorage.setItem("dashboard-tour-completed", "true")
  }

  if (!isVisible) return null

  const currentTourStep = tourSteps[currentStep]
  const progressPercentage = ((currentStep + 1) / tourSteps.length) * 100

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "basics":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
      case "advanced":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
      case "expert":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-300"
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "basics":
        return "Основы"
      case "advanced":
        return "Продвинутый"
      case "expert":
        return "Эксперт"
      default:
        return "Общее"
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />

      <div className="fixed inset-4 sm:inset-8 lg:inset-16 z-50">
        <Card className="h-full w-full shadow-2xl bg-background border-2 border-primary/20 overflow-hidden">
          <CardHeader className="border-b bg-muted/30 p-8">
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-start gap-6 flex-1 min-w-0">
                <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20 shrink-0">
                  {currentTourStep.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                    {currentTourStep.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 flex-wrap">
                    <Badge variant="secondary" className="text-base font-medium px-4 py-2">
                      Шаг {currentStep + 1} из {tourSteps.length}
                    </Badge>
                    <Badge className={`${getCategoryColor(currentTourStep.category)} text-base font-medium px-4 py-2`}>
                      {getCategoryLabel(currentTourStep.category)}
                    </Badge>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="lg" onClick={completeTour} className="shrink-0">
                <X className="w-6 h-6" />
              </Button>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-muted-foreground">Прогресс обучения</span>
                <span className="text-2xl font-bold text-primary">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3" />
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-hidden p-0">
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto p-8 lg:p-12">
                <div className="max-w-5xl mx-auto space-y-8">
                  <div className="p-8 bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl border border-primary/10">
                    <p className="text-xl lg:text-2xl leading-relaxed font-medium text-foreground">
                      {currentTourStep.description}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => setShowDetails(!showDetails)}
                      className="w-full text-lg font-medium px-8 py-6 h-auto justify-between"
                    >
                      <span className="flex items-center gap-3">
                        <Lightbulb className="w-6 h-6" />
                        {showDetails ? "Скрыть подробности" : "Показать подробности и советы"}
                      </span>
                      {showDetails ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                    </Button>

                    {showDetails && (
                      <div className="space-y-8 p-8 bg-muted/20 rounded-3xl border">
                        <p className="text-lg lg:text-xl leading-relaxed text-muted-foreground">
                          {currentTourStep.detailedInfo}
                        </p>

                        {currentTourStep.tips && (
                          <div className="space-y-6">
                            <h4 className="text-xl font-bold text-foreground flex items-center gap-3">
                              <Star className="w-6 h-6 text-primary" />
                              Полезные советы:
                            </h4>
                            <div className="space-y-4">
                              {currentTourStep.tips.map((tip, index) => (
                                <div key={index} className="flex gap-4 p-6 bg-background/60 rounded-2xl border">
                                  <span className="text-primary font-bold text-2xl leading-none shrink-0">
                                    {index + 1}.
                                  </span>
                                  <span className="text-lg text-muted-foreground leading-relaxed">{tip}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t bg-muted/20 p-8">
                <div className="max-w-5xl mx-auto">
                  <div className="flex items-center justify-center gap-3 mb-8 lg:hidden">
                    {tourSteps.map((_, index) => (
                      <div
                        key={index}
                        className={`w-4 h-4 rounded-full transition-all duration-300 ${
                          index === currentStep
                            ? "bg-primary scale-125"
                            : index < currentStep
                              ? "bg-green-500"
                              : "bg-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-6">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 0}
                      size="lg"
                      className="flex items-center gap-3 px-8 py-4 text-lg font-medium bg-transparent"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Назад
                    </Button>

                    <div className="hidden lg:flex items-center gap-2">
                      {tourSteps.map((_, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentStep
                              ? "bg-primary scale-150"
                              : index < currentStep
                                ? "bg-green-500"
                                : "bg-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>

                    <Button
                      onClick={nextStep}
                      size="lg"
                      className="flex items-center gap-3 px-8 py-4 text-lg font-medium"
                    >
                      {currentStep === tourSteps.length - 1 ? (
                        <>
                          <Award className="w-5 h-5" />
                          Завершить
                        </>
                      ) : (
                        <>
                          Далее
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx global>{`
        .tour-highlight {
          position: relative;
          z-index: 45;
          border-radius: 16px;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.6);
          transition: all 0.4s ease;
          transform: scale(1.02);
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

  return (
    <>
      <Button
        onClick={() => setShowTour(true)}
        variant={hasCompletedTour ? "outline" : "default"}
        size="sm"
        className="flex items-center gap-2"
      >
        <BookOpen className="w-4 h-4" />
        {hasCompletedTour ? "Повторить гайд" : "Интерактивный гайд"}
        {hasCompletedTour && (
          <Badge variant="secondary" className="ml-1 text-xs">
            <CheckCircle className="w-3 h-3 mr-1" />
            Пройден
          </Badge>
        )}
      </Button>

      <InteractiveTour isOpen={showTour} onClose={() => setShowTour(false)} />
    </>
  )
}
