"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useRouter } from "next/navigation";

function TermsOfService() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={router.back}
          className="mb-6 text-[#333366] hover:text-[#FFCC00]"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>

        <Card>
          <CardContent className="p-8 md:p-12">
            <h1 className="text-[#333366] mb-6">Términos de Uso</h1>

            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-[#333366] mb-3">
                  1. Aceptación de los Términos
                </h2>
                <p>
                  Al acceder y utilizar Babelink, aceptas estar sujeto a estos
                  Términos de Uso y todas las leyes y regulaciones aplicables.
                  Si no estás de acuerdo con alguno de estos términos, no debes
                  utilizar nuestra plataforma.
                </p>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">
                  2. Descripción del Servicio
                </h2>
                <p>
                  Babelink es una plataforma que impulsa a creadores de
                  contenido mediante IA, creatividad y colaboración. Ofrecemos
                  servicios de comunidad, cursos, y un programa específico para
                  creadores.
                </p>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">3. Registro y Cuenta</h2>
                <p className="mb-2">Para utilizar ciertos servicios, debes:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    Crear una cuenta proporcionando información veraz y
                    actualizada
                  </li>
                  <li>Mantener la confidencialidad de tu contraseña</li>
                  <li>
                    Ser responsable de todas las actividades bajo tu cuenta
                  </li>
                  <li>
                    Notificarnos inmediatamente sobre cualquier uso no
                    autorizado
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">
                  4. Contenido del Usuario
                </h2>
                <p className="mb-2">Al publicar contenido en Babelink:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Eres responsable del contenido que publicas</li>
                  <li>
                    Garantizas que tienes los derechos necesarios sobre el
                    contenido
                  </li>
                  <li>
                    Nos otorgas una licencia para usar, reproducir y distribuir
                    tu contenido
                  </li>
                  <li>
                    Aceptas no publicar contenido ilegal, ofensivo o que viole
                    derechos de terceros
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">5. Conducta del Usuario</h2>
                <p className="mb-2">No está permitido:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Acosar, intimidar o amenazar a otros usuarios</li>
                  <li>Publicar spam o contenido promocional no solicitado</li>
                  <li>Intentar acceder a cuentas de otros usuarios</li>
                  <li>Usar la plataforma para actividades ilegales</li>
                  <li>Violar los derechos de propiedad intelectual</li>
                </ul>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">
                  6. Programa de Creadores
                </h2>
                <p>
                  Los términos específicos del Programa de Creadores se detallan
                  en un acuerdo separado. La participación está sujeta a
                  aprobación y cumplimiento de requisitos específicos.
                </p>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">
                  7. Propiedad Intelectual
                </h2>
                <p>
                  Todo el contenido de la plataforma, incluyendo diseño, código,
                  marcas y logotipos, es propiedad de Babelink o sus
                  licenciantes y está protegido por las leyes de propiedad
                  intelectual.
                </p>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">8. Terminación</h2>
                <p>
                  Nos reservamos el derecho de suspender o terminar tu cuenta si
                  violas estos términos o si determinamos que tu conducta es
                  perjudicial para la plataforma o sus usuarios.
                </p>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">
                  9. Limitación de Responsabilidad
                </h2>
                <p>
                  Babelink se proporciona &quot;tal cual&quot; sin garantías de
                  ningún tipo. No seremos responsables por daños indirectos,
                  incidentales o consecuentes derivados del uso de la
                  plataforma.
                </p>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">10. Modificaciones</h2>
                <p>
                  Podemos modificar estos términos en cualquier momento. Los
                  cambios entrarán en vigor al publicarse en la plataforma. El
                  uso continuado constituye aceptación de los nuevos términos.
                </p>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">11. Ley Aplicable</h2>
                <p>
                  Estos términos se rigen por las leyes de España. Cualquier
                  disputa se resolverá en los tribunales competentes de
                  Barcelona, España.
                </p>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">12. Contacto</h2>
                <p>
                  Para cualquier pregunta sobre estos Términos de Uso,
                  contáctanos a través de nuestra página de contacto.
                </p>
              </section>

              <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-600">
                <p>Última actualización: Noviembre 2025</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default TermsOfService;
