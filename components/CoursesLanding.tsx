import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  BookOpen, 
  Video, 
  Award,
  Clock,
  Users,
  Sparkles,
  ArrowRight,
  Calendar,
  Target
} from "lucide-react";

interface CoursesLandingProps {
  onNavigate: (page: string) => void;
}

export function CoursesLanding({ onNavigate }: CoursesLandingProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#333366] via-[#5a5a8a] to-[#333366] text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHptLTQgMjhjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFCC00] text-[#333366]">
              <BookOpen className="h-4 w-4" />
              <span>Cursos y Recursos</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl">
              Aprende a crear contenido profesional con IA 🚀
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Cursos prácticos, talleres y recursos para potenciar tu creatividad con inteligencia artificial
            </p>
          </div>
        </div>
      </section>

      {/* Masterclass del Programa de Creadores - Destacada */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#333366] mb-4">
                Masterclass Destacada ⭐
              </h2>
              <p className="text-lg text-gray-700">
                Nuestro programa más completo para creadores de contenido
              </p>
            </div>

            {/* Card Grande del Programa de Creadores */}
            <Card className="overflow-hidden border-2 border-[#FFCC00] shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="grid md:grid-cols-2 gap-0">
                {/* Imagen */}
                <div className="relative aspect-[4/3] md:aspect-auto">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHRlYW0lMjB3b3Jrc2hvcHxlbnwwfHx8fDE3MzA1NDk4OTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Programa de Creadores"
                    className="w-full h-full object-cover"
                  />
                  {/* Badge sobre la imagen */}
                  <div className="absolute top-4 left-4 bg-[#FFCC00] text-[#333366] px-4 py-2 rounded-full flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    <span>Programa Completo</span>
                  </div>
                </div>

                {/* Contenido */}
                <CardContent className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl md:text-3xl text-[#333366] mb-4">
                        Masterclass: Programa de Creadores 🎓
                      </h3>
                      <p className="text-lg text-gray-700 mb-6">
                        6 meses de aprendizaje intensivo para dominar la creación de contenido con IA, construir tu marca personal y lanzar tu proyecto al mundo.
                      </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#E2E3F7] p-2 rounded-lg">
                          <Calendar className="h-5 w-5 text-[#333366]" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Duración</div>
                          <div className="text-[#333366]">6 meses</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-[#E2E3F7] p-2 rounded-lg">
                          <Video className="h-5 w-5 text-[#333366]" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Sesiones</div>
                          <div className="text-[#333366]">25 en vivo</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-[#E2E3F7] p-2 rounded-lg">
                          <Users className="h-5 w-5 text-[#333366]" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Comunidad</div>
                          <div className="text-[#333366]">100+ creadores</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-[#E2E3F7] p-2 rounded-lg">
                          <Award className="h-5 w-5 text-[#333366]" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Certificado</div>
                          <div className="text-[#333366]">Incluido</div>
                        </div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="bg-[#E2E3F7] p-4 rounded-lg space-y-2">
                      <h4 className="text-[#333366]">Lo que aprenderás:</h4>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>✓ Creación de contenido con IA</li>
                        <li>✓ Diseño y marca personal</li>
                        <li>✓ Estrategia de distribución</li>
                        <li>✓ Lanzamiento de proyecto real</li>
                      </ul>
                    </div>

                    {/* Precio y CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <div className="text-3xl text-[#333366]">$54</div>
                        <div className="text-sm text-gray-600">6 meses completos</div>
                      </div>
                      <Button
                        size="lg"
                        onClick={() => onNavigate("creadores")}
                        className="bg-[#333366] text-white hover:bg-[#333366]/90"
                      >
                        Ver Programa Completo
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Próximos Cursos */}
      <section className="py-20 md:py-32 bg-[#E2E3F7]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#333366] mb-4">
                Más cursos próximamente 🚀
              </h2>
              <p className="text-lg text-gray-700">
                Estamos desarrollando nuevos cursos especializados para ti
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Curso 1 - Coming Soon */}
              <Card className="border-2 border-gray-200 hover:border-[#333366] transition-all duration-300">
                <CardContent className="p-6">
                  <div className="aspect-video bg-gradient-to-br from-[#E2E3F7] to-[#F6CBCA] rounded-lg mb-4 flex items-center justify-center">
                    <Target className="h-12 w-12 text-[#333366]" />
                  </div>
                  <h3 className="text-xl text-[#333366] mb-2">
                    SEO con IA
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Aprende a posicionar tu contenido usando herramientas de inteligencia artificial
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>Próximamente</span>
                  </div>
                </CardContent>
              </Card>

              {/* Curso 2 - Coming Soon */}
              <Card className="border-2 border-gray-200 hover:border-[#333366] transition-all duration-300">
                <CardContent className="p-6">
                  <div className="aspect-video bg-gradient-to-br from-[#F6CBCA] to-[#E2E3F7] rounded-lg mb-4 flex items-center justify-center">
                    <Video className="h-12 w-12 text-[#333366]" />
                  </div>
                  <h3 className="text-xl text-[#333366] mb-2">
                    Video Marketing con IA
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Crea videos profesionales y automatiza tu producción audiovisual
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>Próximamente</span>
                  </div>
                </CardContent>
              </Card>

              {/* Curso 3 - Coming Soon */}
              <Card className="border-2 border-gray-200 hover:border-[#333366] transition-all duration-300">
                <CardContent className="p-6">
                  <div className="aspect-video bg-gradient-to-br from-[#E2E3F7] to-[#F6CBCA] rounded-lg mb-4 flex items-center justify-center">
                    <Sparkles className="h-12 w-12 text-[#333366]" />
                  </div>
                  <h3 className="text-xl text-[#333366] mb-2">
                    Automatización de Redes
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Automatiza tu presencia en redes sociales con inteligencia artificial
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>Próximamente</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-gradient-to-br from-[#333366] to-[#5a5a8a] text-white border-0 shadow-2xl">
              <CardContent className="p-12">
                <h2 className="text-3xl md:text-4xl mb-6">
                  ¿Listo para transformar tu contenido? 🌟
                </h2>
                <p className="text-xl text-gray-200 mb-8">
                  Únete al Programa de Creadores y comienza tu camino hacia la excelencia en contenido digital
                </p>
                <Button
                  size="lg"
                  onClick={() => onNavigate("creadores")}
                  className="bg-[#FFCC00] text-[#333366] hover:bg-[#FFCC00]/90 text-lg px-12"
                >
                  Comenzar Ahora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
