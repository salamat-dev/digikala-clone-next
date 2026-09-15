"use client";

import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { FireIcon } from "@heroicons/react/24/solid";
import { ReceiptPercentIcon } from "@heroicons/react/24/outline";



import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import DealCard from "./DealCard";
import type { Product } from "@/types/product";

interface Props {
  title?: string;
  products: Product[];
  className?: string;
  dividerClassName?: string;
  icon?: "fire" | "discount";
}

export default function TrendingCarousel({ 
  title,
  products,
  className = "bg-primary/85",
  dividerClassName = "border-primary/85",
  icon = "fire",
}: Props) {
  if (products.length === 0) return null;

  const Icon = icon === "fire" ? FireIcon : ReceiptPercentIcon

  return (
    <section className="py-4">
      <div className={`lg:flex lg:gap-3 lg:rounded-2xl py-5 md:py-6 pr-3 ${className}`}>
        {/* پنل ثابت سمت راست */}
        <div className="flex lg:shrink-0 lg:flex-col items-center justify-between lg:justify-center lg:gap-3 text-white lg:w-36">

          <div className="flex lg:flex-col gap-1 lg:gap-3 items-center justify-center">
            <Icon className="lg:h-10 lg:w-10 h-8 w-8" />

            <h2 className="text-center font-bold lg:text-lg">
              {title ?? "داغ‌ترین‌ها"}
            </h2>
          </div>

          <Link href="/categories" className="flex justify-center items-center gap-1 lg:gap-2 text-xs ml-5 lg:ml-0">
            مشاهده همه
            <ArrowLeftIcon className="h-3.5 w-3.5" />
          </Link>

        </div>

        {/* کاروسل محصولات */}
        <Carousel
          opts={{ direction: "rtl", align: "start", slidesToScroll: "auto" }}
          className="min-w-0 flex-1"
        >
          {/* mx-0 حاشیه‌ی منفی پیش‌فرض shadcn را خنثی می‌کند تا در RTL سرریز نشود */}
          <CarouselContent className="mx-0">
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className={`basis-1/4 border-r-2 lg:border-r-3 px-0 sm:basis-1/4 lg:basis-1/5 xl:basis-1/7 ${dividerClassName}`}
              >
                <DealCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* در RTL جای فلش‌ها برعکس است؛ در موبایل با انگشت کشیده می‌شود */}
          <CarouselPrevious className="right-4 top-6 left-auto hidden md:flex w-10 h-10 xl:w-12 xl:h-12" />
          <CarouselNext className="left-4 top-6 right-auto hidden md:flex w-10 h-10 xl:w-12 xl:h-12" />
        </Carousel>
      </div>
    </section>
  );
}