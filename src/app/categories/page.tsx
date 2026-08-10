import { getCategories } from "@/services/categories.service";
import type { Category } from "@/types/categories";

import CategoriesClient from "./CategoriesClient";

export default async function CategoriesPage() {
  let categories: Category[] = [];
  let categoriesError = false;

  try {
    categories = await getCategories();
  } catch (error) {
    categoriesError = true;
    console.error(error);
  }

  if (categories.length === 0) {
    return (
      <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">
        هیچ دسته‌بندی‌ای وجود ندارد.
      </div>
    );
  }

  if (categoriesError) {
    return (
      <div className="flex items-center justify-center py-16 text-sm text-muted-foreground">
        دریافت دسته‌بندی‌ها با مشکل مواجه شد.
      </div>
    );
  }

  return (
    <div className="h-[calc(100dvh-124px)] overflow-hidden md:h-[calc(100dvh-144px)]">
      <CategoriesClient categories={categories} />
    </div>
  );
}