import { type NextRequest, NextResponse } from "next/server"

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID
const TWITCH_ACCESS_TOKEN = process.env.TWITCH_ACCESS_TOKEN

// GET - Buscar informações de usuários
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const login = searchParams.get("login") // username
  const id = searchParams.get("id") // user ID

  try {
    let url = "https://api.twitch.tv/helix/users"
    const params = new URLSearchParams()

    if (login) params.append("login", login)
    if (id) params.append("id", id)

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
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao buscar usuários",
        error: error,
      },
      { status: 400 },
    )
  }
}
