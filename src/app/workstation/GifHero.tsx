"use client"

import { Lightbox } from "@/components/Lightbox"
import { MediaFrame } from "@/components/MediaFrame"

export function GifHero() {
  return (
    <Lightbox
      src="/screenshots/demo-workstation-tour.gif"
      alt="coco ui workstation demo — navigating between history, status, branches, and diff views"
    >
      {/* Native GIF (Next.js Image would optimize it into a still) with a
          loading skeleton + reserved aspect box. */}
      <MediaFrame
        kind="gif"
        src="/screenshots/demo-workstation-tour.gif"
        alt="coco ui workstation demo — navigating between history, status, branches, and diff views"
        width={1463}
        height={689}
        priority
      />
    </Lightbox>
  )
}
