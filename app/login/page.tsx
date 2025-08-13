"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Имитация API вызова
    setTimeout(() => {
      // Перенаправление в личный кабинет
      window.location.href = "/dashboard"
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[var(--color-dark-bg)] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"></div>

      <Card className="w-full max-w-md bg-[var(--color-dark-surface)] border-[var(--color-dark-border)] neon-border relative z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold neon-text">Вход в систему</CardTitle>
          <CardDescription className="text-[var(--color-text-secondary)]">
            Войдите в свой аккаунт Рефрейм Бюро
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[var(--color-text-primary)]">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[var(--color-dark-bg)] border-[var(--color-dark-border)] text-[var(--color-text-primary)] focus:border-cyan-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[var(--color-text-primary)]">
                Пароль
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[var(--color-dark-bg)] border-[var(--color-dark-border)] text-[var(--color-text-primary)] focus:border-cyan-500"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold neon-glow"
              disabled={isLoading}
            >
              {isLoading ? "Вход..." : "Войти"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link href="/register" className="text-cyan-400 hover:text-cyan-300 text-sm">
              Нет аккаунта? Зарегистрироваться
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
