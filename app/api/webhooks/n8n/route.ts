import { type NextRequest, NextResponse } from "next/server"

// POST - Receber dados do n8n
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { searchParams } = new URL(request.url)

    // Parâmetros opcionais
    const source = searchParams.get("source") // n8n, zapier, etc.
    const type = searchParams.get("type") // notification, update, etc.
    const secret = searchParams.get("secret") // para validação

    // Validação básica de segurança (opcional)
    const expectedSecret = process.env.WEBHOOK_SECRET
    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    console.log(`Webhook recebido de ${source}:`, body)

    // Processar diferentes tipos de webhook
    let result = {}

    switch (type) {
      case "notification":
        // Enviar notificação
        result = await processNotificationWebhook(body)
        break

      case "member_update":
        // Atualizar membro
        result = await processMemberUpdateWebhook(body)
        break

      case "analytics":
        // Processar dados de analytics
        result = await processAnalyticsWebhook(body)
        break

      default:
        // Webhook genérico
        result = await processGenericWebhook(body)
    }

    return NextResponse.json({
      success: true,
      message: "Webhook processado com sucesso",
      data: result,
      timestamp: new Date().toISOString(),
      source: source || "unknown",
      type: type || "generic",
    })
  } catch (error) {
    console.error("Erro no webhook:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao processar webhook",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// GET - Verificar se webhook está funcionando
export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: "Webhook Castle está funcionando!",
    timestamp: new Date().toISOString(),
    endpoints: {
      notification: "/api/webhooks/n8n?type=notification",
      member_update: "/api/webhooks/n8n?type=member_update",
      analytics: "/api/webhooks/n8n?type=analytics",
      generic: "/api/webhooks/n8n",
    },
  })
}

// Funções auxiliares
async function processNotificationWebhook(data: any) {
  // Processar notificação recebida via webhook
  const notification = {
    title: data.title || "Notificação via Webhook",
    message: data.message || "Mensagem recebida via webhook",
    recipients: data.recipients || ["all"],
    source: "webhook",
  }

  // Aqui você salvaria no banco ou processaria a notificação
  console.log("Processando notificação:", notification)

  return { notification, processed: true }
}

async function processMemberUpdateWebhook(data: any) {
  // Processar atualização de membro
  const update = {
    memberId: data.memberId,
    updates: data.updates || {},
    timestamp: new Date().toISOString(),
  }

  // Aqui você atualizaria o membro no banco
  console.log("Atualizando membro:", update)

  return { update, processed: true }
}

async function processAnalyticsWebhook(data: any) {
  // Processar dados de analytics
  const analytics = {
    metrics: data.metrics || {},
    timestamp: new Date().toISOString(),
    source: data.source || "external",
  }

  // Aqui você salvaria os dados de analytics
  console.log("Processando analytics:", analytics)

  return { analytics, processed: true }
}

async function processGenericWebhook(data: any) {
  // Processar webhook genérico
  return {
    receivedData: data,
    processed: true,
    timestamp: new Date().toISOString(),
  }
}
