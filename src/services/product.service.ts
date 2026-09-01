import type { ProductDetail, ProductDetailResponse } from "@/types/product-detail";
import type { Product } from "@/types/product";

export interface ProductPageData {
  product: ProductDetail;
  recommendation: Product[];
}

export async function getProduct(id: string): Promise<ProductPageData | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/product/?id=${id}`,
    {
      headers: { "one-api-token": process.env.ONE_API_TOKEN ?? "" },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error(`Product ${id} request failed with ${res.status}`);
  }

  const data: ProductDetailResponse = await res.json();

  if (!data?.result?.product) return null;

  return {
    product: data.result.product,
    recommendation: data.result.recommendation ?? [],
  };
}