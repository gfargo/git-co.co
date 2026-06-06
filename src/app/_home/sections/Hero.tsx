"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { CopyCommand } from "@/components/CopyCommand"
import { MediaFrame } from "@/components/MediaFrame"

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

              {/* Right — the real workstation, floating in 3-space */}
              <div className="-order-1 lg:order-1 [perspective:1800px]">
                <div className="hero-terminal-float relative">
                  {/* Glow bleeding from the screen into the green hero */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.28),transparent_70%)] blur-2xl"
                  />
                  <div className="overflow-hidden rounded-xl border border-white/15 bg-[hsl(150_20%_8%)] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.75)] ring-1 ring-black/20 [transform:rotateY(-9deg)_rotateX(3deg)]">
                    {/* Minimal title bar */}
                    <div className="flex items-center gap-2 border-b border-white/10 bg-black/30 px-4 py-2.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                      <span className="ml-auto font-mono text-[10px] text-white/40">
                        ~/coco — coco ui
                      </span>
                    </div>
                    {/* The real workstation, animated */}
                    <MediaFrame
                      kind="gif"
                      src="/screenshots/demo-workstation-tour.gif"
                      alt="coco terminal workstation — browsing history, status, branches and diffs by keyboard"
                      width={1463}
                      height={689}
                      priority
                    />
                    {/* Faint scanline texture for CRT depth */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.5)_2px,rgba(255,255,255,0.5)_3px)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* No gradient — clean edge between hero and dark green content below */}

      <style jsx>{`
        .hero-terminal-float {
          animation: hero-float 7s ease-in-out infinite;
          transform-style: preserve-3d;
          will-change: transform;
        }
        @keyframes hero-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-terminal-float {
            animation: none;
          }
        }
      `}</style>
    </>
  )
}
