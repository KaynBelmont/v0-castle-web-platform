"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  Instagram,
  Upload,
  ImageIcon,
  Calendar,
  Clock,
  Send,
  Eye,
  Trash2,
  CheckCircle,
  Hash,
  AtSign,
  MapPin,
  X,
} from "lucide-react"

interface Post {
  id: string
  image: string
  caption: string
  hashtags: string[]
  scheduled: boolean
  scheduledDate?: string
  status: "draft" | "scheduled" | "published" | "failed"
  publishedAt?: string
  engagement?: {
    likes: number
    comments: number
    shares: number
  }
}

export function InstagramPostSection() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      image: "/ultimate-gaming-setup.png",
      caption: "🎮 Novo setup do castelo! Equipamentos de primeira para os cavaleiros streamers. #CastleGaming",
      hashtags: ["CastleGaming", "StreamerLife", "GamingSetup"],
      scheduled: false,
      status: "published",
      publishedAt: "2 horas atrás",
      engagement: {
        likes: 1247,
        comments: 89,
        shares: 34,
      },
    },
    {
      id: "2",
      image: "/diverse-team-meeting.png",
      caption: "👑 Reunião dos cavaleiros do reino! Planejando novas conquistas...",
      hashtags: ["TeamCastle", "ContentCreators", "Collaboration"],
      scheduled: true,
      scheduledDate: "Amanhã às 18:00",
      status: "scheduled",
    },
  ])

  const [newPost, setNewPost] = useState({
    caption: "",
    hashtags: "",
    location: "",
    scheduled: false,
    scheduledDate: "",
    scheduledTime: "",
  })

  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [isPosting, setIsPosting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const popularHashtags = [
    "#Gaming",
    "#Streaming",
    "#ContentCreator",
    "#LiveStream",
    "#Gamer",
    "#Twitch",
    "#YouTube",
    "#CastleTeam",
    "#StreamerCommunity",
    "#GamingLife",
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddHashtag = (hashtag: string) => {
    const currentHashtags = newPost.hashtags ? newPost.hashtags + " " + hashtag : hashtag
    setNewPost({ ...newPost, hashtags: currentHashtags })
  }

  const handlePublish = async () => {
    if (!uploadedImage || !newPost.caption) {
      alert("Por favor, adicione uma imagem e uma legenda!")
      return
    }

    setIsPosting(true)

    // Simular chamada à API do Pipegram
    try {
      // Aqui você fará a integração real com Pipegram
      const response = await fetch("/api/pipegram/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: uploadedImage,
          caption: newPost.caption,
          hashtags: newPost.hashtags.split(" ").filter((h) => h.startsWith("#")),
          location: newPost.location,
          scheduled: newPost.scheduled,
          scheduledDate: newPost.scheduled ? `${newPost.scheduledDate} ${newPost.scheduledTime}` : null,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Adicionar post à lista
        const post: Post = {
          id: Date.now().toString(),
          image: uploadedImage,
          caption: newPost.caption,
          hashtags: newPost.hashtags.split(" ").filter((h) => h.startsWith("#")),
          scheduled: newPost.scheduled,
          scheduledDate: newPost.scheduled ? `${newPost.scheduledDate} às ${newPost.scheduledTime}` : undefined,
          status: newPost.scheduled ? "scheduled" : "published",
          publishedAt: newPost.scheduled ? undefined : "Agora",
        }

        setPosts([post, ...posts])

        // Resetar formulário
        setNewPost({
          caption: "",
          hashtags: "",
          location: "",
          scheduled: false,
          scheduledDate: "",
          scheduledTime: "",
        })
        setUploadedImage(null)
        setShowPreview(false)

        alert(newPost.scheduled ? "Post agendado com sucesso!" : "Post publicado com sucesso!")
      } else {
        alert("Erro ao publicar post: " + data.message)
      }
    } catch (error) {
      console.error("Erro:", error)
      alert("Erro ao publicar post")
    } finally {
      setIsPosting(false)
    }
  }

  const getStatusBadge = (status: Post["status"]) => {
    const badges = {
      draft: { class: "bg-gray-600/20 text-gray-300 border-gray-500/50", text: "Rascunho" },
      scheduled: { class: "bg-yellow-600/20 text-yellow-300 border-yellow-500/50", text: "Agendado" },
      published: { class: "bg-green-600/20 text-green-300 border-green-500/50", text: "Publicado" },
      failed: { class: "bg-red-600/20 text-red-300 border-red-500/50", text: "Falhou" },
    }
    return badges[status]
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-amber-100 font-serif flex items-center">
            <Instagram className="h-8 w-8 mr-3 text-pink-400" />
            Pergaminhos do Instagram
          </h1>
          <p className="text-amber-300/70">Publique conteúdo nas terras do Instagram via Pipegram</p>
        </div>
        <Button
          onClick={() => setShowPreview(!showPreview)}
          variant="outline"
          className="border-amber-600/30 text-amber-200 hover:bg-amber-600/10 bg-transparent"
        >
          <Eye className="h-4 w-4 mr-2" />
          {showPreview ? "Ocultar Preview" : "Ver Preview"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Create Post */}
        <div className="space-y-6">
          <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-amber-100 flex items-center">
                <ImageIcon className="h-5 w-5 mr-2 text-amber-400" />
                Criar Novo Post
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Upload Image */}
              <div>
                <label className="text-sm font-medium text-amber-200 mb-2 block">Imagem do Post</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {uploadedImage ? (
                  <div className="relative">
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => setUploadedImage(null)}
                      className="absolute top-2 right-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-amber-600/30 rounded-lg p-8 text-center cursor-pointer hover:border-amber-500/50 transition-colors bg-slate-700/30"
                  >
                    <Upload className="h-12 w-12 text-amber-400 mx-auto mb-3" />
                    <p className="text-amber-200 font-medium">Clique para fazer upload</p>
                    <p className="text-xs text-amber-300/70 mt-1">PNG, JPG até 10MB</p>
                  </div>
                )}
              </div>

              {/* Caption */}
              <div>
                <label className="text-sm font-medium text-amber-200 mb-2 block flex items-center">
                  <AtSign className="h-4 w-4 mr-1" />
                  Legenda
                </label>
                <Textarea
                  value={newPost.caption}
                  onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
                  placeholder="Escreva uma legenda épica para seu post..."
                  rows={4}
                  maxLength={2200}
                  className="bg-slate-700/50 border-amber-600/30 text-amber-100 placeholder:text-amber-300/50"
                />
                <p className="text-xs text-amber-300/70 mt-1">{newPost.caption.length}/2200 caracteres</p>
              </div>

              {/* Popular Hashtags */}
              <div>
                <label className="text-sm font-medium text-amber-200 mb-2 block flex items-center">
                  <Hash className="h-4 w-4 mr-1" />
                  Hashtags Populares
                </label>
                <div className="flex flex-wrap gap-2">
                  {popularHashtags.map((hashtag) => (
                    <Button
                      key={hashtag}
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddHashtag(hashtag)}
                      className="border-amber-600/30 text-amber-200 hover:bg-amber-600/10 bg-transparent text-xs"
                    >
                      {hashtag}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Hashtags Input */}
              <div>
                <label className="text-sm font-medium text-amber-200 mb-2 block">Suas Hashtags</label>
                <Input
                  value={newPost.hashtags}
                  onChange={(e) => setNewPost({ ...newPost, hashtags: e.target.value })}
                  placeholder="#exemplo #gaming #streaming"
                  className="bg-slate-700/50 border-amber-600/30 text-amber-100 placeholder:text-amber-300/50"
                />
              </div>

              {/* Location */}
              <div>
                <label className="text-sm font-medium text-amber-200 mb-2 block flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  Localização (Opcional)
                </label>
                <Input
                  value={newPost.location}
                  onChange={(e) => setNewPost({ ...newPost, location: e.target.value })}
                  placeholder="Ex: São Paulo, Brasil"
                  className="bg-slate-700/50 border-amber-600/30 text-amber-100 placeholder:text-amber-300/50"
                />
              </div>

              {/* Schedule */}
              <div className="p-4 bg-slate-700/30 rounded-lg border border-amber-600/10">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-amber-200 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    Agendar Publicação
                  </label>
                  <Switch
                    checked={newPost.scheduled}
                    onCheckedChange={(checked) => setNewPost({ ...newPost, scheduled: checked })}
                    className="data-[state=checked]:bg-amber-600"
                  />
                </div>

                {newPost.scheduled && (
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Input
                        type="date"
                        value={newPost.scheduledDate}
                        onChange={(e) => setNewPost({ ...newPost, scheduledDate: e.target.value })}
                        className="bg-slate-600/50 border-amber-600/30 text-amber-100"
                      />
                    </div>
                    <div>
                      <Input
                        type="time"
                        value={newPost.scheduledTime}
                        onChange={(e) => setNewPost({ ...newPost, scheduledTime: e.target.value })}
                        className="bg-slate-600/50 border-amber-600/30 text-amber-100"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Publish Button */}
              <Button
                onClick={handlePublish}
                disabled={isPosting || !uploadedImage || !newPost.caption}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-medium"
              >
                {isPosting ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Publicando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    {newPost.scheduled ? "Agendar Post" : "Publicar Agora"}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview & Recent Posts */}
        <div className="space-y-6">
          {/* Preview */}
          {showPreview && uploadedImage && (
            <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
              <CardHeader>
                <CardTitle className="text-amber-100 flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-amber-400" />
                  Preview do Post
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Instagram Post Preview */}
                <div className="bg-white rounded-lg overflow-hidden shadow-xl max-w-md mx-auto">
                  {/* Header */}
                  <div className="flex items-center space-x-3 p-3 border-b">
                    <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center">
                      <Instagram className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">castle_platform</p>
                      {newPost.location && <p className="text-xs text-gray-600">{newPost.location}</p>}
                    </div>
                  </div>

                  {/* Image */}
                  <img
                    src={uploadedImage || "/placeholder.svg"}
                    alt="Post preview"
                    className="w-full aspect-square object-cover"
                  />

                  {/* Actions */}
                  <div className="p-3 space-y-2">
                    <div className="flex items-center space-x-4">
                      <Instagram className="h-6 w-6 text-gray-900" />
                      <Instagram className="h-6 w-6 text-gray-900" />
                      <Instagram className="h-6 w-6 text-gray-900" />
                    </div>

                    {/* Caption */}
                    <div>
                      <p className="text-sm text-gray-900">
                        <span className="font-semibold">castle_platform</span>{" "}
                        {newPost.caption || "Sua legenda aparecerá aqui..."}
                      </p>
                      {newPost.hashtags && <p className="text-sm text-blue-600 mt-1">{newPost.hashtags}</p>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Posts */}
          <Card className="bg-slate-800/50 border-amber-600/20 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-amber-100 flex items-center">
                <Clock className="h-5 w-5 mr-2 text-amber-400" />
                Posts Recentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {posts.map((post) => {
                const statusBadge = getStatusBadge(post.status)
                return (
                  <div key={post.id} className="p-4 bg-slate-700/30 rounded-lg border border-amber-600/10 space-y-3">
                    <div className="flex items-start space-x-3">
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt="Post"
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <Badge className={statusBadge.class}>{statusBadge.text}</Badge>
                          <span className="text-xs text-amber-300/70">{post.publishedAt || post.scheduledDate}</span>
                        </div>
                        <p className="text-sm text-amber-200 line-clamp-2">{post.caption}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {post.hashtags.slice(0, 3).map((hashtag) => (
                            <Badge key={hashtag} variant="secondary" className="bg-slate-600/50 text-amber-200 text-xs">
                              #{hashtag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Engagement Stats */}
                    {post.engagement && (
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-amber-600/10">
                        <div className="text-center">
                          <p className="text-lg font-bold text-pink-400">{post.engagement.likes}</p>
                          <p className="text-xs text-amber-300/70">Likes</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-blue-400">{post.engagement.comments}</p>
                          <p className="text-xs text-amber-300/70">Comentários</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-bold text-green-400">{post.engagement.shares}</p>
                          <p className="text-xs text-amber-300/70">Compartilhamentos</p>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-amber-600/30 text-amber-200 hover:bg-amber-600/10 bg-transparent"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Ver
                      </Button>
                      {post.status === "scheduled" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-red-600/30 text-red-300 hover:bg-red-600/10 bg-transparent"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Cancelar
                        </Button>
                      )}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pipegram Integration Status */}
      <Card className="bg-gradient-to-r from-pink-900/20 to-purple-900/20 border-pink-600/30 backdrop-blur">
        <CardHeader>
          <CardTitle className="text-pink-200 flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 text-pink-400" />
            Status da Integração Pipegram
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <p className="text-2xl font-bold text-green-400">✓ Conectado</p>
              <p className="text-xs text-amber-300/70 mt-1">API Status</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <p className="text-2xl font-bold text-amber-100">12</p>
              <p className="text-xs text-amber-300/70 mt-1">Posts este mês</p>
            </div>
            <div className="text-center p-4 bg-slate-800/50 rounded-lg">
              <p className="text-2xl font-bold text-amber-100">98.5%</p>
              <p className="text-xs text-amber-300/70 mt-1">Taxa de sucesso</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
