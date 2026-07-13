"use client";

import Link from "next/link";
import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV } from "./constants";

interface NavDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function NavDrawer({ open, onOpenChange }: NavDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild><span /></SheetTrigger>
      <SheetContent side="right" className="w-[180px] sm:w-[200px] p-5 flex flex-col">

        <SheetHeader className="p-0 mb-4">
          <SheetTitle asChild>
            <Button variant="ghost" size="sm" asChild className="justify-start px-0 hover:bg-transparent">
              <Link href="/" onClick={() => onOpenChange(false)}>
                <BuildingStorefrontIcon className="w-6 h-6 text-[#1A237E]" />
                <span className="font-poppins font-black text-[15px] text-[#1A237E]">
                  YOUR<span className="text-[#00B0FF]">SHOP</span>
                </span>
              </Link>
            </Button>
          </SheetTitle>
        </SheetHeader>

        <Separator className="mb-4" />

        <nav className="flex flex-col gap-0.5 flex-1">
          {NAV.map((n) => {
            const Icon = n.i;
            return (
              <SheetClose key={n.t} asChild>
                <Button variant="ghost" size="sm" asChild className="justify-start font-bold text-foreground hover:text-[#1A237E]">
                  <Link href={n.h}>
                    <Icon className="w-4 h-4 text-[#1A237E] shrink-0" />
                    {n.t}
                  </Link>
                </Button>
              </SheetClose>
            );
          })}
        </nav>

        <SheetFooter className="mt-auto pt-4 flex-col items-start gap-0 p-0">
          <SheetDescription className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">
            پشتیبانی ۲۴ ساعته
          </SheetDescription>
          <p className="text-sm font-black text-[#1A237E]">+98 937 335 5740</p>
        </SheetFooter>

      </SheetContent>
    </Sheet>
  );
}
