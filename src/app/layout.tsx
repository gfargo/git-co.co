import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Metadata } from "next"
import { Inter } from "next/font/google"

import "@/styles/globals.css"
import { Toaster } from "@/components/ui/toaster"
import { siteConfig } from "@/config/site"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
})

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Coco - AI Git Assistant for Effortless Commits, Changelogs, and More",
    template: "%s | Coco"
  },
  description: siteConfig.description,
  keywords: [
    "git",
    "cli tool",
    "commit messages",
    "changelog generator",
    "code review",
    "developer tools",
    "AI assistant",
    "conventional commits",
    "git automation",
    "terminal tools"
  ],
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Coco - AI Git Assistant for Effortless Commits, Changelogs, and More",
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1280,
        height: 640,
        alt: "Coco - AI-Powered Git Assistant for the Command Line"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Coco - AI Git Assistant for Effortless Commits, Changelogs, and More",
    description: "Generate commit messages, create changelogs, and automate your git workflow with AI-powered assistance.",
    images: [siteConfig.ogImage],
    creator: siteConfig.author.twitter
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  alternates: {
    canonical: siteConfig.url
  }
} as Metadata

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  // JSON-LD structured data for SoftwareApplication
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": siteConfig.name,
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Linux, macOS, Windows",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": siteConfig.description,
    "url": siteConfig.url,
    "author": {
      "@type": "Person",
      "name": siteConfig.author.name,
      "url": siteConfig.author.url
    },
    "softwareVersion": "latest",
    "keywords": "git, cli, commit messages, changelog, code review, developer tools, AI assistant",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": "1"
    }
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`font-sans ${inter.variable}`}>
        {children}
        <Toaster />
      </body>
      <SpeedInsights />
      <Analytics />
    </html>
  )
}
