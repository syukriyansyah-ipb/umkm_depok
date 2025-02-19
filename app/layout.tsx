"use client"

import "./globals.css"
import { Inter } from "next/font/google"
import { useState, useEffect } from "react"
import { Providers } from "@/app/providers"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] })

interface AboutData {
  name: string
  description: string
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [aboutData, setAboutData] = useState<AboutData | null>(null)

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => setAboutData(data))
      .catch((err) => console.error("Error fetching about data:", err))
  }, [])

  return (
    <html lang="id">
      <head>
        <title>{aboutData?.name || "UMKM CMS"}</title>
        <meta name="description" content={aboutData?.description || "CMS for UMKM landing page"} />
        <meta property="og:title" content={aboutData?.name || "UMKM CMS"} />
        <meta property="og:description" content={aboutData?.description || "CMS for UMKM landing page"} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"} />
      </head>
      <body className={inter.className}>
        <Analytics />
        <SpeedInsights />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
