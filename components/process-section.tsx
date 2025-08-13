export function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Вы отправляете запрос — мы связываемся с вами",
      description:
        "После получения заявки мы быстро выходим на связь, чтобы уточнить цели, текущую ситуацию и ожидания. Это может быть короткий созвон или переписка — выбираем формат, удобный для вас.",
    },
    {
      number: "02",
      title: "Проводим диагностику и формируем гипотезы",
      description:
        "Изучаем бизнес-процессы, выявляем слабости и зоны роста. Проводим интервью с командой, смотрим данные, определяем, какие изменения дадут наибольший эффект.",
    },
    {
      number: "03",
      title: "Собираем MVP — минимально жизнеспособное решение",
      description:
        "Создаём рабочий прототип: автоматизация, интерфейс, скрипты или другие инструменты — в зависимости от задачи. Цель — быстро протестировать гипотезу и запустить пилот.",
    },
    {
      number: "04",
      title: "Проводим тестирование на практике",
      description:
        "Тестируем MVP в реальной работе: находим узкие места, собираем обратную связь от пользователей, замеряем эффект. Вносим правки и улучшаем продукт.",
    },
    {
      number: "05",
      title: "Интегрируем готовое решение в бизнес",
      description:
        "Разворачиваем полную версию решения, настраиваем интеграции, обучаем команду. Следим, чтобы внедрение прошло безболезненно и плавно.",
    },
    {
      number: "06",
      title: "Оказываем сервисную поддержку и развиваем систему",
      description:
        "После внедрения остаёмся на связи. Обеспечиваем техническую поддержку, обновления, докрутки по мере роста бизнеса и задач.",
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Путь клиента
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-card/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 neon-glow">
                    {step.number}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-cyan-400 mb-3 leading-tight">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
