"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SORT_OPTIONS = [
  { key: "", label: "مرتبط‌ترین" },
  { key: "cheapest", label: "ارزان‌ترین" },
  { key: "expensive", label: "گران‌ترین" },
  { key: "discount", label: "بیشترین تخفیف" },
];

export default function SortBar({ current }: { current: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function changeSort(key: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (key) params.set("sort", key);
    else params.delete("sort");

    router.push(`${pathname}?${params}`, { scroll: false });
  }

  return (
    <div className="flex items-center gap-4 overflow-x-auto py-3 hide-scrollbar">
      <span className="shrink-0 text-[13px] text-muted-foreground">
        مرتب سازی:
      </span>

      {SORT_OPTIONS.map((option) => (
        <button
          key={option.key}
          onClick={() => changeSort(option.key)}
          className={`shrink-0 text-[13px] transition-colors ${
            current === option.key
              ? "font-bold text-red-500"
              : "text-neutral-700 hover:text-red-500"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}