import { Section } from "@/components/Section";
import { Link } from "lucide-react";

export const CommunitySection = () => {
  return (
    <Section className="bg-white text-black">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center">
          Community
        </h2>
        <p className="text-black md:text-xl text-center">
          Join our community of developers and users on our forum.
        </p>
        <Link
          className="inline-flex h-9 items-center justify-center rounded-md bg-[#5E8F78] px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-[#5E8F78]/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50 mt-4"
          href="#"
        >
          Visit the Community Forum
        </Link>
      </div>
    </Section>
  );
};
