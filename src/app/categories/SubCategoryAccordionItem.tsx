"use client";

import Image from "next/image";
import Link from "next/link";
import { IconLayoutGrid } from "@tabler/icons-react";

import { SubCategory } from "@/types/categories";
import { getCategoryHref } from "@/lib/getCategoryHref";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SubCategoryAccordionItemProps {
  subCategory: SubCategory;
}

export default function SubCategoryAccordionItem({
  subCategory,
}: SubCategoryAccordionItemProps) {
  const visibleChildren = subCategory.children.slice(0, 11);
  const hasChildren = subCategory.children.length > 0;

const subCategoryHref = getCategoryHref(
  subCategory.url,
  subCategory.id,
  subCategory.children
);

  // زیرشاخه‌ای که خودش فرزند ندارد → فقط یک ردیف ساده
  if (!hasChildren) {
    return subCategoryHref ? (
      <Link
        href={subCategoryHref}
        className="flex items-center border-b border-border/50 px-4 py-4 text-[13px]"
      >
        {subCategory.title}
      </Link>
    ) : (
      <div className="flex items-center border-b border-border/50 px-4 py-4 text-[13px] text-muted-foreground">
        {subCategory.title}
      </div>
    );
  }

  return (
    <AccordionItem
      value={String(subCategory.id)}
      className="border-b border-border/50 px-4"
    >
      <AccordionTrigger
        className="
          py-4
          text-[13px]
          text-right
          cursor-pointer
          hover:no-underline
          [&_[data-slot=accordion-trigger-icon]]:mr-auto
          [&_[data-slot=accordion-trigger-icon]]:ml-0
        "
      >
        {subCategory.title}
      </AccordionTrigger>

      <AccordionContent className="grid grid-cols-3 gap-x-4 gap-y-6 py-3 [&_a]:no-underline h-auto">
        {visibleChildren.map((child) => {
          const childHref = getCategoryHref(child.url, child.id);

          // آیتم‌هایی که دسته‌بندی نیستند (web_link، product_page، ...) را نشان نده
          if (!childHref) return null;

          return (
            <Link
              key={child.id}
              href={childHref}
              className="flex flex-col items-center text-center"
            >
              <figure className="m-0 flex h-15 w-15 items-center justify-center overflow-hidden rounded-full border bg-neutral-100">
                <Image
                  src={child.image}
                  alt={child.title}
                  width={50}
                  height={50}
                  className="object-cover"
                />
              </figure>

              <p className="mt-2 line-clamp-2 text-[11px] leading-4">
                {child.title}
              </p>
            </Link>
          );
        })}

        {subCategoryHref && (
          <Link
            href={subCategoryHref}
            className="flex flex-col items-center text-center"
          >
            <figure className="m-0 flex h-15 w-15 items-center justify-center rounded-full border bg-white">
              <IconLayoutGrid size={24} stroke={1.7} className="text-primary" />
            </figure>

            <p className="mt-2 text-[11px] leading-4">همه کالاها</p>
          </Link>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}