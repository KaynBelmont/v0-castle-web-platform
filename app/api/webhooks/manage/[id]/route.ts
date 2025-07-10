import { type NextRequest, NextResponse } from "next/server"

// Simulação de banco de dados (mesmo array do route principal)
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
]

// GET - Buscar webhook específico
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const webhook = webhooks.find((w) => w.id === params.id)

    if (!webhook) {
      return NextResponse.json({ success: false, message: "Webhook não encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      webhook: webhook,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Erro ao buscar webhook", error }, { status: 500 })
  }
}

// PUT - Atualizar webhook
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const webhookIndex = webhooks.findIndex((w) => w.id === params.id)

    if (webhookIndex === -1) {
      return NextResponse.json({ success: false, message: "Webhook não encontrado" }, { status: 404 })
    }

    webhooks[webhookIndex] = {
      ...webhooks[webhookIndex],
      name: body.name,
      url: body.url,
      description: body.description || "",
      events: body.events || [],
      active: body.active ?? true,
      secret: body.secret || "",
    }

    return NextResponse.json({
      success: true,
      message: "Webhook atualizado com sucesso",
      webhook: webhooks[webhookIndex],
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Erro ao atualizar webhook", error }, { status: 400 })
  }
}

// DELETE - Excluir webhook
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const webhookIndex = webhooks.findIndex((w) => w.id === params.id)

    if (webhookIndex === -1) {
      return NextResponse.json({ success: false, message: "Webhook não encontrado" }, { status: 404 })
    }

    const deletedWebhook = webhooks.splice(webhookIndex, 1)[0]

    return NextResponse.json({
      success: true,
      message: "Webhook excluído com sucesso",
      webhook: deletedWebhook,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Erro ao excluir webhook", error }, { status: 500 })
  }
}
