import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  Brain,
  BarChart3,
  Zap,
  Shield,
  Users,
  Cog,
  MessageSquare,
  FileText,
  Database,
  Workflow,
  Target,
} from "lucide-react"
import Link from "next/link"

export default function SolutionsPage() {
  const solutions = [
    {
      icon: Brain,
      title: "ИИ-Ассистенты",
      description: "Персонализированные чат-боты и виртуальные помощники для автоматизации клиентского сервиса",
      features: [
        "Обработка естественного языка",
        "Интеграция с CRM",
        "Многоязычная поддержка",
        "Обучение на ваших данных",
      ],
      category: "Автоматизация",
      price: "от 15 000 ₽/мес",
    },
    {
      icon: BarChart3,
      title: "Аналитика данных",
      description: "Глубокий анализ бизнес-данных с помощью машинного обучения и предиктивной аналитики",
      features: [
        "Прогнозирование трендов",
        "Визуализация данных",
        "Автоматические отчеты",
        "Интеграция с BI-системами",
      ],
      category: "Аналитика",
      price: "от 25 000 ₽/мес",
    },
    {
      icon: FileText,
      title: "Генерация контента",
      description: "Автоматическое создание текстов, статей, описаний товаров и маркетинговых материалов",
      features: ["SEO-оптимизация", "Брендинг и тон голоса", "Массовая генерация", "Контроль качества"],
      category: "Контент",
      price: "от 10 000 ₽/мес",
    },
    {
      icon: Workflow,
      title: "Автоматизация процессов",
      description: "Оптимизация и автоматизация бизнес-процессов с помощью ИИ-алгоритмов",
      features: ["Анализ процессов", "RPA интеграция", "Мониторинг эффективности", "Непрерывная оптимизация"],
      category: "Процессы",
      price: "от 30 000 ₽/мес",
    },
    {
      icon: Database,
      title: "Обработка документов",
      description: "Извлечение и структурирование данных из документов любого формата",
      features: ["OCR технологии", "Классификация документов", "Извлечение ключевых данных", "API интеграция"],
      category: "Документооборот",
      price: "от 20 000 ₽/мес",
    },
    {
      icon: Target,
      title: "Персонализация",
      description: "Индивидуальные рекомендации и персонализированный пользовательский опыт",
      features: ["Рекомендательные системы", "Поведенческий анализ", "A/B тестирование", "Динамический контент"],
      category: "Маркетинг",
      price: "от 18 000 ₽/мес",
    },
  ]

  const industries = [
    { name: "E-commerce", description: "Персонализация покупок и автоматизация поддержки" },
    { name: "Финансы", description: "Анализ рисков и автоматизация операций" },
    { name: "Здравоохранение", description: "Анализ медицинских данных и диагностика" },
    { name: "Образование", description: "Персонализированное обучение и оценка знаний" },
    { name: "Производство", description: "Предиктивное обслуживание и контроль качества" },
    { name: "Логистика", description: "Оптимизация маршрутов и управление складами" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10 bg-transparent">
                <Home className="w-4 h-4 mr-2" />
                На главную
              </Button>
            </Link>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-serif font-bold soft-text mb-6">Наши ИИ-решения</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Комплексные решения на основе искусственного интеллекта для трансформации вашего бизнеса. От автоматизации
              процессов до глубокой аналитики данных.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Безопасность данных
              </Badge>
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <Zap className="w-4 h-4 mr-2" />
                Быстрое внедрение
              </Badge>
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                Поддержка 24/7
              </Badge>
            </div>
          </div>

          {/* Solutions Grid */}
          <div className="mb-20">
            <h2 className="text-3xl font-serif font-bold text-center mb-12 soft-text">
              Готовые решения для вашего бизнеса
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solutions.map((solution, index) => (
                <Card
                  key={index}
                  className="bg-card/50 backdrop-blur-sm border soft-border hover:soft-glow transition-all duration-300 h-full"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-lg bg-primary/10 soft-border">
                        <solution.icon className="h-6 w-6 soft-text" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {solution.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-foreground font-serif text-xl">{solution.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">{solution.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-3">Возможности:</h4>
                      <ul className="space-y-2 mb-6">
                        {solution.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="text-sm text-muted-foreground flex items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-3 flex-shrink-0"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-lg font-bold soft-text">{solution.price}</span>
                      <Button size="sm" className="bg-primary hover:bg-primary/90 text-primary-foreground soft-glow">
                        Подробнее
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Industries Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-serif font-bold text-center mb-12 soft-text">Отраслевые решения</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industries.map((industry, index) => (
                <Card
                  key={index}
                  className="bg-card/30 backdrop-blur-sm border soft-border hover:soft-glow-blue transition-all duration-300"
                >
                  <CardContent className="p-6">
                    <h3 className="font-serif font-bold text-lg text-foreground mb-2">{industry.name}</h3>
                    <p className="text-muted-foreground text-sm">{industry.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border soft-border">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-serif font-bold soft-text mb-4">Готовы начать трансформацию?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Наши эксперты помогут выбрать оптимальное решение для вашего бизнеса и проведут бесплатную консультацию.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground soft-glow">
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Получить консультацию
                  </Button>
                </Link>
                <Link href="/platform">
                  <Button size="lg" variant="outline" className="soft-border hover:soft-glow bg-transparent">
                    <Cog className="w-5 h-5 mr-2" />
                    Попробовать платформу
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
