"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import CheckoutButton from "@/components/cart/CheckoutButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import BackButton from "@/components/BackButton";
import { useCart, selectTotalPrice } from "@/store/cart.store";

/* صفحه‌ی سبد خرید */
export default function CartPage() {
  const { items, remove, plus, minus, clear } = useCart();
  const total = useCart(selectTotalPrice);

  // تا mount نشده چیزی رندر نمی‌شود تا hydration نشکند
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
        <p className="text-sm font-medium">سبد خرید شما خالی است</p>

        <Link href="/" className="text-[13px] text-primary hover:underline">
          بازگشت به فروشگاه
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full px-4 py-4 lg:px-16">
      <BackButton className="mb-3" />

      <h1 className="mb-4 text-lg font-bold">سبد خرید</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        {/* فهرست اقلام */}
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="flex gap-3 rounded-xl border p-3">
              <div className="relative h-20 w-20 shrink-0">
                <Image
                  src={item.image || "/images/no-image.webp"}
                  alt={item.title}
                  fill
                  sizes="80px"
                  className="object-contain"
                />
              </div>

              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <Link
                  href={`/product/${item.id}`}
                  className="line-clamp-2 text-[13px] leading-6"
                >
                  {item.title}
                </Link>

                <div className="mt-auto flex items-center justify-between">
                  {/* کنترل تعداد */}
                  <div className="flex items-center gap-2 rounded-lg border px-2 py-1">
                    <button
                      type="button"
                      onClick={() => plus(item.id)}
                      className="cursor-pointer"
                      aria-label="افزایش"
                    >
                      <PlusIcon className="h-4 w-4 text-primary" />
                    </button>

                    <span className="min-w-6 text-center text-[13px]">
                      {item.count.toLocaleString("fa-IR")}
                    </span>

                    {item.count === 1 ? (
                      <button
                        type="button"
                        onClick={() => remove(item.id)}
                        className="cursor-pointer"
                        aria-label="حذف"
                      >
                        <TrashIcon className="h-4 w-4 text-primary" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => minus(item.id)}
                        className="cursor-pointer"
                        aria-label="کاهش"
                      >
                        <MinusIcon className="h-4 w-4 text-primary" />
                      </button>
                    )}
                  </div>

                  <p className="text-[14px] font-bold">
                    {(item.price * item.count).toLocaleString("fa-IR")}
                    <span className="mr-1 text-[10px] font-normal">تومان</span>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* خلاصه‌ی سفارش */}
        <aside className="h-fit space-y-4 rounded-xl border p-4 lg:sticky lg:top-40">
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-muted-foreground">جمع سبد خرید</span>

            <span className="font-bold">
              {total.toLocaleString("fa-IR")} تومان
            </span>
          </div>

          <Separator />

          <CheckoutButton />

          <button
            type="button"
            onClick={clear}
            className="w-full cursor-pointer text-[12px] text-muted-foreground hover:text-red-500"
          >
            خالی کردن سبد
          </button>
        </aside>
      </div>
    </div>
  );
}