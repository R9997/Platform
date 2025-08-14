"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { CheckCircle, ArrowRight, Lightbulb } from "lucide-react"

export function NeedsAssessment() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isCompleted, setIsCompleted] = useState(false)

  const questions = [
    {
      id: "business_size",
      title: "Размер вашего бизнеса",
      type: "radio",
      options: [
        { value: "startup", label: "Стартап (до 10 сотрудников)" },
        { value: "small", label: "Малый бизнес (10-50 сотрудников)" },
        { value: "medium", label: "Средний бизнес (50-200 сотрудников)" },
        { value: "large", label: "Крупный бизнес (200+ сотрудников)" },
      ],
    },
    {
      id: "main_challenge",
      title: "Основная проблема, которую хотите решить",
      type: "radio",
      options: [
        { value: "automation", label: "Автоматизация рутинных процессов" },
        { value: "customer_service", label: "Улучшение клиентского сервиса" },
        { value: "data_analysis", label: "Анализ данных и аналитика" },
        { value: "hr_optimization", label: "Оптимизация HR-процессов" },
      ],
    },
    {
      id: "budget_range",
      title: "Бюджет на внедрение ИИ-решений",
      type: "radio",
      options: [
        { value: "low", label: "До 300 000 ₽" },
        { value: "medium", label: "300 000 - 1 000 000 ₽" },
        { value: "high", label: "1 000 000 - 3 000 000 ₽" },
        { value: "enterprise", label: "Свыше 3 000 000 ₽" },
      ],
    },
    {
      id: "timeline",
      title: "Желаемые сроки внедрения",
      type: "radio",
      options: [
        { value: "urgent", label: "В течение месяца" },
        { value: "quarter", label: "В течение квартала" },
        { value: "half_year", label: "В течение полугода" },
        { value: "year", label: "В течение года" },
      ],
    },
  ]

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value })
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getRecommendation = () => {
    const { business_size, main_challenge, budget_range } = answers

    if (main_challenge === "automation" && budget_range === "medium") {
      return "Рекомендуем начать с разработки ИИ-бота для автоматизации внутренних процессов"
    } else if (main_challenge === "customer_service") {
      return "Идеально подойдет внешний чат-бот для клиентского сервиса"
    } else if (main_challenge === "data_analysis") {
      return "Предлагаем комплексный аудит данных и внедрение аналитических решений"
    } else {
      return "Рекомендуем начать с диагностики и аудита для определения оптимальной стратегии"
    }
  }

  if (isCompleted) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-card/50 backdrop-blur-sm soft-border-blue border text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 soft-text-blue" />
              </div>
              <CardTitle className="text-3xl font-serif font-black soft-text-blue">Оценка завершена!</CardTitle>
              <CardDescription className="text-lg">
                Спасибо за ответы. Вот наша рекомендация для вашего бизнеса:
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 rounded-lg bg-primary/10 soft-glow">
                <Lightbulb className="h-8 w-8 soft-text mx-auto mb-4" />
                <p className="text-lg font-medium">{getRecommendation()}</p>
              </div>
              <div className="space-y-4">
                <Input placeholder="Ваше имя" className="soft-border" />
                <Input placeholder="Email для связи" type="email" className="soft-border" />
                <Input placeholder="Телефон" type="tel" className="soft-border" />
                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 soft-glow text-lg py-6">
                  Получить персональную консультацию
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  const currentQuestion = questions[currentStep]

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-serif font-black mb-6">
            <span className="soft-text">Быстрая</span> <span className="soft-text-blue">оценка</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Ответьте на несколько вопросов и получите персональные рекомендации
          </p>
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index <= currentStep ? "bg-primary soft-glow" : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <Card className="bg-card/50 backdrop-blur-sm soft-border border">
          <CardHeader>
            <CardTitle className="soft-text">
              Вопрос {currentStep + 1} из {questions.length}
            </CardTitle>
            <CardDescription className="text-lg">{currentQuestion.title}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={answers[currentQuestion.id] || ""}
              onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
            >
              {currentQuestion.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="soft-border bg-transparent"
              >
                Назад
              </Button>
              <Button
                onClick={handleNext}
                disabled={!answers[currentQuestion.id]}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 soft-glow"
              >
                {currentStep === questions.length - 1 ? "Завершить" : "Далее"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
