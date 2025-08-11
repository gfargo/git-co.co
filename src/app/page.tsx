import { Metadata } from "next"

import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"

import { CommunitySection } from "./_home/sections/Community"
import { HeroSection } from "./_home/sections/Hero"
import { FeaturesSection } from "./_home/sections/Features"
import { InstallSection } from "./_home/sections/Install"
import { FeedbackSection } from "./_home/sections/Feedback"
import { FaqSection } from "./_home/sections/Faq"
import { RoadmapSection } from "./_home/sections/Roadmap"

export const metadata: Metadata = {
  title: "Coco - AI Git Assistant for Effortless Commits, Changelogs, and More",
  description:
    "Coco is a command-line tool that helps you create conventional commits, generate changelogs, summarize code changes, perform code reviews, and more. Improve your commit history, automate changelogs, and streamline your workflow.",
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary">
      <Header />
      <main className="w-full flex-1 pb-2 overflow-hidden">
        <HeroSection />
        <FeaturesSection />
        <InstallSection />
        <RoadmapSection />
        <FaqSection />
        {/* <FeedbackSection /> */}
        <CommunitySection />
      </main>
      <Footer />
    </div>
  )
}
