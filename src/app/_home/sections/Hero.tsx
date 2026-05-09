"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import cocoCoverImage from "@/assets/coco-cover.png"
import { CopyCommand } from "@/components/CopyCommand"

const commands = ["commit", "changelog", "recap", "review", "commit split"]

export const HeroSection = () => {
  return (
    <>
      <section
        id="hero"
        className="relative w-full bg-oxley-400 py-16 text-white md:py-20 lg:py-32"
      >
        <div className="relative z-10">
          <div className="mx-auto max-w-[1300px] px-4 sm:px-6 md:px-10">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
              {/* Left — text */}
              <div className="flex flex-col items-start gap-8">
                {/* Terminal prompt decoration */}
                <span className="font-mono text-sm tracking-wide text-white/70 animate-fade-in-up">
                  ~/coco $
                </span>

                {/* Main heading with blinking cursor */}
                <h1 className="font-mono text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                  Your git toolbelt, sharpened by AI.
                  <span
                    className="ml-1 inline-block h-[0.9em] w-[0.5ch] translate-y-[0.05em] bg-white animate-cursor-blink"
                    aria-hidden="true"
                  />
                </h1>

                {/* Subtext listing commands */}
                <p className="max-w-2xl text-base leading-7 text-white/80 md:text-lg">
                  Sharp, focused commands that each solve a real problem on their own.{" "}
                  <span className="text-white">
                    {commands.map((cmd, i) => (
                      <span key={cmd}>
                        <code className="font-mono font-semibold">{cmd}</code>
                        {i < commands.length - 1 && (
                          <span className="text-white/70">{i === commands.length - 2 ? ", and " : ", "}</span>
                        )}
                      </span>
                    ))}
                  </span>
                  {" "}— plus a full terminal workstation that brings them all together.
                </p>

                {/* CTA row */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <CopyCommand command="npx git-coco@latest init" />

                  <Link
                    href="/workstation"
                    className="group inline-flex items-center gap-1.5 rounded-sm font-mono text-sm text-white/90 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-oxley-400"
                  >
                    See the workstation
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>

              {/* Right — the coco cover image */}
              <div className="-order-1 lg:order-1">
                <Image
                  src={cocoCoverImage}
                  alt="Coco AI Git Assistant — terminal interface showing automated commit message generation"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* No gradient — clean edge between hero and dark green content below */}
    </>
  )
}
