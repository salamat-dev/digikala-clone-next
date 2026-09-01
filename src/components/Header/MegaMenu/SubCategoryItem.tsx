import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import { SubCategory } from "@/types/categories";
import { getCategoryHref } from "@/lib/getCategoryHref";

interface SubCategoryItemProps {
  item: SubCategory;
}

export default function SubCategoryItem({ item }: SubCategoryItemProps) {
const href = getCategoryHref(item.url, item.id, item.children);

  return (
    <div className="space-y-4">
      {href ? (
        <Link
          href={href}
          className="flex size-full items-center gap-3 hover:text-secondary transition-colors text-[15px] font-bold"
        >
          <div className="w-[1.5px] h-5 bg-secondary rounded-full" />
          {item.title}
          <ChevronLeftIcon className="w-3 h-3" />
        </Link>
      ) : (
        <div className="flex items-center gap-3 text-[15px] font-bold">
          <div className="w-[1.5px] h-5 bg-secondary rounded-full" />
          {item.title}
        </div>
      )}

      <div className="mr-5 space-y-2 flex flex-col">
        {item.children.map((child) => {
          const childHref = getCategoryHref(child.url, child.id);

          return childHref ? (
            <Link
              key={child.id}
              href={childHref}
              className="text-sm text-gray-500 hover:text-secondary"
            >
              {child.title}
            </Link>
          ) : (
            <span key={child.id} className="text-sm text-gray-400">
              {child.title}
            </span>
          );
        })}
      </div>
    </div>
  );
}