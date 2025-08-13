import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AIToolsSection } from "@/components/ai-tools-section"
import { AboutSection } from "@/components/about-section"
import { PersonalizedSection } from "@/components/personalized-section"
import { SolutionsSection } from "@/components/solutions-section"
import { ApproachSection } from "@/components/approach-section"
import { ProcessSection } from "@/components/process-section"
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
        <AIToolsSection />
        <AboutSection />
        <PersonalizedSection />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  )
}
