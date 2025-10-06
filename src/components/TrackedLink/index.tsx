"use client"

import { track } from "@vercel/analytics/react"
import Link, { LinkProps } from "next/link"
import React from "react"

type TrackedLinkProps = LinkProps & {
  children: React.ReactNode
  className?: string
  eventName: string
  [key: string]: any
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

  return (
    <Link className={className} {...props} onClick={handleClick}>
      {children}
    </Link>
  )
}
