"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Target,
  TrendingUp,
  Users,
  Calendar,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Plus,
  Eye,
  MessageSquare,
  Lightbulb,
  Clock,
  Zap,
} from "lucide-react"

interface Goal {
  id: string
  title: string
  description: string
  type: "company" | "department" | "individual" | "project"
  level: "strategic" | "tactical" | "operational"
  owner: string
  department: string
  progress: number
  status: "on-track" | "at-risk" | "behind"
  startDate: string
  endDate: string
  keyResults: KeyResult[]
  comments: Comment[]
}

interface KeyResult {
  id: string
  title: string
  target: number
  current: number
  unit: string
  progress: number
}

interface Comment {
  id: string
  author: string
  text: string
  date: string
  type: "update" | "feedback" | "approval"
}

const StrategyDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [showGoalDetails, setShowGoalDetails] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [showWeeklyReport, setShowWeeklyReport] = useState(false)
  const [weeklyReport, setWeeklyReport] = useState({
    goalId: "",
    progress: "",
    achievements: "",
    challenges: "",
    nextWeekPlans: "",
  })
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    type: "company" as const,
    level: "strategic" as const,
    owner: "",
    department: "",
    endDate: "",
  })

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Увеличить выручку на 25%",
      description: "Достичь выручки 50 млн рублей к концу года",
      type: "company",
      level: "strategic",
      owner: "Иванов И.И.",
      department: "Продажи",
      progress: 68,
      status: "on-track",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      keyResults: [
        { id: "1", title: "Привлечь 100 новых клиентов", target: 100, current: 72, unit: "клиентов", progress: 72 },
        { id: "2", title: "Увеличить средний чек до 500к", target: 500000, current: 420000, unit: "₽", progress: 84 },
      ],
      comments: [
        {
          id: "1",
          author: "Петров П.П.",
          text: "Отличный прогресс по привлечению клиентов",
          date: "2024-08-15",
          type: "feedback",
        },
      ],
    },
    {
      id: "2",
      title: "Запустить новый продукт",
      description: "Разработать и вывести на рынок ИИ-помощника для малого бизнеса",
      type: "project",
      level: "tactical",
      owner: "Сидоров С.С.",
      department: "Разработка",
      progress: 45,
      status: "at-risk",
      startDate: "2024-03-01",
      endDate: "2024-10-31",
      keyResults: [
        { id: "3", title: "Завершить MVP", target: 100, current: 80, unit: "%", progress: 80 },
        { id: "4", title: "Провести тестирование", target: 50, current: 15, unit: "тестов", progress: 30 },
      ],
      comments: [],
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-track":
        return "text-green-600 bg-green-50"
      case "at-risk":
        return "text-yellow-600 bg-yellow-50"
      case "behind":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "on-track":
        return <CheckCircle className="w-4 h-4" />
      case "at-risk":
        return <AlertTriangle className="w-4 h-4" />
      case "behind":
        return <XCircle className="w-4 h-4" />
      default:
        return <Target className="w-4 h-4" />
    }
  }

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.description || !newGoal.owner || !newGoal.endDate) {
      alert("Пожалуйста, заполните все обязательные поля")
      return
    }

    const newGoalObject: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      type: newGoal.type,
      level: newGoal.level,
      owner: newGoal.owner,
      department: newGoal.department || "Общий",
      progress: 0,
      status: "on-track",
      startDate: new Date().toISOString().split("T")[0],
      endDate: newGoal.endDate,
      keyResults: [],
      comments: [],
    }

    setGoals([...goals, newGoalObject])

    // Показываем уведомление об успешном создании
    alert(`Цель "${newGoal.title}" успешно создана!`)

    setShowAddGoal(false)
    setNewGoal({
      title: "",
      description: "",
      type: "company",
      level: "strategic",
      owner: "",
      department: "",
      endDate: "",
    })
  }

  const handleGoalDetails = (goal: Goal) => {
    setSelectedGoal(goal)
    setShowGoalDetails(true)
  }

  const handleWeeklyReport = (goalId: string) => {
    setWeeklyReport({ ...weeklyReport, goalId })
    setShowWeeklyReport(true)
  }

  const submitWeeklyReport = () => {
    console.log("Еженедельный отчет отправлен:", weeklyReport)
    setShowWeeklyReport(false)
    setWeeklyReport({
      goalId: "",
      progress: "",
      achievements: "",
      challenges: "",
      nextWeekPlans: "",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">🎯 Стратегия и цели</h1>
          <p className="text-muted-foreground">Управление целями и ключевыми результатами компании</p>
        </div>
        <Dialog open={showAddGoal} onOpenChange={setShowAddGoal}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Новая цель
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Создание новой цели</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Название цели *</label>
                <Input
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="Введите название цели"
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Описание *</label>
                <Textarea
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  placeholder="Подробное описание цели"
                  className="mt-1"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Тип цели</label>
                  <Select value={newGoal.type} onValueChange={(value: any) => setNewGoal({ ...newGoal, type: value })}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="company">Корпоративная</SelectItem>
                      <SelectItem value="department">Отдел</SelectItem>
                      <SelectItem value="individual">Индивидуальная</SelectItem>
                      <SelectItem value="project">Проект</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Уровень</label>
                  <Select
                    value={newGoal.level}
                    onValueChange={(value: any) => setNewGoal({ ...newGoal, level: value })}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="strategic">Стратегический</SelectItem>
                      <SelectItem value="tactical">Тактический</SelectItem>
                      <SelectItem value="operational">Операционный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground">Ответственный *</label>
                  <Input
                    value={newGoal.owner}
                    onChange={(e) => setNewGoal({ ...newGoal, owner: e.target.value })}
                    placeholder="ФИО ответственного"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground">Отдел</label>
                  <Input
                    value={newGoal.department}
                    onChange={(e) => setNewGoal({ ...newGoal, department: e.target.value })}
                    placeholder="Название отдела"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Срок выполнения *</label>
                <Input
                  type="date"
                  value={newGoal.endDate}
                  onChange={(e) => setNewGoal({ ...newGoal, endDate: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 border dark:border-blue-800 p-3 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Совет:</strong> Формулируйте цели по принципу SMART: конкретные, измеримые, достижимые,
                  релевантные и ограниченные по времени.
                </p>
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowAddGoal(false)}>
                  Отмена
                </Button>
                <Button
                  onClick={handleAddGoal}
                  disabled={!newGoal.title || !newGoal.description || !newGoal.owner || !newGoal.endDate}
                >
                  Создать цель
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Всего целей</p>
                <p className="text-2xl font-bold">{goals.length}</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Выполнено</p>
                <p className="text-2xl font-bold text-green-600">{goals.filter((g) => g.progress === 100).length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">В процессе</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {goals.filter((g) => g.progress > 0 && g.progress < 100).length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Средний прогресс</p>
                <p className="text-2xl font-bold">
                  {Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length)}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="okr">OKR/KPI</TabsTrigger>
          <TabsTrigger value="projects">Проекты</TabsTrigger>
          <TabsTrigger value="individual">Личные</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
          <TabsTrigger value="archive">Архив</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {goals.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Пока нет целей</h3>
                <p className="text-muted-foreground mb-4">Создайте первую цель, чтобы начать отслеживать прогресс</p>
                <Button onClick={() => setShowAddGoal(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Создать цель
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {goals.map((goal) => (
                <Card key={goal.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                      </div>
                      <Badge className={`ml-2 ${getStatusColor(goal.status)}`}>
                        {getStatusIcon(goal.status)}
                        <span className="ml-1">
                          {goal.status === "on-track" ? "В плане" : goal.status === "at-risk" ? "Риск" : "Отстает"}
                        </span>
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Прогресс</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {goal.owner}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {new Date(goal.endDate).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleGoalDetails(goal)} className="flex-1">
                          <Eye className="w-4 h-4 mr-1" />
                          Подробнее
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleWeeklyReport(goal.id)}>
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Отчет
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="okr" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>OKR Структура</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-lg text-foreground">Компания</h3>
                  <p className="text-sm text-muted-foreground">Стратегические цели организации</p>
                  <div className="mt-2 space-y-2">
                    <div className="bg-blue-50 dark:bg-blue-900/20 border dark:border-blue-800 p-3 rounded-lg">
                      <p className="font-medium text-foreground">Увеличить выручку на 25%</p>
                      <Progress value={68} className="mt-2 h-2" />
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-lg text-foreground">Отделы</h3>
                  <p className="text-sm text-muted-foreground">Цели подразделений</p>
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-green-50 dark:bg-green-900/20 border dark:border-green-800 p-3 rounded-lg">
                      <p className="font-medium text-foreground">Продажи: +30% клиентов</p>
                      <Progress value={72} className="mt-2 h-2" />
                    </div>
                    <div className="bg-green-50 dark:bg-green-900/20 border dark:border-green-800 p-3 rounded-lg">
                      <p className="font-medium text-foreground">Разработка: 2 новых продукта</p>
                      <Progress value={45} className="mt-2 h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>План vs Факт</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Q1 2024</span>
                    <div className="flex space-x-2">
                      <Badge variant="outline">План: 85%</Badge>
                      <Badge className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200">
                        Факт: 92%
                      </Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Q2 2024</span>
                    <div className="flex space-x-2">
                      <Badge variant="outline">План: 75%</Badge>
                      <Badge className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200">
                        Факт: 68%
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI Рекомендации</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 border dark:border-blue-800 rounded-lg">
                    <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Цель "Увеличить продажи" слишком общая</p>
                      <p className="text-xs text-muted-foreground">Рекомендуем добавить конкретные метрики по SMART</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border dark:border-yellow-800 rounded-lg">
                    <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Риск невыполнения цели по разработке</p>
                      <p className="text-xs text-muted-foreground">
                        Текущий темп не позволит достичь результата в срок
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" variant="outline" className="text-xs bg-transparent">
                      Применить рекомендацию
                    </Button>
                    <Button size="sm" variant="ghost" className="text-xs">
                      Отклонить
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Цели проектов</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Цели, привязанные к активным проектам компании</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="individual">
          <Card>
            <CardHeader>
              <CardTitle>Индивидуальные цели</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Личные цели развития сотрудников</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archive">
          <Card>
            <CardHeader>
              <CardTitle>Архив целей</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">История выполненных целей и их результаты</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Goal Details Modal */}
      <Dialog open={showGoalDetails} onOpenChange={setShowGoalDetails}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedGoal?.title}</DialogTitle>
          </DialogHeader>
          {selectedGoal && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Описание</h3>
                  <p className="text-sm text-muted-foreground">{selectedGoal.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Детали</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Ответственный:</span>
                      <span>{selectedGoal.owner}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Отдел:</span>
                      <span>{selectedGoal.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Срок:</span>
                      <span>{new Date(selectedGoal.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Ключевые результаты</h3>
                <div className="space-y-3">
                  {selectedGoal.keyResults.map((kr) => (
                    <div key={kr.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{kr.title}</h4>
                        <Badge variant="outline">
                          {kr.current} / {kr.target} {kr.unit}
                        </Badge>
                      </div>
                      <Progress value={kr.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Комментарии и обратная связь</h3>
                <div className="space-y-3">
                  {selectedGoal.comments.length > 0 ? (
                    selectedGoal.comments.map((comment) => (
                      <div key={comment.id} className="border rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-sm">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">{comment.date}</span>
                        </div>
                        <p className="text-sm">{comment.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">Пока нет комментариев</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Weekly Report Modal */}
      <Dialog open={showWeeklyReport} onOpenChange={setShowWeeklyReport}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Еженедельный отчет по цели</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Прогресс за неделю (%)</label>
              <Input
                type="number"
                value={weeklyReport.progress}
                onChange={(e) => setWeeklyReport({ ...weeklyReport, progress: e.target.value })}
                placeholder="Введите прогресс в процентах"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Достижения</label>
              <Textarea
                value={weeklyReport.achievements}
                onChange={(e) => setWeeklyReport({ ...weeklyReport, achievements: e.target.value })}
                placeholder="Что удалось достичь за неделю?"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Проблемы и препятствия</label>
              <Textarea
                value={weeklyReport.challenges}
                onChange={(e) => setWeeklyReport({ ...weeklyReport, challenges: e.target.value })}
                placeholder="С какими трудностями столкнулись?"
                rows={3}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Планы на следующую неделю</label>
              <Textarea
                value={weeklyReport.nextWeekPlans}
                onChange={(e) => setWeeklyReport({ ...weeklyReport, nextWeekPlans: e.target.value })}
                placeholder="Что планируете сделать на следующей неделе?"
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowWeeklyReport(false)}>
                Отмена
              </Button>
              <Button onClick={submitWeeklyReport}>Отправить отчет</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default StrategyDashboard
export { StrategyDashboard }
