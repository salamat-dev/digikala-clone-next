import Link from "next/link";

import { getCategoryProducts } from "@/services/products.service";
import ProductCard from "@/components/products/ProductCard";
import FilterSidebar from "@/components/products/FilterSidebar";
import MobileFilters from "@/components/products/MobileFilters";
import SortBar from "@/components/products/SortBar";
import BackButton from "@/components/BackButton";

/* قیمت به تومان؛ اگر نبود صفر برمی‌گردد */
const priceOf = (product: { price?: { selling_price?: number } }) =>
  (product.price?.selling_price ?? 0) / 10;

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/* صفحه‌ی لیست محصولات یک دسته‌بندی — سرور کامپوننت */
export default async function CategoryProductsPage({
  params,
  searchParams,
}: Props) {
  const { category } = await params;
  const query = await searchParams;

  const { products: allProducts, brandNames } = await getCategoryProducts(
    category
  );

  if (allProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
        <BackButton className="mx-auto" />

        <p className="text-sm font-medium">کالایی یافت نشد</p>

        <p className="text-[13px] text-muted-foreground">
          برای این دسته‌بندی محصولی ثبت نشده است.
        </p>
      </div>
    );
  }

  /* ---------- ۱. خواندن پارامترها از URL ---------- */

  const selectedBrands = !query.brand
    ? []
    : Array.isArray(query.brand)
      ? query.brand
      : [query.brand];

  const brandId = Number(query.brand_id) || null;
  const brandFromLink = brandId ? brandNames[brandId] : null;

  const minPrice = Number(query.min) || 0;
  const maxPrice = Number(query.max) || Infinity;

  const onlyAvailable = query.available === "1";
  const onlyDiscounted = query.discounted === "1";
  const onlyFastShipping = query.fast === "1";

  const sort = String(query.sort ?? "");

  /* ---------- ۲. فیلتر ---------- */

  let products = allProducts.filter((product) => {
    const price = priceOf(product);
    const brand = product.brand?.title_fa ?? "";
    const discount = product.price?.discount_percent ?? 0;

    if (brandFromLink && brand !== brandFromLink) return false;

    if (selectedBrands.length > 0 && !selectedBrands.includes(brand))
      return false;

    if (price < minPrice || price > maxPrice) return false;

    if (onlyAvailable && product.status !== "marketable") return false;

    if (onlyDiscounted && discount === 0) return false;

    if (onlyFastShipping && !product.digiplus?.is_jet_eligible) return false;

    return true;
  });

  /* ---------- ۳. مرتب‌سازی ---------- */

  if (sort === "cheapest") {
    products = [...products].sort((a, b) => priceOf(a) - priceOf(b));
  }

  if (sort === "expensive") {
    products = [...products].sort((a, b) => priceOf(b) - priceOf(a));
  }

  if (sort === "discount") {
    products = [...products].sort(
      (a, b) =>
        (b.price?.discount_percent ?? 0) - (a.price?.discount_percent ?? 0)
    );
  }

  /* ---------- ۴. گزینه‌های سایدبار (همیشه از لیست کامل) ---------- */

  const brands = [
    ...new Set(allProducts.map((p) => p.brand?.title_fa).filter(Boolean)),
  ] as string[];

  // محصولات بدون قیمت نباید بازه را خراب کنند
  const prices = allProducts.map(priceOf).filter((price) => price > 0);

  const priceMin = prices.length ? Math.floor(Math.min(...prices)) : 0;
  const priceMax = prices.length ? Math.ceil(Math.max(...prices)) : 0;

  const filterProps = {
    brands,
    selectedBrands,
    priceMin,
    priceMax,
    currentMin: minPrice || priceMin,
    currentMax: maxPrice === Infinity ? priceMax : maxPrice,
    onlyAvailable,
    onlyDiscounted,
    onlyFastShipping,
  };

  /* ---------- ۵. صفحه‌بندی ---------- */

  const ppg = 12;

  const countOfPages = Math.max(1, Math.ceil(products.length / ppg));

  // اگر page بی‌ربط باشد، به بازه‌ی معتبر برگردانده می‌شود
  const page = Math.min(
    Math.max(parseInt(String(query.page)) || 1, 1),
    countOfPages
  );

  const firstIndex = (page - 1) * ppg;

  const paginationProducts = products.slice(firstIndex, firstIndex + ppg);

  return (
    <article className="px-4 py-4">
      <BackButton className="mb-3" />

      {/* چیدمان: سایدبار فیلتر + گرید محصولات */}
      <div className="flex gap-4">
        <aside className="hidden w-56 shrink-0 lg:block">
          <div className="sticky top-35">
            <FilterSidebar {...filterProps} />
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <SortBar current={sort} />

          <div className="my-3 flex items-center justify-between">
            <p className="text-[13px] text-muted-foreground">
              {products.length.toLocaleString("fa-IR")} کالا
            </p>

            <MobileFilters {...filterProps} />
          </div>

          {products.length === 0 ? (
            <div className="py-20 text-center text-sm text-muted-foreground">
              با این فیلترها کالایی پیدا نشد.
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-4">
              {paginationProducts.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* صفحه‌بندی */}
      {countOfPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          {page > 1 ? (
            <Link
              href={`?page=${page - 1}`}
              className="rounded-lg border px-4 py-2 text-[13px] transition-colors hover:border-primary"
            >
              قبلی
            </Link>
          ) : (
            <span className="rounded-lg border px-4 py-2 text-[13px] opacity-40">
              قبلی
            </span>
          )}

          <span className="text-[13px] text-muted-foreground">
            {page.toLocaleString("fa-IR")} از{" "}
            {countOfPages.toLocaleString("fa-IR")}
          </span>

          {page < countOfPages ? (
            <Link
              href={`?page=${page + 1}`}
              className="rounded-lg border px-4 py-2 text-[13px] transition-colors hover:border-primary"
            >
              بعدی
            </Link>
          ) : (
            <span className="rounded-lg border px-4 py-2 text-[13px] opacity-40">
              بعدی
            </span>
          )}
        </div>
      )}
    </article>
  );
}