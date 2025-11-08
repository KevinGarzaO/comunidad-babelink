import { Button } from "./ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { LoginModal } from "./LoginModal";

interface HeroProps {
  onNavigate?: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <section className="bg-linear-to-br from-[#333366] via-[#333366] to-[#4a4a7a] text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-[#FFCC00] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#E2E3F7] rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-28 lg:py-32 relative">
          <div className="max-w-4xl mx-auto text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFCC00] text-[#333366] rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm">Blog de Innovación</span>
            </div>
            <h1 className="mb-6 text-4xl md:text-5xl lg:text-6xl">
              Tu fuente de conocimiento en IA, Tecnología, Marketing y Negocios
            </h1>
            <p className="mb-8 text-[#E2E3F7] text-lg md:text-xl max-w-2xl mx-auto lg:mx-0">
              Descubre las últimas tendencias, estrategias y conocimientos que
              transformarán tu forma de hacer negocios en la era digital.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
              <Button
                className="bg-[#FFCC00] hover:bg-[#FFCC00]/90 text-[#333366] px-8 py-6 text-lg"
                onClick={() => onNavigate?.("comunidad")}
              >
                Explorar Artículos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>
      <LoginModal
        open={isLoginOpen}
        onOpenChange={setIsLoginOpen}
        onNavigate={onNavigate}
      />
    </>
  );
}
