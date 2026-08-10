import HeaderClient from "./HeaderClient";
import HeaderBottom from "./HeaderBottom";
import { Category } from "@/types/categories";

interface HeaderProps {
  categories: Category[];
  categoriesError: boolean;
}

export default function Header({
  categories,
  categoriesError
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-white/90 backdrop-blur-[8px] border-b border-border text-foreground">
      <div className="max-w-[1536px] mx-auto">
        <HeaderClient />
        <HeaderBottom categories={categories} categoriesError={categoriesError}/>
      </div>
    </header>
  );
}