"use client";

import { useRouter, usePathname } from "next/navigation"; // 👈 Importa estos
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
import { Search, Menu, X, ChevronDown, LogOut, UserCircle } from "lucide-react";

interface HeaderProps {
  showSearch?: boolean;
}

export function Header({ showSearch = true }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname(); // 👈 Saber en qué página estás
  const { user, logout, isAuthenticated } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada", {
      description: "Has cerrado sesión exitosamente",
    });
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
          <Image
            src={"/images/Logo Babelink/Logo en SVG (3).svg"}
            alt="Babelink"
            width={120}
            height={48}
            className="h-10 md:h-12 w-auto"
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
          {showSearch && (
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </Button>
          )}

          {isAuthenticated ? (
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
          ) : pathname.startsWith("/creadores") ? (
            <Button
              className="hidden md:flex bg-[#FFCC00] hover:bg-[#FFCC00]/90 text-[#333366]"
              onClick={() =>
                console.log("Redirigir a la suscripción o checkout")
              }
            >
              Únete por $54 (6 meses)
            </Button>
          ) : (
            <Button
              className="hidden md:flex bg-[#FFCC00] hover:bg-[#FFCC00]/90 text-[#333366]"
              onClick={() => setIsLoginOpen(true)}
            >
              Iniciar sesión
            </Button>
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
                    src={"/images/Logo Babelink/Logo en SVG (3).svg"}
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
