import { Section } from "@/components/Section";
import { GitCommitHorizontalIcon, ScrollTextIcon } from "lucide-react";

import cocoCommitImage from "@/assets/coco-basic-commit.png";
import cocoChangelogImage from "@/assets/coco-changelog.png";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export const FeaturesSection = () => {
  return (
    <Section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 bg-white text-secondary"
    >
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-6 text-primary">
          features
        </h2>
        <div className="grid gap-16 md:grid-cols-1 lg:grid-cols-1">
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 lg:flex-row lg:space-x-8 items-center min-h-[50vh]">
            <Image
              src={cocoCommitImage}
              alt="example of commit message generated by coco"
              className="mx-auto order-2 md:order-1 lg:order-1 overflow-hidden rounded-xl object-cover object-center sm:w-full border-8 border-[#1e1f28]"
            />
            <div className="order-1 md:order-2 lg:order-2 space-y-4">
              <h2 className="text-2xl font-bold">
                <GitCommitHorizontalIcon className="inline" /> Commits
              </h2>
              <p className="text-base text-zinc-500 dark:text-zinc-400">
                write detailed commit messages for staged changes.
              </p>
            </div>
          </div>
          <Separator />

          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 lg:flex-row lg:space-x-8 items-center min-h-[50vh]">
            <div className="order-1 md:order-1 lg:order-1 space-y-4">
              <h2 className="text-2xl font-bold">
                <ScrollTextIcon className="inline" /> Changelogs
              </h2>
              <p className="text-base text-zinc-500 dark:text-zinc-400">
                generate changelogs from your current branch or from a range of commits.
              </p>
            </div>
            <Image
              src={cocoChangelogImage}
              alt="example of changelog generated by coco"
              className="mx-auto order-2 md:order-1 lg:order-1 overflow-hidden rounded-xl object-cover object-center sm:w-full border-8 border-[#1e1f28]"
            />
            
          </div>
        </div>
      </div>
    </Section>
  );
};