import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import type { ProductDetail } from "@/types/product-detail";
import AddToCart from "./AddToCart";

/* نوار خرید چسبان موبایل — بالای نوار ناوبری پایین می‌نشیند */
export default function MobileBuyBar({ product }: { product: ProductDetail }) {
  const discount = product.price?.discount_percent ?? 0;

  return (
    <div className="fixed inset-x-0 bottom-16 z-40 border-t bg-background px-4 py-3 lg:hidden">
      <div className="flex items-center justify-between gap-4">
        <AddToCart product={product} className="w-50 bg-primary py-6 text-sm font-bold hover:bg-primary/90 sm:w-60 md:w-80"/>

        <div className="shrink-0">
          {discount > 0 && (
            <span className="text-[11px] text-muted-foreground line-through">
              {formatPrice(product.price?.rrp_price)}
            </span>
          )}

          <p className="text-base font-bold">
            {formatPrice(product.price?.selling_price)}
            <span className="mr-1 text-[10px] font-normal">تومان</span>
          </p>
        </div>
      </div>
    </div>
  );
}