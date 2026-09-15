/* تایپ‌های محصول و پاسخ اندپوینت /category */
export interface Product {
  id: number;
  title_fa: string;
  status: string;
  images: { main: string };
  rating: { rate: number; count: number } | [];
  brand?: { title_fa: string };
  parameters?: { color_ids?: number[] } | [];
  price?: {
    selling_price?: number;
    rrp_price?: number;
    discount_percent?: number;
    badge?: { title: string; color: string };
  };
  digiplus?: {
    is_jet_eligible?: boolean;
    fast_shipping_text?: string;
  };
}

export interface CategorySection {
  type: string;
  data?: {
    title?: string;
    products?: Product[];
    brands?: { id: number; title_fa: string }[];
  };
}

export interface CategoryResponse {
  status: number;
  result: CategorySection[];
}

/** خروجی سرویس: هم محصولات، هم نگاشت شناسه‌ی برند به نام */
export interface CategoryData {
  products: Product[];
  brandNames: Record<number, string>;
}

/**
 * پاسخ /category یک آرایه از «سکشن» است.
 * سکشن‌ها بین دسته‌بندی‌ها فرق می‌کنند، ولی هر کدام که محصول داشته باشد
 * محصولاتش در data.products است.
 */
export interface CategorySection {
  type: string;
  data?: { title?: string; products?: Product[] };
}

export interface CategoryResponse {
  status: number;
  result: CategorySection[];
}