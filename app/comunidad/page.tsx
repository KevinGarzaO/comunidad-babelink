"use client";

import { useState } from "react";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import {
  Heart,
  MessageCircle,
  Search,
  TrendingUp,
  Users,
  Hash,
  Bookmark,
  Filter,
  Sparkles,
  Crown,
  PenSquare,
} from "lucide-react";
import {
  communityPosts,
  popularTags,
  communityUsers,
  CommunityPost,
} from "../../src/data/community";
import { BlogPost } from "../../components/BlogPost";
import { LoginModal } from "../../components/LoginModal";
import { SocialMediaLinks } from "../../components/SocialMediaLinks";
import { useAuth } from "../../src/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { posts } from "@/data/posts";

interface CommunityPageProps {
  onNavigate?: (page: string) => void;
  onUserClick?: (userId: number) => void;
  onCreatePost?: () => void;
}

function CommunityPage({
  onNavigate,
  onUserClick,
  onCreatePost,
}: CommunityPageProps = {}) {
  const router = useRouter();
  const { user } = useAuth();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPostId] = useState<number | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const filteredPosts = communityPosts.filter((post) => {
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    const matchesSearch =
      !searchTerm ||
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesTag && matchesSearch;
  });

  const selectedCommunityPost = selectedPostId
    ? communityPosts.find((p) => p.id === selectedPostId)
    : null;

  // Convertir CommunityPost a Post para usar el mismo visualizador

  // Si hay un post seleccionado, mostrar solo el post
  if (selectedCommunityPost) {
    return (
      <div className="min-h-screen bg-white">
        <BlogPost slug={posts[0].slug} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-[#333366] to-[#5a5a8a] text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl mb-4">Comunidad Babelink 🌐</h1>
            <p className="text-xl text-gray-200">
              Comparte conocimiento, aprende de otros creadores y crece junto a
              una comunidad apasionada por la IA y la creatividad.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Sidebar izquierdo */}
          <aside className="lg:col-span-3 space-y-6">
            {/* Navigation */}
            <Card>
              <CardContent className="p-4 space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setSelectedTag(null)}
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Tendencias
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Siguiendo
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Bookmark className="mr-2 h-4 w-4" />
                  Guardados
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Hash className="mr-2 h-4 w-4" />
                  Tags
                </Button>
              </CardContent>
            </Card>

            {/* Popular Tags */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-[#333366] mb-3">Tags Populares</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.slice(0, 10).map((tag) => (
                    <Badge
                      key={tag.name}
                      variant={selectedTag === tag.name ? "default" : "outline"}
                      className={`cursor-pointer hover:bg-[#E2E3F7] transition-colors ${
                        selectedTag === tag.name
                          ? "bg-[#333366] text-white"
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedTag(
                          selectedTag === tag.name ? null : tag.name
                        )
                      }
                    >
                      #{tag.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Crear Post - Solo para usuarios autenticados */}
            {user && (
              <Card className="bg-linear-to-br from-[#FFCC00] to-[#f5d633] border-0">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <PenSquare className="h-5 w-5 text-[#333366]" />
                    <h3 className="text-[#333366]">Comparte tu conocimiento</h3>
                  </div>
                  <p className="text-sm text-[#333366]/80 mb-4">
                    Crea un nuevo post y comparte tus ideas con la comunidad
                  </p>
                  <Button
                    className="w-full bg-[#333366] hover:bg-[#333366]/90 text-white"
                    onClick={onCreatePost}
                  >
                    <PenSquare className="mr-2 h-4 w-4" />
                    Crear post
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Programa de Creadores CTA */}
            <Card className="bg-linear-to-br from-[#333366] to-[#5a5a8a] text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="h-5 w-5 text-[#FFCC00]" />
                  <h3>¿Quieres ser Creador Verificado?</h3>
                </div>
                <p className="text-sm text-gray-200 mb-4">
                  Únete al Programa de Creadores y obtén beneficios exclusivos,
                  mentoría personalizada y la corona de verificación
                </p>
                <Button
                  className="w-full bg-[#FFCC00] hover:bg-[#FFCC00]/90 text-[#333366]"
                  onClick={() => onNavigate?.("creadores")}
                >
                  Ver Programa
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Main Feed */}
          <main className="lg:col-span-6 space-y-6">
            {/* Search and Filter */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar posts, tags o autores..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            {/* Active Filter Badge */}
            {selectedTag && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Filtrando por:</span>
                <Badge
                  className="bg-[#333366] cursor-pointer"
                  onClick={() => setSelectedTag(null)}
                >
                  #{selectedTag} ×
                </Badge>
              </div>
            )}

            {/* Posts Feed */}
            {filteredPosts.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-gray-500">
                    No se encontraron posts con estos filtros
                  </p>
                  <Button
                    variant="link"
                    className="text-[#333366] mt-2"
                    onClick={() => {
                      setSelectedTag(null);
                      setSearchTerm("");
                    }}
                  >
                    Limpiar filtros
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            )}
          </main>

          {/* Sidebar derecho */}
          <aside className="lg:col-span-3 space-y-6">
            {/* Creadores destacados */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-[#333366] mb-4">Creadores Destacados</h3>
                <div className="space-y-4">
                  {communityUsers.map((user) => (
                    <div key={user.id} className="flex items-start gap-3">
                      <div
                        className="h-10 w-10 rounded-full overflow-hidden shrink-0 bg-gray-200 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => onUserClick?.(user.id)}
                      >
                        <ImageWithFallback
                          src={user.avatar}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-sm text-[#333366] truncate cursor-pointer hover:underline"
                          onClick={() => onUserClick?.(user.id)}
                        >
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          @{user.username}
                        </p>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                          {user.bio}
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2 h-7 text-xs"
                          onClick={() => router.push(`/comunidad/${user.id}`)}
                        >
                          Ver perfil
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Card de Iniciar Sesión - Solo si NO está autenticado */}
            {!user && (
              <Card className="bg-linear-to-br from-[#333366] to-[#5a5a8a] border-0 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="h-6 w-6 text-[#FFCC00]" />
                    <h3 className="text-lg">Únete a la Comunidad</h3>
                  </div>
                  <p className="text-sm mb-4 text-gray-200">
                    Inicia sesión para interactuar, publicar contenido, seguir a
                    otros creadores y acceder a funciones exclusivas
                  </p>
                  <Button
                    className="w-full bg-[#FFCC00] text-[#333366] hover:bg-[#FFCC00]/90"
                    onClick={() => setIsLoginOpen(true)}
                  >
                    Iniciar sesión
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Stats de comunidad */}
            <Card className="bg-[#E2E3F7] border-0">
              <CardContent className="p-4">
                <h3 className="text-[#333366] mb-3">
                  Actividad de la Comunidad
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                      Posts esta semana
                    </span>
                    <span className="text-[#333366]">142</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                      Miembros activos
                    </span>
                    <span className="text-[#333366]">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">
                      Nuevos miembros
                    </span>
                    <span className="text-[#333366]">+89</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Links útiles */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-[#333366] mb-3 text-sm">Enlaces</h3>
                <div className="space-y-2 text-sm">
                  <button
                    onClick={() => onNavigate?.("guia")}
                    className="block w-full text-left text-gray-600 hover:text-[#333366] transition-colors"
                  >
                    Guía de la comunidad
                  </button>
                  <button
                    onClick={() => onNavigate?.("conducta")}
                    className="block w-full text-left text-gray-600 hover:text-[#333366] transition-colors"
                  >
                    Código de conducta
                  </button>
                  <button
                    onClick={() => onNavigate?.("faqs")}
                    className="block w-full text-left text-gray-600 hover:text-[#333366] transition-colors"
                  >
                    FAQs
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Redes Sociales */}
            <Card>
              <CardContent className="p-4">
                <h3 className="text-[#333366] mb-4">Síguenos en Redes</h3>
                <SocialMediaLinks variant="full" />
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </div>
  );
}

function PostCard({ post }: { post: CommunityPost }) {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(post.reactions);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <Card
      className="hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => {
        router.push(`/comunidad/${post.author.id}/${post.slug}`);
      }}
    >
      <CardContent className="p-0">
        <div className="flex gap-4 p-4">
          {/* Author Avatar */}
          <div
            className="flex-linear-0 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/comunidad/${post.author.id}`);
            }}
          >
            <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200">
              <ImageWithFallback
                src={post.author.avatar}
                alt={post.author.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Post Content */}
          <div className="flex-1 min-w-0">
            {/* Author Info */}
            <div className="flex items-center gap-2 mb-2">
              <span
                className="text-sm text-[#333366] hover:underline cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/comunidad/${post.author.id}`);
                }}
              >
                {post.author.name}
              </span>

              {post.author.isVerified && (
                <Crown
                  className="h-4 w-4 text-[#FFCC00] fill-[#FFCC00]"
                  aria-label="Creador verificado"
                />
              )}

              <span className="text-xs text-gray-500">
                • {post.publishedAt}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl text-[#333366] mb-2 hover:text-[#5a5a8a]">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {post.excerpt}
            </p>

            {/* Cover Image */}
            {post.coverImage && (
              <div className="aspect-video rounded-lg overflow-hidden mb-3">
                <ImageWithFallback
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  #{tag}
                </Badge>
              ))}
            </div>

            {/* Post Meta */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              {/* Like */}
              <button
                className={`flex items-center gap-1.5 transition-all hover:scale-110 ${
                  isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleLike(e);
                }}
                title={isLiked ? "Te gusta" : "Me gusta"}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-red-500" : ""}`} />
                <span className="text-xs">
                  {isLiked ? "Te gusta" : "Me gusta"} ({likesCount})
                </span>
              </button>

              {/* Comments */}
              <button
                className="flex items-center gap-1 hover:text-[#333366] transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  // Aquí puedes abrir modal, ir a comentarios, etc
                }}
              >
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments}</span>
              </button>

              <span className="text-xs">{post.readTime} min de lectura</span>

              {/* Save */}
              <button
                className="ml-auto transition-all hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  // Aquí puedes abrir modal, ir a comentarios, etc
                }}
                title={isSaved ? "Guardado" : "Guardar"}
              >
                <Bookmark
                  className="h-4 w-4"
                  style={{
                    fill: isSaved ? "#FFCC00" : "none",
                    color: isSaved ? "#FFCC00" : "#4b5563",
                    stroke: isSaved ? "#FFCC00" : "currentColor",
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CommunityPage;
