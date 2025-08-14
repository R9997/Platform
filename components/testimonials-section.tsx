import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Quote } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const testimonials = [
  {
    quote:
      "Рефрейм Бюро полностью трансформировало наш бизнес! ИИ-решения для автоматизации процессов увеличили нашу эффективность на 60% всего за три месяца.",
    author: "Александр Петров",
    role: "Генеральный директор",
    company: "ТехИнновации",
    avatar: "/business-man-avatar.png",
    rating: 5,
  },
  {
    quote:
      "Лучшее решение для анализа данных, которое мы когда-либо использовали. Персонализированные отчеты и прогнозы помогли нам принимать более обоснованные решения.",
    author: "Мария Соколова",
    role: "Директор по аналитике",
    company: "DataFlow Solutions",
    avatar: "/data-analyst-avatar.png",
    rating: 5,
  },
  {
    quote:
      "Невероятная платформа с выдающейся поддержкой. ИИ-ассистент для клиентского сервиса сократил время обработки запросов в 4 раза.",
    author: "Елена Васильева",
    role: "Руководитель операций",
    company: "СервисПро",
    avatar: "/operations-manager-avatar.png",
    rating: 5,
  },
  {
    quote:
      "Генерация контента с помощью ИИ от Рефрейм Бюро экономит нам десятки часов в неделю. Качество текстов превосходит все ожидания.",
    author: "Дмитрий Козлов",
    role: "Маркетинг-директор",
    company: "БрендМастер",
    avatar: "/business-woman-avatar.png",
    rating: 5,
  },
  {
    quote:
      "Интеграция ИИ-решений в нашу IT-инфраструктуру прошла безупречно. Команда Рефрейм Бюро обеспечила полную поддержку на всех этапах внедрения.",
    author: "Игорь Смирнов",
    role: "CTO",
    company: "ТехГигант",
    avatar: "/tech-executive-avatar.png",
    rating: 5,
  },
  {
    quote:
      "ИИ-анализ медицинских данных помог нам значительно улучшить качество диагностики. Рефрейм Бюро - надежный партнер в цифровой трансформации здравоохранения.",
    author: "Ольга Морозова",
    role: "Главный врач",
    company: "МедЦентр Здоровье",
    avatar: "/healthcare-director-avatar.png",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif font-bold text-3xl md:text-4xl lg:text-5xl mb-4 soft-text">
            Доверие <span className="text-primary">тысяч</span> клиентов
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Узнайте, что говорят наши клиенты о работе с ИИ-решениями Рефрейм Бюро
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-card/50 backdrop-blur-sm border soft-border hover:soft-glow transition-all duration-300 h-full"
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-primary/30" />
                </div>

                <blockquote className="text-foreground mb-6 leading-relaxed flex-1 text-sm md:text-base">
                  "{testimonial.quote}"
                </blockquote>

                <div className="flex items-center space-x-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted flex-shrink-0">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-foreground text-sm md:text-base truncate">
                      {testimonial.author}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground truncate">{testimonial.role}</div>
                    <div className="text-xs text-primary font-medium truncate">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 md:mt-16">
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border soft-border max-w-2xl mx-auto">
            <CardContent className="p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-serif font-bold soft-text mb-4">
                Присоединяйтесь к успешным компаниям
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mb-6">
                Более 1000 компаний уже используют наши ИИ-решения для трансформации своего бизнеса
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
                <Link href="/contact">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground soft-glow transition-all duration-300">
                    Получить консультацию
                  </Button>
                </Link>
                <Link href="/solutions">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto soft-border hover:soft-glow bg-transparent transition-all duration-300"
                  >
                    Изучить решения
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
