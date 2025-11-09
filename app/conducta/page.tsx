"use client";

import {
  ArrowLeft,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { useRouter } from "next/navigation";

function CodeOfConduct() {
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
            <Shield className="h-12 w-12" />
            <h1 className="text-4xl">Código de Conducta</h1>
          </div>
          <p className="text-lg text-gray-200 max-w-3xl">
            Nuestras normas para mantener una comunidad segura, respetuosa y
            productiva para todos.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Introducción */}
        <div className="mb-12">
          <h2 className="text-3xl text-[#333366] mb-4">Nuestro Compromiso</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            En Babelink, nos comprometemos a proporcionar un ambiente acogedor,
            seguro e inspirador para todos los miembros de nuestra comunidad,
            independientemente de su nivel de experiencia, género, identidad y
            expresión de género, orientación sexual, discapacidad, apariencia
            personal, raza, etnia, edad, religión o nacionalidad.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Este código de conducta establece las expectativas para todos
            aquellos que participan en nuestra comunidad, así como las
            consecuencias de comportamientos inaceptables.
          </p>
        </div>

        {/* Comportamientos esperados */}
        <Card className="mb-8 border-2 border-[#E2E3F7]">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <h2 className="text-2xl text-[#333366]">
                Comportamientos Esperados
              </h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#FFCC00] rounded-full mt-2 shrink-0"></div>
                <span className="text-gray-700">
                  <strong>Respeto mutuo:</strong> Trata a todos los miembros con
                  respeto y consideración, valorando diferentes perspectivas y
                  experiencias.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#FFCC00] rounded-full mt-2 shrink-0"></div>
                <span className="text-gray-700">
                  <strong>Comunicación constructiva:</strong> Participa de
                  manera auténtica y activa, aportando de forma constructiva a
                  las conversaciones.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#FFCC00] rounded-full mt-2 shrink-0"></div>
                <span className="text-gray-700">
                  <strong>Colaboración:</strong> Busca oportunidades para
                  colaborar y ayudar a otros miembros de la comunidad.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#FFCC00] rounded-full mt-2 shrink-0"></div>
                <span className="text-gray-700">
                  <strong>Contenido de calidad:</strong> Comparte información
                  precisa, relevante y bien fundamentada.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#FFCC00] rounded-full mt-2 shrink-0"></div>
                <span className="text-gray-700">
                  <strong>Atribución adecuada:</strong> Da crédito a las fuentes
                  originales y respeta los derechos de autor.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#FFCC00] rounded-full mt-2 shrink-0"></div>
                <span className="text-gray-700">
                  <strong>Privacidad:</strong> Respeta la privacidad de los
                  demás y no compartas información personal sin permiso.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[#FFCC00] rounded-full mt-2 shrink-0"></div>
                <span className="text-gray-700">
                  <strong>Ayuda y mentorización:</strong> Apoya a los nuevos
                  miembros y comparte tu conocimiento de manera generosa.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Comportamientos inaceptables */}
        <Card className="mb-8 border-2 border-red-200">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <XCircle className="h-8 w-8 text-red-600" />
              <h2 className="text-2xl text-[#333366]">
                Comportamientos Inaceptables
              </h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 shrink-0"></div>
                <span className="text-gray-700">
                  <strong>Acoso y discriminación:</strong> No se tolerará ningún
                  tipo de acoso, discriminación o comportamiento intimidatorio.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 shrink-0"></div>
                <span className="text-gray-700">
                  <strong>Contenido ofensivo:</strong> Lenguaje o imágenes
                  sexualizadas, violentas u ofensivas no están permitidas.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 shrink-0"></div>
                <span className="text-gray-700">
                  <strong>Spam y autopromoción excesiva:</strong> No uses la
                  plataforma únicamente para promocionar tus productos o
                  servicios.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 shrink-0"></div>
                <span className="text-gray-700">
                  <strong>Desinformación:</strong> No compartas información
                  falsa, engañosa o no verificada deliberadamente.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 shrink-0"></div>
                <span className="text-gray-700">
                  <strong>Plagio:</strong> No copies contenido de otros sin dar
                  el crédito apropiado.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 shrink-0"></div>
                <span className="text-gray-700">
                  <strong>Suplantación:</strong> No te hagas pasar por otra
                  persona u organización.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 shrink-0"></div>
                <span className="text-gray-700">
                  <strong>Trolling:</strong> Comentarios provocadores diseñados
                  únicamente para molestar o generar conflictos.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Consecuencias */}
        <Card className="mb-8 bg-linear-to-br from-[#E2E3F7] to-[#F6CBCA]/30 border-0">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="h-8 w-8 text-[#333366]" />
              <h2 className="text-2xl text-[#333366]">Consecuencias</h2>
            </div>
            <p className="text-gray-700 mb-4">
              El incumplimiento de este código de conducta puede resultar en:
            </p>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg text-[#333366] mb-2">1. Advertencia</h3>
                <p className="text-gray-600 text-sm">
                  Para infracciones menores o de primera vez, se emitirá una
                  advertencia explicando el comportamiento inapropiado.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg text-[#333366] mb-2">
                  2. Suspensión Temporal
                </h3>
                <p className="text-gray-600 text-sm">
                  Para infracciones repetidas o más graves, la cuenta puede ser
                  suspendida temporalmente.
                </p>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h3 className="text-lg text-[#333366] mb-2">
                  3. Expulsión Permanente
                </h3>
                <p className="text-gray-600 text-sm">
                  Para infracciones graves o patrones de comportamiento
                  inaceptable, la cuenta puede ser eliminada permanentemente.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reporte de problemas */}
        <Card className="mb-8 border-2 border-[#FFCC00]">
          <CardContent className="p-8">
            <h2 className="text-2xl text-[#333366] mb-4">Reportar Problemas</h2>
            <p className="text-gray-700 mb-4">
              Si experimentas o presencias un comportamiento inaceptable, por
              favor repórtalo inmediatamente. Todas las denuncias serán
              revisadas e investigadas de manera confidencial.
            </p>
            <p className="text-gray-700 mb-6">
              Puedes reportar problemas de las siguientes maneras:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="h-5 w-5 text-[#333366]" />
                Usando el botón de reportar en el contenido específico
              </li>
              <li className="flex items-center gap-2 text-gray-700">
                <CheckCircle className="h-5 w-5 text-[#333366]" />
                Contactando directamente al equipo de moderación en:{" "}
                <strong>moderacion@babelink.com</strong>
              </li>
            </ul>
            <Button className="bg-[#333366] hover:bg-[#333366]/90 text-white">
              Contactar Moderación
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center bg-[#E2E3F7]/50 rounded-2xl p-8">
          <p className="text-gray-700 mb-2">
            <strong>Este código de conducta está sujeto a cambios.</strong>
          </p>
          <p className="text-gray-600 text-sm">
            Última actualización: Noviembre 2025
          </p>
        </div>
      </div>
    </div>
  );
}

export default CodeOfConduct;
