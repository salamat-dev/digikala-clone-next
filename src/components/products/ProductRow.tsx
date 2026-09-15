"use client";

import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Props {
  title?: string;
  description?: string;
  products: Product[];
  viewAllHref?: string;
}

/* ردیف افقی محصولات: عنوان و دکمه‌ی «مشاهده همه» بالا، کاروسل زیرش */
export default function ProductRow({
  title,
  description,
  products,
  viewAllHref,
}: Props) {
  if (products.length === 0) return null;

  return (
    <section className="my-4 rounded-2xl border bg-white p-4">
      {/* سربرگ */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-base lg:text-[18px] font-bold text-blue-950">{title}</h2>

          {description && (
            <p className="mt-1 text-[12px] lg:text-[14px] text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        {viewAllHref && (
          <Link
            href={viewAllHref}
            className="flex shrink-0 items-center gap-1 rounded-lg bg-muted px-4 py-2.5 text-[13px] font-medium text-blue-950 transition-colors hover:bg-muted/70"
          >
            مشاهده همه
            <ChevronLeftIcon className="h-4 w-4" />
          </Link>
        )}
      </div>

      {/* کاروسل محصولات */}
      <Carousel
        opts={{ direction: "rtl", align: "start", slidesToScroll: "auto" }}
        className="min-w-0"
      >
        {/* mx-0 حاشیه‌ی منفی پیش‌فرض shadcn را خنثی می‌کند تا در RTL سرریز نشود */}
        <CarouselContent className="mx-0">
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="basis-1/2 px-1 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
            >
              <div className="h-full rounded-xl border">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* در RTL جای فلش‌ها برعکس است */}
        <CarouselPrevious className="right-4 top-6 left-auto hidden md:flex w-10 h-10 xl:w-12 xl:h-12" />
        <CarouselNext className="left-4 top-6 right-auto hidden md:flex w-10 h-10 xl:w-12 xl:h-12" />
      </Carousel>
    </section>
  );
}