"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { DataAnalyzer } from "@/components/ai-tools/data-analyzer"
import {
  Brain,
  TrendingUp,
  Target,
  Lightbulb,
  Zap,
  Rocket,
  Eye,
  CheckCircle,
  AlertTriangle,
  Star,
  ArrowRight,
  Plus,
  Settings,
  Calendar,
  Activity,
  Shield,
  Sparkles,
  Bot,
  Send,
  User,
  MessageSquare,
  BarChart3,
  PieChart,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Clock,
} from "lucide-react"

interface StrategicInsight {
  id: string
  title: string
  description: string
  impact: "high" | "medium" | "low"
  effort: "high" | "medium" | "low"
  category: "growth" | "efficiency" | "innovation" | "risk"
  priority: number
  estimatedROI: string
  timeframe: string
  status: "new" | "in-progress" | "completed" | "dismissed"
  aiConfidence: number
}

interface BusinessGoal {
  id: string
  title: string
  description: string
  targetValue: number
  currentValue: number
  deadline: string
  category: "revenue" | "customers" | "efficiency" | "market"
  status: "active" | "completed" | "paused"
  milestones: { title: string; completed: boolean; date: string }[]
}

interface MarketTrend {
  id: string
  trend: string
  impact: "positive" | "negative" | "neutral"
  relevance: number
  description: string
  actionRequired: boolean
}

interface ChatMessage {
  id: number
  type: "user" | "bot"
  message: string
  timestamp: Date
}

