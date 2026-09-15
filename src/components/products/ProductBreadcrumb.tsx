import { Fragment } from "react";
import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Props {
  items: { id: number; title_fa?: string }[];
}

/* مسیر دسته‌بندی بالای صفحه‌ی محصول */
export default function ProductBreadcrumb({ items }: Props) {
  if (items.length === 0) return null;

  return (
    <Breadcrumb className="mb-4">
      {/* در موبایل به‌جای شکستن، افقی اسکرول می‌شود */}
      <BreadcrumbList className="flex-nowrap overflow-x-auto whitespace-nowrap text-[11px] hide-scrollbar sm:flex-wrap sm:whitespace-normal">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <Fragment key={item.id}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{item.title_fa}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={`/products/${item.id}`}>{item.title_fa}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator className="rotate-180" />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}