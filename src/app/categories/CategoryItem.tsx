import { Category } from '@/types/categories';
import { categoryIcons, defaultCategoryIcon } from '@/constants/category-icons';

interface CategoryItemProps {
    category: Category;
    onClick: () => void;
    active: boolean;
}

/* دکمه‌ی انتخاب دسته در ستون راست (لینک نیست، فقط محتوا را عوض می‌کند) */
export default function CategoryItem({ category, onClick, active }: CategoryItemProps) {
    const Icon =
        categoryIcons[category.icon as keyof typeof categoryIcons] ??
        defaultCategoryIcon;

    return (
        <button onClick={onClick} key={category.id} className={`w-full min-h-16 md:min-h-18 px-2 text-[10px] md:text-xs flex flex-col justify-center items-center gap-1 transition-colors border ${active ? "bg-white text-primary border-none" : "bg-gray-100"}`}><Icon size={20} stroke={1.6} />{category.title}</button>
    )
}
