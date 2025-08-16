import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  weight: ["400", "500", "600", "700"],
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
    <html lang="ru" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased dark`}>
      <body>{children}</body>
    </html>
  )
}
