"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Clock,
  Bookmark,
  Twitter,
  Facebook,
  Linkedin,
  Link2,
  UserPlus,
  UserCheck,
  DollarSign,
  Bell,
  Mail,
  Heart,
  Eye,
  MessageCircle,
  Send,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Avatar } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Post, posts } from "../src/data/posts";
import { toast } from "sonner";
import { LoginModal } from "./LoginModal";
import { SocialMediaLinks } from "./SocialMediaLinks";
import { useAuth } from "../src/contexts/AuthContext";
import Image from "next/image";

interface BlogPostProps {
  post: Post;
  onBack: () => void;
  onPostClick: (postId: number) => void;
  isCommunityPost?: boolean;
  authorName?: string;
  onNavigate?: (section: string) => void;
  onAuthorClick?: () => void;
}

export function BlogPost({
  post,
  onBack,
  onPostClick,
  isCommunityPost = false,
  authorName,
  onNavigate,
  onAuthorClick,
}: BlogPostProps) {
  const { user: currentUser } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [donationAmount, setDonationAmount] = useState<number>(5);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likes, setLikes] = useState(124); // Mock data
  const [views] = useState(1847); // Mock data
  const [commentsCount, setCommentsCount] = useState(15); // Mock data
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "María González",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      content:
        "Excelente artículo, muy útil para entender cómo aplicar IA en mi negocio.",
      date: "Hace 2 horas",
      likes: 5,
    },
    {
      id: 2,
      author: "Carlos Ruiz",
      avatar:
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100",
      content:
        "Me encantó la sección sobre automatización. ¿Tienen más contenido sobre este tema?",
      date: "Hace 5 horas",
      likes: 3,
    },
    {
      id: 3,
      author: "Ana Torres",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      content:
        "Implementé algunas de estas ideas en mi empresa y los resultados son increíbles. ¡Gracias!",
      date: "Hace 1 día",
      likes: 8,
    },
  ]);
  const [newComment, setNewComment] = useState("");

  const relatedPosts = posts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const handleShare = (platform: string) => {
    toast.success(`Compartir en ${platform}`);
  };

  const handleCopyLink = () => {
    toast.success("¡Enlace listo para compartir!");
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(
      isFollowing
        ? `Dejaste de seguir a ${post.author.name}`
        : `¡Ahora sigues a ${post.author.name}!`
    );
  };

  const handleDonate = () => {
    if (donationAmount > 0) {
      toast.success(
        `¡Gracias por tu donación de $${donationAmount}! Este apoyo ayuda a ${post.author.name} a seguir creando contenido.`
      );
      setDonationAmount(5);
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    if (!isLiked) {
      toast.success("¡Te gusta este artículo!");
    }
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(
      isSaved ? "Artículo eliminado de guardados" : "¡Artículo guardado!"
    );
  };

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "Tú",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
        content: newComment,
        date: "Justo ahora",
        likes: 0,
      };
      setComments([comment, ...comments]);
      setCommentsCount(commentsCount + 1);
      setNewComment("");
      toast.success("¡Comentario publicado!");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with back button */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="hover:bg-gray-100"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {isCommunityPost ? "Volver a la comunidad" : "Volver al blog"}
          </Button>
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Main Article Content - Left/Center Column */}
          <article className="lg:col-span-8">
            <div className="max-w-4xl">
              {/* Tags - Arriba de todo */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.slice(0, 3).map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-gray-300 text-gray-600 text-xs"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h1 className="mb-6 text-[#333366] max-w-3xl">{post.title}</h1>

              {/* Meta Information */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="h-full w-full object-cover"
                      width={100}
                      height={100}
                      priority
                    />
                  </Avatar>
                  <div>
                    <div className="text-[#333366]">{post.author.name}</div>
                    <div className="text-sm text-gray-500">
                      {post.author.role}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>{post.date}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Estadísticas: Vistas, Likes, Comentarios */}
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-100">
                <div className="flex items-center gap-2 text-gray-600">
                  <Eye className="h-5 w-5" />
                  <span className="text-sm">
                    {views.toLocaleString()} vistas
                  </span>
                </div>
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 transition-all hover:scale-105 ${
                    isLiked
                      ? "text-red-500"
                      : "text-gray-600 hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${isLiked ? "fill-red-500" : ""}`}
                  />
                  <span className="text-sm">
                    {isLiked ? "Te gusta" : "Me gusta"} ({likes})
                  </span>
                </button>
                <div className="flex items-center gap-2 text-gray-600">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-sm">{commentsCount} comentarios</span>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-2 mb-8 pb-8 border-b border-gray-100">
                <span className="text-sm text-gray-600 mr-2">Compartir:</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-100 hover:text-[#1DA1F2]"
                  onClick={() => handleShare("Twitter")}
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-100 hover:text-[#1877F2]"
                  onClick={() => handleShare("Facebook")}
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-100 hover:text-[#0A66C2]"
                  onClick={() => handleShare("LinkedIn")}
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-100 hover:text-[#333366]"
                  onClick={handleCopyLink}
                >
                  <Link2 className="h-4 w-4" />
                </Button>
                <div className="ml-auto">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-gray-100 transition-all hover:scale-110"
                    onClick={handleSave}
                    title={isSaved ? "Guardado" : "Guardar"}
                  >
                    <Bookmark
                      className="h-4 w-4"
                      style={{
                        fill: isSaved ? "#FFCC00" : "none",
                        color: isSaved ? "#FFCC00" : "currentColor",
                        stroke: isSaved ? "#FFCC00" : "currentColor",
                      }}
                    />
                  </Button>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none mb-16">
                {/* Introduction */}
                <div className="text-xl text-gray-700 leading-relaxed mb-12">
                  {post.content.introduction}
                </div>

                {/* Sections */}
                {post.content.sections.map((section, index) => (
                  <div key={index} className="mb-10">
                    <h2 className="text-[#333366] mb-4">{section.title}</h2>
                    <p className="text-gray-700 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                ))}

                {/* Conclusion */}
                <div className="bg-[#E2E3F7]/30 rounded-xl p-8 my-12">
                  <h3 className="text-[#333366] mb-4">Conclusión</h3>
                  <p className="text-gray-700 leading-relaxed mb-0">
                    {post.content.conclusion}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-gray-100">
                <span className="text-sm text-gray-600 mr-2">Etiquetas:</span>
                {post.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:border-[#FFCC00] hover:text-[#333366] cursor-pointer"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Comments Section */}
              <div className="mb-12">
                <h3 className="text-2xl text-[#333366] mb-6">
                  Comentarios ({commentsCount})
                </h3>

                {/* New Comment Form */}
                <Card className="mb-8 border-2 border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10 shrink-0">
                        <Image
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
                          alt="Usuario"
                          className="h-full w-full object-cover"
                          width={100}
                          height={100}
                          priority
                        />
                      </Avatar>
                      <div className="flex-1">
                        <textarea
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Escribe tu comentario..."
                          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCC00] focus:border-transparent resize-none"
                          rows={3}
                        />
                        <div className="flex justify-end mt-3">
                          <Button
                            onClick={handleSubmitComment}
                            disabled={!newComment.trim()}
                            className="bg-[#333366] text-white hover:bg-[#333366]/90"
                          >
                            <Send className="mr-2 h-4 w-4" />
                            Publicar comentario
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <Card
                      key={comment.id}
                      className="border border-gray-200 hover:border-[#333366] transition-colors"
                    >
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <Avatar className="h-10 w-10 shrink-0">
                            <Image
                              src={comment.avatar}
                              alt={comment.author}
                              width={48} // ajusta según tu layout
                              height={48}
                              className="h-full w-full object-cover rounded-full"
                            />
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-[#333366]">
                                {comment.author}
                              </span>
                              <span className="text-sm text-gray-500">
                                • {comment.date}
                              </span>
                            </div>
                            <p className="text-gray-700 mb-3">
                              {comment.content}
                            </p>
                            <div className="flex items-center gap-4">
                              <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors">
                                <Heart className="h-4 w-4" />
                                <span>{comment.likes}</span>
                              </button>
                              <button className="text-sm text-gray-500 hover:text-[#333366] transition-colors">
                                Responder
                              </button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Load More Comments Button */}
                {commentsCount > comments.length && (
                  <div className="text-center mt-6">
                    <Button
                      variant="outline"
                      className="border-[#333366] text-[#333366] hover:bg-[#333366] hover:text-white"
                    >
                      Cargar más comentarios
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </article>

          {/* Sidebar - Right Column (Desktop) / Bottom (Mobile) */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Author Card */}
              <Card className="bg-linear-to-br from-[#E2E3F7]/40 to-[#F6CBCA]/20 border-0">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-20 w-20 mb-4">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={48} // ajusta según el tamaño que necesites
                        height={48}
                        className="h-full w-full object-cover rounded-full"
                      />
                    </Avatar>
                    <div className="mb-1 text-sm text-[#333366]">
                      Escrito por
                    </div>
                    <h3 className="mb-2 text-[#333366]">{post.author.name}</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      {post.author.role} en Babelink. Apasionado por compartir
                      conocimiento y ayudar a empresas a alcanzar su máximo
                      potencial en la era digital.
                    </p>
                    <div className="flex flex-col gap-3 w-full">
                      <Button
                        onClick={handleFollow}
                        className={
                          isFollowing
                            ? "bg-gray-200 text-gray-800 hover:bg-gray-300 w-full"
                            : "bg-[#333366] text-white hover:bg-[#333366]/90 w-full"
                        }
                      >
                        {isFollowing ? (
                          <>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Siguiendo
                          </>
                        ) : (
                          <>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Seguir
                          </>
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        className="border-[#333366] text-[#333366] hover:bg-[#333366] hover:text-white w-full"
                        onClick={onAuthorClick}
                      >
                        Ver perfil
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Card de Donación */}
              <Card className="bg-linear-to-br from-[#FFCC00]/10 to-[#FFCC00]/5 border-[#FFCC00]/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="h-5 w-5 text-[#333366]" />
                    <h3 className="text-lg text-[#333366]">
                      Apoya a {post.author.name.split(" ")[0]}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Tu donación ayuda a este creador a seguir produciendo
                    contenido de calidad para la comunidad.
                  </p>

                  <Separator className="my-4" />

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-600 mb-2 block">
                        Cantidad ($USD)
                      </label>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {[5, 10, 20, 50].map((amount) => (
                          <Button
                            key={amount}
                            size="sm"
                            variant={
                              donationAmount === amount ? "default" : "outline"
                            }
                            onClick={() => setDonationAmount(amount)}
                            className={
                              donationAmount === amount
                                ? "bg-[#333366] text-white"
                                : ""
                            }
                          >
                            ${amount}
                          </Button>
                        ))}
                      </div>
                      <input
                        type="number"
                        value={donationAmount}
                        onChange={(e) =>
                          setDonationAmount(Number(e.target.value))
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFCC00]"
                        min="1"
                        placeholder="Otra cantidad"
                      />
                    </div>

                    <Button
                      className="w-full bg-[#FFCC00] hover:bg-[#FFCC00]/90 text-[#333366]"
                      onClick={handleDonate}
                    >
                      Donar ${donationAmount}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      Procesado de forma segura
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Card de Suscripción - Solo si NO está autenticado */}
              {!currentUser && (
                <Card className="bg-linear-to-br from-[#333366] to-[#5a5a8a] text-white border-0">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Bell className="h-5 w-5" />
                      <h3 className="text-lg">Suscríbete a Babelink</h3>
                    </div>
                    <p className="text-sm text-gray-200 mb-6">
                      Recibe los mejores artículos sobre IA, tecnología,
                      marketing y negocios directamente en tu email.
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 bg-[#FFCC00] rounded-full"></div>
                        <span>Artículos exclusivos semanales</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 bg-[#FFCC00] rounded-full"></div>
                        <span>Acceso anticipado a contenido</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <div className="h-2 w-2 bg-[#FFCC00] rounded-full"></div>
                        <span>Sin spam, cancela cuando quieras</span>
                      </div>
                    </div>

                    <Button
                      className="w-full bg-[#FFCC00] hover:bg-[#FFCC00]/90 text-[#333366]"
                      onClick={() => setIsLoginOpen(true)}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Iniciar sesión
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Redes Sociales */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-[#333366] mb-4">Síguenos en Redes</h3>
                  <SocialMediaLinks variant="compact" />
                </CardContent>
              </Card>

              {/* CTA Programa de Creadores - Solo para posts de comunidad */}
              {isCommunityPost && authorName && (
                <Card className="bg-linear-to-br from-[#333366] to-[#5a5a8a] text-white border-0">
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-4xl mb-3">🚀</div>
                      <h3 className="text-xl mb-3">
                        {authorName} ya escribió su contenido
                      </h3>
                      <p className="text-sm text-gray-200 mb-4">
                        Tú también puedes compartir tus conocimientos uniéndote
                        al Programa de Creadores de Babelink
                      </p>
                      <div className="bg-[#FFCC00]/20 backdrop-blur-sm rounded-xl p-4 mb-4">
                        <p className="text-xs mb-1">Únete a más de</p>
                        <p className="text-2xl mb-1">1,247</p>
                        <p className="text-xs text-gray-300">
                          creadores activos
                        </p>
                      </div>
                      <Button
                        className="w-full bg-[#FFCC00] hover:bg-[#FFCC00]/90 text-[#333366]"
                        onClick={() => onNavigate?.("creadores")}
                      >
                        Únete al Programa
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </aside>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-[#333366]">
              Artículos relacionados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-[#FFCC00]/20"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    onPostClick(relatedPost.id);
                  }}
                >
                  <div className="relative overflow-hidden aspect-video">
                    <ImageWithFallback
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge
                      className="absolute top-4 left-4 border-0 shadow-lg"
                      style={{
                        backgroundColor:
                          relatedPost.category === "Negocios"
                            ? relatedPost.categoryColor
                            : relatedPost.categoryColor + "dd",
                        color:
                          relatedPost.category === "Negocios"
                            ? "#FFCC00"
                            : "#333366",
                      }}
                    >
                      {relatedPost.category}
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span>{relatedPost.date}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-[#333366] group-hover:text-[#FFCC00] transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                  </CardContent>
                  <CardFooter className="px-5 pb-5">
                    <button className="text-[#333366] hover:text-[#FFCC00] flex items-center gap-2 transition-colors text-sm">
                      Leer más
                      <ArrowLeft className="h-4 w-4 rotate-180" />
                    </button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </div>
  );
}
