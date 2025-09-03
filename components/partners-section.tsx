import { Badge } from "@/components/ui/badge"

const partners = [
  { name: "TechCorp Solutions", logo: "/placeholder.svg?height=60&width=120&text=TechCorp" },
  { name: "DataFlow Analytics", logo: "/placeholder.svg?height=60&width=120&text=DataFlow" },
  { name: "SecureNet Systems", logo: "/placeholder.svg?height=60&width=120&text=SecureNet" },
  { name: "CloudScale Infrastructure", logo: "/placeholder.svg?height=60&width=120&text=CloudScale" },
  { name: "FinTech Innovations", logo: "/placeholder.svg?height=60&width=120&text=FinTech" },
  { name: "GreenTech Solutions", logo: "/placeholder.svg?height=60&width=120&text=GreenTech" },
  { name: "AI Dynamics", logo: "/placeholder.svg?height=60&width=120&text=AI+Dynamics" },
  { name: "Digital Transform", logo: "/placeholder.svg?height=60&width=120&text=Digital" },
]

export function PartnersSection() {
  return (
    <section className="py-16 sm:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-sm font-medium">
            Наши партнеры
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Мы работаем с лидерами рынка
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Наши партнеры — это ведущие технологические компании, которые помогают нам предоставлять вам лучшие решения
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 items-center justify-items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-6 bg-background/50 rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group w-full h-24"
            >
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={`${partner.name} logo`}
                className="max-h-12 max-w-full object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300 filter grayscale group-hover:grayscale-0"
              />
            </div>
          ))}
        </div>

        {/* Статистика партнерства */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">15+</div>
            <div className="text-muted-foreground">Активных партнеров</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Совместных проектов</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-muted-foreground">Успешных интеграций</div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Техническая поддержка</div>
          </div>
        </div>
      </div>
    </section>
  )
}
