import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Crown, Shield, Bell, Database, Globe, Lock } from "lucide-react"
import { WebhookManager } from "./webhook-manager"

export function SettingsSection() {
  const settingsCategories = [
    {
      title: "Configurações do Reino",
      icon: Crown,
      items: [
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
      ],
    },
    {
      title: "Notificações",
      icon: Bell,
      items: [
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
      ],
    },
    {
      title: "Segurança",
      icon: Shield,
      items: [
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
      ],
    },
    {
      title: "Integrações",
      icon: Globe,
      items: [
        {
          label: "API do Twitch",
          description: "Conectar com a API do Twitch",
          type: "integration",
          status: "connected",
        },
        {
          label: "API do YouTube",
          description: "Conectar com a API do YouTube",
          type: "integration",
          status: "connected",
        },
        {
          label: "API do Instagram",
          description: "Conectar com a API do Instagram",
          type: "integration",
          status: "disconnected",
        },
      ],
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

      {/* Webhooks Section */}
      <WebhookManager />

      {/* Settings Categories */}
      <div className="space-y-6">
        {settingsCategories.map((category, categoryIndex) => {
          const CategoryIcon = category.icon
          return (
            <Card key={categoryIndex} className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-amber-100 flex items-center">
                  <CategoryIcon className="h-5 w-5 mr-2 text-amber-400" />
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-amber-600/10"
                  >
                    <div className="flex-1">
                      <h3 className="font-medium text-amber-100 mb-1">{item.label}</h3>
                      <p className="text-sm text-amber-300/70">{item.description}</p>
                    </div>

                    <div className="ml-4">
                      {item.type === "input" && (
                        <Input
                          defaultValue={item.value as string}
                          placeholder={item.placeholder}
                          className="w-48 bg-slate-600/50 border-amber-600/30 text-amber-100"
                        />
                      )}

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

                      {item.type === "integration" && (
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={
                              item.status === "connected"
                                ? "bg-green-600/20 text-green-300 border-green-500/50"
                                : "bg-red-600/20 text-red-300 border-red-500/50"
                            }
                          >
                            {item.status === "connected" ? "Conectado" : "Desconectado"}
                          </Badge>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-amber-600/30 text-amber-200 hover:bg-amber-600/10 bg-transparent"
                          >
                            {item.status === "connected" ? "Reconfigurar" : "Conectar"}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )
        })}
      </div>

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
    </div>
  )
}
