import Link from "next/link"
import Image from "next/image"

import cocoCoverImage from "@/assets/coco-cover.png"
import { Section } from "@/components/Section"
import { GitCommitVerticalIcon } from "lucide-react"
import CursorImitator from "@/components/TypedContent"

export const HeroSection = () => {
  return (
    <Section id="hero" className=" bg-[#719f8b] text-white md:py-20 lg:py-32">
      <div className="px-4 md:px-6 space-y-10 xl:space-y-16">
        <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 lg:grid-cols-2">
          <div className="flex flex-col w-full gap-4 justify-start items-start">
            <div className="flex flex-row items-center">
              <h1 className="lg:leading-tighter text-2xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem] drop-shadow-xl min-h-[96px] md:min-h-[144px] xl:min-h-[160px] 2xl:min-h-[180px]">
                <span className="sr-only">
                  AI-Powered Git Automation for the Command Line
                </span>
                <CursorImitator
                  nextLetterTime={50}
                  waitAtStart={300}
                  content={["AI-Powered", "Git Automation", "for Command Line"]}
                  letterWrapClass="animate fade-in fade-in-1"
                />
              </h1>
            </div>

            <p className="max-w-[700px] text-white md:text-xl font-extralight flex items-center">
              <GitCommitVerticalIcon className="inline mr-1" /> Zero-effort
              detailed commits, changelogs, and more!
            </p>

            <Link
              className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-[#5E8F78] shadow transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50"
              href="#install"
            >
              install
            </Link>
          </div>
          <div className="-order-1 lg:order-1">
            <Image src={cocoCoverImage} alt="git coco cover image" priority />
          </div>
        </div>
      </div>
    </Section>
  )
}
