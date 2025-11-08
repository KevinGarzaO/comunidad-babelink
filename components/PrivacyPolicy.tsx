import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface PrivacyPolicyProps {
  onBack: () => void;
}

export function PrivacyPolicy({ onBack }: PrivacyPolicyProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6 text-[#333366] hover:text-[#FFCC00]"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>

        <Card>
          <CardContent className="p-8 md:p-12">
            <h1 className="text-[#333366] mb-6">Política de Privacidad</h1>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-[#333366] mb-3">1. Introducción</h2>
                <p>
                  En Babelink, nos tomamos muy en serio la privacidad de nuestros usuarios. Esta Política de Privacidad 
                  describe cómo recopilamos, usamos y protegemos tu información personal cuando utilizas nuestra plataforma.
                </p>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">2. Información que Recopilamos</h2>
                <p className="mb-2">Recopilamos la siguiente información:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Información de registro (nombre, email, contraseña)</li>
                  <li>Información de perfil (foto, biografía, enlaces sociales)</li>
                  <li>Contenido que publicas en la plataforma</li>
                  <li>Datos de uso y navegación</li>
                  <li>Información técnica (dirección IP, tipo de navegador)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">3. Uso de la Información</h2>
                <p className="mb-2">Utilizamos tu información para:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Proporcionar y mejorar nuestros servicios</li>
                  <li>Personalizar tu experiencia en la plataforma</li>
                  <li>Comunicarnos contigo sobre actualizaciones y novedades</li>
                  <li>Mantener la seguridad de la plataforma</li>
                  <li>Cumplir con obligaciones legales</li>
                </ul>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">4. Compartir Información</h2>
                <p>
                  No vendemos tu información personal a terceros. Podemos compartir información con proveedores de 
                  servicios que nos ayudan a operar la plataforma, siempre bajo estrictos acuerdos de confidencialidad.
                </p>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">5. Seguridad</h2>
                <p>
                  Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal 
                  contra acceso no autorizado, pérdida o alteración.
                </p>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">6. Tus Derechos</h2>
                <p className="mb-2">Tienes derecho a:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Acceder a tu información personal</li>
                  <li>Rectificar datos incorrectos</li>
                  <li>Solicitar la eliminación de tus datos</li>
                  <li>Oponerte al procesamiento de tu información</li>
                  <li>Solicitar la portabilidad de tus datos</li>
                </ul>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">7. Cookies</h2>
                <p>
                  Utilizamos cookies y tecnologías similares para mejorar tu experiencia. Consulta nuestra 
                  Política de Cookies para más información.
                </p>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">8. Cambios a esta Política</h2>
                <p>
                  Podemos actualizar esta política periódicamente. Te notificaremos sobre cambios significativos 
                  mediante un aviso en la plataforma.
                </p>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">9. Contacto</h2>
                <p>
                  Si tienes preguntas sobre esta Política de Privacidad, contáctanos a través de nuestra 
                  página de contacto.
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
