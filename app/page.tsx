import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AIToolsSection } from "@/components/ai-tools-section"
import { AboutSection } from "@/components/about-section"
import { PersonalizedSection } from "@/components/personalized-section"
import { SolutionsSection } from "@/components/solutions-section"
import { ApproachSection } from "@/components/approach-section"
import { ProcessSection } from "@/components/process-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ROICalculator } from "@/components/roi-calculator"
import { NeedsAssessment } from "@/components/needs-assessment"
import { TeamSection } from "@/components/team-section"
import { Footer } from "@/components/footer"
import { ChatWidget } from "@/components/chat-widget"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ApproachSection />
        <SolutionsSection />
        <ProcessSection />
        <ROICalculator />
        <AIToolsSection />
        <AboutSection />
        <TeamSection />
        <TestimonialsSection />
        <NeedsAssessment />
        <PersonalizedSection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
