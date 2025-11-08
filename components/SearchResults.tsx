import { useState } from "react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Clock, ArrowRight, X, Heart, Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Post } from "../src/data/posts";

interface SearchResultsProps {
  results: Post[];
  searchQuery: string;
  onClose: () => void;
  onPostClick: (postId: number) => void;
}

export function SearchResults({
  results,
  searchQuery,
  onClose,
  onPostClick,
}: SearchResultsProps) {
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

  if (!searchQuery) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 overflow-y-auto animate-in fade-in">
      <div className="min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <div>
                <h2 className="text-[#333366] mb-1">Resultados de búsqueda</h2>
                <p className="text-gray-600">
                  {results.length > 0
                    ? `${results.length} ${
                        results.length === 1
                          ? "artículo encontrado"
                          : "artículos encontrados"
                      } para "${searchQuery}"`
                    : `No se encontraron artículos para "${searchQuery}"`}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Results Grid */}
            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group border-2 border-transparent hover:border-[#FFCC00]/20"
                    onClick={() => {
                      onPostClick(post.id);
                      onClose();
                    }}
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
                          color:
                            post.category === "Negocios"
                              ? "#FFCC00"
                              : "#333366",
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
                          title={
                            likedPosts.has(post.id) ? "Te gusta" : "Me gusta"
                          }
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
                          title={
                            savedPosts.has(post.id) ? "Guardado" : "Guardar"
                          }
                        >
                          <Bookmark
                            className="h-5 w-5"
                            style={{
                              fill: savedPosts.has(post.id)
                                ? "#FFCC00"
                                : "none",
                              color: savedPosts.has(post.id)
                                ? "#FFCC00"
                                : "#4b5563",
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
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <X className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-600 mb-2">
                  No se encontraron artículos
                </p>
                <p className="text-sm text-gray-500">
                  Intenta con otros términos de búsqueda
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
