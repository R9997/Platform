"use client"

import { Facebook, Twitter, Linkedin, Github, Mail, Phone, MapPin, Zap, Building2 } from "lucide-react"
import Link from "next/link"

export function Footer() {
  const handleSocialClick = (platform: string) => {
    const socialLinks = {
      facebook: "https://facebook.com/reframeburo",
      twitter: "https://twitter.com/reframeburo",
      linkedin: "https://linkedin.com/company/reframeburo",
      github: "https://github.com/reframeburo",
    }

    const url = socialLinks[platform as keyof typeof socialLinks]
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <footer className="bg-card/20 py-12 md:py-16 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent soft-glow flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="font-serif font-black text-xl soft-text">Рефрейм Бюро</span>
            </div>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Мы создаем будущее с помощью передовых ИИ технологий для трансформации вашего бизнеса.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => handleSocialClick("facebook")}
                className="text-muted-foreground hover:text-primary hover:soft-text transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleSocialClick("twitter")}
                className="text-muted-foreground hover:text-primary hover:soft-text transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleSocialClick("linkedin")}
                className="text-muted-foreground hover:text-primary hover:soft-text transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleSocialClick("github")}
                className="text-muted-foreground hover:text-primary hover:soft-text transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-4 soft-text">ИИ Решения</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/solutions"
                  className="text-muted-foreground hover:text-primary hover:soft-text transition-all duration-300 text-sm md:text-base"
                >
                  Чат-боты
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions"
                  className="text-muted-foreground hover:text-primary hover:soft-text transition-all duration-300 text-sm md:text-base"
                >
                  Генерация контента
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions"
                  className="text-muted-foreground hover:text-primary hover:soft-text transition-all duration-300 text-sm md:text-base"
                >
                  Аналитика данных
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions"
                  className="text-muted-foreground hover:text-primary hover:soft-text transition-all duration-300 text-sm md:text-base"
                >
                  API интеграции
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-4 soft-text">Компания</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary hover:soft-text transition-all duration-300 text-sm md:text-base"
                >
                  О нас
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-primary hover:soft-text transition-all duration-300 text-sm md:text-base"
                >
                  Услуги
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary hover:soft-text transition-all duration-300 text-sm md:text-base"
                >
                  Контакты
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-primary hover:soft-text transition-all duration-300 text-sm md:text-base"
                >
                  Личный кабинет
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-4 soft-text">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@reframeburo.ru"
                  className="text-muted-foreground hover:text-primary hover:soft-text transition-all duration-300 text-sm md:text-base"
                >
                  info@reframeburo.ru
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <a
                  href="tel:+7-495-123-45-67"
                  className="text-muted-foreground hover:text-primary hover:soft-text transition-all duration-300 text-sm md:text-base"
                >
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm md:text-base">
                  г. Москва, ул. Инновационная, д. 15
                  <br />
                  БЦ "Технопарк", офис 301
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-4 soft-text">Правовая информация</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Building2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-muted-foreground text-sm">
                  <div className="font-medium">ООО "Рефрейм Бюро"</div>
                  <div>ИНН: 7701234567</div>
                  <div>ОГРН: 1234567890123</div>
                  <div>КПП: 770101001</div>
                </div>
              </div>
            </div>
            <ul className="space-y-2 mt-4">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-muted-foreground hover:text-primary hover:soft-text transition-all duration-300 text-sm"
                >
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="text-muted-foreground hover:text-primary hover:soft-text transition-all duration-300 text-sm"
                >
                  Пользовательское соглашение
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="text-muted-foreground hover:text-primary hover:soft-text transition-all duration-300 text-sm"
                >
                  Политика использования cookies
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="text-muted-foreground hover:text-primary hover:soft-text transition-all duration-300 text-sm"
                >
                  Политика возврата
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 md:mt-12 pt-6 md:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-sm text-muted-foreground">&copy; 2024 ООО "Рефрейм Бюро". Все права защищены.</p>
              <p className="text-xs text-muted-foreground mt-1">
                Лицензия на осуществление деятельности по разработке программного обеспечения
              </p>
            </div>
            <div className="flex flex-wrap justify-center md:justify-end gap-4 text-xs text-muted-foreground">
              <Link href="/sitemap" className="hover:text-primary transition-colors">
                Карта сайта
              </Link>
              <Link href="/accessibility" className="hover:text-primary transition-colors">
                Доступность
              </Link>
              <Link href="/support" className="hover:text-primary transition-colors">
                Техподдержка
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
