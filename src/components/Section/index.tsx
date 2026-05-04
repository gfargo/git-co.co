import { cn } from "@/lib/utils"
import { DetailedHTMLProps, HTMLAttributes } from "react"

interface SectionProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  className?: string
  variant?: "default" | "elevated" | "gradient"
}

export const Section = ({ className, variant = "default", children, ...rest }: SectionProps) => {
  return (
    <section
      className={cn(
        "relative w-full py-16 md:py-24 lg:py-32 bg-background text-foreground",
        variant === "elevated" && "bg-bg-elevated",
        variant === "gradient" &&
          "bg-gradient-to-b from-background via-bg-elevated/50 to-background",
        className
      )}
      {...rest}
    >
      {children}
    </section>
  )
}
