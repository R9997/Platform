"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Users,
  FileText,
  CheckSquare,
  Shield,
  MessageSquare,
  Target,
  DollarSign,
  TrendingUp,
  Briefcase,
  Play,
  BookOpen,
  Lightbulb,
  ArrowRight,
  CheckCircle,
  Scale,
  Megaphone,
  Settings,
  Database,
  Brain,
  Zap,
  UserCheck,
} from "lucide-react"

interface FeatureInfo {
  key: string
  title: string
  description: string
  benefits: string[]
  difficulty: "Легко" | "Средне" | "Сложно"
  timeToSetup: string
  icon: any
  category: string
  status: "available" | "premium" | "coming-soon"
  blockName: string
}

export function FeatureGuide() {
  const [showGuide, setShowGuide] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState<FeatureInfo | null>(null)
  const [selectedBlock, setSelectedBlock] = useState<string>("all")

  const features: FeatureInfo[] = [
    // УПРАВЛЕНИЕ БИЗНЕСОМ
    {
      key: "overview",
      title: "Обзор бизнеса",
      description: "Центральная панель с ключевыми метриками и аналитикой вашего бизнеса в реальном времени",
      benefits: [
        "Мгновенный обзор всех показателей",
        "Редактируемые KPI и цели",
        "Цветовая индикация эффективности",
        "Интеграция с другими модулями",
      ],
      difficulty: "Легко",
      timeToSetup: "Готово к использованию",
      icon: Briefcase,
      category: "Аналитика",
      status: "available",
      blockName: "УПРАВЛЕНИЕ БИЗНЕСОМ",
    },
    {
      key: "strategy",
      title: "Стратегия и цели",
      description: "Комплексная система управления OKR/KPI с визуализацией прогресса и еженедельными отчетами",
      benefits: [
        "Система целей разных уровней",
        "План-факт анализ",
        "ИИ-рекомендации по целям",
        "Еженедельные отчеты прогресса",
      ],
      difficulty: "Средне",
      timeToSetup: "10-15 минут",
      icon: Target,
      category: "Планирование",
      status: "available",
      blockName: "УПРАВЛЕНИЕ БИЗНЕСОМ",
    },
    {
      key: "projects",
      title: "Активные проекты",
      description: "Управление портфелем проектов с Kanban-досками, Gantt-диаграммами и трекингом времени",
      benefits: [
        "Диаграмма Ганта для планирования",
        "Kanban-доски для задач",
        "Управление ресурсами команды",
        "Отслеживание бюджета проектов",
      ],
      difficulty: "Средне",
      timeToSetup: "15-20 минут",
      icon: Briefcase,
      category: "Проекты",
      status: "available",
      blockName: "УПРАВЛЕНИЕ БИЗНЕСОМ",
    },
    {
      key: "tasks",
      title: "Управление задачами",
      description: "Система создания, назначения и отслеживания задач с приоритизацией и дедлайнами",
      benefits: [
        "Создание задач с подзадачами",
        "Приоритизация и дедлайны",
        "Прикрепление файлов",
        "Отслеживание времени выполнения",
      ],
      difficulty: "Легко",
      timeToSetup: "5 минут",
      icon: CheckSquare,
      category: "Организация",
      status: "available",
      blockName: "УПРАВЛЕНИЕ БИЗНЕСОМ",
    },

    // ФИНАНСЫ И ДОКУМЕНТООБОРОТ
    {
      key: "finance",
      title: "Финансы",
      description: "Управление денежными потоками, бюджетом и финансовая аналитика с прогнозированием",
      benefits: ["Учет доходов и расходов", "Планирование бюджета", "Cash-flow анализ", "Интеграция с банками"],
      difficulty: "Средне",
      timeToSetup: "20-30 минут",
      icon: DollarSign,
      category: "Финансы",
      status: "available",
      blockName: "ФИНАНСЫ И ДОКУМЕНТООБОРОТ",
    },
    {
      key: "sales",
      title: "Продажи",
      description: "CRM-система с воронкой продаж, сегментацией по менеджерам и детальной аналитикой",
      benefits: [
        "Воронка продаж с конверсией",
        "Сегментация по менеджерам",
        "Лид-скоринг и автоматизация",
        "Прогнозирование выручки",
      ],
      difficulty: "Средне",
      timeToSetup: "25-35 минут",
      icon: TrendingUp,
      category: "Продажи",
      status: "available",
      blockName: "ФИНАНСЫ И ДОКУМЕНТООБОРОТ",
    },
    {
      key: "edo",
      title: "ЭДО | Документооборот",
      description: "Электронный документооборот с КЭП, маршрутами согласования и управлением контрагентами",
      benefits: [
        "Подписание документов КЭП",
        "Маршруты согласования",
        "Управление контрагентами",
        "Архив с поиском документов",
      ],
      difficulty: "Сложно",
      timeToSetup: "45-60 минут",
      icon: FileText,
      category: "Документооборот",
      status: "available",
      blockName: "ФИНАНСЫ И ДОКУМЕНТООБОРОТ",
    },
    {
      key: "legal",
      title: "Правовой контур",
      description: "Юридическое сопровождение: договоры, лицензии, судебные дела и правовая аналитика",
      benefits: [
        "Реестр договоров с файлами",
        "Отслеживание лицензий",
        "Ведение судебных дел",
        "Библиотека правовых шаблонов",
      ],
      difficulty: "Сложно",
      timeToSetup: "30-45 минут",
      icon: Scale,
      category: "Юриспруденция",
      status: "available",
      blockName: "ФИНАНСЫ И ДОКУМЕНТООБОРОТ",
    },

    // КАДРЫ И КОМАНДА
    {
      key: "hr",
      title: "HR и развитие команды",
      description: "Управление персоналом с редактируемой оргструктурой, системой целей и кадровыми процессами",
      benefits: [
        "Интерактивная оргструктура",
        "Система индивидуальных целей",
        "Процессы найма и развития",
        "Оценка эффективности",
      ],
      difficulty: "Средне",
      timeToSetup: "20-30 минут",
      icon: Users,
      category: "HR",
      status: "available",
      blockName: "КАДРЫ И КОМАНДА",
    },
    {
      key: "team",
      title: "Команда",
      description: "Управление составом команды, ролями сотрудников и распределением по проектам",
      benefits: ["Обзор всей команды", "Отслеживание загрузки", "Фильтры по навыкам", "Планирование отпусков"],
      difficulty: "Легко",
      timeToSetup: "5-10 минут",
      icon: UserCheck,
      category: "Команда",
      status: "available",
      blockName: "КАДРЫ И КОМАНДА",
    },
    {
      key: "roles",
      title: "Роли и права",
      description: "Система безопасности с детальными правами доступа и аудитом действий пользователей",
      benefits: [
        "Кастомные роли пользователей",
        "Детальные разрешения",
        "Аудит действий",
        "Принцип минимальных привилегий",
      ],
      difficulty: "Сложно",
      timeToSetup: "30-40 минут",
      icon: Shield,
      category: "Безопасность",
      status: "available",
      blockName: "КАДРЫ И КОМАНДА",
    },

    // ИИ-ИНСТРУМЕНТЫ
    {
      key: "ai-agent",
      title: "ИИ-Агент для бизнеса",
      description: "Умный консультант и стратег для бизнес-консультаций и стратегических рекомендаций",
      benefits: [
        "Стратегические рекомендации",
        "Анализ данных компании",
        "Дорожные карты развития",
        "Отслеживание трендов рынка",
      ],
      difficulty: "Средне",
      timeToSetup: "10-15 минут",
      icon: Brain,
      category: "ИИ-консультант",
      status: "available",
      blockName: "ИИ-ИНСТРУМЕНТЫ",
    },
    {
      key: "ai-tools",
      title: "ИИ-инструменты",
      description: "Набор специализированных ИИ-инструментов для автоматизации и оптимизации процессов",
      benefits: ["Генерация контента", "Автоматизация процессов", "Предиктивная аналитика", "Персонализация UX"],
      difficulty: "Средне",
      timeToSetup: "15-25 минут",
      icon: Zap,
      category: "Автоматизация",
      status: "available",
      blockName: "ИИ-ИНСТРУМЕНТЫ",
    },

    // МАРКЕТИНГ И КЛИЕНТЫ
    {
      key: "marketing",
      title: "Маркетинг и клиенты",
      description: "Управление воронками, кампаниями, сегментацией аудитории и автоматизацией коммуникаций",
      benefits: [
        "Воронки клиентов с конверсией",
        "Многоканальные кампании",
        "A/B-тестирование",
        "Лид-скоринг и nurturing",
      ],
      difficulty: "Сложно",
      timeToSetup: "35-50 минут",
      icon: Megaphone,
      category: "Маркетинг",
      status: "available",
      blockName: "МАРКЕТИНГ И КЛИЕНТЫ",
    },

    // СИСТЕМА
    {
      key: "files",
      title: "Файловое хранилище",
      description: "Централизованное управление документами с версионностью и совместным доступом",
      benefits: [
        "Версионность документов",
        "Совместная работа",
        "Полнотекстовый поиск",
        "Автоматическое резервирование",
      ],
      difficulty: "Легко",
      timeToSetup: "5 минут",
      icon: Database,
      category: "Документы",
      status: "available",
      blockName: "СИСТЕМА",
    },
    {
      key: "settings",
      title: "Настройки",
      description: "Персонализация и конфигурация системы: профиль, уведомления, безопасность, интеграции",
      benefits: ["Настройка профиля", "Система уведомлений", "Параметры безопасности", "Управление интеграциями"],
      difficulty: "Легко",
      timeToSetup: "10-15 минут",
      icon: Settings,
      category: "Конфигурация",
      status: "available",
      blockName: "СИСТЕМА",
    },
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Легко":
        return "bg-green-500/10 text-green-600 border-green-500/30"
      case "Средне":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/30"
      case "Сложно":
        return "bg-red-500/10 text-red-600 border-red-500/30"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/30"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500/10 text-green-600 border-green-500/30"
      case "premium":
        return "bg-purple-500/10 text-purple-600 border-purple-500/30"
      case "coming-soon":
        return "bg-blue-500/10 text-blue-600 border-blue-500/30"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/30"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "available":
        return "Доступно"
      case "premium":
        return "Премиум"
      case "coming-soon":
        return "Скоро"
      default:
        return "Неизвестно"
    }
  }

  const blocks = [...new Set(features.map((f) => f.blockName))]
  const filteredFeatures = selectedBlock === "all" ? features : features.filter((f) => f.blockName === selectedBlock)

  return (
    <Dialog open={showGuide} onOpenChange={setShowGuide}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-primary/5 border-primary/30 hover:bg-primary/10">
          <BookOpen className="w-4 h-4 mr-2" />
          Гид по функциям
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Lightbulb className="w-5 h-5 mr-2 text-primary" />
            Полный гид по функциям платформы Рефрейм Бюро
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Изучите все {features.length} модулей в {blocks.length} основных блоках платформы
          </p>
        </DialogHeader>

        <div className="space-y-6 overflow-y-auto max-h-[calc(90vh-120px)] pr-2">
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-2 min-w-max">
              <Button
                variant={selectedBlock === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedBlock("all")}
                className="whitespace-nowrap"
              >
                Все модули ({features.length})
              </Button>
              {blocks.map((block) => (
                <Button
                  key={block}
                  variant={selectedBlock === block ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedBlock(block)}
                  className="whitespace-nowrap"
                >
                  {block} ({features.filter((f) => f.blockName === block).length})
                </Button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-max">
              {filteredFeatures.map((feature) => {
                const FeatureIcon = feature.icon
                return (
                  <Card
                    key={feature.key}
                    className="bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-lg transition-all duration-300 cursor-pointer group w-80 flex-shrink-0"
                    onClick={() => setSelectedFeature(feature)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <FeatureIcon className="w-4 h-4 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <CardTitle className="text-sm truncate">{feature.title}</CardTitle>
                            <p className="text-xs text-muted-foreground truncate">{feature.blockName}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(feature.status)} variant="outline">
                          {getStatusLabel(feature.status)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-3 h-12">{feature.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Сложность</span>
                          <Badge className={getDifficultyColor(feature.difficulty)} variant="outline">
                            {feature.difficulty}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Настройка</span>
                          <span className="text-xs text-foreground truncate max-w-32">{feature.timeToSetup}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">Категория</span>
                          <Badge variant="secondary" className="text-xs">
                            {feature.category}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="w-full mt-3 group-hover:bg-primary/10 transition-colors"
                      >
                        Подробнее
                        <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {selectedFeature && (
            <Card className="bg-gradient-to-br from-primary/5 via-primary/3 to-transparent border border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <selectedFeature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{selectedFeature.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {selectedFeature.blockName} • {selectedFeature.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className={getDifficultyColor(selectedFeature.difficulty)}>
                      {selectedFeature.difficulty}
                    </Badge>
                    <Badge className={getStatusColor(selectedFeature.status)}>
                      {getStatusLabel(selectedFeature.status)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-foreground mb-4">{selectedFeature.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Ключевые возможности:</h4>
                    <ul className="space-y-1">
                      {selectedFeature.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start text-sm text-muted-foreground">
                          <CheckCircle className="w-3 h-3 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Время настройки:</h4>
                    <p className="text-sm text-muted-foreground mb-3">{selectedFeature.timeToSetup}</p>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <Play className="w-4 h-4 mr-2" />
                      Начать использовать
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="text-center border-t pt-4">
            <p className="text-sm text-muted-foreground mb-2">
              Нужна помощь с настройкой? Обратитесь к ИИ-Агенту для бизнеса
            </p>
            <div className="flex justify-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowGuide(false)}>
                Закрыть гид
              </Button>
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                <MessageSquare className="w-4 h-4 mr-2" />
                Задать вопрос ИИ
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
