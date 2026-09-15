"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface Props {
  images: string[];
  alt: string;
}

/* گالری تصاویر محصول: اسلایدر اصلی + ردیف تصاویر کوچک */
export default function ProductGallery({ images, alt }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);

  // اسلاید فعال را با کاروسل همگام نگه می‌دارد
  useEffect(() => {
    if (!api) return;

    setActive(api.selectedScrollSnap());

    api.on("select", () => setActive(api.selectedScrollSnap()));
  }, [api]);

  return (
    <div className="flex w-full min-w-0 flex-col gap-3">
      <Carousel
        setApi={setApi}
        opts={{ direction: "rtl", loop: true }}
        className="w-full"
      >
        {/* حاشیه‌ی منفی پیش‌فرض shadcn در RTL باعث سرریز می‌شود */}
        <CarouselContent className="ml-0 mr-0">
          {images.map((src, index) => (
            <CarouselItem key={src} className="pl-0 pr-0">
              <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 300px, 450px"
                  className="object-contain"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {images.length > 1 && (
        <ul className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {images.map((src, index) => (
            <li key={src} className="shrink-0">
              <button
                type="button"
                onClick={() => api?.scrollTo(index)}
                aria-label={`تصویر ${index + 1}`}
                className={cn(
                  "relative block h-12 w-12 overflow-hidden rounded-lg border-2 bg-white transition-colors lg:h-16 lg:w-16",
                  active === index
                    ? "border-primary"
                    : "border-border hover:border-neutral-400"
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-contain p-1"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}