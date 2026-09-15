import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import { Category, SubCategory } from "@/types/categories";
import { getCategoryHref } from "@/lib/getCategoryHref";

import CategoryColumn from "./CategoryColumn";

interface CategoryContentProps {
  activeCategory: Category;
}

/* پنل مگامنو: زیرشاخه‌ها را بر اساس شماره‌ی ستون گروه‌بندی می‌کند */
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

  return (
    <div className="overflow-y-auto px-4 py-6">
      <Link
        href={getCategoryHref(
          activeCategory.plp_url ?? activeCategory.url,
          activeCategory.id,
          activeCategory.children
        )}
        className="flex items-center gap-3 text-[13px] font-bold text-red-500"
      >
        همه محصولات {activeCategory.title}
        <ChevronLeftIcon className="h-3 w-3" />
      </Link>

      <div className="mt-7 flex gap-7">
        {Object.entries(groupedColumns).map(([columnNumber, items]) => (
          <CategoryColumn key={columnNumber} items={items} />
        ))}
      </div>
    </div>
  );
}