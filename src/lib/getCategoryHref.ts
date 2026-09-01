import type { Category, CategoryUrl, SubCategory } from "@/types/categories";

interface CategoryNode {
  id: number;
  url?: CategoryUrl;
  children?: CategoryNode[];
}

const CATEGORY_PAGES = ["category_search_page", "category_main_page"];

/** ریال → تومان */
const toToman = (rial: number) => Math.round(rial / 10);

/** شناسه‌ی دسته را از خود آیتم درمی‌آورد */
function extractId(url?: CategoryUrl, fallbackId?: number): number | undefined {
  const categoryId = url?.params?.category_id;

  if (categoryId) return categoryId;

  if (url?.page && CATEGORY_PAGES.includes(url.page)) return fallbackId;

  return undefined;
}

/**
 * لینک داخلی صفحه‌ی محصولات.
 *
 * بعضی دسته‌ها (طلا و نقره، تجهیزات پزشکی، ...) خودشان web_link هستند و
 * category_id ندارند. برای این‌ها شناسه را از اولین زیرشاخه‌ی معتبر برمی‌داریم
 * تا کاربر باز هم به یک صفحه‌ی مرتبط برسد.
 */
export function getCategoryHref(
  url?: CategoryUrl,
  fallbackId?: number,
  children?: CategoryNode[]
): string {
  let id = extractId(url, fallbackId);

  // اگر خودش شناسه نداشت، سراغ فرزندها برو
  if (!id && children?.length) {
    for (const child of children) {
      id = extractId(child.url, child.id);
      if (id) break;

      // یک سطح عمیق‌تر
      for (const grandChild of child.children ?? []) {
        id = extractId(grandChild.url, grandChild.id);
        if (id) break;
      }

      if (id) break;
    }
  }

  if (!id) return "";

  const params = new URLSearchParams();

  const brandId = url?.params?.brand_id;
  if (brandId) params.set("brand_id", String(brandId));

  const price = url?.queries?.price;
  if (price?.min) params.set("min", String(toToman(price.min)));
  if (price?.max) params.set("max", String(toToman(price.max)));

  const query = params.toString();

  return query ? `/products/${id}?${query}` : `/products/${id}`;
}