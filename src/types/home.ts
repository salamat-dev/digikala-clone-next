import type { Product } from "./product";

/* هر بخش صفحه‌ی اصلی: یک عنوان و یک آرایه محصول */
export interface HomeSection {
  code: string;
  title?: string;
  description?: string;
  products?: Product[];
}

export interface HomeResponse {
  status: number;
  message?: string;
  result?: Record<string, HomeSection>;
}