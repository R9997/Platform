"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  FileText,
  Wand2,
  Copy,
  Download,
  RefreshCw,
  Sparkles,
  Target,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  BarChart3,
  Clock,
  Star,
} from "lucide-react"

export function ContentGenerator() {
  const [contentType, setContentType] = useState("")
  const [topic, setTopic] = useState("")
  const [tone, setTone] = useState("")
  const [targetAudience, setTargetAudience] = useState("")
  const [keywords, setKeywords] = useState("")
  const [customPrompt, setCustomPrompt] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [contentAnalysis, setContentAnalysis] = useState<any>(null)
  const [contentHistory, setContentHistory] = useState<any[]>([])

  const handleGenerate = async () => {
    if (!contentType || !topic) return

    setIsGenerating(true)
    setGenerationProgress(0)

    // Симуляция реального процесса генерации
    const progressSteps = [
      { progress: 20, message: "Анализируем тему и ключевые слова..." },
      { progress: 40, message: "Подбираем оптимальную структуру..." },
      { progress: 60, message: "Генерируем основной контент..." },
      { progress: 80, message: "Оптимизируем под целевую аудиторию..." },
      { progress: 100, message: "Финализируем и проверяем качество..." },
    ]

    for (const step of progressSteps) {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setGenerationProgress(step.progress)
    }

    const sampleContent = {
      "social-post": `🚀 Революция в бизнесе начинается с ИИ!

Представьте: ваши процессы автоматизированы, клиенты довольны, а прибыль растет на 40%. Это не мечта — это реальность с нашими ИИ-решениями.

✅ Автоматизация рутины за 2 недели
✅ Персонализация клиентского опыта  
✅ Прогнозирование трендов с точностью 94%
✅ Оптимизация затрат до 35%

Готовы к трансформации? Начните уже сегодня!

#ИИ #Автоматизация #БизнесРост #Инновации #РефреймБюро`,

      email: `Тема: Как ИИ может увеличить вашу прибыль на 40% за 3 месяца

Здравствуйте, [Имя]!

Знаете ли вы, что компании, внедрившие ИИ-решения, увеличивают прибыль в среднем на 40% за первый год? И это не просто статистика — это результат наших клиентов.

🎯 Что мы предлагаем:
• Автоматизация рутинных процессов (экономия до 156 часов в месяц)
• Улучшение качества обслуживания клиентов на 98%
• Принятие решений на основе данных с точностью 94%
• Прогнозирование рыночных трендов

💡 Реальный кейс: Компания "Альфа" увеличила продажи на 67% за 4 месяца после внедрения нашего ИИ-ассистента.

Хотите узнать, как это работает для вашей отрасли? 

👉 Запишитесь на бесплатную 30-минутную консультацию: [ссылка]

P.S. Первые 10 компаний получают скидку 25% на внедрение.

С уважением,
Команда Рефрейм Бюро
+7 (XXX) XXX-XX-XX`,

      article: `# Как ИИ трансформирует современный бизнес: Практическое руководство 2024

## Введение

Искусственный интеллект перестал быть технологией будущего — он уже здесь и активно меняет способы ведения бизнеса. По данным McKinsey, компании, внедрившие ИИ, показывают рост прибыли на 40% выше среднерыночного.

## Ключевые области применения ИИ в бизнесе

### 1. Автоматизация процессов (ROI: +520%)
ИИ позволяет автоматизировать до 80% рутинных задач:
- Обработка документов и заявок
- Управление складскими запасами
- Планирование ресурсов
- Клиентская поддержка 24/7

**Кейс:** Компания "Бета" сократила время обработки заявок с 4 часов до 15 минут.

### 2. Персонализация клиентского опыта (ROI: +340%)
Алгоритмы машинного обучения анализируют поведение клиентов:
- Персональные рекомендации товаров
- Динамическое ценообразование
- Прогнозирование потребностей
- Сегментация аудитории

### 3. Прогнозная аналитика (ROI: +280%)
ИИ помогает предсказывать:
- Спрос на товары и услуги
- Поведение клиентов
- Рыночные тренды
- Потенциальные риски

## Этапы внедрения ИИ

1. **Аудит процессов** (1-2 недели)
2. **Выбор приоритетных задач** (1 неделя)
3. **Пилотный проект** (1-2 месяца)
4. **Масштабирование** (3-6 месяцев)

## Заключение

Внедрение ИИ — это не просто технологическое обновление, это стратегическое решение, которое определит успех вашего бизнеса в ближайшие годы. Начните с малого, но начните уже сегодня.

**Готовы к трансформации?** Свяжитесь с экспертами Рефрейм Бюро для бесплатной консультации.`,

      "product-description": `# ИИ-Платформа "Рефрейм Бизнес" - Ваш персональный помощник роста

## Что это?
Комплексное решение для автоматизации бизнес-процессов с помощью искусственного интеллекта. Платформа объединяет 12+ ИИ-инструментов в едином интерфейсе.

## Ключевые возможности:
✅ **Генератор контента** - создание текстов, постов, статей
✅ **Анализатор данных** - обработка продаж и клиентской базы  
✅ **Автоматизация процессов** - workflow и рутинные задачи
✅ **Персональный ассистент** - планирование и управление
✅ **Прогнозная аналитика** - тренды и прогнозы

## Результаты клиентов:
• Рост прибыли на 40% за первый год
• Экономия времени до 156 часов в месяц
• Повышение эффективности на 94%
• Автоматизация 80% рутинных задач

## Тарифы:
- **Стартер**: 15,000₽/мес (до 3 инструментов)
- **Бизнес**: 35,000₽/мес (все инструменты)
- **Корпоративный**: от 75,000₽/мес (индивидуальная настройка)

**Бесплатный пробный период 14 дней!**

Начните трансформацию уже сегодня 👉 [Попробовать бесплатно]`,
    }

    const content = sampleContent[contentType as keyof typeof sampleContent] || "Контент сгенерирован успешно!"
    setGeneratedContent(content)

    const analysis = {
      readabilityScore: Math.floor(Math.random() * 20) + 80,
      seoScore: Math.floor(Math.random() * 15) + 85,
      engagementPotential: Math.floor(Math.random() * 10) + 90,
      wordCount: content.split(" ").length,
      charCount: content.length,
      readingTime: Math.ceil(content.split(" ").length / 200),
      keywords: keywords
        .split(",")
        .map((k) => k.trim())
        .filter((k) => k),
      suggestions: [
        "Добавьте больше эмоциональных триггеров",
        "Включите конкретные цифры и статистику",
        "Усильте призыв к действию",
      ],
    }
    setContentAnalysis(analysis)

    const historyItem = {
      id: Date.now(),
      type: contentType,
      topic,
      content: content.substring(0, 100) + "...",
      createdAt: new Date().toLocaleString(),
      analysis,
    }
    setContentHistory((prev) => [historyItem, ...prev.slice(0, 9)]) // Храним последние 10

    setIsGenerating(false)
    setGenerationProgress(0)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent)
  }

  const downloadContent = () => {
    const element = document.createElement("a")
    const file = new Blob([generatedContent], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `content-${contentType}-${Date.now()}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="generator" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="generator" className="flex items-center">
            <Wand2 className="w-4 h-4 mr-2" />
            Генератор
          </TabsTrigger>
          <TabsTrigger value="analysis" className="flex items-center">
            <BarChart3 className="w-4 h-4 mr-2" />
            Анализ
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            История
          </TabsTrigger>
        </TabsList>

        <TabsContent value="generator" className="space-y-6">
          <Card className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5 border border-primary/20 shadow-lg shadow-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center text-foreground">
                <div className="p-2 bg-primary/10 rounded-lg mr-3">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                Генератор контента
                <Badge variant="secondary" className="ml-3 bg-primary/10 text-primary">
                  <Sparkles className="w-3 h-3 mr-1" />
                  ИИ-powered
                </Badge>
              </CardTitle>
              <CardDescription>Создавайте качественный контент для вашего бизнеса с помощью ИИ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Тип контента</label>
                  <Select value={contentType} onValueChange={setContentType}>
                    <SelectTrigger className="bg-background border-border/50 hover:border-primary/50 transition-colors">
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="social-post">📱 Пост для соцсетей</SelectItem>
                      <SelectItem value="email">📧 Email рассылка</SelectItem>
                      <SelectItem value="article">📝 Статья/блог</SelectItem>
                      <SelectItem value="product-description">🛍️ Описание товара</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Тон</label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="bg-background border-border/50 hover:border-primary/50 transition-colors">
                      <SelectValue placeholder="Выберите тон" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">🎯 Профессиональный</SelectItem>
                      <SelectItem value="friendly">😊 Дружелюбный</SelectItem>
                      <SelectItem value="persuasive">💪 Убедительный</SelectItem>
                      <SelectItem value="informative">📚 Информативный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Целевая аудитория</label>
                  <Select value={targetAudience} onValueChange={setTargetAudience}>
                    <SelectTrigger className="bg-background border-border/50 hover:border-primary/50 transition-colors">
                      <SelectValue placeholder="Выберите аудиторию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="b2b">🏢 B2B клиенты</SelectItem>
                      <SelectItem value="b2c">👥 B2C клиенты</SelectItem>
                      <SelectItem value="investors">💼 Инвесторы</SelectItem>
                      <SelectItem value="employees">👨‍💼 Сотрудники</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Ключевые слова</label>
                  <Input
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="ИИ, автоматизация, бизнес"
                    className="bg-background border-border/50 hover:border-primary/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Тема/описание</label>
                <Textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Опишите, о чем должен быть контент. Например: преимущества ИИ в бизнесе, кейсы автоматизации..."
                  className="bg-background border-border/50 hover:border-primary/50 transition-colors min-h-[80px]"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Дополнительные инструкции (опционально)
                </label>
                <Textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Добавьте специальные требования: стиль, структура, акценты..."
                  className="bg-background border-border/50 hover:border-primary/50 transition-colors"
                  rows={3}
                />
              </div>

              {isGenerating && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Генерация контента...</span>
                    <span className="text-sm font-medium text-foreground">{generationProgress}%</span>
                  </div>
                  <Progress value={generationProgress} className="h-2" />
                </div>
              )}

              <Button
                onClick={handleGenerate}
                disabled={!contentType || !topic || isGenerating}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg shadow-primary/25 transition-all duration-300"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Генерируем контент...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Сгенерировать контент
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {generatedContent && (
            <Card className="bg-card/60 backdrop-blur-xl border border-border/50 shadow-xl shadow-primary/5">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-foreground flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                    Сгенерированный контент
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyToClipboard}
                      className="hover:bg-primary/10 bg-transparent"
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Копировать
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={downloadContent}
                      className="hover:bg-primary/10 bg-transparent"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Скачать
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-background/50 border border-border/30 rounded-lg p-4 mb-4">
                  <pre className="whitespace-pre-wrap text-sm text-foreground font-sans leading-relaxed">
                    {generatedContent}
                  </pre>
                </div>
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      <FileText className="w-3 h-3 mr-1" />
                      Символов: {generatedContent.length}
                    </Badge>
                    <Badge variant="secondary" className="bg-accent/10 text-accent">
                      <Target className="w-3 h-3 mr-1" />
                      Слов: {generatedContent.split(" ").length}
                    </Badge>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                      <Clock className="w-3 h-3 mr-1" />
                      Чтение: ~{Math.ceil(generatedContent.split(" ").length / 200)} мин
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    variant="outline"
                    className="hover:bg-primary/10 bg-transparent"
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Перегенерировать
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          {contentAnalysis ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <BarChart3 className="w-5 h-5 mr-2 text-primary" />
                    Анализ качества
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Читаемость</span>
                      <span className="text-sm font-medium text-foreground">{contentAnalysis.readabilityScore}%</span>
                    </div>
                    <Progress value={contentAnalysis.readabilityScore} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">SEO оптимизация</span>
                      <span className="text-sm font-medium text-foreground">{contentAnalysis.seoScore}%</span>
                    </div>
                    <Progress value={contentAnalysis.seoScore} className="h-2" />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Потенциал вовлечения</span>
                      <span className="text-sm font-medium text-foreground">
                        {contentAnalysis.engagementPotential}%
                      </span>
                    </div>
                    <Progress value={contentAnalysis.engagementPotential} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-foreground">
                    <Lightbulb className="w-5 h-5 mr-2 text-primary" />
                    Рекомендации
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {contentAnalysis.suggestions.map((suggestion: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-start space-x-2 p-3 bg-primary/5 rounded-lg border border-primary/20"
                      >
                        <AlertCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Сгенерируйте контент, чтобы увидеть анализ</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          {contentHistory.length > 0 ? (
            <div className="space-y-4">
              {contentHistory.map((item) => (
                <Card
                  key={item.id}
                  className="bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{item.createdAt}</span>
                        </div>
                        <p className="text-sm text-foreground mb-2">{item.topic}</p>
                        <p className="text-xs text-muted-foreground">{item.content}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span className="text-xs text-foreground">{item.analysis.readabilityScore}%</span>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
              <CardContent className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">История генерации пуста</p>
                  <p className="text-sm text-muted-foreground mt-2">Создайте первый контент, чтобы увидеть историю</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
