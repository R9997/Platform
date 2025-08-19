import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ChatWidget } from "@/components/chat-widget"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Star, Users, Globe, Award, Mail, MapPin, Calendar } from "lucide-react"
import Link from "next/link"

const allPartners = [
  {
    id: 1,
    name: "TechCorp Solutions",
    logo: "/techcorp-logo.png",
    category: "Технологический партнер",
    description:
      "Ведущий поставщик облачных решений и ИИ-технологий для автоматизации бизнес-процессов. Компания специализируется на разработке инновационных решений для цифровой трансформации бизнеса.",
    specialization: ["Облачные технологии", "ИИ и ML", "Автоматизация", "DevOps"],
    rating: 4.9,
    projects: 150,
    website: "https://techcorp.example.com",
    email: "partnership@techcorp.com",
    phone: "+7 (495) 123-45-67",
    location: "Москва, Россия",
    partnership_since: "2020",
    featured: true,
    achievements: ["AWS Advanced Partner", "Microsoft Gold Partner", "Google Cloud Premier Partner"],
  },
  {
    id: 2,
    name: "DataFlow Analytics",
    logo: "/dataflow-logo.png",
    category: "Аналитический партнер",
    description:
      "Экспертиза в области больших данных и бизнес-аналитики для принятия стратегических решений. Помогаем компаниям извлекать ценные инсайты из данных.",
    specialization: ["Big Data", "Бизнес-аналитика", "Прогнозирование", "Data Science"],
    rating: 4.8,
    projects: 89,
    website: "https://dataflow.example.com",
    email: "info@dataflow.com",
    phone: "+7 (812) 987-65-43",
    location: "Санкт-Петербург, Россия",
    partnership_since: "2021",
    featured: true,
    achievements: ["Tableau Gold Partner", "Power BI Expert", "Qlik Elite Partner"],
  },
  {
    id: 3,
    name: "SecureNet Systems",
    logo: "/securenet-logo.png",
    category: "Партнер по безопасности",
    description:
      "Комплексные решения по кибербезопасности и защите корпоративных данных. Обеспечиваем максимальный уровень защиты для критически важных систем.",
    specialization: ["Кибербезопасность", "Защита данных", "Аудит безопасности", "Compliance"],
    rating: 4.9,
    projects: 67,
    website: "https://securenet.example.com",
    email: "security@securenet.com",
    phone: "+7 (495) 555-12-34",
    location: "Москва, Россия",
    partnership_since: "2019",
    featured: false,
    achievements: ["ISO 27001 Certified", "CISSP Certified Team", "SOC 2 Type II"],
  },
  {
    id: 4,
    name: "CloudScale Infrastructure",
    logo: "/cloudscale-logo.png",
    category: "Инфраструктурный партнер",
    description:
      "Масштабируемые облачные инфраструктурные решения для растущих компаний. Специализируемся на построении отказоустойчивых и высокопроизводительных систем.",
    specialization: ["Облачная инфраструктура", "DevOps", "Масштабирование", "Мониторинг"],
    rating: 4.7,
    projects: 134,
    website: "https://cloudscale.example.com",
    email: "partners@cloudscale.com",
    phone: "+7 (343) 777-88-99",
    location: "Екатеринбург, Россия",
    partnership_since: "2020",
    featured: false,
    achievements: ["Kubernetes Certified", "Docker Certified", "Terraform Certified"],
  },
  {
    id: 5,
    name: "FinTech Innovations",
    logo: "/fintech-logo.png",
    category: "Финтех партнер",
    description:
      "Инновационные финансовые технологии и решения для цифровой трансформации финансового сектора. Разрабатываем современные платежные и банковские решения.",
    specialization: ["Финтех", "Платежные системы", "Блокчейн", "DeFi"],
    rating: 4.8,
    projects: 92,
    website: "https://fintech.example.com",
    email: "business@fintech.com",
    phone: "+7 (495) 333-22-11",
    location: "Москва, Россия",
    partnership_since: "2021",
    featured: true,
    achievements: ["PCI DSS Certified", "Blockchain Expert", "Open Banking Ready"],
  },
  {
    id: 6,
    name: "GreenTech Solutions",
    logo: "/greentech-logo.png",
    category: "Экологический партнер",
    description:
      "Устойчивые технологические решения для экологически ответственного бизнеса. Помогаем компаниям достигать ESG-целей через инновационные технологии.",
    specialization: ["Зеленые технологии", "ESG", "Устойчивое развитие", "Carbon Tracking"],
    rating: 4.6,
    projects: 45,
    website: "https://greentech.example.com",
    email: "sustainability@greentech.com",
    phone: "+7 (495) 444-55-66",
    location: "Москва, Россия",
    partnership_since: "2022",
    featured: false,
    achievements: ["B Corp Certified", "Carbon Neutral", "UN Global Compact"],
  },
]

