import { Button } from "./ui/button";
import { Mail } from "lucide-react";
import { useState } from "react";
import { LoginModal } from "./LoginModal";
import { useAuth } from "../src/contexts/AuthContext";

export function Newsletter() {
  const { user: currentUser } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // No mostrar la sección si el usuario ya está autenticado
  if (currentUser) {
    return null;
  }

  return (
    <>
      <section className="bg-linear-to-br from-[#333366] to-[#4a4a7a] text-white py-12 md:py-16 lg:py-20 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFCC00] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E2E3F7] rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FFCC00] rounded-full mb-6">
              <Mail className="h-8 w-8 text-[#333366]" />
            </div>
            <h2 className="mb-4">Mantente actualizado</h2>
            <p className="text-[#E2E3F7] mb-8 text-base md:text-lg max-w-2xl mx-auto">
              Recibe las últimas noticias, artículos y recursos directamente en
              tu bandeja de entrada cada semana
            </p>

            <div className="flex justify-center max-w-xl mx-auto">
              <Button
                onClick={() => setIsLoginOpen(true)}
                className="bg-[#FFCC00] hover:bg-[#FFCC00]/90 text-[#333366]"
              >
                Iniciar sesión
              </Button>
            </div>

            <p className="text-sm text-[#E2E3F7] mt-4">
              Sin spam. Cancela tu suscripción en cualquier momento.
            </p>
          </div>
        </div>
      </section>
      {/* Login Modal */}
      <LoginModal open={isLoginOpen} onOpenChange={setIsLoginOpen} />
    </>
  );
}
