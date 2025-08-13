"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"

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
    <div className="min-h-screen bg-[var(--color-dark-bg)] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"></div>

      <Card className="w-full max-w-md bg-[var(--color-dark-surface)] border-[var(--color-dark-border)] neon-border relative z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold neon-text">Регистрация</CardTitle>
          <CardDescription className="text-[var(--color-text-secondary)]">
            Создайте аккаунт в Рефрейм Бюро
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-[var(--color-text-primary)]">
                Имя
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="bg-[var(--color-dark-bg)] border-[var(--color-dark-border)] text-[var(--color-text-primary)] focus:border-cyan-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-[var(--color-text-primary)]">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="bg-[var(--color-dark-bg)] border-[var(--color-dark-border)] text-[var(--color-text-primary)] focus:border-cyan-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-[var(--color-text-primary)]">
                Подтвердите пароль
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-[var(--color-dark-bg)] border-[var(--color-dark-border)] text-[var(--color-text-primary)] focus:border-cyan-500"
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-semibold neon-glow"
              disabled={isLoading}
            >
              {isLoading ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link href="/login" className="text-cyan-400 hover:text-cyan-300 text-sm">
              Уже есть аккаунт? Войти
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
