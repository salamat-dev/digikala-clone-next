import { StarIcon } from "@heroicons/react/24/solid";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import type { ProductDetail } from "@/types/product-detail";

/* ستون میانی: برند، عنوان، امتیاز و خلاصه‌ی ویژگی‌ها */
export default function ProductInfo({ product }: { product: ProductDetail }) {
  const hasRating = !Array.isArray(product.rating) && product.rating.count > 0;
  const attributes = product.review?.attributes ?? [];

  return (
    <div className="min-w-0 space-y-4">
      {product.brand?.title_fa && (
        <p className="text-[13px] text-muted-foreground">
          برند: {product.brand.title_fa}
        </p>
      )}

      <h1 className="text-base font-bold leading-7 lg:text-lg lg:leading-8">
        {product.title_fa}
      </h1>

      <Separator />

      {/* امتیاز، تعداد دیدگاه و درصد پیشنهاد خرید */}
      <div className="flex flex-wrap items-center gap-3 text-[13px] lg:gap-4">
        {hasRating && !Array.isArray(product.rating) && (
          <span className="flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-amber-400" />
            {(product.rating.rate / 20).toFixed(1)}
            <span className="text-muted-foreground">
              ({product.rating.count.toLocaleString("fa-IR")})
            </span>
          </span>
        )}

        {product.comments?.count ? (
          <span className="text-muted-foreground">
            {product.comments.count.toLocaleString("fa-IR")} دیدگاه
          </span>
        ) : null}

        {product.suggested_percentage ? (
          <Badge variant="secondary" className="text-[11px]">
            {product.suggested_percentage.toLocaleString("fa-IR")}٪ پیشنهاد خرید
          </Badge>
        ) : null}
      </div>

      <Separator />

      {/* فقط پنج ویژگی اول؛ بقیه در تب مشخصات */}
      {attributes.length > 0 && (
        <div>
          <h2 className="mb-2 text-sm font-bold">ویژگی‌ها</h2>

          <Table>
            <TableBody>
              {attributes.slice(0, 5).map((attr, index) => (
                <TableRow key={attr.title ?? index}>
                  <TableCell className="w-28 align-top text-[12px] text-muted-foreground lg:w-40 lg:text-[13px]">
                    {attr.title}
                  </TableCell>
                  <TableCell className="text-[12px] lg:text-[13px]">
                    {attr.values?.join("، ") ?? "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}