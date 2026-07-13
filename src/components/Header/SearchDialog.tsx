"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogClose,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

function SearchBox() {
  return (
    <Command className="flex-1 rounded-xl border bg-[#e8e8e8]">
      <CommandInput className="h-10" placeholder="جستجوی کالا، کفش، لباس و ..." />
      <CommandList>

      </CommandList>
    </Command>
  );
}

export default function SearchDialog({ open, onClose }: SearchDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogPortal forceMount>
        <AnimatePresence>
          {open && (
            <>
              <DialogOverlay asChild>
                <motion.div
                  className="fixed inset-0 z-[1100] bg-black/20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </DialogOverlay>

              {/* Mobile */}
              <motion.div
                role="dialog"
                aria-modal="true"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
                className="md:hidden fixed z-[1200] bg-white shadow-xl bottom-0 left-0 right-0 rounded-t-2xl min-h-[100dvh] px-6 pt-4 pb-8"
              >
                <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
                <div className="flex items-center gap-3 mt-1">
                  <SearchBox />
                  <DialogClose asChild>
                    <Button variant="ghost" size="icon" className="shrink-0 rounded-full">
                      <ChevronDownIcon className="w-7 h-7" />
                      <span className="sr-only">بستن جستجو</span>
                    </Button>
                  </DialogClose>
                </div>
              </motion.div>

              {/* Desktop */}
              <motion.div
                role="dialog"
                aria-modal="true"
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
                className="hidden md:block fixed z-[1200] bg-white shadow-xl top-0 left-[17.5%] right-[17.5%] rounded-b-2xl min-h-[60dvh] px-6 pt-4 pb-8"
              >
                <div className="w-10 h-1 bg-gray-200 rounded-full absolute bottom-3 left-1/2 -translate-x-1/2" />
                <div className="flex items-center gap-3 mt-1">
                  <SearchBox />
                  <DialogClose asChild>
                    <Button variant="ghost" size="icon-sm" className="shrink-0 rounded-full">
                      <XMarkIcon className="w-6 h-6" />
                      <span className="sr-only">بستن جستجو</span>
                    </Button>
                  </DialogClose>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </DialogPortal>
    </Dialog>
  );
}
