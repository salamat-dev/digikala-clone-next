import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommentCard from "./CommentCard";
import type { ProductDetail } from "@/types/product-detail";

/* تب‌های پایین صفحه: نقد و بررسی، مشخصات کامل و دیدگاه‌ها */
export default function ProductTabs({ product }: { product: ProductDetail }) {
  const attributes = product.review?.attributes ?? [];
  const latestComments = product.comments?.latest_comments ?? [];

  return (
    <Tabs defaultValue="review" className="mt-10 lg:mt-15" dir="rtl">
      <TabsList className="w-full overflow-x-auto hide-scrollbar">
        <TabsTrigger value="review">نقد و بررسی</TabsTrigger>
        <TabsTrigger value="specs">مشخصات</TabsTrigger>
        <TabsTrigger value="comments">
          دیدگاه‌ها
          {product.comments?.count ? (
            <Badge variant="ghost" className="mr-1.5 text-[10px]">
              {product.comments.count.toLocaleString("fa-IR")}
            </Badge>
          ) : null}
        </TabsTrigger>
      </TabsList>

      {/* ارتفاع کمینه و بیشینه از پرش صفحه هنگام تعویض تب جلوگیری می‌کند */}
      <TabsContent
        value="review"
        className="min-h-[300px] overflow-y-auto pb-10 pt-6 lg:max-h-[600px] lg:min-h-[400px]"
      >
        {product.review?.description ? (
          <p className="text-[14px] leading-7 text-neutral-700 lg:text-[16px]">
            {product.review.description}
          </p>
        ) : (
          <p className="text-[13px] text-muted-foreground">
            نقد و بررسی برای این کالا ثبت نشده است.
          </p>
        )}
      </TabsContent>

      <TabsContent
        value="specs"
        className="min-h-[300px] overflow-y-auto pb-10 pt-6 lg:max-h-[600px] lg:min-h-[400px]"
      >
        {attributes.length > 0 ? (
          <Table>
            <TableBody>
              {attributes.map((attr, index) => (
                <TableRow key={attr.title ?? index}>
                  <TableCell className="w-32 align-top text-[13px] text-muted-foreground lg:w-64 lg:pr-20 lg:text-[15px]">
                    {attr.title}
                  </TableCell>
                  <TableCell className="text-[13px] lg:text-[15px]">
                    {attr.values?.join("، ") ?? "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-[13px] text-muted-foreground">
            مشخصاتی ثبت نشده است.
          </p>
        )}
      </TabsContent>

      <TabsContent value="comments" className="pt-6">
        {latestComments.length > 0 ? (
          <ul>
            {latestComments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </ul>
        ) : (
          <p className="text-[13px] text-muted-foreground">
            هنوز دیدگاهی ثبت نشده است.
          </p>
        )}
      </TabsContent>
    </Tabs>
  );
}