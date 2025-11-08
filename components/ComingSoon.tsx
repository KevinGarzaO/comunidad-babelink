import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";

interface ComingSoonProps {
  title: string;
  description: string;
  onNavigate: (page: string) => void;
}

export function ComingSoon({ title, description, onNavigate }: ComingSoonProps) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-[#E2E3F7] to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFCC00]/20 border border-[#FFCC00] mb-4">
            <Sparkles className="h-4 w-4 text-[#333366]" />
            <span className="text-sm text-[#333366]">Próximamente</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#333366]">
            {title}
          </h1>
          
          <p className="text-xl text-gray-700">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              onClick={() => onNavigate("creadores")}
              size="lg"
              className="bg-[#FFCC00] text-[#333366] hover:bg-[#FFCC00]/90"
            >
              Únete al Programa de Creadores
            </Button>
            <Button
              onClick={() => onNavigate("home")}
              size="lg"
              variant="outline"
              className="border-[#333366] text-[#333366] hover:bg-[#333366] hover:text-white"
            >
              Volver al Inicio
            </Button>
          </div>

          <div className="pt-12">
            <p className="text-sm text-gray-600 mb-4">
              Mientras tanto, explora nuestras otras secciones:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => onNavigate("blog")}
                className="px-4 py-2 rounded-lg bg-white border border-gray-200 hover:border-[#333366] transition-colors text-sm"
              >
                Revista
              </button>
              <button
                onClick={() => onNavigate("creadores")}
                className="px-4 py-2 rounded-lg bg-white border border-gray-200 hover:border-[#333366] transition-colors text-sm"
              >
                Programa de Creadores
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
