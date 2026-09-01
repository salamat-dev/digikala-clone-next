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
    <div className="flex flex-col gap-3">
      <Carousel setApi={setApi} opts={{ direction: "rtl", loop: true }}>
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={src}>
              <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  priority={index === 0}
                  sizes="(max-width: 102px) 90vw, 450px"
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
                  "relative block h-16 w-16 overflow-hidden rounded-lg border-2 bg-white transition-colors",
                  active === index
                    ? "border-primary"
                    : "border-border hover:border-neutral-400"
                )}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="64px"
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