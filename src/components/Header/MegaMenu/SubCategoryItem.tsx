import { SubCategory } from "@/types/categories";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface SubCategoryItemProps {
    item: SubCategory;
}

export default function SubCategoryItem({
    item,
}: SubCategoryItemProps) {

    return (

        <div className="space-y-4">

            <Link
                href={item.url.url}
                className="flex items-center gap-3 hover:text-secondary transition-colors text-[15px] font-bold"
            >
                <div className="w-[1.5px] h-5 bg-secondary rounded-full" />

                {item.title}

                <ChevronLeftIcon className="w-3 h-3" />
            </Link>

            <div className="mr-5 space-y-2 flex flex-col">

                {item.children?.map((child) => (

                    <Link
                        key={child.id}
                        href={child.url.url}
                        className="text-sm text-gray-500 hover:text-secondary"
                    >
                        {child.title}
                    </Link>

                ))}

            </div>

        </div>

    );

}