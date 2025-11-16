"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Separator } from "./ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  ArrowLeft,
  MapPin,
  Link2,
  Calendar,
  Heart,
  MessageCircle,
  Share2,
  DollarSign,
  UserPlus,
  UserCheck,
  UserCircle,
  Linkedin,
  Youtube,
  Instagram,
  Facebook,
  Crown,
  Award,
  Sparkles,
  Upload,
  Camera,
  Save,
  X as XIcon,
  PenSquare,
} from "lucide-react";
import { communityPosts } from "../src/data/community";
import { toast } from "sonner";
import { LoginModal } from "./LoginModal";
import { useAuth } from "../src/contexts/AuthContext";
import { useRouter } from "next/navigation";

interface UserProfileProps {
  userId?: string;
  onPostClick?: (postId: number) => void;
  onUserClick?: (userId: number, isCreator: boolean) => void;
  onCreatePost?: () => void;
}

export function UserProfile({
  userId,
  onPostClick,
  onUserClick,
  onCreatePost,
}: UserProfileProps) {
  const router = useRouter();
  const isCreator = true;
  const { user: currentUser, login } = useAuth();
  let isOwnProfile: boolean = false;
  debugger;
  if(currentUser?.id === undefined){
    isOwnProfile = true;
  }
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState(
    isCreator ? "posts" : "interactions"
  );
  const [donationAmount, setDonationAmount] = useState<number>(5);
  const [showVerifiedModal, setShowVerifiedModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Estado para información extra del perfil (que no está en User de auth)
  const [profileExtra, setProfileExtra] = useState({
    location: "Tu ubicación",
    website: "",
    specialty: "",
    coverImage:
      "https://images.unsplash.com/photo-1614850716626-873413eb7c1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdyYWRpZW50JTIwYmFubmVyfGVufDF8fHx8MTc2MjAxNzc0MHww&ixlib=rb-4.1.0&q=80&w=1080",
    social: {
      youtube: "",
      tiktok: "",
      instagram: "",
      linkedin: "",
      facebook: "",
      spotify: "",
    },
  });

  // Estados para el formulario de edición
  const [editForm, setEditForm] = useState({
    name: "",
    bio: "",
    specialty: "",
    location: "",
    website: "",
    avatar: "",
    coverImage: "",
    social: {
      youtube: "",
      tiktok: "",
      instagram: "",
      linkedin: "",
      facebook: "",
      spotify: "",
    },
  });

  // Datos mock del usuario (en producción vendría de una API)
  const user =
    isOwnProfile && currentUser
      ? {
          id: currentUser.id,
          name: currentUser.name,
          username: `@${currentUser.username}`,
          avatar: currentUser.avatar,
          coverImage: profileExtra.coverImage,
          specialty: profileExtra.specialty || "",
          bio: currentUser.bio || "Miembro de la comunidad Babelink",
          location: profileExtra.location,
          website: profileExtra.website || null,
          joinedDate: "Noviembre 2024",
          stats: {
            posts: 0,
            followers: 0,
            following: 0,
          },
          social: profileExtra.social,
          badges: [],
          isVerified: currentUser.isVerified || false,
        }
      : isCreator
      ? {
          id: userId,
          name: "María González",
          username: "@mariagonzalez",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NjE5ODY4NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
          coverImage:
            "https://images.unsplash.com/photo-1614850716626-873413eb7c1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdyYWRpZW50JTIwYmFubmVyfGVufDF8fHx8MTc2MjAxNzc0MHww&ixlib=rb-4.1.0&q=80&w=1080",
          specialty: "IA y Creación de Contenido Digital",
          bio: "Apasionada por compartir conocimiento y ayudar a otros creadores a crecer. 🚀",
          location: "Madrid, España",
          website: "mariagonzalez.com",
          joinedDate: "Enero 2024",
          stats: {
            posts: 24,
            followers: 1250,
            following: 340,
          },
          social: {
            youtube: "@mariagonzalez",
            tiktok: "@mariagonzalez",
            instagram: "mariagonzalez",
            linkedin: "maria-gonzalez",
            facebook: "maria.gonzalez",
            spotify: "mariagonzalez",
          },
          badges: ["Creadora Verificada", "Top Contributor", "IA Expert"],
          isVerified: true, // Creador verificado del programa
        }
      : {
          id: userId,
          name: "Carlos Ruiz",
          username: "@carlosruiz",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
          coverImage:
            "https://images.unsplash.com/photo-1557683316-973673baf926?w=1080",
          specialty: "",
          bio: "Desarrollador Full Stack apasionado por la tecnología y el aprendizaje continuo.",
          location: "Barcelona, España",
          website: null,
          joinedDate: "Marzo 2024",
          stats: {
            posts: 0,
            followers: 45,
            following: 120,
          },
          social: {},
          badges: [],
          isVerified: false, // Usuario normal no verificado
        };

  // Posts del usuario
  const userPosts = communityPosts.filter(
    (post) => post.author.name === user.name
  );

  // Mock data de artículos con los que ha interactuado (para usuarios no creadores)
  const interactedPosts = [
    { ...communityPosts[0], interactionType: "Comentó" },
    { ...communityPosts[1], interactionType: "Le gustó" },
    { ...communityPosts[2], interactionType: "Compartió" },
  ];

  // Mock data para seguidores/siguiendo
  const followers = [
    {
      id: 101,
      name: "Carlos Ruiz",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      bio: "Desarrollador Full Stack",
      isCreator: false,
    },
    {
      id: 102,
      name: "Ana Martínez",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      bio: "Diseñadora UX/UI",
      isCreator: false,
    },
    {
      id: 103,
      name: "Pedro López",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      bio: "Marketing Digital",
      isCreator: false,
    },
  ];

  const following = [
    {
      id: 1,
      name: "María González",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      bio: "Especialista en IA",
      isCreator: true,
    },
    {
      id: 104,
      name: "Laura Sánchez",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
      bio: "Content Creator",
      isCreator: true,
    },
    {
      id: 105,
      name: "Diego Fernández",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
      bio: "Data Scientist",
      isCreator: true,
    },
  ];

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    toast.success(
      isFollowing
        ? "Dejaste de seguir a este usuario"
        : "¡Ahora sigues a este usuario!"
    );
  };

  const handleDonate = () => {
    if (donationAmount > 0) {
      toast.success(
        `¡Gracias por tu donación de $${donationAmount}! Este apoyo ayuda a ${user.name} a seguir creando contenido.`
      );
      setDonationAmount(5);
    }
  };

  const handleShare = () => {
    toast.success(
      "¡Perfil compartido! Puedes copiar la URL desde tu navegador"
    );
  };

  const handleOpenEditModal = () => {
    if (isOwnProfile) {
      setEditForm({
        name: currentUser?.name || "",
        bio: currentUser?.bio || "",
        specialty: profileExtra.specialty,
        location: profileExtra.location,
        website: profileExtra.website,
        avatar: currentUser?.avatar || "",
        coverImage: profileExtra.coverImage,
        social: profileExtra.social,
      });
      setShowEditModal(true);
    }
  };

  const handleSaveProfile = () => {
    if (currentUser) {
      // Actualizar el usuario en el contexto de autenticación
      login({
        ...currentUser,
        name: editForm.name,
        bio: editForm.bio,
        avatar: editForm.avatar,
      });

      // Actualizar información extra del perfil
      setProfileExtra({
        location: editForm.location,
        website: editForm.website,
        specialty: editForm.specialty,
        coverImage: editForm.coverImage,
        social: editForm.social,
      });

      toast.success("¡Perfil actualizado exitosamente!", {
        description: "Tus cambios se han guardado correctamente.",
      });
      setShowEditModal(false);
    }
  };

  const handleImageUpload = (type: "avatar" | "cover") => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageUrl = reader.result as string;
          if (type === "avatar") {
            setEditForm((prev) => ({ ...prev, avatar: imageUrl }));
          } else {
            setEditForm((prev) => ({ ...prev, coverImage: imageUrl }));
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con botón de regreso */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={router.back} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative">
        <div className="h-48 md:h-64 lg:h-80 w-full overflow-hidden bg-linear-to-r from-[#333366] to-[#5a5a8a]">
          <ImageWithFallback
            src={user.coverImage}
            alt="Portada"
            className="w-full h-full object-cover opacity-80"
          />
        </div>

        {/* Profile Info Container */}
        <div className="container mx-auto px-4">
          <div className="relative -mt-16 md:-mt-20">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="h-32 w-32 md:h-40 md:w-40 border-4 border-white shadow-xl">
                    <ImageWithFallback
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </Avatar>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-2xl md:text-3xl">{user.name}</h1>
                        {user.isVerified && (
                          <button
                            onClick={() => setShowVerifiedModal(true)}
                            className="hover:scale-110 transition-transform cursor-pointer"
                            title="Creador Verificado del Programa"
                          >
                            <Crown className="h-6 w-6 text-[#FFCC00] fill-[#FFCC00]" />
                          </button>
                        )}
                      </div>
                      <p className="text-gray-500 mb-3">{user.username}</p>

                      {/* Badges - Solo para creadores */}
                      {isCreator && user.badges && user.badges.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {user.badges.map((badge, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className={`bg-[#E2E3F7] text-[#333366] flex items-center gap-1.5 ${
                                badge === "Creadora Verificada"
                                  ? "cursor-pointer hover:bg-[#d4d5e9] transition-colors"
                                  : ""
                              }`}
                              onClick={() =>
                                badge === "Creadora Verificada" &&
                                setShowVerifiedModal(true)
                              }
                            >
                              {badge === "Creadora Verificada" && (
                                <Crown className="h-3.5 w-3.5 text-[#FFCC00] fill-[#FFCC00]" />
                              )}
                              {badge === "Top Contributor" && (
                                <Award className="h-3.5 w-3.5 text-[#333366]" />
                              )}
                              {badge === "IA Expert" && (
                                <Sparkles className="h-3.5 w-3.5 text-[#333366]" />
                              )}
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Especialidad */}
                      {user.specialty && (
                        <div className="mb-3">
                          <p className="text-[#333366] flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-[#FFCC00]" />
                            <span className="text-sm">Especialista en:</span>
                            <span>{user.specialty}</span>
                          </p>
                        </div>
                      )}

                      <p className="text-gray-700 mb-4 max-w-2xl">{user.bio}</p>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        {user.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{user.location}</span>
                          </div>
                        )}
                        {user.website && (
                          <a
                            href={`https://${user.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[#333366] hover:underline"
                          >
                            <Link2 className="h-4 w-4" />
                            <span>{user.website}</span>
                          </a>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Se unió en {user.joinedDate}</span>
                        </div>
                      </div>

                      {/* Social Links - Solo para creadores */}
                      {isCreator &&
                        user.social &&
                        Object.keys(user.social).length > 0 && (
                          <div className="mt-6 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600 mb-3">
                              Sigue su demás contenido en:
                            </p>
                            <div className="flex flex-wrap gap-4">
                              {user.social.youtube && (
                                <a
                                  href={`https://youtube.com/${user.social.youtube}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-gray-600 hover:text-[#FF0000] transition-colors group"
                                  title="YouTube"
                                >
                                  <Youtube className="h-7 w-7" />
                                  <span className="text-sm group-hover:underline">
                                    YouTube
                                  </span>
                                </a>
                              )}
                              {user.social.tiktok && (
                                <a
                                  href={`https://tiktok.com/${user.social.tiktok}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors group"
                                  title="TikTok"
                                >
                                  <svg
                                    className="h-7 w-7"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                  </svg>
                                  <span className="text-sm group-hover:underline">
                                    TikTok
                                  </span>
                                </a>
                              )}
                              {user.social.instagram && (
                                <a
                                  href={`https://instagram.com/${user.social.instagram}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-gray-600 hover:text-[#E4405F] transition-colors group"
                                  title="Instagram"
                                >
                                  <Instagram className="h-7 w-7" />
                                  <span className="text-sm group-hover:underline">
                                    Instagram
                                  </span>
                                </a>
                              )}
                              {user.social.linkedin && (
                                <a
                                  href={`https://linkedin.com/in/${user.social.linkedin}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-gray-600 hover:text-[#0A66C2] transition-colors group"
                                  title="LinkedIn"
                                >
                                  <Linkedin className="h-7 w-7" />
                                  <span className="text-sm group-hover:underline">
                                    LinkedIn
                                  </span>
                                </a>
                              )}
                              {user.social.facebook && (
                                <a
                                  href={`https://facebook.com/${user.social.facebook}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-gray-600 hover:text-[#1877F2] transition-colors group"
                                  title="Facebook"
                                >
                                  <Facebook className="h-7 w-7" />
                                  <span className="text-sm group-hover:underline">
                                    Facebook
                                  </span>
                                </a>
                              )}
                              {user.social.spotify && (
                                <a
                                  href={`https://open.spotify.com/user/${user.social.spotify}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-gray-600 hover:text-[#1DB954] transition-colors group"
                                  title="Spotify"
                                >
                                  <svg
                                    className="h-7 w-7"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                                  </svg>
                                  <span className="text-sm group-hover:underline">
                                    Spotify
                                  </span>
                                </a>
                              )}
                            </div>
                          </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 md:min-w-[200px]">
                      {/* Mostrar botón de editar perfil si es el perfil propio, sino botón de seguir */}
                      {isOwnProfile ? (
                        <>
                          <Button
                            onClick={() => router.push("/perfil/createPost")}
                            className="bg-[#333366] text-white hover:bg-[#333366]/90"
                          >
                            <PenSquare className="mr-2 h-4 w-4" />
                            Crear post
                          </Button>
                          <Button
                            onClick={handleOpenEditModal}
                            className="bg-[#FFCC00] text-[#333366] hover:bg-[#FFCC00]/90"
                          >
                            <UserCircle className="mr-2 h-4 w-4" />
                            Editar perfil
                          </Button>
                        </>
                      ) : (
                        <Button
                          onClick={handleFollow}
                          className={
                            isFollowing
                              ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                              : "bg-[#333366] text-white hover:bg-[#333366]/90"
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
                      )}
                      <Button
                        variant="outline"
                        onClick={handleShare}
                        className="border-gray-300"
                      >
                        <Share2 className="mr-2 h-4 w-4" />
                        Compartir
                      </Button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-6 mt-6 pt-6 border-t border-gray-200">
                    {isCreator ? (
                      <>
                        <div className="text-center">
                          <div className="text-xl md:text-2xl text-[#333366]">
                            {user.stats.posts}
                          </div>
                          <div className="text-sm text-gray-600">Artículos</div>
                        </div>
                        <div
                          className="text-center cursor-pointer hover:opacity-70 transition-opacity"
                          onClick={() => setActiveTab("followers")}
                        >
                          <div className="text-xl md:text-2xl text-[#333366]">
                            {user.stats.followers}
                          </div>
                          <div className="text-sm text-gray-600">
                            Seguidores
                          </div>
                        </div>
                        <div
                          className="text-center cursor-pointer hover:opacity-70 transition-opacity"
                          onClick={() => setActiveTab("following")}
                        >
                          <div className="text-xl md:text-2xl text-[#333366]">
                            {user.stats.following}
                          </div>
                          <div className="text-sm text-gray-600">Siguiendo</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className="text-center cursor-pointer hover:opacity-70 transition-opacity"
                          onClick={() => setActiveTab("interactions")}
                        >
                          <div className="text-xl md:text-2xl text-[#333366]">
                            {interactedPosts.length}
                          </div>
                          <div className="text-sm text-gray-600">
                            Interacciones
                          </div>
                        </div>
                        <div
                          className="text-center cursor-pointer hover:opacity-70 transition-opacity"
                          onClick={() => setActiveTab("followers")}
                        >
                          <div className="text-xl md:text-2xl text-[#333366]">
                            {user.stats.followers}
                          </div>
                          <div className="text-sm text-gray-600">
                            Seguidores
                          </div>
                        </div>
                        <div
                          className="text-center cursor-pointer hover:opacity-70 transition-opacity"
                          onClick={() => setActiveTab("following")}
                        >
                          <div className="text-xl md:text-2xl text-[#333366]">
                            {user.stats.following}
                          </div>
                          <div className="text-sm text-gray-600">Siguiendo</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full justify-start bg-white border border-gray-200 p-1">
                {isCreator ? (
                  <>
                    <TabsTrigger value="posts" className="flex-1">
                      Artículos ({userPosts.length})
                    </TabsTrigger>
                    <TabsTrigger value="followers" className="flex-1">
                      Seguidores ({user.stats.followers})
                    </TabsTrigger>
                    <TabsTrigger value="following" className="flex-1">
                      Siguiendo ({user.stats.following})
                    </TabsTrigger>
                  </>
                ) : (
                  <>
                    <TabsTrigger value="interactions" className="flex-1">
                      Interacciones ({interactedPosts.length})
                    </TabsTrigger>
                    <TabsTrigger value="followers" className="flex-1">
                      Seguidores ({user.stats.followers})
                    </TabsTrigger>
                    <TabsTrigger value="following" className="flex-1">
                      Siguiendo ({user.stats.following})
                    </TabsTrigger>
                  </>
                )}
              </TabsList>

              {/* Posts Tab - Solo para creadores */}
              {isCreator && (
                <TabsContent value="posts" className="mt-6">
                  <div className="space-y-4">
                    {userPosts.length > 0 ? (
                      userPosts.map((post) => (
                        <Card
                          key={post.id}
                          className="hover:shadow-lg transition-shadow cursor-pointer"
                          onClick={() => onPostClick?.(post.id)}
                        >
                          <CardContent className="p-6">
                            <div className="flex gap-4">
                              {post.coverImage && (
                                <div className="w-32 h-32 shrink-0 rounded-lg overflow-hidden">
                                  <ImageWithFallback
                                    src={post.coverImage}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div className="flex-1">
                                <h3 className="text-xl mb-2 hover:text-[#333366]">
                                  {post.title}
                                </h3>
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                  {post.excerpt}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-3">
                                  {post.tags.slice(0, 3).map((tag, index) => (
                                    <Badge
                                      key={index}
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>

                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <Heart className="h-4 w-4" />
                                    {post.reactions}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MessageCircle className="h-4 w-4" />
                                    {post.comments}
                                  </span>
                                  <span>{post.publishedAt}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <Card>
                        <CardContent className="p-12 text-center">
                          <p className="text-gray-500">
                            Este usuario aún no ha publicado artículos.
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>
              )}

              {/* Interactions Tab - Solo para usuarios normales */}
              {!isCreator && (
                <TabsContent value="interactions" className="mt-6">
                  <div className="space-y-4">
                    {interactedPosts.map((post) => (
                      <Card
                        key={post.id}
                        className="hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => onPostClick?.(post.id)}
                      >
                        <CardContent className="p-6">
                          <div className="flex gap-4">
                            {post.coverImage && (
                              <div className="w-32 h-32 shrink-0 rounded-lg overflow-hidden">
                                <ImageWithFallback
                                  src={post.coverImage}
                                  alt={post.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <Badge
                                variant="outline"
                                className="mb-2 text-xs border-[#FFCC00] text-[#333366]"
                              >
                                {post.interactionType}
                              </Badge>
                              <h3 className="text-xl mb-2 hover:text-[#333366]">
                                {post.title}
                              </h3>
                              <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                {post.excerpt}
                              </p>

                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Heart className="h-4 w-4" />
                                  {post.reactions}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MessageCircle className="h-4 w-4" />
                                  {post.comments}
                                </span>
                                <span>{post.publishedAt}</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              )}

              {/* Followers Tab - Para todos los usuarios */}
              <TabsContent value="followers" className="mt-6">
                <div className="space-y-4">
                  {followers.map((follower) => (
                    <Card
                      key={follower.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <Avatar
                            className="h-12 w-12 cursor-pointer"
                            onClick={() =>
                              onUserClick?.(follower.id, follower.isCreator)
                            }
                          >
                            <ImageWithFallback
                              src={follower.avatar}
                              alt={follower.name}
                              className="w-full h-full object-cover rounded-full"
                            />
                          </Avatar>
                          <div className="flex-1">
                            <h4 className="text-sm mb-1">{follower.name}</h4>
                            <p className="text-xs text-gray-600">
                              {follower.bio}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => router.push(`/comunidad/${user.id}`)}
                          >
                            Ver perfil
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Following Tab */}
              <TabsContent value="following" className="mt-6">
                <div className="space-y-4">
                  {following.map((followedUser) => (
                    <Card
                      key={followedUser.id}
                      className="hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12">
                            <ImageWithFallback
                              src={followedUser.avatar}
                              alt={followedUser.name}
                              className="w-full h-full object-cover rounded-full"
                            />
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="text-sm">{followedUser.name}</h4>
                              {followedUser.isCreator && (
                                <Crown className="h-3.5 w-3.5 text-[#FFCC00] fill-[#FFCC00]" />
                              )}
                            </div>
                            <p className="text-xs text-gray-600">
                              {followedUser.bio}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              onUserClick?.(
                                followedUser.id,
                                followedUser.isCreator
                              )
                            }
                          >
                            Ver perfil
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Donation Card - Solo para creadores */}
            {isCreator && (
              <Card className="bg-linear-to-br from-[#FFCC00]/10 to-[#FFCC00]/5 border-[#FFCC00]/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="h-5 w-5 text-[#333366]" />
                    <h3 className="text-lg text-[#333366]">
                      Apoya a {user.name.split(" ")[0]}
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
                      <div className="flex gap-2 mb-3">
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
            )}

            {/* About Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg mb-4 text-[#333366]">
                  Sobre {user.name.split(" ")[0]}
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-600">Miembro desde:</span>
                    <p className="text-[#333366]">{user.joinedDate}</p>
                  </div>
                  <Separator />
                  {isCreator ? (
                    <>
                      <div>
                        <span className="text-gray-600">
                          Total de artículos:
                        </span>
                        <p className="text-[#333366]">
                          {user.stats.posts} publicaciones
                        </p>
                      </div>
                      <Separator />
                    </>
                  ) : (
                    <>
                      <div>
                        <span className="text-gray-600">Interacciones:</span>
                        <p className="text-[#333366]">
                          {interactedPosts.length} artículos
                        </p>
                      </div>
                      <Separator />
                    </>
                  )}
                  <div>
                    <span className="text-gray-600">Comunidad:</span>
                    <p className="text-[#333366]">
                      {user.stats.followers + user.stats.following} conexiones
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contribution Card - Solo para creadores */}
            {isCreator && (
              <Card className="bg-linear-to-br from-[#333366] to-[#5a5a8a] text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg mb-3">Impacto en la Comunidad</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-200">
                        Reacciones totales
                      </span>
                      <span className="text-xl">
                        {userPosts.reduce(
                          (acc, post) => acc + post.reactions,
                          0
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-200">
                        Comentarios recibidos
                      </span>
                      <span className="text-xl">
                        {userPosts.reduce(
                          (acc, post) => acc + post.comments,
                          0
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-200">
                        Alcance estimado
                      </span>
                      <span className="text-xl">
                        {(
                          user.stats.followers * userPosts.length
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* CTA - Solo mostrar si NO está autenticado */}
            {!currentUser && (
              <>
                {isCreator ? (
                  <Card className="bg-linear-to-br from-[#FFCC00] via-[#FFCC00]/95 to-[#FFD633] border-0 text-[#333366]">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-4xl mb-3">🚀</div>
                        <h3 className="text-lg mb-3">
                          {user.name} ya forma parte de la comunidad de
                          creadores de contenido
                        </h3>
                        <p className="text-sm mb-6 text-[#333366]/90">
                          Tú también puedes hacerlo uniéndote al Programa de
                          Creadores de Babelink
                        </p>
                        <Button
                          className="w-full bg-[#333366] hover:bg-[#333366]/90 text-white"
                          onClick={() => router.push("/creadores")}
                        >
                          Únete al Programa
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-linear-to-br from-[#E2E3F7] to-[#F6CBCA] border-0 text-[#333366]">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-4xl mb-3">📬</div>
                        <h3 className="text-lg mb-3">
                          {user.name} ya es parte de la comunidad como
                          suscriptor
                        </h3>
                        <p className="text-sm mb-6 text-[#333366]/90">
                          Tú también hazlo, suscríbete a la comunidad
                        </p>
                        <Button
                          className="w-full bg-[#333366] hover:bg-[#333366]/90 text-white"
                          onClick={() => setShowSubscriptionModal(true)}
                        >
                          Iniciar sesión
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Creador Verificado */}
      <Dialog open={showVerifiedModal} onOpenChange={setShowVerifiedModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="bg-[#FFCC00]/20 p-4 rounded-full">
                <Crown className="h-12 w-12 text-[#FFCC00] fill-[#FFCC00]" />
              </div>
            </div>
            <DialogTitle className="text-center text-2xl">
              Creador Verificado
            </DialogTitle>
            <DialogDescription asChild>
              <div className="text-center pt-4 space-y-4">
                <p className="text-base text-gray-700">
                  <span className="font-semibold text-[#333366]">
                    {user.name}
                  </span>{" "}
                  ya forma parte de los creadores verificados de Babelink.
                </p>
                <p className="text-sm text-gray-600">
                  Los creadores verificados tienen acceso a herramientas
                  exclusivas, mentoría personalizada y una comunidad activa de
                  profesionales del contenido.
                </p>
                <div className="bg-[#E2E3F7] p-4 rounded-lg mt-4">
                  <p className="text-sm text-[#333366]">
                    <strong>¡Tú también puedes hacerlo!</strong>
                    <br />
                    Únete al Programa de Creadores de Babelink y lleva tu
                    contenido al siguiente nivel.
                  </p>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 mt-4">
            <Button
              className="w-full bg-[#333366] hover:bg-[#333366]/90 text-white"
              onClick={() => router.push("/preregistro")}
            >
              Conocer el Programa de Creadores
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowVerifiedModal(false)}
            >
              Cerrar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Suscripción */}
      <LoginModal
        open={showSubscriptionModal}
        onOpenChange={setShowSubscriptionModal}
      />

      {/* Modal de Edición de Perfil */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Editar perfil</DialogTitle>
            <DialogDescription>
              Actualiza tu información personal y de redes sociales
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Foto de Portada */}
            <div>
              <Label className="text-sm mb-2 block">Foto de portada</Label>
              <div
                className="relative h-32 rounded-lg overflow-hidden bg-linear-to-r from-[#333366] to-[#5a5a8a] group cursor-pointer"
                onClick={() => handleImageUpload("cover")}
              >
                {editForm.coverImage && (
                  <ImageWithFallback
                    src={editForm.coverImage}
                    alt="Portada"
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-white text-center">
                    <Camera className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Cambiar portada</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Foto de Perfil */}
            <div>
              <Label className="text-sm mb-2 block">Foto de perfil</Label>
              <div className="flex items-center gap-4">
                <div
                  className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-[#FFCC00] group cursor-pointer"
                  onClick={() => handleImageUpload("avatar")}
                >
                  <ImageWithFallback
                    src={editForm.avatar}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleImageUpload("avatar")}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Subir foto
                  </Button>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG o GIF (máx. 5MB)
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Información Personal */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre completo</Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <Label htmlFor="bio">Biografía</Label>
                <Textarea
                  id="bio"
                  value={editForm.bio}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value.length <= 500) {
                      setEditForm((prev) => ({ ...prev, bio: value }));
                    }
                  }}
                  placeholder="Cuéntanos sobre ti..."
                  rows={4}
                  className="resize-none"
                  maxLength={500}
                />
                <p
                  className={`text-xs mt-1 ${
                    editForm.bio.length >= 500
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {editForm.bio.length}/500 caracteres
                </p>
              </div>

              <div>
                <Label htmlFor="specialty">
                  <Sparkles className="h-4 w-4 inline mr-1 text-[#FFCC00]" />
                  Especialidad
                </Label>
                <Input
                  id="specialty"
                  value={editForm.specialty}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      specialty: e.target.value,
                    }))
                  }
                  placeholder="ej: IA y Creación de Contenido Digital"
                />
                <p className="text-xs text-gray-500 mt-1">
                  ¿En qué eres especialista? (opcional)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Ubicación
                  </Label>
                  <Input
                    id="location"
                    value={editForm.location}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    placeholder="Tu ciudad, país"
                  />
                </div>

                <div>
                  <Label htmlFor="website">
                    <Link2 className="h-4 w-4 inline mr-1" />
                    Sitio web
                  </Label>
                  <Input
                    id="website"
                    value={editForm.website}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        website: e.target.value,
                      }))
                    }
                    placeholder="tusitio.com"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Redes Sociales */}
            <div>
              <h3 className="text-sm mb-4">Redes sociales</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Youtube className="h-5 w-5 text-[#FF0000]" />
                  <Input
                    value={editForm.social.youtube}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        social: { ...prev.social, youtube: e.target.value },
                      }))
                    }
                    placeholder="@tucanal"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Instagram className="h-5 w-5 text-[#E4405F]" />
                  <Input
                    value={editForm.social.instagram}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        social: { ...prev.social, instagram: e.target.value },
                      }))
                    }
                    placeholder="tuusuario"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Linkedin className="h-5 w-5 text-[#0A66C2]" />
                  <Input
                    value={editForm.social.linkedin}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        social: { ...prev.social, linkedin: e.target.value },
                      }))
                    }
                    placeholder="tu-perfil"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Facebook className="h-5 w-5 text-[#1877F2]" />
                  <Input
                    value={editForm.social.facebook}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        social: { ...prev.social, facebook: e.target.value },
                      }))
                    }
                    placeholder="tu.perfil"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                  <Input
                    value={editForm.social.tiktok}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        social: { ...prev.social, tiktok: e.target.value },
                      }))
                    }
                    placeholder="@tuusuario"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <svg
                    className="h-5 w-5 text-[#1DB954]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  <Input
                    value={editForm.social.spotify}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        social: { ...prev.social, spotify: e.target.value },
                      }))
                    }
                    placeholder="tuusuario"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => setShowEditModal(false)}
              className="flex-1"
            >
              <XIcon className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button
              onClick={handleSaveProfile}
              className="flex-1 bg-[#FFCC00] text-[#333366] hover:bg-[#FFCC00]/90"
            >
              <Save className="h-4 w-4 mr-2" />
              Guardar cambios
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
