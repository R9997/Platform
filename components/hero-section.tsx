import { Button } from "@/components/ui/button"
import { ArrowRight, Download, MessageSquare, TrendingUp, Users, Zap } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-12 sm:py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-sans font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl leading-[1.1] sm:leading-tight mb-4 sm:mb-6 tracking-tight px-2">
            Платформа ИИ-роста для{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              вашего бизнеса
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-2 sm:px-4">
            Полноценная бизнес-платформа с ИИ-инструментами: автоматизация процессов, анализ данных, генерация контента
            и персональный консультант. Управляйте ростом компании из единого интерфейса
          </p>

          <div className="flex flex-col gap-3 sm:gap-4 justify-center items-stretch sm:items-center px-2 sm:px-4 max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Link href="/register" className="flex-1 sm:flex-initial">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 min-h-[48px] sm:min-h-[52px]"
                >
                  <MessageSquare className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="truncate">Войти в платформу</span>
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </Button>
              </Link>
              <Link href="/contact" className="flex-1 sm:flex-initial">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 group bg-transparent border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 min-h-[48px] sm:min-h-[52px] max-w-md mx-auto group"
                >
                  <span className="truncate">Получить консультацию</span>
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                </Button>
              </Link>
            </div>

            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 bg-gradient-to-r from-accent/10 to-primary/10 border-primary/30 hover:border-primary/50 hover:from-accent/20 hover:to-primary/20 transition-all duration-300 min-h-[48px] sm:min-h-[52px] max-w-md mx-auto group"
              asChild
            >
              <a
                href="https://disk.yandex.ru/i/Dnmon9kowyj1yw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center"
              >
                <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-center leading-tight font-medium">
                  <span className="hidden sm:inline">Бесплатный материал по ИИ-диагностике</span>
                  <span className="sm:hidden">Бесплатный материал по ИИ</span>
                </span>
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-primary group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-2">
            <Link href="/register" className="group">
              <div className="text-center p-6 sm:p-8 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm border border-primary/20 rounded-xl hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer h-full">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="font-bold text-base sm:text-lg text-foreground mb-3 group-hover:text-primary transition-colors">
                  ИИ-инструменты
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  Генерация контента, анализ данных, автоматизация процессов
                </p>
                <div className="inline-flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                  Попробовать бесплатно
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </Link>

            <Link href="/register" className="group">
              <div className="text-center p-6 sm:p-8 bg-gradient-to-br from-accent/5 to-primary/5 backdrop-blur-sm border border-accent/20 rounded-xl hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 cursor-pointer h-full">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="font-bold text-base sm:text-lg text-foreground mb-3 group-hover:text-accent transition-colors">
                  Управление проектами
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  Отслеживание прогресса и ROI в реальном времени
                </p>
                <div className="inline-flex items-center text-sm font-medium text-accent group-hover:translate-x-1 transition-transform">
                  Начать управлять
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </Link>

            <Link href="/register" className="group">
              <div className="text-center p-6 sm:p-8 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm border border-primary/20 rounded-xl hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 cursor-pointer h-full">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <h3 className="font-bold text-base sm:text-lg text-foreground mb-3 group-hover:text-primary transition-colors">
                  Персональный консультант
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                  ИИ-помощник для стратегических решений
                </p>
                <div className="inline-flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
                  Получить консультацию
                  <ArrowRight className="ml-1 h-4 w-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 md:w-72 md:h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 sm:w-80 sm:h-80 md:w-[600px] md:h-[600px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
