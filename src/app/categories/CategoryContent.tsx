import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import { Category } from "@/types/categories";
import { getCategoryHref } from "@/lib/getCategoryHref";

import SubCategoryAccordion from "./SubCategoryAccordion";

interface CategoryContentProps {
  category: Category;
}

/* محتوای دسته‌ی انتخاب‌شده: لینک همه محصولات + آکاردئون زیرشاخه‌ها */
export default function CategoryContent({ category }: CategoryContentProps) {
  return (
    <>
      <Link
        href={getCategoryHref(
          category.plp_url ?? category.url,
          category.id,
          category.children
        )}
        className="flex items-center gap-1 px-4 py-3"
      >
        <h2 className="text-xs text-primary">همه محصولات {category.title}</h2>

        <ChevronLeftIcon className="h-3 w-3 text-primary" />
      </Link>

      <SubCategoryAccordion subCategories={category.children} />
    </>
  );
}