import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Linkedin, Mail, Award, Users, Target, Lightbulb, Code, BarChart3, Palette } from "lucide-react"
import Link from "next/link"

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Александр Петров",
      position: "Основатель и CEO",
      description:
        "Эксперт в области ИИ с 10+ летним опытом. Ведет стратегическое развитие компании и работает с крупными клиентами.",
      image: "/alexander-petrov-ceo-portrait.png",
      skills: ["Стратегия", "ИИ", "Управление", "Продажи"],
      experience: "10+ лет",
      projects: "50+ проектов",
      email: "a.petrov@reframeburo.ru",
      linkedin: "linkedin.com/in/alexanderpetrov",
    },
    {
      name: "Мария Козлова",
      position: "CTO и Lead Developer",
      description:
        "Технический директор с глубокими знаниями в машинном обучении и разработке ИИ-решений. Руководит командой разработки.",
      image: "/maria-kozlova-cto.png",
      skills: ["Python", "ML/AI", "DevOps", "Архитектура"],
      experience: "8+ лет",
      projects: "40+ проектов",
      email: "m.kozlova@reframeburo.ru",
      linkedin: "linkedin.com/in/mariakozlova",
    },
    {
      name: "Дмитрий Сидоров",
      position: "Head of Analytics",
      description:
        "Специалист по анализу данных и бизнес-аналитике. Помогает клиентам извлекать максимальную ценность из их данных.",
      image: "/dmitry-sidorov-portrait.png",
      skills: ["Data Science", "SQL", "Tableau", "R"],
      experience: "6+ лет",
      projects: "35+ проектов",
      email: "d.sidorov@reframeburo.ru",
      linkedin: "linkedin.com/in/dmitrysidorov",
    },
    {
      name: "Елена Волкова",
      position: "UX/UI Designer",
      description: "Дизайнер пользовательских интерфейсов с фокусом на создание интуитивных решений для ИИ-продуктов.",
      image: "/elena-volkova-ux-ui-designer-portrait.png",
      skills: ["Figma", "UX Research", "Prototyping", "Design Systems"],
      experience: "5+ лет",
      projects: "30+ проектов",
      email: "e.volkova@reframeburo.ru",
      linkedin: "linkedin.com/in/elenavolkova",
    },
    {
      name: "Игорь Морозов",
      position: "Business Development",
      description:
        "Отвечает за развитие бизнеса и партнерские отношения. Помогает компаниям найти оптимальные ИИ-решения.",
      image: "/igor-morozov-business-portrait.png",
      skills: ["Продажи", "Переговоры", "Партнерства", "Консалтинг"],
      experience: "7+ лет",
      projects: "45+ проектов",
      email: "i.morozov@reframeburo.ru",
      linkedin: "linkedin.com/in/igormorozov",
    },
    {
      name: "Анна Лебедева",
      position: "Project Manager",
      description:
        "Руководит проектами от концепции до внедрения. Обеспечивает качественную реализацию ИИ-решений в срок.",
      image: "/anna-lebedeva-portrait.png",
      skills: ["Agile", "Scrum", "Планирование", "Коммуникации"],
      experience: "4+ лет",
      projects: "25+ проектов",
      email: "a.lebedeva@reframeburo.ru",
      linkedin: "linkedin.com/in/annalebedeva",
    },
  ]

  const companyStats = [
    { icon: Users, label: "Специалистов в команде", value: "15+" },
    { icon: Target, label: "Успешных проектов", value: "200+" },
    { icon: Award, label: "Лет опыта", value: "10+" },
    { icon: Lightbulb, label: "Внедренных решений", value: "150+" },
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
            <h1 className="text-4xl md:text-6xl font-serif font-bold soft-text mb-6">Наша команда</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Мы — команда экспертов в области искусственного интеллекта, объединенных общей целью: помочь бизнесу
              раскрыть потенциал ИИ-технологий для роста и развития.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <Code className="w-4 h-4 mr-2" />
                Техническая экспертиза
              </Badge>
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <BarChart3 className="w-4 h-4 mr-2" />
                Бизнес-аналитика
              </Badge>
              <Badge variant="secondary" className="text-sm px-4 py-2">
                <Palette className="w-4 h-4 mr-2" />
                UX/UI дизайн
              </Badge>
            </div>
          </div>

          {/* Company Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {companyStats.map((stat, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border soft-border text-center">
                <CardContent className="p-6">
                  <div className="p-3 rounded-lg bg-primary/10 soft-border w-fit mx-auto mb-4">
                    <stat.icon className="h-6 w-6 soft-text" />
                  </div>
                  <div className="text-2xl font-bold soft-text mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Team Members */}
          <div className="mb-20">
            <h2 className="text-3xl font-serif font-bold text-center mb-12 soft-text">Познакомьтесь с экспертами</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="bg-card/50 backdrop-blur-sm border soft-border hover:soft-glow transition-all duration-300 h-full"
                >
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-primary/20"
                      />
                      <h3 className="text-xl font-bold soft-text mb-1">{member.name}</h3>
                      <p className="text-primary font-medium mb-2">{member.position}</p>
                      <div className="flex justify-center gap-4 text-sm text-muted-foreground mb-4">
                        <span>{member.experience}</span>
                        <span>•</span>
                        <span>{member.projects}</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{member.description}</p>

                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {member.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t border-border">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                        <a href={`mailto:${member.email}`}>
                          <Mail className="w-4 h-4 mr-1" />
                          Email
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent" asChild>
                        <a href={`https://${member.linkedin}`} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-4 h-4 mr-1" />
                          LinkedIn
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border soft-border">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-serif font-bold soft-text mb-4">Готовы работать с нами?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Наша команда готова помочь вашему бизнесу внедрить ИИ-решения. Свяжитесь с нами для обсуждения вашего
                проекта.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground soft-glow">
                    <Mail className="w-5 h-5 mr-2" />
                    Связаться с нами
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button size="lg" variant="outline" className="soft-border hover:soft-glow bg-transparent">
                    <Users className="w-5 h-5 mr-2" />
                    Начать проект
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
