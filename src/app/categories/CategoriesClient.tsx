"use client";

import { useState } from "react";

import { Category } from "@/types/categories";

import CategoryItem from "./CategoryItem";
import CategoryContent from "./CategoryContent";

interface CategoriesProp {
  categories: Category[];
}

export default function CategoriesClient({
  categories,
}: CategoriesProp) {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <div className="grid h-[calc(100dvh-128px)] grid-cols-[80px_1fr] md:grid-cols-[110px_1fr] lg:hidden">
      {/* Right */}
      <aside className="overflow-y-auto bg-muted hide-scrollbar">
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            active={activeCategory.id === category.id}
            onClick={() => setActiveCategory(category)}
          />
        ))}
      </aside>

      {/* Left */}
      <main className="overflow-y-auto bg-background hide-scrollbar">
        <CategoryContent category={activeCategory} />
      </main>
    </div>
  );
}