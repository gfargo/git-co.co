"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"

import cocoCoverImage from "@/assets/coco-cover.png"
import { Section } from "@/components/Section"
import { GitCommitVerticalIcon } from "lucide-react"
import CursorImitator from "@/components/TypedContent"
import { SmoothScrollAnchor } from "@/components/SmoothScrollAnchor"

export const HeroSection = () => {
  const [content, setContent] = useState([
    "AI-Powered",
    "Git Automation",
    "for your Terminal"
  ])

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      const phrases = [
        "for the Command Line",
        "for better team cohesion 🤝",
        "Running Locally",
        "improving clarity in commit logs",
        "to save your fingers",
        "for the love of git",
        "to impress your colleagues",
        "so we all can write commits like a pro",
        "while you sip coffee ☕️",
        "with zero hassle",
        "to make your life easier",
        "to stave off carpal tunnel",
        "to reduce gray hair count",
        "for avoiding the wrath of your team lead"
      ].sort(() => Math.random() - 0.5)

      setContent((prevContent) => {
        const newContent = [...prevContent]
        newContent[newContent.length - 1] = phrases[index] || ""
        index = (index + 1) % phrases.length

        return newContent
      })
    }, 12500) // Update every 12 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Section id="hero" className="bg-[#719f8b] text-white md:py-20 lg:py-32">
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
                  waitAtStart={360}
                  content={content}
                  letterWrapClass="animate fade-in fade-in-1"
                />
              </h1>
            </div>

            <p className="max-w-[700px] text-white md:text-xl font-extralight flex items-center">
              <GitCommitVerticalIcon className="inline mr-1" /> Zero-effort
              detailed commits, changelogs, and more!
            </p>

            <SmoothScrollAnchor id="install">install</SmoothScrollAnchor>
          </div>
          <div className="-order-1 lg:order-1">
            <Image src={cocoCoverImage} alt="git coco cover image" priority />
          </div>
        </div>
      </div>
    </Section>
  )
}
