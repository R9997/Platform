"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  UserPlus,
  Building2,
  Target,
  BookOpen,
  Star,
  Heart,
  FileCheck,
  BarChart3,
  Search,
  Calendar,
  Award,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Brain,
  Zap,
  Shield,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Trophy,
  Activity,
  Plus,
  Edit,
  Trash2,
} from "lucide-react"

interface Employee {
  id: string
  name: string
  position: string
  department: string
  email: string
  phone: string
  manager: string
  startDate: string
  salary: number
  status: "active" | "vacation" | "sick" | "inactive"
  avatar: string
  skills: string[]
  performance: number
  satisfaction: number
  projects: string[]
  goals: Goal[]
}

interface Goal {
  id: string
  title: string
  description: string
  progress: number
  deadline: string
  status: "active" | "completed" | "overdue"
}

interface Course {
  id: string
  title: string
  description: string
  duration: string
  completed: boolean
  progress: number
}

interface Review {
  id: string
  employeeId: string
  reviewerId: string
  type: "360" | "quarterly" | "annual"
  rating: number
  feedback: string
  date: string
}

export function HRDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false)
  const [showEmployeeProfileModal, setShowEmployeeProfileModal] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      name: "Анна Петрова",
      position: "Руководитель отдела",
      department: "Маркетинг",
      email: "anna@company.com",
      phone: "+7 (999) 123-45-67",
      manager: "CEO",
      startDate: "2023-01-15",
      salary: 120000,
      status: "active",
      avatar: "А",
      skills: ["Управление", "Маркетинг", "Аналитика"],
      performance: 95,
      satisfaction: 88,
      projects: ["Автоматизация продаж", "Брендинг"],
      goals: [
        {
          id: "g1",
          title: "Увеличить конверсию на 25%",
          description: "Оптимизация воронки продаж",
          progress: 75,
          deadline: "2024-03-31",
          status: "active",
        },
      ],
    },
    {
      id: "2",
      name: "Михаил Сидоров",
      position: "Senior Developer",
      department: "Разработка",
      email: "mikhail@company.com",
      phone: "+7 (999) 234-56-78",
      manager: "Анна Петрова",
      startDate: "2022-06-01",
      salary: 150000,
      status: "active",
      avatar: "М",
      skills: ["React", "Node.js", "TypeScript", "AI/ML"],
      performance: 92,
      satisfaction: 90,
      projects: ["ИИ-чатбот", "API интеграция"],
      goals: [
        {
          id: "g2",
          title: "Внедрить ИИ-функции",
          description: "Разработка ИИ-модулей для платформы",
          progress: 60,
          deadline: "2024-04-15",
          status: "active",
        },
      ],
    },
    {
      id: "3",
      name: "Елена Козлова",
      position: "UX/UI Designer",
      department: "Дизайн",
      email: "elena@company.com",
      phone: "+7 (999) 345-67-89",
      manager: "Анна Петрова",
      startDate: "2023-03-10",
      salary: 100000,
      status: "vacation",
      avatar: "Е",
      skills: ["Figma", "Prototyping", "User Research"],
      performance: 89,
      satisfaction: 85,
      projects: ["Редизайн платформы"],
      goals: [
        {
          id: "g3",
          title: "Улучшить UX метрики",
          description: "Повысить удобство использования на 30%",
          progress: 40,
          deadline: "2024-05-01",
          status: "active",
        },
      ],
    },
  ])

  const [newEmployee, setNewEmployee] = useState({
    name: "",
    position: "",
    department: "",
    email: "",
    phone: "",
    manager: "",
    salary: "",
    startDate: "",
  })

  const [courses] = useState<Course[]>([
    {
      id: "c1",
      title: "Основы ИИ в бизнесе",
      description: "Изучение применения искусственного интеллекта",
      duration: "4 недели",
      completed: false,
      progress: 25,
    },
    {
      id: "c2",
      title: "Управление проектами",
      description: "Методологии Agile и Scrum",
      duration: "3 недели",
      completed: true,
      progress: 100,
    },
    {
      id: "c3",
      title: "Лидерство и мотивация",
      description: "Развитие навыков руководства",
      duration: "6 недель",
      completed: false,
      progress: 60,
    },
  ])

  const [showEditStructureModal, setShowEditStructureModal] = useState(false)
  const [showAddPositionModal, setShowAddPositionModal] = useState(false)
  const [editingPosition, setEditingPosition] = useState<any>(null)
  const [newPosition, setNewPosition] = useState({
    name: "",
    department: "",
    level: "employee",
    manager: "",
  })

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.email) {
      const employee: Employee = {
        id: (employees.length + 1).toString(),
        name: newEmployee.name,
        position: newEmployee.position,
        department: newEmployee.department,
        email: newEmployee.email,
        phone: newEmployee.phone,
        manager: newEmployee.manager,
        startDate: newEmployee.startDate,
        salary: Number(newEmployee.salary),
        status: "active",
        avatar: newEmployee.name.charAt(0).toUpperCase(),
        skills: [],
        performance: 85,
        satisfaction: 80,
        projects: [],
        goals: [],
      }
      setEmployees([...employees, employee])
      setNewEmployee({
        name: "",
        position: "",
        department: "",
        email: "",
        phone: "",
        manager: "",
        salary: "",
        startDate: "",
      })
      setShowAddEmployeeModal(false)
    }
  }

  const handleEditPosition = (position: any) => {
    setEditingPosition(position)
    setNewPosition({
      name: position.name,
      department: position.department,
      level: position.level,
      manager: position.manager,
    })
    setShowEditStructureModal(true)
  }

  const handleDeletePosition = (positionId: string) => {
    if (confirm("Вы уверены, что хотите удалить эту позицию?")) {
      setEmployees(employees.filter((emp) => emp.id !== positionId))
    }
  }

  const handleAddPosition = () => {
    if (newPosition.name && newPosition.department) {
      const position: Employee = {
        id: (employees.length + 1).toString(),
        name: newPosition.name,
        position: newPosition.level === "head" ? `Руководитель ${newPosition.department}` : "Сотрудник",
        department: newPosition.department,
        email: `${newPosition.name.toLowerCase().replace(/\s+/g, ".")}@company.com`,
        phone: "",
        manager: newPosition.manager,
        startDate: new Date().toISOString().split("T")[0],
        salary: 0,
        status: "active",
        avatar: newPosition.name.charAt(0).toUpperCase(),
        skills: [],
        performance: 85,
        satisfaction: 80,
        projects: [],
        goals: [],
      }
      setEmployees([...employees, position])
      setNewPosition({ name: "", department: "", level: "employee", manager: "" })
      setShowAddPositionModal(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "vacation":
        return "bg-blue-500"
      case "sick":
        return "bg-yellow-500"
      case "inactive":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Активен"
      case "vacation":
        return "В отпуске"
      case "sick":
        return "Больничный"
      case "inactive":
        return "Неактивен"
      default:
        return "Неизвестно"
    }
  }

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const departmentStats = employees.reduce(
    (acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const avgPerformance = employees.reduce((sum, emp) => sum + emp.performance, 0) / employees.length
  const avgSatisfaction = employees.reduce((sum, emp) => sum + emp.satisfaction, 0) / employees.length

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold text-foreground">HR и развитие команды</h2>
          <p className="text-muted-foreground mt-1">Управление персоналом, развитие и аналитика команды</p>
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Поиск сотрудников..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="bg-primary hover:bg-primary/90" onClick={() => setShowAddEmployeeModal(true)}>
            <UserPlus className="w-4 h-4 mr-2" />
            Добавить сотрудника
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-card/50 backdrop-blur-sm">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            <span className="hidden sm:inline">Обзор</span>
          </TabsTrigger>
          <TabsTrigger value="employees" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Сотрудники</span>
          </TabsTrigger>
          <TabsTrigger value="structure" className="flex items-center gap-2">
            <Building2 className="w-4 h-4" />
            <span className="hidden sm:inline">Структура</span>
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            <span className="hidden sm:inline">Цели</span>
          </TabsTrigger>
          <TabsTrigger value="learning" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Обучение</span>
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            <span className="hidden sm:inline">Оценки</span>
          </TabsTrigger>
          <TabsTrigger value="engagement" className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            <span className="hidden sm:inline">Вовлечённость</span>
          </TabsTrigger>
          <TabsTrigger value="processes" className="flex items-center gap-2">
            <FileCheck className="w-4 h-4" />
            <span className="hidden sm:inline">Процессы</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <Card className="enhanced-card backdrop-blur-xl border border-border/50">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Всего сотрудников</p>
                    <p className="text-2xl font-bold text-foreground">{employees.length}</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                      <span className="text-xs text-green-500">+12% за месяц</span>
                    </div>
                  </div>
                  <div className="text-primary">
                    <Users className="w-8 h-8" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="enhanced-card backdrop-blur-xl border border-border/50">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Средняя производительность</p>
                    <p className="text-2xl font-bold text-foreground">{Math.round(avgPerformance)}%</p>
                    <div className="flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                      <span className="text-xs text-green-500">+5% за квартал</span>
                    </div>
                  </div>
                  <div className="text-primary">
                    <Activity className="w-8 h-8" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="enhanced-card backdrop-blur-xl border border-border/50">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Удовлетворённость</p>
                    <p className="text-2xl font-bold text-foreground">{Math.round(avgSatisfaction)}%</p>
                    <div className="flex items-center mt-1">
                      <Heart className="w-3 h-3 text-green-500 mr-1" />
                      <span className="text-xs text-green-500">Высокий уровень</span>
                    </div>
                  </div>
                  <div className="text-primary">
                    <Heart className="w-8 h-8" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="enhanced-card backdrop-blur-xl border border-border/50">
              <CardContent className="p-4 lg:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Текучесть кадров</p>
                    <p className="text-2xl font-bold text-foreground">3.2%</p>
                    <div className="flex items-center mt-1">
                      <AlertTriangle className="w-3 h-3 text-green-500 mr-1" />
                      <span className="text-xs text-green-500">Низкая</span>
                    </div>
                  </div>
                  <div className="text-primary">
                    <TrendingUp className="w-8 h-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card className="enhanced-card backdrop-blur-xl border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-primary" />
                  Распределение по отделам
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(departmentStats).map(([dept, count]) => (
                  <div key={dept} className="flex items-center justify-between gap-4">
                    <span className="text-sm font-medium flex-shrink-0">{dept}</span>
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className="w-full max-w-24 bg-secondary rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(count / employees.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground flex-shrink-0">{count}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="enhanced-card backdrop-blur-xl border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  ИИ-рекомендации
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-green-800 dark:text-green-200">Рекомендация к повышению</p>
                      <p className="text-xs text-green-600 dark:text-green-300">
                        Михаил Сидоров показывает отличные результаты (92%)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Риск выгорания</p>
                      <p className="text-xs text-yellow-600 dark:text-yellow-300">
                        У Елены Козловой снижается удовлетворённость
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-200">Потребность в найме</p>
                      <p className="text-xs text-blue-600 dark:text-blue-300">
                        Отдел разработки перегружен, нужен +1 разработчик
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="employees" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
            {filteredEmployees.map((employee) => (
              <Card key={employee.id} className="enhanced-card backdrop-blur-xl border border-border/50">
                <CardContent className="p-4 lg:p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-white">{employee.avatar}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg truncate">{employee.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">{employee.position}</p>
                        <Badge variant="outline" className="mt-1 text-xs">
                          {employee.department}
                        </Badge>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(employee.status)} text-white`}>
                      {getStatusLabel(employee.status)}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="truncate">{employee.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{employee.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Briefcase className="w-4 h-4 text-muted-foreground" />
                      <span>Менеджер: {employee.manager}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>С {new Date(employee.startDate).toLocaleDateString("ru-RU")}</span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Производительность</span>
                      <span>{employee.performance}%</span>
                    </div>
                    <Progress value={employee.performance} className="h-2" />
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1">
                    {employee.skills.slice(0, 3).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {employee.skills.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{employee.skills.length - 3}
                      </Badge>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full mt-4 bg-transparent"
                    onClick={() => {
                      setSelectedEmployee(employee)
                      setShowEmployeeProfileModal(true)
                    }}
                  >
                    Открыть профиль
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="structure" className="space-y-6">
          <Card className="enhanced-card backdrop-blur-xl border border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Организационная структура
                <div className="ml-auto flex gap-2">
                  <Button size="sm" onClick={() => setShowAddPositionModal(true)}>
                    <Plus className="w-4 h-4 mr-1" />
                    Добавить позицию
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 lg:p-6">
              <div className="space-y-6">
                {/* CEO */}
                <div className="text-center">
                  <div className="inline-block p-4 bg-gradient-to-r from-primary to-accent text-white rounded-lg relative group">
                    <div className="font-bold">Генеральный директор</div>
                    <div className="text-sm opacity-90">Александр Петров</div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="w-px h-8 bg-border"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                  {Object.keys(departmentStats).map((dept) => {
                    const deptEmployees = employees.filter((emp) => emp.department === dept)
                    const head = deptEmployees.find(
                      (emp) => emp.position.includes("Руководитель") || emp.position.includes("Lead"),
                    )

                    return (
                      <div key={dept} className="text-center space-y-4">
                        <div className="p-3 bg-card border border-border rounded-lg relative group">
                          <div className="font-semibold text-sm lg:text-base">{head?.name || "Вакансия"}</div>
                          <div className="text-xs lg:text-sm text-muted-foreground">{dept}</div>
                          <Badge variant="outline" className="mt-1 text-xs">
                            {deptEmployees.length} сотр.
                          </Badge>
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            {head && (
                              <>
                                <Button size="sm" variant="ghost" onClick={() => handleEditPosition(head)}>
                                  <Edit className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => handleDeletePosition(head.id)}>
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {deptEmployees
                            .filter((emp) => emp.id !== head?.id)
                            .map((emp) => (
                              <div
                                key={emp.id}
                                className="p-2 bg-card/50 border border-border/50 rounded text-xs lg:text-sm relative group"
                              >
                                <div className="font-medium truncate">{emp.name}</div>
                                <div className="text-xs text-muted-foreground truncate">{emp.position}</div>
                                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                  <Button size="sm" variant="ghost" onClick={() => handleEditPosition(emp)}>
                                    <Edit className="w-2 h-2" />
                                  </Button>
                                  <Button size="sm" variant="ghost" onClick={() => handleDeletePosition(emp.id)}>
                                    <Trash2 className="w-2 h-2" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning" className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card className="enhanced-card backdrop-blur-xl border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Корпоративные курсы
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{course.title}</h4>
                          <p className="text-sm text-muted-foreground">{course.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{course.duration}</span>
                          </div>
                        </div>
                        {course.completed && (
                          <Badge className="bg-green-500 text-white">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Завершён
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Прогресс</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="enhanced-card backdrop-blur-xl border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Библиотека знаний
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <FileCheck className="w-4 h-4 text-primary" />
                      <span className="font-medium text-sm">Чек-лист онбординга</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Пошаговое руководство для новых сотрудников</p>
                  </div>

                  <div className="p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <span className="font-medium text-sm">Корпоративные стандарты</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Правила и процедуры компании</p>
                  </div>

                  <div className="p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Brain className="w-4 h-4 text-primary" />
                      <span className="font-medium text-sm">База знаний ИИ</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Материалы по искусственному интеллекту</p>
                  </div>

                  <div className="p-3 border border-border rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Shield className="w-4 h-4 text-primary" />
                      <span className="font-medium text-sm">Безопасность данных</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Политики информационной безопасности</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="enhanced-card backdrop-blur-xl border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Пульс команды
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">{Math.round(avgSatisfaction)}%</div>
                    <div className="text-sm text-green-700 dark:text-green-300">Общая удовлетворённость</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Рабочая нагрузка</span>
                      <div className="flex items-center gap-2">
                        <Progress value={75} className="w-20 h-2" />
                        <span className="text-sm">75%</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Баланс работа/жизнь</span>
                      <div className="flex items-center gap-2">
                        <Progress value={82} className="w-20 h-2" />
                        <span className="text-sm">82%</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Развитие карьеры</span>
                      <div className="flex items-center gap-2">
                        <Progress value={68} className="w-20 h-2" />
                        <span className="text-sm">68%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="enhanced-card backdrop-blur-xl border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-primary" />
                  Доска достижений
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <Award className="w-6 h-6 text-yellow-600" />
                    <div>
                      <div className="font-medium text-sm">Сотрудник месяца</div>
                      <div className="text-xs text-muted-foreground">Михаил Сидоров</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Target className="w-6 h-6 text-blue-600" />
                    <div>
                      <div className="font-medium text-sm">Цель достигнута</div>
                      <div className="text-xs text-muted-foreground">Анна Петрова - Конверсия +25%</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <GraduationCap className="w-6 h-6 text-green-600" />
                    <div>
                      <div className="font-medium text-sm">Курс завершён</div>
                      <div className="text-xs text-muted-foreground">Елена Козлова - UX Research</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="processes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="enhanced-card backdrop-blur-xl border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <UserPlus className="w-5 h-5 text-primary" />
                  Онбординг
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Подготовка рабочего места</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Знакомство с командой</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Обучение системам</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">Первые задачи</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  Управлять процессом
                </Button>
              </CardContent>
            </Card>

            <Card className="enhanced-card backdrop-blur-xl border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                  Отпуска и больничные
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                    <div className="text-sm font-medium">Елена Козлова</div>
                    <div className="text-xs text-muted-foreground">Отпуск: 15-29 января</div>
                  </div>
                  <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
                    <div className="text-sm font-medium">Заявка на отпуск</div>
                    <div className="text-xs text-muted-foreground">Михаил С. - март 2024</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  Календарь отпусков
                </Button>
              </CardContent>
            </Card>

            <Card className="enhanced-card backdrop-blur-xl border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  Мониторинг выгорания
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Риск выгорания</span>
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      Низкий
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-muted-foreground">Переработки за неделю:</div>
                    <Progress value={15} className="h-2" />
                    <div className="text-xs text-muted-foreground">15% от команды</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4 bg-transparent">
                  Детальный анализ
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Employee Modal */}
      <Dialog open={showAddEmployeeModal} onOpenChange={setShowAddEmployeeModal}>
        <DialogContent className="max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-primary" />
              Добавить нового сотрудника
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">ФИО *</label>
              <Input
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                placeholder="Введите полное имя"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Должность *</label>
              <Input
                value={newEmployee.position}
                onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                placeholder="Например: Senior Developer"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Отдел *</label>
              <select
                value={newEmployee.department}
                onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                className="w-full mt-1 p-2 border border-border rounded-md bg-background"
              >
                <option value="">Выберите отдел</option>
                <option value="Разработка">Разработка</option>
                <option value="Маркетинг">Маркетинг</option>
                <option value="Дизайн">Дизайн</option>
                <option value="Продажи">Продажи</option>
                <option value="HR">HR</option>
                <option value="Финансы">Финансы</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Email *</label>
              <Input
                type="email"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                placeholder="email@company.com"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Телефон</label>
              <Input
                value={newEmployee.phone}
                onChange={(e) => setNewEmployee({ ...newEmployee, phone: e.target.value })}
                placeholder="+7 (999) 123-45-67"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Руководитель</label>
              <select
                value={newEmployee.manager}
                onChange={(e) => setNewEmployee({ ...newEmployee, manager: e.target.value })}
                className="w-full mt-1 p-2 border border-border rounded-md bg-background"
              >
                <option value="">Выберите руководителя</option>
                <option value="CEO">CEO</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.name}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Дата начала работы</label>
              <Input
                type="date"
                value={newEmployee.startDate}
                onChange={(e) => setNewEmployee({ ...newEmployee, startDate: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Оклад (руб.)</label>
              <Input
                type="number"
                value={newEmployee.salary}
                onChange={(e) => setNewEmployee({ ...newEmployee, salary: e.target.value })}
                placeholder="100000"
                className="mt-1"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowAddEmployeeModal(false)
                setNewEmployee({
                  name: "",
                  position: "",
                  department: "",
                  email: "",
                  phone: "",
                  manager: "",
                  salary: "",
                  startDate: "",
                })
              }}
            >
              Отмена
            </Button>
            <Button onClick={handleAddEmployee} disabled={!newEmployee.name || !newEmployee.email}>
              Добавить сотрудника
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Employee Profile Modal */}
      {selectedEmployee && (
        <Dialog open={showEmployeeProfileModal} onOpenChange={setShowEmployeeProfileModal}>
          <DialogContent className="max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-white">{selectedEmployee.avatar}</span>
                </div>
                <div>
                  <div className="text-xl">{selectedEmployee.name}</div>
                  <div className="text-sm text-muted-foreground">{selectedEmployee.position}</div>
                </div>
              </DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="xl:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Текущие цели
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {selectedEmployee.goals.map((goal) => (
                      <div key={goal.id} className="p-4 border border-border rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                          <div className="min-w-0 flex-1">
                            <h4 className="font-medium">{goal.title}</h4>
                            <p className="text-sm text-muted-foreground">{goal.description}</p>
                          </div>
                          <Badge
                            variant={goal.status === "completed" ? "default" : "outline"}
                            className="flex-shrink-0"
                          >
                            {goal.status === "completed" ? "Завершено" : "В работе"}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Прогресс</span>
                            <span>{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                          <div className="text-xs text-muted-foreground">
                            Дедлайн: {new Date(goal.deadline).toLocaleDateString("ru-RU")}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      Активные проекты
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedEmployee.projects.map((project, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-card/50 rounded">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                          <span className="text-sm truncate">{project}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Контактная информация</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedEmployee.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedEmployee.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedEmployee.department}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>С {new Date(selectedEmployee.startDate).toLocaleDateString("ru-RU")}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Навыки</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedEmployee.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Показатели</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Производительность</span>
                        <span>{selectedEmployee.performance}%</span>
                      </div>
                      <Progress value={selectedEmployee.performance} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Удовлетворённость</span>
                        <span>{selectedEmployee.satisfaction}%</span>
                      </div>
                      <Progress value={selectedEmployee.satisfaction} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowEmployeeProfileModal(false)}>
                Закрыть
              </Button>
              <Button>Редактировать профиль</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={showAddPositionModal} onOpenChange={setShowAddPositionModal}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-primary" />
              Добавить новую позицию
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Имя сотрудника *</label>
              <Input
                value={newPosition.name}
                onChange={(e) => setNewPosition({ ...newPosition, name: e.target.value })}
                placeholder="Введите имя"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Отдел *</label>
              <select
                value={newPosition.department}
                onChange={(e) => setNewPosition({ ...newPosition, department: e.target.value })}
                className="w-full mt-1 p-2 border border-border rounded-md bg-background"
              >
                <option value="">Выберите отдел</option>
                <option value="Разработка">Разработка</option>
                <option value="Маркетинг">Маркетинг</option>
                <option value="Дизайн">Дизайн</option>
                <option value="Продажи">Продажи</option>
                <option value="HR">HR</option>
                <option value="Финансы">Финансы</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Уровень</label>
              <select
                value={newPosition.level}
                onChange={(e) => setNewPosition({ ...newPosition, level: e.target.value })}
                className="w-full mt-1 p-2 border border-border rounded-md bg-background"
              >
                <option value="employee">Сотрудник</option>
                <option value="head">Руководитель отдела</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Руководитель</label>
              <select
                value={newPosition.manager}
                onChange={(e) => setNewPosition({ ...newPosition, manager: e.target.value })}
                className="w-full mt-1 p-2 border border-border rounded-md bg-background"
              >
                <option value="">Выберите руководителя</option>
                <option value="CEO">CEO</option>
                {employees.map((emp) => (
                  <option key={emp.id} value={emp.name}>
                    {emp.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowAddPositionModal(false)}>
              Отмена
            </Button>
            <Button onClick={handleAddPosition} disabled={!newPosition.name || !newPosition.department}>
              Добавить
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditStructureModal} onOpenChange={setShowEditStructureModal}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5 text-primary" />
              Редактировать позицию
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Имя сотрудника *</label>
              <Input
                value={newPosition.name}
                onChange={(e) => setNewPosition({ ...newPosition, name: e.target.value })}
                placeholder="Введите имя"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Отдел *</label>
              <select
                value={newPosition.department}
                onChange={(e) => setNewPosition({ ...newPosition, department: e.target.value })}
                className="w-full mt-1 p-2 border border-border rounded-md bg-background"
              >
                <option value="">Выберите отдел</option>
                <option value="Разработка">Разработка</option>
                <option value="Маркетинг">Маркетинг</option>
                <option value="Дизайн">Дизайн</option>
                <option value="Продажи">Продажи</option>
                <option value="HR">HR</option>
                <option value="Финансы">Финансы</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Руководитель</label>
              <select
                value={newPosition.manager}
                onChange={(e) => setNewPosition({ ...newPosition, manager: e.target.value })}
                className="w-full mt-1 p-2 border border-border rounded-md bg-background"
              >
                <option value="">Выберите руководителя</option>
                <option value="CEO">CEO</option>
                {employees
                  .filter((emp) => emp.id !== editingPosition?.id)
                  .map((emp) => (
                    <option key={emp.id} value={emp.name}>
                      {emp.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowEditStructureModal(false)}>
              Отмена
            </Button>
            <Button
              onClick={() => {
                if (editingPosition && newPosition.name && newPosition.department) {
                  const updatedEmployees = employees.map((emp) =>
                    emp.id === editingPosition.id
                      ? {
                          ...emp,
                          name: newPosition.name,
                          department: newPosition.department,
                          manager: newPosition.manager,
                        }
                      : emp,
                  )
                  setEmployees(updatedEmployees)
                  setShowEditStructureModal(false)
                  setEditingPosition(null)
                }
              }}
            >
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
