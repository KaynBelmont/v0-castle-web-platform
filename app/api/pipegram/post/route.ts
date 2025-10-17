import { type NextRequest, NextResponse } from "next/server"

// Simulação da integração com Pipegram
// Em produção, você usaria a API real do Pipegram

const PIPEGRAM_API_KEY = process.env.PIPEGRAM_API_KEY
const PIPEGRAM_API_URL = "https://api.pipegram.com/v1" // URL fictícia

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validação básica
    if (!body.image || !body.caption) {
      return NextResponse.json(
        {
          success: false,
          message: "Imagem e legenda são obrigatórios",
        },
        { status: 400 },
      )
    }

    // Simular chamada à API do Pipegram
    // Em produção, você faria algo como:
    /*
    const response = await fetch(`${PIPEGRAM_API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PIPEGRAM_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: body.image,
        caption: body.caption,
        hashtags: body.hashtags,
        location: body.location,
        scheduled_at: body.scheduledDate,
      }),
    })

    const data = await response.json()
    */

    // Simulação de resposta bem-sucedida
    await new Promise((resolve) => setTimeout(resolve, 1500)) // Simular delay da API

    const postData = {
      id: Date.now().toString(),
      status: body.scheduled ? "scheduled" : "published",
      instagram_url: `https://instagram.com/p/${Math.random().toString(36).substring(7)}`,
      published_at: body.scheduled ? null : new Date().toISOString(),
      scheduled_at: body.scheduled ? body.scheduledDate : null,
    }

    return NextResponse.json({
      success: true,
      message: body.scheduled ? "Post agendado com sucesso via Pipegram!" : "Post publicado com sucesso via Pipegram!",
      data: postData,
    })
  } catch (error) {
    console.error("Erro na API do Pipegram:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao publicar post no Instagram",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

// GET - Verificar status da integração
export async function GET(request: NextRequest) {
  try {
    // Simular verificação de status da API Pipegram
    // Em produção:
    /*
    const response = await fetch(`${PIPEGRAM_API_URL}/status`, {
      headers: {
        'Authorization': `Bearer ${PIPEGRAM_API_KEY}`,
      },
    })
    */

    return NextResponse.json({
      success: true,
      status: "connected",
      api_version: "1.0",
      rate_limit: {
        remaining: 98,
        total: 100,
      },
      last_post: {
        date: new Date().toISOString(),
        status: "success",
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao verificar status",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
