"use client";

import { Category } from "@/types/categories";
import { Button } from "@/components/ui/button";
import {
  Bars3Icon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import CategoryList from "./CategoryList";
import CategoryContent from "./CategoryContent";


interface MegaMenuClientProps {
  categories: Category[];
}

export default function MegaMenuClient({
  categories,
}: MegaMenuClientProps) {

const [activeCategory, setActiveCategory] = useState(categories?.[0] ?? null);


  return (
    <div className="group relative">

      <Button
        variant="ghost"
        className="gap-1.5 font-extrabold h-[50px] px-3  hover:bg-transparent"
      >
        <Bars3Icon className="w-5 h-5" />

        دسته‌بندی‌ها

        <ChevronDownIcon className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
      </Button>

      <div
        className="
          invisible opacity-0 pointer-events-none
          group-hover:visible group-hover:opacity-100 group-hover:pointer-events-auto
          transition-all duration-200 ease-out
          absolute top-full -right-1
          h-125 w-auto min-w-210
          bg-white rounded-br-sm rounded-bl-sm
          z-[1001] border-t border-border 
          "
          >
        <div className="flex h-full">

          {/* Right Side */}

          <div className="w-70 shrink-0 border-l overflow-y-auto bg-gray-100">
      
            <CategoryList categories={categories} activeCategory={activeCategory} onHover={setActiveCategory}/>

          </div>

          {/* Left Side */}
            
            <CategoryContent activeCategory={activeCategory}/>
            
        </div>

      </div>
    </div>
  );
}