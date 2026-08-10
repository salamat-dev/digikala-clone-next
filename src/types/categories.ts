/* ---------- Common Types ---------- */

export type CategoryPage =
  | "category_search_page"
  | "category_main_page"
  | "web_link";

/* پارامترهای موجود در url.params */
export interface CategoryUrlParams {
  category_id?: number;
  brand_id?: number;
  product_id?: number;
  promotion_id?: number;
  seller_id?: number;
  url?: string; // فقط وقتی page === "web_link"
}

export interface CategoryUrl {
  url: string;
  page: CategoryPage;
  params: CategoryUrlParams;
}

/* ---------- Base Category ---------- */

interface BaseCategory {
  id: number;
  title: string;
  url: CategoryUrl;
}

/* ---------- Level 3 ---------- */

export interface CategoryLeaf extends BaseCategory {
  row_number: number;
  image: string;
}

/* ---------- Level 2 ---------- */

export interface SubCategory extends BaseCategory {
  column_number: number;
  row_number: number;
  children: CategoryLeaf[];
}

/* ---------- Level 1 ---------- */

export interface Category extends BaseCategory {
  plp_url: CategoryUrl;
  row_number: number;
  icon?: string;
  children: SubCategory[];
}

/* ---------- API Response ---------- */

export interface CategoriesResponse {
  status: number;
  result: Category[];
}