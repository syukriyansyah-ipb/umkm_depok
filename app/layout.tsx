
import "./globals.css"
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import { Providers } from "@/app/providers"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "UMKM CMS",
  description: "CMS for UMKM landing page",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

