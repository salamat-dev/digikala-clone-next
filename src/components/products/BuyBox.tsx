import { CubeIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/format";
import type { ProductDetail } from "@/types/product-detail";
import AddToCart from "./AddToCart";

/* باکس خرید دسکتاپ: فروشنده، گارانتی، قیمت و دکمه‌ی خرید */
export default function BuyBox({ product }: { product: ProductDetail }) {
  const seller = product.variants?.[0]?.seller;
  const warranty = product.variants?.[0]?.warranty;
  const discount = product.price?.discount_percent ?? 0;

  return (
    /* زیر lg مخفی است؛ نسخه‌ی موبایل نوار چسبان پایین صفحه است */
    <Card className="top-52 hidden h-fit py-10 lg:sticky lg:block">
      <CardContent className="space-y-6">
        {seller?.title_fa && (
          <div className="flex items-center justify-between text-[14px]">
            <span className="text-muted-foreground">فروشنده</span>
            <span className="font-medium">{seller.title_fa}</span>
          </div>
        )}

        {warranty?.title_fa && (
          <div className="flex items-start gap-2 text-[13px] text-muted-foreground">
            <ShieldCheckIcon className="h-4 w-4 shrink-0" />
            {warranty.title_fa}
          </div>
        )}

        {product.digiplus?.is_jet_eligible && (
          <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
            <CubeIcon className="h-4 w-4 text-[#1028FF]" />
            {product.digiplus.fast_shipping_text}
          </div>
        )}

        <Separator />

        <div>
          {discount > 0 && (
            <div className="mb-1 flex items-center justify-between">
              <Badge className="rounded-full bg-secondary text-[11px] font-bold text-white">
                {discount.toLocaleString("fa-IR")}٪
              </Badge>

              <span className="text-[12px] text-muted-foreground line-through">
                {formatPrice(product.price?.rrp_price)}
              </span>
            </div>
          )}

          <p className="text-left text-xl font-bold">
            {formatPrice(product.price?.selling_price)}
            <span className="mr-1 text-xs font-normal">تومان</span>
          </p>
        </div>

        <AddToCart product={product} className={"w-full cursor-pointer bg-primary py-6 text-sm font-bold hover:bg-primary/90"}/>

      </CardContent>
    </Card>
  );
}