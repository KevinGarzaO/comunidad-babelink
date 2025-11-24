"use client";

import { useEffect, useMemo, useState } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
  setDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebaseMessaging";
import { UserProfile } from "../src/data/userData";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface UserProfileProps {
  userId?: string;
  onPostClick?: (postId: number) => void;
  onUserClick?: (userId: number) => void;
}

export function UserProfileComponente({
  userId,
  onPostClick,
  onUserClick,
}: UserProfileProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isCreator = true;
  const { user: currentUser } = useAuth();
  const isOwnProfile = !userId || userId === currentUser?.id;
  const [_user, setUser] = useState<UserProfile | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState(
    isCreator ? "posts" : "interactions"
  );
  const [donationAmount, setDonationAmount] = useState<number>(5);
  const [showVerifiedModal, setShowVerifiedModal] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Estados para el formulario de edición
  const [editForm, setEditForm] = useState({
    name: "",
    username: "",
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

  const getUserByUsername = async (
    username: string
  ): Promise<UserProfile | null> => {
    const q = query(
      collection(db, "usuarios"),
      where("username", "==", username)
    );
    const snapshot = await getDocs(q);

    if (snapshot.empty) return null;

    const docSnap = snapshot.docs[0];
    const data = docSnap.data() as DocumentData;

    // Convertimos los timestamps a Date o strings si es necesario
    return {
      id: docSnap.id,
      name: data.name || "",
      username: data.username || "",
      email: data.email || "",
      avatar: data.avatar || "",
      coverImage: data.cover || null,
      specialty: data.specialty || "",
      bio: data.bio || "",
      location: data.location || null,
      website: data.website || null,
      joinedDate: data.joinedDate || "",
      stats: {
        posts: data.stats?.posts || 0,
        followers: data.stats?.followers || 0,
        following: data.stats?.following || 0,
      },
      social: data.social || {},
      badges: data.badges || [],
      isVerified: data.isVerified || false,
      createdOn: data.createdOn || null,
      updatedOn: data.updatedOn || null,
      lastAccess: data.lastAccess || null,
    };
  };

  useEffect(() => {
    // Solo ejecuta si hay userId
    if (!userId) return;

    const loadUser = async () => {
      try {
        const data = await getUserByUsername(userId);
        if (data) {
          setUser(data);
        }
      } catch (error) {
        console.error("Error cargando usuario:", error);
      }
    };

    loadUser();
  }, [userId]); // se ejecuta cuando userId cambia

  useEffect(() => {
    if (isOwnProfile && currentUser) {
      // retrasamos la actualización de estado para evitar el warning
      const timer = setTimeout(() => {
        setUser({
          ...currentUser,
          avatar: currentUser.avatar || "",
          coverImage: currentUser.coverImage || "",
          location: currentUser.location || "",
          website: currentUser.website || "",
          bio: currentUser.bio || "Miembro de la comunidad Babelink",
          social: {
            youtube: currentUser.social?.youtube || "",
            tiktok: currentUser.social?.tiktok || "",
            instagram: currentUser.social?.instagram || "",
            linkedin: currentUser.social?.linkedin || "",
            facebook: currentUser.social?.facebook || "",
            spotify: currentUser.social?.spotify || "",
          },
          stats: currentUser.stats || { posts: 0, followers: 0, following: 0 },
          badges: currentUser.badges || [],
        });
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [currentUser, isOwnProfile]);

  // Inicializar user cuando carga currentUser o _user
  const displayedUser = useMemo<UserProfile | null>(() => {
    if (!_user) return null; // si no hay usuario cargado
    return {
      ..._user,
      avatar: _user.avatar || "", // aseguramos que no sea null
      coverImage: _user.coverImage || "",
      location: _user.location || "",
      website: _user.website || "",
      bio: _user.bio || "Miembro de la comunidad Babelink",
      social: {
        youtube: _user.social?.youtube || "",
        tiktok: _user.social?.tiktok || "",
        instagram: _user.social?.instagram || "",
        linkedin: _user.social?.linkedin || "",
        facebook: _user.social?.facebook || "",
        spotify: _user.social?.spotify || "",
      },
      stats: _user.stats || { posts: 0, followers: 0, following: 0 },
      badges: _user.badges || [],
    };
  }, [_user]);

  // Posts del usuario
  const userPosts = communityPosts.filter(
    (post) => post.author.name === displayedUser?.name
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
    },
    {
      id: 102,
      name: "Ana Martínez",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
      bio: "Diseñadora UX/UI",
    },
    {
      id: 103,
      name: "Pedro López",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      bio: "Marketing Digital",
    },
  ];

  const following = [
    {
      id: 1,
      name: "María González",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      bio: "Especialista en IA",
    },
    {
      id: 104,
      name: "Laura Sánchez",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
      bio: "Content Creator",
    },
    {
      id: 105,
      name: "Diego Fernández",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
      bio: "Data Scientist",
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
        `¡Gracias por tu donación de $${donationAmount}! Este apoyo ayuda a ${displayedUser?.name} a seguir creando contenido.`
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
    if (!_user) return;

    setEditForm({
      name: _user.name || "",
      username: _user.username || "",
      bio: _user.bio || "",
      specialty: _user.specialty || "",
      location: _user.location || "",
      website: _user.website || "",
      avatar: _user.avatar || "",
      coverImage: _user.coverImage || "",
      social: {
        youtube: _user.social?.youtube || "",
        tiktok: _user.social?.tiktok || "",
        instagram: _user.social?.instagram || "",
        linkedin: _user.social?.linkedin || "",
        facebook: _user.social?.facebook || "",
        spotify: _user.social?.spotify || "",
      },
    });

    setShowEditModal(true);
  };

  // Abrir modal solo una vez y llenar editForm sin causar render en cascada
  useEffect(() => {
    if (isOwnProfile && _user && searchParams.get("edit") === "t") {
      // Ejecutar de forma asíncrona para evitar el warning de React
      const timer = setTimeout(() => {
        handleOpenEditModal();

        // Limpiar el query param para que no vuelva a disparar el efecto
        const url = new URL(window.location.href);
        url.searchParams.delete("edit");
        window.history.replaceState({}, "", url.toString());
      }, 0);

      return () => clearTimeout(timer); // limpiar si el efecto se desmonta
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_user, isOwnProfile, searchParams]);

  // Guardar cambios
  const handleSaveProfile = async () => {
    if (!currentUser?.id) return;

    const updateData = {
      ...editForm,
      updatedOn: serverTimestamp(),
    };

    try {
      const userRef = doc(db, "usuarios", currentUser.id);
      await setDoc(userRef, updateData, { merge: true });

      // Actualizar estado local para reflejar cambios en la UI
      setUser((prev) => (prev ? { ...prev, ...updateData } : null));

      toast.success("Perfil actualizado correctamente");
      router.replace("/perfil"); // Remover query param
      setShowEditModal(false);
    } catch (error) {
      console.error("Error actualizando perfil:", error);
      toast.error("No se pudo actualizar el perfil");
    }
  };

  // Subir imagen y actualizar estado + Firestore
  const handleImageUpload = async (type: "avatar" | "cover") => {
    if (!currentUser?.id) return;

    const field = type === "cover" ? "coverImage" : type;

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        // ⬇️ Aquí ya usas el storage centralizado
        const storageRef = ref(
          storage,
          `users/${currentUser.id}/${field}-${Date.now()}-${file.name}`
        );

        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        // Guardar en Firestore
        const userRef = doc(db, "usuarios", currentUser.id);
        await updateDoc(userRef, {
          [field]: downloadURL,
          updatedOn: serverTimestamp(),
        });

        // Actualizar estado
        setUser((prev) => (prev ? { ...prev, [field]: downloadURL } : prev));
        setEditForm((prev) => ({ ...prev, [field]: downloadURL }));

        toast.success(
          `${
            type === "avatar" ? "Avatar" : "Portada"
          } actualizado correctamente`
        );
      } catch (error) {
        console.error("Error al subir imagen:", error);
        toast.error("Error al subir la imagen");
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
            src={
              displayedUser?.coverImage ??
              "https://demofree.sirv.com/nope-not-here.jpg"
            }
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
                      src={
                        displayedUser?.avatar ||
                        "https://demofree.sirv.com/nope-not-here.jpg"
                      }
                      alt={displayedUser?.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </Avatar>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h1 className="text-2xl md:text-3xl">
                          {displayedUser?.name}
                        </h1>
                        {displayedUser?.isVerified && (
                          <button
                            onClick={() => setShowVerifiedModal(true)}
                            className="hover:scale-110 transition-transform cursor-pointer"
                            title="Creador Verificado del Programa"
                          >
                            <Crown className="h-6 w-6 text-[#FFCC00] fill-[#FFCC00]" />
                          </button>
                        )}
                      </div>
                      <p className="text-gray-500 mb-3">
                        @{displayedUser?.username}
                      </p>

                      {/* Badges - Solo para creadores */}
                      {isCreator &&
                        displayedUser?.badges &&
                        displayedUser?.badges.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {displayedUser?.badges.map((badge, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className={`bg-[#E2E3F7] text-[#333366] flex items-center gap-1.5 ${
                                  badge === "Creador Verificado"
                                    ? "cursor-pointer hover:bg-[#d4d5e9] transition-colors"
                                    : ""
                                }`}
                                onClick={() =>
                                  badge === "Creador Verificado" &&
                                  setShowVerifiedModal(true)
                                }
                              >
                                {(badge === "Creador Verificado" ||
                                  badge === "Creadora Verificada") && (
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
                      {displayedUser?.specialty && (
                        <div className="mb-3">
                          <p className="text-[#333366] flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-[#FFCC00]" />
                            <span className="text-sm">Especialista en:</span>
                            <span>{displayedUser?.specialty}</span>
                          </p>
                        </div>
                      )}

                      <p className="text-gray-700 mb-4 max-w-2xl">
                        {displayedUser?.bio}
                      </p>

                      {/* Meta Info */}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        {displayedUser?.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{displayedUser?.location}</span>
                          </div>
                        )}
                        {displayedUser?.website && (
                          <a
                            href={`https://${displayedUser?.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-[#333366] hover:underline"
                          >
                            <Link2 className="h-4 w-4" />
                            <span>{displayedUser?.website}</span>
                          </a>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Se unió en{" "}
                            {displayedUser?.joinedDate
                              ? new Date(displayedUser?.joinedDate)
                                  .toLocaleDateString("es-MX", {
                                    year: "numeric",
                                    month: "long",
                                  })
                                  .replace(/^\w/, (c) => c.toUpperCase())
                              : "Desconocido"}
                          </span>
                        </div>
                      </div>

                      {/* Social Links - Solo para creadores */}
                      {isCreator &&
                        displayedUser?.social &&
                        Object.keys(displayedUser?.social).length > 0 && (
                          <div className="mt-6 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600 mb-3">
                              Sigue su demás contenido en:
                            </p>
                            <div className="flex flex-wrap gap-4">
                              {displayedUser?.social.youtube && (
                                <a
                                  href={`https://youtube.com/${displayedUser?.social.youtube}`}
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
                              {displayedUser?.social.tiktok && (
                                <a
                                  href={`https://tiktok.com/${displayedUser?.social.tiktok}`}
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
                              {displayedUser?.social.instagram && (
                                <a
                                  href={`https://instagram.com/${displayedUser?.social.instagram}`}
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
                              {displayedUser?.social.linkedin && (
                                <a
                                  href={`https://linkedin.com/in/${displayedUser?.social.linkedin}`}
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
                              {displayedUser?.social.facebook && (
                                <a
                                  href={`https://facebook.com/${displayedUser?.social.facebook}`}
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
                              {displayedUser?.social.spotify && (
                                <a
                                  href={`https://open.spotify.com/user/${displayedUser?.social.spotify}`}
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
                            {displayedUser?.stats.posts}
                          </div>
                          <div className="text-sm text-gray-600">Artículos</div>
                        </div>
                        <div
                          className="text-center cursor-pointer hover:opacity-70 transition-opacity"
                          onClick={() => setActiveTab("followers")}
                        >
                          <div className="text-xl md:text-2xl text-[#333366]">
                            {displayedUser?.stats.followers}
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
                            {displayedUser?.stats.following}
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
                            {displayedUser?.stats.followers}
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
                            {displayedUser?.stats.following}
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
                      Seguidores ({displayedUser?.stats.followers})
                    </TabsTrigger>
                    <TabsTrigger value="following" className="flex-1">
                      Siguiendo ({displayedUser?.stats.following})
                    </TabsTrigger>
                  </>
                ) : (
                  <>
                    <TabsTrigger value="interactions" className="flex-1">
                      Interacciones ({interactedPosts.length})
                    </TabsTrigger>
                    <TabsTrigger value="followers" className="flex-1">
                      Seguidores ({displayedUser?.stats.followers})
                    </TabsTrigger>
                    <TabsTrigger value="following" className="flex-1">
                      Siguiendo ({displayedUser?.stats.following})
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
                                    src={
                                      post.coverImage ||
                                      "https://demofree.sirv.com/nope-not-here.jpg"
                                    }
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
                                  src={
                                    post.coverImage ||
                                    "https://demofree.sirv.com/nope-not-here.jpg"
                                  }
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
                            onClick={() => onUserClick?.(follower.id)}
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
                            onClick={() =>
                              router.push(`/comunidad/${displayedUser?.id}`)
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
                              <Crown className="h-3.5 w-3.5 text-[#FFCC00] fill-[#FFCC00]" />
                            </div>
                            <p className="text-xs text-gray-600">
                              {followedUser.bio}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onUserClick?.(followedUser.id)}
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
            {!isOwnProfile && (
              <Card className="bg-linear-to-br from-[#FFCC00]/10 to-[#FFCC00]/5 border-[#FFCC00]/20">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <DollarSign className="h-5 w-5 text-[#333366]" />
                    <h3 className="text-lg text-[#333366]">
                      Apoya a {displayedUser?.name}
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
            {!isOwnProfile && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg mb-4 text-[#333366]">
                    Sobre {displayedUser?.name}
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-600">Miembro desde:</span>
                      <p className="text-[#333366]">
                        {displayedUser?.joinedDate
                          ? new Date(displayedUser?.joinedDate)
                              .toLocaleDateString("es-MX", {
                                year: "numeric",
                                month: "long",
                              })
                              .replace(/^\w/, (c) => c.toUpperCase())
                          : "Desconocido"}
                      </p>
                    </div>
                    <Separator />
                    {isCreator ? (
                      <>
                        <div>
                          <span className="text-gray-600">
                            Total de artículos:
                          </span>
                          <p className="text-[#333366]">
                            {displayedUser?.stats.posts} publicaciones
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
                        {(displayedUser?.stats?.followers ?? 0) +
                          (displayedUser?.stats?.following ?? 0)}{" "}
                        conexiones
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            {/* Contribution Card - Solo para creadores */}
            <Card className="bg-linear-to-br from-[#333366] to-[#5a5a8a] text-white">
              <CardContent className="p-6">
                <h3 className="text-lg mb-3">Impacto en la Comunidad</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">
                      Reacciones totales
                    </span>
                    <span className="text-xl">
                      {userPosts.reduce((acc, post) => acc + post.reactions, 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">
                      Comentarios recibidos
                    </span>
                    <span className="text-xl">
                      {userPosts.reduce((acc, post) => acc + post.comments, 0)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-200">
                      Alcance estimado
                    </span>
                    <span className="text-xl">
                      {(
                        (displayedUser?.stats?.followers ?? 0) *
                        (userPosts?.length ?? 0)
                      ).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA - Solo mostrar si NO está autenticado */}
            {!isOwnProfile && displayedUser?.isVerified && (
              <>
                {isCreator ? (
                  <Card className="bg-linear-to-br from-[#FFCC00] via-[#FFCC00]/95 to-[#FFD633] border-0 text-[#333366]">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-4xl mb-3">🚀</div>
                        <h3 className="text-lg mb-3">
                          {displayedUser?.name} ya forma parte de la comunidad
                          de creadores de contenido
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
                          {displayedUser?.name} ya es parte de la comunidad como
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
                    {displayedUser?.name}
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
              onClick={() => router.push("/creadores")}
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
                    src={
                      editForm.coverImage ||
                      "https://demofree.sirv.com/nope-not-here.jpg"
                    }
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
                <Label htmlFor="username">Nombre de Usuario</Label>
                <Input
                  id="username"
                  value={editForm.username}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  placeholder="Tu nombre de usuario"
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
