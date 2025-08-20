"use client"

import * as React from "react"

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({
  children,
  attribute = "class",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  return <>{children}</>
}

// Простой хук для управления темой
export function useTheme() {
  const [theme, setThemeState] = React.useState("light")

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme)
    if (typeof document !== "undefined") {
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    }
  }

  React.useEffect(() => {
    // Проверяем системную тему при загрузке
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(isDark ? "dark" : "light")
    }
  }, [])

  return { theme, setTheme }
}
