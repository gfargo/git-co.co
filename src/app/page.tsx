import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

import { CommunitySection } from "./_home/sections/Community";
import { HeroSection } from "./_home/sections/Hero";
import { FeaturesSection } from "./_home/sections/Features";
import { InstallSection } from "./_home/sections/Install";
import { FeedbackSection } from "./_home/sections/Feedback";
import { FaqSection } from "./_home/sections/Faq";
import { RoadmapSection } from "./_home/sections/Roadmap";

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
  );
}
