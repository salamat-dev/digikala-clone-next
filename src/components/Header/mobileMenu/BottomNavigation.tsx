import { Category } from "@/types/categories";
import { navigationItems } from "../constants";
import BottomNavigationItem from "./BottomNavigationItem";


export default function BottomNavigation() {
  return (
<nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background lg:hidden">
  <div className="flex h-16 items-center">
    {navigationItems.map((item) => (
      <BottomNavigationItem
        key={item.id}
        item={item}
      />
    ))}
  </div>
</nav>
  );
}