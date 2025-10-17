"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Globe, CheckCircle, XCircle, Settings, ExternalLink, RefreshCw } from "lucide-react"

interface Integration {
  id: string
  name: string
  description: string
  icon: string
  status: "connected" | "disconnected" | "error"
  category: "streaming" | "social" | "analytics" | "other"
  config?: {
    clientId?: string
    apiKey?: string
    webhookUrl?: string
  }
  lastSync?: string
  features: string[]
}

export function IntegrationsManager() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "twitch",
      name: "Twitch",
      description: "Conecte com a API do Twitch para monitorar streams e estatísticas",
      icon: "🟣",
      status: "connected",
      category: "streaming",
      config: {
        clientId: "twitch_client_id_***",
        apiKey: "twitch_api_key_***",
      },
      lastSync: "2 minutos atrás",
      features: ["Status de Live", "Estatísticas de Viewers", "Notificações de Stream"],
    },
    {
      id: "youtube",
      name: "YouTube",
      description: "Integração com YouTube Data API para analytics e uploads",
      icon: "🔴",
      status: "connected",
      category: "streaming",
      config: {
        apiKey: "youtube_api_key_***",
      },
      lastSync: "15 minutos atrás",
      features: ["Analytics de Vídeos", "Estatísticas de Canal", "Comentários"],
    },
    {
      id: "instagram",
      name: "Instagram",
      description: "Conecte com Instagram Graph API",
      icon: "📸",
      status: "disconnected",
      category: "social",
      features: ["Posts", "Stories", "Insights"],
    },
    {
      id: "tiktok",
      name: "TikTok",
      description: "Integração com TikTok API",
      icon: "🎵",
      status: "disconnected",
      category: "social",
      features: ["Vídeos", "Analytics", "Trends"],
    },
    {
      id: "kick",
      name: "Kick",
      description: "Monitore streams no Kick",
      icon: "🟢",
      status: "connected",
      category: "streaming",
      config: {
        apiKey: "kick_api_key_***",
      },
      lastSync: "5 minutos atrás",
      features: ["Status de Live", "Viewers", "Chat"],
    },
    {
      id: "discord",
      name: "Discord",
      description: "Bot do Discord para notificações e comandos",
      icon: "💬",
      status: "connected",
      category: "other",
      config: {
        webhookUrl: "https://discord.com/api/webhooks/***",
      },
      lastSync: "1 minuto atrás",
      features: ["Notificações", "Comandos", "Webhooks"],
    },
    {
      id: "google-analytics",
      name: "Google Analytics",
      description: "Rastreamento avançado de analytics",
      icon: "📊",
      status: "disconnected",
      category: "analytics",
      features: ["Métricas", "Relatórios", "Dashboard"],
    },
    {
      id: "streamlabs",
      name: "Streamlabs",
      description: "Integração com Streamlabs para doações e alerts",
      icon: "💰",
      status: "disconnected",
      category: "other",
      features: ["Doações", "Alerts", "Merchandising"],
    },
  ])

  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = [
    { id: "all", label: "Todas", icon: "🌐" },
    { id: "streaming", label: "Streaming", icon: "🎥" },
    { id: "social", label: "Social", icon: "📱" },
    { id: "analytics", label: "Analytics", icon: "📊" },
    { id: "other", label: "Outras", icon: "🔧" },
  ]

  const getStatusBadge = (status: Integration["status"]) => {
    const badges = {
      connected: { class: "bg-green-600/20 text-green-300 border-green-500/50", icon: CheckCircle, text: "Conectado" },
      disconnected: { class: "bg-gray-600/20 text-gray-300 border-gray-500/50", icon: XCircle, text: "Desconectado" },
      error: { class: "bg-red-600/20 text-red-300 border-red-500/50", icon: XCircle, text: "Erro" },
    }
    return badges[status]
  }

  const filteredIntegrations = integrations.filter(
    (integration) => selectedCategory === "all" || integration.category === selectedCategory,
  )

  const connectedCount = integrations.filter((i) => i.status === "connected").length

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-amber-100 flex items-center">
                <Globe className="h-6 w-6 mr-2 text-amber-400" />
                Integrações Externas
              </h2>
              <p className="text-amber-300/70 mt-1">
                {connectedCount} de {integrations.length} integrações ativas
              </p>
            </div>
            <Button className="bg-amber-600 hover:bg-amber-700 text-amber-100">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sincronizar Todas
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "secondary" : "outline"}
            onClick={() => setSelectedCategory(category.id)}
            className={
              selectedCategory === category.id
                ? "bg-amber-600/20 border-amber-500/50 text-amber-100"
                : "border-amber-600/30 text-amber-200 hover:bg-amber-600/10 bg-transparent"
            }
          >
            <span className="mr-2">{category.icon}</span>
            {category.label}
          </Button>
        ))}
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredIntegrations.map((integration) => {
          const statusInfo = getStatusBadge(integration.status)
          const StatusIcon = statusInfo.icon

          return (
            <Card key={integration.id} className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{integration.icon}</div>
                    <div>
                      <CardTitle className="text-amber-100">{integration.name}</CardTitle>
                      <p className="text-sm text-amber-300/70 mt-1">{integration.description}</p>
                    </div>
                  </div>
                  <Badge className={statusInfo.class}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusInfo.text}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Features */}
                <div>
                  <p className="text-sm font-medium text-amber-200 mb-2">Recursos:</p>
                  <div className="flex flex-wrap gap-1">
                    {integration.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="bg-slate-700/50 text-amber-200 text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Config (if connected) */}
                {integration.status === "connected" && integration.config && (
                  <div className="p-3 bg-slate-700/30 rounded-lg border border-amber-600/10">
                    <p className="text-xs font-medium text-amber-200 mb-2">Configuração:</p>
                    <div className="space-y-1">
                      {Object.entries(integration.config).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-xs text-amber-300/70 capitalize">
                            {key.replace(/([A-Z])/g, " $1")}:
                          </span>
                          <code className="text-xs text-amber-200">{value}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Last Sync */}
                {integration.lastSync && (
                  <div className="text-center">
                    <p className="text-xs text-amber-300/70">Última sincronização: {integration.lastSync}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2 border-t border-amber-600/20">
                  {integration.status === "connected" ? (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-amber-600/30 text-amber-200 hover:bg-amber-600/10 bg-transparent"
                      >
                        <Settings className="h-3 w-3 mr-1" />
                        Configurar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-red-600/30 text-red-300 hover:bg-red-600/10 bg-transparent"
                      >
                        Desconectar
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" className="flex-1 bg-amber-600 hover:bg-amber-700 text-amber-100">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Conectar
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
