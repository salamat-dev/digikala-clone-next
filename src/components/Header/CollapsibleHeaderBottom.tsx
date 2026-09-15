"use client";

import { motion } from "framer-motion";

import { useHideOnScroll } from "@/hooks/useHideOnScroll";

/* رفتار: نوار پایین هدر را با اسکرول به پایین جمع و با اسکرول به بالا باز می‌کند */
export default function CollapsibleHeaderBottom({
  children,
}: {
  children: React.ReactNode;
}) {
  const hidden = useHideOnScroll();

  return (
    /* انیمیشن: ارتفاع و شفافیت با هم تغییر می‌کنند تا حالت کرکره‌ای بدهد */
    <motion.div
      initial={false}
      animate={hidden ? "collapsed" : "expanded"}
      variants={{
        // در حالت باز overflow آزاد می‌شود تا پنل مگامنو بیرون بزند
        expanded: { height: "auto", opacity: 1, overflow: "visible" },
        collapsed: { height: 0, opacity: 0, overflow: "hidden" },
      }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}