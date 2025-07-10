import { type NextRequest, NextResponse } from "next/server"

// GET - Status da API e sistema
export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    status: "online",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    endpoints: {
      members: "/api/members",
      notifications: "/api/notifications",
      analytics: "/api/analytics",
      webhooks: "/api/webhooks",
      status: "/api/status",
    },
    system: {
      totalMembers: 30,
      activeStreams: 8,
      lastUpdate: new Date().toISOString(),
    },
  })
}
