"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

export function AIBusinessStrategist() {
  const [activeTab, setActiveTab] = useState("insights")
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [showInsightDetails, setShowInsightDetails] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)

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

  const runAIAnalysis = async () => {
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    // Симуляция ИИ-анализа
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

    // Добавляем новую рекомендацию
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
    setIsAnalyzing(false)
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
            ИИ-стратег бизнеса
          </h2>
          <p className="text-muted-foreground mt-1">
            Интеллектуальный анализ и стратегические рекомендации для роста вашего бизнеса
          </p>
        </div>
        <Button
          onClick={runAIAnalysis}
          disabled={isAnalyzing}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
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
        <TabsList className="grid w-full grid-cols-4">
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
            <Button variant="outline" size="sm">
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

      {/* Модальное окно деталей рекомендации */}
      {showInsightDetails && (
        <Dialog open={!!showInsightDetails} onOpenChange={() => setShowInsightDetails(null)}>
          <DialogContent className="max-w-2xl mx-4">
            {(() => {
              const insight = strategicInsights.find((i) => i.id === showInsightDetails)
              if (!insight) return null

              return (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${getCategoryColor(insight.category)}`}>
                        {getCategoryIcon(insight.category)}
                      </div>
                      <span>{insight.title}</span>
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Влияние на бизнес</Label>
                        <Badge className={getImpactColor(insight.impact)}>
                          {insight.impact === "high" ? "Высокое" : insight.impact === "medium" ? "Среднее" : "Низкое"}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <Label>Сложность внедрения</Label>
                        <Badge className={getImpactColor(insight.effort)}>
                          {insight.effort === "high" ? "Высокая" : insight.effort === "medium" ? "Средняя" : "Низкая"}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <Label>Ожидаемый ROI</Label>
                        <p className="text-lg font-bold text-green-600">{insight.estimatedROI}</p>
                      </div>
                      <div className="space-y-2">
                        <Label>Временные рамки</Label>
                        <p className="text-sm font-medium">{insight.timeframe}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Подробное описание</Label>
                      <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Уверенность ИИ</Label>
                      <div className="flex items-center space-x-2">
                        <Progress value={insight.aiConfidence} className="flex-1" />
                        <span className="text-sm font-medium">{insight.aiConfidence}%</span>
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-4">
                      <Button
                        onClick={() => handleInsightAction(insight.id, "implement")}
                        className="flex-1"
                        disabled={insight.status !== "new"}
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Внедрить
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleInsightAction(insight.id, "dismiss")}
                        className="flex-1"
                        disabled={insight.status !== "new"}
                      >
                        Отклонить
                      </Button>
                    </div>
                  </div>
                </>
              )
            })()}
          </DialogContent>
        </Dialog>
      )}

      {/* Модальное окно добавления цели */}
      {showAddGoal && (
        <Dialog open={showAddGoal} onOpenChange={setShowAddGoal}>
          <DialogContent className="max-w-md mx-4">
            <DialogHeader>
              <DialogTitle>Добавить стратегическую цель</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="goal-title">Название цели</Label>
                <Input
                  id="goal-title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="Увеличить выручку на 30%"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="goal-description">Описание</Label>
                <Textarea
                  id="goal-description"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  placeholder="Подробное описание цели и способов её достижения"
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="goal-target">Целевое значение</Label>
                  <Input
                    id="goal-target"
                    type="number"
                    value={newGoal.targetValue}
                    onChange={(e) => setNewGoal({ ...newGoal, targetValue: e.target.value })}
                    placeholder="1000000"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="goal-deadline">Срок достижения</Label>
                  <Input
                    id="goal-deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="goal-category">Категория</Label>
                <select
                  id="goal-category"
                  value={newGoal.category}
                  onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value as BusinessGoal["category"] })}
                  className="w-full mt-1 p-2 border border-border rounded-md bg-background text-sm"
                >
                  <option value="revenue">Выручка</option>
                  <option value="customers">Клиенты</option>
                  <option value="efficiency">Эффективность</option>
                  <option value="market">Рынок</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleAddGoal} className="flex-1">
                  Добавить цель
                </Button>
                <Button variant="outline" onClick={() => setShowAddGoal(false)} className="flex-1">
                  Отмена
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
