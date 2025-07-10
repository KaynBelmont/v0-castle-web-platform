import { type NextRequest, NextResponse } from "next/server"

const TWITCH_CLIENT_ID = process.env.TWITCH_CLIENT_ID
const TWITCH_ACCESS_TOKEN = process.env.TWITCH_ACCESS_TOKEN

// Dados dos membros Castle (em produção, viria do banco)
const castleMembers = [
  { id: 1, name: "Sir StreamKnight", twitchUsername: "streamknight" },
  { id: 4, name: "Baron GameMaster", twitchUsername: "barongamemaster" },
  // Adicione outros membros com username da Twitch
]

// POST - Sincronizar dados da Twitch com Castle
export async function POST(request: NextRequest) {
  try {
    const syncResults = []

    for (const member of castleMembers) {
      if (!member.twitchUsername) continue

      // Buscar dados do stream
      const streamResponse = await fetch(`https://api.twitch.tv/helix/streams?user_login=${member.twitchUsername}`, {
        headers: {
          "Client-ID": TWITCH_CLIENT_ID!,
          Authorization: `Bearer ${TWITCH_ACCESS_TOKEN}`,
        },
      })

      const streamData = await streamResponse.json()
      const isLive = streamData.data && streamData.data.length > 0

      // Buscar dados do usuário
      const userResponse = await fetch(`https://api.twitch.tv/helix/users?login=${member.twitchUsername}`, {
        headers: {
          "Client-ID": TWITCH_CLIENT_ID!,
          Authorization: `Bearer ${TWITCH_ACCESS_TOKEN}`,
        },
      })

      const userData = await userResponse.json()
      const userInfo = userData.data?.[0]

      const memberUpdate = {
        id: member.id,
        name: member.name,
        status: isLive ? "live" : "offline",
        viewers: isLive ? streamData.data[0].viewer_count.toString() : "0",
        followers: userInfo?.view_count || "0",
        lastActivity: isLive ? "Agora" : "Offline",
        twitchData: {
          isLive,
          game: isLive ? streamData.data[0].game_name : null,
          title: isLive ? streamData.data[0].title : null,
          viewerCount: isLive ? streamData.data[0].viewer_count : 0,
          profileImage: userInfo?.profile_image_url,
        },
      }

      syncResults.push(memberUpdate)

      // Aqui você atualizaria o banco de dados
      // await updateMemberInDatabase(memberUpdate)
    }

    return NextResponse.json({
      success: true,
      message: "Sincronização concluída",
      data: syncResults,
      syncedMembers: syncResults.length,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Erro na sincronização",
        error: error,
      },
      { status: 500 },
    )
  }
}
