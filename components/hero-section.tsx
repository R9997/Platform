import { Button } from "@/components/ui/button"
import { ArrowRight, Download, MessageSquare } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-serif font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight mb-6 tracking-tight">
            Платформа ИИ-роста для{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              вашего бизнеса
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Полноценная бизнес-платформа с ИИ-инструментами: автоматизация процессов, анализ данных, генерация контента
            и персональный консультант. Управляйте ростом компании из единого интерфейса
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Link href="/platform" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300"
              >
                <MessageSquare className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Войти в платформу
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 group bg-transparent border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                Получить консультацию
                <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 bg-transparent border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              asChild
            >
              <a href="https://disk.yandex.ru/i/Dnmon9kowyj1yw" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                <span className="hidden sm:inline">Бесплатный материал по ИИ-диагностике</span>
                <span className="sm:hidden">Бесплатный материал</span>
              </a>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-4 bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">ИИ-инструменты</h3>
              <p className="text-sm text-muted-foreground">Генерация контента, анализ данных, автоматизация</p>
            </div>
            <div className="text-center p-4 bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <ArrowRight className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Управление проектами</h3>
              <p className="text-sm text-muted-foreground">Отслеживание прогресса и ROI в реальном времени</p>
            </div>
            <div className="text-center p-4 bg-card/30 backdrop-blur-sm border border-border/30 rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Download className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Персональный консультант</h3>
              <p className="text-sm text-muted-foreground">ИИ-помощник для стратегических решений</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[600px] sm:h-[600px] bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
