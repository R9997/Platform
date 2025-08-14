"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { FileText, Wand2, Copy, Download, RefreshCw } from "lucide-react"

export function ContentGenerator() {
  const [contentType, setContentType] = useState("")
  const [topic, setTopic] = useState("")
  const [tone, setTone] = useState("")
  const [length, setLength] = useState("")
  const [generatedContent, setGeneratedContent] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    if (!contentType || !topic) return

    setIsGenerating(true)

    setTimeout(() => {
      const sampleContent = {
        "social-post": `🚀 Революция в бизнесе начинается с ИИ!

Представьте: ваши процессы автоматизированы, клиенты довольны, а прибыль растет на 40%. Это не мечта — это реальность с нашими ИИ-решениями.

✅ Автоматизация рутины
✅ Персонализация клиентского опыта  
✅ Прогнозирование трендов
✅ Оптимизация затрат

Готовы к трансформации? Начните уже сегодня!

#ИИ #Автоматизация #БизнесРост #Инновации`,

        email: `Тема: Как ИИ может увеличить вашу прибыль на 40%

Здравствуйте!

Знаете ли вы, что компании, внедрившие ИИ-решения, увеличивают прибыль в среднем на 40% за первый год?

Мы в Рефрейм Бюро помогаем бизнесу:
• Автоматизировать рутинные процессы
• Улучшить качество обслуживания клиентов
• Принимать решения на основе данных
• Прогнозировать рыночные тренды

Хотите узнать, как это работает для вашей отрасли? Запишитесь на бесплатную консультацию.

С уважением,
Команда Рефрейм Бюро`,

        article: `# Как ИИ трансформирует современный бизнес

## Введение

Искусственный интеллект перестал быть технологией будущего — он уже здесь и активно меняет способы ведения бизнеса. Компании, которые внедряют ИИ-решения сегодня, получают значительное конкурентное преимущество.

## Ключевые области применения ИИ в бизнесе

### 1. Автоматизация процессов
ИИ позволяет автоматизировать до 80% рутинных задач, освобождая сотрудников для более творческой и стратегической работы.

### 2. Персонализация клиентского опыта
Алгоритмы машинного обучения анализируют поведение клиентов и предлагают персонализированные решения.

### 3. Прогнозная аналитика
ИИ помогает предсказывать тренды, спрос и потенциальные проблемы, позволяя принимать проактивные решения.

## Заключение

Внедрение ИИ — это не просто технологическое обновление, это стратегическое решение, которое определит успех вашего бизнеса в ближайшие годы.`,
      }

      setGeneratedContent(sampleContent[contentType as keyof typeof sampleContent] || "Контент сгенерирован успешно!")
      setIsGenerating(false)
    }, 2000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center text-foreground">
            <FileText className="w-5 h-5 mr-2 text-primary" />
            Генератор контента
          </CardTitle>
          <CardDescription>Создавайте качественный контент для вашего бизнеса</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Тип контента</label>
              <Select value={contentType} onValueChange={setContentType}>
                <SelectTrigger className="bg-background border-border/50">
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="social-post">Пост для соцсетей</SelectItem>
                  <SelectItem value="email">Email рассылка</SelectItem>
                  <SelectItem value="article">Статья/блог</SelectItem>
                  <SelectItem value="product-description">Описание товара</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Тон</label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger className="bg-background border-border/50">
                  <SelectValue placeholder="Выберите тон" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Профессиональный</SelectItem>
                  <SelectItem value="friendly">Дружелюбный</SelectItem>
                  <SelectItem value="persuasive">Убедительный</SelectItem>
                  <SelectItem value="informative">Информативный</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Тема/ключевые слова</label>
            <Input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Например: ИИ в бизнесе, автоматизация процессов..."
              className="bg-background border-border/50"
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={!contentType || !topic || isGenerating}
            className="w-full bg-primary hover:bg-primary/90"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Генерируем контент...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Сгенерировать контент
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {generatedContent && (
        <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-foreground">Сгенерированный контент</CardTitle>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={copyToClipboard}>
                  <Copy className="w-4 h-4 mr-1" />
                  Копировать
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-1" />
                  Скачать
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-background/50 border border-border/30 rounded-lg p-4">
              <pre className="whitespace-pre-wrap text-sm text-foreground font-sans">{generatedContent}</pre>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex space-x-2">
                <Badge variant="secondary">Символов: {generatedContent.length}</Badge>
                <Badge variant="secondary">Слов: {generatedContent.split(" ").length}</Badge>
              </div>
              <Button size="sm" onClick={handleGenerate} disabled={isGenerating}>
                <RefreshCw className="w-4 h-4 mr-1" />
                Перегенерировать
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
