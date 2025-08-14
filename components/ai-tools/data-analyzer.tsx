"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, Upload, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"

export function DataAnalyzer() {
  const [analysisData, setAnalysisData] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<any>(null)

  const handleAnalyze = async () => {
    if (!analysisData.trim()) return

    setIsAnalyzing(true)

    setTimeout(() => {
      const results = {
        summary: {
          totalRecords: 1247,
          validRecords: 1198,
          errorRate: 3.9,
          completeness: 96.1,
        },
        insights: [
          {
            type: "trend",
            title: "Рост продаж на 23%",
            description: "Выявлен устойчивый рост продаж в сегменте B2B за последние 3 месяца",
            impact: "high",
            confidence: 94,
          },
          {
            type: "anomaly",
            title: "Аномалия в регионе Сибирь",
            description: "Снижение активности клиентов на 15% в сибирском регионе",
            impact: "medium",
            confidence: 87,
          },
          {
            type: "opportunity",
            title: "Потенциал роста в сегменте SMB",
            description: "Малый и средний бизнес показывает высокую готовность к покупке",
            impact: "high",
            confidence: 91,
          },
        ],
        recommendations: [
          "Увеличить маркетинговый бюджет для B2B сегмента на 30%",
          "Провести исследование причин снижения активности в Сибири",
          "Разработать специальные предложения для SMB сегмента",
          "Оптимизировать процесс сбора данных для снижения ошибок",
        ],
        metrics: {
          accuracy: 96.1,
          processingTime: 2.3,
          dataQuality: 94.2,
          actionableInsights: 8,
        },
      }

      setAnalysisResults(results)
      setIsAnalyzing(false)
    }, 3000)
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-600 bg-red-100 dark:bg-red-900/20"
      case "medium":
        return "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20"
      case "low":
        return "text-green-600 bg-green-100 dark:bg-green-900/20"
      default:
        return "text-muted-foreground bg-muted"
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center text-foreground">
            <BarChart3 className="w-5 h-5 mr-2 text-primary" />
            Анализатор данных
          </CardTitle>
          <CardDescription>Загрузите данные для получения инсайтов и рекомендаций</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Данные для анализа</label>
            <Textarea
              value={analysisData}
              onChange={(e) => setAnalysisData(e.target.value)}
              placeholder="Вставьте CSV данные, JSON или описание вашего датасета..."
              className="bg-background border-border/50 min-h-[120px]"
            />
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={handleAnalyze}
              disabled={!analysisData.trim() || isAnalyzing}
              className="bg-primary hover:bg-primary/90"
            >
              {isAnalyzing ? "Анализируем..." : "Анализировать данные"}
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Upload className="w-4 h-4 mr-2" />
              Загрузить файл
            </Button>
          </div>

          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Обработка данных...</span>
                <span className="text-foreground">73%</span>
              </div>
              <Progress value={73} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {analysisResults && (
        <div className="space-y-6">
          {/* Сводка анализа */}
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Сводка анализа</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{analysisResults.summary.totalRecords}</p>
                  <p className="text-sm text-muted-foreground">Всего записей</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{analysisResults.summary.validRecords}</p>
                  <p className="text-sm text-muted-foreground">Валидных записей</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{analysisResults.summary.errorRate}%</p>
                  <p className="text-sm text-muted-foreground">Ошибок</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{analysisResults.summary.completeness}%</p>
                  <p className="text-sm text-muted-foreground">Полнота данных</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Инсайты */}
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Ключевые инсайты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analysisResults.insights.map((insight: any, index: number) => (
                  <div key={index} className="p-4 bg-background/50 border border-border/30 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {insight.type === "trend" && <TrendingUp className="w-4 h-4 text-green-600" />}
                        {insight.type === "anomaly" && <AlertCircle className="w-4 h-4 text-yellow-600" />}
                        {insight.type === "opportunity" && <CheckCircle className="w-4 h-4 text-blue-600" />}
                        <h4 className="font-semibold text-foreground">{insight.title}</h4>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getImpactColor(insight.impact)}>
                          {insight.impact === "high" ? "Высокий" : insight.impact === "medium" ? "Средний" : "Низкий"}{" "}
                          импакт
                        </Badge>
                        <Badge variant="outline">{insight.confidence}% уверенность</Badge>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{insight.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Рекомендации */}
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Рекомендации</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analysisResults.recommendations.map((rec: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-primary/5 border border-primary/20 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <p className="text-foreground">{rec}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Метрики качества */}
          <Card className="bg-card/50 backdrop-blur-sm border border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground">Метрики анализа</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Точность</span>
                    <span className="text-sm font-medium text-foreground">{analysisResults.metrics.accuracy}%</span>
                  </div>
                  <Progress value={analysisResults.metrics.accuracy} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Время обработки</span>
                    <span className="text-sm font-medium text-foreground">
                      {analysisResults.metrics.processingTime}с
                    </span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Качество данных</span>
                    <span className="text-sm font-medium text-foreground">{analysisResults.metrics.dataQuality}%</span>
                  </div>
                  <Progress value={analysisResults.metrics.dataQuality} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-muted-foreground">Инсайтов</span>
                    <span className="text-sm font-medium text-foreground">
                      {analysisResults.metrics.actionableInsights}
                    </span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
