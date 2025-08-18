"use client"

import { Button } from "@/components/ui/button"
import { Menu, Zap, Home, Users, ChevronUp } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 100)
      setShowScrollTop(scrollPosition > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMobileMenuClick = () => {
    setIsMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg"
            : "enhanced-header shadow-lg shadow-primary/5"
        }`}
      >
        <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-lg bg-gradient-to-br from-primary to-accent soft-glow flex items-center justify-center">
              <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
            <span className="font-sans font-bold text-base sm:text-lg md:text-xl bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent tracking-tight">
              Рефрейм Бюро
            </span>
          </Link>

          {isMenuOpen && isScrolled && (
            <div className="hidden lg:block absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md animate-in slide-in-from-top-2 duration-300 border-b border-border/50 shadow-xl">
              <nav className="container mx-auto px-4 py-6 flex justify-center">
                <div className="flex items-center space-x-6">
                  <Link
                    href="/"
                    className="text-sm font-medium hover:text-primary transition-colors flex items-center py-2 px-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Home className="w-4 h-4 mr-1" />
                    Главная
                  </Link>
                  <Link
                    href="/about"
                    className="text-sm font-medium hover:text-primary transition-colors py-2 px-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    О нас
                  </Link>
                  <Link
                    href="/services"
                    className="text-sm font-medium hover:text-primary transition-colors py-2 px-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Услуги и решения
                  </Link>
                  <Link
                    href="/team"
                    className="text-sm font-medium hover:text-primary transition-colors flex items-center py-2 px-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Users className="w-4 h-4 mr-1" />
                    Команда
                  </Link>
                  <Link
                    href="/contact"
                    className="text-sm font-medium hover:text-primary transition-colors py-2 px-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Контакты
                  </Link>
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium hover:text-primary transition-colors py-2 px-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Личный кабинет
                  </Link>
                </div>
              </nav>
            </div>
          )}

          <nav
            className={`hidden lg:flex items-center space-x-4 xl:space-x-6 transition-all duration-300 ${
              isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <Link
              href="/"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center py-2 px-2"
            >
              <Home className="w-4 h-4 mr-1" />
              Главная
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors py-2 px-2">
              О нас
            </Link>
            <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors py-2 px-2">
              Услуги и решения
            </Link>
            <Link
              href="/team"
              className="text-sm font-medium hover:text-primary transition-colors flex items-center py-2 px-2"
            >
              <Users className="w-4 h-4 mr-1" />
              Команда
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors py-2 px-2">
              Контакты
            </Link>
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors py-2 px-2">
              Личный кабинет
            </Link>
          </nav>

          {isScrolled && (
            <Button
              variant="ghost"
              size="sm"
              className="hidden lg:flex hover:bg-primary/10 h-8 w-8 p-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Открыть меню"
            >
              <Menu className="h-4 w-4" />
            </Button>
          )}

          <div className="flex items-center space-x-1 sm:space-x-2">
            <ThemeToggle />
            <Link href="/login" className="hidden md:inline-flex">
              <Button
                variant="ghost"
                size="sm"
                className="hover:text-primary hover:bg-primary/10 transition-all duration-300 text-xs sm:text-sm px-2 sm:px-3"
              >
                Войти
              </Button>
            </Link>
            <Link href="/register">
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground soft-glow transition-all duration-300 text-xs sm:text-sm px-2 sm:px-4"
              >
                <span className="hidden sm:inline">Начать работу</span>
                <span className="sm:hidden">Старт</span>
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden hover:bg-primary/10 h-8 w-8 sm:h-9 sm:w-9 p-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Открыть меню"
            >
              <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-background/98 backdrop-blur-md animate-in slide-in-from-top-2 duration-300 border-t border-border/50 shadow-xl">
            <nav className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-1 max-h-[85vh] overflow-y-auto">
              <div className="grid gap-1">
                <Link
                  href="/"
                  className="flex items-center py-4 px-4 text-base font-medium hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-200 min-h-[48px]"
                  onClick={handleMobileMenuClick}
                >
                  <Home className="w-5 h-5 mr-3 text-primary/70 flex-shrink-0" />
                  <span>Главная</span>
                </Link>
                <Link
                  href="/about"
                  className="flex items-center py-4 px-4 text-base font-medium hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-200 min-h-[48px]"
                  onClick={handleMobileMenuClick}
                >
                  <span>О нас</span>
                </Link>
                <Link
                  href="/services"
                  className="flex items-center py-4 px-4 text-base font-medium hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-200 min-h-[48px]"
                  onClick={handleMobileMenuClick}
                >
                  <span>Услуги и решения</span>
                </Link>
                <Link
                  href="/team"
                  className="flex items-center py-4 px-4 text-base font-medium hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-200 min-h-[48px]"
                  onClick={handleMobileMenuClick}
                >
                  <Users className="w-5 h-5 mr-3 text-primary/70 flex-shrink-0" />
                  <span>Команда</span>
                </Link>
                <Link
                  href="/contact"
                  className="flex items-center py-4 px-4 text-base font-medium hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-200 min-h-[48px]"
                  onClick={handleMobileMenuClick}
                >
                  <span>Контакты</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center py-4 px-4 text-base font-medium hover:text-primary hover:bg-primary/10 rounded-xl transition-all duration-200 min-h-[48px]"
                  onClick={handleMobileMenuClick}
                >
                  <span>Личный кабинет</span>
                </Link>
              </div>

              <div className="pt-4 mt-4 border-t border-border/30 space-y-4">
                <div className="flex justify-center">
                  <ThemeToggle />
                </div>
                <div className="grid gap-3">
                  <Link href="/login" className="block" onClick={handleMobileMenuClick}>
                    <Button
                      variant="outline"
                      className="w-full justify-center hover:bg-primary/10 h-12 text-base enhanced-input bg-transparent min-h-[48px]"
                    >
                      Войти
                    </Button>
                  </Link>
                  <Link href="/register" className="block" onClick={handleMobileMenuClick}>
                    <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground soft-glow h-12 text-base min-h-[48px]">
                      Начать работу
                    </Button>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        )}
      </header>

      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 h-12 w-12 rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground soft-glow shadow-2xl transition-all duration-300 animate-in fade-in-0 slide-in-from-bottom-4"
          style={{ zIndex: 9999 }}
          aria-label="Наверх"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}
    </>
  )
}
