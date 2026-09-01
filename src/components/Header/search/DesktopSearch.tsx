"use client";

import { useState } from "react";
import { useSearch } from "@/hooks/useSearch";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import SearchBox from "./SearchBox";
import SearchResultList from "./SearchResultList";

export default function DesktopSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { products, loading } = useSearch(query);

  return (
    <>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative w-full">
            <SearchBox
              value={query}
              onChange={setQuery}
              autoFocus={false}
            />
          </div>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          sideOffset={7}
          className="z-9999 w-[var(--radix-popover-trigger-width)] p-0 rounded-tr-sm rounded-tl-sm"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
          }}
        >
          <SearchResultList
            loading={loading}
            query={query}
            products={products}
          />
        </PopoverContent>
      </Popover>
    </>
  );
}