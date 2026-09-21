import Link from "next/link";

import { getCategoryHref } from "@/lib/getCategoryHref";
import { categoryIcons, defaultCategoryIcon } from "@/constants/category-icons";
import type { Category } from "@/types/categories";

/* ردیف دایره‌ای دسته‌بندی‌های اصلی زیر اسلایدر */
export default function CategoryCircles({
  categories,
}: {
  categories: Category[];
}) {
  if (categories.length === 0) return null;

  return (
    <section className="w-full pb-3 py-3 xl:py-0 mt-3 lg:px-5 px-0">
      <ul className="mx-auto flex overflow-x-auto lg:overflow-hidden hide-scrollbar lg:grid w-full grid-cols-6 justify-items-center gap-x-4 lg:gap-x-15 gap-y-5 lg:grid-cols-10">
        {categories.map((category) => {
          const Icon =
            categoryIcons[category.icon as keyof typeof categoryIcons] ??
            defaultCategoryIcon;

          return (
            <li key={category.id} className="">
              <Link
                href={getCategoryHref(
                  category.plp_url ?? category.url,
                  category.id,
                  category.children
                )}
                className="flex w-full flex-col items-center gap-2 text-center"
              >
                <span className="flex h-15 w-15 items-center justify-center rounded-full border bg-muted/40 text-primary md:h-17 md:w-17 lg:h-15 lg:w-15">
                  <Icon size={28} stroke={1.5} />
                </span>

                <span className="line-clamp-2 text-[10px] leading-4">
                  {category.title}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

