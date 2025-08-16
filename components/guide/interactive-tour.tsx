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
  Users,
  FileText,
  BarChart3,
  CheckCircle,
  Brain,
  MessageSquare,
  DollarSign,
  Shield,
  Lightbulb,
  Star,
  Award,
} from "lucide-react"

interface TourStep {
  id: string
  title: string
  description: string
  detailedInfo: string
  target: string
  position: "top" | "bottom" | "left" | "right"
  icon: React.ReactNode
  tips?: string[]
  actionRequired?: boolean
  category: "basics" | "advanced" | "expert"
}

const tourSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Добро пожаловать в ИИ-платформу!",
    description: "Это ваше рабочее пространство для управления бизнесом с помощью искусственного интеллекта.",
    detailedInfo:
      "Платформа Рефрейм Бюро объединяет все инструменты для роста бизнеса: от автоматизации процессов до аналитики и управления командой. Каждый элемент интерфейса создан для максимальной эффективности.",
    target: "dashboard-header",
    position: "bottom",
    icon: <Play className="w-4 h-4" />,
    tips: ["Используйте поиск для быстрого доступа к функциям", "Настройте уведомления в правом верхнем углу"],
    category: "basics",
  },
  {
    id: "metrics",
    title: "Интерактивные метрики бизнеса",
    description: "Ключевые показатели вашего бизнеса с возможностью редактирования и отслеживания целей.",
    detailedInfo:
      "Метрики обновляются в реальном времени и показывают: выручку, автоматизированные процессы, эффективность ИИ и выполненные задачи. Наведите курсор на любую карточку для редактирования значений.",
    target: "metrics-section",
    position: "bottom",
    icon: <BarChart3 className="w-4 h-4" />,
    tips: [
      "Кликните на кнопки +/- для быстрого изменения значений",
      "Используйте иконку настроек для детального редактирования",
      "Зеленая полоса показывает прогресс к вашей цели",
    ],
    actionRequired: true,
    category: "basics",
  },
  {
    id: "ai-tools",
    title: "ИИ-инструменты для автоматизации",
    description: "Мощные инструменты искусственного интеллекта для автоматизации бизнес-процессов.",
    detailedInfo:
      "5 основных ИИ-инструментов: генератор контента, анализатор данных, автоматизация процессов, менеджер продаж и финансовый менеджер. Каждый инструмент настраивается под ваши потребности.",
    target: "ai-tools-section",
    position: "top",
    icon: <Brain className="w-4 h-4" />,
    tips: [
      "Начните с генератора контента для создания постов и статей",
      "Анализатор данных поможет найти скрытые паттерны в продажах",
      "ROI каждого инструмента отображается в реальном времени",
    ],
    category: "advanced",
  },
  {
    id: "tasks",
    title: "Kanban-доска задач",
    description: "Полноценная система управления задачами с назначением исполнителей и отслеживанием прогресса.",
    detailedInfo:
      "Создавайте задачи, назначайте исполнителей из команды, устанавливайте приоритеты и сроки. Задачи автоматически перемещаются между статусами: К выполнению → В работе → На проверке → Завершено.",
    target: "tasks-section",
    position: "top",
    icon: <CheckCircle className="w-4 h-4" />,
    tips: [
      "Используйте теги для категоризации задач",
      "Добавляйте комментарии и файлы к задачам",
      "Отслеживайте время выполнения для оптимизации процессов",
    ],
    actionRequired: true,
    category: "advanced",
  },
  {
    id: "files",
    title: "Умное файловое хранилище",
    description: "Централизованное хранение с drag & drop загрузкой, папками и системой прав доступа.",
    detailedInfo:
      "Загружайте файлы перетаскиванием, создавайте папки для организации, настраивайте права доступа (приватный/команда/публичный). Поддерживается предварительный просмотр и поиск по содержимому.",
    target: "files-section",
    position: "top",
    icon: <FileText className="w-4 h-4" />,
    tips: [
      "Перетащите файлы прямо в браузер для загрузки",
      "Используйте теги для быстрого поиска документов",
      "Настройте права доступа для конфиденциальных файлов",
    ],
    category: "basics",
  },
  {
    id: "team",
    title: "Управление командой и ролями",
    description: "Добавляйте сотрудников, назначайте роли и отслеживайте продуктивность команды.",
    detailedInfo:
      "Система ролей включает: Администратор (полный доступ), Менеджер (управление проектами), Сотрудник (выполнение задач). Отслеживайте использование ИИ-инструментов и продуктивность каждого участника.",
    target: "team-section",
    position: "top",
    icon: <Users className="w-4 h-4" />,
    tips: [
      "Создавайте кастомные роли для специфических потребностей",
      "Отслеживайте активность сотрудников в реальном времени",
      "Используйте отчеты по продуктивности для оптимизации работы",
    ],
    category: "advanced",
  },
  {
    id: "sales",
    title: "CRM и управление продажами",
    description: "Полноценная CRM система с воронкой продаж и автоматизацией процессов.",
    detailedInfo:
      "Управляйте лидами, отслеживайте сделки, анализируйте конверсию. ИИ автоматически сегментирует клиентов и предлагает персонализированные предложения для увеличения продаж.",
    target: "sales-section",
    position: "left",
    icon: <DollarSign className="w-4 h-4" />,
    tips: [
      "Настройте автоматические уведомления для важных сделок",
      "Используйте ИИ-анализ для прогнозирования продаж",
      "Интегрируйте с email-маркетингом для nurturing лидов",
    ],
    category: "expert",
  },
  {
    id: "ai-chat",
    title: "ИИ-консультант по бизнесу",
    description: "Персональный ИИ-помощник для консультаций и анализа бизнес-метрик.",
    detailedInfo:
      "ИИ-консультант анализирует ваши данные и дает персональные рекомендации по росту бизнеса. Задавайте вопросы о метриках, стратегии, оптимизации процессов - получайте экспертные советы 24/7.",
    target: "chat-section",
    position: "right",
    icon: <MessageSquare className="w-4 h-4" />,
    tips: [
      "Спрашивайте конкретные вопросы о ваших метриках",
      "Запрашивайте рекомендации по оптимизации процессов",
      "ИИ учитывает контекст вашего бизнеса в ответах",
    ],
    category: "expert",
  },
  {
    id: "roles",
    title: "Система ролей и безопасность",
    description: "Детальная настройка прав доступа и создание кастомных ролей для команды.",
    detailedInfo:
      "9 категорий прав: основные функции, проекты, аналитика, команда, ИИ-инструменты, файлы, задачи, отчеты, администрирование. Создавайте роли под специфические потребности вашего бизнеса.",
    target: "roles-section",
    position: "left",
    icon: <Shield className="w-4 h-4" />,
    tips: [
      "Начните с готовых ролей, затем создавайте кастомные",
      "Регулярно аудируйте права доступа сотрудников",
      "Используйте временные роли для проектной работы",
    ],
    category: "expert",
  },
  {
    id: "completion",
    title: "Поздравляем! Вы готовы к работе",
    description:
      "Теперь вы знаете все основные возможности платформы. Начните с создания первой задачи или загрузки файлов.",
    detailedInfo:
      "Вы изучили все ключевые функции платформы Рефрейм Бюро. Рекомендуем начать с настройки команды, создания первого проекта и активации ИИ-инструментов для вашей отрасли.",
    target: "dashboard-header",
    position: "bottom",
    icon: <Award className="w-4 h-4" />,
    tips: [
      "Используйте поиск для быстрого доступа к функциям",
      "Обращайтесь к ИИ-консультанту за помощью",
      "Изучайте аналитику для принятия решений",
    ],
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
  const [showDetailedInfo, setShowDetailedInfo] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

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
    setCompletedSteps((prev) => new Set([...prev, currentStep]))

    if (currentStep < tourSteps.length - 1) {
      const newStep = currentStep + 1
      setCurrentStep(newStep)
      highlightElement(tourSteps[newStep].target)
      setShowDetailedInfo(false)
    } else {
      completeTour()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1
      setCurrentStep(newStep)
      highlightElement(tourSteps[newStep].target)
      setShowDetailedInfo(false)
    }
  }

  const jumpToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex)
    highlightElement(tourSteps[stepIndex].target)
    setShowDetailedInfo(false)
  }

  const completeTour = () => {
    removeHighlight()
    onClose()
    localStorage.setItem("dashboard-tour-completed", "true")
    localStorage.setItem("dashboard-tour-completion-date", new Date().toISOString())
  }

  if (!isVisible) return null

  const currentTourStep = tourSteps[currentStep]
  const progressPercentage = ((currentStep + 1) / tourSteps.length) * 100

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "basics":
        return "bg-green-500/10 text-green-600 border-green-500/30"
      case "advanced":
        return "bg-blue-500/10 text-blue-600 border-blue-500/30"
      case "expert":
        return "bg-purple-500/10 text-purple-600 border-purple-500/30"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/30"
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
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40" />

      <div className="fixed top-4 left-4 right-4 bottom-4 z-50 flex items-center justify-center p-4">
        <Card className="border-primary/20 shadow-2xl w-full max-w-3xl max-h-full overflow-hidden bg-background/95 backdrop-blur-sm">
          <CardHeader className="pb-4 px-6 pt-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="p-3 bg-primary/10 rounded-xl shrink-0">{currentTourStep.icon}</div>
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-xl lg:text-2xl font-bold leading-tight mb-2">
                    {currentTourStep.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-sm">
                      Шаг {currentStep + 1} из {tourSteps.length}
                    </Badge>
                    <Badge className={`${getCategoryColor(currentTourStep.category)} text-sm`}>
                      {getCategoryLabel(currentTourStep.category)}
                    </Badge>
                    {currentTourStep.actionRequired && (
                      <Badge variant="outline" className="text-orange-600 border-orange-500/30 text-sm">
                        <Star className="w-3 h-3 mr-1" />
                        Попробуйте
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={completeTour} className="h-9 w-9 p-0 shrink-0">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="space-y-3 mt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground font-medium">Прогресс обучения</span>
                <span className="font-semibold text-primary">{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="h-3 bg-muted/50" />
            </div>
          </CardHeader>

          <CardContent className="px-6 pb-6 max-h-[calc(100vh-300px)] overflow-y-auto">
            <div className="space-y-6">
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                <p className="text-foreground leading-relaxed text-base lg:text-lg font-medium">
                  {currentTourStep.description}
                </p>
              </div>

              {!showDetailedInfo ? (
                <Button
                  variant="outline"
                  size="default"
                  onClick={() => setShowDetailedInfo(true)}
                  className="flex items-center gap-2 w-full sm:w-auto"
                >
                  <Lightbulb className="w-4 h-4" />
                  Показать подробную информацию
                </Button>
              ) : (
                <div className="space-y-4 p-6 bg-muted/30 rounded-xl border border-muted/50">
                  <p className="text-muted-foreground leading-relaxed text-base">{currentTourStep.detailedInfo}</p>

                  {currentTourStep.tips && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-foreground flex items-center gap-2 text-base">
                        <Lightbulb className="w-5 h-5 text-primary" />
                        Полезные советы:
                      </h4>
                      <div className="space-y-2 pl-2">
                        {currentTourStep.tips.map((tip, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
                            <span className="text-primary font-bold text-lg leading-none mt-0.5">•</span>
                            <span className="text-sm text-muted-foreground leading-relaxed flex-1">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button variant="ghost" size="sm" onClick={() => setShowDetailedInfo(false)}>
                    Свернуть подробности
                  </Button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-2 py-6 mt-6 border-t border-muted/30">
              <div className="flex items-center gap-1 p-2 bg-muted/20 rounded-full">
                {tourSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => jumpToStep(index)}
                    className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      index === currentStep
                        ? "bg-primary scale-125 shadow-lg shadow-primary/30"
                        : completedSteps.has(index)
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    title={`Шаг ${index + 1}: ${tourSteps[index].title}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 gap-4">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2 min-w-[100px] bg-transparent"
              >
                <ArrowLeft className="w-4 h-4" />
                Назад
              </Button>

              <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={completeTour} className="text-muted-foreground">
                  Пропустить обучение
                </Button>

                <Button onClick={nextStep} className="flex items-center gap-2 min-w-[120px]" size="default">
                  {currentStep === tourSteps.length - 1 ? (
                    <>
                      <Award className="w-4 h-4" />
                      Завершить
                    </>
                  ) : (
                    <>
                      Далее
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
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
          box-shadow: 
            0 0 0 3px rgba(59, 130, 246, 0.8), 
            0 0 0 6px rgba(59, 130, 246, 0.4), 
            0 0 0 12px rgba(59, 130, 246, 0.2),
            0 0 30px rgba(59, 130, 246, 0.6);
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform: scale(1.03);
        }
        
        .tour-highlight::before {
          content: '';
          position: absolute;
          inset: -12px;
          border-radius: 20px;
          background: linear-gradient(45deg, 
            transparent, 
            rgba(59, 130, 246, 0.1), 
            rgba(59, 130, 246, 0.2), 
            rgba(59, 130, 246, 0.1), 
            transparent
          );
          animation: pulse-glow 3s infinite ease-in-out;
          pointer-events: none;
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            opacity: 0.3; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.7; 
            transform: scale(1.08); 
          }
        }
      `}</style>
    </>
  )
}

export function TourLauncher() {
  const [showTour, setShowTour] = useState(false)
  const [hasCompletedTour, setHasCompletedTour] = useState(false)
  const [completionDate, setCompletionDate] = useState<string | null>(null)

  useEffect(() => {
    const completed = localStorage.getItem("dashboard-tour-completed")
    const date = localStorage.getItem("dashboard-tour-completion-date")
    setHasCompletedTour(!!completed)
    setCompletionDate(date)
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
