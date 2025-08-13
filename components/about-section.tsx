import { Card, CardContent } from "@/components/ui/card"
import { Users, Target, Lightbulb, Award } from "lucide-react"

const stats = [
  { icon: Users, label: "Довольных клиентов", value: "500+", color: "cyan" },
  { icon: Target, label: "Проектов завершено", value: "1000+", color: "purple" },
  { icon: Lightbulb, label: "ИИ решений", value: "50+", color: "green" },
  { icon: Award, label: "Лет опыта", value: "5+", color: "cyan" },
]

export function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-32 bg-card/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary neon-glow-cyan" />
              <span className="text-sm font-medium neon-text-cyan uppercase tracking-wider">О компании</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-serif font-black mb-6 leading-tight">
              <span className="text-foreground">Мы создаем</span> <span className="neon-text-purple">будущее</span>{" "}
              <span className="text-foreground">с помощью ИИ</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Рефрейм Бюро — это команда экспертов в области искусственного интеллекта, которая помогает бизнесу
              трансформироваться и достигать новых высот с помощью передовых технологий.
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Мы специализируемся на разработке индивидуальных ИИ решений, которые автоматизируют процессы, повышают
              эффективность и открывают новые возможности для роста вашего бизнеса.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                const glowClass =
                  stat.color === "cyan"
                    ? "neon-glow-cyan"
                    : stat.color === "purple"
                      ? "neon-glow-purple"
                      : "neon-glow-green"
                const textClass =
                  stat.color === "cyan"
                    ? "neon-text-cyan"
                    : stat.color === "purple"
                      ? "neon-text-purple"
                      : "neon-text-green"

                return (
                  <Card
                    key={index}
                    className="bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300"
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 ${glowClass}`}
                      >
                        <Icon className={`h-5 w-5 ${textClass}`} />
                      </div>
                      <div className={`text-2xl font-serif font-black ${textClass} mb-1`}>{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-2xl blur-3xl" />
            <div className="relative bg-card/30 backdrop-blur-sm rounded-2xl p-8 neon-border-cyan border">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 rounded-full bg-primary neon-glow-cyan mt-2" />
                  <div>
                    <h3 className="font-serif font-bold text-lg mb-2 neon-text-cyan">Инновации</h3>
                    <p className="text-muted-foreground">
                      Используем самые современные технологии ИИ для создания прорывных решений
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 rounded-full bg-accent neon-glow-purple mt-2" />
                  <div>
                    <h3 className="font-serif font-bold text-lg mb-2 neon-text-purple">Персонализация</h3>
                    <p className="text-muted-foreground">
                      Каждое решение адаптируется под уникальные потребности вашего бизнеса
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 rounded-full bg-primary neon-glow-cyan mt-2" />
                  <div>
                    <h3 className="font-serif font-bold text-lg mb-2 neon-text-cyan">Поддержка</h3>
                    <p className="text-muted-foreground">
                      Обеспечиваем полное сопровождение на всех этапах внедрения и использования
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
