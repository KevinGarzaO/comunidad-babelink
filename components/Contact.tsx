import {
  ArrowLeft,
  Mail,
  MapPin,
  Phone,
  Send,
  MessageCircle,
  Clock,
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface ContactProps {
  onBack: () => void;
}

export function Contact({ onBack }: ContactProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("¡Mensaje enviado! Te responderemos pronto.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle className="h-12 w-12" />
            <h1 className="text-4xl">Contacto</h1>
          </div>
          <p className="text-lg text-gray-200 max-w-3xl">
            ¿Tienes alguna pregunta o sugerencia? Nos encantaría escucharte.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-2 border-[#E2E3F7]">
              <CardContent className="p-8">
                <h2 className="text-2xl text-[#333366] mb-6">
                  Envíanos un mensaje
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-[#333366]">
                      Nombre completo
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Tu nombre"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-2 border-gray-300 focus:border-[#333366]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-[#333366]">
                      Correo electrónico
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-2 border-gray-300 focus:border-[#333366]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-[#333366]">
                      Asunto
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="¿En qué podemos ayudarte?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="mt-2 border-gray-300 focus:border-[#333366]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-[#333366]">
                      Mensaje
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Escribe tu mensaje aquí..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="mt-2 border-gray-300 focus:border-[#333366]"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#333366] hover:bg-[#333366]/90 text-white"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Enviar mensaje
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {/* Información de contacto */}
            <Card className="border-2 border-[#E2E3F7]">
              <CardContent className="p-6">
                <h3 className="text-xl text-[#333366] mb-4">
                  Información de Contacto
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-[#333366] mt-1 shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Email</p>
                      <a
                        href="mailto:info@babelink.com"
                        className="text-[#333366] hover:text-[#FFCC00]"
                      >
                        info@babelink.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-[#333366] mt-1 shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Teléfono</p>
                      <a href="tel:+34900000000" className="text-[#333366]">
                        +34 900 000 000
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[#333366] mt-1 shrink-0" />
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Ubicación</p>
                      <p className="text-[#333366]">Barcelona, España</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Horario de atención */}
            <Card className="bg-linear-to-br from-[#E2E3F7] to-[#F6CBCA]/30 border-0">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="h-5 w-5 text-[#333366]" />
                  <h3 className="text-lg text-[#333366]">
                    Horario de Atención
                  </h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Lunes - Viernes</span>
                    <span className="text-[#333366]">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Sábado</span>
                    <span className="text-[#333366]">10:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Domingo</span>
                    <span className="text-gray-500">Cerrado</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-600">
                    Tiempo de respuesta estimado: 24-48 horas
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Soporte técnico */}
            <Card className="border-2 border-[#FFCC00]">
              <CardContent className="p-6">
                <h3 className="text-lg text-[#333366] mb-3">Soporte Técnico</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Para problemas técnicos urgentes o reportar bugs, contacta a
                  nuestro equipo técnico.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-[#333366] text-[#333366] hover:bg-[#333366] hover:text-white"
                  onClick={() =>
                    (window.location.href = "mailto:soporte@babelink.com")
                  }
                >
                  soporte@babelink.com
                </Button>
              </CardContent>
            </Card>

            {/* Moderación */}
            <Card className="border-2 border-[#E2E3F7]">
              <CardContent className="p-6">
                <h3 className="text-lg text-[#333366] mb-3">Moderación</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Para reportar contenido inapropiado o violaciones del código
                  de conducta.
                </p>
                <Button
                  variant="outline"
                  className="w-full border-[#333366] text-[#333366] hover:bg-[#333366] hover:text-white"
                  onClick={() =>
                    (window.location.href = "mailto:moderacion@babelink.com")
                  }
                >
                  moderacion@babelink.com
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="mt-12 text-center bg-[#E2E3F7]/50 rounded-2xl p-8">
          <h3 className="text-2xl text-[#333366] mb-3">
            ¿Tienes una pregunta rápida?
          </h3>
          <p className="text-gray-700 mb-6">
            Tal vez encuentres tu respuesta en nuestras preguntas frecuentes.
          </p>
          <Button
            variant="outline"
            className="border-[#333366] text-[#333366] hover:bg-[#333366] hover:text-white"
          >
            Ver Preguntas Frecuentes
          </Button>
        </div>
      </div>
    </div>
  );
}
