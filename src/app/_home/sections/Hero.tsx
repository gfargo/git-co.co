"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Section } from "@/components/Section"
import { TerminalAtmosphere } from "@/components/TerminalAtmosphere"
import { CopyCommand } from "@/components/CopyCommand"

const commands = ["commit", "changelog", "recap", "review", "commit split"]

export const HeroSection = () => {
  return (
    <Section id="hero" className="relative overflow-hidden md:py-20 lg:py-32">
      <TerminalAtmosphere variant="hero" />

      <div className="relative z-10">
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6 md:px-10">
          <div className="flex max-w-3xl flex-col items-start gap-8">
            {/* Terminal prompt decoration */}
            <span className="font-mono text-sm tracking-wide text-terminal-green animate-fade-in-up">
              ~/coco $
            </span>

            {/* Main heading with blinking cursor */}
            <h1 className="font-mono text-3xl font-bold tracking-tighter text-foreground sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
              Your git toolbelt, sharpened by AI.
              <span
                className="ml-1 inline-block h-[0.9em] w-[0.5ch] translate-y-[0.05em] bg-terminal-green animate-cursor-blink"
                aria-hidden="true"
              />
            </h1>

            {/* Subtext listing commands */}
            <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
              Sharp, focused commands that each solve a real problem on their own.{" "}
              <span className="text-foreground/80">
                {commands.map((cmd, i) => (
                  <span key={cmd}>
                    <code className="font-mono text-terminal-green">{cmd}</code>
                    {i < commands.length - 1 && (
                      <span className="text-muted-foreground">{i === commands.length - 2 ? ", and " : ", "}</span>
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
                className="group inline-flex items-center gap-1.5 rounded-sm font-mono text-sm text-terminal-green transition-colors hover:text-terminal-green-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                See the workstation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
