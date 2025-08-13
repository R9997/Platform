import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "StreamLine has revolutionized our project management! Our team productivity increased by 40% in just two months.",
    author: "Jane Doe",
    role: "Project Manager",
    company: "TechCorp Inc.",
  },
  {
    quote:
      "The best decision we made for our business. The analytics features alone saved us countless hours of manual reporting.",
    author: "John Smith",
    role: "CEO",
    company: "Growth Dynamics",
  },
  {
    quote:
      "Incredible platform with outstanding support. The customization options perfectly fit our unique workflow requirements.",
    author: "Sarah Johnson",
    role: "Operations Director",
    company: "InnovateLab",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif font-black text-3xl md:text-5xl mb-4">
            Trusted by <span className="text-primary">Thousands</span> of Teams
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our customers have to say about their StreamLine experience
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="text-lg mb-6 leading-relaxed">"{testimonial.quote}"</blockquote>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
