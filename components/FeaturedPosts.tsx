import { useState } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Clock, ArrowRight, Heart, Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { posts } from "../src/data/posts";

interface FeaturedPostsProps {
  onPostClick: (postId: number) => void;
}

export function FeaturedPosts({ onPostClick }: FeaturedPostsProps) {
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<number>>(new Set());

  const handleLike = (postId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleSave = (postId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  // Mostrar solo los primeros 6 artículos en la sección destacada
  const featuredPosts = posts.slice(0, 6);

  return (
    <section id="articulos" className="py-12 md:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 md:mb-12 gap-4">
          <div>
            <h2 className="mb-2">Artículos destacados</h2>
            <p className="text-gray-600">
              Las lecturas más recientes y populares
            </p>
          </div>
          <Button
            variant="ghost"
            className="text-[#333366] hover:text-[#FFCC00]"
          >
            Ver todos
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-[#FFCC00]/20"
              onClick={() => onPostClick(post.id)}
            >
              <div className="relative overflow-hidden aspect-video">
                <ImageWithFallback
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge
                  className="absolute top-4 left-4 border-0 shadow-lg"
                  style={{
                    backgroundColor:
                      post.category === "Negocios"
                        ? post.categoryColor
                        : post.categoryColor + "dd",
                    color: post.category === "Negocios" ? "#FFCC00" : "#333366",
                  }}
                >
                  {post.category}
                </Badge>
              </div>
              <CardContent className="p-5 md:p-6">
                <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-500 mb-3">
                  <span>{post.date}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 md:h-4 md:w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <h3 className="mb-3 text-[#333366] group-hover:text-[#FFCC00] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {post.excerpt}
                </p>
              </CardContent>
              <CardFooter className="px-5 md:px-6 pb-5 md:pb-6 flex items-center justify-between">
                <button className="text-[#333366] hover:text-[#FFCC00] flex items-center gap-2 transition-colors group-hover:gap-3 text-sm">
                  Leer más
                  <ArrowRight className="h-4 w-4 transition-all" />
                </button>
                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => handleLike(post.id, e)}
                    className={`flex items-center gap-1.5 transition-all hover:scale-110 ${
                      likedPosts.has(post.id)
                        ? "text-red-500"
                        : "text-gray-600 hover:text-red-500"
                    }`}
                    title={likedPosts.has(post.id) ? "Te gusta" : "Me gusta"}
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        likedPosts.has(post.id) ? "fill-red-500" : ""
                      }`}
                    />
                    <span className="text-xs">
                      {likedPosts.has(post.id) ? "Te gusta" : "Me gusta"}
                    </span>
                  </button>
                  <button
                    onClick={(e) => handleSave(post.id, e)}
                    className="transition-all hover:scale-110"
                    title={savedPosts.has(post.id) ? "Guardado" : "Guardar"}
                  >
                    <Bookmark
                      className="h-5 w-5"
                      style={{
                        fill: savedPosts.has(post.id) ? "#FFCC00" : "none",
                        color: savedPosts.has(post.id) ? "#FFCC00" : "#4b5563",
                        stroke: savedPosts.has(post.id)
                          ? "#FFCC00"
                          : "currentColor",
                      }}
                    />
                  </button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
