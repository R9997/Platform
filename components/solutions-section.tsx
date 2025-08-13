import { Button } from "@/components/ui/button"
import { Bot, Search, Users } from "lucide-react"

export function SolutionsSection() {
  const solutions = [
    {
      icon: Bot,
      title: "Разработка ИИ-ботов",
      description:
        "Проектируем и внедряем ИИ-ботов, которые берут на себя рутину, ускоряют процессы и помогают бизнесу получить новые ресурсы развития. Это может быть как внутренний ассистент для сотрудников, так и внешний бот для клиентов — решение всегда заточено под цели заказчика.",
    },
    {
      icon: Search,
      title: "Диагностика и аудит",
      description:
        "Проводим комплексный анализ текущих процессов, чтобы понять, где бизнес теряет деньги, время и управляемость. Даём чёткие рекомендации и выстраиваем понятную дорожную карту изменений — от операционной деятельности до стратегической.",
    },
    {
      icon: Users,
      title: "HR-оценка",
      description:
        "Оцениваем компетенции, потенциал и уязвимости команды, чтобы собрать эффективную организационную структуру и закрыть пробелы. Помогаем выявить сильных игроков, перераспределить роли и усилить командный результат.",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-cyan-950/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Наши решения
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
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
                className="bg-card/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 group"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-cyan-400 mb-4">{solution.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">{solution.description}</p>
                <Button variant="outline" className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 bg-transparent">
                  Узнать подробнее
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
