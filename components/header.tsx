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
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent soft-glow flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="font-serif font-bold text-xl bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent tracking-tight">
            Рефрейм Бюро
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors flex items-center py-2">
            <Home className="w-4 h-4 mr-1" />
            Главная
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors py-2">
            О нас
          </Link>
          <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors py-2">
            Услуги
          </Link>
          <Link href="/solutions" className="text-sm font-medium hover:text-primary transition-colors py-2">
            Наши решения
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors py-2">
            Контакты
          </Link>
          <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors py-2">
            Личный кабинет
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          <ThemeToggle />
          <Link href="/login" className="hidden sm:inline-flex">
            <Button variant="ghost" className="hover:text-primary hover:bg-primary/10 transition-all duration-300">
              Войти
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground soft-glow transition-all duration-300">
              Начать работу
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-primary/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Открыть меню"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur border-t border-border/50 animate-in slide-in-from-top-2 duration-200">
          <nav className="container mx-auto px-4 py-4 space-y-1">
            <Link
              href="/"
              className="flex items-center py-3 px-2 text-sm font-medium hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
              onClick={handleMobileMenuClick}
            >
              <Home className="w-4 h-4 mr-3" />
              Главная
            </Link>
            <Link
              href="/about"
              className="block py-3 px-2 text-sm font-medium hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
              onClick={handleMobileMenuClick}
            >
              О нас
            </Link>
            <Link
              href="/services"
              className="block py-3 px-2 text-sm font-medium hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
              onClick={handleMobileMenuClick}
            >
              Услуги
            </Link>
            <Link
              href="/solutions"
              className="block py-3 px-2 text-sm font-medium hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
              onClick={handleMobileMenuClick}
            >
              Наши решения
            </Link>
            <Link
              href="/contact"
              className="block py-3 px-2 text-sm font-medium hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
              onClick={handleMobileMenuClick}
            >
              Контакты
            </Link>
            <Link
              href="/dashboard"
              className="block py-3 px-2 text-sm font-medium hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200"
              onClick={handleMobileMenuClick}
            >
              Личный кабинет
            </Link>
            <div className="pt-4 border-t border-border/50 space-y-3">
              <div className="flex justify-center py-2">
                <ThemeToggle />
              </div>
              <Link href="/login" className="block" onClick={handleMobileMenuClick}>
                <Button variant="ghost" className="w-full justify-start hover:bg-primary/10">
                  Войти
                </Button>
              </Link>
              <Link href="/register" className="block" onClick={handleMobileMenuClick}>
                <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground soft-glow">
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
