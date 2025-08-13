import { Facebook, Twitter, Linkedin, Github, Mail, Phone, MapPin, Zap } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card/20 py-16 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary neon-glow-cyan flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-serif font-black text-xl neon-text-cyan">Рефрейм Бюро</span>
            </div>
            <p className="text-muted-foreground">
              Создаем будущее с помощью передовых ИИ технологий для трансформации вашего бизнеса.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary hover:neon-text-cyan transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary hover:neon-text-cyan transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary hover:neon-text-cyan transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary hover:neon-text-cyan transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-4 neon-text-purple">ИИ Решения</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary hover:neon-text-cyan transition-colors">
                  Чат-боты
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary hover:neon-text-cyan transition-colors">
                  Генерация контента
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary hover:neon-text-cyan transition-colors">
                  Аналитика данных
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary hover:neon-text-cyan transition-colors">
                  API интеграции
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-4 neon-text-purple">Компания</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary hover:neon-text-cyan transition-colors">
                  О нас
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary hover:neon-text-cyan transition-colors">
                  Блог
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary hover:neon-text-cyan transition-colors">
                  Карьера
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary hover:neon-text-cyan transition-colors">
                  Партнеры
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-bold text-lg mb-4 neon-text-purple">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:info@reframe.ai"
                  className="text-muted-foreground hover:text-primary hover:neon-text-cyan transition-colors text-sm"
                >
                  info@reframe.ai
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <a
                  href="tel:+7-495-123-45-67"
                  className="text-muted-foreground hover:text-primary hover:neon-text-cyan transition-colors text-sm"
                >
                  +7 (495) 123-45-67
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  Москва, Россия
                  <br />
                  Инновационный центр
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 Рефрейм Бюро. Все права защищены.</p>
        </div>
      </div>
    </footer>
  )
}
