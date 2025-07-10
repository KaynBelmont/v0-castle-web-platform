import { type NextRequest, NextResponse } from "next/server"

// POST - Endpoint para ser chamado por sistemas externos
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const webhookId = params.id

    // Buscar webhook configurado
    // Em produção, busque do banco de dados
    const webhook = {
      id: webhookId,
      name: "Test Webhook",
      events: ["external.trigger"],
      active: true,
    }

    if (!webhook || !webhook.active) {
      return NextResponse.json({ success: false, message: "Webhook não encontrado ou inativo" }, { status: 404 })
    }

    // Processar dados recebidos
    const processedData = {
      webhookId: webhookId,
      receivedData: body,
      timestamp: new Date().toISOString(),
      processed: true,
    }

    // Aqui você pode:
    // 1. Salvar os dados no banco
    // 2. Disparar notificações
    // 3. Atualizar estatísticas
    // 4. Executar ações baseadas nos dados

    console.log(`Webhook ${webhookId} triggered:`, processedData)

    return NextResponse.json({
      success: true,
      message: "Webhook processado com sucesso",
      data: processedData,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Erro ao processar webhook", error }, { status: 500 })
  }
}

// GET - Informações sobre o webhook
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return NextResponse.json({
    success: true,
    webhookId: params.id,
    message: "Webhook endpoint ativo",
    methods: ["POST"],
    timestamp: new Date().toISOString(),
  })
}
