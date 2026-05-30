/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs")

/**
 * Baseline security response headers, applied to every route.
 *
 * Scoped to zero-risk hardening for a static marketing site — clickjacking,
 * MIME sniffing, referrer leakage, and powerful-feature access. HSTS is also
 * pinned here (Vercel already sends a 2yr max-age; this adds includeSubDomains
 * + preload). A full Content-Security-Policy is intentionally left out: the
 * site loads Vercel Analytics / Speed Insights and uses styled-jsx + Next's
 * inline bootstrap, so a correct CSP needs nonce wiring and live testing —
 * tracked as a follow-up rather than shipped blind.
 */
const securityHeaders = [
  // Disallow being framed by other origins (clickjacking).
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Don't let the browser MIME-sniff responses away from their declared type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send only the origin on cross-origin navigations; full URL same-origin.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // No route needs these powerful features — deny them outright.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Force HTTPS for the apex + subdomains, and allow preload-list inclusion.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
]

/** @type {import("next").NextConfig} */
const config = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ]
  },
}

export default config
