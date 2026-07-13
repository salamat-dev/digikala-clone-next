"use client";

import Link from "next/link";
import {
  ShoppingBagIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderTopProps {
  onDrawerOpen: () => void;
  onSearchOpen: () => void;
}

export default function HeaderTop({ onDrawerOpen, onSearchOpen }: HeaderTopProps) {
  return (
    <div className="flex items-center justify-between h-[60px] md:h-[80px] px-4 md:px-6">

      {/* Logo */}
      <Button variant="ghost" size="sm" asChild className="hover:bg-transparent px-0 gap-1.5">
        <Link href="/">
          <span className="font-poppins font-extrabold text-[15px] sm:text-[17px] md:text-[20px] text-[#1A237E]">
            YOUR<span className="text-[#00B0FF]">SHOP</span>
          </span>
          <BuildingStorefrontIcon className="w-8 h-8 text-[#00B0FF]" />
        </Link>
      </Button>

      {/* Actions */}
      <div className="flex items-center gap-1 md:gap-4">

        {/* Mobile: hamburger */}
        <Button variant="ghost" size="icon" className="md:hidden text-[#1A237E]" onClick={onDrawerOpen}>
          <Bars3Icon className="w-6 h-6" />
          <span className="sr-only">باز کردن منو</span>
        </Button>

        {/* Desktop: login */}
        <Button variant="outline" size="sm" asChild className="hidden md:flex gap-1.5 rounded-xl font-bold text-[12px] text-[#1A237E] border-[#1A237E] hover:bg-[#1A237E] hover:text-white transition-all duration-200">
          <Link href="/auth">
            <UserCircleIcon className="w-4 h-4" />
            ورود | ثبت‌نام
          </Link>
        </Button>

        {/* Desktop: cart */}
        <Button variant="ghost" size="icon" asChild className="hidden md:flex relative text-[#1A237E]">
          <Link href="/cart">
            <ShoppingBagIcon className="w-5 h-5" />
            <Badge className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-0.5 bg-[#00B0FF] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none border-0">
              0
            </Badge>
            <span className="sr-only">سبد خرید</span>
          </Link>
        </Button>

        {/* Search */}
        <Button variant="ghost" size="icon" className="text-[#1A237E]" onClick={onSearchOpen}>
          <MagnifyingGlassIcon className="w-5 h-5" />
          <span className="sr-only">جستجو</span>
        </Button>

      </div>
    </div>
  );
}
