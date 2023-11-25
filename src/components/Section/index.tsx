import { cn } from "@/lib/utils"
import { DetailedHTMLProps, HTMLAttributes } from "react"

interface SectionProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
  className?: string
}

export const Section = ({ className, children, ...rest }: SectionProps) => {
  return (
    <section
      className={cn(
        "w-full py-12 md:py-24 lg:py-32 bg-primary text-white",
        className
      )}
      {...rest}
    >
      {children}
    </section>
  )
}