export function AIBusinessAgent() {
  const [activeTab, setActiveTab] = useState("chat")
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [showInsightDetails, setShowInsightDetails] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)

  // Chat states
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: "bot",
      message:
        "Добро пожаловать в ИИ-агент для бизнеса! Я помогу оптимизировать ваш бизнес, создать стратегию роста и ответить на любые вопросы. С чего начнем?",
      timestamp: new Date(),
    },
  ])

  const [strategicInsights, setStrategicInsights] = useState<StrategicInsight[]>([
    {
      id: "1",
      title: "Автоматизация клиентского сервиса",
      description:
        "Внедрение ИИ-чатбота для обработки 80% запросов клиентов, что освободит команду для более сложных задач",
      impact: "high",
      effort: "medium",
      category: "efficiency",
      priority: 1,
      estimatedROI: "340%",
      timeframe: "2-3 месяца",
      status: "new",
      aiConfidence: 92,
    },
    {
      id: "2",
      title: "Расширение в B2B сегмент",
      description:
        "Анализ показывает высокий потенциал в корпоративном сегменте с возможностью увеличения среднего чека в 5 раз",
      impact: "high",
      effort: "high",
      category: "growth",
      priority: 2,
      estimatedROI: "280%",
      timeframe: "4-6 месяцев",
      status: "new",
      aiConfidence: 87,
    },
    {
      id: "3",
      title: "Оптимизация воронки продаж",
      description: "Выявлены узкие места в воронке. Улучшение конверсии на 15% через персонализацию контента",
      impact: "medium",
      effort: "low",
      category: "efficiency",
      priority: 3,
      estimatedROI: "180%",
      timeframe: "1-2 месяца",
      status: "in-progress",
      aiConfidence: 94,
    },
    {
      id: "4",
      title: "Внедрение предиктивной аналитики",
      description: "Использование ИИ для прогнозирования поведения клиентов и предотвращения оттока",
      impact: "high",
      effort: "medium",
      category: "innovation",
      priority: 4,
      estimatedROI: "220%",
      timeframe: "3-4 месяца",
      status: "new",
      aiConfidence: 89,
    },
  ])

  const [businessGoals, setBusinessGoals] = useState<BusinessGoal[]>([
    {
      id: "1",
      title: "Увеличить выручку на 50%",
      description: "Достичь месячной выручки 3.6М ₽ к концу квартала",
      targetValue: 3600000,
      currentValue: 2400000,
      deadline: "2024-06-30",
      category: "revenue",
      status: "active",
      milestones: [
        { title: "Запуск новой рекламной кампании", completed: true, date: "2024-01-15" },
        { title: "Внедрение системы лояльности", completed: true, date: "2024-02-01" },
        { title: "Расширение команды продаж", completed: false, date: "2024-03-01" },
        { title: "Запуск B2B направления", completed: false, date: "2024-04-01" },
      ],
    },
    {
      id: "2",
      title: "Автоматизировать 70% процессов",
      description: "Внедрить ИИ-решения для ключевых бизнес-процессов",
      targetValue: 70,
      currentValue: 45,
      deadline: "2024-05-31",
      category: "efficiency",
      status: "active",
      milestones: [
        { title: "Автоматизация обработки заявок", completed: true, date: "2024-01-20" },
        { title: "ИИ-чатбот для поддержки", completed: false, date: "2024-03-15" },
        { title: "Автоматические отчеты", completed: false, date: "2024-04-15" },
      ],
    },
    {
      id: "3",
      title: "Расширить клиентскую базу",
      description: "Привлечь 500 новых активных клиентов",
      targetValue: 500,
      currentValue: 320,
      deadline: "2024-07-31",
      category: "customers",
      status: "active",
      milestones: [
        { title: "Запуск реферальной программы", completed: true, date: "2024-01-10" },
        { title: "Партнерство с агентствами", completed: false, date: "2024-03-01" },
        { title: "Контент-маркетинг стратегия", completed: false, date: "2024-04-01" },
      ],
    },
  ])

  const [marketTrends, setMarketTrends] = useState<MarketTrend[]>([
    {
      id: "1",
      trend: "Рост спроса на ИИ-решения в малом бизнесе",
      impact: "positive",
      relevance: 95,
      description: "Малый и средний бизнес активно внедряет ИИ-технологии для повышения эффективности",
      actionRequired: true,
    },
    {
      id: "2",
      trend: "Усиление требований к кибербезопасности",
      impact: "neutral",
      relevance: 78,
      description: "Новые регулятивные требования к защите данных клиентов",
      actionRequired: true,
    },
    {
      id: "3",
      trend: "Переход к подписочной модели",
      impact: "positive",
      relevance: 85,
      description: "Клиенты предпочитают SaaS-решения с ежемесячной оплатой",
      actionRequired: false,
    },
  ])

  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    targetValue: "",
    deadline: "",
    category: "revenue" as BusinessGoal["category"],
  })

  const handleImplementRecommendation = (recommendation: any) => {
    setNotification({
      type: "success",
      message: `Рекомендация "${recommendation.title}" добавлена в план внедрения`,
    })
    setTimeout(() => setNotification(null), 3000)
  }

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      type: "user",
      message: message.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentMessage = message.trim()
    setMessage("")
    setIsLoading(true)

    try {
      // Симуляция ответа ИИ-агента
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const businessResponses = [
        "Отличный вопрос! Для оптимизации вашего бизнеса рекомендую начать с анализа текущих процессов. Какие задачи занимают больше всего времени у вашей команды?",
        "Исходя из анализа рынка, вижу потенциал для роста в вашей нише. Рассмотрите внедрение ИИ-инструментов для автоматизации рутинных операций.",
        "Для увеличения эффективности предлагаю сосредоточиться на трех ключевых областях: автоматизация, персонализация клиентского опыта и аналитика данных.",
        "Ваш запрос касается стратегического планирования. Рекомендую создать дорожную карту с четкими KPI и временными рамками. Хотите обсудить конкретные цели?",
        "Анализируя тренды рынка, вижу возможности для масштабирования. Расскажите больше о вашей текущей бизнес-модели?",
        "Для решения этой задачи можно использовать ИИ-решения. Они помогут сократить время на обработку данных на 60-80% и повысить точность прогнозов.",
      ]

      const randomResponse = businessResponses[Math.floor(Math.random() * businessResponses.length)]

      const botResponse: ChatMessage = {
        id: messages.length + 2,
        type: "bot",
        message: randomResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      console.error("Chat Error:", error)
      const botResponse: ChatMessage = {
        id: messages.length + 2,
        type: "bot",
        message: "Извините, произошла ошибка. Попробуйте переформулировать вопрос.",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const runAIAnalysis = async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    const steps = [
      "Анализ текущих метрик...",
      "Изучение рыночных трендов...",
      "Оценка конкурентной среды...",
      "Генерация стратегических рекомендаций...",
      "Расчет потенциального ROI...",
      "Формирование плана действий...",
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setAnalysisProgress(((i + 1) / steps.length) * 100)
    }

    const newInsight: StrategicInsight = {
      id: Date.now().toString(),
      title: "Персонализация пользовательского опыта",
      description: "ИИ-анализ показывает возможность увеличения конверсии на 25% через персонализацию интерфейса",
      impact: "high",
      effort: "medium",
      category: "innovation",
      priority: 1,
      estimatedROI: "310%",
      timeframe: "2-3 месяца",
      status: "new",
      aiConfidence: 91,
    }

    setStrategicInsights([newInsight, ...strategicInsights])

    const detailedResults = {
      businessMetrics: {
        revenue: { current: 2400000, target: 3600000, growth: 15.2, trend: "up" },
        customers: { current: 1247, target: 1800, growth: 8.7, trend: "up" },
        conversion: { current: 3.2, target: 4.5, growth: -2.1, trend: "down" },
        retention: { current: 78, target: 85, growth: 5.3, trend: "up" },
      },
      marketAnalysis: {
        competitorGrowth: 12.5,
        marketSize: 45000000,
        marketShare: 2.8,
        opportunities: [
          "Рост спроса на ИИ-решения в SMB сегменте на 340%",
          "Недостаток персонализированных решений у конкурентов",
          "Возможность захвата 15% рынка автоматизации",
        ],
      },
      recommendations: [
        {
          title: "Внедрить ИИ-персонализацию",
          impact: "Увеличение конверсии на 25%",
          effort: "2-3 месяца",
          roi: "310%",
        },
        {
          title: "Автоматизировать клиентский сервис",
          impact: "Сокращение затрат на 40%",
          effort: "1-2 месяца",
          roi: "280%",
        },
        {
          title: "Запустить B2B направление",
          impact: "Рост выручки на 60%",
          effort: "4-6 месяцев",
          roi: "450%",
        },
      ],
      riskAnalysis: [
        { risk: "Усиление конкуренции", probability: 75, impact: "medium" },
        { risk: "Изменение регулирования", probability: 45, impact: "low" },
        { risk: "Экономический спад", probability: 30, impact: "high" },
      ],
    }

    setAnalysisResults(detailedResults)
    setIsAnalyzing(false)
  }

  const runDetailedAnalysis = async () => {
    setShowDetailedAnalysis(true)
    await runAIAnalysis()
  }

  const handleInsightAction = (insightId: string, action: "implement" | "dismiss") => {
    setStrategicInsights(
      strategicInsights.map((insight) =>
        insight.id === insightId
          ? { ...insight, status: action === "implement" ? "in-progress" : "dismissed" }
          : insight,
      ),
    )
  }

  const handleAddGoal = () => {
    if (newGoal.title && newGoal.targetValue && newGoal.deadline) {
      const goal: BusinessGoal = {
        id: Date.now().toString(),
        title: newGoal.title,
        description: newGoal.description,
        targetValue: Number.parseInt(newGoal.targetValue),
        currentValue: 0,
        deadline: newGoal.deadline,
        category: newGoal.category,
        status: "active",
        milestones: [],
      }
      setBusinessGoals([...businessGoals, goal])
      setNewGoal({ title: "", description: "", targetValue: "", deadline: "", category: "revenue" })
      setShowAddGoal(false)
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-500/10 text-red-600 border-red-500/30"
      case "medium":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/30"
      case "low":
        return "bg-green-500/10 text-green-600 border-green-500/30"
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/30"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "growth":
        return <TrendingUp className="w-4 h-4" />
      case "efficiency":
        return <Zap className="w-4 h-4" />
      case "innovation":
        return <Lightbulb className="w-4 h-4" />
      case "risk":
        return <Shield className="w-4 h-4" />
      default:
        return <Target className="w-4 h-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "growth":
        return "text-green-600"
      case "efficiency":
        return "text-blue-600"
      case "innovation":
        return "text-purple-600"
      case "risk":
        return "text-orange-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center">
            <div className="p-2 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl mr-3">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            ИИ-Агент для бизнеса
          </h2>
          <p className="text-muted-foreground mt-1">Персональный ИИ-консультант и стратег для роста вашего бизнеса</p>
        </div>
        <Button
          onClick={runAIAnalysis}
          disabled={isAnalyzing}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 dark:from-purple-500 dark:to-blue-500 dark:hover:from-purple-600 dark:hover:to-blue-500 text-white shadow-lg"
        >
          {isAnalyzing ? (
            <>
              <Activity className="w-4 h-4 mr-2 animate-spin" />
              Анализирую...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Запустить ИИ-анализ
            </>
          )}
        </Button>
      </div>

      {isAnalyzing && (
        <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">ИИ анализирует ваш бизнес...</span>
                <span className="text-sm text-muted-foreground">{Math.round(analysisProgress)}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Анализируем метрики, тренды рынка и генерируем персональные рекомендации
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="chat" className="flex items-center">
            <MessageSquare className="w-4 h-4 mr-2" />
            Консультант
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center">
            <BarChart3 className="w-4 h-4 mr-2" />
            Анализ
          </TabsTrigger>
          <TabsTrigger value="insights" className="flex items-center">
            <Lightbulb className="w-4 h-4 mr-2" />
            Рекомендации
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center">
            <Target className="w-4 h-4 mr-2" />
            Цели
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" />
            Тренды
          </TabsTrigger>
          <TabsTrigger value="roadmap" className="flex items-center">
            <Rocket className="w-4 h-4 mr-2" />
            Дорожная карта
          </TabsTrigger>
        </TabsList>

        {/* ... existing TabsContent for chat ... */}
        <TabsContent value="chat" className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50 h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <Bot className="w-5 h-5 mr-2 text-primary" />
                ИИ-консультант по бизнесу
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Задавайте вопросы о стратегии, процессах, автоматизации и росте бизнеса
              </p>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 mb-4 p-4 bg-background/50 rounded-lg">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`flex items-start space-x-2 max-w-[85%]`}>
                        {msg.type === "bot" && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div
                          className={`p-3 rounded-lg ${
                            msg.type === "user"
                              ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                              : "bg-card/80 text-foreground border border-border/30"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{msg.message}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                        {msg.type === "user" && (
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2 max-w-[85%]">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-card/80 text-foreground border border-border/30 p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-primary rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-primary rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
              <div className="flex space-x-2">
                <Input
                  placeholder="Спросите о развитии бизнеса, стратегии, автоматизации..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="bg-background/50 border-border/50"
                />
                <Button onClick={handleSendMessage} disabled={!message.trim() || isLoading} size="icon">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Комплексный бизнес-анализ</h3>
            <div className="flex gap-2">
              <Button
                onClick={runDetailedAnalysis}
                disabled={isAnalyzing}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:text-white"
              >
                {isAnalyzing ? (
                  <>
                    <Activity className="w-4 h-4 mr-2 animate-spin" />
                    Анализирую...
                  </>
                ) : (
                  <>
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Запустить полный анализ
                  </>
                )}
              </Button>
            </div>
          </div>

          {analysisResults && (
            <div className="space-y-6">
              {/* Ключевые метрики */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Выручка</p>
                        <p className="text-2xl font-bold text-foreground">
                          {(analysisResults.businessMetrics.revenue.current / 1000000).toFixed(1)}М ₽
                        </p>
                        <div className="flex items-center mt-1">
                          <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                          <span className="text-xs text-green-600 font-medium">
                            +{analysisResults.businessMetrics.revenue.growth}%
                          </span>
                        </div>
                      </div>
                      <DollarSign className="w-8 h-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Клиенты</p>
                        <p className="text-2xl font-bold text-foreground">
                          {analysisResults.businessMetrics.customers.current.toLocaleString()}
                        </p>
                        <div className="flex items-center mt-1">
                          <TrendingUp className="w-3 h-3 text-blue-600 mr-1" />
                          <span className="text-xs text-blue-600 font-medium">
                            +{analysisResults.businessMetrics.customers.growth}%
                          </span>
                        </div>
                      </div>
                      <Users className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Конверсия</p>
                        <p className="text-2xl font-bold text-foreground">
                          {analysisResults.businessMetrics.conversion.current}%
                        </p>
                        <div className="flex items-center mt-1">
                          <TrendingDown className="w-3 h-3 text-red-600 mr-1" />
                          <span className="text-xs text-red-600 font-medium">
                            {analysisResults.businessMetrics.conversion.growth}%
                          </span>
                        </div>
                      </div>
                      <ShoppingCart className="w-8 h-8 text-red-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Удержание</p>
                        <p className="text-2xl font-bold text-foreground">
                          {analysisResults.businessMetrics.retention.current}%
                        </p>
                        <div className="flex items-center mt-1">
                          <TrendingUp className="w-3 h-3 text-purple-600 mr-1" />
                          <span className="text-xs text-purple-600 font-medium">
                            +{analysisResults.businessMetrics.retention.growth}%
                          </span>
                        </div>
                      </div>
                      <Clock className="w-8 h-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Рыночный анализ */}
              <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-primary" />
                    Анализ рынка
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{analysisResults.marketAnalysis.marketShare}%</p>
                      <p className="text-sm text-muted-foreground">Доля рынка</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        {(analysisResults.marketAnalysis.marketSize / 1000000).toFixed(0)}М ₽
                      </p>
                      <p className="text-sm text-muted-foreground">Размер рынка</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        +{analysisResults.marketAnalysis.competitorGrowth}%
                      </p>
                      <p className="text-sm text-muted-foreground">Рост конкурентов</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Рыночные возможности:</h4>
                    <div className="space-y-2">
                      {analysisResults.marketAnalysis.opportunities.map((opportunity: string, index: number) => (
                        <div key={index} className="flex items-start space-x-2 p-3 bg-primary/5 rounded-lg">
                          <Lightbulb className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-foreground">{opportunity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* ИИ-рекомендации */}
              <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-primary" />
                    ИИ-рекомендации по росту
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analysisResults.recommendations.map((rec: any, index: number) => (
                      <div
                        key={index}
                        className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-foreground">{rec.title}</h4>
                          <Badge className="bg-green-500/10 text-green-600 border-green-500/30">ROI: {rec.roi}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{rec.impact}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Срок: {rec.effort}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-7 bg-transparent"
                            onClick={() => handleImplementRecommendation(rec)}
                          >
                            <ArrowRight className="w-3 h-3 mr-1" />
                            Внедрить
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Анализ рисков */}
              <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-primary" />
                    Анализ рисков
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {analysisResults.riskAnalysis.map((risk: any, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border/30"
                      >
                        <div className="flex items-center space-x-3">
                          <AlertTriangle
                            className={`w-4 h-4 ${
                              risk.impact === "high"
                                ? "text-red-600"
                                : risk.impact === "medium"
                                  ? "text-yellow-600"
                                  : "text-green-600"
                            }`}
                          />
                          <div>
                            <p className="text-sm font-medium text-foreground">{risk.risk}</p>
                            <p className="text-xs text-muted-foreground">Вероятность: {risk.probability}%</p>
                          </div>
                        </div>
                        <Badge
                          className={
                            risk.impact === "high"
                              ? "bg-red-500/10 text-red-600 border-red-500/30"
                              : risk.impact === "medium"
                                ? "bg-yellow-500/10 text-yellow-600 border-yellow-500/30"
                                : "bg-green-500/10 text-green-600 border-green-500/30"
                          }
                        >
                          {risk.impact === "high" ? "Высокий" : risk.impact === "medium" ? "Средний" : "Низкий"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Интеграция с DataAnalyzer */}
          {!analysisResults && (
            <div className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                    Анализатор данных
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-2">
                    Загрузите данные для получения детального анализа и персональных рекомендаций
                  </p>
                </CardHeader>
                <CardContent>
                  <DataAnalyzer />
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* ... existing code for other tabs ... */}
        <TabsContent value="insights" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Стратегические рекомендации ИИ</h3>
            <Badge variant="secondary" className="bg-purple-500/10 text-purple-600">
              {strategicInsights.filter((i) => i.status === "new").length} новых
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {strategicInsights
              .sort((a, b) => a.priority - b.priority)
              .map((insight) => (
                <Card
                  key={insight.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    insight.status === "new"
                      ? "border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-blue-500/5"
                      : insight.status === "in-progress"
                        ? "border-blue-500/30 bg-blue-500/5"
                        : insight.status === "completed"
                          ? "border-green-500/30 bg-green-500/5"
                          : "border-gray-500/30 bg-gray-500/5"
                  }`}
                  onClick={() => setShowInsightDetails(insight.id)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`p-1 rounded-lg ${getCategoryColor(insight.category)}`}>
                            {getCategoryIcon(insight.category)}
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground text-sm">{insight.title}</h4>
                            <p className="text-xs text-muted-foreground">
                              ROI: {insight.estimatedROI} • {insight.timeframe}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Badge className={getImpactColor(insight.impact)} variant="outline">
                            {insight.impact === "high" ? "Высокий" : insight.impact === "medium" ? "Средний" : "Низкий"}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {insight.aiConfidence}%
                          </Badge>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground line-clamp-2">{insight.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            Приоритет {insight.priority}
                          </Badge>
                          {insight.status === "new" && (
                            <Badge className="bg-purple-500/10 text-purple-600 text-xs">Новое</Badge>
                          )}
                          {insight.status === "in-progress" && (
                            <Badge className="bg-blue-500/10 text-blue-600 text-xs">В работе</Badge>
                          )}
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 px-2">
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        {/* ... existing code for goals, trends, roadmap tabs ... */}
        <TabsContent value="goals" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Стратегические цели</h3>
            <Button onClick={() => setShowAddGoal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Добавить цель
            </Button>
          </div>

          <div className="space-y-4">
            {businessGoals.map((goal) => {
              const progress = (goal.currentValue / goal.targetValue) * 100
              const completedMilestones = goal.milestones.filter((m) => m.completed).length
              const totalMilestones = goal.milestones.length

              return (
                <Card key={goal.id} className="bg-card/50 backdrop-blur-sm border border-border/50">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground">{goal.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={goal.status === "active" ? "default" : "secondary"} className="mb-2">
                            {goal.status === "active" ? "Активная" : "Завершена"}
                          </Badge>
                          <p className="text-sm text-muted-foreground">
                            До {new Date(goal.deadline).toLocaleDateString("ru-RU")}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Прогресс</span>
                          <span className="text-sm font-medium">
                            {goal.category === "revenue"
                              ? `${goal.currentValue.toLocaleString()} / ${goal.targetValue.toLocaleString()} ₽`
                              : `${goal.currentValue} / ${goal.targetValue}${goal.category === "efficiency" ? "%" : ""}`}
                          </span>
                        </div>
                        <Progress value={Math.min(progress, 100)} className="h-2" />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{Math.round(progress)}% выполнено</span>
                          <span>
                            {completedMilestones}/{totalMilestones} этапов
                          </span>
                        </div>
                      </div>

                      {goal.milestones.length > 0 && (
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium">Ключевые этапы:</h5>
                          <div className="space-y-1">
                            {goal.milestones.slice(0, 3).map((milestone, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm">
                                {milestone.completed ? (
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                ) : (
                                  <div className="w-4 h-4 border-2 border-muted rounded-full" />
                                )}
                                <span
                                  className={
                                    milestone.completed ? "text-muted-foreground line-through" : "text-foreground"
                                  }
                                >
                                  {milestone.title}
                                </span>
                                <span className="text-xs text-muted-foreground ml-auto">
                                  {new Date(milestone.date).toLocaleDateString("ru-RU")}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Рыночные тренды и возможности</h3>
            <Badge variant="secondary">Обновлено сегодня</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketTrends.map((trend) => (
              <Card key={trend.id} className="bg-card/50 backdrop-blur-sm border border-border/50">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        {trend.impact === "positive" ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : trend.impact === "negative" ? (
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                        ) : (
                          <Activity className="w-4 h-4 text-blue-600" />
                        )}
                        <Badge
                          variant="outline"
                          className={
                            trend.impact === "positive"
                              ? "border-green-500/30 text-green-600"
                              : trend.impact === "negative"
                                ? "border-red-500/30 text-red-600"
                                : "border-blue-500/30 text-blue-600"
                          }
                        >
                          {trend.impact === "positive"
                            ? "Возможность"
                            : trend.impact === "negative"
                              ? "Угроза"
                              : "Нейтрально"}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span className="text-xs font-medium">{trend.relevance}%</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground text-sm mb-1">{trend.trend}</h4>
                      <p className="text-xs text-muted-foreground">{trend.description}</p>
                    </div>

                    {trend.actionRequired && (
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-3 h-3 text-orange-500" />
                        <span className="text-xs text-orange-600 font-medium">Требует действий</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Стратегическая дорожная карта</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // Открываем модальное окно настроек дорожной карты
                alert("Настройки дорожной карты: здесь можно настроить временные периоды, приоритеты и категории задач")
              }}
            >
              <Settings className="w-4 h-4 mr-2" />
              Настроить
            </Button>
          </div>

          <div className="space-y-6">
            {["Ближайший месяц", "Следующие 3 месяца", "Долгосрочная перспектива"].map((period, periodIndex) => (
              <div key={period} className="space-y-3">
                <h4 className="font-medium text-foreground flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-primary" />
                  {period}
                </h4>
                <div className="space-y-2 pl-6 border-l-2 border-primary/20">
                  {strategicInsights
                    .filter((insight) => {
                      if (periodIndex === 0) return insight.timeframe.includes("1-2")
                      if (periodIndex === 1)
                        return insight.timeframe.includes("2-3") || insight.timeframe.includes("3-4")
                      return insight.timeframe.includes("4-6") || insight.timeframe.includes("6+")
                    })
                    .slice(0, 3)
                    .map((insight) => (
                      <div
                        key={insight.id}
                        className="flex items-center justify-between p-3 bg-card/30 rounded-lg border border-border/30"
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-1 rounded ${getCategoryColor(insight.category)}`}>
                            {getCategoryIcon(insight.category)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{insight.title}</p>
                            <p className="text-xs text-muted-foreground">ROI: {insight.estimatedROI}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getImpactColor(insight.impact)} variant="outline">
                            {insight.impact === "high" ? "Высокий" : insight.impact === "medium" ? "Средний" : "Низкий"}
                          </Badge>
                          <Button variant="ghost" size="sm" className="h-6 px-2">
                            <ArrowRight className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
