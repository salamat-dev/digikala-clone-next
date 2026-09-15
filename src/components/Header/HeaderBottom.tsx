import Link from "next/link";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import MegaMenu from "./MegaMenu/MegaMenu";
import { NAV } from "./constants";
import { Category } from "@/types/categories";

interface HeaderBottomProps {
    categories: Category[];
    categoriesError: boolean;
}
/* ردیف پایین هدر در دسکتاپ: مگامنو، لینک‌های ناوبری و تماس */
export default function HeaderBottom({ categories, categoriesError } : HeaderBottomProps) {
  return (
    <div className="hidden lg:flex items-center justify-between min-h-12.5 px-8 border-t border-gray-100">

      <div className="flex items-center gap-1">
        <MegaMenu categories={categories} categoriesError={categoriesError}/>
        <Separator orientation="vertical" className="h-6 my-auto mx-2" />
        {NAV.map((n) => {
          const Icon = n.i;
          return (
            <Button key={n.t} variant="ghost" size="sm" asChild className="text-muted-foreground font-semibold hover:text-[#1A237E]">
              <Link href={n.h}>
                <Icon className="w-4 h-4" />
                {n.t}
              </Link>
            </Button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <div className="text-left">
          <p className="text-[11px] text-muted-foreground">AmirMahdi</p>
          <p dir="ltr" className="text-sm font-extrabold">+98 937 335 5740</p>
        </div>
        <Button size="icon-sm" className="bg-[#00B0FF] hover:bg-[#0081cb] text-white rounded-lg">
          <PhoneIcon className="w-4 h-4" />
          <span className="sr-only">تماس با ما</span>
        </Button>
      </div>

    </div>
  );
}
