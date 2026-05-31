"use client"

import { Lightbox } from "@/components/Lightbox"

export function GifHero() {
  return (
    <Lightbox
      src="/screenshots/demo-workstation-tour.gif"
      alt="coco ui workstation demo — navigating between history, status, branches, and diff views"
    >
      {/* leading-[0] removes the inline-image baseline gap below the GIF. */}
      <div className="overflow-hidden leading-[0]">
        {/* Native img for GIF animation — Next.js Image optimizes GIFs into stills */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/screenshots/demo-workstation-tour.gif"
          alt="coco ui workstation demo — navigating between history, status, branches, and diff views"
          className="w-full h-auto"
        />
      </div>
    </Lightbox>
  )
}
