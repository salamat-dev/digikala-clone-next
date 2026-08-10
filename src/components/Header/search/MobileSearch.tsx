"use client";

import { useState } from "react";
import { useSearch } from "@/hooks/useSearch";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle
} from "@/components/ui/dialog";
import SearchBox from "./SearchBox";
import SearchResultList from "./SearchResultList";

export default function MobileSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { products, loading } = useSearch(query);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-primary"
        >
          <MagnifyingGlassIcon className="w-6 h-6" />
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={false}
        className="top-0 bottom-0 left-0 right-0 overflow-y-auto hide-scrollbar z-[2000] h-dvh max-w-screen translate-x-0 translate-y-0 rounded-none border-0 p-0">
        <DialogTitle className="sr-only">
          جستجوی کالا
        </DialogTitle>
        <div className="flex h-full flex-col bg-background">

          <div className="flex items-center gap-2 border-b px-4 py-3">

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </Button>

            <SearchBox autoFocus value={query} onChange={setQuery} />

          </div>

          <SearchResultList loading={loading} query={query} products={products} />

        </div>
      </DialogContent>
    </Dialog>
  );
}