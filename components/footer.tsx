import { Facebook, Twitter, Linkedin, Github, Mail, Phone, MapPin, Zap } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-card/20 py-12 md:py-16 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent soft-glow flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="font-serif font-black text-xl soft-text">Рефрейм Бюро</span>
            </div>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Создаем будущее с помощью передовых ИИ технологий для трансформации вашего бизнеса.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary hover:soft-text transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary hover:soft-text transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary hover:soft-text transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary hover:soft-text transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
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
                  Москва, Россия
                  <br />
                  Инновационный центр
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-muted-foreground">
          <p className="text-sm md:text-base">&copy; 2024 Рефрейм Бюро. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
