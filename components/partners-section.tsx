"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Star, Users, Globe, Award } from "lucide-react"
import Link from "next/link"

const partners = [
  {
    id: 1,
    name: "TechCorp Solutions",
    logo: "/techcorp-logo.png",
    category: "Технологический партнер",
    description: "Ведущий поставщик облачных решений и ИИ-технологий для автоматизации бизнес-процессов",
    specialization: ["Облачные технологии", "ИИ и ML", "Автоматизация"],
    rating: 4.9,
    projects: 150,
    website: "https://techcorp.example.com",
    featured: true,
  },
  {
    id: 2,
    name: "DataFlow Analytics",
    logo: "/dataflow-logo.png",
    category: "Аналитический партнер",
    description: "Экспертиза в области больших данных и бизнес-аналитики для принятия стратегических решений",
    specialization: ["Big Data", "Бизнес-аналитика", "Прогнозирование"],
    rating: 4.8,
    projects: 89,
    website: "https://dataflow.example.com",
    featured: true,
  },
  {
    id: 3,
    name: "SecureNet Systems",
    logo: "/securenet-logo.png",
    category: "Партнер по безопасности",
    description: "Комплексные решения по кибербезопасности и защите корпоративных данных",
    specialization: ["Кибербезопасность", "Защита данных", "Аудит безопасности"],
    rating: 4.9,
    projects: 67,
    website: "https://securenet.example.com",
    featured: false,
  },
  {
    id: 4,
    name: "CloudScale Infrastructure",
    logo: "/cloudscale-logo.png",
    category: "Инфраструктурный партнер",
    description: "Масштабируемые облачные инфраструктурные решения для растущих компаний",
    specialization: ["Облачная инфраструктура", "DevOps", "Масштабирование"],
    rating: 4.7,
    projects: 134,
    website: "https://cloudscale.example.com",
    featured: false,
  },
  {
    id: 5,
    name: "FinTech Innovations",
    logo: "/fintech-logo.png",
    category: "Финтех партнер",
    description: "Инновационные финансовые технологии и решения для цифровой трансформации",
    specialization: ["Финтех", "Платежные системы", "Блокчейн"],
    rating: 4.8,
    projects: 92,
    website: "https://fintech.example.com",
    featured: true,
  },
  {
    id: 6,
    name: "GreenTech Solutions",
    logo: "/greentech-logo.png",
    category: "Экологический партнер",
    description: "Устойчивые технологические решения для экологически ответственного бизнеса",
    specialization: ["Зеленые технологии", "ESG", "Устойчивое развитие"],
    rating: 4.6,
    projects: 45,
    website: "https://greentech.example.com",
    featured: false,
  },
]

export function PartnersSection() {
  const featuredPartners = partners.filter((partner) => partner.featured)

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <Badge variant="outline" className="mb-4 text-sm font-medium">
            Наши партнеры
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            Экосистема надежных партнеров
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Мы сотрудничаем с ведущими технологическими компаниями для предоставления комплексных решений высочайшего
            качества
          </p>
        </div>

        {/* Рекомендуемые партнеры */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Рекомендуемые партнеры</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredPartners.map((partner) => (
              <Card
                key={partner.id}
                className="group hover:shadow-xl transition-all duration-300 border-2 border-primary/20 bg-gradient-to-br from-background to-muted/20"
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <img
                      src={partner.logo || "/placeholder.svg"}
                      alt={`${partner.name} logo`}
                      className="h-12 w-auto object-contain"
                    />
                    <Badge variant="secondary" className="text-xs">
                      {partner.category}
                    </Badge>
                  </div>

                  <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{partner.name}</h4>

                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{partner.description}</p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {partner.specialization.map((spec, index) => (
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
                      <span>{partner.projects} проектов</span>
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
                      Посетить сайт
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Статистика партнерства */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">15+</div>
            <div className="text-muted-foreground">Активных партнеров</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Совместных проектов</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-muted-foreground">Успешных интеграций</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Техническая поддержка</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground"
            asChild
          >
            <Link href="/partners">
              <Award className="h-5 w-5 mr-2" />
              Посмотреть всех партнеров
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
