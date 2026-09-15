"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Bars3BottomRightIcon } from "@heroicons/react/24/outline";

import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { key: "", label: "مرتبط‌ترین" },
  { key: "cheapest", label: "ارزان‌ترین" },
  { key: "expensive", label: "گران‌ترین" },
  { key: "discount", label: "بیشترین تخفیف" },
];

/* نوار مرتب‌سازی: مقدار sort را در URL ست یا حذف می‌کند */
export default function SortBar({ current }: { current: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function changeSort(key: string) {
    const params = new URLSearchParams(searchParams.toString());

    // حالت پیش‌فرض پارامتری در URL نمی‌گذارد
    if (key) params.set("sort", key);
    else params.delete("sort");

    router.push(`${pathname}?${params}`, { scroll: false });
  }

  return (
    <div className="flex items-center gap-4 overflow-x-auto border-b pb-3 hide-scrollbar">
      <span className="flex shrink-0 items-center gap-1.5 text-[13px] text-muted-foreground">
        <Bars3BottomRightIcon className="h-5 w-5" />
        مرتب سازی:
      </span>

      {SORT_OPTIONS.map((option) => (
        <button
          key={option.key}
          type="button"
          onClick={() => changeSort(option.key)}
          className={cn(
            "shrink-0 cursor-pointer text-[13px] transition-colors",
            current === option.key
              ? "font-bold text-primary"
              : "text-neutral-700 hover:text-primary"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}