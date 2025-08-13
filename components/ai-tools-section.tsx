import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, ImageIcon, BarChart3, FileText, Zap, ArrowRight } from "lucide-react"

const tools = [
  {
    icon: MessageSquare,
    title: "ИИ Чат-бот",
    description: "Интеллектуальный помощник для автоматизации общения с клиентами",
    features: ["24/7 поддержка", "Многоязычность", "Обучение на ваших данных"],
    color: "cyan",
  },
  {
    icon: ImageIcon,
    title: "Генерация изображений",
    description: "Создание уникальных визуалов с помощью передовых ИИ моделей",
    features: ["Высокое качество", "Различные стили", "Быстрая генерация"],
    color: "purple",
  },
  {
    icon: BarChart3,
    title: "Аналитика данных",
    description: "Глубокий анализ и прогнозирование с использованием машинного обучения",
    features: ["Предиктивная аналитика", "Визуализация", "Автоматические отчеты"],
    color: "green",
  },
  {
    icon: FileText,
    title: "Обработка текста",
    description: "Автоматическое создание и редактирование контента",
    features: ["Генерация текста", "Перевод", "Суммаризация"],
    color: "cyan",
  },
]

export function AIToolsSection() {
  return (
    <section id="tools" className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-accent/10 neon-border-purple border">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium neon-text-purple">Наши инструменты</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-black mb-6">
            <span className="neon-text-purple">ИИ решения</span>{" "}
            <span className="text-foreground">для вашего бизнеса</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Откройте для себя мощные инструменты искусственного интеллекта, которые трансформируют ваши рабочие процессы
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tools.map((tool, index) => {
            const Icon = tool.icon
            const glowClass =
              tool.color === "cyan"
                ? "neon-glow-cyan"
                : tool.color === "purple"
                  ? "neon-glow-purple"
                  : "neon-glow-green"
            const textClass =
              tool.color === "cyan"
                ? "neon-text-cyan"
                : tool.color === "purple"
                  ? "neon-text-purple"
                  : "neon-text-green"
            const borderClass =
              tool.color === "cyan"
                ? "neon-border-cyan"
                : tool.color === "purple"
                  ? "neon-border-purple"
                  : "neon-border-green"

            return (
              <Card
                key={index}
                className={`bg-card/50 backdrop-blur-sm border ${borderClass} hover:${glowClass} transition-all duration-300 group`}
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 ${glowClass} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`h-6 w-6 ${textClass}`} />
                  </div>
                  <CardTitle className="text-xl font-serif font-bold">{tool.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    {tool.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full bg-primary mr-2 ${glowClass}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="ghost" className={`w-full hover:${textClass} transition-all duration-300`}>
                    Подробнее
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-accent hover:bg-accent/90 neon-glow-purple text-lg px-8 py-6">
            Посмотреть все инструменты
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
