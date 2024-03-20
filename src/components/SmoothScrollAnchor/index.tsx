"use client"

import Link from "next/link"

type SmoothScrollAnchorProps = {
  id: string
  children: React.ReactNode
}

export const SmoothScrollAnchor = ({
  id,
  children
}: SmoothScrollAnchorProps) => (
  <Link
    className="inline-flex h-9 items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-[#5E8F78] shadow transition-colors hover:bg-white/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white disabled:pointer-events-none disabled:opacity-50"
    href={`#${id}`}
    scroll={false}
    onClick={(e) => {
      e.preventDefault()
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth"
      })
    }}
  >
    {children}
  </Link>
)
