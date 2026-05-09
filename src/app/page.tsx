import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"

import { CommunitySection } from "./_home/sections/Community"
import { HeroSection } from "./_home/sections/Hero"
import { KeyFeaturesSection } from "./_home/sections/KeyFeatures"
import { InstallSection } from "./_home/sections/Install"
import { DocumentationSection } from "./_home/sections/Documentation"
import { ToolbeltSection } from "./_home/sections/Toolbelt"
import { WorkstationTeaser } from "./_home/sections/WorkstationTeaser"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <Header />
      <main className="w-full flex-1 pb-2 overflow-hidden">
        <HeroSection />
        <ToolbeltSection />
        <WorkstationTeaser />
        <KeyFeaturesSection />
        <InstallSection />
        <DocumentationSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  )
}
