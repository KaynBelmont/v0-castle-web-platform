import { type NextRequest, NextResponse } from "next/server"

// Dados mockados de analytics
const analyticsData = {
  overview: {
    totalViews: "2.4M",
    totalViewsNumeric: 2400000,
    newFollowers: "12.8K",
    newFollowersNumeric: 12800,
    avgEngagement: "89.2%",
    avgEngagementNumeric: 89.2,
    totalStreamHours: "1,247h",
    totalStreamHoursNumeric: 1247,
  },
  topPerformers: [
    {
      id: 1,
      name: "Sir StreamKnight",
      type: "Streamer",
      platform: "Twitch",
      views: "456K",
      viewsNumeric: 456000,
      engagement: "92%",
      engagementNumeric: 92,
      growth: "+18%",
      growthNumeric: 18,
    },
    {
      id: 2,
      name: "Lady ContentQueen",
      type: "YouTuber",
      platform: "YouTube",
      views: "389K",
      viewsNumeric: 389000,
      engagement: "87%",
      engagementNumeric: 87,
      growth: "+12%",
      growthNumeric: 12,
    },
  ],
  platformStats: [
    {
      platform: "Twitch",
      members: 15,
      totalViews: "1.2M",
      totalViewsNumeric: 1200000,
      avgViewers: "2.1K",
      avgViewersNumeric: 2100,
    },
    {
      platform: "YouTube",
      members: 10,
      totalViews: "890K",
      totalViewsNumeric: 890000,
      avgViewers: "1.8K",
      avgViewersNumeric: 1800,
    },
  ],
}

// GET - Obter dados de analytics
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const period = searchParams.get("period") || "30d"
  const platform = searchParams.get("platform")

  const responseData = { ...analyticsData }

  // Filtrar por plataforma se especificado
  if (platform) {
    responseData.platformStats = responseData.platformStats.filter(
      (p) => p.platform.toLowerCase() === platform.toLowerCase(),
    )
    responseData.topPerformers = responseData.topPerformers.filter(
      (p) => p.platform.toLowerCase() === platform.toLowerCase(),
    )
  }

  return NextResponse.json({
    success: true,
    data: responseData,
    period: period,
    generatedAt: new Date().toISOString(),
  })
}
