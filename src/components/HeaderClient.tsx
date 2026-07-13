// "use client";

// import { motion, AnimatePresence } from "framer-motion";
// import React, { useState } from "react";
// import Link from "next/link";
// import {
//   ShoppingBagIcon,
//   UserCircleIcon,
//   MagnifyingGlassIcon,
//   Bars3Icon,
//   HomeIcon,
//   InformationCircleIcon,
//   DocumentTextIcon,
//   PhoneIcon,
//   XMarkIcon,
//   ChevronDownIcon,
//   BuildingStorefrontIcon,
// } from "@heroicons/react/24/outline";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import {
//   Dialog,
//   DialogClose,
//   DialogOverlay,
//   DialogPortal,
// } from "@/components/ui/dialog";

// interface NavItem {
//   t: string;
//   i: React.ElementType;
//   h: string;
// }

// const NAV: NavItem[] = [
//   { t: "Home",    i: HomeIcon,              h: "/"        },
//   { t: "About",   i: InformationCircleIcon, h: "/about"   },
//   { t: "Article", i: DocumentTextIcon,      h: "/blog"    },
//   { t: "Contact", i: PhoneIcon,             h: "/contact" },
// ];

// /* ─── Search Dialog ──────────────────────────────────────────────────── */
// interface SearchDialogProps {
//   open: boolean;
//   onClose: () => void;
// }

// function SearchDialog({ open, onClose }: SearchDialogProps) {
//   return (
//     <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
//       <DialogPortal forceMount>
//         <AnimatePresence>
//           {open && (
//             <>
//               <DialogOverlay asChild>
//                 <motion.div
//                   className="fixed inset-0 z-[1100] bg-black/20"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   transition={{ duration: 0.2 }}
//                 />
//               </DialogOverlay>

//               {/* Mobile */}
//               <motion.div
//                 role="dialog"
//                 aria-modal="true"
//                 initial={{ y: "100%" }}
//                 animate={{ y: 0 }}
//                 exit={{ y: "100%" }}
//                 transition={{ type: "spring", stiffness: 180, damping: 22 }}
//                 className="md:hidden fixed z-[1200] bg-white shadow-xl bottom-0 left-0 right-0 rounded-t-2xl min-h-[100dvh] px-6 pt-4 pb-8"
//               >
//                 <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
//                 <div className="flex items-center gap-3 mt-1">
//                   <div className="relative flex-1">
//                     <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                     <Input autoFocus placeholder="Search for clothes, shoes, etc..." className="pl-9 h-10 bg-[#e8e8e8] border-none rounded-xl focus-visible:ring-0" />
//                   </div>
//                   <DialogClose asChild>
//                     <Button variant="ghost" size="icon" className="shrink-0 rounded-full">
//                       <ChevronDownIcon className="w-7 h-7" />
//                       <span className="sr-only">Close search</span>
//                     </Button>
//                   </DialogClose>
//                 </div>
//               </motion.div>

//               {/* Desktop */}
//               <motion.div
//                 role="dialog"
//                 aria-modal="true"
//                 initial={{ y: "-100%" }}
//                 animate={{ y: 0 }}
//                 exit={{ y: "-100%" }}
//                 transition={{ type: "spring", stiffness: 180, damping: 22 }}
//                 className="hidden md:block fixed z-[1200] bg-white shadow-xl top-0 left-[17.5%] right-[17.5%] rounded-b-2xl min-h-[60dvh] px-6 pt-4 pb-8"
//               >
//                 <div className="w-10 h-1 bg-gray-200 rounded-full absolute bottom-3 left-1/2 -translate-x-1/2" />
//                 <div className="flex items-center gap-3 mt-1">
//                   <div className="relative flex-1">
//                     <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//                     <Input autoFocus placeholder="Search for clothes, shoes, etc..." className="pl-9 h-10 bg-[#e8e8e8] border-none rounded-xl focus-visible:ring-0" />
//                   </div>
//                   <DialogClose asChild>
//                     <Button variant="ghost" size="icon-sm" className="shrink-0 rounded-full">
//                       <XMarkIcon className="w-6 h-6" />
//                       <span className="sr-only">Close search</span>
//                     </Button>
//                   </DialogClose>
//                 </div>
//               </motion.div>
//             </>
//           )}
//         </AnimatePresence>
//       </DialogPortal>
//     </Dialog>
//   );
// }

// /* ─── Nav Drawer ─────────────────────────────────────────────────────── */
// interface NavDrawerProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
// }

