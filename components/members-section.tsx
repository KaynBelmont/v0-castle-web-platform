"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Zap, Eye, Crown } from "lucide-react"

export function MembersSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const members = [
    {
      id: 1,
      name: "Sir StreamKnight",
      type: "Streamer",
      platforms: ["Twitch", "YouTube"],
      status: "live",
      viewers: "2.1K",
      followers: "45K",
      avatar: "🛡️",
      lastActivity: "2 min atrás",
    },
    {
      id: 2,
      name: "Lady ContentQueen",
      type: "YouTuber",
      platforms: ["YouTube", "Instagram"],
      status: "offline",
      viewers: "0",
      followers: "128K",
      avatar: "👑",
      lastActivity: "3 horas atrás",
    },
    {
      id: 3,
      name: "Knight Influencer",
      type: "Influenciador",
      platforms: ["Instagram", "TikTok"],
      status: "active",
      viewers: "0",
      followers: "89K",
      avatar: "⚔️",
      lastActivity: "1 hora atrás",
    },
    {
      id: 4,
      name: "Baron GameMaster",
      type: "Streamer",
      platforms: ["Kick", "Twitch"],
      status: "live",
      viewers: "856",
      followers: "32K",
      avatar: "🏰",
      lastActivity: "15 min atrás",
    },
    {
      id: 5,
      name: "Duchess Creator",
      type: "YouTuber",
      platforms: ["YouTube"],
      status: "offline",
      viewers: "0",
      followers: "67K",
      avatar: "💎",
      lastActivity: "1 dia atrás",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-600/20 text-red-300 border-red-500/50"
      case "active":
        return "bg-green-600/20 text-green-300 border-green-500/50"
      default:
        return "bg-gray-600/20 text-gray-300 border-gray-500/50"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "live":
        return "AO VIVO"
      case "active":
        return "ATIVO"
      default:
        return "OFFLINE"
    }
  }

  const filteredMembers = members.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || member.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amber-100 font-serif">Cavaleiros do Reino</h1>
          <p className="text-amber-300/70">Gerencie todos os membros do Castle</p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700 text-amber-100">
          <Crown className="h-4 w-4 mr-2" />
          Adicionar Cavaleiro
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 h-4 w-4" />
                <Input
                  placeholder="Buscar cavaleiros..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700/50 border-amber-600/30 text-amber-100 placeholder:text-amber-300/50"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterType === "all" ? "secondary" : "outline"}
                onClick={() => setFilterType("all")}
                className="border-amber-600/30 text-amber-200"
              >
                Todos
              </Button>
              <Button
                variant={filterType === "Streamer" ? "secondary" : "outline"}
                onClick={() => setFilterType("Streamer")}
                className="border-amber-600/30 text-amber-200"
              >
                Streamers
              </Button>
              <Button
                variant={filterType === "YouTuber" ? "secondary" : "outline"}
                onClick={() => setFilterType("YouTuber")}
                className="border-amber-600/30 text-amber-200"
              >
                YouTubers
              </Button>
              <Button
                variant={filterType === "Influenciador" ? "secondary" : "outline"}
                onClick={() => setFilterType("Influenciador")}
                className="border-amber-600/30 text-amber-200"
              >
                Influenciadores
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <Card
            key={member.id}
            className="bg-slate-800/50 border-amber-600/20 backdrop-blur hover:border-amber-500/40 transition-all"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{member.avatar}</div>
                  <div>
                    <CardTitle className="text-amber-100 text-lg">{member.name}</CardTitle>
                    <Badge variant="outline" className="border-amber-600/30 text-amber-300 text-xs">
                      {member.type}
                    </Badge>
                  </div>
                </div>
                <Badge className={getStatusColor(member.status)}>
                  {member.status === "live" && (
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-1 animate-pulse"></div>
                  )}
                  {getStatusText(member.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Platforms */}
              <div>
                <p className="text-sm text-amber-300/70 mb-2">Plataformas:</p>
                <div className="flex flex-wrap gap-1">
                  {member.platforms.map((platform) => (
                    <Badge key={platform} variant="secondary" className="bg-slate-700/50 text-amber-200 text-xs">
                      {platform}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-2 bg-slate-700/30 rounded">
                  <p className="text-lg font-bold text-amber-100">{member.viewers}</p>
                  <p className="text-xs text-amber-300/70">Visualizando</p>
                </div>
                <div className="text-center p-2 bg-slate-700/30 rounded">
                  <p className="text-lg font-bold text-amber-100">{member.followers}</p>
                  <p className="text-xs text-amber-300/70">Seguidores</p>
                </div>
              </div>

              {/* Last Activity */}
              <div className="text-center">
                <p className="text-xs text-amber-300/70">Última atividade: {member.lastActivity}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-amber-600/30 text-amber-200 hover:bg-amber-600/10 bg-transparent"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Ver Perfil
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 border-amber-600/30 text-amber-200 hover:bg-amber-600/10 bg-transparent"
                >
                  <Zap className="h-3 w-3 mr-1" />
                  Notificar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
