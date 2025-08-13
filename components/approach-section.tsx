export function ApproachSection() {
  const approaches = [
    {
      title: "Структурируем процессы",
      subtitle: "вместо хаоса и ручного контроля",
      description:
        "Мы выстраиваем понятные операционные модели, устраняем дублирующие функции и настраиваем систему контроля. Вместо ручного управления — четкие механизмы и прозрачная логика. Это делает бизнес устойчивым к росту и снижает нагрузку на управленцев.",
    },
    {
      title: "Оптимизируем ресурсы",
      subtitle: "за счёт внедрения ИИ-инструментов",
      description:
        "Анализируем операционные потоки, выделяем узкие места и рутину, автоматизируем повторяющиеся задачи и подключаем ИИ-решения. Благодаря этому команда освобождает время и фокусируется на задачах, которые действительно важны для развития бизнеса.",
    },
    {
      title: "Усиливаем команду",
      subtitle: "создаём среду фокуса и роста",
      description:
        "Настраиваем коммуникации, перераспределяем зоны ответственности, устраняем размытые роли. Развиваем нужные компетенции, внедряем цифровые инструменты, чтобы команда могла достигать лучших результатов при меньших усилиях.",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Наш подход
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Мы не ограничиваемся внедрением ИИ-инструментов или аудитом процессов. Мы погружаемся в контекст бизнеса,
            находим, где система даёт сбой, и устраняем корневые причины.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {approaches.map((approach, index) => (
            <div
              key={index}
              className="bg-card/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-cyan-400 mb-2">{approach.title}</h3>
                <p className="text-lg text-cyan-300/80 font-medium">{approach.subtitle}</p>
              </div>
              <p className="text-muted-foreground leading-relaxed">{approach.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
