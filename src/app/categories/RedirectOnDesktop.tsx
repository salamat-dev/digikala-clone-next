"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/* در عرض‌های lg به بالا، کاربر را به صفحه‌ی اصلی می‌فرستد */
export default function RedirectOnDesktop() {
  const router = useRouter();

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");

    function check() {
      if (media.matches) router.replace("/");
    }

    check();
    media.addEventListener("change", check);

    return () => media.removeEventListener("change", check);
  }, [router]);

  return null;
}