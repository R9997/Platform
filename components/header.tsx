"use client"

import { Button } from "@/components/ui/button"
import { Menu, Zap, Home } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleMobileMenuClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 neon-glow flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="font-serif font-black text-xl neon-text">Рефрейм Бюро</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-sm font-medium hover:text-cyan-400 transition-colors flex items-center">
            <Home className="w-4 h-4 mr-1" />
            Главная
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-cyan-400 transition-colors">
            О нас
          </Link>
          <Link href="/services" className="text-sm font-medium hover:text-cyan-400 transition-colors">
            Услуги
          </Link>
          <Link href="/solutions" className="text-sm font-medium hover:text-cyan-400 transition-colors">
            Наши решения
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-cyan-400 transition-colors">
            Контакты
          </Link>
          <Link href="/dashboard" className="text-sm font-medium hover:text-cyan-400 transition-colors">
            Личный кабинет
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="ghost" className="hidden md:inline-flex hover:text-cyan-400">
              Войти
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white neon-glow">
              Начать работу
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Открыть меню"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur border-t border-border/50">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            <Link
              href="/"
              className="block py-2 text-sm font-medium hover:text-cyan-400 transition-colors flex items-center"
              onClick={handleMobileMenuClick}
            >
              <Home className="w-4 h-4 mr-2" />
              Главная
            </Link>
            <Link
              href="/about"
              className="block py-2 text-sm font-medium hover:text-cyan-400 transition-colors"
              onClick={handleMobileMenuClick}
            >
              О нас
            </Link>
            <Link
              href="/services"
              className="block py-2 text-sm font-medium hover:text-cyan-400 transition-colors"
              onClick={handleMobileMenuClick}
            >
              Услуги
            </Link>
            <Link
              href="/solutions"
              className="block py-2 text-sm font-medium hover:text-cyan-400 transition-colors"
              onClick={handleMobileMenuClick}
            >
              Наши решения
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-sm font-medium hover:text-cyan-400 transition-colors"
              onClick={handleMobileMenuClick}
            >
              Контакты
            </Link>
            <Link
              href="/dashboard"
              className="block py-2 text-sm font-medium hover:text-cyan-400 transition-colors"
              onClick={handleMobileMenuClick}
            >
              Личный кабинет
            </Link>
            <div className="pt-2 space-y-2">
              <div className="flex justify-center py-2">
                <ThemeToggle />
              </div>
              <Link href="/login" className="block" onClick={handleMobileMenuClick}>
                <Button variant="ghost" className="w-full justify-start">
                  Войти
                </Button>
              </Link>
              <Link href="/register" className="block" onClick={handleMobileMenuClick}>
                <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white">
                  Начать работу
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
