/* اسکلتون بارگذاری گرید محصولات */

import { Skeleton } from "@/components/ui/skeleton";

function ProductCardSkeleton() {
  return (
    <div className="h-full rounded-none bg-white">
      <div className="flex h-full min-h-115 flex-col justify-evenly gap-3 p-4">
        {/* تصویر + badge + رنگ‌ها */}
        <div className="relative">
          {/* رنگ‌ها */}
          <div className="absolute left-0 top-0 z-10 flex flex-col items-center gap-1.5">
            <Skeleton className="h-1.5 w-1.5 rounded-full" />
            <Skeleton className="h-1.5 w-1.5 rounded-full" />
            <Skeleton className="h-1.5 w-1.5 rounded-full" />
          </div>

          {/* Badge */}
          <Skeleton className="absolute right-0 top-0 z-10 h-5 w-14 rounded-2xl" />

          {/* تصویر */}
          <div className="relative mx-auto mt-15 aspect-square w-full max-w-44">
            <Skeleton className="h-full w-full rounded-md" />
          </div>
        </div>

        {/* عنوان */}
        <div className="space-y-2">
          <Skeleton className="h-3.5 w-full" />
          <Skeleton className="h-3.5 w-4/5" />
        </div>

        {/* امتیاز + ارسال سریع */}
        <div className="flex min-h-5 items-center justify-between">
          <Skeleton className="h-3.5 w-20" />
          <Skeleton className="h-3.5 w-8" />
        </div>

        {/* قیمت */}
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-5 w-10 rounded-full" />

          <div className="flex flex-col items-end gap-1">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterSidebarSkeleton() {
  return (
    <div className="space-y-6 p-3">
      {/* عنوان فیلتر */}
      <Skeleton className="h-5 w-24" />

      {/* چند فیلتر */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-28" />

        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-sm" />
              <Skeleton className="h-3 w-24" />
            </div>
          ))}
        </div>
      </div>

      {/* فیلتر قیمت */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-28" />

        <div className="flex items-center gap-2">
          <Skeleton className="h-8 flex-1" />
          <Skeleton className="h-8 flex-1" />
        </div>

        <Skeleton className="h-2 w-full rounded-full" />
      </div>

      {/* چند گزینه دیگر */}
      <div className="space-y-4">
        <Skeleton className="h-4 w-28" />

        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex items-center justify-between">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-4 w-7 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SortBarSkeleton() {
  return (
    <div className="flex items-center gap-4 mt-4 pb-3">
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-3 w-14" />
      <Skeleton className="h-3 w-16" />
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-3 w-16" />
    </div>
  );
}

export default function Loading() {
  return (
    <div className="flex gap-4 pl-4 ">
      {/* Sidebar
          در Page اصلی هم فقط از lg به بالا نمایش داده می‌شود */}
      <aside className="hidden w-60 shrink-0 border p-2 lg:block">
        <FilterSidebarSkeleton />
      </aside>

      {/* Main */}
      <section className="min-w-0 flex-1">
        {/* SortBar + تعداد کالا */}
        <div className="flex items-center justify-between border-b">
          <SortBarSkeleton />

          <Skeleton className="mb-3 ml-2 h-3 w-20" />
        </div>

        {/* Products */}
        <ul className="grid grid-cols-2 gap-1.5 xl:grid-cols-3 2xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <li key={index}>
              <ProductCardSkeleton />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

