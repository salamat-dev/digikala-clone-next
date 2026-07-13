import { Category } from "@/types/categories"
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import SubCategoryAccordion from "./SubCategoryAccordion";
import Link from "next/link";


interface CategoryContentProps {
    category: Category;
}

export default function CategoryContent({ category }: CategoryContentProps) {
    return (
        <>
            <Link href={''} className="flex items-cente w-1/4 gap-1 px-4 py-3">
                <h2 className="text-xs text-primary">
                    همه محصولات {category.title}
                </h2>
                <ChevronLeftIcon className="w-3 h-3 text-primary" />
            </Link>
            <SubCategoryAccordion categories={category.children ?? []}/>
        </>
    )
}
