"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="reframe-glow-hover">
        <Sun className="h-5 w-5" />
      </Button>
    )
  }

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="reframe-glow-hover transition-all duration-300 hover:bg-reframe-primary/10"
      aria-label="Переключить тему"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 reframe-text-primary" />
      ) : (
        <Sun className="h-5 w-5 reframe-text-primary" />
      )}
      <span className="sr-only">Переключить тему</span>
    </Button>
  )
}
