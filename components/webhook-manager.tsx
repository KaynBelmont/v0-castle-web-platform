"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Plus,
  Trash2,
  Edit,
  Copy,
  TestTube,
  CheckCircle,
  XCircle,
  Globe,
  Zap,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react"

interface Webhook {
  id: string
  name: string
  url: string
  events: string[]
  active: boolean
  secret?: string
  lastTriggered?: string
  totalCalls: number
  lastStatus: "success" | "error" | "pending"
  description?: string
}

export function WebhookManager() {
  const [webhooks, setWebhooks] = useState<Webhook[]>([])
  const [isAddingWebhook, setIsAddingWebhook] = useState(false)
  const [editingWebhook, setEditingWebhook] = useState<string | null>(null)
  const [testingWebhook, setTestingWebhook] = useState<string | null>(null)
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({})

  // Eventos disponíveis
  const availableEvents = [
    { id: "member.live", label: "Membro entrou ao vivo", description: "Quando um cavaleiro inicia uma transmissão" },
    { id: "member.offline", label: "Membro saiu do ar", description: "Quando um cavaleiro termina uma transmissão" },
    { id: "member.added", label: "Novo membro", description: "Quando um novo cavaleiro é adicionado" },
    { id: "member.removed", label: "Membro removido", description: "Quando um cavaleiro é removido" },
    { id: "notification.sent", label: "Notificação enviada", description: "Quando uma notificação é enviada" },
    { id: "analytics.daily", label: "Relatório diário", description: "Relatório diário de analytics" },
    { id: "milestone.reached", label: "Meta alcançada", description: "Quando uma meta é atingida" },
  ]

  // Carregar webhooks salvos
  useEffect(() => {
    loadWebhooks()
  }, [])

  const loadWebhooks = async () => {
    try {
      const response = await fetch("/api/webhooks/manage")
      if (response.ok) {
        const data = await response.json()
        setWebhooks(data.webhooks || [])
      }
    } catch (error) {
      console.error("Erro ao carregar webhooks:", error)
    }
  }

  const saveWebhook = async (webhook: Omit<Webhook, "id" | "totalCalls" | "lastStatus">) => {
    try {
      const method = editingWebhook ? "PUT" : "POST"
      const url = editingWebhook ? `/api/webhooks/manage/${editingWebhook}` : "/api/webhooks/manage"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhook),
      })

      if (response.ok) {
        await loadWebhooks()
        setIsAddingWebhook(false)
        setEditingWebhook(null)
      }
    } catch (error) {
      console.error("Erro ao salvar webhook:", error)
    }
  }

  const deleteWebhook = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este webhook?")) return

    try {
      const response = await fetch(`/api/webhooks/manage/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await loadWebhooks()
      }
    } catch (error) {
      console.error("Erro ao excluir webhook:", error)
    }
  }

  const testWebhook = async (webhook: Webhook) => {
    setTestingWebhook(webhook.id)

    try {
      const response = await fetch("/api/webhooks/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          webhookId: webhook.id,
          testData: {
            event: "test.webhook",
            message: "Este é um teste do webhook Castle",
            timestamp: new Date().toISOString(),
          },
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Atualizar status do webhook
        setWebhooks((prev) =>
          prev.map((w) =>
            w.id === webhook.id ? { ...w, lastStatus: "success", lastTriggered: new Date().toISOString() } : w,
          ),
        )
      } else {
        setWebhooks((prev) => prev.map((w) => (w.id === webhook.id ? { ...w, lastStatus: "error" } : w)))
      }
    } catch (error) {
      console.error("Erro ao testar webhook:", error)
      setWebhooks((prev) => prev.map((w) => (w.id === webhook.id ? { ...w, lastStatus: "error" } : w)))
    } finally {
      setTestingWebhook(null)
    }
  }

  const toggleWebhook = async (id: string, active: boolean) => {
    try {
      const response = await fetch(`/api/webhooks/manage/${id}/toggle`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active }),
      })

      if (response.ok) {
        setWebhooks((prev) => prev.map((w) => (w.id === id ? { ...w, active } : w)))
      }
    } catch (error) {
      console.error("Erro ao alterar status do webhook:", error)
    }
  }

  const copyWebhookUrl = (webhook: Webhook) => {
    const webhookUrl = `${window.location.origin}/api/webhooks/trigger/${webhook.id}`
    navigator.clipboard.writeText(webhookUrl)
    // Aqui você poderia mostrar uma notificação de sucesso
  }

  const toggleSecretVisibility = (webhookId: string) => {
    setShowSecrets((prev) => ({
      ...prev,
      [webhookId]: !prev[webhookId],
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-amber-100">Gerenciar Webhooks</h2>
          <p className="text-amber-300/70">Configure webhooks para integrar com sistemas externos</p>
        </div>
        <Button onClick={() => setIsAddingWebhook(true)} className="bg-amber-600 hover:bg-amber-700 text-amber-100">
          <Plus className="h-4 w-4 mr-2" />
          Novo Webhook
        </Button>
      </div>

      {/* Lista de Webhooks */}
      <div className="grid gap-4">
        {webhooks.map((webhook) => (
          <Card key={webhook.id} className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div>
                    <CardTitle className="text-amber-100 flex items-center">
                      <Globe className="h-4 w-4 mr-2" />
                      {webhook.name}
                    </CardTitle>
                    <p className="text-sm text-amber-300/70 mt-1">{webhook.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      className={
                        webhook.active
                          ? "bg-green-600/20 text-green-300 border-green-500/50"
                          : "bg-gray-600/20 text-gray-300 border-gray-500/50"
                      }
                    >
                      {webhook.active ? "Ativo" : "Inativo"}
                    </Badge>
                    <Badge
                      className={
                        webhook.lastStatus === "success"
                          ? "bg-green-600/20 text-green-300 border-green-500/50"
                          : webhook.lastStatus === "error"
                            ? "bg-red-600/20 text-red-300 border-red-500/50"
                            : "bg-yellow-600/20 text-yellow-300 border-yellow-500/50"
                      }
                    >
                      {webhook.lastStatus === "success" && <CheckCircle className="h-3 w-3 mr-1" />}
                      {webhook.lastStatus === "error" && <XCircle className="h-3 w-3 mr-1" />}
                      {webhook.lastStatus === "pending" && <AlertCircle className="h-3 w-3 mr-1" />}
                      {webhook.lastStatus || "Pendente"}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={webhook.active}
                    onCheckedChange={(checked) => toggleWebhook(webhook.id, checked)}
                    className="data-[state=checked]:bg-amber-600"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* URL do Webhook */}
              <div>
                <label className="text-sm font-medium text-amber-200 mb-2 block">URL do Webhook</label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={webhook.url}
                    readOnly
                    className="bg-slate-700/50 border-amber-600/30 text-amber-100 font-mono text-sm"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyWebhookUrl(webhook)}
                    className="border-amber-600/30 text-amber-200 hover:bg-amber-600/10"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* URL de Trigger */}
              <div>
                <label className="text-sm font-medium text-amber-200 mb-2 block">
                  URL de Trigger (Para usar em sistemas externos)
                </label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={`${typeof window !== "undefined" ? window.location.origin : ""}/api/webhooks/trigger/${webhook.id}`}
                    readOnly
                    className="bg-slate-700/50 border-amber-600/30 text-amber-100 font-mono text-sm"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyWebhookUrl(webhook)}
                    className="border-amber-600/30 text-amber-200 hover:bg-amber-600/10"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Secret */}
              {webhook.secret && (
                <div>
                  <label className="text-sm font-medium text-amber-200 mb-2 block">Secret</label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type={showSecrets[webhook.id] ? "text" : "password"}
                      value={webhook.secret}
                      readOnly
                      className="bg-slate-700/50 border-amber-600/30 text-amber-100 font-mono text-sm"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleSecretVisibility(webhook.id)}
                      className="border-amber-600/30 text-amber-200 hover:bg-amber-600/10"
                    >
                      {showSecrets[webhook.id] ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                    </Button>
                  </div>
                </div>
              )}

              {/* Eventos */}
              <div>
                <label className="text-sm font-medium text-amber-200 mb-2 block">Eventos Configurados</label>
                <div className="flex flex-wrap gap-1">
                  {webhook.events.map((event) => {
                    const eventInfo = availableEvents.find((e) => e.id === event)
                    return (
                      <Badge key={event} variant="secondary" className="bg-slate-700/50 text-amber-200 text-xs">
                        {eventInfo?.label || event}
                      </Badge>
                    )
                  })}
                </div>
              </div>

              {/* Estatísticas */}
              <div className="grid grid-cols-3 gap-4 pt-2 border-t border-amber-600/20">
                <div className="text-center">
                  <p className="text-lg font-bold text-amber-100">{webhook.totalCalls}</p>
                  <p className="text-xs text-amber-300/70">Total de Chamadas</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-amber-100">
                    {webhook.lastTriggered ? new Date(webhook.lastTriggered).toLocaleDateString("pt-BR") : "Nunca"}
                  </p>
                  <p className="text-xs text-amber-300/70">Último Trigger</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-amber-100">{webhook.active ? "Ativo" : "Inativo"}</p>
                  <p className="text-xs text-amber-300/70">Status</p>
                </div>
              </div>

              {/* Ações */}
              <div className="flex items-center justify-between pt-2 border-t border-amber-600/20">
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => testWebhook(webhook)}
                    disabled={testingWebhook === webhook.id}
                    className="border-amber-600/30 text-amber-200 hover:bg-amber-600/10"
                  >
                    <TestTube className="h-3 w-3 mr-1" />
                    {testingWebhook === webhook.id ? "Testando..." : "Testar"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingWebhook(webhook.id)}
                    className="border-amber-600/30 text-amber-200 hover:bg-amber-600/10"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Editar
                  </Button>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deleteWebhook(webhook.id)}
                  className="border-red-600/30 text-red-300 hover:bg-red-600/10"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {webhooks.length === 0 && (
          <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
            <CardContent className="text-center py-12">
              <Zap className="h-12 w-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-amber-100 mb-2">Nenhum webhook configurado</h3>
              <p className="text-amber-300/70 mb-4">
                Crie seu primeiro webhook para começar a integrar com sistemas externos
              </p>
              <Button
                onClick={() => setIsAddingWebhook(true)}
                className="bg-amber-600 hover:bg-amber-700 text-amber-100"
              >
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeiro Webhook
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal/Form para Adicionar/Editar Webhook */}
      {(isAddingWebhook || editingWebhook) && (
        <WebhookForm
          webhook={editingWebhook ? webhooks.find((w) => w.id === editingWebhook) : undefined}
          availableEvents={availableEvents}
          onSave={saveWebhook}
          onCancel={() => {
            setIsAddingWebhook(false)
            setEditingWebhook(null)
          }}
        />
      )}
    </div>
  )
}

// Componente do formulário
interface WebhookFormProps {
  webhook?: Webhook
  availableEvents: Array<{ id: string; label: string; description: string }>
  onSave: (webhook: Omit<Webhook, "id" | "totalCalls" | "lastStatus">) => void
  onCancel: () => void
}

function WebhookForm({ webhook, availableEvents, onSave, onCancel }: WebhookFormProps) {
  const [formData, setFormData] = useState({
    name: webhook?.name || "",
    url: webhook?.url || "",
    description: webhook?.description || "",
    events: webhook?.events || [],
    active: webhook?.active ?? true,
    secret: webhook?.secret || "",
  })

  const handleEventToggle = (eventId: string) => {
    setFormData((prev) => ({
      ...prev,
      events: prev.events.includes(eventId) ? prev.events.filter((e) => e !== eventId) : [...prev.events, eventId],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.url || formData.events.length === 0) {
      alert("Preencha todos os campos obrigatórios")
      return
    }
    onSave(formData)
  }

  const generateSecret = () => {
    const secret = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    setFormData((prev) => ({ ...prev, secret }))
  }

  return (
    <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
      <CardHeader>
        <CardTitle className="text-amber-100">{webhook ? "Editar Webhook" : "Novo Webhook"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div>
            <label className="text-sm font-medium text-amber-200 mb-2 block">Nome do Webhook *</label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Ex: Discord Notifications"
              className="bg-slate-700/50 border-amber-600/30 text-amber-100"
              required
            />
          </div>

          {/* URL */}
          <div>
            <label className="text-sm font-medium text-amber-200 mb-2 block">URL de Destino *</label>
            <Input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData((prev) => ({ ...prev, url: e.target.value }))}
              placeholder="https://discord.com/api/webhooks/..."
              className="bg-slate-700/50 border-amber-600/30 text-amber-100"
              required
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="text-sm font-medium text-amber-200 mb-2 block">Descrição</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Descreva o propósito deste webhook..."
              className="bg-slate-700/50 border-amber-600/30 text-amber-100"
              rows={3}
            />
          </div>

          {/* Secret */}
          <div>
            <label className="text-sm font-medium text-amber-200 mb-2 block">Secret (Opcional)</label>
            <div className="flex items-center space-x-2">
              <Input
                value={formData.secret}
                onChange={(e) => setFormData((prev) => ({ ...prev, secret: e.target.value }))}
                placeholder="Secret para validação"
                className="bg-slate-700/50 border-amber-600/30 text-amber-100"
              />
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={generateSecret}
                className="border-amber-600/30 text-amber-200 hover:bg-amber-600/10 bg-transparent"
              >
                Gerar
              </Button>
            </div>
          </div>

          {/* Eventos */}
          <div>
            <label className="text-sm font-medium text-amber-200 mb-2 block">Eventos para Escutar *</label>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {availableEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-3 p-2 bg-slate-700/30 rounded">
                  <input
                    type="checkbox"
                    id={event.id}
                    checked={formData.events.includes(event.id)}
                    onChange={() => handleEventToggle(event.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label htmlFor={event.id} className="text-sm font-medium text-amber-100 cursor-pointer">
                      {event.label}
                    </label>
                    <p className="text-xs text-amber-300/70">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ativo */}
          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.active}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, active: checked }))}
              className="data-[state=checked]:bg-amber-600"
            />
            <label className="text-sm font-medium text-amber-200">Webhook ativo</label>
          </div>

          {/* Botões */}
          <div className="flex items-center justify-end space-x-2 pt-4 border-t border-amber-600/20">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-amber-600/30 text-amber-200 hover:bg-amber-600/10 bg-transparent"
            >
              Cancelar
            </Button>
            <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-amber-100">
              {webhook ? "Atualizar" : "Criar"} Webhook
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
