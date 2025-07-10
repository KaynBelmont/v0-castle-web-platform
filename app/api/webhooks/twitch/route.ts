import { type NextRequest, NextResponse } from "next/server"

// POST - Webhook específico para Twitch EventSub
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const headers = request.headers

    // Verificar se é um challenge do Twitch (primeira configuração)
    if (body.challenge) {
      return new Response(body.challenge, {
        status: 200,
        headers: { "Content-Type": "text/plain" },
      })
    }

    // Processar evento da Twitch
    const event = body.event
    const subscription = body.subscription

    let notification = null

    switch (subscription.type) {
      case "stream.online":
        notification = {
          title: `🔴 ${event.broadcaster_user_name} entrou ao vivo!`,
          message: `🎮 Categoria: ${event.category_name}\n📺 ${event.title}\n👥 Viewers: ${event.viewer_count || 0}`,
          recipients: ["all"],
        }
        break

      case "stream.offline":
        notification = {
          title: `⚫ ${event.broadcaster_user_name} terminou a live`,
          message: `📊 A transmissão foi encerrada.`,
          recipients: ["all"],
        }
        break

      case "channel.follow":
        notification = {
          title: `👑 Novo seguidor!`,
          message: `🎉 ${event.user_name} começou a seguir ${event.broadcaster_user_name}`,
          recipients: ["all"],
        }
        break
    }

    if (notification) {
      // Aqui você enviaria a notificação
      console.log("Twitch event:", notification)
    }

    return NextResponse.json({
      success: true,
      message: "Twitch webhook processado",
      event: subscription.type,
    })
  } catch (error) {
    return NextResponse.json({ success: false, message: "Erro no Twitch webhook", error }, { status: 500 })
  }
}
