"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Rocket,
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
}

export function FeatureGuide() {
  const [showGuide, setShowGuide] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState<FeatureInfo | null>(null)

  const features: FeatureInfo[] = [
    {
      key: "overview",
      title: "Обзор бизнеса",
      description: "Центральная панель с ключевыми метриками и аналитикой вашего бизнеса",
      benefits: [
        "Мгновенный обзор всех показателей",
        "ИИ-рекомендации для роста",
        "Отслеживание прогресса в реальном времени",
      ],
      difficulty: "Легко",
      timeToSetup: "Готово к использованию",
      icon: Briefcase,
      category: "Аналитика",
      status: "available",
    },
    {
      key: "tools",
      title: "ИИ-инструменты",
      description: "Мощные инструменты искусственного интеллекта для автоматизации бизнес-процессов",
      benefits: ["Автоматизация рутинных задач", "Генерация контента и аналитики", "Экономия до 156 часов в месяц"],
      difficulty: "Средне",
      timeToSetup: "5-10 минут",
      icon: Rocket,
      category: "Автоматизация",
      status: "available",
    },
    {
      key: "sales",
      title: "Управление продажами",
      description: "CRM система для управления клиентами, сделками и воронкой продаж",
      benefits: ["Увеличение конверсии на 24.8%", "Автоматизация работы с лидами", "Прогнозирование продаж"],
      difficulty: "Средне",
      timeToSetup: "15-20 минут",
      icon: TrendingUp,
      category: "Продажи",
      status: "available",
    },
    {
      key: "finance",
      title: "Финансовое управление",
      description: "Контроль бюджета, доходов, расходов и финансовое планирование",
      benefits: ["Контроль всех финансовых потоков", "Автоматические отчеты", "Прогнозирование прибыли"],
      difficulty: "Средне",
      timeToSetup: "10-15 минут",
      icon: DollarSign,
      category: "Финансы",
      status: "available",
    },
    {
      key: "projects",
      title: "Управление проектами",
      description: "Планирование, отслеживание и управление проектами с командой",
      benefits: ["Визуализация прогресса проектов", "Управление дедлайнами", "Командная работа"],
      difficulty: "Легко",
      timeToSetup: "5 минут",
      icon: Target,
      category: "Проекты",
      status: "available",
    },
    {
      key: "tasks",
      title: "Управление задачами",
      description: "Создание, назначение и отслеживание задач для команды",
      benefits: ["Повышение продуктивности команды", "Прозрачность рабочих процессов", "Автоматические уведомления"],
      difficulty: "Легко",
      timeToSetup: "3 минуты",
      icon: CheckSquare,
      category: "Организация",
      status: "available",
    },
    {
      key: "files",
      title: "Файловое хранилище",
      description: "Централизованное хранение и управление документами компании",
      benefits: ["Безопасное хранение файлов", "Совместная работа с документами", "Система прав доступа"],
      difficulty: "Легко",
      timeToSetup: "2 минуты",
      icon: FileText,
      category: "Документы",
      status: "available",
    },
    {
      key: "team",
      title: "Управление командой",
      description: "Управление сотрудниками, их ролями и правами доступа",
      benefits: ["Контроль доступа к функциям", "Отслеживание продуктивности", "Управление отделами"],
      difficulty: "Средне",
      timeToSetup: "10 минут",
      icon: Users,
      category: "HR",
      status: "available",
    },
    {
      key: "roles",
      title: "Роли и права",
      description: "Настройка ролей пользователей и детальных прав доступа",
      benefits: ["Гибкая система безопасности", "Кастомные роли", "Детальный контроль доступа"],
      difficulty: "Сложно",
      timeToSetup: "20-30 минут",
      icon: Shield,
      category: "Безопасность",
      status: "available",
    },
    {
      key: "chat",
      title: "ИИ-консультант",
      description: "Персональный ИИ-помощник для консультаций по развитию бизнеса",
      benefits: ["Персональные рекомендации", "Анализ бизнес-метрик", "Поддержка 24/7"],
      difficulty: "Легко",
      timeToSetup: "Готово к использованию",
      icon: MessageSquare,
      category: "ИИ-помощник",
      status: "available",
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

  const categories = [...new Set(features.map((f) => f.category))]

  return (
    <Dialog open={showGuide} onOpenChange={setShowGuide}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-primary/5 border-primary/30 hover:bg-primary/10">
          <BookOpen className="w-4 h-4 mr-2" />
          Гид по функциям
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            <Lightbulb className="w-5 h-5 mr-2 text-primary" />
            Гид по функциям платформы
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature) => {
              const FeatureIcon = feature.icon
              return (
                <Card
                  key={feature.key}
                  className="bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => setSelectedFeature(feature)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <FeatureIcon className="w-4 h-4 text-primary" />
                        </div>
                        <CardTitle className="text-sm">{feature.title}</CardTitle>
                      </div>
                      <Badge className={getStatusColor(feature.status)} variant="outline">
                        {getStatusLabel(feature.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{feature.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Сложность</span>
                        <Badge className={getDifficultyColor(feature.difficulty)} variant="outline">
                          {feature.difficulty}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Настройка</span>
                        <span className="text-xs text-foreground">{feature.timeToSetup}</span>
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
                      <p className="text-sm text-muted-foreground">{selectedFeature.category}</p>
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
                    <h4 className="font-medium text-foreground mb-2">Преимущества:</h4>
                    <ul className="space-y-1">
                      {selectedFeature.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center text-sm text-muted-foreground">
                          <CheckCircle className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" />
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

          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Нужна помощь с настройкой? Обратитесь к ИИ-консультанту
            </p>
            <Button variant="outline" size="sm" onClick={() => setShowGuide(false)}>
              Закрыть гид
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
