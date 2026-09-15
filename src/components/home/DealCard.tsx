import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/types/product";

/* ریال → تومان */
/* API قیمت را به ریال می‌دهد */
function toToman(rial?: number): string {
  return typeof rial === "number" ? (rial / 10).toLocaleString("fa-IR") : "—";
}

/* کارت فشرده‌ی محصول داخل نوار شگفت‌انگیز */
export default function DealCard({ product }: { product: Product }) {
  const { id, title_fa, images, price } = product;

  const discount = price?.discount_percent ?? 0;

  return (
    <Link
      href={`/product/${id}`}
      className="flex h-full flex-col gap-2 bg-white p-3 mt-3 lg:mt-0"
    >
      <div className="relative mx-auto h-28 md:h-32 lg:h-36 w-full lg:max-w-38">
        <Image
          src={images?.main || "/images/no-image.webp"}
          alt={title_fa}
          fill
          sizes="128px"
          className="object-contain"
        />
      </div>

      <h3 className="line-clamp-2 min-h-10 text-[11px] md:text-[12px] leading-5 ">
        {title_fa}
      </h3>

      <div className="mt-auto space-y-1">
        {discount > 0 && (
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-full bg-primary px-2 py-0.5 text-[11px] font-bold text-white">
              {discount.toLocaleString("fa-IR")}٪
            </span>

            <span className="text-[11px] text-muted-foreground line-through">
              {toToman(price?.rrp_price)}
            </span>
          </div>
        )}

        <p className="text-left text-[14px] font-bold">
          {toToman(price?.selling_price)}
          <span className="mr-1 text-[10px] font-normal">تومان</span>
        </p>
      </div>
    </Link>
  );
}