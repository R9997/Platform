import { Button } from "@/components/ui/button"
import { Bot, Search, Users, ArrowRight } from "lucide-react"
import Link from "next/link"

export function SolutionsSection() {
  const solutions = [
    {
      icon: Bot,
      title: "Разработка ИИ-ботов",
      description:
        "Проектируем и внедряем ИИ-ботов, которые берут на себя рутину, ускоряют процессы и помогают бизнесу получить новые ресурсы развития. Это может быть как внутренний ассистент для сотрудников, так и внешний бот для клиентов — решение всегда заточено под цели заказчика.",
      link: "/solutions#ai-bots",
    },
    {
      icon: Search,
      title: "Диагностика и аудит",
      description:
        "Проводим комплексный анализ текущих процессов, чтобы понять, где бизнес теряет деньги, время и управляемость. Даём чёткие рекомендации и выстраиваем понятную дорожную карту изменений — от операционной деятельности до стратегической.",
      link: "/solutions#audit",
    },
    {
      icon: Users,
      title: "HR-оценка",
      description:
        "Оцениваем компетенции, потенциал и уязвимости команды, чтобы собрать эффективную организационную структуру и закрыть пробелы. Помогаем выявить сильных игроков, перераспределить роли и усилить командный результат.",
      link: "/solutions#hr-assessment",
    },
  ]

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Наши решения</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Мы предлагаем два формата работы: готовые решения — быстрое внедрение проверенных инструментов для вашего
            бизнеса и индивидуальные разработки — глубокая проработка под задачи вашей компании.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => {
            const IconComponent = solution.icon

            return (
              <div
                key={index}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/15 group-hover:scale-105 transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">{solution.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">{solution.description}</p>
                <Link href={solution.link}>
                  <Button
                    variant="outline"
                    className="border-border/50 hover:border-primary/50 hover:bg-primary/5 bg-transparent transition-all duration-300"
                  >
                    Узнать подробнее
                  </Button>
                </Link>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Link href="/solutions">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 px-8 py-6 text-lg"
            >
              Все наши решения
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
