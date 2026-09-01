import { Fragment } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StarIcon } from "@heroicons/react/24/solid";
import { CubeIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

import { getProduct } from "@/services/product.service";
import ProductGallery from "@/components/products/ProductGallery";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ServiceBar from "@/components/ServiceBar";

interface Props {
  params: Promise<{ id: string }>;
}

const formatPrice = (rial?: number) =>
  typeof rial === "number" ? (rial / 10).toLocaleString("fa-IR") : "—";

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const data = await getProduct(id);

  if (!data) notFound();

  const { product } = data;

  // filter(Boolean) آیتم‌های undefined را حذف می‌کند تا next/image کرش نکند
  const images = [
    product.images?.main,
    ...(product.images?.image_list ?? []),
  ].filter(Boolean) as string[];

  const hasRating = !Array.isArray(product.rating) && product.rating.count > 0;
  const discount = product.price?.discount_percent ?? 0;

  const breadcrumb = [...(product.breadcrumb ?? [])].reverse();

  const seller = product.variants?.[0]?.seller;
  const warranty = product.variants?.[0]?.warranty;

  const attributes = product.review?.attributes ?? [];
  const overview = product.comments?.comments_overview;
  const latestComments = product.comments?.latest_comments ?? [];

  const Warranty = [
    {title:"امکان تحویل اکیسپرس", icon:''},
    {title:"24 ساعته،7روز هفته", icon:''},
    {title:"امکان پرداخت در محل", icon:''},
    {title:"هفت روز ضمانت بازگشت کالا", icon:''},
    {title:"ضمانت اصل بودن کالا", icon:''},
  ]

  return (
    <div className="mx-auto w-full px-4 py-2  lg:px-16">
      {breadcrumb.length > 0 && (
        <Breadcrumb className="mb-4">
          <BreadcrumbList className="text-[11px]">
            {breadcrumb.map((item, index) => {
              const isLast = index === breadcrumb.length - 1;

              return (
                <Fragment key={item.id}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{item.title_fa}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={`/products/${item.id}`}>{item.title_fa}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>

                  {!isLast && <BreadcrumbSeparator className="rotate-180" />}
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      )}

      <div className="grid gap-6 lg:grid-cols-[300px_1fr_280px] xl:grid-cols-[450px_1fr_280px]">
        {images.length > 0 ? (
          <ProductGallery images={images} alt={product.title_fa} />
        ) : (
          <div className="flex aspect-square items-center justify-center rounded-xl bg-neutral-50 text-sm text-muted-foreground">
            تصویری موجود نیست
          </div>
        )}

        {/* اطلاعات اصلی */}
        <div className="space-y-4">
          {product.brand?.title_fa && (
            <p className="text-[13px] text-muted-foreground">
              برند: {product.brand.title_fa}
            </p>
          )}

          <h1 className="text-lg font-bold leading-8">{product.title_fa}</h1>

          <Separator />

          <div className="flex flex-wrap items-center gap-4 text-[13px]">
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

          {attributes.length > 0 && (
            <div>
              <h2 className="mb-2 text-sm font-bold">ویژگی‌ها</h2>

              <Table>
                <TableBody>
                  {attributes.slice(0, 5).map((attr, index) => (
                    <TableRow key={attr.title ?? index}>
                      <TableCell className="w-40 text-[13px] text-muted-foreground">
                        {attr.title}
                      </TableCell>
                      <TableCell className="text-[13px]">
                        {attr.values?.join("، ") ?? "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        {/* باکس خرید */}
        <Card className="sticky top-52 h-fit py-10">
          <CardContent className="space-y-6">
            {seller?.title_fa && (
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-muted-foreground text-[14px]">فروشنده</span>
                <span className="font-medium text-[14px]">{seller.title_fa}</span>
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

            <Button className="w-full bg-primary py-6 text-sm font-bold hover:bg-primary/90 cursor-pointer">
              افزودن به سبد خرید
            </Button>
          </CardContent>
        </Card>
      </div>
              
      <ServiceBar/>

      {/* تب‌ها */}
      <Tabs defaultValue="review" className="mt-15" dir="rtl">
        <TabsList className="w-full">
          <TabsTrigger className="" value="review">نقد و بررسی</TabsTrigger>
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

        <TabsContent value="review" className="max-h-[600px] min-h-[400px] overflow-y-auto pt-6 pb-10">
          {product.review?.description ? (
            <p className="text-[16px] leading-7 text-neutral-700">
              {product.review.description}
            </p>
          ) : (
            <p className="text-[13px] text-muted-foreground">
              نقد و بررسی برای این کالا ثبت نشده است.
            </p>
          )}
        </TabsContent>

        <TabsContent value="specs" className="max-h-[600px] min-h-[400px] overflow-y-auto pt-6 pb-10">
          {attributes.length > 0 ? (
            <Table>
              <TableBody>
                {attributes.map((attr, index) => (
                  <TableRow key={attr.title ?? index}>
                    <TableCell className="w-48 text-[13px] text-muted-foreground">
                      {attr.title}
                    </TableCell>
                    <TableCell className="text-[13px]">
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

        <TabsContent value="comments" className="space-y-6 pt-6">
          {overview && (
            <Card>
              <CardContent className="space-y-4">
                <h3 className="text-sm font-bold">جمع‌بندی نظرات</h3>

                {overview.overview && (
                  <p className="whitespace-pre-line text-[13px] leading-7 text-neutral-700">
                    {overview.overview}
                  </p>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  {overview.advantages?.length ? (
                    <div>
                      <h4 className="mb-2 text-[13px] font-bold text-green-600">
                        نقاط قوت
                      </h4>
                      <ul className="space-y-1 text-[13px]">
                        {overview.advantages.map((item) => (
                          <li key={item}>+ {item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {overview.disadvantages?.length ? (
                    <div>
                      <h4 className="mb-2 text-[13px] font-bold text-red-500">
                        نقاط ضعف
                      </h4>
                      <ul className="space-y-1 text-[13px]">
                        {overview.disadvantages.map((item) => (
                          <li key={item}>- {item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          )}

          {latestComments.length > 0 ? (
            <ul className="space-y-3">
              {latestComments.map((comment) => (
                <li key={comment.id}>
                  <Card>
                    <CardContent className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-[11px]">
                            {comment.user_name?.slice(0, 2) ?? "؟"}
                          </AvatarFallback>
                        </Avatar>

                        <span className="text-[12px] text-muted-foreground">
                          {comment.user_name ?? "کاربر دیجی‌کالا"}
                        </span>

                        {comment.is_buyer && (
                          <Badge
                            variant="secondary"
                            className="bg-green-50 text-[10px] text-green-700"
                          >
                            خریدار
                          </Badge>
                        )}

                        {comment.rate ? (
                          <span className="mr-auto flex items-center gap-1 text-[12px]">
                            <StarIcon className="h-4 w-4 text-amber-400" />
                            {comment.rate.toLocaleString("fa-IR")}
                          </span>
                        ) : null}
                      </div>

                      {comment.body && (
                        <p className="text-[13px] leading-6">{comment.body}</p>
                      )}
                    </CardContent>
                  </Card>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[13px] text-muted-foreground">
              هنوز دیدگاهی ثبت نشده است.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}