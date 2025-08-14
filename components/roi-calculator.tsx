"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calculator, TrendingUp, Clock, Users } from "lucide-react"

export function ROICalculator() {
  const [employees, setEmployees] = useState<number>(10)
  const [hoursPerDay, setHoursPerDay] = useState<number>(2)
  const [hourlyRate, setHourlyRate] = useState<number>(1500)
  const [implementationCost, setImplementationCost] = useState<number>(500000)

  const dailySavings = employees * hoursPerDay * hourlyRate
  const monthlySavings = dailySavings * 22 // рабочие дни в месяце
  const yearlySavings = monthlySavings * 12
  const roi = ((yearlySavings - implementationCost) / implementationCost) * 100
  const paybackMonths = Math.ceil(implementationCost / monthlySavings)

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-accent/5 to-primary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 soft-border border">
              <Calculator className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium soft-text">ROI Калькулятор</span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-black mb-6">
            <span className="soft-text">Рассчитайте</span> <span className="soft-text-blue">экономию</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Узнайте, сколько времени и денег сэкономят ИИ-решения для вашего бизнеса
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-card/50 backdrop-blur-sm soft-border border">
            <CardHeader>
              <CardTitle className="soft-text">Параметры вашего бизнеса</CardTitle>
              <CardDescription>Введите данные для расчета экономии</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="employees">Количество сотрудников</Label>
                <Input
                  id="employees"
                  type="number"
                  value={employees}
                  onChange={(e) => setEmployees(Number(e.target.value))}
                  className="soft-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hours">Часов рутинной работы в день (на сотрудника)</Label>
                <Input
                  id="hours"
                  type="number"
                  step="0.5"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(Number(e.target.value))}
                  className="soft-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rate">Стоимость часа работы сотрудника (₽)</Label>
                <Input
                  id="rate"
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="soft-border"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">Стоимость внедрения ИИ-решения (₽)</Label>
                <Input
                  id="cost"
                  type="number"
                  value={implementationCost}
                  onChange={(e) => setImplementationCost(Number(e.target.value))}
                  className="soft-border"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm soft-border-blue border">
            <CardHeader>
              <CardTitle className="soft-text-blue">Результаты расчета</CardTitle>
              <CardDescription>Потенциальная экономия от внедрения ИИ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-primary/10 soft-glow">
                  <Clock className="h-8 w-8 soft-text mx-auto mb-2" />
                  <div className="text-2xl font-bold soft-text">{employees * hoursPerDay}</div>
                  <div className="text-sm text-muted-foreground">часов в день</div>
                </div>
                <div className="text-center p-4 rounded-lg bg-accent/10 soft-glow-blue">
                  <Users className="h-8 w-8 soft-text-blue mx-auto mb-2" />
                  <div className="text-2xl font-bold soft-text-blue">{employees}</div>
                  <div className="text-sm text-muted-foreground">сотрудников</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <span>Экономия в месяц:</span>
                  <span className="font-bold soft-text">{monthlySavings.toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                  <span>Экономия в год:</span>
                  <span className="font-bold soft-text-blue">{yearlySavings.toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10 soft-glow">
                  <span>ROI за год:</span>
                  <span className="font-bold text-xl soft-text">{roi.toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-accent/10 soft-glow-blue">
                  <span>Окупаемость:</span>
                  <span className="font-bold soft-text-blue">{paybackMonths} мес.</span>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 soft-glow">
                <TrendingUp className="mr-2 h-4 w-4" />
                Получить персональный расчет
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
