"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  TrendingUp,
  FileText,
  Settings,
  Bell,
  Plus,
  Search,
  Target,
  DollarSign,
  Briefcase,
  MessageSquare,
  Home,
  Shield,
  ChevronRight,
  LogOut,
  Menu,
  Sparkles,
  Bot,
  Send,
  UserPlus,
  Rocket,
  CheckSquare,
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import { ContentGenerator } from "@/components/ai-tools/content-generator"
import { SalesManager } from "@/components/business-tools/sales-manager"
import { FinanceManager } from "@/components/business-tools/finance-manager"
import { FeatureGuide } from "@/components/help/feature-guide"
import { InteractiveTour } from "@/components/guide/interactive-tour"
import { ThemeToggle } from "@/components/theme-toggle"
import { TooltipProvider } from "@/components/ui/tooltip"
import { TaskManager } from "@/components/task-tracker/task-manager"
import { FileManager } from "@/components/file-storage/file-manager"
import { AnimatedMetrics } from "@/components/interactive/animated-metrics"
import { AIToolsShowcase } from "@/components/interactive/ai-tools-showcase"

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isLoading, setIsLoading] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState(3)
  const [showNotificationsModal, setShowNotificationsModal] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Загрузка данных платформы...</p>
        </div>
      </div>
    )
  }

  const NavigationMenu = ({ onItemClick }: { onItemClick?: () => void }) => (
    <div className="space-y-2">
      {[
        { key: "overview", icon: Briefcase, label: "Обзор бизнеса", badge: null },
        { key: "tools", icon: Rocket, label: "ИИ-инструменты", badge: 5 },
        { key: "sales", icon: TrendingUp, label: "Продажи", badge: 156 },
        { key: "finance", icon: DollarSign, label: "Финансы", badge: null },
        { key: "projects", icon: Target, label: "Активные проекты", badge: 3 },
        { key: "tasks", icon: CheckSquare, label: "Управление задачами", badge: 8 },
        { key: "files", icon: FileText, label: "Файловое хранилище", badge: 24 },
        { key: "team", icon: Users, label: "Команда", badge: 4 },
        { key: "roles", icon: Shield, label: "Роли и права", badge: null },
        { key: "chat", icon: MessageSquare, label: "ИИ-консультант", badge: null },
        { key: "settings", icon: Settings, label: "Настройки", badge: null },
      ].map((item) => (
        <Button
          key={item.key}
          variant={activeTab === item.key ? "default" : "ghost"}
          className={`w-full justify-start transition-all duration-300 ${
            activeTab === item.key
              ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/25"
              : "text-foreground hover:bg-accent/50"
          }`}
          onClick={() => {
            setActiveTab(item.key)
            onItemClick?.()
          }}
        >
          <item.icon className="w-4 h-4 mr-3" />
          <span className="flex-1 text-left">{item.label}</span>
          {item.badge && (
            <Badge variant="secondary" className="ml-2 text-xs">
              {item.badge}
            </Badge>
          )}
          <ChevronRight className={`w-4 h-4 ml-2 transition-transform ${activeTab === item.key ? "rotate-90" : ""}`} />
        </Button>
      ))}
    </div>
  )

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <header className="bg-card/80 backdrop-blur-xl border-b border-border/50 sticky top-0 z-50 shadow-lg shadow-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 p-0">
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-6">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Home className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="text-xl font-bold text-foreground">Рефрейм Бюро</h2>
                      </div>
                      <NavigationMenu onItemClick={() => setIsMobileMenuOpen(false)} />
                    </div>
                  </SheetContent>
                </Sheet>

                <Link
                  href="/"
                  className="flex items-center space-x-2 hover:opacity-80 transition-all duration-300 group"
                >
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Home className="h-5 w-5 text-primary" />
                  </div>
                  <h1 className="text-xl font-bold text-foreground hidden sm:block">Рефрейм Бюро</h1>
                </Link>
                <Badge
                  variant="secondary"
                  className="bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30 shadow-sm hidden sm:flex"
                >
                  <Sparkles className="w-3 h-3 mr-1" />
                  Бизнес-платформа
                </Badge>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Поиск..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64 bg-background/50 border-border/50 focus:border-primary/50"
                  />
                </div>

                <InteractiveTour />
                <FeatureGuide />

                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => setShowNotificationsModal(true)}
                >
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                      {notifications}
                    </Badge>
                  )}
                </Button>

                <ThemeToggle />

                <div className="hidden md:flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">П</span>
                  </div>
                  <span className="text-foreground font-medium">Пользователь</span>
                </div>

                <Button
                  onClick={() => (window.location.href = "/")}
                  variant="outline"
                  size="sm"
                  className="border-border/50 hover:border-primary/50"
                >
                  <LogOut className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Выйти</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          <div className="mb-6 sm:mb-8">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Главная</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Бизнес-платформа</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="hidden lg:block lg:col-span-1">
              <Card className="bg-card/60 backdrop-blur-xl border border-border/50 shadow-xl shadow-primary/5 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-foreground font-bold text-lg flex items-center">
                    <div className="p-2 bg-primary/10 rounded-lg mr-3">
                      <Briefcase className="w-5 h-5 text-primary" />
                    </div>
                    Управление бизнесом
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm">Ваша ИИ-платформа роста</CardDescription>
                </CardHeader>
                <CardContent>
                  <NavigationMenu />
                </CardContent>
              </Card>
            </div>

            <div className="col-span-1 lg:col-span-3">
              {activeTab === "overview" && (
                <div className="space-y-6 sm:space-y-8">
                  <AnimatedMetrics />
                  <AIToolsShowcase />
                </div>
              )}

              {activeTab === "tools" && (
                <div className="space-y-6 sm:space-y-8">
                  <AIToolsShowcase />
                  <Card className="bg-card/60 backdrop-blur-xl border border-border/50">
                    <CardHeader>
                      <CardTitle>Активные ИИ-инструменты</CardTitle>
                      <CardDescription>Управление и мониторинг ИИ-инструментов</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ContentGenerator />
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "tasks" && <TaskManager />}
              {activeTab === "files" && <FileManager />}
              {activeTab === "sales" && <SalesManager />}
              {activeTab === "finance" && <FinanceManager />}

              {activeTab === "chat" && (
                <Card className="bg-card/50 backdrop-blur-sm border border-border/50 h-[600px] flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bot className="w-5 h-5 mr-2 text-primary" />
                      ИИ-консультант по бизнесу
                    </CardTitle>
                    <CardDescription>Персональный помощник для роста вашего бизнеса</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <ScrollArea className="flex-1 mb-4 p-4 bg-background/50 rounded-lg border">
                      <div className="space-y-4">
                        <div className="flex justify-start">
                          <div className="bg-card text-foreground p-3 rounded-lg border max-w-[80%]">
                            Добро пожаловать в вашу ИИ-платформу! Я помогу оптимизировать ваш бизнес. С чего начнем?
                          </div>
                        </div>
                      </div>
                    </ScrollArea>
                    <div className="flex space-x-2">
                      <Input placeholder="Спросите о развитии бизнеса..." className="bg-background border-border/50" />
                      <Button size="icon">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === "team" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Управление командой</h2>
                      <p className="text-muted-foreground">Сотрудники, роли и права доступа</p>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Добавить сотрудника
                    </Button>
                  </div>
                  <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                    <CardContent className="p-6">
                      <p className="text-muted-foreground">
                        Функционал управления командой будет добавлен в следующих обновлениях.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "projects" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Активные проекты</h2>
                      <p className="text-muted-foreground">Отслеживайте прогресс ваших ИИ-проектов</p>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Новый проект
                    </Button>
                  </div>
                  <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                    <CardContent className="p-6">
                      <p className="text-muted-foreground">
                        Функционал управления проектами будет добавлен в следующих обновлениях.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "roles" && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Роли и права доступа</h2>
                      <p className="text-muted-foreground">Управление правами пользователей и безопасностью</p>
                    </div>
                    <Button className="bg-primary hover:bg-primary/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Создать роль
                    </Button>
                  </div>
                  <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                    <CardContent className="p-6">
                      <p className="text-muted-foreground">
                        Функционал управления ролями будет добавлен в следующих обновлениях.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="space-y-6">
                  <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                    <CardHeader>
                      <CardTitle>Настройки аккаунта</CardTitle>
                      <CardDescription>Управление профилем и предпочтениями</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Имя</label>
                          <Input defaultValue="Пользователь" className="mt-1" />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Email</label>
                          <Input defaultValue="user@example.com" className="mt-1" />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Компания</label>
                        <Input defaultValue="Моя компания" className="mt-1" />
                      </div>
                      <Button className="bg-primary hover:bg-primary/90">Сохранить изменения</Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>

        {showNotificationsModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle>Уведомления</CardTitle>
                <CardDescription>Последние обновления системы</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                    <p className="text-sm font-medium">Новый отчет готов</p>
                    <p className="text-xs text-muted-foreground">Анализ продаж за месяц завершен</p>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                    <p className="text-sm font-medium">ИИ-инструмент активирован</p>
                    <p className="text-xs text-muted-foreground">Генератор контента запущен</p>
                  </div>
                </div>
              </CardContent>
              <div className="flex justify-end p-6 pt-0">
                <Button
                  onClick={() => {
                    setShowNotificationsModal(false)
                    setNotifications(0)
                  }}
                >
                  Закрыть
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
