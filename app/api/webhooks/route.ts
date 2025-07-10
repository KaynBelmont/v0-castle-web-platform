import { type NextRequest, NextResponse } from "next/server"

// POST - Webhook para receber dados de plataformas externas
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { searchParams } = new URL(request.url)
    const source = searchParams.get("source") // twitch, youtube, instagram, etc.

    console.log(`Webhook recebido de ${source}:`, body)

    // Aqui você processaria os dados recebidos
    // Por exemplo: atualizar status de live, novos seguidores, etc.

    switch (source) {
      case "twitch":
        // Processar dados do Twitch
        if (body.type === "stream.online") {
          // Atualizar status do membro para "live"
          console.log(`${body.broadcaster_user_name} entrou ao vivo`)
        }
        break

      case "youtube":
        // Processar dados do YouTube
        if (body.snippet) {
          console.log(`Novo vídeo publicado: ${body.snippet.title}`)
        }
        break

      case "instagram":
        // Processar dados do Instagram
        console.log("Novo post no Instagram")
        break
    }

    return NextResponse.json({
      success: true,
      message: "Webhook processado com sucesso",
      source: source,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao processar webhook",
        error: error,
      },
      { status: 400 },
    )
  }
}
