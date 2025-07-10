import { type NextRequest, NextResponse } from "next/server"

// Dados mockados de notificações
const notifications = [
  {
    id: 1,
    title: "Reunião do Reino",
    message: "Reunião geral marcada para amanhã às 20h",
    recipients: ["all"],
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    status: "sent",
    readCount: 28,
  },
  {
    id: 2,
    title: "Nova Campanha",
    message: "Lançamento da campanha de inverno começando na próxima semana",
    recipients: ["streamers"],
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: "sent",
    readCount: 15,
  },
]

// GET - Listar notificações
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get("status")
  const limit = searchParams.get("limit")

  let filteredNotifications = [...notifications]

  if (status) {
    filteredNotifications = filteredNotifications.filter((n) => n.status === status)
  }

  if (limit) {
    filteredNotifications = filteredNotifications.slice(0, Number.parseInt(limit))
  }

  return NextResponse.json({
    success: true,
    data: filteredNotifications,
    total: filteredNotifications.length,
  })
}

// POST - Enviar nova notificação
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const newNotification = {
      id: notifications.length + 1,
      title: body.title,
      message: body.message,
      recipients: body.recipients || ["all"],
      timestamp: new Date().toISOString(),
      status: "sent",
      readCount: 0,
    }

    notifications.unshift(newNotification)

    // Aqui você integraria com serviços reais de notificação
    // Por exemplo: enviar email, push notification, etc.

    return NextResponse.json(
      {
        success: true,
        message: "Notificação enviada com sucesso",
        data: newNotification,
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Erro ao enviar notificação",
        error: error,
      },
      { status: 400 },
    )
  }
}
