"use client";

import { Facebook, Instagram, Youtube } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function Footer() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();

  const handleNavigation = (path: string) => {
    router.push(path);
    window.scrollTo({ top: 0, behavior: "smooth" }); // 👈 opcional: scroll al inicio
  };

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-10 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src={"/images/Logo Babelink/Logo en SVG (3).svg"}
              alt="Babelink"
              width={120}
              height={40}
              className="h-10 w-auto mb-4"
            />
            <p className="text-gray-600 text-sm mb-4 max-w-xs">
              Tu fuente confiable de conocimiento en IA, Tecnología, Marketing y
              Negocios.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/BabelinkIA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#E2E3F7] rounded-full flex items-center justify-center hover:bg-[#FFCC00] transition-all duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 text-[#333366]" />
              </a>
              <a
                href="https://www.instagram.com/babelink.ia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#E2E3F7] rounded-full flex items-center justify-center hover:bg-[#FFCC00] transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 text-[#333366]" />
              </a>
              <a
                href="https://www.youtube.com/@babelink_ia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#E2E3F7] rounded-full flex items-center justify-center hover:bg-[#FFCC00] transition-all duration-300"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4 text-[#333366]" />
              </a>
              <a
                href="https://www.tiktok.com/@babelink.ia"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-[#E2E3F7] rounded-full flex items-center justify-center hover:bg-[#FFCC00] transition-all duration-300"
                aria-label="TikTok"
              >
                <FaTiktok className="h-4 w-4 text-[#333366]" />
              </a>
            </div>
          </div>

          {/* Navegación Principal */}
          <div>
            <h4 className="mb-4 text-[#333366]">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavigation("/")}
                  className="text-gray-600 hover:text-[#FFCC00] transition-colors"
                >
                  Inicio / Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/comunidad")}
                  className="text-gray-600 hover:text-[#FFCC00] transition-colors"
                >
                  Comunidad
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/cursos")}
                  className="text-gray-600 hover:text-[#FFCC00] transition-colors"
                >
                  Cursos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/creadores")}
                  className="text-gray-600 hover:text-[#FFCC00] transition-colors"
                >
                  Programa de Creadores
                </button>
              </li>
            </ul>
          </div>

          {/* Comunidad */}
          <div>
            <h4 className="mb-4 text-[#333366]">Comunidad</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavigation("/guia")}
                  className="text-gray-600 hover:text-[#FFCC00] transition-colors"
                >
                  Guía de la comunidad
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/conducta")}
                  className="text-gray-600 hover:text-[#FFCC00] transition-colors"
                >
                  Código de conducta
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/faqs")}
                  className="text-gray-600 hover:text-[#FFCC00] transition-colors"
                >
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-[#333366]">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavigation("/privacidad")}
                  className="text-gray-600 hover:text-[#FFCC00] transition-colors"
                >
                  Política de Privacidad
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/terminos")}
                  className="text-gray-600 hover:text-[#FFCC00] transition-colors"
                >
                  Términos de Uso
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/cookies")}
                  className="text-gray-600 hover:text-[#FFCC00] transition-colors"
                >
                  Cookies
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>© {currentYear} Babelink. Todos los derechos reservados.</p>
            <p className="text-center md:text-right">
              Impulsando a creadores de contenido con IA, creatividad y
              colaboración
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
