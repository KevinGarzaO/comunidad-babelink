"use client";

import { useState, useMemo } from "react";
import { Hero } from "../components/Hero";
import { BlogCategories } from "../components/BlogCategories";
import { BlogPost } from "../components/BlogPost";
import { Categories } from "../components/Categories";
import { CreatorsPromo } from "../components/CreatorsPromo";
import { FeaturedPosts } from "../components/FeaturedPosts";
import { Newsletter } from "../components/Newsletter";
import { ScrollToTop } from "../components/ScrollToTop";
import { SearchResults } from "../components/SearchResults";
import { posts } from "../src/data/posts";

interface BlogPageProps {
  onSearch: (query: string) => void;
  searchQuery: string;
}

function BlogPage({
  onSearch = () => {},
  searchQuery = "",
}: Partial<BlogPageProps>) {
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

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

  const handleCloseSearch = () => onSearch("");
  const handlePostClick = (postId: number) => {
    setSelectedPostId(postId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const selectedPost = selectedPostId
    ? posts.find((p) => p.id === selectedPostId)
    : null;

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-white">
        <BlogPost slug="" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Categories />
      <FeaturedPosts onPostClick={handlePostClick} />
      <CreatorsPromo />
      <BlogCategories />
      <Newsletter />
      <ScrollToTop />

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

export default BlogPage;
