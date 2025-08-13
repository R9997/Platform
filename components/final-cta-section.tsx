import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function FinalCTASection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif font-black text-3xl md:text-5xl mb-6">Join Thousands of Satisfied Users</h2>
          <p className="text-xl mb-8 opacity-90 leading-relaxed">
            Get started with StreamLine today and transform the way your team works. No credit card required for your
            14-day free trial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 group">
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
          <p className="text-sm mt-6 opacity-75">✓ 14-day free trial ✓ No credit card required ✓ Cancel anytime</p>
        </div>
      </div>
    </section>
  )
}
