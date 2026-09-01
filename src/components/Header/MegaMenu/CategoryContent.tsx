import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import { Category, SubCategory } from "@/types/categories";
import { getCategoryHref } from "@/lib/getCategoryHref";

import CategoryColumn from "./CategoryColumn";

interface CategoryContentProps {
  activeCategory: Category;
}

export default function CategoryContent({
  activeCategory,
}: CategoryContentProps) {
  const groupedColumns = activeCategory.children.reduce((columns, child) => {
    if (!columns[child.column_number]) {
      columns[child.column_number] = [];
    }

    columns[child.column_number].push(child);

    return columns;
  }, {} as Record<number, SubCategory[]>);

const allProductsHref = getCategoryHref(
  activeCategory.plp_url ?? activeCategory.url,
  activeCategory.id,
  activeCategory.children
);

return (
  <div className="px-4 py-6 overflow-y-auto">
    {allProductsHref && (
      <Link
        href={allProductsHref}
        className="text-[13px] gap-3 flex items-center font-bold text-red-500"
      >
        همه محصولات {activeCategory.title}
        <ChevronLeftIcon className="h-3 w-3" />
      </Link>
    )}

    <div className="flex gap-7 mt-7">
      {Object.entries(groupedColumns).map(([columnNumber, items]) => (
        <CategoryColumn key={columnNumber} items={items} />
      ))}
    </div>
  </div>
);
}
