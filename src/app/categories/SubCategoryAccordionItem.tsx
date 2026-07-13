"use client";

import Image from "next/image";
import Link from "next/link";
import { IconLayoutGrid } from "@tabler/icons-react";

import { SubCategory } from "@/types/categories";

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface SubCategoryAccordionItemProps {
  category: SubCategory;
}

export default function SubCategoryAccordionItem({
  category,
}: SubCategoryAccordionItemProps) {
  const visibleChildren = category.children?.slice(0, 11) ?? [];
  const hasChildren = (category.children?.length ?? 0) > 0;

if (!hasChildren) {
  return (
    <Link
      href={category.url.url}
      className="flex items-center border-b border-border/50 px-4 py-4 text-[13px]"
    >
      <span>{category.title}</span>

      
    </Link>
  );
}

  return (
    <AccordionItem
      value={String(category.id)}
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
        {category.title}
      </AccordionTrigger>

      <AccordionContent className="grid grid-cols-3 gap-x-4 gap-y-6 py-3 [&_a]:no-underline h-auto">

        {visibleChildren.map((child) => (
          <Link
            key={child.id}
            href={child.url.url}
            className="flex flex-col items-center text-center"
          >
            <figure className="m-0 flex bg-muted h-16 w-16 items-center justify-center overflow-hidden rounded-full border">
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
        ))}

        <Link
          href={category.url.url}
          className="flex flex-col items-center text-center"
        >
          <figure className="m-0 flex h-16 w-16 items-center justify-center rounded-full border bg-white">
            <IconLayoutGrid
              size={24}
              stroke={1.7}
              className="text-primary"
            />
          </figure>

          <p className="mt-2 text-[11px] leading-4">
            همه کالاها
          </p>
        </Link>

      </AccordionContent>
    </AccordionItem>
  );
}