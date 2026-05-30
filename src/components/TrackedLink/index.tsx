"use client"

import { track } from "@vercel/analytics/react"
import Link, { LinkProps } from "next/link"
import React from "react"

type TrackedLinkProps = LinkProps & {
  children: React.ReactNode
  className?: string
  eventName: string
  [key: string]: unknown
}

export const TrackedLink = ({
  children,
  className,
  eventName,
  ...props
}: TrackedLinkProps) => {
  const handleClick = () => {
    const url = props.href.toString()
    const isExternal = url.startsWith("http")

    track(eventName, {
      href: url,
      external: isExternal,
      timestamp: new Date().toISOString()
    })
  }

  // Harden links that open a new tab: prevent the opened page from
  // reaching back through window.opener (reverse tabnabbing) and trim
  // referrer leakage. Respect an explicit `rel` if the caller set one.
  const rel =
    (props.rel as string | undefined) ??
    (props.target === "_blank" ? "noopener noreferrer" : undefined)

  return (
    <Link className={className} {...props} rel={rel} onClick={handleClick}>
      {children}
    </Link>
  )
}
