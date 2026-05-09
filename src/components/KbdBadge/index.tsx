import { cn } from "@/lib/utils"

interface KbdBadgeProps {
  keys: string[]
  className?: string
}

/**
 * Renders keyboard shortcut keys as styled `<kbd>` elements.
 * Uses JetBrains Mono with a subtle border and terminal-green accent.
 */
export function KbdBadge({ keys, className }: KbdBadgeProps) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      {keys.map((key, i) => (
        <kbd
          key={`${key}-${i}`}
          className="inline-flex h-6 min-w-6 items-center justify-center rounded border border-border-accent/40 bg-bg-elevated px-1.5 font-mono text-xs text-terminal-green"
        >
          {key}
        </kbd>
      ))}
    </span>
  )
}
