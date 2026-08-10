import type { Category } from "@/types/categories";
import { getCategories } from "@/services/categories.service";

import Header from "./Header";
import BottomNavigation from "./mobileMenu/BottomNavigation";

export default async function HeaderData() {
  let categories: Category[] = [];
  let categoriesError = false;

  try {
    categories = await getCategories();
  } catch (error) {
    categoriesError = true;
    console.error("Failed to load categories:", error);
  }

  return (
    <>
      <Header
        categories={categories}
        categoriesError={categoriesError}
      />

      <BottomNavigation />
    </>
  );
}