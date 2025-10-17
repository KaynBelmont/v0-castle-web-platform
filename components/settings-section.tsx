"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Crown, Shield, Bell, Database, Globe, Lock, Zap, Key } from "lucide-react"
import { WebhookManager } from "./webhook-manager"
import { IntegrationsManager } from "./integrations-manager"

export function SettingsSection() {
  const generalSettings = [
    {
      label: "Nome do Reino",
      description: "Nome exibido na plataforma",
      type: "input",
      value: "Castle",
      placeholder: "Digite o nome do reino",
    },
    {
      label: "Descrição",
      description: "Descrição do seu time de criadores",
      type: "input",
      value: "Reino dos Criadores de Conteúdo",
      placeholder: "Digite a descrição",
    },
    {
      label: "Limite de Membros",
      description: "Número máximo de cavaleiros",
      type: "input",
      value: "50",
      placeholder: "50",
    },
  ]

  const notificationSettings = [
    {
      label: "Notificações de Live",
      description: "Receber alertas quando membros entrarem ao vivo",
      type: "switch",
      value: true,
    },
    {
      label: "Relatórios Diários",
      description: "Receber resumo diário por email",
      type: "switch",
      value: true,
    },
    {
      label: "Alertas de Desempenho",
      description: "Notificar sobre mudanças significativas nas métricas",
      type: "switch",
      value: false,
    },
  ]

  const securitySettings = [
    {
      label: "Autenticação de Dois Fatores",
      description: "Adicionar camada extra de segurança",
      type: "switch",
      value: false,
    },
    {
      label: "Sessões Ativas",
      description: "Gerenciar dispositivos conectados",
      type: "button",
      buttonText: "Gerenciar Sessões",
    },
    {
      label: "Logs de Atividade",
      description: "Visualizar histórico de ações",
      type: "button",
      buttonText: "Ver Logs",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amber-100 font-serif">Configurações do Reino</h1>
          <p className="text-amber-300/70">Gerencie as configurações da plataforma Castle</p>
        </div>
        <Button className="bg-amber-600 hover:bg-amber-700 text-amber-100">
          <Database className="h-4 w-4 mr-2" />
          Backup
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-slate-800/50 border border-amber-600/20">
          <TabsTrigger
            value="general"
            className="data-[state=active]:bg-amber-600/20 data-[state=active]:text-amber-100"
          >
            <Crown className="h-4 w-4 mr-2" />
            Geral
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-amber-600/20 data-[state=active]:text-amber-100"
          >
            <Bell className="h-4 w-4 mr-2" />
            Notificações
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-amber-600/20 data-[state=active]:text-amber-100"
          >
            <Shield className="h-4 w-4 mr-2" />
            Segurança
          </TabsTrigger>
          <TabsTrigger
            value="integrations"
            className="data-[state=active]:bg-amber-600/20 data-[state=active]:text-amber-100"
          >
            <Globe className="h-4 w-4 mr-2" />
            Integrações
          </TabsTrigger>
          <TabsTrigger
            value="webhooks"
            className="data-[state=active]:bg-amber-600/20 data-[state=active]:text-amber-100"
          >
            <Zap className="h-4 w-4 mr-2" />
            Webhooks
          </TabsTrigger>
          <TabsTrigger value="api" className="data-[state=active]:bg-amber-600/20 data-[state=active]:text-amber-100">
            <Key className="h-4 w-4 mr-2" />
            API
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-amber-100 flex items-center">
                <Crown className="h-5 w-5 mr-2 text-amber-400" />
                Configurações Gerais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {generalSettings.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-amber-600/10"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-amber-100 mb-1">{item.label}</h3>
                    <p className="text-sm text-amber-300/70">{item.description}</p>
                  </div>
                  <div className="ml-4">
                    <Input
                      defaultValue={item.value}
                      placeholder={item.placeholder}
                      className="w-48 bg-slate-600/50 border-amber-600/30 text-amber-100"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-amber-100 flex items-center">
                <Bell className="h-5 w-5 mr-2 text-amber-400" />
                Configurações de Notificações
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {notificationSettings.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-amber-600/10"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-amber-100 mb-1">{item.label}</h3>
                    <p className="text-sm text-amber-300/70">{item.description}</p>
                  </div>
                  <div className="ml-4">
                    <Switch defaultChecked={item.value} className="data-[state=checked]:bg-amber-600" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-6">
          <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-amber-100 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-amber-400" />
                Configurações de Segurança
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {securitySettings.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-amber-600/10"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-amber-100 mb-1">{item.label}</h3>
                    <p className="text-sm text-amber-300/70">{item.description}</p>
                  </div>
                  <div className="ml-4">
                    {item.type === "switch" && (
                      <Switch defaultChecked={item.value as boolean} className="data-[state=checked]:bg-amber-600" />
                    )}
                    {item.type === "button" && (
                      <Button
                        variant="outline"
                        className="border-amber-600/30 text-amber-200 hover:bg-amber-600/10 bg-transparent"
                      >
                        {item.buttonText}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="bg-red-900/20 border-red-600/30 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-red-300 flex items-center">
                <Lock className="h-5 w-5 mr-2" />
                Zona de Perigo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-800/20 rounded-lg border border-red-600/20">
                <div>
                  <h3 className="font-medium text-red-200 mb-1">Resetar Dados</h3>
                  <p className="text-sm text-red-300/70">Remove todos os dados de analytics e relatórios</p>
                </div>
                <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                  Resetar
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-800/20 rounded-lg border border-red-600/20">
                <div>
                  <h3 className="font-medium text-red-200 mb-1">Excluir Reino</h3>
                  <p className="text-sm text-red-300/70">Ação irreversível - remove permanentemente todos os dados</p>
                </div>
                <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations">
          <IntegrationsManager />
        </TabsContent>

        {/* Webhooks */}
        <TabsContent value="webhooks">
          <WebhookManager />
        </TabsContent>

        {/* API Keys */}
        <TabsContent value="api">
          <APIKeysManager />
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Componente de Gerenciamento de API Keys
function APIKeysManager() {
  const [apiKeys, setApiKeys] = useState([
    {
      id: "1",
      name: "Production API Key",
      key: "castle_prod_1234567890abcdef",
      created: "2024-01-15",
      lastUsed: "2 horas atrás",
      active: true,
    },
    {
      id: "2",
      name: "Development API Key",
      key: "castle_dev_abcdef1234567890",
      created: "2024-01-10",
      lastUsed: "1 dia atrás",
      active: true,
    },
  ])

  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({})

  const toggleKeyVisibility = (id: string) => {
    setShowKeys((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-amber-100 flex items-center">
              <Key className="h-5 w-5 mr-2 text-amber-400" />
              API Keys
            </CardTitle>
            <Button className="bg-amber-600 hover:bg-amber-700 text-amber-100">
              <Key className="h-4 w-4 mr-2" />
              Gerar Nova Key
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {apiKeys.map((key) => (
            <div key={key.id} className="p-4 bg-slate-700/30 rounded-lg border border-amber-600/10 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-amber-100">{key.name}</h3>
                  <p className="text-xs text-amber-300/70 mt-1">Criada em {key.created}</p>
                </div>
                <Badge
                  className={
                    key.active
                      ? "bg-green-600/20 text-green-300 border-green-500/50"
                      : "bg-gray-600/20 text-gray-300 border-gray-500/50"
                  }
                >
                  {key.active ? "Ativa" : "Inativa"}
                </Badge>
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  type={showKeys[key.id] ? "text" : "password"}
                  value={key.key}
                  readOnly
                  className="bg-slate-600/50 border-amber-600/30 text-amber-100 font-mono text-sm"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleKeyVisibility(key.id)}
                  className="border-amber-600/30 text-amber-200 hover:bg-amber-600/10"
                >
                  {showKeys[key.id] ? "Ocultar" : "Mostrar"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-amber-600/30 text-amber-200 hover:bg-amber-600/10 bg-transparent"
                >
                  Copiar
                </Button>
              </div>

              <div className="flex items-center justify-between text-xs text-amber-300/70">
                <span>Último uso: {key.lastUsed}</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-red-600/30 text-red-300 hover:bg-red-600/10 bg-transparent"
                >
                  Revogar
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-amber-100">Documentação da API</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-slate-700/30 rounded-lg border border-amber-600/10">
            <h3 className="font-medium text-amber-100 mb-2">Base URL</h3>
            <code className="text-sm text-amber-200 bg-slate-600/50 px-3 py-2 rounded block">
              https://api.castle.vercel.app/v1
            </code>
          </div>

          <div className="p-4 bg-slate-700/30 rounded-lg border border-amber-600/10">
            <h3 className="font-medium text-amber-100 mb-2">Autenticação</h3>
            <p className="text-sm text-amber-300/70 mb-2">Inclua sua API key no header de todas as requisições:</p>
            <code className="text-sm text-amber-200 bg-slate-600/50 px-3 py-2 rounded block">
              Authorization: Bearer YOUR_API_KEY
            </code>
          </div>

          <Button
            variant="outline"
            className="w-full border-amber-600/30 text-amber-200 hover:bg-amber-600/10 bg-transparent"
          >
            Ver Documentação Completa
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
