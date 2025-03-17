import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Noto_Sans_Thai } from "next/font/google"

// Properly load the Thai font using Next.js font system
const notoSansThai = Noto_Sans_Thai({
  subsets: ["thai"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-sans-thai",
})

export const metadata: Metadata = {
  title: "Thai Fortune App",
  description: "Check your fortune today",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th" className={notoSansThai.variable}>
      <body>{children}</body>
    </html>
  )
}

