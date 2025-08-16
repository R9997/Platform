import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "600", "700", "900"],
})

export const metadata: Metadata = {
  title: "Рефрейм Бюро - ИИ Инструменты Будущего",
  description:
    "Трансформируем завтра с помощью ИИ уже сегодня. Расширьте возможности вашего бизнеса с передовыми решениями.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfairDisplay.variable} antialiased dark`}>
      <body>{children}</body>
    </html>
  )
}
