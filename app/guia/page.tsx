"use client";

import {
  ArrowLeft,
  Users,
  Heart,
  MessageCircle,
  Share2,
  CheckCircle,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

interface CommunityGuideProps {
  onBack: () => void;
}

function CommunityGuide({ onBack }: CommunityGuideProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-linear-to-br from-[#333366] to-[#5a5a8a] text-white py-12">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-white hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a la comunidad
          </Button>
          <h1 className="text-4xl mb-4">Guía de la Comunidad Babelink</h1>
          <p className="text-lg text-gray-200 max-w-3xl">
            Bienvenido a nuestra comunidad. Esta guía te ayudará a aprovechar al
            máximo tu experiencia en Babelink.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Introducción */}
        <div className="mb-12">
          <h2 className="text-3xl text-[#333366] mb-4">¿Qué es Babelink?</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Babelink es una plataforma que impulsa a creadores de contenido con
            IA, creatividad y colaboración. Nuestra comunidad está formada por
            profesionales, estudiantes y entusiastas que comparten conocimientos
            sobre Inteligencia Artificial, Tecnología, Marketing y Negocios.
          </p>
        </div>

        {/* Cómo empezar */}
        <Card className="mb-8 border-2 border-[#E2E3F7]">
          <CardContent className="p-8">
            <h2 className="text-2xl text-[#333366] mb-6">Cómo Empezar</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#FFCC00] flex items-center justify-center">
                    <span className="text-[#333366]">1</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg text-[#333366] mb-2">
                    Completa tu perfil
                  </h3>
                  <p className="text-gray-600">
                    Agrega una foto, descripción y enlaces a tus redes sociales
                    para que la comunidad te conozca mejor.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#FFCC00] flex items-center justify-center">
                    <span className="text-[#333366]">2</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg text-[#333366] mb-2">
                    Explora el contenido
                  </h3>
                  <p className="text-gray-600">
                    Navega por los posts, sigue a creadores que te interesen y
                    guarda contenido para leerlo después.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#FFCC00] flex items-center justify-center">
                    <span className="text-[#333366]">3</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg text-[#333366] mb-2">
                    Participa activamente
                  </h3>
                  <p className="text-gray-600">
                    Comenta, da me gusta y comparte posts que encuentres
                    valiosos. La interacción fortalece la comunidad.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[#FFCC00] flex items-center justify-center">
                    <span className="text-[#333366]">4</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg text-[#333366] mb-2">
                    Crea tu propio contenido
                  </h3>
                  <p className="text-gray-600">
                    Si te conviertes en creador verificado, podrás publicar
                    artículos y compartir tu experiencia con la comunidad.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Características principales */}
        <div className="mb-12">
          <h2 className="text-3xl text-[#333366] mb-6">
            Características Principales
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-2 border-[#E2E3F7] hover:border-[#FFCC00] transition-colors">
              <CardContent className="p-6">
                <Users className="h-10 w-10 text-[#333366] mb-4" />
                <h3 className="text-xl text-[#333366] mb-2">
                  Sigue a Creadores
                </h3>
                <p className="text-gray-600">
                  Conecta con creadores de contenido y mantente al día con sus
                  últimas publicaciones.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#E2E3F7] hover:border-[#FFCC00] transition-colors">
              <CardContent className="p-6">
                <Heart className="h-10 w-10 text-[#333366] mb-4" />
                <h3 className="text-xl text-[#333366] mb-2">Da Me Gusta</h3>
                <p className="text-gray-600">
                  Muestra tu aprecio por el contenido que te resulta útil o
                  interesante.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#E2E3F7] hover:border-[#FFCC00] transition-colors">
              <CardContent className="p-6">
                <MessageCircle className="h-10 w-10 text-[#333366] mb-4" />
                <h3 className="text-xl text-[#333366] mb-2">
                  Comenta y Discute
                </h3>
                <p className="text-gray-600">
                  Participa en conversaciones constructivas y comparte tu
                  perspectiva.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#E2E3F7] hover:border-[#FFCC00] transition-colors">
              <CardContent className="p-6">
                <Share2 className="h-10 w-10 text-[#333366] mb-4" />
                <h3 className="text-xl text-[#333366] mb-2">
                  Comparte Contenido
                </h3>
                <p className="text-gray-600">
                  Amplifica el alcance del contenido valioso compartiéndolo en
                  tus redes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tips para una mejor experiencia */}
        <Card className="mb-8 bg-linear-to-br from-[#E2E3F7] to-[#F6CBCA]/30 border-0">
          <CardContent className="p-8">
            <h2 className="text-2xl text-[#333366] mb-6">
              Tips para una Mejor Experiencia
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#333366] mt-1 shrink-0" />
                <span className="text-gray-700">
                  <strong>Sé auténtico:</strong> Comparte tus experiencias
                  reales y perspectivas únicas.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#333366] mt-1 shrink-0" />
                <span className="text-gray-700">
                  <strong>Interactúa regularmente:</strong> La consistencia
                  ayuda a construir relaciones en la comunidad.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#333366] mt-1 shrink-0" />
                <span className="text-gray-700">
                  <strong>Usa tags relevantes:</strong> Facilita que otros
                  encuentren tu contenido usando etiquetas apropiadas.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#333366] mt-1 shrink-0" />
                <span className="text-gray-700">
                  <strong>Aporta valor:</strong> Enfócate en compartir
                  conocimientos útiles y experiencias que ayuden a otros.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-[#333366] mt-1 shrink-0" />
                <span className="text-gray-700">
                  <strong>Reporta problemas:</strong> Si ves contenido
                  inapropiado, repórtalo para mantener la calidad de la
                  comunidad.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Programa de Creadores */}
        <Card className="mb-8 bg-linear-to-br from-[#333366] to-[#5a5a8a] text-white border-0">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-3xl">👑</div>
              <h2 className="text-2xl">Conviértete en Creador Verificado</h2>
            </div>
            <p className="text-gray-200 mb-6">
              ¿Quieres compartir tu conocimiento y construir tu audiencia? Únete
              a nuestro Programa de Creadores y obtén beneficios exclusivos,
              incluyendo la corona de verificación.
            </p>
            <Button className="bg-[#FFCC00] hover:bg-[#FFCC00]/90 text-[#333366]">
              Conoce el Programa de Creadores
            </Button>
          </CardContent>
        </Card>

        {/* Ayuda adicional */}
        <div className="text-center bg-[#E2E3F7]/50 rounded-2xl p-8">
          <h2 className="text-2xl text-[#333366] mb-4">
            ¿Necesitas más ayuda?
          </h2>
          <p className="text-gray-700 mb-6">
            Si tienes preguntas adicionales, no dudes en consultarnos.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              variant="outline"
              className="border-[#333366] text-[#333366] hover:bg-[#333366] hover:text-white"
            >
              Ver FAQs
            </Button>
            <Button className="bg-[#333366] hover:bg-[#333366]/90 text-white">
              Contactar Soporte
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommunityGuide;
