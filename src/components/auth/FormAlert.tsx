"use client";

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

interface Props {
  type: "success" | "error";
  message: string;
}

/* پیام نتیجه‌ی فرم — داخل خود کارت نشان داده می‌شود */
export default function FormAlert({ type, message }: Props) {
  const isError = type === "error";

  const Icon = isError ? ExclamationCircleIcon : CheckCircleIcon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-2 rounded-lg border p-3 text-[12px] ${
        isError
          ? "border-destructive/30 bg-destructive/5 text-destructive"
          : "border-green-600/30 bg-green-50 text-green-700"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {message}
    </motion.div>
  );
}