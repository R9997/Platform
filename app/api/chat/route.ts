import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { message, provider = "openai" } = await request.json()

    if (!message) {
      return NextResponse.json({ error: "Сообщение обязательно" }, { status: 400 })
    }

    // Конфигурация для разных провайдеров ИИ
    const aiProviders = {
      openai: {
        url: "https://api.openai.com/v1/chat/completions",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "Ты ИИ-ассистент компании Рефрейм Бюро. Помогаешь клиентам с вопросами об ИИ-решениях, автоматизации бизнес-процессов и внедрении технологий. Отвечай профессионально и дружелюбно на русском языке.",
            },
            {
              role: "user",
              content: message,
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        },
      },
      gigachat: {
        url: "https://gigachat.devices.sberbank.ru/api/v1/chat/completions",
        headers: {
          Authorization: `Bearer ${process.env.GIGACHAT_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: {
          model: "GigaChat",
          messages: [
            {
              role: "system",
              content:
                "Ты ИИ-ассистент компании Рефрейм Бюро. Помогаешь клиентам с вопросами об ИИ-решениях, автоматизации бизнес-процессов и внедрении технологий. Отвечай профессионально и дружелюбно на русском языке.",
            },
            {
              role: "user",
              content: message,
            },
          ],
          max_tokens: 500,
          temperature: 0.7,
        },
      },
    }

    const config = aiProviders[provider as keyof typeof aiProviders]

    if (!config) {
      return NextResponse.json({ error: "Неподдерживаемый провайдер ИИ" }, { status: 400 })
    }

    // Проверка наличия API ключа
    const apiKey = provider === "openai" ? process.env.OPENAI_API_KEY : process.env.GIGACHAT_API_KEY
    if (!apiKey) {
      // Возвращаем демо-ответ если API ключ не настроен
      const demoResponses = [
        "Спасибо за ваш вопрос! Наши ИИ-инструменты помогают автоматизировать бизнес-процессы и повышать эффективность работы.",
        "Рефрейм Бюро специализируется на внедрении персонализированных ИИ-решений для вашего бизнеса.",
        "Мы можем помочь с анализом данных, генерацией контента, автоматизацией процессов и созданием чат-ботов.",
        "Наша команда готова обсудить ваши потребности и предложить оптимальные ИИ-решения для вашей компании.",
      ]

      const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)]

      return NextResponse.json({
        response: randomResponse,
        provider: "demo",
      })
    }

    // Отправка запроса к ИИ API
    const response = await fetch(config.url, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify(config.body),
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = data.choices?.[0]?.message?.content || "Извините, не удалось получить ответ."

    return NextResponse.json({
      response: aiResponse,
      provider: provider,
    })
  } catch (error) {
    console.error("Chat API Error:", error)

    // Возвращаем fallback ответ в случае ошибки
    const fallbackResponses = [
      "Извините, произошла техническая ошибка. Наша команда уже работает над её устранением.",
      "Временные технические неполадки. Пожалуйста, попробуйте позже или свяжитесь с нами напрямую.",
      "Сервис временно недоступен. Вы можете написать нам на почту для получения консультации.",
    ]

    const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]

    return NextResponse.json({
      response: fallbackResponse,
      provider: "fallback",
    })
  }
}
