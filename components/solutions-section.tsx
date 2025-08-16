import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bot, Search, Users, Brain, BarChart3, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"

export function SolutionsSection() {
  const solutions = [
    {
      icon: Bot,
      title: "Разработка ИИ-ботов",
      description:
        "Проектируем и внедряем ИИ-ботов, которые берут на себя рутину, ускоряют процессы и помогают бизнесу получить новые ресурсы развития. Автоматизируем клиентский сервис и внутренние процессы.",
      type: "service",
      link: "/services#ai-bots",
    },
    {
      icon: Search,
      title: "Диагностика и аудит",
      description:
        "Проводим комплексный анализ текущих процессов, чтобы понять, где бизнес теряет деньги, время и управляемость. Даём чёткие рекомендации и выстраиваем понятную дорожную карту изменений.",
      type: "service",
      link: "/services#audit",
    },
    {
      icon: Users,
      title: "HR-оценка персонала",
      description:
        "Оцениваем компетенции, потенциал и уязвимости команды, чтобы собрать эффективную организационную структуру и закрыть пробелы. Помогаем выявить сильных игроков и усилить командный результат.",
      type: "service",
      link: "/services#hr-assessment",
    },
    {
      icon: Brain,
      title: "ИИ-Ассистенты",
      description:
        "Готовые чат-боты и виртуальные помощники для автоматизации клиентского сервиса с интеграцией в CRM. Обработка естественного языка и многоязычная поддержка для вашего бизнеса.",
      type: "solution",
      price: "от 15 000 ₽/мес",
      link: "/solutions#ai-assistants",
    },
    {
      icon: BarChart3,
      title: "Аналитика данных",
      description:
        "Готовое решение для глубокого анализа бизнес-данных с машинным обучением и предиктивной аналитикой. Прогнозирование трендов, визуализация данных и автоматические отчеты.",
      type: "solution",
      price: "от 25 000 ₽/мес",
      link: "/solutions#analytics",
    },
    {
      icon: FileText,
      title: "Генерация контента",
      description:
        "Автоматическое создание текстов, статей, описаний товаров и маркетинговых материалов с SEO-оптимизацией. Брендинг, тон голоса и массовая генерация с контролем качества.",
      type: "solution",
      price: "от 10 000 ₽/мес",
      link: "/solutions#content",
    },
  ]

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Услуги и решения</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Мы предлагаем два формата работы: индивидуальные услуги — глубокая проработка под задачи вашей компании, и
            готовые решения — быстрое внедрение проверенных ИИ-инструментов с фиксированной стоимостью.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon

            return (
              <div
                key={index}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group h-full flex flex-col min-h-[400px]"
              >
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/15 group-hover:scale-105 transition-all duration-300">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <Badge
                      variant={solution.type === "service" ? "outline" : "default"}
                      className={
                        solution.type === "service"
                          ? "border-blue-500/50 text-blue-400"
                          : "bg-green-500/20 text-green-400 border-green-500/50"
                      }
                    >
                      {solution.type === "service" ? "Услуга" : "Решение"}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4 min-h-[64px] flex items-center">
                    {solution.title}
                  </h3>
                </div>

                <div className="flex-1 flex flex-col">
                  <p className="text-muted-foreground leading-relaxed mb-6 flex-1 min-h-[120px]">
                    {solution.description}
                  </p>

                  <div className="flex items-center justify-between mb-6 min-h-[32px]">
                    {solution.price && <span className="text-lg font-bold text-primary">{solution.price}</span>}
                    <div className="flex-1"></div>
                  </div>

                  <Link href={solution.link}>
                    <Button
                      variant="outline"
                      className="w-full border-border/50 hover:border-primary/50 hover:bg-primary/5 bg-transparent transition-all duration-300"
                    >
                      {solution.type === "service" ? "Узнать подробнее" : "Попробовать решение"}
                    </Button>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 bg-transparent px-8 py-6 text-lg"
              >
                Все услуги
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/solutions">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 px-8 py-6 text-lg"
              >
                Все решения
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
