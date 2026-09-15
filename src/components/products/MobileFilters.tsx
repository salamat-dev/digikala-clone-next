"use client";

import { useState } from "react";
import {
  AdjustmentsHorizontalIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import FilterSidebar from "./FilterSidebar";

/* همان پراپ‌هایی که FilterSidebar می‌گیرد */
type FilterProps = React.ComponentProps<typeof FilterSidebar>;

/* نسخه‌ی موبایل فیلترها: همان سایدبار داخل یک کشوی تمام‌قد */
export default function MobileFilters(props: FilterProps) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* دکمه‌ی باز کردن — فقط زیر lg دیده می‌شود */}
      <SheetTrigger className="flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-[13px] lg:hidden">
        <AdjustmentsHorizontalIcon className="h-4 w-4" />
        فیلترها
      </SheetTrigger>

      {/* استایل: از زیر هدر تا بالای نوار ناوبری پایین کشیده می‌شود */}
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="bottom-16 top-[60px] h-auto gap-0 rounded-t-2xl p-0 md:top-[80px]"
      >
        <SheetHeader className="flex-row items-center justify-between border-b px-4 py-3">
          <SheetTitle className="text-sm">فیلترها</SheetTitle>

          <SheetClose className="cursor-pointer rounded-md p-1 transition-colors hover:bg-muted">
            <XMarkIcon className="h-5 w-5" />
            <span className="sr-only">بستن</span>
          </SheetClose>
        </SheetHeader>

        {/* بدنه‌ی اسکرول‌شونده */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <FilterSidebar {...props} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
