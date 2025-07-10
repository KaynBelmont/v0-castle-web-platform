import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, Eye, Radio, Youtube, Instagram, Zap, Crown, Sword, Shield } from "lucide-react"

export function Dashboard() {
  const stats = [
    {
      title: "Cavaleiros Ativos",
      value: "30",
      change: "+2 esta semana",
      icon: Users,
      color: "text-blue-400",
    },
    {
      title: "Ao Vivo Agora",
      value: "8",
      change: "5 Streamers, 3 Lives",
      icon: Radio,
      color: "text-red-400",
    },
    {
      title: "Alcance Total",
      value: "2.4M",
      change: "+15% este mês",
      icon: Eye,
      color: "text-green-400",
    },
    {
      title: "Engajamento",
      value: "89%",
      change: "+5% esta semana",
      icon: TrendingUp,
      color: "text-amber-400",
    },
  ]

  const twitchStats = [
    {
      title: "Streams Ativas",
      value: "3",
      change: "Twitch",
      icon: Radio,
      color: "text-purple-400",
    },
    {
      title: "Total Viewers",
      value: "4.2K",
      change: "Ao vivo agora",
      icon: Eye,
      color: "text-purple-400",
    },
  ]

  const liveMembers = [
    {
      name: "Sir Streamer",
      platform: "Twitch",
      viewers: "1.2K",
      category: "Streamer",
      status: "live",
      avatar: "🛡️",
    },
    {
      name: "Lady Content",
      platform: "YouTube",
      viewers: "856",
      category: "YouTuber",
      status: "live",
      avatar: "👑",
    },
    {
      name: "Knight Gaming",
      platform: "Kick",
      viewers: "432",
      category: "Streamer",
      status: "live",
      avatar: "⚔️",
    },
  ]

  const recentActivity = [
    {
      member: "Sir Streamer",
      action: "Iniciou transmissão",
      platform: "Twitch",
      time: "2 min atrás",
      type: "live",
    },
    {
      member: "Lady Content",
      action: "Publicou novo vídeo",
      platform: "YouTube",
      time: "1 hora atrás",
      type: "video",
    },
    {
      member: "Knight Social",
      action: "Post no Instagram",
      platform: "Instagram",
      time: "3 horas atrás",
      type: "post",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amber-100 font-serif">Salão Principal</h1>
          <p className="text-amber-300/70">Visão geral do Reino Castle</p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700 text-amber-100">
          <Crown className="h-4 w-4 mr-2" />
          Convocar Cavaleiros
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-amber-200">{stat.title}</CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-amber-100">{stat.value}</div>
                <p className="text-xs text-amber-300/70">{stat.change}</p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Members */}
        <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-amber-100 flex items-center">
              <Radio className="h-5 w-5 mr-2 text-red-400" />
              Cavaleiros em Batalha (Ao Vivo)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {liveMembers.map((member, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg border border-amber-600/10"
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{member.avatar}</div>
                  <div>
                    <p className="font-medium text-amber-100">{member.name}</p>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-red-600/20 text-red-300 border-red-500/50">
                        <div className="w-2 h-2 bg-red-400 rounded-full mr-1 animate-pulse"></div>
                        AO VIVO
                      </Badge>
                      <span className="text-xs text-amber-300/70">{member.platform}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-amber-100">{member.viewers}</p>
                  <p className="text-xs text-amber-300/70">espectadores</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-amber-100 flex items-center">
              <Sword className="h-5 w-5 mr-2 text-amber-400" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg border border-amber-600/10"
              >
                <div className="flex-shrink-0">
                  {activity.type === "live" && <Radio className="h-4 w-4 text-red-400" />}
                  {activity.type === "video" && <Youtube className="h-4 w-4 text-red-500" />}
                  {activity.type === "post" && <Instagram className="h-4 w-4 text-pink-400" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-amber-100">
                    <span className="font-medium">{activity.member}</span> {activity.action}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs border-amber-600/30 text-amber-300">
                      {activity.platform}
                    </Badge>
                    <span className="text-xs text-amber-300/70">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-amber-100 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-amber-400" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="border-amber-600/30 text-amber-200 hover:bg-amber-600/10 bg-transparent"
            >
              <Users className="h-4 w-4 mr-2" />
              Gerenciar Membros
            </Button>
            <Button
              variant="outline"
              className="border-amber-600/30 text-amber-200 hover:bg-amber-600/10 bg-transparent"
            >
              <Zap className="h-4 w-4 mr-2" />
              Enviar Notificação
            </Button>
            <Button
              variant="outline"
              className="border-amber-600/30 text-amber-200 hover:bg-amber-600/10 bg-transparent"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Ver Relatórios
            </Button>
            <Button
              variant="outline"
              className="border-amber-600/30 text-amber-200 hover:bg-amber-600/10 bg-transparent"
            >
              <Crown className="h-4 w-4 mr-2" />
              Configurações
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-purple-600/20 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center">
            <Radio className="h-5 w-5 mr-2 text-purple-400" />
            Twitch Live Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {twitchStats.map((stat, index) => (
              <div key={index} className="text-center p-3 bg-purple-900/20 rounded-lg">
                <p className="text-lg font-bold text-purple-200">{stat.value}</p>
                <p className="text-xs text-purple-300/70">{stat.change}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
