"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

interface Props {
  brands: string[];
  selectedBrands: string[];
  priceMin: number;
  priceMax: number;
  currentMin: number;
  currentMax: number;
  onlyAvailable: boolean;
  onlyDiscounted: boolean;
  onlyFastShipping: boolean;
}

/* سایدبار فیلتر: هر تغییر را در URL می‌نویسد تا صفحه سمت سرور فیلتر شود */
export default function FilterSidebar({
  brands,
  selectedBrands,
  priceMin,
  priceMax,
  currentMin,
  currentMax,
  onlyAvailable,
  onlyDiscounted,
  onlyFastShipping,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // مقدار موقت اسلایدر حین کشیدن
  const [price, setPrice] = useState([currentMin, currentMax]);

  function push(params: URLSearchParams) {
    router.push(`${pathname}?${params}`, { scroll: false });
  }

  function toggleBrand(brand: string, checked: boolean) {
    const params = new URLSearchParams(searchParams.toString());

    const currentBrands = params.getAll("brand");
    params.delete("brand");

    const updatedBrands = checked
      ? [...currentBrands, brand]
      : currentBrands.filter((item) => item !== brand);

    updatedBrands.forEach((item) => params.append("brand", item));

    push(params);
  }

  function toggleSwitch(key: string, on: boolean) {
    const params = new URLSearchParams(searchParams.toString());

    if (on) params.set(key, "1");
    else params.delete(key);

    push(params);
  }

  function commitPrice(value: number[]) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("min", String(value[0]));
    params.set("max", String(value[1]));

    push(params);
  }

  function clearAll() {
    router.push(pathname, { scroll: false });
  }

  const hasFilters = searchParams.toString().length > 0;

  return (
    <div className="space-y-6 pl-1">
      {/* برند */}
      <div className="space-y-3">
        <h3 className="text-[13px] font-bold">برند</h3>

        <div className="max-h-56 space-y-3 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center gap-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) =>
                  toggleBrand(brand, checked === true)
                }
              />

              <Label
                htmlFor={`brand-${brand}`}
                className="text-[13px] font-normal"
              >
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* قیمت */}
      <div className="space-y-3">
        <h3 className="text-[13px] font-bold">محدوده قیمت</h3>

        <Slider
          dir="rtl"
          min={priceMin}
          max={priceMax}
          step={1000}
          value={price}
          onValueChange={setPrice}
          onValueCommit={commitPrice}
        />

        <div className="flex justify-between text-[11px] text-muted-foreground">
          <span>{price[0].toLocaleString("fa-IR")} تومان</span>
          <span>{price[1].toLocaleString("fa-IR")} تومان</span>
        </div>
      </div>

      {/* سوییچ‌ها */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="available" className="text-[13px] font-normal">
            فقط کالاهای موجود
          </Label>
          <Switch
            id="available"
            checked={onlyAvailable}
            onCheckedChange={(on) => toggleSwitch("available", on)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="discounted" className="text-[13px] font-normal">
            فقط تخفیف‌دارها
          </Label>
          <Switch
            id="discounted"
            checked={onlyDiscounted}
            onCheckedChange={(on) => toggleSwitch("discounted", on)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="fast" className="text-[13px] font-normal">
            ارسال سریع
          </Label>
          <Switch
            id="fast"
            checked={onlyFastShipping}
            onCheckedChange={(on) => toggleSwitch("fast", on)}
          />
        </div>
      </div>

      {hasFilters && (
        <button
          type="button"
          onClick={clearAll}
          className="cursor-pointer text-[12px] text-red-500 hover:underline"
        >
          حذف فیلترها
        </button>
      )}
    </div>
  );
}