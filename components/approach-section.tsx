import { Target, Zap, Users } from "lucide-react"

export function ApproachSection() {
  const approaches = [
    {
      icon: Target,
      title: "Структурируем процессы",
      subtitle: "вместо хаоса и ручного контроля",
      description:
        "Мы выстраиваем понятные операционные модели, устраняем дублирующие функции и настраиваем систему контроля. Вместо ручного управления — четкие механизмы и прозрачная логика для устойчивого роста.",
    },
    {
      icon: Zap,
      title: "Оптимизируем ресурсы",
      subtitle: "за счёт внедрения ИИ-инструментов",
      description:
        "Анализируем операционные потоки, выделяем узкие места и рутину, автоматизируем повторяющиеся задачи и подключаем ИИ-решения. Команда освобождает время для важных задач развития.",
    },
    {
      icon: Users,
      title: "Усиливаем команду",
      subtitle: "создаём среду фокуса и роста",
      description:
        "Настраиваем коммуникации, перераспределяем зоны ответственности, устраняем размытые роли. Развиваем компетенции и внедряем цифровые инструменты для достижения лучших результатов.",
    },
  ]

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Наш подход</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Мы не ограничиваемся внедрением ИИ-инструментов или аудитом процессов. Мы погружаемся в контекст бизнеса,
            находим, где система даёт сбой, и устраняем корневые причины.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {approaches.map((approach, index) => {
            const IconComponent = approach.icon

            return (
              <div
                key={index}
                className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-8 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group h-full flex flex-col"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/15 group-hover:scale-105 transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2 min-h-[2.5rem] flex items-center">
                    {approach.title}
                  </h3>
                  <p className="text-lg font-medium text-muted-foreground min-h-[3.5rem] flex items-center">
                    {approach.subtitle}
                  </p>
                </div>
                <p className="text-muted-foreground leading-relaxed flex-1 min-h-[6rem] flex items-start">
                  {approach.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
