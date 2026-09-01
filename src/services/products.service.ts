import type { CategoryData, CategoryResponse, Product } from "@/types/product";

const PRODUCT_SECTIONS = [
  "super_deal_products",
  "horizontal_products",
  "vertical_products",
];

export async function getCategoryProducts(id: string): Promise<CategoryData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/category/?id=${id}`,
    {
      headers: { "one-api-token": process.env.ONE_API_TOKEN ?? "" },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    throw new Error(`Category ${id} request failed with ${res.status}`);
  }

  const data: CategoryResponse = await res.json();

  if (!Array.isArray(data?.result)) {
    return { products: [], brandNames: {} };
  }

  /* محصولات */
  const rawProducts = data.result
    .filter((section) => PRODUCT_SECTIONS.includes(section.type))
    .flatMap((section) => section.data?.products ?? []);

  const seen = new Set<number>();

  const products = rawProducts.filter((product) => {
    if (seen.has(product.id)) return false;
    seen.add(product.id);
    return true;
  });

  /* نگاشت شناسه‌ی برند به نام — از سکشن برندها */
  const brandNames: Record<number, string> = {};

  data.result
    .filter((section) => section.type === "horizontal_brands_normal")
    .flatMap((section) => section.data?.brands ?? [])
    .forEach((brand) => {
      brandNames[brand.id] = brand.title_fa;
    });

  return { products, brandNames };
}