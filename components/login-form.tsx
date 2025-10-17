"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Crown, Shield, Eye, EyeOff } from "lucide-react"

interface LoginFormProps {
  onLogin: (email: string, password: string) => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simular delay de autenticação
    setTimeout(() => {
      onLogin(email, password)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <Crown className="h-16 w-16 text-amber-500" />
              <Shield className="h-8 w-8 text-amber-300 absolute -bottom-2 -right-2" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-amber-100 font-serif">Castle</h1>
          <p className="text-amber-300/70 mt-2">Reino dos Criadores de Conteúdo</p>
        </div>

        {/* Login Card */}
        <Card className="bg-slate-800/70 border-amber-600/20 backdrop-blur-xl shadow-2xl">
          <CardHeader>
            <CardTitle className="text-2xl text-amber-100 text-center">Entrar no Reino</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div>
                <label className="text-sm font-medium text-amber-200 mb-2 block">Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  required
                  className="bg-slate-700/50 border-amber-600/30 text-amber-100 placeholder:text-amber-300/50 focus:border-amber-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium text-amber-200 mb-2 block">Senha</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="bg-slate-700/50 border-amber-600/30 text-amber-100 placeholder:text-amber-300/50 focus:border-amber-500 pr-10"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 top-0 h-full px-3 text-amber-300 hover:text-amber-100 hover:bg-transparent"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-amber-600/30 text-amber-600 focus:ring-amber-500" />
                  <span className="text-amber-300/70">Lembrar de mim</span>
                </label>
                <a href="#" className="text-amber-400 hover:text-amber-300">
                  Esqueceu a senha?
                </a>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-amber-600 hover:bg-amber-700 text-amber-100 font-medium"
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 border-2 border-amber-100 border-t-transparent rounded-full animate-spin mr-2" />
                    Entrando...
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4 mr-2" />
                    Entrar no Castelo
                  </>
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-amber-600/10 border border-amber-600/20 rounded-lg">
              <p className="text-xs font-medium text-amber-200 mb-2">🔑 Credenciais de Demonstração:</p>
              <p className="text-xs text-amber-300/70">Email: admin@castle.com</p>
              <p className="text-xs text-amber-300/70">Senha: castle123</p>
            </div>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-amber-300/70">
                Novo no Castle?{" "}
                <a href="#" className="text-amber-400 hover:text-amber-300 font-medium">
                  Criar uma conta
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-amber-300/50">© 2025 Castle Platform. Todos os direitos reservados.</p>
        </div>
      </div>
    </div>
  )
}
