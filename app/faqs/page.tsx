"use client";

import { ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { Card, CardContent } from "../../components/ui/card";
import { useRouter } from "next/navigation";

function FAQs() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-linear-to-br from-[#333366] to-[#5a5a8a] text-white py-12">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={router.back}
            className="mb-4 text-white hover:bg-white/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a la comunidad
          </Button>
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="h-12 w-12" />
            <h1 className="text-4xl">Preguntas Frecuentes</h1>
          </div>
          <p className="text-lg text-gray-200 max-w-3xl">
            Encuentra respuestas a las preguntas más comunes sobre Babelink.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* General */}
        <div className="mb-12">
          <h2 className="text-2xl text-[#333366] mb-6">General</h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem
              value="item-1"
              className="border border-gray-200 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                ¿Qué es Babelink?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 pb-4">
                Babelink es una plataforma que impulsa a creadores de contenido
                con IA, creatividad y colaboración. Ofrecemos un espacio donde
                profesionales y entusiastas pueden compartir conocimientos sobre
                Inteligencia Artificial, Tecnología, Marketing y Negocios.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="border border-gray-200 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                ¿Es gratis unirse a Babelink?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 pb-4">
                Sí, crear una cuenta y acceder a la mayoría del contenido es
                completamente gratis. Ofrecemos un Programa de Creadores premium
                para aquellos que desean publicar contenido y acceder a
                herramientas avanzadas.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="border border-gray-200 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                ¿Cómo puedo crear una cuenta?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 pb-4">
                Puedes crear una cuenta usando tu correo electrónico, cuenta de
                Gmail o GitHub. Simplemente haz clic en `&quot;`Iniciar
                sesión`&quot;` en la parte superior de la página y sigue los
                pasos.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Comunidad */}
        <div className="mb-12">
          <h2 className="text-2xl text-[#333366] mb-6">Comunidad</h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem
              value="item-4"
              className="border border-gray-200 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                ¿Qué puedo hacer en la comunidad?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 pb-4">
                En la comunidad puedes: leer posts de otros miembros, seguir a
                creadores que te interesen, dar me gusta y comentar en
                publicaciones, guardar contenido para leer después, y si eres
                creador verificado, publicar tu propio contenido.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              className="border border-gray-200 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                ¿Cómo puedo seguir a otros usuarios?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 pb-4">
                Visita el perfil de cualquier usuario y haz clic en el botón
                `&quot;`Seguir`&quot;`. Verás sus publicaciones en tu feed
                personalizado y recibirás notificaciones sobre su nuevo
                contenido.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-6"
              className="border border-gray-200 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                ¿Qué son los tags y cómo los uso?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 pb-4">
                Los tags son etiquetas que ayudan a categorizar el contenido.
                Puedes hacer clic en cualquier tag para ver posts relacionados
                con ese tema. Al crear contenido, usa tags relevantes para que
                más personas encuentren tu publicación.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Programa de Creadores */}
        <div className="mb-12">
          <h2 className="text-2xl text-[#333366] mb-6">
            Programa de Creadores
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem
              value="item-7"
              className="border border-gray-200 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                ¿Qué es el Programa de Creadores?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 pb-4">
                El Programa de Creadores es un programa de 6 meses con 25
                sesiones diseñado para ayudarte a dominar la creación de
                contenido. Incluye formación, herramientas y la corona de
                verificación que te identifica como creador oficial de Babelink.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-8"
              className="border border-gray-200 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                ¿Cuánto cuesta el Programa de Creadores?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 pb-4">
                El programa completo cuesta $54 USD e incluye 25 sesiones de
                formación, acceso a herramientas exclusivas, la corona de
                verificación, y soporte continuo durante 6 meses.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-9"
              className="border border-gray-200 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                ¿Qué es la corona de verificación?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 pb-4">
                La corona de verificación (👑) es un distintivo que aparece
                junto a tu nombre y te identifica como creador verificado de
                Babelink. Indica que has completado el programa y estás
                autorizado para publicar contenido en la plataforma.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-10"
              className="border border-gray-200 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                ¿Cuál es la diferencia entre usuarios normales y creadores
                verificados?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 pb-4">
                Los usuarios normales pueden leer, comentar, dar me gusta y
                seguir a otros. Los creadores verificados además pueden publicar
                artículos y contenido original, tienen la corona de
                verificación, y acceso a analytics y herramientas de creación
                avanzadas.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-11"
              className="border border-gray-200 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                ¿Qué incluyen los niveles Seeders y Synths?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 pb-4">
                <strong>Seeders (Nivel 1):</strong> Fundamentos de creación de
                contenido, storytelling básico y primeros pasos en la
                plataforma.
                <br />
                <br />
                <strong>Synths (Nivel 2):</strong> Técnicas avanzadas, uso de IA
                para contenido, estrategias de crecimiento y monetización.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Cuenta y Privacidad */}
        <div className="mb-12">
          <h2 className="text-2xl text-[#333366] mb-6">Cuenta y Privacidad</h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem
              value="item-12"
              className="border border-gray-200 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                ¿Cómo puedo editar mi perfil?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 pb-4">
                Haz clic en tu avatar en la esquina superior derecha y
                selecciona `&quot;`Mi Perfil`&quot;`. Desde allí podrás editar
                tu foto, biografía, enlaces a redes sociales y otra información.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-13"
              className="border border-gray-200 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                ¿Es segura mi información personal?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 pb-4">
                Sí, tomamos muy en serio la seguridad y privacidad de tus datos.
                No compartimos tu información personal con terceros sin tu
                consentimiento. Lee nuestra Política de Privacidad para más
                detalles.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-14"
              className="border border-gray-200 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                ¿Puedo eliminar mi cuenta?
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 pb-4">
                Sí, puedes eliminar tu cuenta en cualquier momento desde la
                configuración de tu perfil. Ten en cuenta que esta acción es
                permanente y no se puede deshacer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Soporte */}
        <Card className="bg-linear-to-br from-[#E2E3F7] to-[#F6CBCA]/30 border-0">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl text-[#333366] mb-4">
              ¿No encontraste tu respuesta?
            </h2>
            <p className="text-gray-700 mb-6">
              Nuestro equipo de soporte está aquí para ayudarte con cualquier
              pregunta adicional.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button
                variant="outline"
                className="border-[#333366] text-[#333366] hover:bg-[#333366] hover:text-white"
                onClick={() => router.push("/creadores")}
              >
                Ver Programa de Creadores
              </Button>
              <Button className="bg-[#333366] hover:bg-[#333366]/90 text-white">
                Contactar Soporte
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default FAQs;
