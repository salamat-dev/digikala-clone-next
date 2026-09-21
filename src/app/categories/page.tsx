
import { getCategories } from "@/services/categories.service";
import CategoriesClient from "./CategoriesClient";
import BackButton from "@/components/BackButton";
import type { Category } from "@/types/categories";
import RedirectOnDesktop from "./RedirectOnDesktop";

/* صفحه‌ی دسته‌بندی‌ها — فقط موبایل؛ در دسکتاپ به صفحه‌ی اصلی می‌رود */
export default async function CategoriesPage() {
  let categories: Category[] = [];
  let categoriesError = false;

  try {
    categories = await getCategories();
  } catch {
    categoriesError = true;
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
      {/* در lg به بالا کاربر به صفحه‌ی اصلی هدایت می‌شود */}
      <RedirectOnDesktop />

      <div className="lg:hidden">
        {/* <BackButton className="px-4 py-2" /> */}

        <div className="h-[calc(100dvh-164px)] overflow-hidden md:h-[calc(100dvh-114px)] mt-3 md:mt-8">
          <CategoriesClient categories={categories} />
        </div>
      </div>
    </>
  );
}