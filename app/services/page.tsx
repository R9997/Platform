import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, MessageSquare, BarChart3, Zap, Shield, Cpu, Home } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      icon: Brain,
      title: "ИИ Консультации",
      description: "Персональные консультации по внедрению ИИ в ваш бизнес",
      features: ["Анализ потребностей", "Стратегия внедрения", "Обучение команды"],
    },
    {
      icon: MessageSquare,
      title: "Чат-боты и Ассистенты",
      description: "Умные чат-боты для автоматизации клиентского сервиса",
      features: ["24/7 поддержка", "Многоязычность", "Интеграция с CRM"],
    },
    {
      icon: BarChart3,
      title: "Аналитика данных",
      description: "Глубокий анализ данных с помощью машинного обучения",
      features: ["Предиктивная аналитика", "Визуализация данных", "Автоматические отчеты"],
    },
    {
      icon: Zap,
      title: "Автоматизация процессов",
      description: "Автоматизация рутинных задач с помощью ИИ",
      features: ["RPA решения", "Workflow оптимизация", "Интеграция систем"],
    },
    {
      icon: Shield,
      title: "ИИ Безопасность",
      description: "Защита от киберугроз с использованием ИИ",
      features: ["Обнаружение аномалий", "Предотвращение атак", "Мониторинг 24/7"],
    },
    {
      icon: Cpu,
      title: "Кастомные ИИ решения",
      description: "Разработка уникальных ИИ решений под ваши задачи",
      features: ["Индивидуальная разработка", "Полная интеграция", "Техподдержка"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button
                variant="outline"
                className="border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
              >
                <Home className="w-4 h-4 mr-2" />
                На главную
              </Button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 neon-text mb-4">Наши услуги</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Полный спектр ИИ-решений для трансформации вашего бизнеса
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="bg-card/80 backdrop-blur-sm border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-cyan-400">{service.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white">
                    Узнать больше
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Card className="bg-card/80 backdrop-blur-sm border-cyan-500/20 p-8">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4">Готовы начать трансформацию?</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Свяжитесь с нами для бесплатной консультации и узнайте, как ИИ может изменить ваш бизнес
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white"
              >
                Получить консультацию
              </Button>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
