"use client";

import { useEffect, useState } from "react";

/* منطق: جهت اسکرول را تشخیص می‌دهد و مشخص می‌کند نوار باید جمع شود یا نه */
export function useHideOnScroll(threshold = 80) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    function onScroll() {
      const y = window.scrollY;

      // نزدیک بالای صفحه همیشه باز بماند
      if (y < threshold) {
        setHidden(false);
        lastY = y;
        return;
      }

      // حرکت‌های خیلی کوچک نادیده گرفته شوند تا نوار نلرزد
      if (Math.abs(y - lastY) < 8) return;

      // اسکرول به پایین → جمع شود، اسکرول به بالا → باز شود
      setHidden(y > lastY);
      lastY = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return hidden;
}
