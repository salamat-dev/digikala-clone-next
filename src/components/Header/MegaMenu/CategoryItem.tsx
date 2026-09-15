import Link from "next/link";

import { Category } from "@/types/categories";
import { categoryIcons, defaultCategoryIcon } from "@/constants/category-icons";
import { getCategoryHref } from "@/lib/getCategoryHref";

interface CategoryItemProps {
  category: Category;
  activeCategory: Category;
  onHover: (categories: Category) => void;
}

/* یک دسته‌ی اصلی در مگامنو؛ هاور پنل را عوض و کلیک به صفحه‌ی محصولات می‌برد */
export default function CategoryItem({
  category,
  activeCategory,
  onHover,
}: CategoryItemProps) {
  const Icon =
    categoryIcons[category.icon as keyof typeof categoryIcons] ??
    defaultCategoryIcon;

  const href = getCategoryHref(
    category.plp_url ?? category.url,
    category.id,
    category.children
  );

  return (
    <li
      className={`flex items-center gap-3 px-4 ${
        activeCategory.id === category.id
          ? "bg-white text-primary"
          : "hover:bg-white hover:text-primary"
      } transition-colors`}
      onMouseEnter={() => onHover(category)}
    >
      <Icon size={24} stroke={1.6} />

      <Link href={href} className="size-full py-3 text-sm font-medium">
        {category.title}
      </Link>
    </li>
  );
}