import "@/styles/globals.css"

import { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
})

const baseUrl = "https://git-co.co"

export const metadata = {
  title: "coco",
  metadataBase: new URL(baseUrl),
  description: "AI-Powered Git Assistant for the Command Line",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "coco",
    description: "AI-Powered Git Assistant for the Command Line",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "coco-cover"
      }
    ]
  }
} as Metadata

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>{children}</body>
    </html>
  )
}
