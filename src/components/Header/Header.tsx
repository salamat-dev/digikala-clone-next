import HeaderClient from "./HeaderClient";
import HeaderBottom from "./HeaderBottom";
import CollapsibleHeaderBottom from "./CollapsibleHeaderBottom";
import { Category } from "@/types/categories";

interface HeaderProps {
  categories: Category[];
  categoriesError: boolean;
}

/* هدر ثابت سایت: ردیف بالا همیشه ثابت، ردیف پایین با اسکرول جمع می‌شود */
export default function Header({ categories, categoriesError }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-white border-b border-border text-foreground">
      <div className="max-w-384 mx-auto">
        <HeaderClient />

        <CollapsibleHeaderBottom>
          <HeaderBottom
            categories={categories}
            categoriesError={categoriesError}
          />
        </CollapsibleHeaderBottom>
      </div>
    </header>
  );
}
