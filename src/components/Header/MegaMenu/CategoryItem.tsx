import { Category } from "@/types/categories"
import Link from "next/link"
import { categoryIcons, defaultCategoryIcon } from "@/constants/category-icons"

interface CategoryItemProps {
    category: Category,
    activeCategory: Category,
    onHover: (categories: Category) => void
}

export default function CategoryItem({ category, activeCategory, onHover }: CategoryItemProps) {
    const Icon =
        categoryIcons[category.icon as keyof typeof categoryIcons] ??
        defaultCategoryIcon;

    return (
        <li
            className={`flex items-center gap-3 px-4 py-3 ${activeCategory.id === category.id ? 'text-primary bg-white' : 'hover:bg-white hover:text-primary'} transition-colors`}
            onMouseEnter={() => onHover(category)}
        >
            <Icon size={24} stroke={1.6}/>
            <Link href={''} className="text-sm font-medium size-full">
                {category.title}
            </Link>

        </li>
    )
}
