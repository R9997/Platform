"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart,
  BarChart3,
  Calculator,
  CreditCard,
  Wallet,
  ArrowUp,
  ArrowDown,
  Plus,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
} from "lucide-react"

export function FinanceManager() {
  const [activeTab, setActiveTab] = useState("overview")

  const [financialMetrics, setFinancialMetrics] = useState({
    totalRevenue: 2450000,
    totalExpenses: 1680000,
    netProfit: 770000,
    profitMargin: 31.4,
    cashFlow: 890000,
    monthlyGrowth: 18.5,
    burnRate: 280000,
    runway: 18,
  })

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      date: "2024-01-16",
      description: "Оплата от ТехноСтрой ООО",
      category: "Доходы",
      amount: 150000,
      type: "income",
      status: "completed",
    },
    {
      id: 2,
      date: "2024-01-15",
      description: "Зарплата сотрудников",
      category: "Персонал",
      amount: -280000,
      type: "expense",
      status: "completed",
    },
    {
      id: 3,
      date: "2024-01-14",
      description: "Аренда офиса",
      category: "Операционные расходы",
      amount: -85000,
      type: "expense",
      status: "completed",
    },
    {
      id: 4,
      date: "2024-01-13",
      description: "Оплата от Альфа Логистика",
      category: "Доходы",
      amount: 320000,
      type: "income",
      status: "pending",
    },
  ])

  const [budgetCategories, setBudgetCategories] = useState([
    {
      category: "Персонал",
      budgeted: 350000,
      spent: 280000,
      remaining: 70000,
      percentage: 80,
    },
    {
      category: "Маркетинг",
      budgeted: 120000,
      spent: 95000,
      remaining: 25000,
      percentage: 79,
    },
    {
      category: "Операционные расходы",
      budgeted: 150000,
      spent: 125000,
      remaining: 25000,
      percentage: 83,
    },
    {
      category: "Разработка",
      budgeted: 200000,
      spent: 165000,
      remaining: 35000,
      percentage: 82,
    },
  ])

  const getTransactionIcon = (type: string) => {
    return type === "income" ? (
      <ArrowUp className="w-4 h-4 text-green-600" />
    ) : (
      <ArrowDown className="w-4 h-4 text-red-600" />
    )
  }

  const getStatusColor = (status: string) => {
    return status === "completed"
      ? "bg-green-500/10 text-green-600 border-green-500/30"
      : "bg-yellow-500/10 text-yellow-600 border-yellow-500/30"
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/50">
          <TabsTrigger value="overview" className="flex items-center">
            <DollarSign className="w-4 h-4 mr-2" />
            Обзор
          </TabsTrigger>
          <TabsTrigger value="transactions" className="flex items-center">
            <CreditCard className="w-4 h-4 mr-2" />
            Транзакции
          </TabsTrigger>
          <TabsTrigger value="budget" className="flex items-center">
            <PieChart className="w-4 h-4 mr-2" />
            Бюджет
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center">
            <BarChart3 className="w-4 h-4 mr-2" />
            Отчеты
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Общий доход</p>
                    <p className="text-2xl font-bold text-foreground">
                      {financialMetrics.totalRevenue.toLocaleString("ru-RU")}₽
                    </p>
                    <div className="flex items-center mt-1">
                      <ArrowUp className="w-3 h-3 text-green-600 mr-1" />
                      <span className="text-xs text-green-600">+{financialMetrics.monthlyGrowth}%</span>
                    </div>
                  </div>
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Расходы</p>
                    <p className="text-2xl font-bold text-foreground">
                      {financialMetrics.totalExpenses.toLocaleString("ru-RU")}₽
                    </p>
                    <div className="flex items-center mt-1">
                      <ArrowDown className="w-3 h-3 text-red-600 mr-1" />
                      <span className="text-xs text-red-600">68% от дохода</span>
                    </div>
                  </div>
                  <div className="p-2 bg-red-500/10 rounded-lg">
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Чистая прибыль</p>
                    <p className="text-2xl font-bold text-foreground">
                      {financialMetrics.netProfit.toLocaleString("ru-RU")}₽
                    </p>
                    <div className="flex items-center mt-1">
                      <Target className="w-3 h-3 text-blue-600 mr-1" />
                      <span className="text-xs text-blue-600">{financialMetrics.profitMargin}% маржа</span>
                    </div>
                  </div>
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Денежный поток</p>
                    <p className="text-2xl font-bold text-foreground">
                      {financialMetrics.cashFlow.toLocaleString("ru-RU")}₽
                    </p>
                    <div className="flex items-center mt-1">
                      <Clock className="w-3 h-3 text-purple-600 mr-1" />
                      <span className="text-xs text-purple-600">{financialMetrics.runway} мес. runway</span>
                    </div>
                  </div>
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Wallet className="w-5 h-5 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card/60 backdrop-blur-xl border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                  Динамика доходов и расходов
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { month: "Октябрь", income: 1850000, expenses: 1420000, profit: 430000 },
                    { month: "Ноябрь", income: 2100000, expenses: 1580000, profit: 520000 },
                    { month: "Декабрь", income: 2450000, expenses: 1680000, profit: 770000 },
                    { month: "Январь", income: 2890000, expenses: 1950000, profit: 940000 },
                  ].map((data, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">{data.month}</span>
                        <span className="text-sm font-medium text-green-600">
                          +{data.profit.toLocaleString("ru-RU")}₽
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-green-600">Доходы: {data.income.toLocaleString("ru-RU")}₽</span>
                          <span className="text-red-600">Расходы: {data.expenses.toLocaleString("ru-RU")}₽</span>
                        </div>
                        <div className="relative w-full bg-muted/30 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${(data.profit / data.income) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-xl border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <PieChart className="w-5 h-5 mr-2 text-primary" />
                  Структура расходов
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Персонал", amount: 280000, percentage: 42, color: "blue" },
                    { category: "Операционные", amount: 125000, percentage: 19, color: "green" },
                    { category: "Разработка", amount: 165000, percentage: 25, color: "purple" },
                    { category: "Маркетинг", amount: 95000, percentage: 14, color: "orange" },
                  ].map((expense, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full bg-${expense.color}-500`} />
                        <span className="text-sm font-medium text-foreground">{expense.category}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-foreground">
                          {expense.amount.toLocaleString("ru-RU")}₽
                        </span>
                        <p className="text-xs text-muted-foreground">{expense.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Последние транзакции</h3>
              <p className="text-muted-foreground">Управление доходами и расходами</p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Импорт
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Экспорт
              </Button>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Добавить
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {transactions.map((transaction) => (
              <Card key={transaction.id} className="bg-card/50 backdrop-blur-sm border border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-background/50 rounded-lg">{getTransactionIcon(transaction.type)}</div>
                      <div>
                        <p className="font-medium text-foreground">{transaction.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-muted-foreground">{transaction.category}</span>
                          <Badge className={getStatusColor(transaction.status)}>
                            {transaction.status === "completed" ? "Завершено" : "В ожидании"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-lg font-bold ${
                          transaction.type === "income" ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : ""}
                        {transaction.amount.toLocaleString("ru-RU")}₽
                      </p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="budget" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Бюджет по категориям</h3>
              <p className="text-muted-foreground">Планирование и контроль расходов</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Новая категория
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {budgetCategories.map((budget, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border border-border/50">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="font-semibold text-foreground">{budget.category}</h4>
                      <p className="text-sm text-muted-foreground">
                        Потрачено: {budget.spent.toLocaleString("ru-RU")}₽ из {budget.budgeted.toLocaleString("ru-RU")}₽
                      </p>
                    </div>
                    <Badge
                      variant={
                        budget.percentage > 90 ? "destructive" : budget.percentage > 75 ? "secondary" : "default"
                      }
                    >
                      {budget.percentage}%
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <Progress value={budget.percentage} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Остаток: {budget.remaining.toLocaleString("ru-RU")}₽
                      </span>
                      <span className={budget.percentage > 90 ? "text-red-600" : "text-green-600"}>
                        {budget.percentage > 90 ? (
                          <AlertTriangle className="w-4 h-4 inline mr-1" />
                        ) : (
                          <CheckCircle className="w-4 h-4 inline mr-1" />
                        )}
                        {budget.percentage > 90 ? "Превышение" : "В норме"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card/60 backdrop-blur-xl border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Calculator className="w-5 h-5 mr-2 text-primary" />
                  Финансовые показатели
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { metric: "ROI (Return on Investment)", value: "31.4%", trend: "up" },
                    { metric: "EBITDA", value: "890,000₽", trend: "up" },
                    { metric: "Коэффициент ликвидности", value: "2.8", trend: "stable" },
                    { metric: "Оборачиваемость активов", value: "1.6", trend: "up" },
                    { metric: "Рентабельность продаж", value: "31.4%", trend: "up" },
                  ].map((kpi, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <span className="text-sm font-medium text-foreground">{kpi.metric}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-foreground">{kpi.value}</span>
                        {kpi.trend === "up" && <ArrowUp className="w-3 h-3 text-green-600" />}
                        {kpi.trend === "down" && <ArrowDown className="w-3 h-3 text-red-600" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/60 backdrop-blur-xl border border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Target className="w-5 h-5 mr-2 text-primary" />
                  Прогноз на квартал
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { period: "Февраль 2024", revenue: 3200000, expenses: 2150000, profit: 1050000 },
                    { period: "Март 2024", revenue: 3650000, expenses: 2380000, profit: 1270000 },
                    { period: "Апрель 2024", revenue: 4100000, expenses: 2650000, profit: 1450000 },
                  ].map((forecast, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">{forecast.period}</span>
                        <span className="text-sm font-medium text-green-600">
                          +{forecast.profit.toLocaleString("ru-RU")}₽
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-muted-foreground">Доходы</span>
                          <p className="font-medium text-foreground">{forecast.revenue.toLocaleString("ru-RU")}₽</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Расходы</span>
                          <p className="font-medium text-foreground">{forecast.expenses.toLocaleString("ru-RU")}₽</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
