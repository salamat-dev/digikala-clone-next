import type { CategoryData, CategoryResponse } from "@/types/product";

/** سکشن‌هایی که آرایه‌ی محصول دارند */
const PRODUCT_SECTIONS = [
  "super_deal_products",
  "horizontal_products",
  "vertical_products",
];

const EMPTY: CategoryData = { products: [], brandNames: {} };

/* محصولات یک دسته را از سکشن‌های پاسخ بیرون می‌کشد و تکراری‌ها را حذف می‌کند */
export async function getCategoryProducts(id: string): Promise<CategoryData> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/category/?id=${id}`,
    {
      headers: { "one-api-token": process.env.ONE_API_TOKEN ?? "" },
      next: { revalidate: 3600 },
    }
  );

  // دسته وجود ندارد — خطا نیست، فقط خالی است
  if (res.status === 404) return EMPTY;

  if (!res.ok) {
    throw new Error(`Category ${id} request failed with ${res.status}`);
  }

  const data: CategoryResponse = await res.json();

  if (!Array.isArray(data?.result)) return EMPTY;

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