import { type NextRequest, NextResponse } from "next/server"

// POST - Webhook específico para Discord
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Processar dados do Discord
    const discordData = {
      user: body.user,
      message: body.message,
      channel: body.channel,
      timestamp: new Date().toISOString(),
    }

    // Enviar notificação para Castle
    const notification = {
      title: `💬 Nova mensagem Discord`,
      message: `👤 ${discordData.user}: ${discordData.message}`,
      recipients: ["all"],
    }

    // Aqui você processaria a notificação
    console.log("Discord webhook:", discordData)

    return NextResponse.json({
      success: true,
      message: "Discord webhook processado",
      data: discordData,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Erro no Discord webhook", error }, { status: 500 })
  }
}
