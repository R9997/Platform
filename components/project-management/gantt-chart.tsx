"use client"
import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, ChevronLeft, ChevronRight, BarChart3, Users } from "lucide-react"

interface GanttTask {
  id: string
  name: string
  startDate: Date
  endDate: Date
  progress: number
  assignee: string
  priority: "low" | "medium" | "high" | "urgent"
  projectId: string
  dependencies?: string[]
}

interface GanttProject {
  id: string
  name: string
  tasks: GanttTask[]
  color: string
}

interface GanttChartProps {
  projects: any[]
  tasks?: any[]
}

export function GanttChart({ projects, tasks = [] }: GanttChartProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<"week" | "month">("month")

  const ganttData: GanttProject[] = useMemo(() => {
    return projects.map((project, index) => ({
      id: project.id || index.toString(),
      name: project.name,
      color: `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
      tasks: [
        {
          id: `${project.id}-main`,
          name: project.name,
          startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          endDate: new Date(project.deadline || Date.now() + 30 * 24 * 60 * 60 * 1000),
          progress: project.progress || 0,
          assignee: project.team?.[0] || "Не назначен",
          priority: project.priority?.toLowerCase() || "medium",
          projectId: project.id || index.toString(),
        },
        // Добавляем подзадачи если есть
        ...(project.subtasks?.map((task: any, taskIndex: number) => ({
          id: `${project.id}-task-${taskIndex}`,
          name: task.name || `Задача ${taskIndex + 1}`,
          startDate: new Date(task.startDate || Date.now()),
          endDate: new Date(task.endDate || Date.now() + 7 * 24 * 60 * 60 * 1000),
          progress: task.progress || 0,
          assignee: task.assignee || "Не назначен",
          priority: task.priority?.toLowerCase() || "medium",
          projectId: project.id || index.toString(),
        })) || []),
      ],
    }))
  }, [projects])

  const timeScale = useMemo(() => {
    const start = new Date(currentDate)
    start.setDate(1)
    const end = new Date(start)
    end.setMonth(end.getMonth() + (viewMode === "month" ? 3 : 1))

    const dates = []
    const current = new Date(start)

    while (current <= end) {
      dates.push(new Date(current))
      if (viewMode === "week") {
        current.setDate(current.getDate() + 1)
      } else {
        current.setDate(current.getDate() + 7)
      }
    }

    return dates
  }, [currentDate, viewMode])

  const getTaskPosition = (task: GanttTask) => {
    const startTime = timeScale[0].getTime()
    const endTime = timeScale[timeScale.length - 1].getTime()
    const totalDuration = endTime - startTime

    const taskStart = Math.max(task.startDate.getTime(), startTime)
    const taskEnd = Math.min(task.endDate.getTime(), endTime)

    const left = ((taskStart - startTime) / totalDuration) * 100
    const width = ((taskEnd - taskStart) / totalDuration) * 100

    return { left: `${left}%`, width: `${Math.max(width, 2)}%` }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500 dark:bg-red-600"
      case "high":
        return "bg-orange-500 dark:bg-orange-600"
      case "medium":
        return "bg-yellow-500 dark:bg-yellow-600"
      case "low":
        return "bg-green-500 dark:bg-green-600"
      default:
        return "bg-gray-500 dark:bg-gray-600"
    }
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
    setCurrentDate(newDate)
  }

  return (
    <Card className="enhanced-card backdrop-blur-xl border border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BarChart3 className="w-5 h-5 text-primary" />
            Диаграмма Ганта
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-card/50 rounded-lg p-1">
              <Button
                variant={viewMode === "week" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("week")}
                className="text-xs px-2 py-1 h-auto"
              >
                Неделя
              </Button>
              <Button
                variant={viewMode === "month" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("month")}
                className="text-xs px-2 py-1 h-auto"
              >
                Месяц
              </Button>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium min-w-[120px] text-center">
                {currentDate.toLocaleDateString("ru-RU", { month: "long", year: "numeric" })}
              </span>
              <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto overflow-y-auto max-h-[600px]">
          <div className="min-w-[1200px]">
            <div className="flex border-b border-border/50 sticky top-0 bg-background z-20">
              <div className="w-80 p-4 bg-card/50 border-r border-border/50">
                <span className="text-sm font-medium text-foreground">Проекты и задачи</span>
              </div>
              <div className="flex-1 relative">
                <div className="flex h-14">
                  {timeScale.map((date, index) => (
                    <div key={index} className="flex-1 border-r border-border/30 p-3 text-center bg-card/30">
                      <div className="text-xs font-medium text-foreground">
                        {viewMode === "week"
                          ? date.toLocaleDateString("ru-RU", { day: "numeric", month: "short" })
                          : `${date.getDate()}-${date.getDate() + 6} ${date.toLocaleDateString("ru-RU", { month: "short" })}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-1">
              {ganttData.map((project) => (
                <div key={project.id}>
                  {project.tasks.map((task, taskIndex) => (
                    <div key={task.id} className="flex border-b border-border/20 hover:bg-card/30 min-h-[60px]">
                      <div className="w-80 p-4 border-r border-border/50 flex items-center">
                        <div className="flex items-center gap-3 w-full">
                          <div
                            className="w-4 h-4 rounded-full flex-shrink-0 border-2 border-white dark:border-gray-800"
                            style={{ backgroundColor: project.color }}
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-foreground mb-1 leading-tight">{task.name}</div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge
                                className={`${getPriorityColor(task.priority)} text-white text-xs px-2 py-1 font-medium`}
                              >
                                {task.priority === "urgent"
                                  ? "Срочно"
                                  : task.priority === "high"
                                    ? "Высокий"
                                    : task.priority === "medium"
                                      ? "Средний"
                                      : "Низкий"}
                              </Badge>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                                <Users className="w-3 h-3" />
                                <span className="truncate max-w-[100px]">{task.assignee}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 relative p-4 flex items-center">
                        <div className="relative h-8 w-full">
                          <div
                            className="absolute top-1 h-6 rounded-lg flex items-center px-3 text-xs font-semibold text-white shadow-lg border border-white/20"
                            style={{
                              backgroundColor: project.color,
                              ...getTaskPosition(task),
                            }}
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className="font-bold">{task.progress}%</span>
                              <div className="text-xs opacity-90">
                                {task.startDate.toLocaleDateString("ru-RU", { day: "numeric", month: "short" })} -
                                {task.endDate.toLocaleDateString("ru-RU", { day: "numeric", month: "short" })}
                              </div>
                            </div>
                            <div
                              className="absolute top-0 left-0 h-full bg-white/40 dark:bg-black/20 rounded-lg border-r border-white/30"
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <div
              className="absolute top-14 bottom-0 w-1 bg-red-500 dark:bg-red-400 z-10 pointer-events-none shadow-lg"
              style={{
                left: `${
                  320 +
                  (
                    (new Date().getTime() - timeScale[0].getTime()) /
                      (timeScale[timeScale.length - 1].getTime() - timeScale[0].getTime())
                  ) *
                    (100 - 26.67)
                }%`,
              }}
            >
              <div className="absolute -top-3 -left-2 w-5 h-5 bg-red-500 dark:bg-red-400 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              <div className="absolute -top-8 -left-8 text-xs font-medium text-red-600 dark:text-red-400 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-lg border">
                Сегодня
              </div>
            </div>
          </div>
        </div>

        {ganttData.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Нет проектов для отображения</p>
            <p className="text-sm text-muted-foreground mt-1">Создайте проект, чтобы увидеть диаграмму Ганта</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
