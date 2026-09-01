import { Category } from "@/types/categories";
import CategoryItem from "./CategoryItem";

interface CategoryListProps {
  categories: Category[];
  activeCategory: Category;
  onHover: (category: Category) => void;
}

export default function CategoryList({
  categories,
  activeCategory,
  onHover,
}: CategoryListProps) {
  return (
    <div className="w-[250px] overflow-y-auto shrink-0 border-l border-gray-200">
      <ul>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            activeCategory={activeCategory}
            onHover={onHover}
          />
        ))}
      </ul>
    </div>
  );
}