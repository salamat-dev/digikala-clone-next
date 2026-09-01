import type { Product } from "./product";

/** یک فروشنده برای این محصول */
export interface ProductVariant {
  id: number;
  status?: string;
  seller?: {
    id: number;
    title_fa?: string;
    rating?: { rate: number; count: number } | [];
    stars?: number;
    grade?: { label: string; color: string };
  };
  warranty?: { title_fa?: string };
  price?: {
    selling_price?: number;
    rrp_price?: number;
    discount_percent?: number;
  };
  digiplus?: { is_jet_eligible?: boolean };
}

export interface ProductDetail extends Product {
  category_title?: string;

  images: {
    main?: string;
    image_list?: string[];
  };

  /** نقد و بررسی + مشخصات فنی */
  review?: {
    description?: string;
    attributes?: { title?: string; values?: string[] }[];
  };

  /** مسیر دسته‌بندی — از خاص به عام مرتب است */
  breadcrumb?: {
    id: number;
    title_fa?: string;
  }[];

  variants?: ProductVariant[];

  comments?: {
    count?: number;
    latest_comments?: {
      id: number;
      body?: string;
      rate?: number;
      user_name?: string;
      is_buyer?: boolean;
    }[];
    comments_overview?: {
      overview?: string;
      advantages?: string[];
      disadvantages?: string[];
    };
  };

  suggested_percentage?: number;
}

export interface ProductDetailResponse {
  status: number;
  result: {
    product: ProductDetail;
    recommendation?: Product[];
  };
}