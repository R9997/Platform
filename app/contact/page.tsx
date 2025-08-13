"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Clock, Home } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Здесь будет логика отправки формы
    alert("Спасибо за обращение! Мы свяжемся с вами в ближайшее время.")
    setFormData({ name: "", email: "", company: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button
                variant="outline"
                className="border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 bg-transparent"
              >
                <Home className="w-4 h-4 mr-2" />
                На главную
              </Button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 neon-text mb-4">Свяжитесь с нами</h1>
            <p className="text-xl text-muted-foreground">Готовы обсудить ваш проект? Мы всегда рады помочь</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-card/80 backdrop-blur-sm border-cyan-500/20">
              <CardHeader>
                <CardTitle className="text-cyan-400">Отправить сообщение</CardTitle>
                <CardDescription>Заполните форму, и мы свяжемся с вами в течение 24 часов</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Ваше имя"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-background/50 border-cyan-500/30 focus:border-cyan-400"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-background/50 border-cyan-500/30 focus:border-cyan-400"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      name="company"
                      placeholder="Компания (необязательно)"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-background/50 border-cyan-500/30 focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Расскажите о вашем проекте..."
                      value={formData.message}
                      onChange={handleChange}
                      className="bg-background/50 border-cyan-500/30 focus:border-cyan-400 min-h-[120px]"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white"
                  >
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="bg-card/80 backdrop-blur-sm border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Контактная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <p className="text-muted-foreground">info@reframe-bureau.ru</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Телефон</p>
                      <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Адрес</p>
                      <p className="text-muted-foreground">Москва, ул. Тверская, 1</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Время работы</p>
                      <p className="text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card/80 backdrop-blur-sm border-cyan-500/20">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Часто задаваемые вопросы</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Сколько стоят ваши услуги?</h4>
                    <p className="text-sm text-muted-foreground">
                      Стоимость зависит от сложности проекта. Мы предоставляем бесплатную консультацию для оценки.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Как долго длится проект?</h4>
                    <p className="text-sm text-muted-foreground">
                      Обычно от 2 до 12 недель в зависимости от масштаба и сложности решения.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Предоставляете ли вы поддержку?</h4>
                    <p className="text-sm text-muted-foreground">
                      Да, мы предоставляем полную техническую поддержку и обслуживание всех наших решений.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
