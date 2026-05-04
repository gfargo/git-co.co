import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  prompt?: string
  className?: string
}

/**
 * Consistent section heading with an optional terminal prompt decoration.
 * The prompt renders in JetBrains Mono before the title to reinforce
 * the developer-tool identity.
 */
export function SectionHeader({ title, subtitle, prompt, className }: SectionHeaderProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      {prompt && (
        <span className="mb-3 block font-mono text-sm tracking-wide text-terminal-green">
          {prompt}
        </span>
      )}
      <h2 className="font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  )
}
