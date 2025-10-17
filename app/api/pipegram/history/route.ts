import { type NextRequest, NextResponse } from "next/server"

// GET - Histórico de posts publicados
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const limit = searchParams.get("limit") || "10"
  const status = searchParams.get("status") // published, scheduled, failed

  try {
    // Em produção, buscar do banco de dados ou API do Pipegram
    const mockHistory = [
      {
        id: "1",
        image_url: "https://instagram.com/image1.jpg",
        caption: "Post de exemplo 1",
        hashtags: ["gaming", "streaming"],
        status: "published",
        published_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        engagement: {
          likes: 1247,
          comments: 89,
          shares: 34,
        },
      },
      {
        id: "2",
        image_url: "https://instagram.com/image2.jpg",
        caption: "Post de exemplo 2",
        hashtags: ["team", "collaboration"],
        status: "scheduled",
        scheduled_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      },
    ]

    let filteredHistory = mockHistory
    if (status) {
      filteredHistory = filteredHistory.filter((post) => post.status === status)
    }

    return NextResponse.json({
      success: true,
      data: filteredHistory.slice(0, Number.parseInt(limit)),
      total: filteredHistory.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao buscar histórico",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
