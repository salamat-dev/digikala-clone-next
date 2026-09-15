import type { CategoryUrl } from "@/types/categories";

/** فقط این دو نوع، صفحه‌ی دسته‌بندی واقعی هستند */
const CATEGORY_PAGES = ["category_search_page", "category_main_page"];

/** ریال → تومان */
const toToman = (rial: number) => Math.round(rial / 10);

/** حداقل شکلی که برای استخراج شناسه لازم داریم */
interface CategoryNode {
  id: number;
  url?: CategoryUrl;
  children?: CategoryNode[];
}

function extractId(url?: CategoryUrl, fallbackId?: number): number | undefined {
  const categoryId = url?.params?.category_id;

  if (categoryId) return categoryId;

  if (url?.page && CATEGORY_PAGES.includes(url.page)) return fallbackId;

  return undefined;
}

/**
 * لینک داخلی صفحه‌ی محصولات را می‌سازد.
 *
 * ترتیب تلاش برای پیدا کردن شناسه:
 *   ۱. params.category_id خود آیتم
 *   ۲. id خود آیتم، اگر page نوع دسته‌بندی باشد
 *   ۳. اولین زیرشاخه‌ی معتبر (تا دو سطح عمق)
 *   ۴. id خود آیتم به‌عنوان آخرین تلاش
 *
 * حالت ۴ ممکن است به صفحه‌ی «کالایی یافت نشد» برسد،
 * ولی این بهتر از یک آیتم غیرقابل‌کلیک است.
 */
export function getCategoryHref(
  url?: CategoryUrl,
  fallbackId?: number,
  children?: CategoryNode[]
): string {
  let id = extractId(url, fallbackId);

  if (!id && children?.length) {
    for (const child of children) {
      id = extractId(child.url, child.id);
      if (id) break;

      for (const grandChild of child.children ?? []) {
        id = extractId(grandChild.url, grandChild.id);
        if (id) break;
      }

      if (id) break;
    }
  }

  id = id ?? fallbackId;

  if (!id) return "/";

  const params = new URLSearchParams();

  const brandId = url?.params?.brand_id;
  if (brandId) params.set("brand_id", String(brandId));

  const price = url?.queries?.price;
  if (price?.min) params.set("min", String(toToman(price.min)));
  if (price?.max) params.set("max", String(toToman(price.max)));

  const query = params.toString();

  return query ? `/products/${id}?${query}` : `/products/${id}`;
}