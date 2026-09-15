import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@heroicons/react/24/solid";
import { CubeIcon } from "@heroicons/react/24/outline";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getColorHex, MAX_VISIBLE_COLORS } from "@/constants/product-colors";
import type { Product } from "@/types/product";

/** API قیمت را به ریال می‌دهد */
/* API قیمت را به ریال می‌دهد */
function toToman(rial?: number): string {
  return typeof rial === "number" ? (rial / 10).toLocaleString("fa-IR") : "—";
}

/* کارت محصول در گرید: عکس، رنگ‌ها، امتیاز، قیمت و تخفیف */
export default function ProductCard({ product }: { product: Product }) {
  const { id, title_fa, images, rating, price, parameters, digiplus, status } =
    product;

  const unavailable = status !== "marketable";

  // هر دو فیلد وقتی خالی‌اند به‌جای null یک آرایه‌ی خالی می‌آیند
  const hasRating = !Array.isArray(rating) && rating.count > 0;
  const colorIds = Array.isArray(parameters) ? [] : parameters?.color_ids ?? [];

  const visibleColors = colorIds.slice(0, MAX_VISIBLE_COLORS);
  const hiddenColors = colorIds.length - visibleColors.length;

  const discount = price?.discount_percent ?? 0;
  const showFastShipping = Boolean(digiplus?.is_jet_eligible);

  return (
    <Card
      size="sm"
      className="h-full rounded-none bg-white ring-0 transition-shadow hover:shadow-lg"
    >
      <Link href={`/product/${id}`} className="min-h-80 lg:min-h-110">
        <CardContent className="flex h-full flex-col justify-evenly gap-3">
          <div className="relative">
            {colorIds.length > 0 && (
              <ul className="absolute left-0 top-0 z-10 flex flex-col items-center gap-1.5">
                {visibleColors.map((colorId) => (
                  <li
                    key={colorId}
                    className="h-1.5 w-1.5 rounded-full ring-1 ring-black/15"
                    style={{ backgroundColor: getColorHex(colorId) }}
                  />
                ))}

                {hiddenColors > 0 && (
                  <li className="text-[12px] leading-none text-muted-foreground">
                    +
                  </li>
                )}
              </ul>
            )}

            {price?.badge && (
              <span className="absolute right-0 top-0 z-10 rounded-2xl px-2 text-[12px] font-bold text-primary lg:text-[14px]">
                {price.badge.title}
              </span>
            )}

            <div className="relative mx-auto mt-8 aspect-square w-full max-w-40 lg:mt-15 lg:max-w-60">
              <Image
                src={images?.main || "/images/no-image.webp"}
                alt={title_fa}
                fill
                sizes="(max-width: 640px) 45vw, 240px"
                className="object-contain"
              />
            </div>
          </div>

          {/* عنوان */}
          <h3 className="mt-3 line-clamp-2 text-[12px] leading-6 text-neutral-800 lg:text-[13px]">
            {title_fa}
          </h3>

          {/* امتیاز و ارسال سریع */}
          <div className="flex min-h-5 items-center justify-between gap-1">
            {showFastShipping ? (
              <span className="flex items-center gap-1 truncate text-[10px] text-muted-foreground lg:text-[11px]">
                <CubeIcon className="h-3.5 w-3.5 shrink-0 text-[#1028FF]" />
                {digiplus?.fast_shipping_text}
              </span>
            ) : (
              <span />
            )}

            {hasRating && (
              <span className="flex shrink-0 items-center gap-1 text-[11px] text-neutral-700">
                <StarIcon className="h-3.5 w-3.5 text-amber-400" />
                {(rating.rate / 20).toLocaleString("fa-IR", {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 1,
                })}
              </span>
            )}
          </div>

          {/* قیمت */}
          <div>
            {unavailable ? (
              <p className="text-xs text-muted-foreground">ناموجود</p>
            ) : (
              <div className="flex items-center justify-between gap-2">
                {discount > 0 ? (
                  <Badge className="h-5 rounded-full bg-primary/90 px-2 text-[11px] font-bold text-white lg:text-[12px]">
                    {discount.toLocaleString("fa-IR")}٪
                  </Badge>
                ) : (
                  <span />
                )}

                <div className="flex flex-col items-end">
                  <p className="text-[13px] font-bold text-neutral-800 lg:text-[15px]">
                    {toToman(price?.selling_price)}
                    <span className="mr-1 text-[10px] font-normal">تومان</span>
                  </p>

                  {discount > 0 && (
                    <p className="text-[11px] text-muted-foreground line-through">
                      {toToman(price?.rrp_price)}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}