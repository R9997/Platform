import { Button } from "@/components/ui/button"
import { ArrowRight, Download, MessageSquare } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif font-black text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
            Интеллектуальные решения для роста{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              вашего бизнеса
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Внедряем ИИ-инструменты: функциональные чат-боты, HR‑аудит, анализ процессов — всё, чтобы увеличить прибыль
            и снизить управленческий хаос
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 group bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white neon-glow"
            >
              Отправить заявку
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Link href="/platform">
              <Button
                size="lg"
                className="text-lg px-8 py-6 group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white neon-glow"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                На платформу
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 bg-transparent border-cyan-500 text-cyan-400 hover:bg-cyan-500/10"
              asChild
            >
              <a href="https://disk.yandex.ru/i/Dnmon9kowyj1yw" target="_blank" rel="noopener noreferrer">
                <Download className="mr-2 h-5 w-5" />
                Бесплатный материал по ИИ-диагностике
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      </div>
    </section>
  )
}
