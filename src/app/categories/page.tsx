import { getCategories } from "@/services/categories.service";
import type { Category } from "@/types/categories";

import CategoriesClient from "./CategoriesClient";
import BackButton from "@/components/BackButton";

/* صفحه‌ی دسته‌بندی‌ها در حالت موبایل — سرور کامپوننت */
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
    <>
      <BackButton className="px-4 py-2" />

      <div className="h-[calc(100dvh-164px)] overflow-hidden md:h-[calc(100dvh-184px)]">
        <CategoriesClient categories={categories} />
      </div>
    </>
  );
}