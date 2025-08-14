import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Settings, BarChart, Shield, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: User,
    title: "Персональный профиль",
    description: "Настройте свой профиль и получите рекомендации ИИ инструментов",
  },
  {
    icon: Settings,
    title: "Управление проектами",
    description: "Отслеживайте прогресс и управляйте всеми ИИ решениями в одном месте",
  },
  {
    icon: BarChart,
    title: "Аналитика использования",
    description: "Получайте детальную статистику эффективности ваших ИИ инструментов",
  },
  {
    icon: Shield,
    title: "Безопасность данных",
    description: "Ваши данные защищены современными методами шифрования",
  },
]

export function PersonalizedSection() {
  return (
    <section className="py-20 lg:py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-accent/10 blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-primary/10 blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 soft-border border">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium soft-text">Персональный опыт</span>
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-black mb-6 leading-tight">
            <span className="soft-text">Ваше путешествие</span> <span className="text-foreground">в мир ИИ</span>{" "}
            <span className="soft-text-blue">начинается здесь</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Войдите в личный кабинет для получения персонализированного опыта и доступа к эксклюзивным ИИ инструментам
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isEven = index % 2 === 0
            const glowClass = isEven ? "soft-glow" : "soft-glow-blue"
            const textClass = isEven ? "soft-text" : "soft-text-blue"
            const borderClass = isEven ? "soft-border" : "soft-border-blue"

            return (
              <Card
                key={index}
                className={`bg-card/50 backdrop-blur-sm border ${borderClass} hover:${glowClass} transition-all duration-300 group`}
              >
                <CardHeader className="text-center">
                  <div
                    className={`w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 ${glowClass} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`h-8 w-8 ${textClass}`} />
                  </div>
                  <CardTitle className="text-lg font-serif font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 soft-border-blue border mb-8">
            <h3 className="text-2xl font-serif font-bold mb-4 soft-text-blue">Готовы начать?</h3>
            <p className="text-muted-foreground mb-6">
              Создайте аккаунт или войдите в существующий, чтобы получить доступ к полному спектру наших ИИ решений и
              персональным рекомендациям.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 soft-glow text-lg px-8 py-6 w-full sm:w-auto"
                >
                  Создать аккаунт
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  variant="outline"
                  size="lg"
                  className="soft-border-blue hover:bg-accent/10 text-lg px-8 py-6 bg-transparent w-full sm:w-auto"
                >
                  Войти в кабинет
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
