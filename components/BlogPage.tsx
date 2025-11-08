import { useState, useMemo } from "react";
import { Hero } from "./Hero";
import { Categories } from "./Categories";
import { FeaturedPosts } from "./FeaturedPosts";
import { BlogCategories } from "./BlogCategories";
import { Newsletter } from "./Newsletter";
import { ScrollToTop } from "./ScrollToTop";
import { SearchResults } from "./SearchResults";
import { BlogPost } from "./BlogPost";
import { CreatorsPromo } from "./CreatorsPromo";
import { posts } from "../src/data/posts";

interface BlogPageProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onNavigate: (page: string) => void;
}

export function BlogPage({ onSearch, searchQuery, onNavigate }: BlogPageProps) {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  // Filtrar posts basándose en la búsqueda
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleCloseSearch = () => {
    onSearch("");
  };

  const handlePostClick = (postId: number) => {
    setSelectedPostId(postId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToBlog = () => {
    setSelectedPostId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectedPost = selectedPostId
    ? posts.find((p) => p.id === selectedPostId)
    : null;

  // Si hay un post seleccionado, mostrar solo el post
  if (selectedPost) {
    return (
      <div className="min-h-screen bg-white">
        <BlogPost
          post={selectedPost}
          onBack={handleBackToBlog}
          onPostClick={handlePostClick}
        />
      </div>
    );
  }

  // Vista principal del blog
  return (
    <div className="min-h-screen bg-white">
      <Hero onNavigate={onNavigate} />
      <Categories />
      <FeaturedPosts onPostClick={handlePostClick} />
      <CreatorsPromo onNavigate={onNavigate} />
      <BlogCategories />
      <Newsletter />
      <ScrollToTop />

      {/* Search Results Overlay */}
      {searchQuery && (
        <SearchResults
          results={searchResults}
          searchQuery={searchQuery}
          onClose={handleCloseSearch}
          onPostClick={handlePostClick}
        />
      )}
    </div>
  );
}
