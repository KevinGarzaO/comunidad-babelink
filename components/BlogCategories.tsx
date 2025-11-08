import { Badge } from "./ui/badge";

const categoryPosts = {
  ia: [
    {
      id: 1,
      title: "El impacto de ChatGPT en la productividad empresarial",
      excerpt: "Descubre cómo las empresas están implementando IA generativa.",
    },
    {
      id: 2,
      title: "Machine Learning para análisis predictivo",
      excerpt: "Implementa modelos de ML para anticipar tendencias.",
    },
  ],
  tecnologia: [
    {
      id: 3,
      title: "Cloud Computing: Infraestructura para el futuro",
      excerpt: "Por qué las empresas están migrando a la nube.",
    },
    {
      id: 4,
      title: "Ciberseguridad en 2025",
      excerpt: "Las mejores prácticas para proteger tu empresa.",
    },
  ],
  marketing: [
    {
      id: 5,
      title: "Marketing Digital en 2025: Tendencias que dominarán",
      excerpt: "Análisis profundo de las estrategias de marketing.",
    },
    {
      id: 6,
      title: "SEO en la era de la búsqueda por voz",
      excerpt: "Optimiza tu contenido para asistentes virtuales.",
    },
  ],
  negocios: [
    {
      id: 7,
      title: "Automatización: La clave para escalar tu negocio",
      excerpt: "Herramientas y estrategias para automatizar procesos.",
    },
    {
      id: 8,
      title: "Liderazgo en la era digital",
      excerpt: "Cómo liderar equipos remotos con éxito.",
    },
  ],
};

interface BlogCategorySectionProps {
  category: keyof typeof categoryPosts;
  title: string;
  color: string;
}

function BlogCategorySection({ category, title, color }: BlogCategorySectionProps) {
  return (
    <section id={category} className="py-12 md:py-20 border-b border-gray-200 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Badge
            className="border-0 px-4 py-2"
            style={{
              backgroundColor: category === "negocios" ? color : color + "dd",
              color: category === "negocios" ? "#FFCC00" : "#333366",
            }}
          >
            {title}
          </Badge>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categoryPosts[category].map((post) => (
            <div
              key={post.id}
              className="p-6 bg-white rounded-lg border border-gray-200 hover:border-[#FFCC00] transition-all cursor-pointer hover:shadow-md"
            >
              <h3 className="mb-2 text-[#333366]">{post.title}</h3>
              <p className="text-gray-600 text-sm">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BlogCategories() {
  return (
    <>
      <BlogCategorySection category="ia" title="Inteligencia Artificial" color="#FFCC00" />
      <BlogCategorySection category="tecnologia" title="Tecnología" color="#E2E3F7" />
      <BlogCategorySection category="marketing" title="Marketing" color="#F6CBCA" />
      <BlogCategorySection category="negocios" title="Negocios" color="#333366" />
    </>
  );
}
