import { type NextRequest, NextResponse } from "next/server"

// Dados mockados (mesmo array do route principal)
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
  // ... outros membros
]

// GET - Buscar membro específico
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const member = members.find((m) => m.id === id)

  if (!member) {
    return NextResponse.json(
      {
        success: false,
        message: "Membro não encontrado",
      },
      { status: 404 },
    )
  }

  return NextResponse.json({
    success: true,
    data: member,
  })
}

// PUT - Atualizar membro
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()
    const memberIndex = members.findIndex((m) => m.id === id)

    if (memberIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: "Membro não encontrado",
        },
        { status: 404 },
      )
    }

    // Atualizar membro
    members[memberIndex] = { ...members[memberIndex], ...body }

    return NextResponse.json({
      success: true,
      message: "Membro atualizado com sucesso",
      data: members[memberIndex],
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao atualizar membro",
        error: error,
      },
      { status: 400 },
    )
  }
}

// DELETE - Remover membro
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const memberIndex = members.findIndex((m) => m.id === id)

  if (memberIndex === -1) {
    return NextResponse.json(
      {
        success: false,
        message: "Membro não encontrado",
      },
      { status: 404 },
    )
  }

  const removedMember = members.splice(memberIndex, 1)[0]

  return NextResponse.json({
    success: true,
    message: "Membro removido com sucesso",
    data: removedMember,
  })
}
