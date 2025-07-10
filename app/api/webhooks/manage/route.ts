import { type NextRequest, NextResponse } from "next/server"

// Simulação de banco de dados (em produção, use um banco real)
const webhooks: any[] = [
  {
    id: "1",
    name: "Discord Notifications",
    url: "https://discord.com/api/webhooks/123456789/abcdefghijk",
    description: "Enviar notificações para o Discord",
    events: ["member.live", "member.offline", "notification.sent"],
    active: true,
    secret: "discord_secret_123",
    lastTriggered: "2024-01-15T10:30:00Z",
    totalCalls: 45,
    lastStatus: "success",
  },
  {
    id: "2",
    name: "Slack Integration",
    url: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",
    description: "Integração com Slack para relatórios",
    events: ["analytics.daily", "milestone.reached"],
    active: false,
    secret: "slack_secret_456",
    lastTriggered: "2024-01-14T09:00:00Z",
    totalCalls: 12,
    lastStatus: "error",
  },
]

// GET - Listar todos os webhooks
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      webhooks: webhooks,
      total: webhooks.length,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Erro ao buscar webhooks", error }, { status: 500 })
  }
}

// POST - Criar novo webhook
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newWebhook = {
      id: Date.now().toString(),
      name: body.name,
      url: body.url,
      description: body.description || "",
      events: body.events || [],
      active: body.active ?? true,
      secret: body.secret || "",
      lastTriggered: null,
      totalCalls: 0,
      lastStatus: "pending",
    }

    webhooks.push(newWebhook)

    return NextResponse.json(
      {
        success: true,
        message: "Webhook criado com sucesso",
        webhook: newWebhook,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ success: false, message: "Erro ao criar webhook", error }, { status: 400 })
  }
}
