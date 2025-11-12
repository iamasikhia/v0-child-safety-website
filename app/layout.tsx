import type React from "react"
import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "SacredEyes - Smart AI-Powered Child Protection",
  description:
    "Protect your children online with AI-powered website scanning and real-time monitoring. Safe internet experience for families.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/sacredeyes-logo.jpeg",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${_figtree.className}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
