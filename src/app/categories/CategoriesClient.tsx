"use client";

import { useState } from "react";

import { Category } from "@/types/categories";

import CategoryItem from "./CategoryItem";
import CategoryContent from "./CategoryContent";

interface CategoriesProp {
  categories: Category[];
}

/* صفحه‌ی دسته‌بندی موبایل: ستون دسته‌ها + محتوای دسته‌ی انتخاب‌شده */
export default function CategoriesClient({
  categories,
}: CategoriesProp) {
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <div className="grid h-full min-h-0 grid-cols-[80px_1fr] overflow-hidden hide-scrollbar md:grid-cols-[110px_1fr]">
      
      {/* Right */}
      <aside className="min-h-0 overflow-y-auto bg-muted hide-scrollbar">
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
      <main className="min-h-0 overflow-y-auto bg-background hide-scrollbar">
        <CategoryContent category={activeCategory} />
      </main>

    </div>
  );
}