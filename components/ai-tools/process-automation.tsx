"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Zap, Pause, Settings, Clock, CheckCircle, AlertTriangle } from "lucide-react"

export function ProcessAutomation() {
  const [processes, setProcesses] = useState([
    {
      id: 1,
      name: "Обработка заявок клиентов",
      description: "Автоматическая сортировка и распределение входящих заявок",
      status: "active",
      frequency: "Каждые 5 минут",
      lastRun: "2 минуты назад",
      successRate: 98.5,
      tasksProcessed: 1247,
    },
    {
      id: 2,
      name: "Генерация отчетов продаж",
      description: "Еженедельные отчеты по продажам с аналитикой",
      status: "active",
      frequency: "Еженедельно",
      lastRun: "2 дня назад",
      successRate: 100,
      tasksProcessed: 52,
    },
    {
      id: 3,
      name: "Уведомления о просроченных задачах",
      description: "Отправка напоминаний о просроченных задачах команде",
      status: "paused",
      frequency: "Ежедневно",
      lastRun: "5 дней назад",
      successRate: 95.2,
      tasksProcessed: 89,
    },
  ])

  const [newProcess, setNewProcess] = useState({
    name: "",
    description: "",
    trigger: "",
    frequency: "",
  })

  const [showCreateForm, setShowCreateForm] = useState(false)

  const toggleProcess = (id: number) => {
    setProcesses(
      processes.map((process) =>
        process.id === id ? { ...process, status: process.status === "active" ? "paused" : "active" } : process,
      ),
    )
  }

  const createProcess = () => {
    if (!newProcess.name || !newProcess.description) return

    const process = {
      id: processes.length + 1,
      name: newProcess.name,
      description: newProcess.description,
      status: "active" as const,
      frequency: newProcess.frequency || "По требованию",
      lastRun: "Никогда",
      successRate: 0,
      tasksProcessed: 0,
    }

    setProcesses([...processes, process])
    setNewProcess({ name: "", description: "", trigger: "", frequency: "" })
    setShowCreateForm(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      case "paused":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
      case "error":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "paused":
        return <Pause className="w-4 h-4 text-yellow-600" />
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-600" />
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center text-foreground">
                <Zap className="w-5 h-5 mr-2 text-primary" />
                Автоматизация процессов
              </CardTitle>
              <CardDescription>Управляйте автоматизированными бизнес-процессами</CardDescription>
            </div>
            <Button onClick={() => setShowCreateForm(!showCreateForm)} className="bg-primary hover:bg-primary/90">
              Создать процесс
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-2xl font-bold text-primary">{processes.filter((p) => p.status === "active").length}</p>
              <p className="text-sm text-muted-foreground">Активных процессов</p>
            </div>
            <div className="text-center p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {processes.reduce((sum, p) => sum + p.tasksProcessed, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Задач обработано</p>
            </div>
            <div className="text-center p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {(processes.reduce((sum, p) => sum + p.successRate, 0) / processes.length).toFixed(1)}%
              </p>
              <p className="text-sm text-muted-foreground">Средний успех</p>
            </div>
          </div>

          {showCreateForm && (
            <Card className="mb-6 bg-background/50 border border-border/30">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Создать новый процесс</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Название процесса</label>
                  <Input
                    value={newProcess.name}
                    onChange={(e) => setNewProcess({ ...newProcess, name: e.target.value })}
                    placeholder="Например: Обработка заказов"
                    className="bg-background border-border/50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Описание</label>
                  <Textarea
                    value={newProcess.description}
                    onChange={(e) => setNewProcess({ ...newProcess, description: e.target.value })}
                    placeholder="Опишите, что делает этот процесс..."
                    className="bg-background border-border/50"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Триггер</label>
                    <Select
                      value={newProcess.trigger}
                      onValueChange={(value) => setNewProcess({ ...newProcess, trigger: value })}
                    >
                      <SelectTrigger className="bg-background border-border/50">
                        <SelectValue placeholder="Выберите триггер" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Новое письмо</SelectItem>
                        <SelectItem value="form">Заполнение формы</SelectItem>
                        <SelectItem value="schedule">По расписанию</SelectItem>
                        <SelectItem value="webhook">Webhook</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Частота</label>
                    <Select
                      value={newProcess.frequency}
                      onValueChange={(value) => setNewProcess({ ...newProcess, frequency: value })}
                    >
                      <SelectTrigger className="bg-background border-border/50">
                        <SelectValue placeholder="Выберите частоту" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">В реальном времени</SelectItem>
                        <SelectItem value="5min">Каждые 5 минут</SelectItem>
                        <SelectItem value="hourly">Каждый час</SelectItem>
                        <SelectItem value="daily">Ежедневно</SelectItem>
                        <SelectItem value="weekly">Еженедельно</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button onClick={createProcess} className="bg-primary hover:bg-primary/90">
                    Создать процесс
                  </Button>
                  <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                    Отмена
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {processes.map((process) => (
              <Card key={process.id} className="bg-background/50 border border-border/30">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        {getStatusIcon(process.status)}
                        <h3 className="text-lg font-semibold text-foreground">{process.name}</h3>
                        <Badge className={getStatusColor(process.status)}>
                          {process.status === "active"
                            ? "Активен"
                            : process.status === "paused"
                              ? "Приостановлен"
                              : "Ошибка"}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{process.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Частота</p>
                          <p className="font-medium text-foreground">{process.frequency}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Последний запуск</p>
                          <p className="font-medium text-foreground">{process.lastRun}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Успешность</p>
                          <p className="font-medium text-green-600">{process.successRate}%</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Обработано задач</p>
                          <p className="font-medium text-foreground">{process.tasksProcessed}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <Switch checked={process.status === "active"} onCheckedChange={() => toggleProcess(process.id)} />
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
