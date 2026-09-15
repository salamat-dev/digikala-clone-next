"use client";

import { useState } from "react";
import HeaderTop from "./HeaderTop";
import NavDrawer from "./NavDrawer";

/* بخش تعاملی هدر: وضعیت باز بودن کشوی ناوبری */
export default function HeaderClient() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <HeaderTop
        onDrawerOpen={() => setDrawerOpen(true)}
      />

      <NavDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />

    </>
  );
}
