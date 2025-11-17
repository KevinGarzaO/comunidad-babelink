"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { Avatar } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  ArrowLeft,
  Image as ImageIcon,
  X as XIcon,
  Send,
  Hash,
  Eye,
  FileText,
  Info,
  Calendar as CalendarIcon,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../src/contexts/AuthContext";
import { useRouter } from "next/navigation";

// Etiquetas disponibles para autocompletado
const AVAILABLE_TAGS = [
  "IA",
  "Inteligencia Artificial",
  "Machine Learning",
  "Deep Learning",
  "Marketing",
  "Marketing Digital",
  "SEO",
  "Redes Sociales",
  "Diseño",
  "Diseño Gráfico",
  "UI/UX",
  "Branding",
  "Programación",
  "JavaScript",
  "Python",
  "React",
  "TypeScript",
  "Creatividad",
  "Contenido",
  "Storytelling",
  "Video",
  "Edición de Video",
  "YouTube",
  "TikTok",
  "Podcast",
  "Audio",
  "Producción",
  "Escritura",
  "Copywriting",
  "Blogging",
  "Productividad",
  "Emprendimiento",
  "Negocios",
  "Fotografía",
  "Ilustración",
  "Animación",
  "ChatGPT",
  "Midjourney",
  "Stable Diffusion",
  "Automatización",
  "No-Code",
  "Low-Code",
];

