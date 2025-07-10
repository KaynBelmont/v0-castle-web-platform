"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Bell, Send, Users, User, MessageSquare, Clock, Check, AlertCircle, Crown, Scroll } from "lucide-react"

export function NotificationsSection() {
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([])
  const [message, setMessage] = useState("")
  const [title, setTitle] = useState("")

  const recentNotifications = [
    {
      id: 1,
      title: "Reunião do Reino",
      message: "Reunião geral marcada para amanhã às 20h",
      recipients: "Todos os cavaleiros",
      timestamp: "2 horas atrás",
      status: "sent",
      readCount: 28,
    },
    {
      id: 2,
      title: "Nova Campanha",
      message: "Lançamento da campanha de inverno começando na próxima semana",
      recipients: "Streamers",
      timestamp: "1 dia atrás",
      status: "sent",
      readCount: 15,
    },
    {
      id: 3,
      title: "Atualização de Diretrizes",
      message: "Novas diretrizes de conteúdo foram atualizadas",
      recipients: "YouTubers",
      timestamp: "3 dias atrás",
      status: "sent",
      readCount: 10,
    },
  ]

  const recipientGroups = [
    { id: "all", label: "Todos os Cavaleiros", count: 30, icon: Users },
    { id: "streamers", label: "Streamers", count: 15, icon: User },
    { id: "youtubers", label: "YouTubers", count: 10, icon: User },
    { id: "influencers", label: "Influenciadores", count: 5, icon: User },
  ]

  const toggleRecipient = (id: string) => {
    setSelectedRecipients((prev) => (prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]))
  }

  const handleSendNotification = () => {
    if (title && message && selectedRecipients.length > 0) {
      // Aqui você implementaria a lógica de envio
      console.log("Enviando notificação:", { title, message, recipients: selectedRecipients })
      // Reset form
      setTitle("")
      setMessage("")
      setSelectedRecipients([])
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amber-100 font-serif">Mensageiro Real</h1>
          <p className="text-amber-300/70">Envie comunicados para os cavaleiros do reino</p>
        </div>
        <Badge className="bg-amber-600/20 text-amber-300 border-amber-500/50">
          <Bell className="h-3 w-3 mr-1" />3 não lidas
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Send Notification */}
        <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-amber-100 flex items-center">
              <Scroll className="h-5 w-5 mr-2 text-amber-400" />
              Enviar Comunicado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Title */}
            <div>
              <label className="text-sm font-medium text-amber-200 mb-2 block">Título do Comunicado</label>
              <Input
                placeholder="Ex: Reunião do Reino, Nova Campanha..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-slate-700/50 border-amber-600/30 text-amber-100 placeholder:text-amber-300/50"
              />
            </div>

            {/* Recipients */}
            <div>
              <label className="text-sm font-medium text-amber-200 mb-2 block">Destinatários</label>
              <div className="grid grid-cols-2 gap-2">
                {recipientGroups.map((group) => {
                  const Icon = group.icon
                  const isSelected = selectedRecipients.includes(group.id)
                  return (
                    <Button
                      key={group.id}
                      variant={isSelected ? "secondary" : "outline"}
                      onClick={() => toggleRecipient(group.id)}
                      className={`justify-start text-left h-auto p-3 ${
                        isSelected
                          ? "bg-amber-600/20 border-amber-500/50 text-amber-100"
                          : "border-amber-600/30 text-amber-200 hover:bg-amber-600/10"
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      <div>
                        <p className="font-medium">{group.label}</p>
                        <p className="text-xs opacity-70">{group.count} membros</p>
                      </div>
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-sm font-medium text-amber-200 mb-2 block">Mensagem</label>
              <Textarea
                placeholder="Digite sua mensagem aqui..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="bg-slate-700/50 border-amber-600/30 text-amber-100 placeholder:text-amber-300/50"
              />
            </div>

            {/* Send Button */}
            <Button
              onClick={handleSendNotification}
              disabled={!title || !message || selectedRecipients.length === 0}
              className="w-full bg-amber-600 hover:bg-amber-700 text-amber-100 disabled:opacity-50"
            >
              <Send className="h-4 w-4 mr-2" />
              Enviar Comunicado
            </Button>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-amber-100 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-amber-400" />
              Comunicados Recentes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentNotifications.map((notification) => (
              <div key={notification.id} className="p-4 bg-slate-700/30 rounded-lg border border-amber-600/10">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-amber-100">{notification.title}</h3>
                  <Badge className="bg-green-600/20 text-green-300 border-green-500/50">
                    <Check className="h-3 w-3 mr-1" />
                    Enviado
                  </Badge>
                </div>

                <p className="text-sm text-amber-200/80 mb-3">{notification.message}</p>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-4">
                    <span className="text-amber-300/70">Para: {notification.recipients}</span>
                    <span className="text-amber-300/70">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {notification.timestamp}
                    </span>
                  </div>
                  <span className="text-amber-300/70">{notification.readCount} leram</span>
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
            <Crown className="h-5 w-5 mr-2 text-amber-400" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="border-amber-600/30 text-amber-200 hover:bg-amber-600/10 h-auto p-4 bg-transparent"
            >
              <div className="text-center">
                <Users className="h-6 w-6 mx-auto mb-2" />
                <p className="font-medium">Reunião Geral</p>
                <p className="text-xs opacity-70">Convocar todos os cavaleiros</p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="border-amber-600/30 text-amber-200 hover:bg-amber-600/10 h-auto p-4 bg-transparent"
            >
              <div className="text-center">
                <AlertCircle className="h-6 w-6 mx-auto mb-2" />
                <p className="font-medium">Aviso Urgente</p>
                <p className="text-xs opacity-70">Comunicado de alta prioridade</p>
              </div>
            </Button>

            <Button
              variant="outline"
              className="border-amber-600/30 text-amber-200 hover:bg-amber-600/10 h-auto p-4 bg-transparent"
            >
              <div className="text-center">
                <Bell className="h-6 w-6 mx-auto mb-2" />
                <p className="font-medium">Lembrete</p>
                <p className="text-xs opacity-70">Agendar lembrete futuro</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
