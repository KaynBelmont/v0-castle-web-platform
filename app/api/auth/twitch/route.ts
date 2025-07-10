import { type NextRequest, NextResponse } from "next/server"

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID
const TWITCH_CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET
const REDIRECT_URI = process.env.NEXT_PUBLIC_URL + "/api/auth/twitch"

// GET - Iniciar OAuth flow
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")

  if (!code) {
    // Redirecionar para autorização
    const authUrl = `https://id.twitch.tv/oauth2/authorize?client_id=${TWITCH_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=user:read:email+channel:read:subscriptions+moderator:read:followers`

    return NextResponse.redirect(authUrl)
  }

  try {
    // Trocar code por access token
    const tokenResponse = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: TWITCH_CLIENT_ID!,
        client_secret: TWITCH_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (tokenData.access_token) {
      // Salvar token (em produção, salve no banco de dados)
      return NextResponse.json({
        success: true,
        message: "Autenticação realizada com sucesso!",
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
      })
    }

    throw new Error("Falha na autenticação")
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Erro na autenticação com Twitch",
        error: error,
      },
      { status: 400 },
    )
  }
}
