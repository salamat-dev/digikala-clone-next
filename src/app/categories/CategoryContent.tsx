import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import { Category } from "@/types/categories";
import { getCategoryHref } from "@/lib/getCategoryHref";

import SubCategoryAccordion from "./SubCategoryAccordion";

interface CategoryContentProps {
  category: Category;
}

export default function CategoryContent({ category }: CategoryContentProps) {
const allProductsHref = getCategoryHref(
  category.plp_url ?? category.url,
  category.id,
  category.children
);

return (
  <>
    {allProductsHref && (
      <Link href={allProductsHref} className="flex items-center gap-1 px-4 py-3">
        <h2 className="text-xs text-primary">همه محصولات {category.title}</h2>
        <ChevronLeftIcon className="w-3 h-3 text-primary" />
      </Link>
    )}

    <SubCategoryAccordion subCategories={category.children} />
  </>
);
}
