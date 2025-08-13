import { Card, CardContent } from "@/components/ui/card"
import { Zap, BarChart3, Settings, Shield } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Seamless Integration",
    description:
      "Connect with the tools you already use. Our platform integrates with over 100+ popular business applications.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description: "Make data-driven decisions effortlessly with comprehensive dashboards and intelligent insights.",
  },
  {
    icon: Settings,
    title: "Customizable Workflows",
    description: "Tailor our platform to fit your unique needs with flexible automation and custom processes.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security with end-to-end encryption, SSO, and compliance with industry standards.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif font-black text-3xl md:text-5xl mb-4">
            Powerful Features for <span className="text-primary">Modern Teams</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to streamline your workflow and boost productivity
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif font-bold text-xl mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
