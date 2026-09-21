"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ShoppingBagIcon,
  UserCircleIcon,
  Bars3Icon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Search from "./search/Search";
import { useCart, selectTotalCount } from "@/store/cart.store";
import { useAuth } from "@/store/auth.store";

interface HeaderTopProps {
  onDrawerOpen: () => void;
}

/* ردیف بالای هدر: لوگو، جستجو، سبد خرید و دکمه‌ی منو */
export default function HeaderTop({ onDrawerOpen }: HeaderTopProps) {
  const count = useCart(selectTotalCount);
  const user = useAuth((state) => state.user);

  // سرور localStorage ندارد، پس تا mount شدن حالت مهمان نشان داده می‌شود
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isLoggedIn = mounted && user;

  return (
    <div className="flex h-15 items-center justify-between px-4 md:h-20 md:px-6">

      {/* Logo */}
      <div className="relative flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 px-0 hover:bg-transparent"
        >
          <Link href="/" className="flex items-center gap-1.5">
            <BuildingStorefrontIcon className="h-8 w-8 text-[#00B0FF]" />

            <span className="font-poppins text-[15px] font-extrabold text-[#1A237E] sm:text-[17px] md:text-[20px]">
              Tahamtan<span className="text-[#00B0FF]">SHOP</span>
            </span>
          </Link>
        </Button>

        <Search />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 md:gap-4">

        {/* Mobile: hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="text-[#1A237E] lg:hidden"
          onClick={onDrawerOpen}
        >
          <Bars3Icon className="min-h-5 min-w-5" />
          <span className="sr-only">باز کردن منو</span>
        </Button>

        {/* Desktop: login */}
        <Button
          variant="outline"
          size="lg"
          className="hidden min-w-35 gap-1.5 rounded-sm border-[#1A237E]/30 text-[12px] font-bold text-[#1A237E]/90 transition-all duration-200 hover:bg-primary hover:text-white lg:flex"
        >
          <Link
            href={isLoggedIn ? "/profile" : "/auth"}
            className="flex items-center gap-1.5 size-full justify-center items-center"
          >
            <UserCircleIcon className="min-h-5 min-w-5" />
            {isLoggedIn ? user.fname : "ورود | ثبت‌نام"}
          </Link>
        </Button>

        {/* Desktop: cart */}
        <Button
          variant="ghost"
          size="icon"
          className="relative hidden p-5 text-[#1A237E] lg:flex"
        >
          <Link href="/cart">
            <ShoppingBagIcon className="min-h-7 min-w-7" />

            {mounted && count > 0 && (
              <Badge className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full border-0 bg-[#00B0FF] px-0.5 text-[10px] font-bold leading-none text-white">
                {count.toLocaleString("fa-IR")}
              </Badge>
            )}

            <span className="sr-only">سبد خرید</span>
          </Link>
        </Button>

      </div>
    </div>
  );
}