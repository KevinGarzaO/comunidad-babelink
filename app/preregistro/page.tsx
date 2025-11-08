"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Checkbox } from "../../components/ui/checkbox";
import {
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Users,
  Video,
  Award,
  Rocket,
} from "lucide-react";
import { toast } from "sonner";

interface PreRegistroProps {
  onBack: () => void;
}

function PreRegistro({ onBack }: PreRegistroProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    tipoContenido: "",
    plataformas: [] as string[],
    experiencia: "",
    objetivos: "",
    comoConociste: "",
    acceptTerms: false,
    acceptMarketing: false,
  });

  const tiposContenido = [
    "Videos educativos",
    "Podcasts",
    "Artículos y blogs",
    "Tutoriales técnicos",
    "Contenido en redes sociales",
    "Streaming en vivo",
    "Infoproductos",
    "Otro",
  ];

  const plataformasDisponibles = [
    "YouTube",
    "TikTok",
    "Instagram",
    "Twitter/X",
    "LinkedIn",
    "Facebook",
    "Twitch",
    "Medium",
    "Substack",
    "Podcast platforms",
  ];

  const nivelesExperiencia = [
    "Principiante (menos de 6 meses)",
    "Intermedio (6 meses - 2 años)",
    "Avanzado (2-5 años)",
    "Experto (más de 5 años)",
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlatformToggle = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      plataformas: prev.plataformas.includes(platform)
        ? prev.plataformas.filter((p) => p !== platform)
        : [...prev.plataformas, platform],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.acceptTerms) {
      toast.error("Debes aceptar los términos y condiciones");
      return;
    }

    setIsLoading(true);

    // Simular envío de formulario
    setTimeout(() => {
      console.log("Datos del formulario:", formData);

      // Aquí iría la integración con tu backend/CRM
      // Por ejemplo: enviar a Supabase, HubSpot, Airtable, etc.

      setIsLoading(false);
      setIsSuccess(true);

      toast.success("¡Pre-registro completado!", {
        description: "Te contactaremos pronto con más información.",
      });

      // Reset after 3 seconds
      setTimeout(() => {
        onBack();
      }, 10000);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#E2E3F7] via-white to-[#F6CBCA] py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="border-0 shadow-2xl">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl mb-4 text-[#333366]">
                ¡Bienvenido a Babelink! 🎉
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Tu pre-registro ha sido completado exitosamente.
              </p>
              <p className="text-gray-500">
                Nuestro equipo revisará tu solicitud y te contactará en las
                próximas 24-48 horas con los siguientes pasos para unirte al
                Programa de Creadores.
              </p>
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Revisa tu correo{" "}
                  <span className="font-semibold text-[#333366]">
                    {formData.email}
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#E2E3F7] via-white to-[#F6CBCA] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-[#333366] hover:text-[#333366]/80"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </Button>

          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#FFCC00]/20 px-4 py-2 rounded-full mb-4">
              <Sparkles className="h-4 w-4 text-[#333366]" />
              <span className="text-sm text-[#333366]">
                Pre-Registro Programa de Creadores
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl text-[#333366] mb-4">
              Comienza tu transformación
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Completa el formulario y da el primer paso para unirte a nuestra
              comunidad de creadores
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="border-2 border-[#333366]/10">
              <CardContent className="p-4 text-center">
                <Video className="h-6 w-6 text-[#FFCC00] mx-auto mb-2" />
                <div className="text-2xl text-[#333366]">25</div>
                <div className="text-xs text-gray-600">Sesiones</div>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#333366]/10">
              <CardContent className="p-4 text-center">
                <Users className="h-6 w-6 text-[#FFCC00] mx-auto mb-2" />
                <div className="text-2xl text-[#333366]">100+</div>
                <div className="text-xs text-gray-600">Creadores</div>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#333366]/10">
              <CardContent className="p-4 text-center">
                <Award className="h-6 w-6 text-[#FFCC00] mx-auto mb-2" />
                <div className="text-2xl text-[#333366]">6</div>
                <div className="text-xs text-gray-600">Meses</div>
              </CardContent>
            </Card>
            <Card className="border-2 border-[#333366]/10">
              <CardContent className="p-4 text-center">
                <Rocket className="h-6 w-6 text-[#FFCC00] mx-auto mb-2" />
                <div className="text-2xl text-[#333366]">$54</div>
                <div className="text-xs text-gray-600">Total</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Formulario */}
        <Card className="border-0 shadow-2xl">
          <CardHeader className="bg-linear-to-r from-[#333366] to-[#4a4a7a] text-white rounded-t-lg">
            <CardTitle className="text-2xl">Información del Creador</CardTitle>
            <p className="text-[#E2E3F7] text-sm mt-2">
              Queremos conocerte mejor para ofrecerte la mejor experiencia
            </p>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Información Personal */}
              <div className="space-y-4">
                <h3 className="text-lg text-[#333366] border-b border-gray-200 pb-2">
                  Información Personal
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nombre">
                      Nombre <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="nombre"
                      placeholder="Tu nombre"
                      value={formData.nombre}
                      onChange={(e) =>
                        handleInputChange("nombre", e.target.value)
                      }
                      required
                      className="border-2 focus:border-[#FFCC00]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apellido">
                      Apellido <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="apellido"
                      placeholder="Tu apellido"
                      value={formData.apellido}
                      onChange={(e) =>
                        handleInputChange("apellido", e.target.value)
                      }
                      required
                      className="border-2 focus:border-[#FFCC00]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Correo Electrónico <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      required
                      className="border-2 focus:border-[#FFCC00]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefono">Teléfono (WhatsApp)</Label>
                    <Input
                      id="telefono"
                      type="tel"
                      placeholder="+52 123 456 7890"
                      value={formData.telefono}
                      onChange={(e) =>
                        handleInputChange("telefono", e.target.value)
                      }
                      className="border-2 focus:border-[#FFCC00]"
                    />
                  </div>
                </div>
              </div>

              {/* Información de Creador */}
              <div className="space-y-4">
                <h3 className="text-lg text-[#333366] border-b border-gray-200 pb-2">
                  Tu Perfil como Creador
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="tipoContenido">
                    ¿Qué tipo de contenido creas o quieres crear?{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.tipoContenido}
                    onValueChange={(value: string) =>
                      handleInputChange("tipoContenido", value)
                    }
                    required
                  >
                    <SelectTrigger className="border-2 focus:border-[#FFCC00]">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposContenido.map((tipo) => (
                        <SelectItem key={tipo} value={tipo}>
                          {tipo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>
                    ¿En qué plataformas publicas?{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-4 bg-gray-50 rounded-lg">
                    {plataformasDisponibles.map((platform) => (
                      <div
                        key={platform}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={platform}
                          checked={formData.plataformas.includes(platform)}
                          onCheckedChange={() => handlePlatformToggle(platform)}
                        />
                        <Label
                          htmlFor={platform}
                          className="text-sm cursor-pointer"
                        >
                          {platform}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experiencia">
                    Nivel de experiencia <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.experiencia}
                    onValueChange={(value: string) =>
                      handleInputChange("experiencia", value)
                    }
                    required
                  >
                    <SelectTrigger className="border-2 focus:border-[#FFCC00]">
                      <SelectValue placeholder="Selecciona tu nivel" />
                    </SelectTrigger>
                    <SelectContent>
                      {nivelesExperiencia.map((nivel) => (
                        <SelectItem key={nivel} value={nivel}>
                          {nivel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="objetivos">
                    ¿Qué esperas lograr con el Programa de Creadores?{" "}
                    <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="objetivos"
                    placeholder="Cuéntanos tus objetivos, metas y qué te gustaría aprender..."
                    value={formData.objetivos}
                    onChange={(e) =>
                      handleInputChange("objetivos", e.target.value)
                    }
                    required
                    rows={4}
                    className="border-2 focus:border-[#FFCC00] resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="comoConociste">
                    ¿Cómo conociste Babelink?
                  </Label>
                  <Select
                    value={formData.comoConociste}
                    onValueChange={(value: string) =>
                      handleInputChange("comoConociste", value)
                    }
                  >
                    <SelectTrigger className="border-2 focus:border-[#FFCC00]">
                      <SelectValue placeholder="Selecciona una opción" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="redes-sociales">
                        Redes Sociales
                      </SelectItem>
                      <SelectItem value="recomendacion">
                        Recomendación de un amigo
                      </SelectItem>
                      <SelectItem value="buscador">
                        Buscador (Google, etc.)
                      </SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="podcast">Podcast</SelectItem>
                      <SelectItem value="evento">
                        Evento o conferencia
                      </SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Términos y Condiciones */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={formData.acceptTerms}
                    onCheckedChange={(checked: boolean) =>
                      setFormData((prev) => ({
                        ...prev,
                        acceptTerms: checked as boolean,
                      }))
                    }
                    required
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm leading-relaxed cursor-pointer"
                  >
                    Acepto los{" "}
                    <span className="text-[#333366] underline">
                      términos y condiciones
                    </span>{" "}
                    y la{" "}
                    <span className="text-[#333366] underline">
                      política de privacidad
                    </span>{" "}
                    de Babelink <span className="text-red-500">*</span>
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="marketing"
                    checked={formData.acceptMarketing}
                    onCheckedChange={(checked: boolean) =>
                      setFormData((prev) => ({
                        ...prev,
                        acceptMarketing: checked as boolean,
                      }))
                    }
                  />
                  <Label
                    htmlFor="marketing"
                    className="text-sm leading-relaxed cursor-pointer"
                  >
                    Quiero recibir información sobre nuevos programas, eventos y
                    contenido exclusivo de Babelink
                  </Label>
                </div>
              </div>

              {/* Botón de Envío */}
              <div className="pt-6">
                <Button
                  type="submit"
                  disabled={isLoading || formData.plataformas.length === 0}
                  className="w-full h-14 bg-linear-to-r from-[#FFCC00] to-[#FFD633] hover:from-[#FFCC00]/90 hover:to-[#FFD633]/90 text-[#333366] text-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-[#333366] border-t-transparent rounded-full animate-spin"></div>
                      Enviando...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Rocket className="h-5 w-5" />
                      Completar Pre-Registro
                    </div>
                  )}
                </Button>

                <p className="text-xs text-center text-gray-500 mt-4">
                  Al enviar este formulario, un miembro de nuestro equipo
                  revisará tu solicitud y te contactará para continuar con el
                  proceso de inscripción
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info adicional */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            ¿Tienes dudas? Escríbenos a{" "}
            <a
              href="mailto:hola@babelink.com"
              className="text-[#333366] underline"
            >
              hola@babelink.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PreRegistro;
