"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Zap, Eye, Crown, MoreHorizontal, Plus } from "lucide-react"

type MemberStatus = "recruiting" | "onboarding" | "active" | "inactive"

interface Member {
  id: number
  name: string
  type: string
  platforms: string[]
  status: MemberStatus
  viewers: string
  followers: string
  avatar: string
  lastActivity: string
  email?: string
}

export function MembersSection() {
  const [searchTerm, setSearchTerm] = useState("")

  const columns: { id: MemberStatus; title: string; color: string }[] = [
    { id: "recruiting", title: "🎯 Recrutamento", color: "border-blue-600/30 bg-blue-950/20" },
    { id: "onboarding", title: "📋 Integração", color: "border-yellow-600/30 bg-yellow-950/20" },
    { id: "active", title: "⚔️ Ativos", color: "border-green-600/30 bg-green-950/20" },
    { id: "inactive", title: "💤 Inativos", color: "border-gray-600/30 bg-gray-950/20" },
  ]

  const allMembers: Member[] = [
    // Recrutamento
    {
      id: 1,
      name: "Knight Prospect",
      type: "Streamer",
      platforms: ["Twitch"],
      status: "recruiting",
      viewers: "0",
      followers: "5K",
      avatar: "🛡️",
      lastActivity: "Em negociação",
    },
    {
      id: 2,
      name: "Lady Potential",
      type: "YouTuber",
      platforms: ["YouTube"],
      status: "recruiting",
      viewers: "0",
      followers: "12K",
      avatar: "👑",
      lastActivity: "Aguardando resposta",
    },
    {
      id: 3,
      name: "Sir NewTalent",
      type: "Influenciador",
      platforms: ["Instagram", "TikTok"],
      status: "recruiting",
      viewers: "0",
      followers: "8K",
      avatar: "⭐",
      lastActivity: "Proposta enviada",
    },

    // Integração
    {
      id: 4,
      name: "Baron Newcomer",
      type: "Streamer",
      platforms: ["Twitch", "YouTube"],
      status: "onboarding",
      viewers: "0",
      followers: "15K",
      avatar: "🏰",
      lastActivity: "Configurando perfil",
    },
    {
      id: 5,
      name: "Duchess Fresh",
      type: "YouTuber",
      platforms: ["YouTube"],
      status: "onboarding",
      viewers: "0",
      followers: "22K",
      avatar: "💎",
      lastActivity: "Treinamento inicial",
    },
    {
      id: 6,
      name: "Knight Rookie",
      type: "Streamer",
      platforms: ["Kick"],
      status: "onboarding",
      viewers: "0",
      followers: "7K",
      avatar: "🗡️",
      lastActivity: "Documentação pendente",
    },

    // Ativos
    {
      id: 7,
      name: "Sir StreamKnight",
      type: "Streamer",
      platforms: ["Twitch", "YouTube"],
      status: "active",
      viewers: "2.1K",
      followers: "45K",
      avatar: "🛡️",
      lastActivity: "2 min atrás (LIVE)",
    },
    {
      id: 8,
      name: "Lady ContentQueen",
      type: "YouTuber",
      platforms: ["YouTube", "Instagram"],
      status: "active",
      viewers: "0",
      followers: "128K",
      avatar: "👑",
      lastActivity: "3 horas atrás",
    },
    {
      id: 9,
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
      id: 10,
      name: "Baron GameMaster",
      type: "Streamer",
      platforms: ["Kick", "Twitch"],
      status: "active",
      viewers: "856",
      followers: "32K",
      avatar: "🏰",
      lastActivity: "15 min atrás (LIVE)",
    },
    {
      id: 11,
      name: "Duchess Creator",
      type: "YouTuber",
      platforms: ["YouTube"],
      status: "active",
      viewers: "0",
      followers: "67K",
      avatar: "💎",
      lastActivity: "5 horas atrás",
    },
    {
      id: 12,
      name: "Sir Warrior",
      type: "Streamer",
      platforms: ["Twitch"],
      status: "active",
      viewers: "1.5K",
      followers: "54K",
      avatar: "⚔️",
      lastActivity: "30 min atrás (LIVE)",
    },

    // Inativos
    {
      id: 13,
      name: "Knight Sleeping",
      type: "Streamer",
      platforms: ["Twitch"],
      status: "inactive",
      viewers: "0",
      followers: "18K",
      avatar: "😴",
      lastActivity: "2 semanas atrás",
    },
    {
      id: 14,
      name: "Lady Absent",
      type: "YouTuber",
      platforms: ["YouTube"],
      status: "inactive",
      viewers: "0",
      followers: "34K",
      avatar: "💤",
      lastActivity: "1 mês atrás",
    },
    {
      id: 15,
      name: "Baron Pause",
      type: "Influenciador",
      platforms: ["Instagram"],
      status: "inactive",
      viewers: "0",
      followers: "25K",
      avatar: "⏸️",
      lastActivity: "3 semanas atrás",
    },
  ]

  const filteredMembers = allMembers.filter((member) => member.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const getMembersByStatus = (status: MemberStatus) => {
    return filteredMembers.filter((m) => m.status === status)
  }

  const getStatusBadge = (status: MemberStatus) => {
    const badges = {
      recruiting: "bg-blue-600/20 text-blue-300 border-blue-500/50",
      onboarding: "bg-yellow-600/20 text-yellow-300 border-yellow-500/50",
      active: "bg-green-600/20 text-green-300 border-green-500/50",
      inactive: "bg-gray-600/20 text-gray-300 border-gray-500/50",
    }
    return badges[status]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amber-100 font-serif">Cavaleiros do Reino</h1>
          <p className="text-amber-300/70">Gerencie todos os membros do Castle - Vista Kanban</p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700 text-amber-100">
          <Crown className="h-4 w-4 mr-2" />
          Adicionar Cavaleiro
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 h-4 w-4" />
            <Input
              placeholder="Buscar cavaleiros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-700/50 border-amber-600/30 text-amber-100 placeholder:text-amber-300/50"
            />
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {columns.map((column) => {
          const members = getMembersByStatus(column.id)
          return (
            <div key={column.id} className="flex flex-col h-full">
              <Card className={`${column.color} border backdrop-blur flex-1 flex flex-col`}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-amber-100 text-lg flex items-center">
                      {column.title}
                      <Badge variant="secondary" className="ml-2 bg-slate-700/50 text-amber-200">
                        {members.length}
                      </Badge>
                    </CardTitle>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-amber-300 hover:text-amber-100 hover:bg-amber-600/10"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 flex-1 overflow-y-auto max-h-[calc(100vh-280px)]">
                  {members.map((member) => (
                    <Card
                      key={member.id}
                      className="bg-slate-800/70 border-amber-600/20 hover:border-amber-500/40 transition-all cursor-pointer"
                    >
                      <CardContent className="p-4 space-y-3">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="text-2xl">{member.avatar}</div>
                            <div>
                              <p className="font-medium text-amber-100 text-sm">{member.name}</p>
                              <Badge variant="outline" className="border-amber-600/30 text-amber-300 text-xs mt-1">
                                {member.type}
                              </Badge>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-amber-300 hover:text-amber-100">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Platforms */}
                        <div className="flex flex-wrap gap-1">
                          {member.platforms.map((platform) => (
                            <Badge
                              key={platform}
                              variant="secondary"
                              className="bg-slate-700/50 text-amber-200 text-xs"
                            >
                              {platform}
                            </Badge>
                          ))}
                        </div>

                        {/* Stats */}
                        {column.id === "active" && (
                          <div className="grid grid-cols-2 gap-2">
                            <div className="text-center p-2 bg-slate-700/30 rounded">
                              <p className="text-sm font-bold text-amber-100">{member.viewers}</p>
                              <p className="text-xs text-amber-300/70">Viewers</p>
                            </div>
                            <div className="text-center p-2 bg-slate-700/30 rounded">
                              <p className="text-sm font-bold text-amber-100">{member.followers}</p>
                              <p className="text-xs text-amber-300/70">Seguidores</p>
                            </div>
                          </div>
                        )}

                        {/* Last Activity */}
                        <div className="text-center pt-2 border-t border-amber-600/20">
                          <p className="text-xs text-amber-300/70">{member.lastActivity}</p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-amber-600/30 text-amber-200 hover:bg-amber-600/10 bg-transparent text-xs h-8"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Ver
                          </Button>
                          {column.id === "active" && (
                            <Button
                              size="sm"
                              variant="outline"
                              className="flex-1 border-amber-600/30 text-amber-200 hover:bg-amber-600/10 bg-transparent text-xs h-8"
                            >
                              <Zap className="h-3 w-3 mr-1" />
                              Notificar
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {members.length === 0 && (
                    <div className="text-center py-8 text-amber-300/50 text-sm">Nenhum cavaleiro nesta etapa</div>
                  )}
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>
    </div>
  )
}
