import { notFound } from "next/navigation";

import { getProduct } from "@/services/product.service";

import BackButton from "@/components/BackButton";
import ServiceBar from "@/components/ServiceBar";
import ProductBreadcrumb from "@/components/products/ProductBreadcrumb";
import ProductGallery from "@/components/products/ProductGallery";
import ProductInfo from "@/components/products/ProductInfo";
import BuyBox from "@/components/products/BuyBox";
import MobileBuyBar from "@/components/products/MobileBuyBar";
import ProductTabs from "@/components/products/ProductTabs";

interface Props {
  params: Promise<{ id: string }>;
}

/* صفحه‌ی جزئیات یک محصول — سرور کامپوننت */
export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const data = await getProduct(id);

  if (!data) notFound();

  const { product } = data;

  // filter(Boolean) آیتم‌های undefined را حذف می‌کند تا next/image کرش نکند
  const images = [
    product.images?.main,
    ...(product.images?.image_list ?? []),
  ].filter(Boolean) as string[];

  // بردکرامب از خاص به عام می‌آید، برعکسش می‌کنیم
  const breadcrumb = [...(product.breadcrumb ?? [])].reverse();

  return (
    // pb-40 در موبایل جا برای نوار خرید + نوار ناوبری پایین باز می‌کند
    <article className="mx-auto w-full px-4 pb-40 pt-2 lg:px-16 lg:pb-8">
      <BackButton className="mb-3" />

      <ProductBreadcrumb items={breadcrumb} />

      {/* چیدمان: گالری، اطلاعات، باکس خرید */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-[300px_1fr_280px] xl:grid-cols-[450px_1fr_280px]">
        {images.length > 0 ? (
          <ProductGallery images={images} alt={product.title_fa} />
        ) : (
          <div className="flex aspect-square min-w-0 items-center justify-center rounded-xl bg-neutral-50 text-sm text-muted-foreground">
            تصویری موجود نیست
          </div>
        )}

        <ProductInfo product={product} />

        <BuyBox product={product} />
      </div>

      <ServiceBar />

      <ProductTabs product={product} />

      <MobileBuyBar product={product} />
    </article>
  );
}