import { type NextRequest, NextResponse } from "next/server"

// Dados mockados dos membros (em produção, viria do banco de dados)
const members = [
  {
    id: 1,
    name: "Sir StreamKnight",
    type: "Streamer",
    platforms: ["Twitch", "YouTube"],
    status: "live",
    viewers: "2.1K",
    followers: "45K",
    avatar: "🛡️",
    lastActivity: "2 min atrás",
    email: "streamknight@castle.com",
    twitchUsername: "streamknight",
    youtubeChannel: "StreamKnightGaming",
  },
  {
    id: 2,
    name: "Lady ContentQueen",
    type: "YouTuber",
    platforms: ["YouTube", "Instagram"],
    status: "offline",
    viewers: "0",
    followers: "128K",
    avatar: "👑",
    lastActivity: "3 horas atrás",
    email: "contentqueen@castle.com",
    youtubeChannel: "LadyContentQueen",
    instagramHandle: "ladycontentqueen",
  },
  {
    id: 3,
    name: "Knight Influencer",
    type: "Influenciador",
    platforms: ["Instagram", "TikTok"],
    status: "active",
    viewers: "0",
    followers: "89K",
    avatar: "⚔️",
    lastActivity: "1 hora atrás",
    email: "knightinfluencer@castle.com",
    instagramHandle: "knightinfluencer",
    tiktokHandle: "knightinfluencer",
  },
  {
    id: 4,
    name: "Baron GameMaster",
    type: "Streamer",
    platforms: ["Kick", "Twitch"],
    status: "live",
    viewers: "856",
    followers: "32K",
    avatar: "🏰",
    lastActivity: "15 min atrás",
    email: "gamemaster@castle.com",
    twitchUsername: "barongamemaster",
    kickUsername: "barongamemaster",
  },
  {
    id: 5,
    name: "Duchess Creator",
    type: "YouTuber",
    platforms: ["YouTube"],
    status: "offline",
    viewers: "0",
    followers: "67K",
    avatar: "💎",
    lastActivity: "1 dia atrás",
    email: "duchesscreator@castle.com",
    youtubeChannel: "DuchessCreator",
  },
]

// GET - Listar todos os membros ou filtrar
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const status = searchParams.get("status")
  const platform = searchParams.get("platform")

  let filteredMembers = [...members]

  // Filtrar por tipo
  if (type) {
    filteredMembers = filteredMembers.filter((member) => member.type.toLowerCase() === type.toLowerCase())
  }

  // Filtrar por status
  if (status) {
    filteredMembers = filteredMembers.filter((member) => member.status === status)
  }

  // Filtrar por plataforma
  if (platform) {
    filteredMembers = filteredMembers.filter((member) =>
      member.platforms.some((p) => p.toLowerCase() === platform.toLowerCase()),
    )
  }

  return NextResponse.json({
    success: true,
    data: filteredMembers,
    total: filteredMembers.length,
  })
}

// POST - Adicionar novo membro
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newMember = {
      id: members.length + 1,
      name: body.name,
      type: body.type,
      platforms: body.platforms || [],
      status: body.status || "offline",
      viewers: "0",
      followers: body.followers || "0",
      avatar: body.avatar || "⚔️",
      lastActivity: "Agora",
      email: body.email,
      ...body.socialHandles,
    }

    members.push(newMember)

    return NextResponse.json(
      {
        success: true,
        message: "Membro adicionado com sucesso",
        data: newMember,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao adicionar membro",
        error: error,
      },
      { status: 400 },
    )
  }
}
