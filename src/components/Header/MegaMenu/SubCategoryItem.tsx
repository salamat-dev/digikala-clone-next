import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import { SubCategory } from "@/types/categories";
import { getCategoryHref } from "@/lib/getCategoryHref";

interface SubCategoryItemProps {
  item: SubCategory;
}

/* یک زیرشاخه به همراه فرزندانش در مگامنو */
export default function SubCategoryItem({ item }: SubCategoryItemProps) {
  return (
    <div className="space-y-4">
      <Link
        href={getCategoryHref(item.url, item.id, item.children)}
        className="flex size-full items-center gap-3 text-[15px] font-bold transition-colors hover:text-secondary"
      >
        <div className="h-5 w-[1.5px] rounded-full bg-secondary" />

        {item.title}

        <ChevronLeftIcon className="h-3 w-3" />
      </Link>

      <div className="mr-5 flex flex-col space-y-2">
        {item.children.map((child) => (
          <Link
            key={child.id}
            href={getCategoryHref(child.url, child.id)}
            className="text-sm text-gray-500 hover:text-secondary"
          >
            {child.title}
          </Link>
        ))}
      </div>
    </div>
  );
}