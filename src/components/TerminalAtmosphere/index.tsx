import { cn } from "@/lib/utils"

interface TerminalAtmosphereProps {
  variant?: "hero" | "section" | "page"
  className?: string
}

/**
 * Pure CSS terminal atmosphere effect. Replaces the Three.js background
 * with a lightweight radial gradient vignette, optional scanlines, and
 * a subtle noise SVG filter — zero JS, zero layout shift.
 */
export function TerminalAtmosphere({ variant = "section", className }: TerminalAtmosphereProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {/* Radial gradient vignette */}
      <div
        className={cn(
          "absolute inset-0",
          variant === "hero" &&
            "bg-[radial-gradient(ellipse_at_center,transparent_20%,hsl(var(--bg-primary))_80%)]",
          variant === "section" &&
            "bg-[radial-gradient(ellipse_at_center,transparent_40%,hsl(var(--bg-primary))_90%)]",
          variant === "page" &&
            "bg-[radial-gradient(ellipse_at_center,transparent_50%,hsl(var(--bg-primary))_95%)]"
        )}
      />

      {/* Scanline overlay — 1px repeating lines at low opacity */}
      {(variant === "hero" || variant === "section") && (
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 1px, hsl(0 0% 100%) 1px, hsl(0 0% 100%) 2px)",
            backgroundSize: "100% 2px"
          }}
        />
      )}

      {/* Noise texture via inline SVG filter */}
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <filter id="terminal-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter="url(#terminal-noise)"
          className={cn(
            variant === "hero" && "opacity-[0.03]",
            variant === "section" && "opacity-[0.02]",
            variant === "page" && "opacity-[0.015]"
          )}
        />
      </svg>
    </div>
  )
}
