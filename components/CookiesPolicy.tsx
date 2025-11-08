import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface CookiesPolicyProps {
  onBack: () => void;
}

export function CookiesPolicy({ onBack }: CookiesPolicyProps) {
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
            <h1 className="text-[#333366] mb-6">Política de Cookies</h1>
            
            <div className="space-y-6 text-gray-700">
              <section>
                <h2 className="text-[#333366] mb-3">1. ¿Qué son las Cookies?</h2>
                <p>
                  Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas 
                  nuestra plataforma. Nos ayudan a mejorar tu experiencia y a entender cómo utilizas Babelink.
                </p>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">2. Tipos de Cookies que Utilizamos</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-[#333366] mb-2">Cookies Esenciales</h3>
                    <p>
                      Son necesarias para el funcionamiento básico de la plataforma, como mantener tu sesión 
                      activa y recordar tus preferencias de idioma.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[#333366] mb-2">Cookies de Rendimiento</h3>
                    <p>
                      Nos ayudan a entender cómo los usuarios interactúan con la plataforma, qué páginas 
                      visitan más y si encuentran errores.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[#333366] mb-2">Cookies de Funcionalidad</h3>
                    <p>
                      Permiten recordar tus elecciones (como tu nombre de usuario, idioma o región) para 
                      proporcionarte una experiencia más personalizada.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[#333366] mb-2">Cookies de Marketing</h3>
                    <p>
                      Se utilizan para mostrar anuncios relevantes y medir la efectividad de nuestras 
                      campañas publicitarias.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">3. Cookies de Terceros</h2>
                <p className="mb-2">También utilizamos cookies de terceros para:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Análisis web (Google Analytics)</li>
                  <li>Integración con redes sociales (Facebook, Instagram, YouTube, TikTok)</li>
                  <li>Servicios de autenticación (Google, GitHub)</li>
                  <li>Servicios de pago y procesamiento de transacciones</li>
                </ul>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">4. Duración de las Cookies</h2>
                <div className="space-y-2">
                  <p>
                    <strong>Cookies de sesión:</strong> Se eliminan cuando cierras tu navegador.
                  </p>
                  <p>
                    <strong>Cookies persistentes:</strong> Permanecen en tu dispositivo durante un período 
                    específico o hasta que las elimines manualmente.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">5. Gestión de Cookies</h2>
                <p className="mb-2">Puedes gestionar las cookies de las siguientes formas:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Configurando tu navegador para rechazar todas las cookies</li>
                  <li>Configurando tu navegador para aceptar solo cookies de sitios específicos</li>
                  <li>Eliminando todas las cookies cuando cierres tu navegador</li>
                  <li>Utilizando nuestro panel de preferencias de cookies</li>
                </ul>
                <p className="mt-3">
                  <strong>Nota:</strong> Deshabilitar las cookies puede afectar la funcionalidad de la plataforma.
                </p>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">6. Cómo Configurar tu Navegador</h2>
                <p className="mb-2">Instrucciones para gestionar cookies en navegadores populares:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad → Cookies</li>
                  <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies</li>
                  <li><strong>Safari:</strong> Preferencias → Privacidad → Cookies</li>
                  <li><strong>Edge:</strong> Configuración → Cookies y permisos del sitio</li>
                </ul>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">7. Cookies Específicas que Utilizamos</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-200 px-4 py-2 text-left">Cookie</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Propósito</th>
                        <th className="border border-gray-200 px-4 py-2 text-left">Duración</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-200 px-4 py-2">session_id</td>
                        <td className="border border-gray-200 px-4 py-2">Mantener sesión activa</td>
                        <td className="border border-gray-200 px-4 py-2">Sesión</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 px-4 py-2">user_preferences</td>
                        <td className="border border-gray-200 px-4 py-2">Recordar preferencias</td>
                        <td className="border border-gray-200 px-4 py-2">1 año</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-200 px-4 py-2">analytics</td>
                        <td className="border border-gray-200 px-4 py-2">Análisis de uso</td>
                        <td className="border border-gray-200 px-4 py-2">2 años</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">8. Actualizaciones</h2>
                <p>
                  Esta Política de Cookies puede actualizarse periódicamente para reflejar cambios en 
                  nuestras prácticas o por razones legales. Te recomendamos revisarla regularmente.
                </p>
              </section>

              <section>
                <h2 className="text-[#333366] mb-3">9. Contacto</h2>
                <p>
                  Si tienes preguntas sobre nuestra Política de Cookies, contáctanos a través de nuestra 
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
