"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Home } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      window.location.href = "/dashboard"
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="fixed top-4 left-4 right-4 z-20 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-lg border soft-border hover:soft-glow transition-all duration-300"
        >
          <Home className="h-4 w-4" />
          <span className="text-sm font-medium">На главную</span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />

      <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm border soft-border relative z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-serif font-bold soft-text">Вход в систему</CardTitle>
          <CardDescription className="text-muted-foreground">Войдите в свой аккаунт Рефрейм Бюро</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background border-border focus:border-primary focus:ring-primary/20"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground font-medium">
                Пароль
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-background border-border focus:border-primary focus:ring-primary/20"
                placeholder="••••••••"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold soft-glow"
              disabled={isLoading}
            >
              {isLoading ? "Вход..." : "Войти"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <Link href="/register" className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
              Нет аккаунта? Зарегистрироваться
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