export default function PartnersPage() {
  const featuredPartners = allPartners.filter((partner) => partner.featured)
  const regularPartners = allPartners.filter((partner) => !partner.featured)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 text-sm font-medium">
                Партнерская экосистема
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                Наши партнеры
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Сотрудничество с ведущими технологическими компаниями для создания инновационных решений и достижения
                выдающихся результатов
              </p>
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="text-center p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">15+</div>
                <div className="text-muted-foreground">Активных партнеров</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Совместных проектов</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">Успешных интеграций</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Техническая поддержка</div>
              </div>
            </div>
          </div>
        </section>

        {/* Рекомендуемые партнеры */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Рекомендуемые партнеры</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Наши ключевые партнеры с проверенной экспертизой и высокими рейтингами
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {featuredPartners.map((partner) => (
                <Card
                  key={partner.id}
                  className="group hover:shadow-2xl transition-all duration-300 border-2 border-primary/20 bg-gradient-to-br from-background to-muted/10"
                >
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <img
                        src={partner.logo || "/placeholder.svg"}
                        alt={`${partner.name} logo`}
                        className="h-16 w-auto object-contain"
                      />
                      <Badge variant="secondary" className="text-xs font-medium">
                        {partner.category}
                      </Badge>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {partner.name}
                    </h3>

                    <p className="text-muted-foreground mb-6 leading-relaxed">{partner.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {partner.specialization.map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>

                    <div className="space-y-3 mb-6 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{partner.rating} рейтинг</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          <span>{partner.projects} проектов</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Партнеры с {partner.partnership_since} года</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{partner.location}</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <h4 className="font-semibold text-sm">Достижения:</h4>
                      <div className="flex flex-wrap gap-1">
                        {partner.achievements.map((achievement, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            <Award className="h-3 w-3 mr-1" />
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 bg-transparent"
                        asChild
                      >
                        <Link href={partner.website} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4 mr-2" />
                          Сайт
                          <ExternalLink className="h-3 w-3 ml-2" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`mailto:${partner.email}`}>
                          <Mail className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Все партнеры */}
        <section className="py-16 sm:py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Все партнеры</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Полный список наших надежных партнеров по различным направлениям
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPartners.map((partner) => (
                <Card key={partner.id} className="group hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <img
                        src={partner.logo || "/placeholder.svg"}
                        alt={`${partner.name} logo`}
                        className="h-12 w-auto object-contain"
                      />
                      <Badge variant="outline" className="text-xs">
                        {partner.category}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {partner.name}
                    </h3>

                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">
                      {partner.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {partner.specialization.slice(0, 3).map((spec, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{partner.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>{partner.projects}</span>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 bg-transparent"
                      asChild
                    >
                      <Link href={partner.website} target="_blank" rel="noopener noreferrer">
                        <Globe className="h-4 w-4 mr-2" />
                        Подробнее
                        <ExternalLink className="h-3 w-3 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 bg-gradient-to-r from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Хотите стать нашим партнером?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Присоединяйтесь к нашей экосистеме инновационных решений и создавайте будущее технологий вместе с нами
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
              asChild
            >
              <Link href="/contact">
                <Mail className="h-5 w-5 mr-2" />
                Связаться с нами
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
