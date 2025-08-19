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
  Database,
  Scale,
  Megaphone,
  ClipboardList,
  UserCheck,
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
  actionButton?: {
    text: string
    action: () => void
  }
}

const tourSteps: TourStep[] = [
  {
    id: "welcome",
    title: "Добро пожаловать в платформу Рефрейм Бюро",
    description: "Ваша ИИ-платформа роста для комплексного управления бизнесом с 6 основными блоками и 15+ модулями.",
    detailedInfo:
      "Платформа включает: УПРАВЛЕНИЕ БИЗНЕСОМ (4 модуля), ФИНАНСЫ И ДОКУМЕНТООБОРОТ (4 модуля), КАДРЫ И КОМАНДА (3 модуля), ИИ-ИНСТРУМЕНТЫ (2 модуля), МАРКЕТИНГ И КЛИЕНТЫ (1 модуль), СИСТЕМА (2 модуля). Все модули интегрированы и работают синхронно.",
    target: "dashboard-header",
    icon: <Play className="w-5 h-5" />,
    tips: [
      "Используйте левую панель для навигации между блоками",
      "Блоки можно сворачивать и разворачивать кликом по заголовку",
      "Счетчики показывают количество активных элементов",
      "Метки NEW указывают на новые модули",
    ],
    category: "basics",
  },
  {
    id: "business-management",
    title: "УПРАВЛЕНИЕ БИЗНЕСОМ - Основа вашей деятельности",
    description:
      "Блок включает 4 ключевых модуля: Обзор бизнеса, Стратегия и цели, Активные проекты, Управление задачами.",
    detailedInfo:
      "Центральный блок для операционного управления компанией. Обзор бизнеса показывает KPI в реальном времени, Стратегия и цели помогает планировать развитие, Активные проекты управляет портфелем проектов, Управление задачами контролирует выполнение работ.",
    target: "business-management-section",
    icon: <Briefcase className="w-5 h-5" />,
    tips: [
      "Начинайте работу с Обзора бизнеса для понимания текущего состояния",
      "Используйте Стратегию и цели для долгосрочного планирования",
      "Активные проекты помогают контролировать крупные инициативы",
      "Управление задачами обеспечивает выполнение ежедневных работ",
    ],
    category: "basics",
    actionButton: {
      text: "Открыть Обзор бизнеса",
      action: () => {
        const element = document.querySelector('[data-section="overview"]') as HTMLElement
        if (element) element.click()
      },
    },
  },
  {
    id: "business-overview",
    title: "Обзор бизнеса - Ключевые показатели эффективности",
    description:
      "Интерактивные карточки с основными KPI: месячная выручка, активные сделки, конверсия продаж, продуктивность команды.",
    detailedInfo:
      "Дашборд с редактируемыми метриками, прогресс-барами достижения целей, цветовой индикацией эффективности. Все показатели обновляются в реальном времени при изменениях в других модулях. Поддержка различных валют и периодов анализа.",
    target: "metrics-section",
    icon: <BarChart3 className="w-5 h-5" />,
    tips: [
      "Кликайте на карточки для редактирования целевых значений",
      "Зеленый прогресс означает превышение плана",
      "Используйте настройки для изменения периодов анализа",
      "Данные автоматически обновляются из других модулей",
    ],
    category: "basics",
    actionButton: {
      text: "Редактировать KPI",
      action: () => {
        const element = document.querySelector('[data-action="edit-metrics"]') as HTMLElement
        if (element) element.click()
      },
    },
  },
  {
    id: "strategy-goals",
    title: "Стратегия и цели - OKR/KPI система управления",
    description:
      "Комплексная система управления целями с визуализацией прогресса, план-факт анализом и еженедельными отчетами.",
    detailedInfo:
      "Модуль поддерживает создание целей разных уровней (компания → отдел → сотрудник), отслеживание ключевых результатов, автоматические напоминания и детальную аналитику достижений. ИИ-помощник анализирует прогресс и предлагает корректировки стратегии.",
    target: "strategy-section",
    icon: <Target className="w-5 h-5" />,
    tips: [
      "Используйте SMART-критерии при постановке целей",
      "Еженедельные отчеты помогают контролировать прогресс",
      "ИИ-помощник предложит оптимальные цели",
      "Связывайте цели с конкретными проектами",
    ],
    category: "advanced",
    actionButton: {
      text: "Создать новую цель",
      action: () => {
        const element = document.querySelector('[data-section="strategy"]') as HTMLElement
        if (element) element.click()
      },
    },
  },
  {
    id: "active-projects",
    title: "Активные проекты - Управление портфелем проектов",
    description:
      "Kanban-доски, Gantt-диаграммы, трекинг времени и управление ресурсами команды с визуализацией прогресса.",
    detailedInfo:
      "Полноценная система управления проектами с созданием задач, назначением исполнителей, отслеживанием времени и бюджета. Поддержка методологий Agile, Scrum, Waterfall. Диаграмма Ганта для планирования временных рамок и зависимостей.",
    target: "projects-section",
    icon: <Briefcase className="w-5 h-5" />,
    tips: [
      "Используйте шаблоны проектов для быстрого старта",
      "Gantt-диаграммы помогают планировать ресурсы",
      "Настройте уведомления о приближающихся дедлайнах",
      "Отслеживайте загрузку команды для оптимального распределения",
    ],
    category: "advanced",
    actionButton: {
      text: "Создать новый проект",
      action: () => {
        const element = document.querySelector('[data-action="add-project"]') as HTMLElement
        if (element) element.click()
      },
    },
  },
  {
    id: "task-management",
    title: "Управление задачами - Детальное планирование работ",
    description:
      "Система создания, назначения и отслеживания задач с приоритизацией, дедлайнами и возможностью прикрепления файлов.",
    detailedInfo:
      "Модуль включает создание задач с детальным описанием, назначение исполнителей, установку приоритетов и дедлайнов. Поддержка подзадач, комментариев, прикрепления файлов и отслеживания времени выполнения.",
    target: "tasks-section",
    icon: <ClipboardList className="w-5 h-5" />,
    tips: [
      "Используйте приоритеты для фокусировки на важных задачах",
      "Прикрепляйте файлы для контекста задачи",
      "Настройте уведомления за день до дедлайна",
      "Используйте подзадачи для разбивки сложных работ",
    ],
    category: "basics",
    actionButton: {
      text: "Добавить задачу",
      action: () => {
        const element = document.querySelector('[data-action="add-task"]') as HTMLElement
        if (element) element.click()
      },
    },
  },
  {
    id: "finance-docs",
    title: "ФИНАНСЫ И ДОКУМЕНТООБОРОТ - Управление деньгами и документами",
    description:
      "Блок включает 4 модуля: Финансы, Продажи, ЭДО | Документооборот, Правовой контур для полного контроля финансов и документов.",
    detailedInfo:
      "Комплексное решение для финансового учета, управления продажами, электронного документооборота и правового сопровождения. Все модули интегрированы для автоматического обмена данными и обеспечения юридической значимости операций.",
    target: "finance-docs-section",
    icon: <DollarSign className="w-5 h-5" />,
    tips: [
      "Финансы автоматически учитывают данные из Продаж",
      "ЭДО обеспечивает юридическую значимость документов",
      "Правовой контур контролирует соблюдение требований",
      "Все модули работают синхронно для полного контроля",
    ],
    category: "advanced",
    actionButton: {
      text: "Открыть Финансы",
      action: () => {
        const element = document.querySelector('[data-section="finance"]') as HTMLElement
        if (element) element.click()
      },
    },
  },
  {
    id: "finance-management",
    title: "Финансы - Управление денежными потоками и бюджетом",
    description: "Учет доходов и расходов, планирование бюджета, финансовая аналитика и прогнозирование cash-flow.",
    detailedInfo:
      "Модуль включает управление транзакциями с автоматической категоризацией, создание финансовых отчетов, планирование бюджета по категориям и cash-flow анализ. Интеграция с банками для автоматического импорта операций.",
    target: "finance-section",
    icon: <DollarSign className="w-5 h-5" />,
    tips: [
      "Настройте автоматическую категоризацию расходов",
      "Используйте прогнозы для планирования крупных трат",
      "Анализируйте отчеты по прибыльности проектов",
      "Подключите банковские интеграции",
    ],
    category: "advanced",
    actionButton: {
      text: "Добавить транзакцию",
      action: () => {
        const element = document.querySelector('[data-action="add-transaction"]') as HTMLElement
        if (element) element.click()
      },
    },
  },
  {
    id: "sales-crm",
    title: "Продажи - CRM и управление сделками по менеджерам",
    description:
      "Воронка продаж, управление лидами, сегментация клиентов и детальная аналитика конверсий с разбивкой по менеджерам.",
    detailedInfo:
      "CRM-система с полным циклом продаж от лида до закрытия сделки. Включает сегментацию по менеджерам, автоматизацию процессов, скоринг лидов, детальную аналитику эффективности продаж и прогнозирование выручки.",
    target: "sales-section",
    icon: <TrendingUp className="w-5 h-5" />,
    tips: [
      "Используйте лид-скоринг для приоритизации клиентов",
      "Автоматизируйте рутинные задачи через воронки",
      "Анализируйте конверсию по этапам для каждого менеджера",
      "Настройте напоминания о следующих шагах",
    ],
    category: "advanced",
    actionButton: {
      text: "Добавить сделку",
      action: () => {
        const element = document.querySelector('[data-action="add-deal"]') as HTMLElement
        if (element) element.click()
      },
    },
  },
  {
    id: "edo-system",
    title: "ЭДО | Документооборот - Электронный документооборот без бумаги",
    description:
      "Полноценная система ЭДО с электронными подписями, маршрутами согласования и управлением контрагентами.",
    detailedInfo:
      "Система включает создание и подписание документов КЭП, настраиваемые маршруты согласования, управление контрагентами с проверкой по ИНН, архив документов с поиском и интеграцию с ФНС для юридической значимости.",
    target: "edo-section",
    icon: <FileText className="w-5 h-5" />,
    tips: [
      "Настройте типовые маршруты согласования",
      "Используйте шаблоны документов",
      "Регулярно обновляйте реквизиты контрагентов",
      "Настройте уведомления о документах для подписания",
    ],
    category: "expert",
    actionButton: {
      text: "Создать документ",
      action: () => {
        const element = document.querySelector('[data-section="edo"]') as HTMLElement
        if (element) element.click()
      },
    },
  },
  {
    id: "legal-compliance",
    title: "Правовой контур - Юридическое сопровождение бизнеса",
    description:
      "Управление договорами с загрузкой файлов, отслеживание лицензий, ведение судебных дел и правовая аналитика.",
    detailedInfo:
      "Модуль обеспечивает правовое сопровождение: реестр договоров с контролем сроков и загрузкой файлов, управление лицензиями и разрешениями, ведение судебных дел, библиотеку правовых шаблонов и риск-анализ.",
    target: "legal-section",
    icon: <Scale className="w-5 h-5" />,
    tips: [
      "Загружайте файлы договоров для централизованного хранения",
      "Настройте уведомления за месяц до истечения договоров",
      "Используйте правовые шаблоны для типовых документов",
      "Ведите календарь судебных заседаний",
    ],
    category: "expert",
    actionButton: {
      text: "Добавить договор",
      action: () => {
        const element = document.querySelector('[data-action="add-contract"]') as HTMLElement
        if (element) element.click()
      },
    },
  },
  {
    id: "hr-team",
    title: "КАДРЫ И КОМАНДА - Управление человеческими ресурсами",
    description:
      "Блок включает 3 модуля: HR и развитие команды, Команда, Роли и права для полного управления персоналом.",
    detailedInfo:
      "Комплексное HR-решение для управления сотрудниками, развития команды, контроля ролей и прав доступа. Включает организационную структуру, систему целей, процессы найма, обучения и оценки эффективности.",
    target: "hr-team-section",
    icon: <Users className="w-5 h-5" />,
    tips: [
      "HR и развитие команды управляет процессами развития",
      "Команда показывает текущий состав и загрузку",
      "Роли и права обеспечивают безопасность доступа",
      "Все модули интегрированы для полного HR-цикла",
    ],
    category: "advanced",
    actionButton: {
      text: "Открыть HR модуль",
      action: () => {
        const element = document.querySelector('[data-section="hr"]') as HTMLElement
        if (element) element.click()
      },
    },
  },
  {
    id: "hr-development",
    title: "HR и развитие команды - Управление персоналом",
    description:
      "Управление сотрудниками, редактируемая организационная структура, система целей команды и кадровые процессы.",
    detailedInfo:
      "Комплексный HR-модуль включает управление сотрудниками с детальными профилями, интерактивную организационную структуру с возможностью редактирования, систему индивидуальных целей, процессы найма и развития, оценку эффективности.",
    target: "hr-section",
    icon: <Users className="w-5 h-5" />,
    tips: [
      "Используйте оргструктуру для визуализации иерархии",
      "Настройте индивидуальные цели для каждого сотрудника",
      "Проводите регулярные оценки эффективности",
      "Отслеживайте процессы онбординга",
    ],
    category: "advanced",
    actionButton: {
      text: "Добавить сотрудника",
      action: () => {
        const element = document.querySelector('[data-action="add-employee"]') as HTMLElement
        if (element) element.click()
      },
    },
  },
  {
    id: "team-management",
    title: "Команда - Управление составом и ролями",
    description: "Просмотр состава команды, управление ролями сотрудников и распределение обязанностей по проектам.",
    detailedInfo:
      "Модуль предоставляет обзор всей команды с возможностью просмотра профилей, текущих проектов каждого сотрудника, их загрузки и эффективности. Интеграция с системой задач и проектов для полного контроля ресурсов.",
    target: "team-section",
    icon: <UserCheck className="w-5 h-5" />,
    tips: [
      "Отслеживайте загрузку сотрудников",
      "Используйте фильтры для поиска экспертов по навыкам",
      "Анализируйте эффективность команды по проектам",
      "Планируйте отпуска и отсутствия заранее",
    ],
    category: "basics",
    actionButton: {
      text: "Просмотреть команду",
      action: () => {
        const element = document.querySelector('[data-section="team"]') as HTMLElement
        if (element) element.click()
      },
    },
  },
  {
    id: "roles-permissions",
    title: "Роли и права - Система безопасности и доступа",
    description:
      "Управление ролями пользователей, настройка детальных прав доступа и обеспечение информационной безопасности.",
    detailedInfo:
      "Гибкая система ролей с возможностью создания кастомных ролей, настройки детальных разрешений на уровне модулей и функций, аудита действий пользователей и обеспечения соответствия требованиям безопасности.",
    target: "roles-section",
    icon: <Shield className="w-5 h-5" />,
    tips: [
      "Следуйте принципу минимальных привилегий",
      "Регулярно проводите аудит прав доступа",
      "Используйте группы ролей для упрощения управления",
      "Настройте уведомления о подозрительной активности",
    ],
    category: "expert",
    actionButton: {
      text: "Создать роль",
      action: () => {
        const element = document.querySelector('[data-action="create-role"]') as HTMLElement
        if (element) element.click()
      },
    },
  },
  {
    id: "ai-tools",
    title: "ИИ-ИНСТРУМЕНТЫ - Искусственный интеллект для бизнеса",
    description:
      "Блок включает 2 модуля: ИИ-Агент для бизнеса и ИИ-инструменты для автоматизации и оптимизации процессов.",
    detailedInfo:
      "Комплекс ИИ-решений для автоматизации бизнес-процессов, стратегического планирования, генерации контента и интеллектуальной аналитики. ИИ-Агент выступает как консультант и стратег, а ИИ-инструменты автоматизируют рутинные задачи.",
    target: "ai-tools-section",
    icon: <Brain className="w-5 h-5" />,
    tips: [
      "ИИ-Агент помогает в стратегическом планировании",
      "ИИ-инструменты автоматизируют рутинные процессы",
      "Используйте ИИ для анализа больших объемов данных",
      "Обучайте ИИ на корпоративных данных для лучших результатов",
    ],
    category: "advanced",
    actionButton: {
      text: "Открыть ИИ-Агента",
      action: () => {
        const element = document.querySelector('[data-section="ai-agent"]') as HTMLElement
        if (element) element.click()
      },
    },
  },
  {
    id: "ai-business-agent",
    title: "ИИ-Агент для бизнеса - Умный консультант и стратег",
    description:
      "Объединенный ИИ-помощник для бизнес-консультаций, стратегических рекомендаций, анализа трендов и планирования.",
    detailedInfo:
      "ИИ-Агент объединяет функции консультанта и стратега: анализирует данные компании, предлагает рекомендации по развитию, создает дорожные карты, отслеживает рыночные тренды, помогает в постановке целей и принятии стратегических решений.",
    target: "ai-agent-section",
    icon: <Brain className="w-5 h-5" />,
    tips: [
      "Задавайте конкретные вопросы для точных рекомендаций",
      "Используйте дорожную карту для долгосрочного планирования",
      "Регулярно обновляйте данные компании",
      "Применяйте рекомендации ИИ для оптимизации процессов",
    ],
    category: "advanced",
    actionButton: {
      text: "Задать вопрос ИИ",
      action: () => {
        const element = document.querySelector('[data-action="ask-ai"]') as HTMLElement
        if (element) element.click()
      },
    },
  },
  {
    id: "ai-tools-suite",
    title: "ИИ-инструменты - Автоматизация и оптимизация процессов",
    description:
      "Набор специализированных ИИ-инструментов: генерация контента, автоматизация процессов и интеллектуальная аналитика.",
    detailedInfo:
      "Комплекс ИИ-инструментов включает генератор контента для маркетинга, автоматизацию бизнес-процессов, интеллектуальную обработку документов, предиктивную аналитику, персонализацию пользовательского опыта и оптимизацию рабочих процессов.",
    target: "ai-tools-section",
    icon: <Zap className="w-5 h-5" />,
    tips: [
      "Начните с автоматизации простых повторяющихся процессов",
      "Обучайте ИИ-модели на корпоративных данных",
      "Мониторьте качество результатов",
      "Используйте A/B-тестирование для оценки эффективности",
    ],
    category: "advanced",
    actionButton: {
      text: "Запустить ИИ-инструмент",
      action: () => {
        const element = document.querySelector('[data-action="launch-ai-tool"]') as HTMLElement
        if (element) element.click()
      },
    },
  },
  {
    id: "marketing-clients",
    title: "МАРКЕТИНГ И КЛИЕНТЫ - Привлечение и удержание клиентов",
    description:
      "Модуль Маркетинг и клиенты для управления воронками, кампаниями, сегментацией аудитории и автоматизацией коммуникаций.",
    detailedInfo:
      "Комплексный маркетинговый модуль включает создание и управление воронками клиентов, запуск многоканальных кампаний, сегментацию аудитории, A/B-тестирование, лид-скоринг, email-маркетинг и детальную аналитику эффективности каналов привлечения.",
    target: "marketing-section",
    icon: <Megaphone className="w-5 h-5" />,
    tips: [
      "Используйте A/B-тесты для оптимизации конверсии",
      "Сегментируйте аудиторию для персонализированных кампаний",
      "Отслеживайте ROI по каждому каналу привлечения",
      "Автоматизируйте nurturing-последовательности",
    ],
    category: "expert",
    actionButton: {
      text: "Создать кампанию",
      action: () => {
        const element = document.querySelector('[data-section="marketing"]') as HTMLElement
        if (element) element.click()
      },
    },
  },
  {
    id: "system-management",
    title: "СИСТЕМА - Управление платформой и данными",
    description:
      "Блок включает 2 модуля: Файловое хранилище и Настройки для управления данными и конфигурацией системы.",
    detailedInfo:
      "Системный блок обеспечивает управление файлами и документами с версионностью и совместным доступом, а также комплексные настройки платформы включая профиль, безопасность, уведомления и интеграции.",
    target: "system-section",
    icon: <Settings className="w-5 h-5" />,
    tips: [
      "Файловое хранилище централизует все документы",
      "Настройки позволяют персонализировать платформу",
      "Регулярно проверяйте настройки безопасности",
      "Используйте версионность файлов для контроля изменений",
    ],
    category: "basics",
    actionButton: {
      text: "Открыть настройки",
      action: () => {
        const element = document.querySelector('[data-section="settings"]') as HTMLElement
        if (element) element.click()
      },
    },
  },
  {
    id: "file-storage",
    title: "Файловое хранилище - Централизованное управление документами",
    description:
      "Система управления файлами с версионностью, совместным доступом, поиском и интеграцией со всеми модулями.",
    detailedInfo:
      "Централизованное хранилище с поддержкой версий документов, настройкой прав доступа, совместной работой над файлами, автоматическим резервным копированием, полнотекстовым поиском и интеграцией со всеми модулями платформы.",
    target: "files-section",
    icon: <Database className="w-5 h-5" />,
    tips: [
      "Организуйте файлы в логичную структуру папок",
      "Используйте теги и метаданные для быстрого поиска",
      "Настройте автоматическое резервное копирование",
      "Контролируйте версии при совместной работе",
    ],
    category: "basics",
    actionButton: {
      text: "Загрузить файл",
      action: () => {
        const element = document.querySelector('[data-action="upload-file"]') as HTMLElement
        if (element) element.click()
      },
    },
  },
  {
    id: "system-settings",
    title: "Настройки - Персонализация и конфигурация системы",
    description:
      "Комплексные настройки платформы: профиль, уведомления, безопасность, интеграции и персонализация интерфейса.",
    detailedInfo:
      "Центр управления всеми настройками включает настройку профиля пользователя, систему уведомлений с фильтрами, параметры безопасности, управление интеграциями с внешними сервисами, персонализацию интерфейса и управление данными.",
    target: "settings-section",
    icon: <Settings className="w-5 h-5" />,
    tips: [
      "Настройте уведомления по важности и типам событий",
      "Регулярно обновляйте пароли и настройки безопасности",
      "Используйте двухфакторную аутентификацию",
      "Персонализируйте интерфейс под рабочие процессы",
    ],
    category: "basics",
    actionButton: {
      text: "Изменить настройки",
      action: () => {
        const element = document.querySelector('[data-action="open-settings"]') as HTMLElement
        if (element) element.click()
      },
    },
  },
  {
    id: "completion",
    title: "Поздравляем! Вы освоили всю платформу Рефрейм Бюро",
    description:
      "Теперь вы знаете все 6 блоков и 15+ модулей системы. Начинайте эффективную работу с любого модуля и используйте ИИ для автоматизации.",
    detailedInfo:
      "Рекомендуемый план действий: 1) Настройте профиль и добавьте команду в HR-модуле, 2) Определите стратегические цели в планировании, 3) Подключите финансовые интеграции для автоматического учета, 4) Активируйте ИИ-инструменты для автоматизации, 5) Создайте первые проекты и начните работу с полным контролем процессов.",
    target: "dashboard-header",
    icon: <Award className="w-5 h-5" />,
    tips: [
      "Начните с настройки основных данных компании и команды",
      "Используйте ИИ-Агента для получения стратегических рекомендаций",
      "Изучайте аналитику для принятия обоснованных решений",
      "Регулярно обновляйте цели и отслеживайте прогресс",
      "Автоматизируйте рутинные процессы с помощью ИИ-инструментов",
    ],
    category: "basics",
    actionButton: {
      text: "Начать работу",
      action: () => {
        const element = document.querySelector('[data-section="overview"]') as HTMLElement
        if (element) element.click()
      },
    },
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

  const handleActionButton = (step: TourStep) => {
    if (step.actionButton) {
      step.actionButton.action()
      setTimeout(() => {
        nextStep()
      }, 500)
    } else {
      nextStep()
    }
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
                onClick={() => handleActionButton(currentTourStep)}
                className="w-full text-2xl font-medium px-12 py-8 h-auto justify-between bg-primary hover:bg-primary/90"
                style={{ width: "100% !important", maxWidth: "none !important" }}
              >
                <span className="flex items-center gap-4">
                  <Lightbulb className="w-8 h-8" />
                  {currentTourStep.actionButton?.text || "Подробнее и перейти к следующему шагу"}
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
