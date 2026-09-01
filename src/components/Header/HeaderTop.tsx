"use client";

import Link from "next/link";
import {
  ShoppingBagIcon,
  UserCircleIcon,
  Bars3Icon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Search from "./search/Search";


interface HeaderTopProps {
  onDrawerOpen: () => void;
}

export default function HeaderTop({ onDrawerOpen }: HeaderTopProps) {
  return (
    <div className="flex items-center justify-between h-15 md:h-20 px-4 md:px-6">

      {/* Logo */}
      <div className="relative flex gap-2 items-center">
        <Button variant="ghost" size="sm" asChild className="hover:bg-transparent px-0 gap-1.5">
          <Link href="/">
            <span className="font-poppins font-extrabold text-[15px] sm:text-[17px] md:text-[20px] text-[#1A237E]">
              Tahamtan<span className="text-[#00B0FF]">SHOP</span>
            </span>
            <BuildingStorefrontIcon className="w-8 h-8 text-[#00B0FF]" />
          </Link>
        </Button>

        <Search/>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 md:gap-4">

        {/* Mobile: hamburger */}
        <Button variant="ghost" size="icon" className="lg:hidden text-[#1A237E]" onClick={onDrawerOpen}>
          <Bars3Icon className="min-w-5 min-h-5" />
          <span className="sr-only">باز کردن منو</span>
        </Button>

        {/* Desktop: login */}
        <Button variant="outline" size="lg" asChild className="hidden min-w-35 lg:flex gap-1.5 rounded-sm font-bold text-[12px] text-[#1A237E]/90 border-[#1A237E]/30 hover:bg-primary hover:text-white transition-all duration-200">
          <Link href="/auth">
            <UserCircleIcon className="min-w-5 min-h-5" />
            ورود | ثبت‌نام
          </Link>
        </Button>

        {/* Desktop: cart */}
        <Button variant="ghost" size="icon" asChild className="hidden p-5 lg:flex relative text-[#1A237E]">
          <Link href="/cart">
            <ShoppingBagIcon className="min-w-7 min-h-7" />
            <Badge className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-0.5 bg-[#00B0FF] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none border-0">
              0
            </Badge>
            <span className="sr-only">سبد خرید</span>
          </Link>
        </Button>


      </div>
    </div>
  );
}
