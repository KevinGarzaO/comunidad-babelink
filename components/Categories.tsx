import { Brain, Laptop, TrendingUp, Briefcase } from "lucide-react";
import { Card } from "./ui/card";

const categories = [
  {
    id: "ia",
    title: "Inteligencia Artificial",
    icon: Brain,
    color: "#FFCC00",
    description: "Explora el futuro de la IA y su impacto en los negocios",
    count: "24 artículos",
  },
  {
    id: "tecnologia",
    title: "Tecnología",
    icon: Laptop,
    color: "#E2E3F7",
    description: "Las últimas innovaciones y herramientas tecnológicas",
    count: "18 artículos",
  },
  {
    id: "marketing",
    title: "Marketing",
    icon: TrendingUp,
    color: "#F6CBCA",
    description: "Estrategias y tendencias del marketing digital",
    count: "32 artículos",
  },
  {
    id: "negocios",
    title: "Negocios",
    icon: Briefcase,
    color: "#333366",
    description: "Insights y casos de éxito empresarial",
    count: "21 artículos",
  },
];

export function Categories() {
  return (
    <section id="categorias" className="py-12 md:py-20 lg:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="mb-3 md:mb-4">Explora nuestras categorías</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Contenido especializado para profesionales que buscan estar a la
            vanguardia
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className="p-6 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-[#FFCC00] hover:-translate-y-1"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110"
                  style={{
                    backgroundColor:
                      category.id === "negocios"
                        ? category.color
                        : category.color + "33",
                  }}
                >
                  <Icon
                    className="h-7 w-7"
                    style={{
                      color: category.id === "negocios" ? "#FFCC00" : "#333366",
                    }}
                  />
                </div>
                <h3 className="mb-2 text-[#333366]">{category.title}</h3>
                <p className="text-gray-600 text-sm mb-3">
                  {category.description}
                </p>
                <p className="text-xs text-gray-500">{category.count}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
