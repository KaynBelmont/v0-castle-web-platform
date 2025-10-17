"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"
import { MembersSection } from "@/components/members-section"
import { AnalyticsSection } from "@/components/analytics-section"
import { NotificationsSection } from "@/components/notifications-section"
import { SettingsSection } from "@/components/settings-section"
import { LoginForm } from "@/components/login-form"

export default function CastleDashboard() {
  const [activeSection, setActiveSection] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Verificar se já está logado (localStorage)
  useEffect(() => {
    const auth = localStorage.getItem("castle_auth")
    if (auth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (email: string, password: string) => {
    // Validação simples (em produção, use autenticação real)
    if (email === "admin@castle.com" && password === "castle123") {
      setIsAuthenticated(true)
      localStorage.setItem("castle_auth", "true")
    } else {
      alert("Credenciais inválidas!")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("castle_auth")
  }

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />
      case "members":
        return <MembersSection />
      case "analytics":
        return <AnalyticsSection />
      case "notifications":
        return <NotificationsSection />
      case "settings":
        return <SettingsSection />
      default:
        return <Dashboard />
    }
  }

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="flex">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          onLogout={handleLogout}
        />
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "ml-16" : "ml-64"}`}>
          <div className="p-6">{renderContent()}</div>
        </main>
      </div>
    </div>
  )
}
