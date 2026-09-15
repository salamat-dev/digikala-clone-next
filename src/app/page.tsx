import FirstSlider from "@/components/FirstSlider";
import ServiceBar from "@/components/ServiceBar";
import ProductRow from "@/components/products/ProductRow";
import CategoryCircles from "@/components/home/CategoryCircles";
import TrendingCarousel from "@/components/home/TrendingCarousel";
import PosterGrid from "@/components/home/PosterGrid";
import { getHomeSections } from "@/services/home.service";
import { getCategories } from "@/services/categories.service";
import type { Category } from "@/types/categories";
import type { HomeSection } from "@/types/home";
import ProductGrid2 from "@/components/home/ProductGrid2";



/* صفحه‌ی اصلی — سرور کامپوننت */
export default async function Home() {
  let sections: HomeSection[] = [];
  let categories: Category[] = [];

  // هر دو درخواست موازی اجرا می‌شوند؛ خطای یکی صفحه را از کار نمی‌اندازد
  const [sectionsResult, categoriesResult] = await Promise.allSettled([
    getHomeSections(),
    getCategories(),
  ]);

if (sectionsResult.status === "fulfilled") sections = sectionsResult.value;
else console.error("HOME FAILED:", sectionsResult.reason);

if (categoriesResult.status === "fulfilled") categories = categoriesResult.value;

  // بخش داغ‌ترین‌ها جدا می‌شود، بقیه ردیف عادی می‌مانند
  const trending = sections.find((section) => section.code === "trending");
  const selling_and_sales = sections.find((section) => section.code === "selling_and_sales")
  const rows = sections.filter((section) => section.code !== "trending" && section.code !== "selling_and_sales");

  return (
    <>
      <FirstSlider />

      <article className="lg:px-16">
        <CategoryCircles categories={categories} />

        {trending && (
          <TrendingCarousel
            title={trending.title}
            products={trending.products ?? []}
            icon="fire"
          />
        )}

        <PosterGrid />

        {rows.slice(0, 1).map((section) => (
          <ProductRow
            key={section.code}
            title={section.title}
            description={section.description}
            products={section.products ?? []}
          />
        ))}

        {selling_and_sales && (
          <TrendingCarousel
            title={selling_and_sales.title}
            products={selling_and_sales.products ?? []}
            className="bg-green-600"
            dividerClassName="border-green-600"
            icon="discount"
          />
        )}

        <ProductGrid2/>

        {rows.slice(2, 4).map((section) => (
          <ProductRow
            key={section.code}
            title={section.title}
            description={section.description}
            products={section.products ?? []}
          />
        ))}

        <ServiceBar />
      </article>
    </>
  );
}