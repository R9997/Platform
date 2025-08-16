"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Star, ArrowRight, Code, Briefcase, Brain } from "lucide-react"
import Link from "next/link"

const teamMembers = [
  {
    name: "Александр Петров",
    role: "CEO & Основатель",
    experience: "12+ лет",
    description: "Эксперт по цифровой трансформации бизнеса и внедрению ИИ-решений",
    skills: ["Стратегия", "ИИ", "Лидерство"],
    achievements: "50+ успешных проектов",
    icon: Briefcase,
    gradient: "from-blue-500/10 to-cyan-500/10",
    image: "/alexander-petrov-ceo-portrait.png",
  },
  {
    name: "Мария Козлова",
    role: "CTO & Техдиректор",
    experience: "10+ лет",
    description: "Архитектор ИИ-систем и эксперт по машинному обучению",
    skills: ["Python", "ML/AI", "DevOps"],
    achievements: "Патенты в области ИИ",
    icon: Brain,
    gradient: "from-purple-500/10 to-pink-500/10",
    image: "/maria-kozlova-cto.png",
  },
  {
    name: "Дмитрий Сидоров",
    role: "Lead Developer",
    experience: "8+ лет",
    description: "Ведущий разработчик полного цикла, специалист по современным технологиям",
    skills: ["React", "Node.js", "TypeScript"],
    achievements: "100+ проектов",
    icon: Code,
    gradient: "from-green-500/10 to-emerald-500/10",
    image: "/dmitry-sidorov-portrait.png",
  },
]

const stats = [
  { label: "Лет опыта", value: "12+", icon: Award },
  { label: "Завершенных проектов", value: "150+", icon: Briefcase },
  { label: "Довольных клиентов", value: "50+", icon: Users },
  { label: "Экспертов в команде", value: "6", icon: Star },
]

export function TeamSection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Users className="w-6 h-6 text-primary" />
            <Badge variant="secondary" className="text-sm font-medium">
              Наша команда
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Эксперты, которые создают
            <span className="text-primary block sm:inline sm:ml-3">будущее вашего бизнеса</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Команда профессионалов с многолетним опытом в области ИИ, разработки и бизнес-консалтинга. Мы объединяем
            технические знания с глубоким пониманием бизнес-процессов.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center p-4 sm:p-6 enhanced-card">
              <CardContent className="p-0">
                <div className="flex flex-col items-center gap-3">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className={`group hover:shadow-xl transition-all duration-500 hover:scale-105 bg-gradient-to-br ${member.gradient} border-primary/10 enhanced-card`}
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  {/* Avatar */}
                  <div className="relative mb-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                      <member.icon className="w-10 h-10 text-primary" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-background flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>

                  {/* Info */}
                  <h3 className="text-xl font-bold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold mb-2">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{member.description}</p>

                  {/* Experience & Achievements */}
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">{member.experience}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-muted-foreground text-xs">{member.achievements}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-2xl p-8 sm:p-12 border border-primary/20">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">Готовы работать с лучшими?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Познакомьтесь с нашей командой поближе и узнайте, как мы можем помочь вашему бизнесу достичь новых высот с
              помощью ИИ-технологий.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/team">
                <Button size="lg" className="flex items-center gap-2 min-w-[200px]">
                  Узнать больше о команде
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" size="lg" className="flex items-center gap-2 min-w-[200px] bg-transparent">
                  Начать работу
                  <Users className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
