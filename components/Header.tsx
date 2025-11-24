"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { useAuth } from "../src/contexts/AuthContext";
import { LoginModal } from "./LoginModal";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Menu, ChevronDown, LogOut, UserCircle } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseMessaging";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("babelink_user");

      toast.success("Sesión cerrada", {
        description: "Has cerrado sesión exitosamente",
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("Hubo un problema al cerrar la sesión.");
    }
  };

  const mainNavLinks = [
    { id: "inicio", label: "Inicio", path: "/" },
    { id: "comunidad", label: "Comunidad", path: "/comunidad" },
    { id: "cursos", label: "Cursos", path: "/cursos" },
    { id: "creadores", label: "Creadores", path: "/creadores" },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
    setIsOpen(false);
  };

  return (
    <header className="border-b border-gray-100 sticky top-0 bg-white z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* LOGO */}
        <button onClick={() => handleNavigation("/")} className="shrink-0">
          {/* LOGO MOBILE */}
          <Image
            src="/images/Logo Babelink/Logo sin fondo para uso general (2).png"
            alt="Babelink"
            width={120}
            height={48}
            className="h-10 w-auto md:hidden"
          />

          {/* LOGO DESKTOP */}
          <Image
            src="/images/Logo Babelink/Logo en SVG (3).svg"
            alt="Babelink"
            width={140}
            height={48}
            className="h-10 md:h-12 w-auto hidden md:block"
          />
        </button>

        {/* NAVIGATION DESKTOP */}
        <nav className="hidden lg:flex items-center gap-6">
          {mainNavLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavigation(link.path)}
              className={`hover:text-[#FFCC00] transition-colors ${
                pathname === link.path ? "text-[#FFCC00]" : ""
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* SEARCH & PROFILE */}
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <>
              {/* AVATAR DESKTOP */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hidden md:flex items-center gap-2 hover:opacity-80">
                    <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-[#FFCC00]">
                      <ImageWithFallback
                        src={user?.avatar || ""}
                        alt={user?.name || "Usuario"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm max-w-[100px] truncate">
                      {user?.name}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/perfil")}>
                    <UserCircle className="mr-2 h-4 w-4" />
                    <span>Ver mi perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* AVATAR MÓVIL */}
              <button
                onClick={() => router.push("/perfil")}
                className="md:hidden h-10 w-10 rounded-full overflow-hidden border-2 border-[#FFCC00]"
              >
                <ImageWithFallback
                  src={user?.avatar || ""}
                  alt={user?.name || "Usuario"}
                  className="w-full h-full object-cover"
                />
              </button>
            </>
          ) : pathname.startsWith("/creadores") ? (
            <>
              {/* BOTÓN DESKTOP */}
              <Button
                className="hidden md:flex bg-[#FFCC00] hover:bg-[#FFCC00]/90 text-[#333366]"
                onClick={() => router.push("/preregistro")}
              >
                Únete por $54 (6 meses)
              </Button>

              {/* BOTÓN MÓVIL */}
              <Button
                className="md:hidden bg-[#FFCC00] hover:bg-[#FFCC00]/90 text-[#333366] px-3 py-1 text-sm"
                onClick={() => router.push("/preregistro")}
              >
                Unirme
              </Button>
            </>
          ) : (
            <>
              {/* BOTÓN DESKTOP */}
              <Button
                className="hidden md:flex bg-[#FFCC00] hover:bg-[#FFCC00]/90 text-[#333366]"
                onClick={() => setIsLoginOpen(true)}
              >
                Iniciar sesión
              </Button>

              {/* BOTÓN MÓVIL */}
              <Button
                className="md:hidden bg-[#FFCC00] hover:bg-[#FFCC00]/90 text-[#333366] px-3 py-1 text-sm"
                onClick={() => setIsLoginOpen(true)}
              >
                Entrar
              </Button>
            </>
          )}

          {/* MENU MÓVIL */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>
                  <Image
                    src="/images/Logo Babelink/Logo en SVG (3).svg"
                    alt="Babelink"
                    width={120}
                    height={40}
                  />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                {mainNavLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavigation(link.path)}
                    className={`text-lg py-2 hover:text-[#FFCC00] border-b border-gray-100 text-left ${
                      pathname === link.path ? "text-[#FFCC00]" : ""
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* LOGIN MODAL */}
      <LoginModal open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </header>
  );
}
