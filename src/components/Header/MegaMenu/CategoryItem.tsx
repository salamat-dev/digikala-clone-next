import Link from "next/link";

import { Category } from "@/types/categories";
import { categoryIcons, defaultCategoryIcon } from "@/constants/category-icons";
import { getCategoryHref } from "@/lib/getCategoryHref";

interface CategoryItemProps {
  category: Category;
  activeCategory: Category;
  onHover: (categories: Category) => void;
}

export default function CategoryItem({ category, activeCategory, onHover }: CategoryItemProps) {
  const Icon =
    categoryIcons[category.icon as keyof typeof categoryIcons] ?? defaultCategoryIcon;

const href = getCategoryHref(
  category.plp_url ?? category.url,
  category.id,
  category.children
);

  return (
    <li
      className={`flex items-center gap-3 px-4 ${
        activeCategory.id === category.id
          ? "text-primary bg-white"
          : "hover:bg-white hover:text-primary"
      } transition-colors`}
      onMouseEnter={() => onHover(category)}
    >
      <Icon size={24} stroke={1.6} />

      {href ? (
        <Link href={href} className="text-sm py-3 font-medium size-full">
          {category.title}
        </Link>
      ) : (
        <span className="text-sm py-3 font-medium size-full">
          {category.title}
        </span>
      )}
    </li>
  );
}
