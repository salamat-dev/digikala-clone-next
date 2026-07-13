import api from "./axios";

import type { Category, CategoriesResponse } from "@/types/categories";

export async function getCategories(): Promise<Category[]> {
    const response = await api.get<CategoriesResponse>('/categories');
    return response.data.result;
}