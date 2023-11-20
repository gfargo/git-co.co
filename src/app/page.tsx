import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

import { CommunitySection } from "./_home/sections/Community";
import { HeroSection } from "./_home/sections/Hero";
import { FeaturesSection } from "./_home/sections/Features";
import { InstallSection } from "./_home/sections/Install";
import { FeedbackSection } from "./_home/sections/Feedback";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary">
      <Header />
      <main className="w-full flex-1 pb-16">
        <HeroSection />
        <FeaturesSection />
        <InstallSection />
        {/* <FeedbackSection /> */}
        {/* <CommunitySection /> */}
      </main>
      <Footer />
    </div>
  );
}
