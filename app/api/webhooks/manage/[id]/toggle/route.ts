import { type NextRequest, NextResponse } from "next/server"

// Simulação de banco de dados
const webhooks: any[] = []

// PATCH - Alternar status ativo/inativo do webhook
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const webhookIndex = webhooks.findIndex((w) => w.id === params.id)

    if (webhookIndex === -1) {
      return NextResponse.json({ success: false, message: "Webhook não encontrado" }, { status: 404 })
    }

    webhooks[webhookIndex].active = body.active

    return NextResponse.json({
      success: true,
      message: `Webhook ${body.active ? "ativado" : "desativado"} com sucesso`,
      webhook: webhooks[webhookIndex],
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Erro ao alterar status do webhook", error }, { status: 400 })
  }
}
