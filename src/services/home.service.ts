import type { HomeResponse, HomeSection } from "@/types/home";
import { getCategoryProducts } from "./products.service";

/* ترتیب نمایش بخش‌ها وقتی اندپوینت /home/ در دسترس است */
const SECTION_ORDER = [
  "trending",
  "selling_and_sales",
  "home_1",
  "home_2",
  "home_3",
  "home_4",
  "home_5",
  "home_6",
  "home_7",
  "home_8",
];

/**
 * دسته‌های جایگزین برای وقتی /home/ کار نمی‌کند.
 * دو تای اول جای کاروسل‌ها را می‌گیرند، بقیه ردیف عادی می‌شوند.
 */
const FALLBACK = [
  { code: "trending", id: "11", title: "انواع موبایل" },
  { code: "selling_and_sales", id: "13", title: "انواع تبلت" },
  { code: "fallback_1", id: "6", title: "دوربین و لوازم جانبی" },
  { code: "fallback_2", id: "8895", title: "سوپرمارکت آنلاین" },
  { code: "fallback_3", id: "8450", title: "ابزارآلات و تجهیزات" },
  { code: "fallback_4", id: "5855", title: "لوازم خانگی برقی" },
];

/* تلاش اول: اندپوینت رسمی صفحه‌ی اصلی */
async function fetchHomeSections(): Promise<HomeSection[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/`, {
    headers: { "one-api-token": process.env.ONE_API_TOKEN ?? "" },
    next: { revalidate: 1800 },
  });

  if (!res.ok) return [];

  const data: HomeResponse = await res.json();

  // one-api خطا را داخل بدنه برمی‌گرداند، نه در وضعیت HTTP
  if (data?.status !== 200 || !data.result) return [];

  return SECTION_ORDER.map((code) => data.result?.[code]).filter(
    (section): section is HomeSection => Boolean(section?.products?.length)
  );
}

/* تلاش دوم: ساختن همان ساختار از چند دسته‌ی منتخب */
async function fetchFallbackSections(): Promise<HomeSection[]> {
  const results = await Promise.allSettled(
    FALLBACK.map((item) => getCategoryProducts(item.id))
  );

  return FALLBACK.map((item, index) => {
    const result = results[index];

    return {
      code: item.code,
      title: item.title,
      products: result.status === "fulfilled" ? result.value.products : [],
    };
  }).filter((section) => section.products.length > 0);
}

/* بخش‌های صفحه‌ی اصلی؛ اگر اندپوینت رسمی جواب نداد، از دسته‌ها ساخته می‌شود */
export async function getHomeSections(): Promise<HomeSection[]> {
  const fromHome = await fetchHomeSections();

  if (fromHome.length > 0) return fromHome;

  return fetchFallbackSections();
}