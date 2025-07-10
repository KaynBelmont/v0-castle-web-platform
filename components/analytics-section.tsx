import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Eye, Users, Heart, BarChart3, Calendar, Download } from "lucide-react"

export function AnalyticsSection() {
  const overallStats = [
    {
      title: "Visualizações Totais",
      value: "2.4M",
      change: "+15.2%",
      trend: "up",
      icon: Eye,
    },
    {
      title: "Novos Seguidores",
      value: "12.8K",
      change: "+8.7%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Engajamento Médio",
      value: "89.2%",
      change: "-2.1%",
      trend: "down",
      icon: Heart,
    },
    {
      title: "Horas Transmitidas",
      value: "1,247h",
      change: "+22.5%",
      trend: "up",
      icon: BarChart3,
    },
  ]

  const topPerformers = [
    {
      name: "Sir StreamKnight",
      type: "Streamer",
      platform: "Twitch",
      views: "456K",
      engagement: "92%",
      growth: "+18%",
      avatar: "🛡️",
    },
    {
      name: "Lady ContentQueen",
      type: "YouTuber",
      platform: "YouTube",
      views: "389K",
      engagement: "87%",
      growth: "+12%",
      avatar: "👑",
    },
    {
      name: "Knight Influencer",
      type: "Influenciador",
      platform: "Instagram",
      views: "234K",
      engagement: "94%",
      growth: "+25%",
      avatar: "⚔️",
    },
  ]

  const platformStats = [
    {
      platform: "Twitch",
      members: 15,
      totalViews: "1.2M",
      avgViewers: "2.1K",
      color: "bg-purple-600/20 border-purple-500/50 text-purple-300",
    },
    {
      platform: "YouTube",
      members: 10,
      totalViews: "890K",
      avgViewers: "1.8K",
      color: "bg-red-600/20 border-red-500/50 text-red-300",
    },
    {
      platform: "Instagram",
      members: 8,
      totalViews: "567K",
      avgViewers: "1.2K",
      color: "bg-pink-600/20 border-pink-500/50 text-pink-300",
    },
    {
      platform: "TikTok",
      members: 5,
      totalViews: "345K",
      avgViewers: "890",
      color: "bg-gray-600/20 border-gray-500/50 text-gray-300",
    },
    {
      platform: "Kick",
      members: 3,
      totalViews: "123K",
      avgViewers: "456",
      color: "bg-green-600/20 border-green-500/50 text-green-300",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amber-100 font-serif">Relatórios do Reino</h1>
          <p className="text-amber-300/70">Análise detalhada do desempenho dos cavaleiros</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-amber-600/30 text-amber-200 bg-transparent">
            <Calendar className="h-4 w-4 mr-2" />
            Período
          </Button>
          <Button className="bg-amber-600 hover:bg-amber-700 text-amber-100">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overallStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-amber-200">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-amber-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-100">{stat.value}</div>
                <div className="flex items-center space-x-1 mt-1">
                  {stat.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 text-green-400" />
                  ) : (
                    <TrendingDown className="h-3 w-3 text-red-400" />
                  )}
                  <span className={`text-xs ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                    {stat.change}
                  </span>
                  <span className="text-xs text-amber-300/70">vs mês anterior</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-amber-100 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-amber-400" />
              Melhores Cavaleiros
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-amber-600/10"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{performer.avatar}</div>
                  <div>
                    <p className="font-medium text-amber-100">{performer.name}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-slate-600/50 text-amber-200 text-xs">
                        {performer.type}
                      </Badge>
                      <Badge variant="outline" className="border-amber-600/30 text-amber-300 text-xs">
                        {performer.platform}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-bold text-amber-100">{performer.views}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-amber-300/70">Eng: {performer.engagement}</span>
                    <span className="text-xs text-green-400">{performer.growth}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Platform Performance */}
        <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-amber-100 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-amber-400" />
              Desempenho por Plataforma
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {platformStats.map((platform, index) => (
              <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-amber-600/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-amber-100">{platform.platform}</h3>
                  <Badge className={platform.color}>{platform.members} membros</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-amber-300/70">Total de Views</p>
                    <p className="font-bold text-amber-100">{platform.totalViews}</p>
                  </div>
                  <div>
                    <p className="text-amber-300/70">Média de Viewers</p>
                    <p className="font-bold text-amber-100">{platform.avgViewers}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Chart Placeholder */}
      <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-amber-100 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-amber-400" />
            Gráfico de Desempenho Mensal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-slate-700/30 rounded-lg border border-amber-600/10 flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-amber-400 mx-auto mb-2" />
              <p className="text-amber-200">Gráfico interativo será implementado aqui</p>
              <p className="text-sm text-amber-300/70">Visualização de dados em tempo real</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
