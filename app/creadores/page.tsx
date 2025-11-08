"use client";

import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import {
  Sparkles,
  Video,
  Wrench,
  Megaphone,
  Users,
  Network,
  Award,
  Lightbulb,
  Target,
  MessageCircle,
  Check,
  ArrowRight,
  Star,
  Compass,
  Palette,
  Film,
  Rocket,
} from "lucide-react";

interface CreatorsProgramProps {
  onNavigate: (page: string) => void;
}

function CreatorsProgram({ onNavigate }: CreatorsProgramProps) {
  const benefits = [
    {
      icon: <Video className="h-5 w-5" />,
      text: "25 sesiones en vivo (1–2 h)",
    },
    {
      icon: <Wrench className="h-5 w-5" />,
      text: "Herramientas de IA aplicadas al contenido",
    },
    {
      icon: <Megaphone className="h-5 w-5" />,
      text: "Publica tus proyectos dentro de Babelink",
    },
    {
      icon: <Users className="h-5 w-5" />,
      text: "Colabora con otros creadores",
    },
    {
      icon: <Network className="h-5 w-5" />,
      text: "Conexiones con comunidades tech",
    },
    {
      icon: <Award className="h-5 w-5" />,
      text: "Perfil de creador con logros",
    },
    { icon: <Lightbulb className="h-5 w-5" />, text: "Mentorías grupales" },
    { icon: <Target className="h-5 w-5" />, text: "Retos mensuales" },
    {
      icon: <Sparkles className="h-5 w-5" />,
      text: "Materiales y grabaciones exclusivas",
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      text: "Espacios de networking en vivo",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-br from-[#333366] via-[#5a5a8a] to-[#333366] text-white py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHptLTQgMjhjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFCC00] text-[#333366]">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm">Programa de 6 Meses</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl">
              Únete a Babelink: 6 meses para elevar tu creatividad con IA{" "}
              <span className="inline-block">🌱⚡</span>
            </h1>

            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Vive un programa intensivo de 6 meses con 25 sesiones prácticas
              (1–2 horas) para dominar herramientas de IA, colaborar con otros
              creadores y construir tu marca digital.
            </p>

            <div className="flex flex-col gap-6 items-center pt-6">
              {/* Destacar el descuento visualmente */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border-2 border-[#FFCC00] relative mt-6">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-6 py-2 rounded-full text-sm shadow-lg">
                  🔥 AHORRA 40% - OFERTA LIMITADA
                </div>
                <div className="text-center pt-10">
                  <div className="flex items-baseline justify-center gap-3 mb-2">
                    <span className="text-2xl text-gray-400 line-through">
                      $15/mes
                    </span>
                    <span className="text-5xl text-[#FFCC00]">$9</span>
                    <span className="text-xl text-gray-200">/mes</span>
                  </div>
                  <div className="text-sm text-gray-300 mb-3">
                    Pago único de{" "}
                    <span className="text-[#FFCC00] text-xl">$54</span> por 6
                    meses completos
                  </div>
                  <div className="inline-flex items-center gap-2 bg-[#FFCC00]/20 text-[#FFCC00] px-4 py-1 rounded-full text-xs border border-[#FFCC00]/40">
                    💰 Ahorras $36 en total
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                onClick={() => onNavigate("preregistro")}
                className="bg-[#FFCC00] text-[#333366] hover:bg-[#FFCC00]/90 text-xl px-12 py-6 h-auto shadow-2xl"
              >
                Inscribirme Ahora por $54
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Descripción del Programa */}
      <section className="py-20 md:py-32 bg-linear-to-br from-[#E2E3F7] to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#333366]">
                Un viaje de 6 meses para potenciar tu creatividad 🚀
              </h2>
              <p className="text-lg text-gray-700">
                El Programa de Creadores de Babelink te acompaña durante 6 meses
                de aprendizaje, práctica y crecimiento. Con 25 sesiones en vivo
                y grabadas, aprenderás a usar IA, crear contenido profesional y
                conectar con otros talentos.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#333366]/20">
                  <Check className="h-4 w-4 text-[#333366]" />
                  <span className="text-sm text-[#333366]">
                    6 meses de formación
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#333366]/20">
                  <Check className="h-4 w-4 text-[#333366]" />
                  <span className="text-sm text-[#333366]">
                    25 sesiones prácticas
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#333366]/20">
                  <Check className="h-4 w-4 text-[#333366]" />
                  <span className="text-sm text-[#333366]">
                    Comunidad activa
                  </span>
                </div>
              </div>
              <Button
                size="lg"
                onClick={() => onNavigate("preregistro")}
                className="bg-[#333366] text-white hover:bg-[#333366]/90"
              >
                Comenzar Ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1760574751859-c03d3ff220a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHN0dWRpbyUyMG1vZGVybnxlbnwxfHx8fDE3NjIwMTQyNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Estudio creativo moderno"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#333366] mb-6">
              Todo lo que obtienes como miembro de Babelink ✨
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              No es solo aprendizaje, es pertenecer a una comunidad que impulsa
              tu crecimiento.
            </p>
            <Button
              size="lg"
              onClick={() => onNavigate("preregistro")}
              className="bg-[#FFCC00] text-[#333366] hover:bg-[#FFCC00]/90"
            >
              Ver Planes y Precios
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="border-2 border-gray-200 hover:border-[#333366] transition-all duration-300 hover:shadow-lg"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-lg bg-[#E2E3F7] flex items-center justify-center text-[#333366] shrink-0">
                      {benefit.icon}
                    </div>
                    <p className="text-gray-700 pt-2">{benefit.text}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Precio y Membresía */}
      <section
        id="pricing-section"
        className="py-20 md:py-32 bg-[#333366] text-white"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl">
              Tu inversión en ti y en tu comunidad 💡
            </h2>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20 relative overflow-hidden">
              {/* Badge de Descuento */}
              <div className="absolute top-4 right-4 bg-linear-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-full shadow-lg transform rotate-6 z-10">
                <div className="text-center">
                  <div className="text-xs uppercase tracking-wide">Ahorra</div>
                  <div className="text-2xl">40%</div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-5xl md:text-6xl text-gray-400 line-through opacity-60">
                    $90
                  </div>
                  <div className="text-7xl md:text-8xl text-[#FFCC00] drop-shadow-2xl">
                    $54
                  </div>
                </div>

                {/* Destacar el precio mensual */}
                <div className="bg-linear-to-r from-[#FFCC00] to-[#FFD633] rounded-xl p-6 mb-4 shadow-xl">
                  <div className="text-center">
                    <div className="text-[#333366] text-sm uppercase tracking-wide mb-2">
                      Equivale a solo
                    </div>
                    <div className="flex items-center justify-center gap-3 mb-2">
                      <span className="text-3xl md:text-4xl text-[#333366] line-through opacity-50">
                        $15
                      </span>
                      <span className="text-5xl md:text-6xl text-[#333366]">
                        $9
                      </span>
                      <span className="text-2xl md:text-3xl text-[#333366]">
                        /mes
                      </span>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-[#333366] text-white px-4 py-2 rounded-full text-sm">
                      <span>💰 Ahorras $36 en total</span>
                    </div>
                  </div>
                </div>

                <div className="text-xl text-gray-200">
                  Suscripción semestral (6 meses completos)
                </div>
              </div>

              <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
                Obtén acceso completo a todas las sesiones, recursos y
                herramientas durante 6 meses. Tu suscripción te da la llave para
                transformar tu creatividad con IA.
              </p>

              <Button
                size="lg"
                onClick={() => onNavigate("preregistro")}
                className="bg-[#FFCC00] text-[#333366] hover:bg-[#FFCC00]/90 text-lg px-12"
              >
                Registrarme Ahora
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl mb-2">25</div>
                <div className="text-sm text-gray-300">Sesiones en vivo</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">6</div>
                <div className="text-sm text-gray-300">Meses de acceso</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">∞</div>
                <div className="text-sm text-gray-300">Conexiones</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lo que aprenderás - Módulos del Curso */}
      <section className="py-20 md:py-32 bg-linear-to-b from-white to-[#E2E3F7]/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#333366] mb-6">
                Lo que aprenderás paso a paso 🧠
              </h2>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-6">
                6 módulos prácticos para que aprendas desde cero y termines con
                tu proyecto de contenido publicado y tu comunidad en marcha.
              </p>
              <Button
                size="lg"
                onClick={() => onNavigate("preregistro")}
                className="bg-[#FFCC00] text-[#333366] hover:bg-[#FFCC00]/90"
              >
                Inscribirme al Programa
              </Button>
            </div>

            {/* Módulos en Accordion */}
            <Accordion type="single" collapsible className="space-y-4">
              {/* Módulo 1 */}
              <AccordionItem
                value="modulo-1"
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#333366] transition-colors"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline">
                  <div className="flex items-start gap-4 text-left w-full">
                    <div className="bg-[#E2E3F7] p-3 rounded-lg shrink-0">
                      <Compass className="h-6 w-6 text-[#333366]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl text-[#333366] mb-2">
                        MÓDULO 1 – Introducción y Fundamentos
                      </h3>
                      <p className="text-sm text-gray-600">
                        🧭 `&quot;`Comienza desde cero y comprende cómo la IA
                        puede potenciar tu creatividad.`&quot;`
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <ul className="space-y-3 ml-16">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Introducción a la IA para creadores
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Tipos de contenido digital
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Primer proyecto personal de contenido
                      </span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Módulo 2 */}
              <AccordionItem
                value="modulo-2"
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#333366] transition-colors"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline">
                  <div className="flex items-start gap-4 text-left w-full">
                    <div className="bg-[#F6CBCA] p-3 rounded-lg shrink-0">
                      <Sparkles className="h-6 w-6 text-[#333366]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl text-[#333366] mb-2">
                        MÓDULO 2 – Fundamentos de Contenido y Marca Personal
                      </h3>
                      <p className="text-sm text-gray-600">
                        ✨ `&quot;`Define tu identidad y marca personal para
                        destacar en cualquier plataforma.`&quot;`
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <ul className="space-y-3 ml-16">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Storytelling y estrategia de marca
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Identidad visual con IA
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Página web profesional con Figma + ChatGPT
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Blogs y artículos con ChatGPT + SEO
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Creación de personajes y virtual influencers con OpenArt
                      </span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Módulo 3 */}
              <AccordionItem
                value="modulo-3"
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#333366] transition-colors"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline">
                  <div className="flex items-start gap-4 text-left w-full">
                    <div className="bg-[#E2E3F7] p-3 rounded-lg shrink-0">
                      <Palette className="h-6 w-6 text-[#333366]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl text-[#333366] mb-2">
                        MÓDULO 3 – Diseño, Marca y Video con IA
                      </h3>
                      <p className="text-sm text-gray-600">
                        🎨 `&quot;`Convierte tu contenido en profesional y
                        visualmente atractivo.`&quot;`
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <ul className="space-y-3 ml-16">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Diseño de logotipo y paleta visual
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Página web con Figma Make
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Publicación web con Webflow o Framer
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Creación de voz y avatar digital
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Edición automatizada de video y audio
                      </span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Módulo 4 */}
              <AccordionItem
                value="modulo-4"
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#333366] transition-colors"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline">
                  <div className="flex items-start gap-4 text-left w-full">
                    <div className="bg-[#F6CBCA] p-3 rounded-lg shrink-0">
                      <Megaphone className="h-6 w-6 text-[#333366]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl text-[#333366] mb-2">
                        MÓDULO 4 – Distribución, Redes y Contenido Multiformato
                      </h3>
                      <p className="text-sm text-gray-600">
                        📣 `&quot;`Llega a tu audiencia y haz que tu contenido
                        trabaje por ti.`&quot;`
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <ul className="space-y-3 ml-16">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Estrategia de redes sociales
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Creación de podcasts con IA
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Creación de cursos online con IA
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Newsletters y email marketing con IA
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Automatización de contenido
                      </span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Módulo 5 */}
              <AccordionItem
                value="modulo-5"
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#333366] transition-colors"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline">
                  <div className="flex items-start gap-4 text-left w-full">
                    <div className="bg-[#E2E3F7] p-3 rounded-lg shrink-0">
                      <Film className="h-6 w-6 text-[#333366]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl text-[#333366] mb-2">
                        MÓDULO 5 – Contenido Audiovisual Avanzado con IA
                      </h3>
                      <p className="text-sm text-gray-600">
                        🎬 `&quot;`Crea videos, reels y experiencias
                        interactivas que cautiven a tu audiencia.`&quot;`
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <ul className="space-y-3 ml-16">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span className="text-gray-700">Videos con Grok</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Reels y Shorts optimizados
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Storytelling multiplataforma
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Edición avanzada con IA
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Contenido interactivo y experiencial
                      </span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {/* Módulo 6 */}
              <AccordionItem
                value="modulo-6"
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#333366] transition-colors"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline">
                  <div className="flex items-start gap-4 text-left w-full">
                    <div className="bg-[#F6CBCA] p-3 rounded-lg shrink-0">
                      <Rocket className="h-6 w-6 text-[#333366]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl text-[#333366] mb-2">
                        MÓDULO 6 – Lanzamiento del Proyecto Final y Comunidad
                      </h3>
                      <p className="text-sm text-gray-600">
                        🚀 `&quot;`Publica tu proyecto y construye tu comunidad
                        desde el primer día.`&quot;`
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <ul className="space-y-3 ml-16">
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Integración y lanzamiento del proyecto
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-[#FFCC00] shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        Construcción y activación de comunidad
                      </span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* CTA Secundario */}
            <div className="mt-16 text-center">
              <Card className="bg-linear-to-br from-[#FFCC00] to-[#FFD633] border-0 shadow-xl">
                <CardContent className="p-8 md:p-12">
                  <div className="max-w-2xl mx-auto">
                    <h3 className="text-2xl md:text-3xl text-[#333366] mb-4">
                      👉 ¿Listo para crear tu primer proyecto con IA?
                    </h3>
                    <p className="text-lg text-[#333366]/80 mb-6">
                      Aprende paso a paso y termina con un proyecto real
                      publicado y funcionando.
                    </p>
                    <Button
                      size="lg"
                      onClick={() => onNavigate("preregistro")}
                      className="bg-[#333366] text-white hover:bg-[#333366]/90 text-lg px-12"
                    >
                      Quiero aprender esto
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Comunidad y Colaboración */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="aspect-4/3 rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1696041757950-62e2c030283b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBuZXR3b3JraW5nJTIwcGVvcGxlfGVufDF8fHx8MTc2MjAxNDI1NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Comunidad colaborando"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#333366]">
                Colabora más allá de Babelink 💬
              </h2>
              <p className="text-lg text-gray-700">
                Al unirte, también puedes colaborar con comunidades de
                tecnología, innovación y contenido. Amplía tu red y conecta con
                proyectos reales.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-[#FFCC00] flex items-center justify-center shrink-0 mt-1">
                    <Check className="h-4 w-4 text-[#333366]" />
                  </div>
                  <div>
                    <h3 className="text-[#333366] mb-1">Comunidades Tech</h3>
                    <p className="text-sm text-gray-600">
                      Conecta con desarrolladores y emprendedores tecnológicos
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-[#FFCC00] flex items-center justify-center shrink-0 mt-1">
                    <Check className="h-4 w-4 text-[#333366]" />
                  </div>
                  <div>
                    <h3 className="text-[#333366] mb-1">
                      Proyectos Colaborativos
                    </h3>
                    <p className="text-sm text-gray-600">
                      Trabaja en iniciativas reales con impacto medible
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-[#FFCC00] flex items-center justify-center shrink-0 mt-1">
                    <Check className="h-4 w-4 text-[#333366]" />
                  </div>
                  <div>
                    <h3 className="text-[#333366] mb-1">Network Global</h3>
                    <p className="text-sm text-gray-600">
                      Expande tu alcance más allá de fronteras
                    </p>
                  </div>
                </div>
              </div>
              <Button
                size="lg"
                onClick={() => onNavigate("preregistro")}
                className="bg-[#333366] text-white hover:bg-[#333366]/90"
              >
                Formar Parte de la Comunidad
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final Mejorado */}
      <section className="relative py-24 md:py-40 overflow-hidden">
        {/* Fondo animado */}
        <div className="absolute inset-0 bg-linear-to-br from-[#FFCC00] via-[#FFD633] to-[#FFCC00]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzMzMzNjYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAgMi4yMS0xLjc5IDQtNCA0cy00LTEuNzktNC00IDEuNzktNCA0LTQgNCAxLjc5IDQgNHptLTQgMjhjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>

        {/* Elementos decorativos */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#333366]/10 rounded-full blur-xl"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            {/* Badge superior */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/90 backdrop-blur-sm border-2 border-[#333366]">
              <Star className="h-5 w-5 text-[#333366] fill-[#333366]" />
              <span className="text-[#333366]">
                Únete a 100+ Creadores Activos
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#333366]">
              Tu lugar en Babelink te espera 🌟
            </h2>

            <p className="text-2xl md:text-3xl text-[#333366]">
              6 meses. 25 sesiones. Una comunidad que impulsa tu crecimiento.
            </p>

            {/* Destacar el ahorro */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border-2 border-[#333366] max-w-2xl mx-auto shadow-xl">
              <div className="text-center">
                <div className="text-sm text-[#333366]/60 uppercase tracking-wide mb-2">
                  Precio Especial
                </div>
                <div className="flex items-baseline justify-center gap-3 mb-3">
                  <span className="text-3xl text-gray-500 line-through">
                    $15/mes
                  </span>
                  <span className="text-6xl text-[#333366]">$9</span>
                  <span className="text-2xl text-[#333366]">/mes</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-red-500 text-white px-6 py-2 rounded-full mb-4 shadow-lg">
                  <span className="text-lg">🎯 AHORRA $36 AL AÑO</span>
                </div>
                <p className="text-sm text-[#333366]/70">
                  Pago único de{" "}
                  <span className="text-[#333366] text-xl">$54</span> por 6
                  meses completos
                </p>
              </div>
            </div>

            {/* Botones principales */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button
                size="lg"
                onClick={() => onNavigate("preregistro")}
                className="bg-[#333366] text-white hover:bg-[#333366]/90 text-xl px-12 py-6 h-auto shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
              >
                Inscribirme por Solo $9/mes
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </div>

            {/* Stats destacados */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-3xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-white shadow-lg">
                <div className="text-3xl md:text-4xl text-[#333366] mb-2">
                  25
                </div>
                <div className="text-sm text-[#333366]/70">Sesiones</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-white shadow-lg">
                <div className="text-3xl md:text-4xl text-[#333366] mb-2">
                  6
                </div>
                <div className="text-sm text-[#333366]/70">Meses</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-white shadow-lg">
                <div className="text-3xl md:text-4xl text-[#333366] mb-2">
                  100+
                </div>
                <div className="text-sm text-[#333366]/70">Creadores</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-white shadow-lg">
                <div className="text-3xl md:text-4xl text-[#333366] mb-2">
                  $9
                </div>
                <div className="text-sm text-[#333366]/70">Por mes</div>
              </div>
            </div>

            {/* CTA secundario */}
            <div className="pt-8">
              <p className="text-sm text-[#333366]/70 mb-4">
                ¿Tienes preguntas? Estamos aquí para ayudarte
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Button
                  variant="outline"
                  className="bg-white/50 backdrop-blur-sm border-2 border-[#333366] text-[#333366] hover:bg-white/80"
                >
                  Ver FAQ
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/50 backdrop-blur-sm border-2 border-[#333366] text-[#333366] hover:bg-white/80"
                >
                  Contáctanos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#333366] mb-6">
                Preguntas Frecuentes 💬
              </h2>
              <p className="text-lg text-gray-700">
                Resolvemos tus dudas sobre el Programa de Creadores de Babelink
              </p>
            </div>

            {/* FAQ Accordion */}
            <Accordion type="single" collapsible className="space-y-4">
              {/* Pregunta 1 */}
              <AccordionItem
                value="faq-1"
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#FFCC00] transition-colors"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline text-left">
                  <span className="text-lg text-[#333366]">
                    ¿Qué incluye exactamente el programa de 6 meses?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <p className="text-gray-700">
                    El programa incluye 25 sesiones en vivo (1-2 horas cada una)
                    distribuidas a lo largo de 6 meses, acceso a todas las
                    grabaciones, materiales exclusivos, herramientas de IA
                    especializadas, mentorías grupales, retos mensuales, y la
                    posibilidad de publicar tus proyectos en la plataforma de
                    Babelink. También tendrás acceso a nuestra comunidad de
                    creadores y espacios de networking.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* Pregunta 2 */}
              <AccordionItem
                value="faq-2"
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#FFCC00] transition-colors"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline text-left">
                  <span className="text-lg text-[#333366]">
                    ¿Necesito experiencia previa en IA o creación de contenido?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <p className="text-gray-700">
                    No, el programa está diseñado para creadores de todos los
                    niveles. Comenzamos desde cero con los fundamentos de IA y
                    creación de contenido, y avanzamos gradualmente hacia
                    técnicas más avanzadas. Lo único que necesitas es ganas de
                    aprender y creatividad.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* Pregunta 3 */}
              <AccordionItem
                value="faq-3"
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#FFCC00] transition-colors"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline text-left">
                  <span className="text-lg text-[#333366]">
                    ¿Cuándo comienza el próximo grupo y cómo son los horarios?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <p className="text-gray-700">
                    Los grupos comienzan trimestralmente. Las sesiones en vivo
                    se programan en horarios flexibles para acomodar diferentes
                    zonas horarias. Si no puedes asistir en vivo, todas las
                    sesiones se graban y quedan disponibles para que las veas
                    cuando puedas. Una vez registrado, recibirás el calendario
                    completo con todas las fechas.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* Pregunta 4 */}
              <AccordionItem
                value="faq-4"
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#FFCC00] transition-colors"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline text-left">
                  <span className="text-lg text-[#333366]">
                    ¿Qué herramientas de IA necesito y tienen costo adicional?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <p className="text-gray-700">
                    Durante el programa trabajaremos con herramientas de IA
                    gratuitas y de pago. Muchas tienen planes gratuitos
                    suficientes para empezar, y proporcionamos alternativas sin
                    costo siempre que sea posible. Para herramientas premium, te
                    enseñamos a elegir las que mejor se ajusten a tu presupuesto
                    y necesidades. El costo del programa no incluye las
                    suscripciones a herramientas externas.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* Pregunta 5 */}
              <AccordionItem
                value="faq-5"
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#FFCC00] transition-colors"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline text-left">
                  <span className="text-lg text-[#333366]">
                    ¿Puedo obtener un reembolso si no me convence el programa?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <p className="text-gray-700">
                    Sí, ofrecemos una garantía de satisfacción de 14 días. Si
                    dentro de las primeras dos semanas sientes que el programa
                    no es para ti, puedes solicitar un reembolso completo sin
                    preguntas. Queremos que estés 100% seguro de tu inversión.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* Pregunta 6 */}
              <AccordionItem
                value="faq-6"
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#FFCC00] transition-colors"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline text-left">
                  <span className="text-lg text-[#333366]">
                    ¿Qué tipo de proyecto final crearé?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <p className="text-gray-700">
                    El proyecto final es completamente personalizado según tus
                    intereses. Puede ser un podcast con IA, una serie de videos,
                    un blog profesional, un curso online, una marca personal
                    digital, o cualquier formato de contenido que elijas. Te
                    guiamos para que lo planifiques, lo crees con herramientas
                    de IA y lo publiques en Babelink y/o tus plataformas
                    preferidas.
                  </p>
                </AccordionContent>
              </AccordionItem>

              {/* Pregunta 7 */}
              <AccordionItem
                value="faq-7"
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-[#FFCC00] transition-colors"
              >
                <AccordionTrigger className="px-6 py-5 hover:no-underline text-left">
                  <span className="text-lg text-[#333366]">
                    ¿Qué beneficios obtengo al terminar el programa?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <p className="text-gray-700">
                    Al completar el programa recibirás un perfil de Creador
                    Verificado en Babelink con corona de verificación, acceso
                    permanente a la comunidad de creadores, prioridad para
                    colaboraciones futuras, y la posibilidad de monetizar tu
                    contenido en la plataforma. Además, llevarás contigo todas
                    las habilidades, herramientas y proyectos creados durante
                    los 6 meses.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* CTA después del FAQ */}
            <div className="mt-12 text-center">
              <Card className="bg-linear-to-br from-[#E2E3F7] to-[#F6CBCA]/30 border-2 border-[#333366]/10">
                <CardContent className="p-8">
                  <h3 className="text-2xl text-[#333366] mb-4">
                    ¿Tienes más preguntas?
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Estamos aquí para ayudarte. Regístrate ahora y recibe
                    información detallada sobre el programa.
                  </p>
                  <Button
                    size="lg"
                    onClick={() => onNavigate("preregistro")}
                    className="bg-[#333366] text-white hover:bg-[#333366]/90"
                  >
                    Inscribirme al Programa
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CreatorsProgram;
