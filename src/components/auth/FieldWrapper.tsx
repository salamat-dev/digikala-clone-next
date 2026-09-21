"use client";

import { motion } from "framer-motion";

/* هر فیلد با تأخیر پلکانی از سمت پنل رنگی وارد می‌شود */
export default function FieldWrapper({
  index,
  direction,
  children,
}: {
  index: number;
  direction: "left" | "right";
  children: React.ReactNode;
}) {
  const from = direction === "left" ? 40 : -40;

  return (
    <motion.div
      initial={{ opacity: 0, x: from }}
      animate={{ opacity: 1, x: 0 }}
      // تأخیر اولیه تا پنل رنگی جایش را بگیرد
      transition={{ duration: 0.4, delay: 0.45 + index * 0.07 }}
    >
      {children}
    </motion.div>
  );
}