import { cache } from "react";
import api from "./axios";
import type { Category, CategoriesResponse } from "@/types/categories";

function normalizeCategories(categories: Category[]): Category[] {
  return categories.map((category) => ({
    ...category,
    children: (category.children ?? []).map((subCategory) => ({
      ...subCategory,
      children: (subCategory.children ?? []).map((child) => ({
        ...child,
        image: child.image ?? "/images/no-image.webp",
      })),
    })),
  }));
}

export const getCategories = cache(async (): Promise<Category[]> => {
  const { data } = await api.get<CategoriesResponse>("/categories");

  if (!Array.isArray(data.result)) {
    throw new Error("Categories API returned an invalid response.");
  }

  return normalizeCategories(data.result);
});