/* داده‌های ثابت هدر: لینک‌های ناوبری و آیتم‌های نوار پایین */
import {
  HomeIcon,
  InformationCircleIcon,
  DocumentTextIcon,
  PhoneIcon,
  Squares2X2Icon,
  ShoppingCartIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import React from "react";

export interface NavItem {
  t: string;
  i: React.ElementType;
  h: string;
}

export const NAV: NavItem[] = [
  { t: "خانه",      i: HomeIcon,              h: "/"        },
  { t: "درباره ما", i: InformationCircleIcon, h: "/about"   },
  { t: "مقالات",    i: DocumentTextIcon,      h: "/blog"    },
  { t: "تماس با ما",i: PhoneIcon,             h: "/contact" },
];

export const navigationItems = [
  {
    id: "home",
    label: "خانه",
    icon: "home",
    href: "/",
  },
  {
    id: "category",
    label: "دسته‌بندی",
    icon: "category",
    href: "/categories",
  },
  {
    id: "cart",
    label: "سبد خرید",
    icon: "cart",
    href: "/cart",
  },
  {
    id: "profile",
    label: "پروفایل من",
    icon: "profile",
    href: "/profile",
  },
] as const;