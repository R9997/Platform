"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Home } from "lucide-react"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (formData.password !== formData.confirmPassword) {
      alert("Пароли не совпадают!")
      setIsLoading(false)
      return
    }

    // Имитация API вызова
    setTimeout(() => {
      window.location.href = "/dashboard"
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Link
        href="/"
        className="fixed top-4 left-4 z-20 flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-lg border soft-border hover:soft-glow transition-all duration-300"
      >
        <Home className="h-4 w-4" />
        <span className="text-sm font-medium">На главную</span>
      </Link>

      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />

      <Card className="w-full max-w-md bg-card/80 backdrop-blur-sm border soft-border relative z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-serif font-bold soft-text">Регистрация</CardTitle>
          <CardDescription className="text-muted-foreground">Создайте аккаунт в Рефрейм Бюро</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground font-medium">
                Имя
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="bg-background border-border focus:border-primary focus:ring-primary/20"
                placeholder="Ваше имя"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-background border-border focus:border-primary focus:ring-primary/20"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground font-medium">
                Подтвердите пароль
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
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
              {isLoading ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <Link href="/login" className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
              Уже есть аккаунт? Войти
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
