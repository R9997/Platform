"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useTheme } from "@/components/theme-provider"
import { SupportChat } from "@/components/support/support-chat"
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
  steps: string[]
}

export default function GuidePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Все")
  const [selectedModule, setSelectedModule] = useState<GuideModule | null>(null)
  const { theme, setTheme } = useTheme()
  const [showSupportChat, setShowSupportChat] = useState(false)

  const modules: GuideModule[] = [
    {
      id: "business-overview",
      title: "Обзор бизнеса",
      description:
        "Центральный дашборд с ключевыми метриками, интерактивными графиками и аналитикой для принятия стратегических решений",
      icon: BarChart3,
      category: "Управление бизнесом",
      difficulty: "Начальный",
      duration: "5 мин",
      features: [
        "Интерактивные графики доходов и расходов",
        "Метрики эффективности в реальном времени",
        "Сравнение периодов и трендов",
        "Экспорт отчетов в PDF/Excel",
        "Настраиваемые виджеты",
      ],
      benefits: [
        "Быстрый обзор состояния бизнеса за 30 секунд",
        "Принятие решений на основе актуальных данных",
        "Выявление трендов и аномалий",
        "Мониторинг KPI в реальном времени",
      ],
      steps: [
        "Откройте раздел 'Обзор бизнеса' в левом меню",
        "Изучите основные метрики: доходы, расходы, прибыль",
        "Настройте период отображения данных (день/неделя/месяц)",
        "Используйте фильтры для детального анализа",
        "Экспортируйте отчеты для презентаций",
      ],
    },
    {
      id: "strategy-goals",
      title: "Стратегия и цели",
      description:
        "Система управления OKR/KPI с AI-рекомендациями, отслеживанием прогресса и автоматическими уведомлениями о достижениях",
      icon: Target,
      category: "Управление бизнесом",
      difficulty: "Средний",
      duration: "12 мин",
      features: [
        "OKR/KPI структура с вложенностью",
        "AI-анализ достижимости целей",
        "Автоматические уведомления о прогрессе",
        "Визуализация прогресса в реальном времени",
        "Интеграция с другими модулями",
      ],
      benefits: [
        "Четкое планирование и фокус на приоритетах",
        "Мотивация команды через прозрачность целей",
        "Измеримые результаты и отчетность",
        "Своевременная корректировка стратегии",
      ],
      steps: [
        "Перейдите в 'Стратегия и цели' → вкладка 'Цели'",
        "Нажмите '+ Новая цель' для создания стратегической цели",
        "Заполните название, описание, срок выполнения и ответственного",
        "Добавьте ключевые результаты (KR) для каждой цели",
        "Отслеживайте прогресс через вкладку 'Аналитика'",
        "Используйте AI-рекомендации для оптимизации целей",
      ],
    },
    {
      id: "active-projects",
      title: "Активные проекты",
      description:
        "Полноценное управление проектами с диаграммой Ганта, канбан-досками, отслеживанием ресурсов и автоматическими отчетами",
      icon: Briefcase,
      category: "Управление бизнесом",
      difficulty: "Средний",
      duration: "18 мин",
      features: [
        "Интерактивная диаграмма Ганта",
        "Канбан-доски для задач",
        "Управление ресурсами и бюджетом",
        "Отслеживание времени",
        "Автоматические отчеты по проектам",
        "Интеграция с календарем",
      ],
      benefits: [
        "Контроль сроков и предотвращение задержек",
        "Эффективное распределение ресурсов",
        "Прозрачность для всех участников",
        "Автоматизация отчетности",
      ],
      steps: [
        "Откройте 'Активные проекты' в меню",
        "Нажмите '+ Новый проект' для создания проекта",
        "Заполните основную информацию: название, описание, сроки",
        "Добавьте участников команды и назначьте роли",
        "Создайте задачи и установите зависимости",
        "Используйте диаграмму Ганта для планирования",
        "Отслеживайте прогресс через дашборд проекта",
      ],
    },
    {
      id: "task-management",
      title: "Управление задачами",
      description:
        "Система постановки, приоритизации и контроля задач с автоматическими уведомлениями и интеграцией с проектами",
      icon: FileText,
      category: "Управление бизнесом",
      difficulty: "Начальный",
      duration: "8 мин",
      features: [
        "Создание и назначение задач",
        "Система приоритетов и меток",
        "Автоматические уведомления",
        "Отслеживание времени выполнения",
        "Комментарии и файлы к задачам",
      ],
      benefits: [
        "Организованность и структурированность работы",
        "Контроль выполнения и дедлайнов",
        "Повышение продуктивности команды",
        "Прозрачность рабочих процессов",
      ],
      steps: [
        "Перейдите в раздел 'Управление задачами'",
        "Создайте новую задачу через кнопку '+ Добавить задачу'",
        "Укажите название, описание, приоритет и срок",
        "Назначьте исполнителя из списка сотрудников",
        "Добавьте метки для категоризации задач",
        "Отслеживайте статус выполнения в реальном времени",
      ],
    },
    {
      id: "finance",
      title: "Финансы",
      description:
        "Комплексное управление финансами с автоматическим учетом, бюджетированием, прогнозированием и интеграцией с банками",
      icon: TrendingUp,
      category: "Финансы и документооборот",
      difficulty: "Средний",
      duration: "15 мин",
      features: [
        "Автоматический учет доходов и расходов",
        "Бюджетирование по категориям",
        "Финансовые прогнозы и планирование",
        "Интеграция с банковскими API",
        "Налоговая отчетность",
        "Контроль дебиторской задолженности",
      ],
      benefits: [
        "Полный контроль финансовых потоков",
        "Автоматизация учета и отчетности",
        "Планирование бюджета на основе данных",
        "Снижение финансовых рисков",
      ],
      steps: [
        "Откройте модуль 'Финансы' в разделе документооборота",
        "Настройте категории доходов и расходов",
        "Подключите банковские счета для автоматической синхронизации",
        "Создайте бюджет на текущий период",
        "Вносите операции вручную или импортируйте из банка",
        "Анализируйте отчеты и планируйте бюджет на следующий период",
      ],
    },
    {
      id: "sales",
      title: "Продажи",
      description:
        "CRM система с воронкой продаж, автоматизацией процессов, аналитикой конверсий и интеграцией с маркетингом",
      icon: TrendingUp,
      category: "Финансы и документооборот",
      difficulty: "Средний",
      duration: "20 мин",
      features: [
        "Воронка продаж с настраиваемыми этапами",
        "CRM для управления клиентами",
        "Автоматизация продажных процессов",
        "Аналитика конверсий и эффективности",
        "Интеграция с маркетинговыми кампаниями",
        "Прогнозирование продаж",
      ],
      benefits: [
        "Увеличение конверсии на 25-40%",
        "Систематизация работы с клиентами",
        "Автоматизация рутинных процессов",
        "Прозрачность продажных процессов",
      ],
      steps: [
        "Перейдите в раздел 'Продажи'",
        "Настройте этапы воронки продаж под ваш бизнес-процесс",
        "Добавьте клиентов и сделки в CRM",
        "Используйте автоматизацию для перемещения сделок",
        "Анализируйте конверсии между этапами",
        "Настройте интеграцию с маркетинговыми кампаниями",
      ],
    },
    {
      id: "edo",
      title: "ЭДО | Документооборот",
      description:
        "Электронный документооборот с КЭП, автоматическим согласованием, архивированием и интеграцией с госуслугами",
      icon: FileText,
      category: "Финансы и документооборот",
      difficulty: "Продвинутый",
      duration: "25 мин",
      features: [
        "Подписание документов КЭП",
        "Автоматические маршруты согласования",
        "Интеграция с ФНС и госуслугами",
        "Архив с поиском и индексацией",
        "Шаблоны документов",
        "Контроль сроков и уведомления",
      ],
      benefits: [
        "Безбумажный документооборот",
        "Юридическая значимость документов",
        "Ускорение согласования в 3-5 раз",
        "Соответствие требованиям законодательства",
      ],
      steps: [
        "Откройте 'ЭДО | Документооборот'",
        "Загрузите или создайте документ во вкладке 'Документы'",
        "Настройте маршрут согласования",
        "Отправьте документ на подписание КЭП",
        "Отслеживайте статус через вкладки 'Входящие'/'Исходящие'",
        "Используйте архив для поиска подписанных документов",
      ],
    },
    {
      id: "legal",
      title: "Правовой контур",
      description:
        "Управление юридическими процессами, договорами, судебными делами, лицензиями и правовыми рисками с AI-анализом",
      icon: Gavel,
      category: "Финансы и документооборот",
      difficulty: "Продвинутый",
      duration: "22 мин",
      features: [
        "Реестр договоров с контролем сроков",
        "Управление судебными делами",
        "Мониторинг лицензий и разрешений",
        "AI-анализ правовых рисков",
        "Шаблоны юридических документов",
        "Интеграция с судебными системами",
      ],
      benefits: [
        "Снижение правовых рисков на 60%",
        "Автоматический контроль сроков",
        "Централизованное управление юридическими процессами",
        "Соблюдение требований законодательства",
      ],
      steps: [
        "Перейдите в 'Правовой контур'",
        "Добавьте договоры в реестр через вкладку 'Договоры'",
        "Настройте уведомления о сроках действия",
        "Ведите судебные дела во вкладке 'Судебные дела'",
        "Отслеживайте лицензии и их продление",
        "Используйте AI-анализ для оценки рисков",
      ],
    },
    {
      id: "hr-development",
      title: "HR и развитие команды",
      description:
        "Комплексная HR-система с оценкой персонала, планами развития, обучением и автоматизацией HR-процессов",
      icon: UserCheck,
      category: "Кадры и команда",
      difficulty: "Средний",
      duration: "18 мин",
      features: [
        "360-градусная оценка сотрудников",
        "Планы индивидуального развития",
        "Система обучения и сертификации",
        "Автоматизация HR-процессов",
        "Аналитика эффективности персонала",
        "Планирование карьеры",
      ],
      benefits: [
        "Повышение эффективности команды на 30%",
        "Снижение текучести кадров",
        "Автоматизация рутинных HR-задач",
        "Развитие компетенций сотрудников",
      ],
      steps: [
        "Откройте 'HR и развитие команды'",
        "Создайте профили сотрудников с компетенциями",
        "Настройте процесс оценки персонала",
        "Создайте планы развития для каждого сотрудника",
        "Запустите программы обучения",
        "Анализируйте эффективность через отчеты",
      ],
    },
    {
      id: "team",
      title: "Команда",
      description: "Управление составом команды, организационной структурой, контактами и взаимодействием сотрудников",
      icon: Users,
      category: "Кадры и команда",
      difficulty: "Начальный",
      duration: "10 мин",
      features: [
        "Организационная структура компании",
        "Профили и контакты сотрудников",
        "Статистика по команде",
        "Календарь отпусков и отсутствий",
        "Внутренний чат и коммуникации",
      ],
      benefits: [
        "Прозрачность организационной структуры",
        "Быстрый поиск контактов",
        "Эффективное планирование ресурсов",
        "Улучшение внутренних коммуникаций",
      ],
      steps: [
        "Перейдите в раздел 'Команда'",
        "Добавьте сотрудников через кнопку '+ Добавить сотрудника'",
        "Заполните профили с контактной информацией",
        "Настройте организационную структуру",
        "Используйте календарь для планирования отпусков",
        "Анализируйте статистику команды",
      ],
    },
    {
      id: "roles-permissions",
      title: "Роли и права",
      description:
        "Гибкая система управления ролями, правами доступа, безопасностью данных и аудитом действий пользователей",
      icon: Shield,
      category: "Кадры и команда",
      difficulty: "Продвинутый",
      duration: "15 мин",
      features: [
        "Создание пользовательских ролей",
        "Гранулярные права доступа",
        "Аудит действий пользователей",
        "Двухфакторная аутентификация",
        "Управление сессиями",
        "Политики безопасности",
      ],
      benefits: [
        "Контроль доступа к конфиденциальным данным",
        "Соответствие требованиям безопасности",
        "Гибкая настройка под организационную структуру",
        "Аудит и отчетность по безопасности",
      ],
      steps: [
        "Откройте 'Роли и права' в разделе команды",
        "Создайте новую роль через '+ Создать роль'",
        "Настройте права доступа к модулям и функциям",
        "Назначьте роли сотрудникам",
        "Настройте политики безопасности",
        "Мониторьте активность через журнал аудита",
      ],
    },
    {
      id: "ai-agent",
      title: "ИИ-Агент для бизнеса",
      description:
        "Интеллектуальный помощник с анализом данных, автоматизацией процессов, прогнозированием и персональными рекомендациями",
      icon: Brain,
      category: "ИИ-инструменты",
      difficulty: "Средний",
      duration: "12 мин",
      features: [
        "AI-консультант по бизнес-вопросам",
        "Автоматический анализ данных",
        "Прогнозирование трендов",
        "Персональные рекомендации",
        "Автоматизация рутинных задач",
        "Интеграция со всеми модулями",
      ],
      benefits: [
        "Экономия времени на анализе данных",
        "Получение инсайтов для принятия решений",
        "Автоматизация до 70% рутинных задач",
        "Повышение качества бизнес-решений",
      ],
      steps: [
        "Перейдите в 'ИИ-Агент для бизнеса'",
        "Изучите рекомендации на вкладке 'Рекомендации'",
        "Используйте чат-консультанта для вопросов",
        "Запустите полный анализ бизнеса",
        "Настройте автоматические отчеты",
        "Внедрите рекомендации ИИ в работу",
      ],
    },
    {
      id: "ai-tools",
      title: "ИИ-инструменты",
      description:
        "Набор специализированных AI-инструментов для анализа текста, генерации контента, обработки данных и прогнозирования",
      icon: Brain,
      category: "ИИ-инструменты",
      difficulty: "Средний",
      duration: "15 мин",
      features: [
        "Анализ и генерация текстов",
        "Обработка больших данных",
        "Создание презентаций и отчетов",
        "Анализ настроений клиентов",
        "Прогнозирование показателей",
        "API для интеграций",
      ],
      benefits: [
        "Автоматизация создания контента",
        "Глубокий анализ данных",
        "Экономия времени на рутинных задачах",
        "Повышение качества аналитики",
      ],
      steps: [
        "Откройте 'ИИ-инструменты'",
        "Выберите нужный инструмент из списка",
        "Загрузите данные или введите текст",
        "Настройте параметры анализа",
        "Получите результаты и рекомендации",
        "Экспортируйте результаты в нужном формате",
      ],
    },
    {
      id: "marketing-clients",
      title: "Маркетинг и клиенты",
      description:
        "Комплексная маркетинговая платформа с кампаниями, сегментацией, автоворонками, аналитикой и лид-скорингом",
      icon: Megaphone,
      category: "Маркетинг и клиенты",
      difficulty: "Средний",
      duration: "20 мин",
      features: [
        "Мультиканальные кампании (Email, SMS, WhatsApp)",
        "Сегментация аудитории",
        "Автоматические воронки",
        "A/B тестирование",
        "Лид-скоринг",
        "Интеграция с CRM",
      ],
      benefits: [
        "Увеличение конверсии на 40-60%",
        "Автоматизация маркетинговых процессов",
        "Персонализация коммуникаций",
        "ROI маркетинговых кампаний до 340%",
      ],
      steps: [
        "Перейдите в 'Маркетинг и клиенты'",
        "Создайте сегменты аудитории во вкладке 'Сегменты'",
        "Запустите маркетинговую кампанию",
        "Настройте автоматические воронки",
        "Проведите A/B тестирование",
        "Анализируйте результаты и оптимизируйте",
      ],
    },
    {
      id: "file-storage",
      title: "Файловое хранилище",
      description:
        "Централизованное облачное хранилище с версионностью, совместной работой, поиском и интеграцией с модулями",
      icon: Archive,
      category: "Система",
      difficulty: "Начальный",
      duration: "8 мин",
      features: [
        "Облачное хранение файлов",
        "Версионность и история изменений",
        "Совместная работа над документами",
        "Полнотекстовый поиск",
        "Права доступа к файлам",
        "Интеграция с модулями",
      ],
      benefits: [
        "Централизованное хранение всех файлов",
        "Безопасность и резервное копирование",
        "Совместная работа команды",
        "Быстрый поиск нужных документов",
      ],
      steps: [
        "Откройте 'Файловое хранилище'",
        "Создайте структуру папок для организации",
        "Загрузите файлы через drag & drop",
        "Настройте права доступа к папкам",
        "Используйте поиск для быстрого нахождения файлов",
        "Работайте совместно над документами",
      ],
    },
    {
      id: "settings",
      title: "Настройки",
      description:
        "Центр управления системой с конфигурацией модулей, интеграциями, безопасностью и персонализацией интерфейса",
      icon: Settings,
      category: "Система",
      difficulty: "Продвинутый",
      duration: "12 мин",
      features: [
        "Конфигурация всех модулей",
        "Управление интеграциями",
        "Настройки безопасности",
        "Персонализация интерфейса",
        "Резервное копирование",
        "Журналы системы",
      ],
      benefits: [
        "Полная настройка под потребности бизнеса",
        "Интеграция с внешними системами",
        "Контроль безопасности",
        "Оптимизация производительности",
      ],
      steps: [
        "Перейдите в 'Настройки' системы",
        "Настройте основные параметры компании",
        "Подключите необходимые интеграции",
        "Настройте политики безопасности",
        "Персонализируйте интерфейс",
        "Настройте резервное копирование данных",
      ],
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
                  <div className="grid grid-cols-1 gap-3">
                    {selectedModule.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
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
                        <div className="w-6 h-6 bg-green-500/10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
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
                    {selectedModule.steps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-foreground">{step}</p>
                        </div>
                      </div>
                    ))}
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
                  <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowSupportChat(true)}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Задать вопрос в поддержку
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        {showSupportChat && <SupportChat />}
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
      {showSupportChat && <SupportChat />}
    </div>
  )
}
