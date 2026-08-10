'use client'

import Link from "next/link";
import { navigationItems } from "../constants";
import { usePathname } from "next/navigation";

import {
  HomeIcon,
  Squares2X2Icon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

import {
  HomeIcon as HomeIconSolid,
  Squares2X2Icon as Squares2X2IconSolid,
  ShoppingCartIcon as ShoppingCartIconSolid,
  UserIcon as UserIconSolid,
} from "@heroicons/react/24/solid";

const outlineIcons = {
  home: HomeIcon,
  category: Squares2X2Icon,
  cart: ShoppingCartIcon,
  profile: UserIcon,
} as const;

const solidIcons = {
  home: HomeIconSolid,
  category: Squares2X2IconSolid,
  cart: ShoppingCartIconSolid,
  profile: UserIconSolid,
} as const;

interface BottomNavigationItemProps {
  item: (typeof navigationItems)[number];
}

export default function BottomNavigationItem({
  item,
}: BottomNavigationItemProps) {

const pathname = usePathname();

const isActive =
  item.href === "/"
    ? pathname === "/"
    : pathname.startsWith(item.href);

  const Icon = isActive ? solidIcons[item.icon] : outlineIcons[item.icon];

  return (
<Link
  href={item.href}
  className={`flex flex-1 flex-col items-center justify-center gap-1 text-xs transition-colors ${
    isActive
      ? "font-medium text-primary"
      : "text-muted-foreground hover:text-foreground"
  }`}
>
  <Icon className="h-6 w-6" />

  <span>{item.label}</span>
</Link>
  );

}