"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Plus,
  CalendarIcon,
  CheckCircle2,
  Circle,
  AlertCircle,
  MoreHorizontal,
  MessageSquare,
  Paperclip,
  Upload,
  X,
  FileText,
} from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  assignee: {
    id: string
    name: string
    avatar?: string
  }
  priority: "low" | "medium" | "high" | "urgent"
  status: "todo" | "in-progress" | "review" | "completed"
  dueDate: Date
  createdAt: Date
  progress: number
  tags: string[]
  comments: number
  attachments: number
  files?: File[]
}

interface TeamMember {
  id: string
  name: string
  avatar?: string
  role: string
}

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Настройка ИИ-чатбота для сайта",
      description: "Интеграция и настройка чатбота с базой знаний компании",
      assignee: { id: "1", name: "Анна Петрова", avatar: "/team-1.jpg" },
      priority: "high",
      status: "in-progress",
      dueDate: new Date(2024, 11, 25),
      createdAt: new Date(2024, 11, 15),
      progress: 75,
      tags: ["ИИ", "Веб-разработка"],
      comments: 3,
      attachments: 2,
      files: [],
    },
    {
      id: "2",
      title: "Анализ клиентской базы",
      description: "Сегментация клиентов и создание персонализированных предложений",
      assignee: { id: "2", name: "Михаил Иванов", avatar: "/team-2.jpg" },
      priority: "medium",
      status: "todo",
      dueDate: new Date(2024, 11, 30),
      createdAt: new Date(2024, 11, 16),
      progress: 0,
      tags: ["Аналитика", "CRM"],
      comments: 1,
      attachments: 0,
      files: [],
    },
    {
      id: "3",
      title: "Оптимизация процессов продаж",
      description: "Автоматизация воронки продаж с помощью ИИ-инструментов",
      assignee: { id: "3", name: "Елена Сидорова", avatar: "/team-3.jpg" },
      priority: "urgent",
      status: "review",
      dueDate: new Date(2024, 11, 20),
      createdAt: new Date(2024, 11, 10),
      progress: 90,
      tags: ["Продажи", "Автоматизация"],
      comments: 5,
      attachments: 3,
      files: [],
    },
  ])

  const [showCreateTask, setShowCreateTask] = useState(false)
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assigneeId: "",
    priority: "medium" as const,
    dueDate: new Date(),
    tags: "",
    files: [] as File[],
  })

  const [dragActive, setDragActive] = useState(false)

  const teamMembers: TeamMember[] = [
    { id: "1", name: "Анна Петрова", avatar: "/team-1.jpg", role: "ИИ-разработчик" },
    { id: "2", name: "Михаил Иванов", avatar: "/team-2.jpg", role: "Аналитик данных" },
    { id: "3", name: "Елена Сидорова", avatar: "/team-3.jpg", role: "Менеджер продаж" },
    { id: "4", name: "Дмитрий Козлов", avatar: "/team-4.jpg", role: "UX/UI дизайнер" },
  ]

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files)
      setNewTask((prev) => ({
        ...prev,
        files: [...prev.files, ...fileArray],
      }))
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    handleFileUpload(e.dataTransfer.files)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const removeFile = (index: number) => {
    setNewTask((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      case "in-progress":
        return <Circle className="w-4 h-4 text-blue-500 animate-pulse" />
      case "review":
        return <AlertCircle className="w-4 h-4 text-orange-500" />
      default:
        return <Circle className="w-4 h-4 text-gray-400" />
    }
  }

  const handleCreateTask = () => {
    const assignee = teamMembers.find((m) => m.id === newTask.assigneeId)
    if (!assignee) return

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      assignee: { id: assignee.id, name: assignee.name, avatar: assignee.avatar },
      priority: newTask.priority,
      status: "todo",
      dueDate: newTask.dueDate,
      createdAt: new Date(),
      progress: 0,
      tags: newTask.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      comments: 0,
      attachments: newTask.files.length,
      files: newTask.files,
    }

    setTasks([...tasks, task])
    setNewTask({
      title: "",
      description: "",
      assigneeId: "",
      priority: "medium",
      dueDate: new Date(),
      tags: "",
      files: [],
    })
    setShowCreateTask(false)
  }

  const updateTaskStatus = (taskId: string, newStatus: Task["status"]) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus, progress: newStatus === "completed" ? 100 : task.progress }
          : task,
      ),
    )
  }

  const tasksByStatus = {
    todo: tasks.filter((t) => t.status === "todo"),
    "in-progress": tasks.filter((t) => t.status === "in-progress"),
    review: tasks.filter((t) => t.status === "review"),
    completed: tasks.filter((t) => t.status === "completed"),
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Управление задачами</h2>
          <p className="text-muted-foreground">Отслеживайте прогресс и назначайте исполнителей</p>
        </div>
        <Dialog open={showCreateTask} onOpenChange={setShowCreateTask}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Создать задачу
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Новая задача</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Название задачи</Label>
                <Input
                  id="title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Введите название задачи"
                />
              </div>
              <div>
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Опишите задачу подробнее"
                />
              </div>
              <div>
                <Label>Исполнитель</Label>
                <Select
                  value={newTask.assigneeId}
                  onValueChange={(value) => setNewTask({ ...newTask, assigneeId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите исполнителя" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamMembers.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-6 h-6">
                            <AvatarImage src={member.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{member.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Приоритет</Label>
                <Select
                  value={newTask.priority}
                  onValueChange={(value: any) => setNewTask({ ...newTask, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Низкий</SelectItem>
                    <SelectItem value="medium">Средний</SelectItem>
                    <SelectItem value="high">Высокий</SelectItem>
                    <SelectItem value="urgent">Срочный</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Срок выполнения</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <CalendarIcon className="w-4 h-4 mr-2" />
                      {newTask.dueDate.toLocaleDateString()}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={newTask.dueDate}
                      onSelect={(date) => date && setNewTask({ ...newTask, dueDate: date })}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Label htmlFor="tags">Теги (через запятую)</Label>
                <Input
                  id="tags"
                  value={newTask.tags}
                  onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
                  placeholder="ИИ, Разработка, Аналитика"
                />
              </div>

              <div>
                <Label>Прикрепить файлы</Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragActive ? "border-primary bg-primary/5" : "border-border"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">Перетащите файлы сюда или нажмите для выбора</p>
                  <input
                    type="file"
                    multiple
                    onChange={(e) => handleFileUpload(e.target.files)}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById("file-upload")?.click()}
                  >
                    Выбрать файлы
                  </Button>
                </div>

                {newTask.files.length > 0 && (
                  <div className="mt-3 space-y-2">
                    <Label className="text-sm font-medium">Прикрепленные файлы:</Label>
                    {newTask.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                        <div className="flex items-center space-x-2">
                          <FileText className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                          <span className="text-xs text-muted-foreground">({formatFileSize(file.size)})</span>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="h-6 w-6 p-0"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button onClick={handleCreateTask} className="w-full">
                Создать задачу
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
          <div key={status} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground capitalize">
                {status === "todo"
                  ? "К выполнению"
                  : status === "in-progress"
                    ? "В работе"
                    : status === "review"
                      ? "На проверке"
                      : "Завершено"}
              </h3>
              <Badge variant="secondary">{statusTasks.length}</Badge>
            </div>

            <div className="space-y-3">
              {statusTasks.map((task) => (
                <Card
                  key={task.id}
                  className="bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(task.status)}
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreHorizontal className="w-3 h-3" />
                      </Button>
                    </div>

                    <h4 className="font-medium text-foreground mb-2 line-clamp-2">{task.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{task.description}</p>

                    {task.progress > 0 && (
                      <div className="mb-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-muted-foreground">Прогресс</span>
                          <span className="text-xs font-medium">{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-1" />
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-3">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={task.assignee.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {task.assignee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <CalendarIcon className="w-3 h-3 mr-1" />
                          {task.dueDate.toLocaleDateString()}
                        </div>
                        {task.comments > 0 && (
                          <div className="flex items-center">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            {task.comments}
                          </div>
                        )}
                        {task.attachments > 0 && (
                          <div className="flex items-center">
                            <Paperclip className="w-3 h-3 mr-1" />
                            {task.attachments}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {task.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs px-2 py-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex space-x-1">
                      {task.status !== "completed" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs bg-transparent"
                          onClick={() =>
                            updateTaskStatus(
                              task.id,
                              task.status === "todo"
                                ? "in-progress"
                                : task.status === "in-progress"
                                  ? "review"
                                  : "completed",
                            )
                          }
                        >
                          {task.status === "todo"
                            ? "Начать"
                            : task.status === "in-progress"
                              ? "На проверку"
                              : "Завершить"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export { TaskManager }
export default TaskManager
