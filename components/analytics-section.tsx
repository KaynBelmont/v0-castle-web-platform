"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Eye, Users, Heart, BarChart3, Calendar, Download } from "lucide-react"
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

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

  // Dados para o gráfico de área (últimos 30 dias)
  const monthlyData = [
    { day: "1", views: 45000, engagement: 82, followers: 320 },
    { day: "3", views: 52000, engagement: 85, followers: 380 },
    { day: "5", views: 48000, engagement: 81, followers: 290 },
    { day: "7", views: 61000, engagement: 88, followers: 420 },
    { day: "9", views: 55000, engagement: 86, followers: 390 },
    { day: "11", views: 67000, engagement: 90, followers: 510 },
    { day: "13", views: 58000, engagement: 84, followers: 360 },
    { day: "15", views: 72000, engagement: 91, followers: 580 },
    { day: "17", views: 69000, engagement: 89, followers: 540 },
    { day: "19", views: 78000, engagement: 93, followers: 620 },
    { day: "21", views: 71000, engagement: 88, followers: 490 },
    { day: "23", views: 82000, engagement: 94, followers: 680 },
    { day: "25", views: 76000, engagement: 90, followers: 560 },
    { day: "27", views: 85000, engagement: 95, followers: 720 },
    { day: "29", views: 88000, engagement: 92, followers: 650 },
    { day: "30", views: 92000, engagement: 96, followers: 780 },
  ]

  // Dados para gráfico de barras (comparação de plataformas)
  const platformComparisonData = [
    { platform: "Twitch", views: 1200000, engagement: 88, hours: 456 },
    { platform: "YouTube", views: 890000, engagement: 85, hours: 389 },
    { platform: "Instagram", views: 567000, engagement: 92, hours: 234 },
    { platform: "TikTok", views: 345000, engagement: 90, hours: 156 },
    { platform: "Kick", views: 123000, engagement: 78, hours: 89 },
  ]

  // Dados para gráfico de pizza (distribuição de conteúdo)
  const contentDistribution = [
    { name: "Gaming", value: 35, color: "#8b5cf6" },
    { name: "Tutoriais", value: 25, color: "#ef4444" },
    { name: "Vlogs", value: 20, color: "#f59e0b" },
    { name: "Reviews", value: 12, color: "#10b981" },
    { name: "Outros", value: 8, color: "#6b7280" },
  ]

  // Dados para gráfico de linha (crescimento de seguidores)
  const followersGrowthData = [
    { month: "Jul", seguidores: 28500 },
    { month: "Ago", seguidores: 32100 },
    { month: "Set", seguidores: 36800 },
    { month: "Out", seguidores: 42300 },
    { month: "Nov", seguidores: 48900 },
    { month: "Dez", seguidores: 56200 },
    { month: "Jan", seguidores: 64500 },
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

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Área - Performance Mensal */}
        <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-amber-100 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-amber-400" />
              Performance dos Últimos 30 Dias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorEngagement" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" stroke="#f59e0b" />
                <YAxis stroke="#f59e0b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #f59e0b33",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#f59e0b"
                  fillOpacity={1}
                  fill="url(#colorViews)"
                  name="Visualizações"
                />
                <Area
                  type="monotone"
                  dataKey="engagement"
                  stroke="#8b5cf6"
                  fillOpacity={1}
                  fill="url(#colorEngagement)"
                  name="Engajamento %"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Pizza - Distribuição de Conteúdo */}
        <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-amber-100 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-amber-400" />
              Distribuição de Conteúdo
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={contentDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {contentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #f59e0b33",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Barras - Comparação de Plataformas */}
      <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-amber-100 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-amber-400" />
            Comparação Entre Plataformas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={platformComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="platform" stroke="#f59e0b" />
              <YAxis yAxisId="left" orientation="left" stroke="#f59e0b" />
              <YAxis yAxisId="right" orientation="right" stroke="#8b5cf6" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  border: "1px solid #f59e0b33",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="views" fill="#f59e0b" name="Visualizações" />
              <Bar yAxisId="right" dataKey="engagement" fill="#8b5cf6" name="Engajamento %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Linha - Crescimento de Seguidores */}
        <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-amber-100 flex items-center">
              <Users className="h-5 w-5 mr-2 text-amber-400" />
              Crescimento de Seguidores
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={followersGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#f59e0b" />
                <YAxis stroke="#f59e0b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "1px solid #f59e0b33",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="seguidores"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 6 }}
                  name="Total de Seguidores"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

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
      </div>

      {/* Platform Performance */}
      <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-amber-100 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-amber-400" />
            Desempenho por Plataforma
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {platformStats.map((platform, index) => (
              <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-amber-600/10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-amber-100">{platform.platform}</h3>
                  <Badge className={platform.color}>{platform.members}</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-amber-300/70">Total Views</p>
                    <p className="font-bold text-amber-100">{platform.totalViews}</p>
                  </div>
                  <div>
                    <p className="text-amber-300/70">Avg Viewers</p>
                    <p className="font-bold text-amber-100">{platform.avgViewers}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
