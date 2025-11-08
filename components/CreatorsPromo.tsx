import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Sparkles, Users, Video, ArrowRight, Check } from "lucide-react";

interface CreatorsPromoProps {
  onNavigate: (page: string) => void;
}

export function CreatorsPromo({ onNavigate }: CreatorsPromoProps) {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-[#333366] via-[#4a4a7a] to-[#333366] text-white relative overflow-hidden">
      {/* Patrón de fondo */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHptLTQgMjhjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      
      {/* Elementos decorativos */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#FFCC00] rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#F6CBCA] rounded-full blur-3xl opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contenido */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFCC00] text-[#333366]">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm">Programa Exclusivo de 6 Meses</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl">
              Únete al Programa de Creadores de Babelink 🚀
            </h2>
            
            <p className="text-xl text-gray-200">
              Transforma tu creatividad con IA en 6 meses. 25 sesiones prácticas, mentorías, networking y una comunidad que impulsa tu crecimiento profesional.
            </p>
            
            {/* Beneficios rápidos */}
            <div className="space-y-3 pt-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#FFCC00]/20 flex items-center justify-center flex-shrink-0">
                  <Check className="h-5 w-5 text-[#FFCC00]" />
                </div>
                <span className="text-lg">25 sesiones en vivo de 1-2 horas</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#FFCC00]/20 flex items-center justify-center flex-shrink-0">
                  <Check className="h-5 w-5 text-[#FFCC00]" />
                </div>
                <span className="text-lg">Acceso a herramientas de IA profesionales</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-[#FFCC00]/20 flex items-center justify-center flex-shrink-0">
                  <Check className="h-5 w-5 text-[#FFCC00]" />
                </div>
                <span className="text-lg">Comunidad activa de creadores</span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 pb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-1">
                  <Video className="h-5 w-5 text-[#FFCC00]" />
                  <span className="text-2xl">25</span>
                </div>
                <p className="text-xs text-gray-300">Sesiones</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="h-5 w-5 text-[#FFCC00]" />
                  <span className="text-2xl">100+</span>
                </div>
                <p className="text-xs text-gray-300">Creadores</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-5 w-5 text-[#FFCC00]" />
                  <span className="text-2xl">6</span>
                </div>
                <p className="text-xs text-gray-300">Meses</p>
              </div>
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => onNavigate("creadores")}
                className="bg-[#FFCC00] text-[#333366] hover:bg-[#FFCC00]/90 text-lg"
              >
                Ver Programa Completo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <div className="flex flex-col justify-center">
                <p className="text-sm text-gray-300">Solo $54 por 6 meses</p>
                <p className="text-xs text-gray-400">Equivale a $9/mes</p>
              </div>
            </div>
          </div>
          
          {/* Imagen */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1586985564259-6211deb4c122?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHZpZGVvJTIwY2FsbHxlbnwxfHx8fDE3NjE5OTg3NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Programa de Creadores Babelink"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Badge flotante */}
            <div className="absolute -bottom-6 -right-6 bg-[#FFCC00] text-[#333366] rounded-2xl p-6 shadow-2xl">
              <div className="text-3xl mb-1">$54</div>
              <div className="text-sm">6 meses</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
