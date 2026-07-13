// "use client";

// import React, { useState } from "react";
// import Link from "next/link";
// import {
//   ShoppingBagIcon,
//   UserCircleIcon,
//   HomeIcon,
//   Bars3Icon,
// } from "@heroicons/react/24/outline";
// import { cn } from "@/lib/utils";

// interface NavItem {
//   label: string;
//   icon: React.ElementType;
//   href: string;
//   badge?: string;
// }

// const NAV_ITEMS: NavItem[] = [
//   { label: "خانه",       icon: HomeIcon,       href: "/"     },
//   { label: "دسته‌بندی", icon: Bars3Icon,       href: "#"     },
//   { label: "سبد خرید",       icon: ShoppingBagIcon, href: "#",    badge: "0" },
//   { label: "حساب کاربری",    icon: UserCircleIcon,  href: "/auth" },
// ];

// export default function BottomNavigationBar() {
//   const [value, setValue] = useState<number>(0);

//   return (
//     <div className="fixed bottom-0 left-0 w-full z-[1000] lg:hidden bg-white border-t border-border shadow-sm">
//       <nav className="flex items-center justify-around h-[56px]">
//         {NAV_ITEMS.map((item, idx) => {
//           const Icon = item.icon;
//           const isActive = value === idx;

//           const inner = (
//             <button
//               key={item.label}
//               onClick={() => setValue(idx)}
//               className={cn(
//                 "flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-xs font-semibold transition-colors",
//                 isActive
//                   ? "text-[#1A237E]"
//                   : "text-muted-foreground hover:text-[#1A237E]"
//               )}
//             >
//               <span className="relative">
//                 <Icon className="w-5 h-5" />
//                 {item.badge !== undefined && (
//                   <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-0.5 bg-[#00B0FF] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
//                     {item.badge}
//                   </span>
//                 )}
//               </span>
//               <span>{item.label}</span>
//             </button>
//           );

//           if (item.href && item.href !== "#") {
//             return (
//               <Link key={item.label} href={item.href} className="flex-1 h-full flex">
//                 {inner}
//               </Link>
//             );
//           }

//           return <React.Fragment key={item.label}>{inner}</React.Fragment>;
//         })}
//       </nav>
//     </div>
//   );
// }