// function NavDrawer({ open, onOpenChange }: NavDrawerProps) {
//   return (
//     <Sheet open={open} onOpenChange={onOpenChange}>
//       <SheetTrigger asChild><span /></SheetTrigger>
//       <SheetContent side="left" className="w-[180px] sm:w-[200px] p-5 flex flex-col">
//         <SheetHeader className="p-0 mb-4">
//           <SheetTitle asChild>
//             <Button variant="ghost" size="sm" asChild className="justify-start px-0 hover:bg-transparent">
//               <Link href="/" onClick={() => onOpenChange(false)}>
//                 <BuildingStorefrontIcon className="w-6 h-6 text-[#1A237E]" />
//                 <span className="font-poppins font-black text-[15px] text-[#1A237E]">
//                   YOUR<span className="text-[#00B0FF]">SHOP</span>
//                 </span>
//               </Link>
//             </Button>
//           </SheetTitle>
//         </SheetHeader>
//         <Separator className="mb-4" />
//         <nav className="flex flex-col gap-0.5 flex-1">
//           {NAV.map((n) => {
//             const Icon = n.i;
//             return (
//               <SheetClose key={n.t} asChild>
//                 <Button variant="ghost" size="sm" asChild className="justify-start font-bold text-foreground hover:text-[#1A237E]">
//                   <Link href={n.h}>
//                     <Icon className="w-4 h-4 text-[#1A237E] shrink-0" />
//                     {n.t}
//                   </Link>
//                 </Button>
//               </SheetClose>
//             );
//           })}
//         </nav>
//         <SheetFooter className="mt-auto pt-4 flex-col items-start gap-0 p-0">
//           <SheetDescription className="text-[11px] font-bold text-muted-foreground uppercase tracking-wide">
//             Support 24/7
//           </SheetDescription>
//           <p className="text-sm font-black text-[#1A237E]">+98 937 335 5740</p>
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//   );
// }

// /* ─── HeaderClient ────────────────────────────────────────────────────── */
// interface HeaderClientProps {
//   megaMenu: React.ReactNode;
// }

// export default function HeaderClient({ megaMenu }: HeaderClientProps) {
//   const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
//   const [searchOpen, setSearchOpen] = useState<boolean>(false);

//   return (
//     <>
//       <header
//         className="fixed top-0 left-0 right-0 z-[1000] bg-white/90 backdrop-blur-[8px] border-b border-border text-foreground"
//         style={{ boxShadow: "0px 2px 20px rgba(0,0,0,0.02)" }}
//       >
//         <div className="max-w-[1536px] mx-auto">

//           {/* ── Top toolbar ── */}
//           <div className="flex items-center justify-between h-[60px] md:h-[80px] px-4 md:px-6">
//             <Button variant="ghost" size="sm" asChild className="hover:bg-transparent px-0 gap-1.5">
//               <Link href="/">
//                 <span className="font-poppins font-extrabold text-[15px] sm:text-[17px] md:text-[20px] text-[#1A237E]">
//                   YOUR<span className="text-[#00B0FF]">SHOP</span>
//                 </span>
//                 <BuildingStorefrontIcon className="w-8 h-8 text-[#00B0FF]" />
//               </Link>
//             </Button>

//             <div className="flex items-center gap-1 md:gap-4">
//               <Button variant="ghost" size="icon" className="md:hidden text-[#1A237E]" onClick={() => setDrawerOpen(true)}>
//                 <Bars3Icon className="w-6 h-6" />
//                 <span className="sr-only">Open menu</span>
//               </Button>

//               <Button variant="outline" size="sm" asChild className="hidden md:flex gap-1.5 rounded-xl font-bold text-[12px] text-[#1A237E] border-[#1A237E] hover:bg-[#1A237E] hover:text-white transition-all duration-200">
//                 <Link href="/auth">
//                   <UserCircleIcon className="w-4 h-4" />
//                   LogIn / SignIn
//                 </Link>
//               </Button>

//               <Button variant="ghost" size="icon" asChild className="hidden md:flex relative text-[#1A237E]">
//                 <Link href="/cart">
//                   <ShoppingBagIcon className="w-5 h-5" />
//                   <Badge className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-0.5 bg-[#00B0FF] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none border-0">
//                     0
//                   </Badge>
//                   <span className="sr-only">Cart</span>
//                 </Link>
//               </Button>

//               <Button variant="ghost" size="icon" className="text-[#1A237E]" onClick={() => setSearchOpen(true)}>
//                 <MagnifyingGlassIcon className="w-5 h-5" />
//                 <span className="sr-only">Search</span>
//               </Button>
//             </div>
//           </div>

//           {/* ── Bottom toolbar – desktop only ── */}
//           <div className="hidden md:flex items-center justify-between min-h-[50px] px-8 border-t border-gray-100">
//             <div className="flex items-center gap-1">

//               {/* MegaMenu از سرور میاد */}
//               {megaMenu}

//               <Separator orientation="vertical" className="h-6 mx-2" />

//               {NAV.map((n) => {
//                 const Icon = n.i;
//                 return (
//                   <Button key={n.t} variant="ghost" size="sm" asChild className="text-muted-foreground font-semibold hover:text-[#1A237E]">
//                     <Link href={n.h}>
//                       <Icon className="w-4 h-4" />
//                       {n.t}
//                     </Link>
//                   </Button>
//                 );
//               })}
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="text-right">
//                 <p className="text-[11px] text-muted-foreground block">AmirMahdi</p>
//                 <p className="text-sm font-extrabold">+98 937 335 5740</p>
//               </div>
//               <Button size="icon-sm" className="bg-[#00B0FF] hover:bg-[#0081cb] text-white rounded-lg">
//                 <PhoneIcon className="w-4 h-4" />
//                 <span className="sr-only">Call us</span>
//               </Button>
//             </div>
//           </div>

//         </div>
//       </header>

//       <NavDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
//       <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
//     </>
//   );
// }