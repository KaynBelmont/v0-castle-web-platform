import { type NextRequest, NextResponse } from "next/server"

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID
const TWITCH_ACCESS_TOKEN = process.env.TWITCH_ACCESS_TOKEN // Você precisa configurar isso

// GET - Buscar streams ao vivo
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const userLogin = searchParams.get("user_login") // username do streamer
  const userId = searchParams.get("user_id") // ID do usuário

  try {
    let url = "https://api.twitch.tv/helix/streams"
    const params = new URLSearchParams()

    if (userLogin) params.append("user_login", userLogin)
    if (userId) params.append("user_id", userId)

    if (params.toString()) {
      url += `?${params.toString()}`
    }

    const response = await fetch(url, {
      headers: {
        "Client-ID": TWITCH_CLIENT_ID!,
        Authorization: `Bearer ${TWITCH_ACCESS_TOKEN}`,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Erro na API da Twitch")
    }

    return NextResponse.json({
      success: true,
      data: data.data,
      pagination: data.pagination,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao buscar streams",
        error: error,
      },
      { status: 400 },
    )
  }
}
