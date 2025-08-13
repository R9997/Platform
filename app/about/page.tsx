import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button
                variant="outline"
                className="border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
              >
                <Home className="w-4 h-4 mr-2" />
                На главную
              </Button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 neon-text mb-4">О компании Рефрейм Бюро</h1>
            <p className="text-xl text-muted-foreground">Мы создаем будущее с помощью искусственного интеллекта</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-card/80 backdrop-blur-sm border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-400">Наша миссия</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Мы стремимся демократизировать доступ к передовым ИИ-технологиям, делая их доступными для бизнеса
                  любого размера. Наша цель - помочь компаниям трансформировать свои процессы и достичь новых высот
                  эффективности.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/80 backdrop-blur-sm border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-400">Наши ценности</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-muted-foreground space-y-2">
                  <li>• Инновации и технологическое превосходство</li>
                  <li>• Прозрачность и этичность в ИИ</li>
                  <li>• Клиентоориентированный подход</li>
                  <li>• Непрерывное обучение и развитие</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card/80 backdrop-blur-sm border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-cyan-400">История компании</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Рефрейм Бюро была основана в 2023 году группой экспертов в области искусственного интеллекта и машинного
                обучения. Мы начали с простой идеи: сделать ИИ-технологии доступными и понятными для всех.
              </p>
              <p className="text-muted-foreground">
                Сегодня мы обслуживаем более 1000 клиентов по всему миру, предоставляя им передовые решения для
                автоматизации, анализа данных и оптимизации бизнес-процессов.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
