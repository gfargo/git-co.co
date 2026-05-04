"use client"

import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

export interface CommandCardProps {
  name: string
  tagline: string
  description: string
  usage: string
  flags?: { flag: string; description: string }[]
  icon: LucideIcon
  isActive?: boolean
}

export function CommandCard({
  name,
  tagline,
  description,
  usage,
  flags,
  icon: Icon,
  isActive,
}: CommandCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-bg-elevated p-6 transition-all md:p-8",
        isActive && "border-terminal-green-dim"
      )}
    >
      {/* Header */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-terminal-green/10">
          <Icon className="h-5 w-5 text-terminal-green" />
        </div>
        <div>
          <h3 className="font-mono text-lg font-semibold text-foreground">
            {name}
          </h3>
          <p className="text-sm text-terminal-green">{tagline}</p>
        </div>
      </div>

      {/* Description */}
      <p className="mb-6 text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      {/* Usage block */}
      <div className="mb-6 rounded-md bg-[hsl(var(--code-bg))] p-4 font-mono text-sm text-[hsl(var(--code-text))]">
        <span className="select-none text-muted-foreground">$ </span>
        {usage}
      </div>

      {/* Flags */}
      {flags && flags.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-mono text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Key flags
          </h4>
          <ul className="space-y-1.5">
            {flags.map(({ flag, description: desc }) => (
              <li key={flag} className="flex flex-wrap items-start gap-x-2 gap-y-0.5 text-sm">
                <code className="font-mono text-terminal-green whitespace-nowrap">
                  {flag}
                </code>
                <span className="text-muted-foreground">{desc}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
