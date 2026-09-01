import { getCategoryProducts } from "@/services/products.service";
import ProductCard from "@/components/products/ProductCard";
import FilterSidebar from "@/components/products/FilterSidebar";
import SortBar from "@/components/SortBar";

interface Props {
  params: Promise<{ category: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CategoryProductsPage({ params, searchParams }: Props) {
  const { category } = await params;
  const query = await searchParams;

  const { products: allProducts, brandNames } = await getCategoryProducts(category);

  if (allProducts.length === 0) {
    return (
      <div className="flex items-center justify-center py-20 text-sm text-muted-foreground">
        برای این دسته‌بندی کالایی پیدا نشد.
      </div>
    );
  }

  /* ---------- ۱. خواندن پارامترها از URL ---------- */

  // از سایدبار: نام فارسی برند، ممکن است چندتایی باشد
  const selectedBrands = !query.brand
    ? []
    : Array.isArray(query.brand)
      ? query.brand
      : [query.brand];

  // از لینک مگامنو: شناسه‌ی برند که با نگاشت به نام تبدیل می‌شود
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
    const price = product.price.selling_price / 10;
    const brand = product.brand?.title_fa ?? "";
    const discount = product.price.discount_percent ?? 0;

    if (brandFromLink && brand !== brandFromLink) return false;

    if (selectedBrands.length > 0 && !selectedBrands.includes(brand)) return false;

    if (price < minPrice || price > maxPrice) return false;

    if (onlyAvailable && product.status !== "marketable") return false;

    if (onlyDiscounted && discount === 0) return false;

    if (onlyFastShipping && !product.digiplus?.is_jet_eligible) return false;

    return true;
  });

  /* ---------- ۳. مرتب‌سازی ---------- */

  if (sort === "cheapest") {
    products = [...products].sort(
      (a, b) => a.price.selling_price - b.price.selling_price
    );
  }

  if (sort === 'expensive') {
    products = [...products].sort((a, b) => b.price.selling_price - a.price.selling_price)
  }

  if (sort === "discount") {
    products = [...products].sort(
      (a, b) => (b.price.discount_percent ?? 0) - (a.price.discount_percent ?? 0)
    );
  }

  /* ---------- ۴. گزینه‌های سایدبار (همیشه از لیست کامل) ---------- */

  const brands = [
    ...new Set(allProducts.map((p) => p.brand?.title_fa).filter(Boolean)),
  ] as string[];

  const prices = allProducts.map((p) => p.price.selling_price / 10);
  const priceMin = Math.floor(Math.min(...prices));
  const priceMax = Math.ceil(Math.max(...prices));

  return (
    <div className="flex gap-4 pl-4">
      <aside className="hidden w-60 border shrink-0 lg:block p-2">
        <FilterSidebar
          brands={brands}
          selectedBrands={selectedBrands}
          priceMin={priceMin}
          priceMax={priceMax}
          currentMin={minPrice || priceMin}
          currentMax={maxPrice === Infinity ? priceMax : maxPrice}
          onlyAvailable={onlyAvailable}
          onlyDiscounted={onlyDiscounted}
          onlyFastShipping={onlyFastShipping}
        />
      </aside>

      <section className="min-w-0 flex-1">
        <div className="flex justify-between items-center border-b">
          <SortBar current={sort} />
          <p className="mb-3 text-[13px] text-muted-foreground ml-2 text-left">
            {products.length.toLocaleString("fa-IR")} کالا
          </p>
        </div>

        {products.length === 0 ? (
          <div className="py-20 text-center text-sm text-muted-foreground">
            با این فیلترها کالایی پیدا نشد.
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-1.5 xl:grid-cols-3 2xl:grid-cols-4">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}