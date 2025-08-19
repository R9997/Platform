"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
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
  ChevronRight,
  Target,
  DollarSign,
  Users,
  TrendingUp,
  FileText,
  Shield,
  Settings,
  Zap,
  Briefcase,
  Globe,
  Database,
  BarChart,
  Scale,
  Megaphone,
  Headphones,
  Bell,
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
    title: "Добро пожаловать в ИИ-платформу Рефрейм Бюро",
    description: "Комплексная система управления бизнесом с искусственным интеллектом для роста и автоматизации.",
    detailedInfo:
      "Платформа объединяет 6 основных блоков: управление бизнесом, финансы и документооборот, кадры и команду, ИИ-инструменты, маркетинг и систему поддержки. Каждый блок содержит специализированные модули для решения конкретных бизнес-задач.",
    target: "dashboard-header",
    icon: <Play className="w-5 h-5" />,
    tips: [
      "Используйте поиск для быстрого доступа к функциям",
      "Настройте уведомления для важных событий",
      "Начните с обзора бизнеса для понимания текущего состояния",
    ],
    category: "basics",
  },
  {
    id: "navigation",
    title: "Навигация по блокам платформы",
    description: "Левая панель содержит 6 тематических блоков с группировкой модулей по функциональности.",
    detailedInfo:
      "Блоки можно сворачивать и разворачивать для удобной навигации. Каждый блок имеет цветовую индикацию и счетчики активных элементов. Система адаптивна для мобильных устройств.",
    target: "navigation-panel",
    icon: <BookOpen className="w-5 h-5" />,
    tips: [
      "Кликайте на заголовки блоков для сворачивания",
      "Используйте поиск для быстрого доступа",
      "Мобильное меню доступно через кнопку в шапке",
    ],
    category: "basics",
  },
  {
    id: "business-overview",
    title: "Обзор бизнеса - Ключевые метрики",
    description: "Интерактивные карточки с основными показателями: выручка, сделки, конверсия, продуктивность команды.",
    detailedInfo:
      "Метрики обновляются в реальном времени и позволяют редактирование целевых значений. Прогресс-бары показывают достижение KPI. Система поддерживает различные валюты и единицы измерения.",
    target: "metrics-section",
    icon: <BarChart3 className="w-5 h-5" />,
    tips: [
      "Кликайте на карточки для редактирования целей",
      "Используйте кнопки +/- для быстрых изменений",
      "Прогресс показывает отклонение от плана",
    ],
    category: "basics",
  },
  {
    id: "strategy-goals",
    title: "Стратегия и цели - OKR/KPI управление",
    description: "Система управления целями с визуализацией прогресса, план-факт анализом и еженедельными отчетами.",
    detailedInfo:
      "Модуль поддерживает создание целей разных уровней (компания, отдел, сотрудник), отслеживание ключевых результатов, автоматические напоминания и детальную аналитику достижений. Интеграция с ИИ для рекомендаций по целям.",
    target: "strategy-section",
    icon: <Target className="w-5 h-5" />,
    tips: [
      "Используйте SMART-критерии для постановки целей",
      "Еженедельные отчеты помогают контролировать прогресс",
      "ИИ-помощник предложит оптимальные цели",
    ],
    category: "advanced",
  },
  {
    id: "project-management",
    title: "Управление проектами и задачами",
    description: "Kanban-доски, Gantt-диаграммы, трекинг времени и управление ресурсами команды.",
    detailedInfo:
      "Полноценная система управления проектами с возможностью создания задач, назначения исполнителей, отслеживания времени и прогресса. Поддержка различных методологий: Agile, Scrum, Waterfall.",
    target: "projects-section",
    icon: <Briefcase className="w-5 h-5" />,
    tips: [
      "Используйте шаблоны проектов для быстрого старта",
      "Gantt-диаграммы помогают планировать ресурсы",
      "Автоматические уведомления о дедлайнах",
    ],
    category: "advanced",
  },
  {
    id: "finance-block",
    title: "Финансы - Управление денежными потоками",
    description: "Учет доходов и расходов, планирование бюджета, финансовая аналитика и прогнозирование.",
    detailedInfo:
      "Модуль включает управление транзакциями, категоризацию расходов, создание финансовых отчетов, планирование бюджета и cash-flow анализ. Интеграция с банками и платежными системами.",
    target: "finance-section",
    icon: <DollarSign className="w-5 h-5" />,
    tips: [
      "Настройте автоматическую категоризацию расходов",
      "Используйте прогнозы для планирования",
      "Регулярно анализируйте отчеты по прибыльности",
    ],
    category: "advanced",
  },
  {
    id: "sales-crm",
    title: "Продажи - CRM и управление сделками",
    description: "Воронка продаж, управление лидами, сегментация клиентов и аналитика конверсий по менеджерам.",
    detailedInfo:
      "CRM-система с полным циклом продаж: от лида до закрытия сделки. Включает сегментацию по менеджерам, автоматизацию процессов, скоринг лидов и детальную аналитику эффективности продаж.",
    target: "sales-section",
    icon: <TrendingUp className="w-5 h-5" />,
    tips: [
      "Используйте лид-скоринг для приоритизации",
      "Автоматизируйте рутинные задачи",
      "Анализируйте конверсию по этапам воронки",
    ],
    category: "advanced",
  },
  {
    id: "edo-system",
    title: "ЭДО - Электронный документооборот",
    description: "Безбумажный документооборот с электронными подписями, согласованием и управлением контрагентами.",
    detailedInfo:
      "Полноценная система ЭДО включает создание и подписание документов, маршруты согласования, управление контрагентами, архив документов и интеграцию с ФНС. Поддержка различных форматов и юридическая значимость.",
    target: "edo-section",
    icon: <FileText className="w-5 h-5" />,
    tips: [
      "Настройте маршруты согласования заранее",
      "Используйте шаблоны для типовых документов",
      "Регулярно обновляйте данные контрагентов",
    ],
    category: "expert",
  },
  {
    id: "legal-compliance",
    title: "Правовой контур - Юридическое сопровождение",
    description: "Управление договорами, отслеживание лицензий, судебные дела и правовая аналитика.",
    detailedInfo:
      "Модуль обеспечивает правовое сопровождение бизнеса: реестр договоров с контролем сроков, управление лицензиями и разрешениями, ведение судебных дел, правовые шаблоны и риск-анализ.",
    target: "legal-section",
    icon: <Scale className="w-5 h-5" />,
    tips: [
      "Настройте уведомления о сроках договоров",
      "Используйте правовые шаблоны",
      "Регулярно обновляйте реестр лицензий",
    ],
    category: "expert",
  },
  {
    id: "hr-management",
    title: "HR и развитие команды",
    description: "Управление персоналом, организационная структура, цели команды и кадровые процессы.",
    detailedInfo:
      "Комплексный HR-модуль включает управление сотрудниками, редактируемую организационную структуру, систему целей для команды, процессы найма и развития, оценку эффективности и планирование карьеры.",
    target: "hr-section",
    icon: <Users className="w-5 h-5" />,
    tips: [
      "Используйте оргструктуру для визуализации команды",
      "Настройте цели для каждого сотрудника",
      "Регулярно проводите оценку эффективности",
    ],
    category: "advanced",
  },
  {
    id: "roles-permissions",
    title: "Роли и права - Система безопасности",
    description: "Управление ролями пользователей, настройка прав доступа и обеспечение информационной безопасности.",
    detailedInfo:
      "Гибкая система ролей и прав с возможностью создания кастомных ролей, настройки детальных разрешений, аудита действий пользователей и обеспечения соответствия требованиям безопасности.",
    target: "roles-section",
    icon: <Shield className="w-5 h-5" />,
    tips: [
      "Следуйте принципу минимальных привилегий",
      "Регулярно аудируйте права доступа",
      "Используйте группы для упрощения управления",
    ],
    category: "expert",
  },
  {
    id: "ai-business-agent",
    title: "ИИ-Агент для бизнеса - Умный консультант",
    description: "Искусственный интеллект для бизнес-консультаций, стратегических рекомендаций и анализа трендов.",
    detailedInfo:
      "ИИ-Агент объединяет функции консультанта и стратега: анализирует данные компании, предлагает рекомендации по развитию, создает дорожные карты, отслеживает рыночные тренды и помогает в принятии решений.",
    target: "ai-agent-section",
    icon: <Brain className="w-5 h-5" />,
    tips: [
      "Задавайте конкретные вопросы для лучших ответов",
      "Используйте дорожную карту для планирования",
      "Регулярно обновляйте данные для точного анализа",
    ],
    category: "advanced",
  },
  {
    id: "ai-tools-suite",
    title: "ИИ-инструменты - Автоматизация процессов",
    description: "Набор ИИ-инструментов: генерация контента, автоматизация процессов и интеллектуальная аналитика.",
    detailedInfo:
      "Комплекс ИИ-инструментов включает генератор контента для маркетинга, автоматизацию бизнес-процессов, интеллектуальную обработку документов, предиктивную аналитику и персонализацию пользовательского опыта.",
    target: "ai-tools-section",
    icon: <Zap className="w-5 h-5" />,
    tips: [
      "Начните с простых процессов автоматизации",
      "Обучайте ИИ на ваших данных",
      "Мониторьте качество результатов",
    ],
    category: "advanced",
  },
  {
    id: "marketing-automation",
    title: "Маркетинг и клиенты - Воронки и кампании",
    description: "Управление маркетинговыми кампаниями, воронками продаж, сегментацией и автоматизацией.",
    detailedInfo:
      "Модуль включает создание и управление воронками клиентов, запуск маркетинговых кампаний, сегментацию аудитории, A/B-тестирование, лид-скоринг, email-маркетинг и аналитику эффективности каналов.",
    target: "marketing-section",
    icon: <Megaphone className="w-5 h-5" />,
    tips: [
      "Используйте A/B-тесты для оптимизации",
      "Сегментируйте аудиторию для персонализации",
      "Отслеживайте ROI по каналам привлечения",
    ],
    category: "expert",
  },
  {
    id: "file-storage",
    title: "Файловое хранилище - Управление документами",
    description: "Централизованное хранение файлов с версионностью, совместным доступом и интеграцией с модулями.",
    detailedInfo:
      "Система управления файлами с поддержкой версий, настройкой прав доступа, совместной работой над документами, автоматическим резервным копированием и интеграцией со всеми модулями платформы.",
    target: "files-section",
    icon: <Database className="w-5 h-5" />,
    tips: [
      "Организуйте файлы в логичную структуру папок",
      "Используйте теги для быстрого поиска",
      "Настройте автоматическое резервное копирование",
    ],
    category: "basics",
  },
  {
    id: "system-settings",
    title: "Настройки системы - Персонализация",
    description: "Комплексные настройки платформы: профиль, уведомления, безопасность, интеграции и внешний вид.",
    detailedInfo:
      "Центр управления всеми настройками платформы включает настройку профиля пользователя, систему уведомлений, параметры безопасности, управление интеграциями, персонализацию интерфейса и управление данными.",
    target: "settings-section",
    icon: <Settings className="w-5 h-5" />,
    tips: [
      "Настройте уведомления по важности",
      "Регулярно обновляйте пароли",
      "Используйте двухфакторную аутентификацию",
    ],
    category: "basics",
  },
  {
    id: "notifications-system",
    title: "Система уведомлений - Будьте в курсе",
    description: "Умная система уведомлений о важных событиях во всех модулях с настройкой приоритетов.",
    detailedInfo:
      "Централизованная система уведомлений отслеживает события во всех модулях: новые задачи, просроченные дедлайны, изменения в проектах, финансовые операции, кадровые изменения и системные события с возможностью настройки важности.",
    target: "notifications-section",
    icon: <Bell className="w-5 h-5" />,
    tips: [
      "Настройте фильтры по типам уведомлений",
      "Используйте группировку по проектам",
      "Настройте email-дублирование для важных событий",
    ],
    category: "basics",
  },
  {
    id: "support-chat",
    title: "Поддержка и помощь - Всегда на связи",
    description: "Чат поддержки с ИИ-помощником, база знаний и система обратной связи.",
    detailedInfo:
      "Система поддержки включает чат с ИИ-помощником для быстрых ответов, полноэкранный режим для детальных консультаций, базу знаний с поиском, систему тикетов и обратную связь для улучшения платформы.",
    target: "support-chat",
    icon: <Headphones className="w-5 h-5" />,
    tips: [
      "Используйте полноэкранный режим для сложных вопросов",
      "Ищите ответы в базе знаний",
      "Оставляйте обратную связь для улучшений",
    ],
    category: "basics",
  },
  {
    id: "integration-ecosystem",
    title: "Экосистема интеграций - Подключайте сервисы",
    description: "Интеграции с внешними сервисами: банки, CRM, email, календари, мессенджеры и API.",
    detailedInfo:
      "Платформа поддерживает интеграции с популярными сервисами: банковские системы для автоматического импорта транзакций, CRM-системы, email-провайдеры, календари, мессенджеры, социальные сети и кастомные API.",
    target: "integrations-section",
    icon: <Globe className="w-5 h-5" />,
    tips: [
      "Начните с интеграции банка для финансов",
      "Подключите календарь для синхронизации задач",
      "Используйте API для кастомных интеграций",
    ],
    category: "expert",
  },
  {
    id: "analytics-reporting",
    title: "Аналитика и отчетность - Принимайте решения на основе данных",
    description: "Комплексная аналитика по всем модулям с интерактивными дашбордами и автоматическими отчетами.",
    detailedInfo:
      "Система аналитики объединяет данные из всех модулей: финансовые показатели, эффективность команды, прогресс проектов, маркетинговые метрики. Поддержка кастомных дашбордов, автоматических отчетов и экспорта данных.",
    target: "analytics-section",
    icon: <BarChart className="w-5 h-5" />,
    tips: [
      "Создавайте кастомные дашборды для разных ролей",
      "Настройте автоматические отчеты",
      "Используйте фильтры для детального анализа",
    ],
    category: "expert",
  },
  {
    id: "completion",
    title: "Готово! Начинайте эффективную работу",
    description:
      "Теперь вы знаете все возможности платформы. Создайте первый проект, настройте команду или запустите ИИ-анализ.",
    detailedInfo:
      "Рекомендуемый план действий: 1) Настройте профиль и команду в HR-модуле, 2) Определите цели в стратегическом планировании, 3) Подключите финансовые интеграции, 4) Активируйте ИИ-инструменты, 5) Создайте первый проект и начните работу.",
    target: "dashboard-header",
    icon: <Award className="w-5 h-5" />,
    tips: [
      "Начните с настройки основных данных компании",
      "Используйте ИИ-Агента для стратегических консультаций",
      "Изучайте аналитику для принятия обоснованных решений",
      "Регулярно обновляйте цели и отслеживайте прогресс",
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

  const handleShowMore = () => {
    setShowDetails(true)
    setTimeout(() => {
      nextStep()
    }, 1000)
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
      <div
        className="fixed z-50 bg-background tour-modal-fullscreen"
        style={{
          position: "fixed !important",
          top: "0 !important",
          left: "0 !important",
          right: "0 !important",
          bottom: "0 !important",
          width: "100vw !important",
          height: "100vh !important",
          maxWidth: "none !important",
          maxHeight: "none !important",
          margin: "0 !important",
          padding: "0 !important",
          zIndex: "9999 !important",
        }}
      >
        <div className="border-b bg-muted/30" style={{ width: "100% !important", maxWidth: "none !important" }}>
          <div
            className="flex items-start justify-between gap-8 p-8"
            style={{ width: "100% !important", maxWidth: "none !important" }}
          >
            <div className="flex items-start gap-8 flex-1 min-w-0">
              <div className="p-6 bg-primary/10 rounded-2xl border border-primary/20 shrink-0">
                <div className="w-12 h-12">{currentTourStep.icon}</div>
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-5xl font-bold mb-6 leading-tight break-words">{currentTourStep.title}</h1>
                <div className="flex items-center gap-6 flex-wrap">
                  <Badge variant="secondary" className="text-xl font-medium px-6 py-3">
                    Шаг {currentStep + 1} из {tourSteps.length}
                  </Badge>
                  <Badge className={`${getCategoryColor(currentTourStep.category)} text-xl font-medium px-6 py-3`}>
                    {getCategoryLabel(currentTourStep.category)}
                  </Badge>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="lg" onClick={completeTour} className="shrink-0 p-4">
              <X className="w-8 h-8" />
            </Button>
          </div>

          <div className="p-8 pt-0 space-y-6" style={{ width: "100% !important", maxWidth: "none !important" }}>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-semibold text-muted-foreground">Прогресс обучения</span>
              <span className="text-4xl font-bold text-primary">{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-6" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto" style={{ width: "100% !important", maxWidth: "none !important" }}>
          <div className="p-8 space-y-12" style={{ width: "100% !important", maxWidth: "none !important" }}>
            <div
              className="p-16 bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl border border-primary/10"
              style={{ width: "100% !important", maxWidth: "none !important" }}
            >
              <p className="text-4xl leading-relaxed font-medium text-foreground break-words">
                {currentTourStep.description}
              </p>
            </div>

            <div className="space-y-8" style={{ width: "100% !important", maxWidth: "none !important" }}>
              <Button
                variant="default"
                size="lg"
                onClick={handleShowMore}
                className="w-full text-2xl font-medium px-12 py-8 h-auto justify-between bg-primary hover:bg-primary/90"
                style={{ width: "100% !important", maxWidth: "none !important" }}
              >
                <span className="flex items-center gap-4">
                  <Lightbulb className="w-8 h-8" />
                  Подробнее и перейти к следующему шагу
                </span>
                <ChevronRight className="w-8 h-8" />
              </Button>

              {showDetails && (
                <div
                  className="space-y-12 p-16 bg-muted/20 rounded-3xl border"
                  style={{ width: "100% !important", maxWidth: "none !important" }}
                >
                  <p className="text-3xl leading-relaxed text-muted-foreground break-words">
                    {currentTourStep.detailedInfo}
                  </p>

                  {currentTourStep.tips && (
                    <div className="space-y-8" style={{ width: "100% !important", maxWidth: "none !important" }}>
                      <h4 className="text-4xl font-bold text-foreground flex items-center gap-4">
                        <Star className="w-8 h-8 text-primary" />
                        Полезные советы:
                      </h4>
                      <div className="space-y-6" style={{ width: "100% !important", maxWidth: "none !important" }}>
                        {currentTourStep.tips.map((tip, index) => (
                          <div
                            key={index}
                            className="flex gap-6 p-10 bg-background/60 rounded-2xl border"
                            style={{ width: "100% !important", maxWidth: "none !important" }}
                          >
                            <span className="text-primary font-bold text-4xl leading-none shrink-0">{index + 1}.</span>
                            <span className="text-2xl text-muted-foreground leading-relaxed break-words flex-1">
                              {tip}
                            </span>
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

        <div className="border-t bg-muted/20" style={{ width: "100% !important", maxWidth: "none !important" }}>
          <div className="p-8" style={{ width: "100% !important", maxWidth: "none !important" }}>
            <div className="flex items-center justify-center gap-3 mb-6 lg:hidden">
              {tourSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-6 h-6 rounded-full transition-all duration-300 ${
                    index === currentStep
                      ? "bg-primary scale-125"
                      : index < currentStep
                        ? "bg-green-500"
                        : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            <div
              className="flex items-center justify-between gap-8"
              style={{ width: "100% !important", maxWidth: "none !important" }}
            >
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                size="lg"
                className="flex items-center gap-3 px-8 py-4 text-2xl font-medium bg-transparent"
              >
                <ArrowLeft className="w-6 h-6" />
                Назад
              </Button>

              <div className="hidden lg:flex items-center gap-4">
                {tourSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-6 h-6 rounded-full transition-all duration-300 ${
                      index === currentStep
                        ? "bg-primary scale-150"
                        : index < currentStep
                          ? "bg-green-500"
                          : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              <Button onClick={nextStep} size="lg" className="flex items-center gap-3 px-8 py-4 text-2xl font-medium">
                {currentStep === tourSteps.length - 1 ? (
                  <>
                    <Award className="w-6 h-6" />
                    Завершить
                  </>
                ) : (
                  <>
                    Далее
                    <ArrowRight className="w-6 h-6" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
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
        
        /* Более агрессивные принудительные стили для полноэкранного режима */
        .tour-modal-fullscreen {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          width: 100vw !important;
          height: 100vh !important;
          max-width: none !important;
          max-height: none !important;
          margin: 0 !important;
          padding: 0 !important;
          z-index: 9999 !important;
        }
        
        /* Переопределение всех возможных ограничений ширины */
        .tour-modal-fullscreen * {
          max-width: none !important;
        }
        
        /* Принудительные стили для Dialog компонентов если они используются */
        [data-radix-dialog-content] {
          width: 100vw !important;
          height: 100vh !important;
          max-width: none !important;
          max-height: none !important;
          margin: 0 !important;
          padding: 0 !important;
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
