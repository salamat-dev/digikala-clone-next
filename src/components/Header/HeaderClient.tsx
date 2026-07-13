"use client";

import { useState } from "react";
import HeaderTop from "./HeaderTop";
import NavDrawer from "./NavDrawer";
import SearchDialog from "./SearchDialog";

export default function HeaderClient() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <HeaderTop
        onDrawerOpen={() => setDrawerOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
      />

      <NavDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
