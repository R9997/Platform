"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"
import {
  ArrowLeft,
  Search,
  Clock,
  Users,
  BarChart3,
  FileText,
  Shield,
  Brain,
  Target,
  MessageSquare,
  Settings,
  Archive,
  TrendingUp,
  Briefcase,
  Gavel,
  UserCheck,
  Megaphone,
  Sun,
  Moon,
} from "lucide-react"

interface GuideModule {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  category: string
  difficulty: "Начальный" | "Средний" | "Продвинутый"
  duration: string
  features: string[]
  benefits: string[]
}

export default function GuidePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Все")
  const [selectedModule, setSelectedModule] = useState<GuideModule | null>(null)
  const { theme, setTheme } = useTheme()

  const modules: GuideModule[] = [
    {
      id: "business-overview",
      title: "Обзор бизнеса",
      description: "Центральный дашборд с ключевыми метриками и показателями эффективности вашего бизнеса",
      icon: BarChart3,
      category: "Управление бизнесом",
      difficulty: "Начальный",
      duration: "5 мин",
      features: ["Ключевые метрики", "Графики и диаграммы", "Сравнение периодов", "Экспорт данных"],
      benefits: ["Быстрый обзор состояния бизнеса", "Принятие решений на основе данных", "Отслеживание трендов"],
    },
    {
      id: "strategy-goals",
      title: "Стратегия и цели",
      description: "Система управления OKR/KPI с отслеживанием прогресса и достижения целей",
      icon: Target,
      category: "Управление бизнесом",
      difficulty: "Средний",
      duration: "10 мин",
      features: ["OKR/KPI управление", "Отслеживание прогресса", "AI рекомендации", "Отчеты по целям"],
      benefits: ["Четкое планирование", "Мотивация команды", "Измеримые результаты"],
    },
    {
      id: "active-projects",
      title: "Активные проекты",
      description: "Управление проектами с диаграммой Ганта, отслеживанием задач и ресурсов",
      icon: Briefcase,
      category: "Управление бизнесом",
      difficulty: "Средний",
      duration: "15 мин",
      features: ["Диаграмма Ганта", "Управление задачами", "Распределение ресурсов", "Отчеты по проектам"],
      benefits: ["Контроль сроков", "Эффективное планирование", "Прозрачность процессов"],
    },
    {
      id: "task-management",
      title: "Управление задачами",
      description: "Система постановки, отслеживания и контроля выполнения задач",
      icon: FileText,
      category: "Управление бизнесом",
      difficulty: "Начальный",
      duration: "8 мин",
      features: ["Создание задач", "Назначение исполнителей", "Отслеживание статусов", "Уведомления"],
      benefits: ["Организованность", "Контроль выполнения", "Повышение продуктивности"],
    },
    {
      id: "finance",
      title: "Финансы",
      description: "Управление финансовыми потоками, бюджетированием и финансовой отчетностью",
      icon: TrendingUp,
      category: "Финансы и документооборот",
      difficulty: "Средний",
      duration: "12 мин",
      features: ["Учет доходов и расходов", "Бюджетирование", "Финансовые отчеты", "Прогнозирование"],
      benefits: ["Контроль финансов", "Планирование бюджета", "Финансовая прозрачность"],
    },
    {
      id: "sales",
      title: "Продажи",
      description: "CRM система для управления клиентами, сделками и воронкой продаж",
      icon: TrendingUp,
      category: "Финансы и документооборот",
      difficulty: "Средний",
      duration: "15 мин",
      features: ["CRM система", "Воронка продаж", "Управление клиентами", "Аналитика продаж"],
      benefits: ["Увеличение конверсии", "Лучшее обслуживание клиентов", "Рост продаж"],
    },
    {
      id: "edo",
      title: "ЭДО | Документооборот",
      description: "Электронный документооборот с подписанием КЭП и согласованием документов",
      icon: FileText,
      category: "Финансы и документооборот",
      difficulty: "Продвинутый",
      duration: "20 мин",
      features: ["Электронные документы", "КЭП подписание", "Согласование", "Архив документов"],
      benefits: ["Безбумажный офис", "Ускорение процессов", "Юридическая значимость"],
    },
    {
      id: "legal",
      title: "Правовой контур",
      description: "Управление юридическими процессами, договорами и правовыми рисками",
      icon: Gavel,
      category: "Финансы и документооборот",
      difficulty: "Продвинутый",
      duration: "18 мин",
      features: ["Управление договорами", "Судебные дела", "Правовые риски", "Лицензии"],
      benefits: ["Правовая защита", "Снижение рисков", "Соблюдение законодательства"],
    },
    {
      id: "hr-development",
      title: "HR и развитие команды",
      description: "Комплексная система управления персоналом и развития сотрудников",
      icon: UserCheck,
      category: "Кадры и команда",
      difficulty: "Средний",
      duration: "15 мин",
      features: ["Управление персоналом", "Оценка сотрудников", "Обучение", "HR процессы"],
      benefits: ["Эффективная команда", "Развитие сотрудников", "HR автоматизация"],
    },
    {
      id: "team",
      title: "Команда",
      description: "Управление составом команды, ролями и взаимодействием сотрудников",
      icon: Users,
      category: "Кадры и команда",
      difficulty: "Начальный",
      duration: "8 мин",
      features: ["Профили сотрудников", "Организационная структура", "Контакты", "Статистика команды"],
      benefits: ["Прозрачность структуры", "Лучшее взаимодействие", "Управление командой"],
    },
    {
      id: "roles-permissions",
      title: "Роли и права",
      description: "Настройка ролей пользователей и управление правами доступа к функциям",
      icon: Shield,
      category: "Кадры и команда",
      difficulty: "Продвинутый",
      duration: "12 мин",
      features: ["Создание ролей", "Настройка прав", "Управление доступом", "Безопасность"],
      benefits: ["Контроль доступа", "Безопасность данных", "Гибкая настройка"],
    },
    {
      id: "ai-agent",
      title: "ИИ-Агент для бизнеса",
      description: "Интеллектуальный помощник для автоматизации бизнес-процессов",
      icon: Brain,
      category: "ИИ-инструменты",
      difficulty: "Средний",
      duration: "10 мин",
      features: ["Автоматизация процессов", "Анализ данных", "Рекомендации", "Чат-бот"],
      benefits: ["Экономия времени", "Умные решения", "Автоматизация рутины"],
    },
    {
      id: "ai-tools",
      title: "ИИ-инструменты",
      description: "Набор инструментов искусственного интеллекта для различных задач",
      icon: Brain,
      category: "ИИ-инструменты",
      difficulty: "Средний",
      duration: "12 мин",
      features: ["Анализ текста", "Генерация контента", "Обработка данных", "Прогнозирование"],
      benefits: ["Повышение эффективности", "Качественный анализ", "Инновационные решения"],
    },
    {
      id: "marketing-clients",
      title: "Маркетинг и клиенты",
      description: "Инструменты для маркетинговых кампаний и управления клиентской базой",
      icon: Megaphone,
      category: "Маркетинг и клиенты",
      difficulty: "Средний",
      duration: "15 мин",
      features: ["Маркетинговые кампании", "Сегментация клиентов", "Аналитика", "Автоворонки"],
      benefits: ["Рост клиентской базы", "Эффективный маркетинг", "Увеличение продаж"],
    },
    {
      id: "file-storage",
      title: "Файловое хранилище",
      description: "Централизованное хранение и управление файлами компании",
      icon: Archive,
      category: "Система",
      difficulty: "Начальный",
      duration: "5 мин",
      features: ["Загрузка файлов", "Организация папок", "Поиск", "Права доступа"],
      benefits: ["Централизованное хранение", "Быстрый поиск", "Безопасность файлов"],
    },
    {
      id: "settings",
      title: "Настройки",
      description: "Конфигурация системы, пользовательские настройки и интеграции",
      icon: Settings,
      category: "Система",
      difficulty: "Продвинутый",
      duration: "10 мин",
      features: ["Системные настройки", "Интеграции", "Пользовательские настройки", "Безопасность"],
      benefits: ["Персонализация", "Интеграция с другими системами", "Оптимизация работы"],
    },
  ]

  const categories = [
    "Все",
    "Управление бизнесом",
    "Финансы и документооборот",
    "Кадры и команда",
    "ИИ-инструменты",
    "Маркетинг и клиенты",
    "Система",
  ]

  const filteredModules = modules.filter((module) => {
    const matchesSearch =
      module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Все" || module.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Начальный":
        return "bg-green-500/10 text-green-600 border-green-500/30"
      case "Средний":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/30"
      case "Продвинутый":
        return "bg-red-500/10 text-red-600 border-red-500/30"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/30"
    }
  }

  if (selectedModule) {
    const ModuleIcon = selectedModule.icon
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" onClick={() => setSelectedModule(null)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад к списку модулей
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-9 w-9"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Переключить тему</span>
              </Button>
            </div>
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-primary/10 rounded-lg">
                <ModuleIcon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">{selectedModule.title}</h1>
                <p className="text-muted-foreground">{selectedModule.description}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Основные возможности</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedModule.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Преимущества использования</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedModule.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center mt-0.5">
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                        </div>
                        <span className="text-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Пошаговое руководство</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Начало работы</h4>
                        <p className="text-muted-foreground">
                          Откройте модуль "{selectedModule.title}" в левом меню личного кабинета
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Изучение интерфейса</h4>
                        <p className="text-muted-foreground">
                          Ознакомьтесь с основными элементами и кнопками управления
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Настройка</h4>
                        <p className="text-muted-foreground">
                          Настройте модуль под ваши потребности через кнопку "Настройки"
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                        4
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">Практическое использование</h4>
                        <p className="text-muted-foreground">
                          Начните использовать основные функции модуля в повседневной работе
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Информация о модуле</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Категория</span>
                    <Badge variant="outline">{selectedModule.category}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Сложность</span>
                    <Badge className={getDifficultyColor(selectedModule.difficulty)}>{selectedModule.difficulty}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Время изучения</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedModule.duration}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Быстрые действия</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/dashboard">
                    <Button className="w-full">Перейти к модулю</Button>
                  </Link>
                  <Button variant="outline" className="w-full bg-transparent">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Задать вопрос в поддержку
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Гид по функциям платформы</h1>
              <p className="text-muted-foreground">Изучите все возможности Рефрейм Бюро для эффективной работы</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-9 w-9"
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Переключить тему</span>
              </Button>
              <Link href="/dashboard">
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Вернуться в личный кабинет
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Поиск по модулям..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => {
            const ModuleIcon = module.icon
            return (
              <Card
                key={module.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-card/50 backdrop-blur-sm border border-border/50"
                onClick={() => setSelectedModule(module)}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <ModuleIcon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <Badge variant="outline" className="text-xs mt-1">
                        {module.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">{module.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{module.duration}</span>
                      </div>
                      <Badge className={getDifficultyColor(module.difficulty)} variant="outline">
                        {module.difficulty}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredModules.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Модули не найдены</p>
              <p className="text-sm">Попробуйте изменить поисковый запрос или фильтр</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
