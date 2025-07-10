import { type NextRequest, NextResponse } from "next/server"

// POST - Testar webhook
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { webhookId, testData } = body

    // Buscar webhook (simulação)
    // Em produção, busque do banco de dados
    const webhook = {
      id: webhookId,
      url: "https://discord.com/api/webhooks/test",
      secret: "test_secret",
    }

    if (!webhook) {
      return NextResponse.json({ success: false, message: "Webhook não encontrado" }, { status: 404 })
    }

    // Preparar dados de teste
    const testPayload = {
      event: "test.webhook",
      data: testData,
      timestamp: new Date().toISOString(),
      source: "castle-platform",
    }

    // Tentar enviar para o webhook
    try {
      const response = await fetch(webhook.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(webhook.secret && { "X-Castle-Signature": webhook.secret }),
        },
        body: JSON.stringify(testPayload),
      })

      const success = response.ok

      return NextResponse.json({
        success: success,
        message: success ? "Webhook testado com sucesso!" : "Falha no teste do webhook",
        status: response.status,
        response: success ? "OK" : await response.text(),
      })
    } catch (fetchError) {
      return NextResponse.json({
        success: false,
        message: "Erro ao conectar com o webhook",
        error: fetchError instanceof Error ? fetchError.message : "Unknown error",
      })
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Erro ao testar webhook", error }, { status: 500 })
  }
}
