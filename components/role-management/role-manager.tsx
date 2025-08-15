"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Shield, Users, Eye, Trash2, Plus, Crown, Star, CheckCircle2, XCircle } from "lucide-react"

interface Permission {
  id: string
  name: string
  description: string
  category: string
}

interface Role {
  id: string
  name: string
  description: string
  color: string
  permissions: string[]
  userCount: number
  isSystem: boolean
  createdAt: Date
}

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  roleId: string
  department: string
  status: "active" | "inactive"
  lastActive: Date
}

export default function RoleManager() {
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "admin",
      name: "Администратор",
      description: "Полный доступ ко всем функциям платформы",
      color: "red",
      permissions: ["all"],
      userCount: 1,
      isSystem: true,
      createdAt: new Date(2024, 0, 1),
    },
    {
      id: "manager",
      name: "Менеджер",
      description: "Управление командой и проектами, доступ к аналитике",
      color: "blue",
      permissions: [
        "view_dashboard",
        "manage_projects",
        "view_analytics",
        "manage_team_members",
        "use_ai_tools",
        "manage_files",
        "create_tasks",
      ],
      userCount: 2,
      isSystem: true,
      createdAt: new Date(2024, 0, 15),
    },
    {
      id: "employee",
      name: "Сотрудник",
      description: "Базовый доступ к ИИ-инструментам и задачам",
      color: "green",
      permissions: ["view_dashboard", "use_ai_tools", "view_files", "manage_own_tasks"],
      userCount: 3,
      isSystem: true,
      createdAt: new Date(2024, 0, 20),
    },
    {
      id: "analyst",
      name: "Аналитик",
      description: "Специализированный доступ к данным и аналитике",
      color: "purple",
      permissions: ["view_dashboard", "view_analytics", "use_data_tools", "view_files", "export_reports"],
      userCount: 1,
      isSystem: false,
      createdAt: new Date(2024, 1, 1),
    },
  ])

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Анна Петрова",
      email: "anna@company.com",
      avatar: "/team-1.jpg",
      roleId: "admin",
      department: "Управление",
      status: "active",
      lastActive: new Date(),
    },
    {
      id: "2",
      name: "Михаил Сидоров",
      email: "mikhail@company.com",
      avatar: "/team-2.jpg",
      roleId: "manager",
      department: "Продажи",
      status: "active",
      lastActive: new Date(Date.now() - 300000),
    },
    {
      id: "3",
      name: "Елена Козлова",
      email: "elena@company.com",
      avatar: "/team-3.jpg",
      roleId: "manager",
      department: "Финансы",
      status: "active",
      lastActive: new Date(Date.now() - 900000),
    },
    {
      id: "4",
      name: "Дмитрий Волков",
      email: "dmitry@company.com",
      avatar: "/team-4.jpg",
      roleId: "analyst",
      department: "Аналитика",
      status: "active",
      lastActive: new Date(Date.now() - 7200000),
    },
  ])

  const [permissions] = useState<Permission[]>([
    {
      id: "view_dashboard",
      name: "Просмотр дашборда",
      description: "Доступ к основному дашборду и метрикам",
      category: "Основные",
    },
    {
      id: "manage_projects",
      name: "Управление проектами",
      description: "Создание, редактирование и удаление проектов",
      category: "Проекты",
    },
    {
      id: "view_analytics",
      name: "Просмотр аналитики",
      description: "Доступ к детальной аналитике и отчетам",
      category: "Аналитика",
    },
    {
      id: "manage_team_members",
      name: "Управление командой",
      description: "Добавление, редактирование и удаление участников команды",
      category: "Команда",
    },
    {
      id: "use_ai_tools",
      name: "Использование ИИ-инструментов",
      description: "Доступ ко всем ИИ-инструментам платформы",
      category: "ИИ-инструменты",
    },
    {
      id: "use_data_tools",
      name: "Инструменты анализа данных",
      description: "Специализированные инструменты для работы с данными",
      category: "ИИ-инструменты",
    },
    {
      id: "manage_files",
      name: "Управление файлами",
      description: "Загрузка, редактирование и удаление файлов",
      category: "Файлы",
    },
    {
      id: "view_files",
      name: "Просмотр файлов",
      description: "Просмотр и скачивание файлов",
      category: "Файлы",
    },
    {
      id: "create_tasks",
      name: "Создание задач",
      description: "Создание и назначение задач другим пользователям",
      category: "Задачи",
    },
    {
      id: "manage_own_tasks",
      name: "Управление своими задачами",
      description: "Просмотр и обновление статуса своих задач",
      category: "Задачи",
    },
    {
      id: "export_reports",
      name: "Экспорт отчетов",
      description: "Экспорт данных и создание отчетов",
      category: "Отчеты",
    },
    {
      id: "manage_settings",
      name: "Управление настройками",
      description: "Изменение настроек системы и конфигурации",
      category: "Администрирование",
    },
  ])

  const [showCreateRoleDialog, setShowCreateRoleDialog] = useState(false)
  const [showEditUserDialog, setShowEditUserDialog] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [newRole, setNewRole] = useState({
    name: "",
    description: "",
    color: "blue",
    permissions: [] as string[],
  })

  const getRoleColor = (color: string) => {
    const colors = {
      red: "bg-red-500/10 text-red-600 border-red-500/30",
      blue: "bg-blue-500/10 text-blue-600 border-blue-500/30",
      green: "bg-green-500/10 text-green-600 border-green-500/30",
      purple: "bg-purple-500/10 text-purple-600 border-purple-500/30",
      orange: "bg-orange-500/10 text-orange-600 border-orange-500/30",
      teal: "bg-teal-500/10 text-teal-600 border-teal-500/30",
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  const getRoleIcon = (roleId: string) => {
    switch (roleId) {
      case "admin":
        return Crown
      case "manager":
        return Star
      case "employee":
        return Users
      default:
        return Shield
    }
  }

  const getPermissionsByCategory = () => {
    const categories: { [key: string]: Permission[] } = {}
    permissions.forEach((permission) => {
      if (!categories[permission.category]) {
        categories[permission.category] = []
      }
      categories[permission.category].push(permission)
    })
    return categories
  }

  const handleCreateRole = () => {
    if (!newRole.name || newRole.permissions.length === 0) return

    const role: Role = {
      id: Date.now().toString(),
      name: newRole.name,
      description: newRole.description,
      color: newRole.color,
      permissions: newRole.permissions,
      userCount: 0,
      isSystem: false,
      createdAt: new Date(),
    }

    setRoles([...roles, role])
    setNewRole({ name: "", description: "", color: "blue", permissions: [] })
    setShowCreateRoleDialog(false)
  }

  const handleDeleteRole = (roleId: string) => {
    const role = roles.find((r) => r.id === roleId)
    if (role?.isSystem) return // Нельзя удалить системные роли

    setRoles(roles.filter((r) => r.id !== roleId))
    // Переназначить пользователей на роль "employee"
    setUsers(users.map((user) => (user.roleId === roleId ? { ...user, roleId: "employee" } : user)))
  }

  const handleChangeUserRole = (userId: string, newRoleId: string) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, roleId: newRoleId } : user)))
    // Обновить счетчики ролей
    const updatedRoles = roles.map((role) => ({
      ...role,
      userCount: users.filter((u) => (u.id === userId ? newRoleId : u.roleId) === role.id).length,
    }))
    setRoles(updatedRoles)
  }

  const togglePermission = (permissionId: string) => {
    setNewRole((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }))
  }

  const hasPermission = (roleId: string, permissionId: string) => {
    const role = roles.find((r) => r.id === roleId)
    if (!role) return false
    return role.permissions.includes("all") || role.permissions.includes(permissionId)
  }

  const permissionCategories = getPermissionsByCategory()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Управление ролями</h2>
          <p className="text-muted-foreground">Настройка ролей и прав доступа пользователей</p>
        </div>
        <Dialog open={showCreateRoleDialog} onOpenChange={setShowCreateRoleDialog}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Создать роль
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Создать новую роль</DialogTitle>
            </DialogHeader>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="role-name">Название роли</Label>
                  <Input
                    id="role-name"
                    value={newRole.name}
                    onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                    placeholder="Введите название роли"
                  />
                </div>
                <div>
                  <Label>Цвет</Label>
                  <Select value={newRole.color} onValueChange={(value) => setNewRole({ ...newRole, color: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">Синий</SelectItem>
                      <SelectItem value="green">Зеленый</SelectItem>
                      <SelectItem value="purple">Фиолетовый</SelectItem>
                      <SelectItem value="orange">Оранжевый</SelectItem>
                      <SelectItem value="teal">Бирюзовый</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="role-description">Описание</Label>
                <Textarea
                  id="role-description"
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  placeholder="Опишите назначение роли"
                />
              </div>
              <div>
                <Label className="text-base font-medium">Права доступа</Label>
                <div className="mt-3 space-y-4">
                  {Object.entries(permissionCategories).map(([category, categoryPermissions]) => (
                    <div key={category}>
                      <h4 className="font-medium text-foreground mb-2">{category}</h4>
                      <div className="space-y-2 pl-4">
                        {categoryPermissions.map((permission) => (
                          <div key={permission.id} className="flex items-start space-x-3">
                            <Switch
                              checked={newRole.permissions.includes(permission.id)}
                              onCheckedChange={() => togglePermission(permission.id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-foreground">{permission.name}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">{permission.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Button onClick={handleCreateRole} className="w-full">
                Создать роль
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Roles overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {roles.map((role) => {
          const RoleIcon = getRoleIcon(role.id)
          return (
            <Card
              key={role.id}
              className="bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-lg transition-all duration-300"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-lg ${getRoleColor(role.color)}`}>
                      <RoleIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{role.name}</CardTitle>
                      {role.isSystem && (
                        <Badge variant="outline" className="text-xs mt-1">
                          Системная
                        </Badge>
                      )}
                    </div>
                  </div>
                  {!role.isSystem && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteRole(role.id)}
                      className="text-red-600 hover:text-red-700 h-6 w-6 p-0"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{role.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Пользователей</span>
                    <Badge variant="secondary">{role.userCount}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Прав доступа</span>
                    <Badge variant="secondary">
                      {role.permissions.includes("all") ? "Все" : role.permissions.length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Users with roles */}
      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardHeader>
          <CardTitle className="text-foreground font-bold flex items-center">
            <Users className="w-5 h-5 mr-2 text-primary" />
            Пользователи и роли
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((user) => {
              const userRole = roles.find((r) => r.id === user.roleId)
              const RoleIcon = getRoleIcon(user.roleId)
              return (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/30"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-foreground">{user.name}</h3>
                        <Badge variant={user.status === "active" ? "default" : "secondary"}>
                          {user.status === "active" ? "Активен" : "Неактивен"}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{user.email}</span>
                        <span>{user.department}</span>
                        <span>
                          Активность:{" "}
                          {user.lastActive.getTime() > Date.now() - 300000
                            ? "Сейчас онлайн"
                            : user.lastActive.getTime() > Date.now() - 3600000
                              ? "Час назад"
                              : "Давно"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className={`p-1 rounded ${getRoleColor(userRole?.color || "blue")}`}>
                        <RoleIcon className="w-3 h-3" />
                      </div>
                      <Badge className={getRoleColor(userRole?.color || "blue")}>{userRole?.name}</Badge>
                    </div>
                    <Select value={user.roleId} onValueChange={(value) => handleChangeUserRole(user.id, value)}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.id}>
                            <div className="flex items-center space-x-2">
                              <div className={`p-1 rounded ${getRoleColor(role.color)}`}>
                                {React.createElement(getRoleIcon(role.id), { className: "w-3 h-3" })}
                              </div>
                              <span>{role.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user)
                        setShowEditUserDialog(true)
                      }}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Права
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* User permissions dialog */}
      <Dialog open={showEditUserDialog} onOpenChange={setShowEditUserDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Права доступа: {selectedUser?.name}</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-background/50 rounded-lg">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={selectedUser.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {selectedUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-foreground">{selectedUser.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className={getRoleColor(roles.find((r) => r.id === selectedUser.roleId)?.color || "blue")}>
                      {roles.find((r) => r.id === selectedUser.roleId)?.name}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Доступные права:</h4>
                {Object.entries(permissionCategories).map(([category, categoryPermissions]) => (
                  <div key={category}>
                    <h5 className="font-medium text-foreground mb-2 text-sm">{category}</h5>
                    <div className="space-y-2 pl-4">
                      {categoryPermissions.map((permission) => {
                        const hasAccess = hasPermission(selectedUser.roleId, permission.id)
                        return (
                          <div key={permission.id} className="flex items-center space-x-3">
                            {hasAccess ? (
                              <CheckCircle2 className="w-4 h-4 text-green-500" />
                            ) : (
                              <XCircle className="w-4 h-4 text-red-500" />
                            )}
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span
                                  className={`text-sm font-medium ${hasAccess ? "text-foreground" : "text-muted-foreground"}`}
                                >
                                  {permission.name}
                                </span>
                                {hasAccess && (
                                  <Badge variant="outline" className="text-xs">
                                    Доступно
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">{permission.description}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