function CreatePost() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [headerImage, setHeaderImage] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [activeTab, setActiveTab] = useState<"write" | "preview">("write");
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTime, setScheduledTime] = useState("");
  const router = useRouter();

  // Filtrar etiquetas según el input
  const filteredTags = AVAILABLE_TAGS.filter(
    (tag) =>
      tag.toLowerCase().includes(tagInput.toLowerCase()) && !tags.includes(tag)
  ).slice(0, 10);

  const handleImageUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const imageUrl = reader.result as string;
          setHeaderImage(imageUrl);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleRemoveImage = () => {
    setHeaderImage("");
  };

  const handleAddTag = (tag: string) => {
    if (tag.trim() && !tags.includes(tag.trim())) {
      setTags((prev) => [...prev, tag.trim()]);
      setTagInput("");
      setShowTagSuggestions(false);
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleTagInputChange = (value: string) => {
    setTagInput(value);
    setShowTagSuggestions(value.length > 0);
  };

  const handlePublish = () => {
    if (!title.trim()) {
      toast.error("Error", {
        description: "Por favor escribe un título para tu post.",
      });
      return;
    }

    if (!content.trim()) {
      toast.error("Error", {
        description: "Por favor escribe el contenido de tu post.",
      });
      return;
    }

    if (tags.length === 0) {
      toast.error("Error", {
        description: "Debes agregar al menos una etiqueta.",
      });
      return;
    }

    toast.success("¡Post publicado exitosamente!", {
      description: "Tu publicación ya está visible en la comunidad.",
    });

    //TODO -> Regresar
    router.back();
  };

  const handleSchedule = () => {
    if (!title.trim() || !content.trim() || tags.length === 0) {
      toast.error("Error", {
        description:
          "Completa todos los campos obligatorios antes de programar.",
      });
      return;
    }

    if (!scheduledDate || !scheduledTime) {
      toast.error("Error", {
        description:
          "Selecciona una fecha y hora para programar la publicación.",
      });
      return;
    }

    toast.success("¡Post programado exitosamente!", {
      description: `Se publicará el ${scheduledDate} a las ${scheduledTime}`,
    });

    setShowScheduleModal(false);

    router.back();
  };

  const handlePreview = () => {
    if (!title.trim() || !content.trim() || tags.length === 0) {
      toast.error("Error", {
        description:
          "Completa todos los campos obligatorios para ver la vista previa.",
      });
      return;
    }

    // Scroll to preview section
    const previewSection = document.getElementById("final-preview");
    if (previewSection) {
      previewSection.scrollIntoView({ behavior: "smooth", block: "center" });
      toast.success("Vista previa", {
        description: "Desplazándote a la vista previa final de tu publicación.",
      });
    }
  };

  // Función para renderizar Markdown básico
  const renderMarkdown = (text: string) => {
    let html = text;

    // Encabezados
    html = html.replace(
      /^### (.*$)/gim,
      '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>'
    );
    html = html.replace(
      /^## (.*$)/gim,
      '<h2 class="text-xl font-semibold mt-4 mb-2">$1</h2>'
    );
    html = html.replace(
      /^# (.*$)/gim,
      '<h1 class="text-2xl font-semibold mt-4 mb-2">$1</h1>'
    );

    // Negrita
    html = html.replace(
      /\*\*(.+?)\*\*/g,
      '<strong class="font-bold">$1</strong>'
    );
    html = html.replace(/__(.+?)__/g, '<strong class="font-bold">$1</strong>');

    // Cursiva
    html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');
    html = html.replace(/_(.+?)_/g, '<em class="italic">$1</em>');

    // Código inline
    html = html.replace(
      /`(.+?)`/g,
      '<code class="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>'
    );

    // Links
    html = html.replace(
      /\[(.+?)\]\((.+?)\)/g,
      '<a href="$2" class="text-[#333366] underline" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Listas
    html = html.replace(/^\* (.+)$/gim, '<li class="ml-4">• $1</li>');
    html = html.replace(/^- (.+)$/gim, '<li class="ml-4">• $1</li>');

    // Saltos de línea
    html = html.replace(/\n/g, "<br />");

    return html;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={router.back}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl">Crear nueva publicación</h1>
              <p className="text-sm text-gray-500">
                Comparte tu conocimiento con la comunidad
              </p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Button
              onClick={handlePreview}
              variant="outline"
              disabled={!title.trim() || !content.trim() || tags.length === 0}
              className="border-[#333366] text-[#333366] hover:bg-[#E2E3F7] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button
              onClick={() => setShowScheduleModal(true)}
              variant="outline"
              disabled={!title.trim() || !content.trim() || tags.length === 0}
              className="border-[#FFCC00] text-[#333366] hover:bg-[#FFCC00]/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Programar
            </Button>
            <Button
              onClick={handlePublish}
              disabled={!title.trim() || !content.trim() || tags.length === 0}
              className="bg-[#333366] text-white hover:bg-[#333366]/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-4 w-4 mr-2" />
              Publicar
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Autor */}
          <div className="flex items-center gap-4 p-4 bg-[#E2E3F7] rounded-xl shadow-sm max-w-sm">
            {/* Avatar */}
            <div className="shrink-0 w-12 h-12 relative rounded-full overflow-hidden bg-gray-200">
              <ImageWithFallback
                src={
                  user?.avatar || "https://demofree.sirv.com/nope-not-here.jpg"
                }
                alt={user?.name || "Usuario"}
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Información del usuario */}
            <div className="flex flex-col justify-center">
              <p className="font-semibold text-[#333366] truncate">
                {user?.name || "Usuario"}
              </p>
              <p className="text-sm text-gray-600 truncate">
                @{user?.username || "usuario"}
              </p>
            </div>
          </div>

          {/* Título */}
          <div>
            <Label htmlFor="title" className="text-base mb-3 block">
              Título *
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Escribe un título atractivo para tu publicación..."
              className="text-lg h-12"
            />
          </div>

          {/* Imagen de encabezado */}
          <div>
            <Label className="text-base mb-3 block">
              Imagen de encabezado (opcional)
            </Label>
            <div className="space-y-3">
              {headerImage ? (
                <div className="relative group">
                  <ImageWithFallback
                    src={headerImage}
                    alt="Imagen de encabezado"
                    className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <XIcon className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleImageUpload}
                  className="w-full border-dashed border-2 h-32 hover:bg-[#E2E3F7] hover:border-[#333366]"
                >
                  <ImageIcon className="h-6 w-6 mr-2" />
                  Seleccionar imagen de encabezado
                </Button>
              )}
            </div>
          </div>

          <Separator />

          {/* Editor Markdown */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base">Contenido</Label>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Info className="h-4 w-4" />
                <span>Puedes usar Markdown</span>
              </div>
            </div>

            <Tabs
              value={activeTab}
              onValueChange={(v: string) =>
                setActiveTab(v as "write" | "preview")
              }
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="write" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Escribir
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  Vista previa
                </TabsTrigger>
              </TabsList>

              <TabsContent value="write" className="mt-4">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={`# Título de tu publicación

            Escribe aquí el contenido de tu post usando Markdown...

            ## Ejemplos de formato:

            - **Texto en negrita**
            - *Texto en cursiva*
            - \`código inline\`
            - [Enlaces](https://ejemplo.com)

            ### Puedes crear secciones

            * Lista con viñetas
            * Otro elemento

            **Tip:** Usa los encabezados # ## ### para organizar tu contenido.`}
                  className="w-full min-h-[500px] p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#333366] focus:border-transparent font-mono text-sm resize-y"
                  style={{
                    fontFamily:
                      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  }}
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500">
                    {content.length} caracteres
                  </p>
                  <a
                    href="https://www.markdownguide.org/basic-syntax/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#333366] hover:underline"
                  >
                    Guía de Markdown →
                  </a>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="mt-4">
                <Card className="border-2 border-gray-200">
                  <CardContent className="p-6">
                    {content.trim() ? (
                      <div
                        className="prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: renderMarkdown(content),
                        }}
                      />
                    ) : (
                      <div className="text-center py-12 text-gray-400">
                        <Eye className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>
                          Escribe algo en la pestaña `&quot;`Escribir`&quot;`
                          para ver la vista previa
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <Separator />

          {/* Etiquetas (obligatorias) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-base">Etiquetas *</Label>
              <span className="text-sm text-gray-500">
                {tags.length === 0
                  ? "Obligatorio"
                  : `${tags.length} etiqueta${tags.length !== 1 ? "s" : ""}`}
              </span>
            </div>

            {/* Tags seleccionadas */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3 p-4 bg-[#E2E3F7] rounded-lg">
                {tags.map((tag, index) => (
                  <Badge
                    key={index}
                    className="bg-[#333366] text-white hover:bg-[#333366]/90 cursor-pointer text-sm py-1.5 px-3"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <Hash className="h-3 w-3 mr-1" />
                    {tag}
                    <XIcon className="h-3 w-3 ml-2" />
                  </Badge>
                ))}
              </div>
            )}

            {/* Input con autocompletado */}
            <div className="relative">
              <div className="flex gap-2">
                <Input
                  value={tagInput}
                  onChange={(e) => handleTagInputChange(e.target.value)}
                  onFocus={() => setShowTagSuggestions(tagInput.length > 0)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && tagInput.trim()) {
                      e.preventDefault();
                      handleAddTag(tagInput);
                    }
                  }}
                  placeholder="Busca o escribe una etiqueta..."
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={() => handleAddTag(tagInput)}
                  disabled={!tagInput.trim()}
                  className="bg-[#FFCC00] text-[#333366] hover:bg-[#FFCC00]/90"
                >
                  <Hash className="h-4 w-4 mr-1" />
                  Agregar
                </Button>
              </div>

              {/* Sugerencias de autocompletado */}
              {showTagSuggestions && filteredTags.length > 0 && (
                <Card className="absolute z-10 w-full mt-1 max-h-64 overflow-y-auto shadow-lg">
                  <CardContent className="p-2">
                    {filteredTags.map((tag, index) => (
                      <button
                        key={index}
                        onClick={() => handleAddTag(tag)}
                        className="w-full text-left px-3 py-2 hover:bg-[#E2E3F7] rounded transition-colors flex items-center gap-2"
                      >
                        <Hash className="h-4 w-4 text-gray-400" />
                        <span>{tag}</span>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              )}
            </div>

            <p className="text-xs text-gray-500 mt-2">
              Selecciona etiquetas existentes o crea nuevas. Las etiquetas
              ayudan a otros usuarios a encontrar tu contenido.
            </p>
          </div>

          {/* Vista previa final del post */}
          {(title.trim() || content.trim() || headerImage) && (
            <>
              <Separator />
              <div id="final-preview">
                <Label className="text-base mb-3 block">
                  Vista previa final
                </Label>
                <Card className="border-2 border-[#333366]">
                  <CardContent className="p-0">
                    {/* Header del post */}
                    <div className="p-6 pb-2">
                      <div className="flex items-start gap-3 mb-4">
                        <Avatar className="h-10 w-10">
                          <ImageWithFallback
                            src={
                              user?.avatar ||
                              "https://demofree.sirv.com/nope-not-here.jpg"
                            }
                            alt={user?.name || ""}
                            className="object-cover"
                          />
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{user?.name}</p>
                          <p className="text-xs text-gray-500">Justo ahora</p>
                        </div>
                      </div>

                      {/* Título */}
                      {title.trim() && (
                        <h2 className="text-2xl mb-2">{title}</h2>
                      )}
                    </div>

                    {/* Imagen de encabezado */}
                    {headerImage && (
                      <div className="w-full mb-2">
                        <ImageWithFallback
                          src={headerImage}
                          alt="Header"
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}

                    <div className="px-6 pb-2">
                      {/* Contenido */}
                      {content.trim() && (
                        <div
                          className="prose prose-sm max-w-none mb-4"
                          dangerouslySetInnerHTML={{
                            __html: renderMarkdown(content),
                          }}
                        />
                      )}

                      {/* Tags */}
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200">
                          {tags.map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* Botones inferiores (móvil) */}
          <div className="md:hidden pb-4 space-y-2">
            <Button
              onClick={handlePreview}
              variant="outline"
              disabled={!title.trim() || !content.trim() || tags.length === 0}
              className="w-full border-[#333366] text-[#333366] hover:bg-[#E2E3F7] disabled:opacity-50 disabled:cursor-not-allowed h-12"
            >
              <Eye className="h-5 w-5 mr-2" />
              Preview
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => setShowScheduleModal(true)}
                variant="outline"
                disabled={!title.trim() || !content.trim() || tags.length === 0}
                className="border-[#FFCC00] text-[#333366] hover:bg-[#FFCC00]/10 disabled:opacity-50 disabled:cursor-not-allowed h-12"
              >
                <CalendarIcon className="h-5 w-5 mr-2" />
                Programar
              </Button>
              <Button
                onClick={handlePublish}
                disabled={!title.trim() || !content.trim() || tags.length === 0}
                className="bg-[#333366] text-white hover:bg-[#333366]/90 disabled:opacity-50 disabled:cursor-not-allowed h-12"
              >
                <Send className="h-5 w-5 mr-2" />
                Publicar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Programación */}
      <Dialog open={showScheduleModal} onOpenChange={setShowScheduleModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <CalendarIcon className="h-6 w-6 text-[#333366]" />
              Programar publicación
            </DialogTitle>
            <DialogDescription>
              Selecciona la fecha y hora en que deseas que se publique tu post
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Fecha */}
            <div>
              <Label htmlFor="schedule-date" className="text-base mb-2 block">
                Fecha de publicación *
              </Label>
              <Input
                id="schedule-date"
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full"
              />
            </div>

            {/* Hora */}
            <div>
              <Label htmlFor="schedule-time" className="text-base mb-2 block">
                Hora de publicación *
              </Label>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-400" />
                <Input
                  id="schedule-time"
                  type="time"
                  value={scheduledTime}
                  onChange={(e) => setScheduledTime(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Resumen */}
            {scheduledDate && scheduledTime && (
              <div className="p-4 bg-[#E2E3F7] rounded-lg">
                <p className="text-sm text-gray-600 mb-1">
                  Tu publicación se programará para:
                </p>
                <p className="font-medium text-[#333366]">
                  {new Date(scheduledDate).toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  a las {scheduledTime}
                </p>
              </div>
            )}
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              variant="outline"
              onClick={() => {
                setShowScheduleModal(false);
                setScheduledDate("");
                setScheduledTime("");
              }}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSchedule}
              disabled={!scheduledDate || !scheduledTime}
              className="flex-1 bg-[#FFCC00] text-[#333366] hover:bg-[#FFCC00]/90 disabled:opacity-50"
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Programar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreatePost;
