import MegaMenuClient from "./MegaMenuClient";
import { Category } from "@/types/categories";

interface MegaMenuProps {
    categories: Category[];
    categoriesError: boolean;
}

/* ورودی مگامنو: دیتا را به نسخه‌ی کلاینتی می‌دهد */
export default function MegaMenu({
  categories,
  categoriesError
}: MegaMenuProps) {
  if (categoriesError) {
  return (
    <div className="flex items-center justify-center py-12 text-sm text-muted-foreground">
      دریافت دسته‌بندی‌ها با مشکل مواجه شد.
      لطفاً چند دقیقه دیگر دوباره تلاش کنید.
    </div>
  );
}
  return <MegaMenuClient categories={categories} />;
}