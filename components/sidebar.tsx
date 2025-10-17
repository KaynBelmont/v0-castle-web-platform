"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Castle,
  Users,
  BarChart3,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Crown,
  Shield,
  LogOut,
} from "lucide-react"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  collapsed: boolean
  onToggleCollapse: () => void
  onLogout: () => void
}

export function Sidebar({ activeSection, onSectionChange, collapsed, onToggleCollapse, onLogout }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Salão Principal", icon: Castle },
    { id: "members", label: "Cavaleiros", icon: Users, badge: "15" },
    { id: "analytics", label: "Relatórios", icon: BarChart3 },
    { id: "notifications", label: "Mensageiro", icon: Bell, badge: "3" },
    { id: "settings", label: "Configurações", icon: Settings },
  ]

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-gradient-to-b from-slate-800 to-slate-900 border-r border-amber-600/20 transition-all duration-300 ${collapsed ? "w-16" : "w-64"} shadow-2xl z-50`}
    >
      {/* Header */}
      <div className="p-4 border-b border-amber-600/20">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Crown className="h-8 w-8 text-amber-500" />
                <Shield className="h-4 w-4 text-amber-300 absolute -bottom-1 -right-1" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-amber-100 font-serif">Castle</h1>
                <p className="text-xs text-amber-300/70">Reino dos Criadores</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="text-amber-300 hover:text-amber-100 hover:bg-amber-600/10"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={`w-full justify-start text-left transition-all duration-200 ${
                isActive
                  ? "bg-amber-600/20 text-amber-100 border border-amber-600/30"
                  : "text-amber-200/80 hover:text-amber-100 hover:bg-amber-600/10"
              } ${collapsed ? "px-2" : "px-3"}`}
              onClick={() => onSectionChange(item.id)}
            >
              <Icon className={`h-5 w-5 ${collapsed ? "" : "mr-3"}`} />
              {!collapsed && (
                <>
                  <span className="font-medium">{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-auto bg-amber-600/30 text-amber-100 border-amber-500/50">
                      {item.badge}
                    </Badge>
                  )}
                </>
              )}
            </Button>
          )
        })}
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <div className="bg-amber-600/10 border border-amber-600/20 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                <Crown className="h-4 w-4 text-amber-100" />
              </div>
              <div>
                <p className="text-sm font-medium text-amber-100">Lorde do Castelo</p>
                <p className="text-xs text-amber-300/70">Administrador</p>
              </div>
            </div>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full border-red-600/30 text-red-300 hover:bg-red-600/10 hover:text-red-200 bg-transparent"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair do Reino
          </Button>
        </div>
      )}
    </div>
  )
}
